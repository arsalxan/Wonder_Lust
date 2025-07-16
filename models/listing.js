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
    type: String,
  },
  price: {
    type: Number,
    default: 0,
    min:0
  },
  location: String,
  country: String,
  reviews:[
    {
       type:Schema.Types.ObjectId,
       ref:"Review"
    }  
  ]
});

listingSchema.post("findOneAndDelete", wrapAsync(async (listing)=>{
  if(listing){
   await Review.deleteMany({_id:{$in:listing.reviews}});
  }
}));

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
