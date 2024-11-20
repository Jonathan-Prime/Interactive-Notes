
import { motion } from "framer-motion";
import { getAllReviews } from '@/features/private/review/reviewSlice';
import { useAppDispatch } from '@/network/hooks';
import { HeartStraight } from 'phosphor-react';
import { useState } from 'react';
import { loveButonVariant } from "@/utils/animation";

interface Review {
  _id: string;
  like: number;
}

interface ReviewUpdateProps {
  reviewId: string;
  val?: Review;
}

function ReviewUpdate({ reviewId, val }: ReviewUpdateProps) {

  const [liked, setLiked] = useState(() => {
    // Check if a cookie exists for this review when the component is first mounted
    return getCookie(`review_${reviewId}_liked`) === 'true';
  });
  const dispatch = useAppDispatch();

  async function handleLikeClick() {
    if (liked) {
      // If the user has already liked the review, remove the cookie and send -1 to the backend
      deleteCookie(`review_${reviewId}_liked`);
      setLiked(false);
      await sendLikeToBackend(-1);
    } else {
      // If the user has not liked the review, create a cookie and send 1 to the backend
      setCookie(`review_${reviewId}_liked`, 'true', 365);
      setLiked(true);
      await sendLikeToBackend(1);
    }
    dispatch(getAllReviews())
  }

  async function sendLikeToBackend(likeValue: number) {
    try {
      const response = await fetch(`https://URL/private/like-review/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          like: likeValue,
        }),
      });
      if (!response.ok) {
        throw new Error('Error sending like to backend');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center space-x-1 ">
      <motion.button
        onClick={handleLikeClick}
        variants={loveButonVariant}
        animate={liked ? "liked" : "unliked"}
      >
        {
          liked ?
            <HeartStraight size={20} color="#c70014" weight="fill" />
            :
            <HeartStraight size={20} color="#c70014" weight="bold" />
        }
      </motion.button>
      <p>{val?.like}</p>
    </div>
  );
}

export default ReviewUpdate;

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
