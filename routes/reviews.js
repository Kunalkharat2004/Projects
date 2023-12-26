const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const { isAuthenticated,isReviewOwner } = require("../middlewares.js");
const {validateReview} = require("../middlewares.js");
const reviewController = require("../controllers/review.js");

  //New Review
  router.post("/",isAuthenticated,validateReview,wrapAsync(reviewController.newReview));

  // router.get("/",async(req,res)=>{
  //   let {id} = req.params;
  //   let listing = await Listing.findById(id);
  //   res.redirect(`/listing/${id}`);
  // })
  
  // Delete review
  router.delete("/:reviewId",isAuthenticated,isReviewOwner,reviewController.deleteReview)

  module.exports = router;
