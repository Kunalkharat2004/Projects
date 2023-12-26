const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const {isAuthenticated,isOwner,validateListing} = require("../middlewares.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudinaryConfig.js");
const upload = multer({ storage });
const router = express.Router();

//Show all listing & Add new listing
router.route("/")
.get( wrapAsync(listingController.index))
.post(
  isAuthenticated,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.addNew)
);

  // New listing
  router.get("/new",isAuthenticated ,listingController.newListing);
  
 // Show details of a particular listing & Update Listing
router.route("/:id")
.get( wrapAsync(listingController.showDetails))
.put(
  isAuthenticated,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
);
  
  //Edit listing
  router.get(
    "/:id/edit",
    isAuthenticated,
    isOwner,
    wrapAsync(listingController.editListing)
  );
  
  //Delete a listing
  router.delete(
    "/:id/delete",
    isAuthenticated,
    isOwner,
    wrapAsync(listingController.deleteListing)
  );


  module.exports = router;