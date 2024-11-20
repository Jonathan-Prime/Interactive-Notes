import { RequestHandler } from "express";
import createHttpError from "http-errors";
import ReviewModel from "../models/review";
import UserModel from "../models/user";

export const getAllReviews: RequestHandler = async (req, res, next) => {
  try {
    const reviews = await ReviewModel.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const postReview: RequestHandler = async (req, res, next) => {
  const { username, starRating, comment } = req.body;

  try {
    if (!username || !starRating || !comment) {
      throw createHttpError(400, "credentials required");
    }
    const newReview = await ReviewModel.create({
      username: username,
      starRating: starRating,
      comment: comment,
    });

    await UserModel.updateOne(
      { _id: req?.params?.id },
      { $set: { reviewedApp: true } }
    );

    res
      .status(201)
      .json({
        message: `Thank you ${newReview?.username}, your review have been saved!`,
      });
  } catch (error) {
    next(error);
  }
};

export const editReview: RequestHandler = async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const newUsername = req.body.username;
  const newStarRating = req.body.starRating;
  const newComment = req.body.comment;

  try {
    if (!newUsername || !newStarRating || !newComment) {
      throw createHttpError(400, "Credentials required");
    }

    const review = await ReviewModel.findById(reviewId).exec();

    if (!review) {
      throw createHttpError(404, "Review not found");
    }

    review.username = newUsername;
    review.starRating = newStarRating;
    review.comment = newComment;

    await review.save();

    res
      .status(200)
      .json({ message: `${newUsername} your review has been updated` });
  } catch (error) {
    next(error);
  }
};

export const likeReview: RequestHandler<
  { reviewId: string },
  {},
  { like: number }
> = async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const likeValue = req.body.like;

  try {
    const review = await ReviewModel.findById(reviewId).exec();

    if (!review) {
      throw createHttpError(404, "Review not found");
    }

    review.like += likeValue;

    await review.save();

    res
      .status(200)
      .json({
        message: `Review ${reviewId} like count updated to ${review.like}`,
      });
  } catch (error) {
    next(error);
  }
};
