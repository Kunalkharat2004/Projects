const Listing = require("../model/Listing");

  //Show all listing
module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
  }

    // New listing
  module.exports.newListing = (req, res) => {
    res.render("listing/new.ejs");
  }

    // Show details of a particular listing
  module.exports.showDetails = async (req, res) => {
    let { id } = req.params;
    let listings = await Listing.findById(id)
    .populate({path:"review",
              populate:{path:"createdBy"}}) 
              .populate("owner")

    if(!listings){
      req.flash("error","Oops.Listing doesn't exists!");
      res.redirect("/listing")
    }
    // console.log(listings.owner.username);
    res.render("listing/show.ejs", { listings });
  }

    // Add new listing
  module.exports.addNew = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listing");
  }

   //Edit listing
  module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listToEdit = await Listing.findById(id);
    if(!listToEdit){
      req.flash("error","Listing doesn't exists");
      res.redirect("/listing");
    }
    let OriginalImage = listToEdit.image.url;
     OriginalImage = OriginalImage.replace("/upload","/upload/w_200/h_260");
    res.render("listing/edit.ejs", { listToEdit , OriginalImage});
  }

  // Update list
  module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
     let listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { runValidators: true, new: true }
    );
    if(req.file){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image.url = url;
    listing.image.filename = filename;
    await listing.save();
    }
    req.flash("success","Listing updated");
    res.redirect(`/listing/${id}`);
  }

    //Delete a listing
    module.exports.deleteListing = async (req, res) => {
        let { id } = req.params;
         await Listing.findByIdAndDelete(id);
         req.flash("success","Listing deleted");
        res.redirect("/listing");
      }