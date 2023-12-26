const Listing = require("../model/Listing.js");
const Review = require("../model/Review.js");


// New review
module.exports.newReview = async(req,res,next)=>{
    let {id} = req.params;
    console.log(id);
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.createdBy = req.user._id;
    console.log(newReview);
     listing.review.push(newReview);
    req.flash("success","Review added");
     await listing.save();
     await newReview.save();
  
     res.redirect(`/listing/${id}`);
  }

  // Delete a review
  module.exports.deleteReview = async(req,res)=>{
    let {id,reviewId} = req.params;
  
    let result = await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    console.log(result);
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listing/${id}`);
  }