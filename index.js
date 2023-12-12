const express= require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/Listing.js");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

const MONGO_URI = "mongodb://127.0.0.1:27017/airbnb";

async function main(){
    await mongoose.connect(MONGO_URI);
}
main()
.then((res)=>{console.log("Sucessfully connected to Database");})
.catch((err)=>{console.log(err);});

app.listen(8080,()=>{
    console.log("Listening at port 8080");
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

// app.get("/testListing",(req,res)=>{
//   let sampleData = new Listing({
//     title:"Sweet Home",
//     description:"My house ,my dream",
//     price:3500,
//     location:"Calangute ,Goa",
//     country:"India"
//   });

//   sampleData
//   .save()
//   .then((res)=>{console.log(res);})
// .catch((err)=>{console.log(err);});

// res.send("Saved sucessfull! :)")
// });
app.get("/",(req,res)=>{
  res.send("Hi I am root");
})
app.get("/listing",async(req,res)=>{
  const allListing = await Listing.find({});
  res.render("listing/index.ejs",{allListing});
})

app.get("/listing/new",(req,res)=>{
  res.render("listing/new.ejs");
})

app.get("/listing/:id",async(req,res)=>{
  let {id} = req.params;
 let listings = await Listing.findById(id);
 res.render("listing/show.ejs",{listings});
});

app.post("/listing",(req,res)=>{
  let listing = req.body.listing;
  const newListing = new Listing(listing);
  newListing
  .save()
  .then((res)=>{console.log(res);})
  .catch((err)=>{console.log(err);})
  res.redirect("/listing");
})

app.get("/listing/:id/edit",async(req,res)=>{
  let {id} = req.params;
  let listToEdit = await Listing.findById(id);
  res.render("listing/edit.ejs",{listToEdit});
});

app.put("/listing/:id",async(req,res)=>{
  let {id} = req.params;
 let updatedList = await Listing.findByIdAndUpdate(id,{...req.body.listing},{runValidators:true,new:true})
 res.redirect(`/listing/${id}`);
});

app.delete("/listing/:id/delete",async(req,res)=>{
  let {id} = req.params;
 let deletedList = await Listing.findByIdAndDelete(id)
 res.redirect("/listing");
})
