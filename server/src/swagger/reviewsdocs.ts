/**
 * @swagger
 * components:
 *   schemas:
 *     PostReviewDTO:
 *       type: object
 *       required:
 *         - userId
 *         - username
 *         - starRating 
 *         - comment
 *       properties:
 *         userId:
 *           type: string
 *         username:
 *           type: string
 *         starRating:
 *           type: number
 *         comment:
 *           type: string
 * 
 *     EditReviewDTO:
 *       type: object
 *       required:
 *         - reviewId
 *         - newUsername
 *         - newsStarRating 
 *         - newComment
 *       properties:
 *         reviewId:
 *           type: string
 *         newUsername:
 *           type: string
 *         newsStarRating:
 *           type: number
 *         newComment:
 *           type: string
 * 
 *     LikeUnlikeReviewDTO:
 *       type: object
 *       required:
 *         - reviewId
 *         - likeValue
 *       properties:
 *         reviewId:
 *           type: string
 *         likeValue:
 *           type: number
 *
 *
 * /private/get-all-reviews:
 *   get:
 *     tags: [Reviews]
 *     security: []
 *     responses:
 *       200:
 *         description:
 * 
 * /private/post-review/{userId}:
 *   post:
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostReviewDTO'
 *     responses:
 *       200:
 *         description:
 * 
 * 
 * /private/edit-review/{reviewId}:
 *   patch:
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditReviewDTO'
 *     responses:
 *       200:
 *         description:
 * 
 * 
 * /private/like-review/{reviewId}:
 *   patch:
 *     tags: [Reviews]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LikeUnlikeReviewDTO'
 *     responses:
 *       200:
 *         description:
 * 
 */
