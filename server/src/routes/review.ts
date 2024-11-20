import express from "express";
import * as ReviewsController from "../controllers/reviews";
import { protect } from '../middlewares/authProtect'

const router = express.Router();

router.get('/get-all-reviews', ReviewsController.getAllReviews);

router.post('/post-review/:id', protect, ReviewsController.postReview);

router.patch('/edit-review/:reviewId', protect, ReviewsController.editReview);

router.patch('/like-review/:reviewId', ReviewsController.likeReview);

export default router;