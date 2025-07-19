const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");
const geocodeLocation = require("../utils/geocode.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Review.deleteMany({});
  await User.deleteMany({});

  let adminUser = new User({
    email: "admin@example.com",
    username: "admin"
  });
  adminUser = await User.register(adminUser, "adminpassword");

  const listingsWithOwnersAndGeometry = [];
  for (let listingData of initData) {
    const geometry = await geocodeLocation(listingData.location + ", " + listingData.country);
    if (geometry) {
      listingData.geometry = geometry;
    }
    listingData.owner = adminUser._id;
    listingsWithOwnersAndGeometry.push(listingData);
  }

  await Listing.insertMany(listingsWithOwnersAndGeometry);
  console.log("Data was initialized with new listings and admin user.");
};

initDB();
