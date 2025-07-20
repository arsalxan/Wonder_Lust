const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn, isOwner, validate}=require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const { storage } = require('../utils/cloudinaryConfig');
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(upload.single('listing[image]'), isLoggedIn, validate(listingSchema), wrapAsync(listingController.createListing));

router.get("/new", isLoggedIn, listingController.renderNewForm);

router.get("/search", wrapAsync(listingController.searchListings));

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(upload.single('listing[image]'),isLoggedIn, isOwner, validate(listingSchema), wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;