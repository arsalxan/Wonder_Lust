const mongoose = require("mongoose");
const Review = require("./review.js")
const wrapAsync = require("../utils/wrapAsync");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      set: (v) => v === "" ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" : v,
    },
    filename: {
      type: String,
      default: "listingimage",
      set: (v) => v === "" ? "listingimage" : v,
    },
  },
  price: {
    type: Number,
    default: 0,
    min:0
  },
  location: String,
  country: String,
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  reviews:[
    {
       type:Schema.Types.ObjectId,
       ref:"Review"
    },  
  ],
  owner:
    {
       type:Schema.Types.ObjectId,
       ref:"User"
    }
});

listingSchema.post("findOneAndDelete", wrapAsync(async (listing)=>{
  if(listing){
   await Review.deleteMany({_id:{$in:listing.reviews}});
  }
}));

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
