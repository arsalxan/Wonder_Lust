const Listing = require("../models/listing");
const geocodeLocation = require("../utils/geocode");


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    }).populate("owner");
    if (!listing) {
        req.flash('error', 'Listing you requested does not exist!');
        return res.redirect('/listings');
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url: req.file.path, filename: req.file.filename };
    const geometry = await geocodeLocation(newListing.location);
    if (geometry) {
        newListing.geometry = geometry;
    }
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("owner");
    if (!listing) {
        req.flash('error', 'Listing you requested to edit does not exist!');
        return res.redirect('/listings');
    }
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }

    // Update other listing properties, excluding 'image' if not provided
    for (let key in req.body.listing) {
        if (key === 'image' && req.body.listing[key] === '') {
            continue; // Skip updating image if it's an empty string
        }
        listing[key] = req.body.listing[key];
    }

    if (req.file) {
        listing.image = { url: req.file.path, filename: req.file.filename };
    }

    if (req.body.listing.location) {
        const geometry = await geocodeLocation(req.body.listing.location);
        if (geometry) {
            listing.geometry = geometry;
        }
    }
    await listing.save();
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};

module.exports.searchListings = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        req.flash('error', 'Please enter a search query.');
        return res.redirect('/listings');
    }

    const searchPattern = new RegExp(q, 'i'); // Case-insensitive search
    const foundListings = await Listing.find({ title: searchPattern });

    if (foundListings.length === 1) {
        res.redirect(`/listings/${foundListings[0]._id}`);
    } else if (foundListings.length > 1) {
        res.render('listings/index.ejs', { allListings: foundListings });
    } else {
        req.flash('error', 'No listings found matching your search.');
        res.redirect('/listings');
    }
};
