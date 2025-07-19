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
      default: "https://images.unsplash.com/photo-1622398920098-f059e17a9790?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      set: (v) => v === "" ? "https://images.unsplash.com/photo-1622398920098-f059e17a9790?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
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
