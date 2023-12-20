const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../model/Listing.js");
const Review = require("../model/Review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema}  = require("../schemaValidation.js");
const ExpressError = require("../utils/ExpressError.js");

  // Review validation
  const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body.review);
    if (error) {
      throw new ExpressError(400,  error );
    } else {
      next();
    }
  };

  //New Review
  router.post("/",validateReview,wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    console.log(id);
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
     listing.review.push(newReview);
    req.flash("success","Review added");
     await listing.save();
     await newReview.save();
  
     res.redirect(`/listing/${id}`);
  }));
  
  // Delete review
  router.delete("/:reviewId",async(req,res)=>{
    let {id,reviewId} = req.params;
  
    let result = await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    console.log(result);
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listing/${id}`);
  })

  module.exports = router;
