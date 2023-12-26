const ExpressError = require("./utils/ExpressError.js");
const Listing = require("./model/Listing.js");
const Review = require("./model/Review.js");
const {listSchema,reviewSchema}  = require("./schemaValidation.js");

// User Authentication
module.exports.isAuthenticated = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        console.log(req.session.redirectUrl);
        req.flash("error","Login first ");
       return res.redirect("/user/login");
      }
      next()
}


module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
next()
}

// Listing Authorization
module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to modify this listing");
        return res.redirect(`/listing/${id}`);
      }
      next();
}
// Review Authorization
module.exports.isReviewOwner = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    console.log(review);
    if(!review.createdBy.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to modify this review");
        return res.redirect(`/listing/${id}`);
      }
      next();
}

// Listing validation
module.exports.validateListing = (req, res, next) => {
    const { error } = listSchema.validate(req.body.listing);
    if (error) {
      throw new ExpressError(400,  error );
    } else {
      next();
    }
  };

   // Review validation
  module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body.review);
    if (error) {
      throw new ExpressError(400,  error );
    } else {
      next();
    }
  };