const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const mongoose = require('mongoose');

const { validate } = require("../utils/validation.js");

//add reviews
router.post("/", validate(reviewSchema), wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) { // Added validation
        return next(new ExpressError(404, 'Listing Not Found!')); // Handle invalid ID
    }
    let listing = await Listing.findById(id);
    let newReview = new Review({ ...req.body.review });
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${id}`);
}));

//deleting the review
router.delete("/:reviewId", wrapAsync(async (req, res, next) => {
    let { id, reviewId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(reviewId)) { // Added validation
        return next(new ExpressError(404, 'Listing/Review Not Found!')); // Handle invalid ID
    }
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));

module.exports = router;