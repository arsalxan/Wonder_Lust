const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn, validate, isReviewAuthor, isReviewOwner}=require("../middleware.js");
const reviewController = require("../controllers/review.js");

//add reviews
router.post("/",isLoggedIn, isReviewAuthor, validate(reviewSchema), wrapAsync(reviewController.createReview));

//deleting the review
router.delete("/:reviewId",isLoggedIn, isReviewOwner, wrapAsync(reviewController.destroyReview));

module.exports = router;