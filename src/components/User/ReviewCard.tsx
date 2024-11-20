/* eslint-disable @next/next/no-img-element */
import { Star } from 'phosphor-react'
import React, { useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import '@splidejs/react-splide/css/core';
import '@splidejs/react-splide/css';
import { useAppDispatch, useAppSelector } from '@/network/hooks';
import { getAllReviews } from '@/features/private/review/reviewSlice';
import ReviewUpdate from './LoveButton';
import { characterLimit } from '@/utils/general';
import Image from 'next/image';


const ReviewCard = () => {
    const dispatch = useAppDispatch();
    const { isLoading, reviews } = useAppSelector( state => state.reviews)

    useEffect(() => {
        dispatch(getAllReviews())
    }, [dispatch])


    const starRatings = [5, 4, 3, 2, 1]
    const progressData = starRatings.map((rating) => {
        const filteredReviews = reviews?.filter((val: any) => val.starRating === rating)
        const progress = (filteredReviews?.length / reviews?.length) * 100 || 0
        return { rating, progress, count: filteredReviews?.length }
    })

    const starAverage = progressData.reduce((acc, { rating, progress }) => {
        return acc + rating * progress / 100
    }, 0)


    return (
        <>
            <br /><br /><span className='hidden sm:block'><br /></span>
            { isLoading && <Image src="/assets/loading_gif2.gif" alt='' height={22} width={22} />}
            {reviews &&
                <>
                    <div className='flex justify-between border rate-card mx-4 dark:bg-darkGrey dark:border-none dark:shadow-none'>
                        <div>
                            <div className='pt-3'><span className='font-bold text-[36px] leading-[0px] text-[#4a4db0]'>{starAverage?.toFixed(1)}</span> <br /><span className='whitespace-nowrap'>out of {starRatings?.length}</span></div>
                        </div>
                        <div>
                            {progressData?.map(({ rating, progress, count }) => (
                                <div key={rating} className='grid grid-cols-2 whitespace-nowrap items-center '>
                                    <div className='space-x-1 mr-2 flex justify-end'>
                                        {Array.from({ length: rating }, (_, i) => (
                                            <Star key={i} size={10} color="#4a4db0" weight="fill" />
                                        ))}
                                    </div>
                                    <div className="progress-bar-container">
                                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>

                            ))}
                            <div className='float-right clear-right'>{reviews?.length} Ratings</div>
                        </div>
                    </div>
                    <Splide
                        options={{
                            rewind: true,
                            gap: '16px',
                            autoplay: true,
                            pauseOnHover: true,
                            interval: 7000,
                            speed: 7000,
                            perPage: 1,
                            autoHeight: true,
                            autoWidth: true,
                            arrows: false,
                            isNavigation: false,
                        }}
                        aria-label="Interactive Note reviews"
                        className='max-w-[100%] review-card-slider h-[0px] '
                    >
                        {reviews?.map((val: any, i: number) =>
                            <React.Fragment key={i}>

                                <SplideSlide key={i}>

                                   <div className='review-card my-6 dark:bg-darkGrey dark:shadow-none' key={i}>
                                        <span className='float-right clear-right'>
                                            <ReviewUpdate val={val} reviewId={val?._id} />

                                        </span>
                                        <div>
                                            <img src={'https://source.unsplash.com/random/300x200'} alt='' />
                                            <div className='user-details'>
                                                <h1>{characterLimit(val?.username, 15)}</h1>
                                                <h2>{val?.role}</h2>
                                                <span>
                                                    {Array.from({ length: val?.starRating }, (_, i) => (
                                                        <Star key={i} size={20} color="#4a4db0" weight="fill" />
                                                    ))}
                                                </span>
                                            </div>
                                        </div>
                                        <article>{val?.comment}</article>
                                    </div>
                                </SplideSlide>
                            </React.Fragment>
                        )}
                    </Splide>
                </>
            }
        </>
    )
}

export default ReviewCard;