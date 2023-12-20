const express = require("express");
const router = express.Router();
const Listing = require("../model/Listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {listSchema}  = require("../schemaValidation.js");
const ExpressError = require("../utils/ExpressError.js");

const validateListing = (req, res, next) => {
    const { error } = listSchema.validate(req.body.listing);
    if (error) {
      throw new ExpressError(400,  error );
    } else {
      next();
    }
  };

//Show all listing
router.get(
    "/",
    wrapAsync(async (req, res) => {
      const allListing = await Listing.find({});
      res.render("listing/index.ejs", { allListing });
    })
  );
  
  // New listing
  router.get("/new", (req, res) => {
    res.render("listing/new.ejs");
  });
  
  // Show details of a particular listing
  router.get(
    "/:id",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let listings = await Listing.findById(id).populate("review");
      if(!listings){
        req.flash("error","Oops.Listing doesn't exists!");
        res.redirect("/listing")
      }
      res.render("listing/show.ejs", { listings });
    })
  );
  
  // Add new listing
  router.post(
    "/",
    validateListing,
    wrapAsync(async (req, res, next) => {
      const newListing = new Listing(req.body.listing);
      await newListing.save();
      req.flash("success","New listing created");
      res.redirect("/listing");
    })
  );
  
  //Edit listing
  router.get(
    "/:id/edit",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let listToEdit = await Listing.findById(id);
      if(!listToEdit){
        req.flash("error","Listing doesn't exists");
        res.redirect("/listing");
      }
      req.flash("success","Listing updated");
      res.render("listing/edit.ejs", { listToEdit });
    })
  );
  
  // Update list
  router.put(
    "/:id",
    validateListing,
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { runValidators: true, new: true }
      );
      req.flash("success","Listing updated");
      res.redirect(`/listing/${id}`);
    })
  );
  
  //Delete a listing
  router.delete(
    "/:id/delete",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
       await Listing.findByIdAndDelete(id);
       req.flash("success","Listing deleted");
      res.redirect("/listing");
    })
  );
  

  module.exports = router;