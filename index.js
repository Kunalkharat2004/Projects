if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const MONGO_URI = "mongodb://127.0.0.1:27017/airbnb";
const ExpressError = require("./utils/ExpressError.js");
const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/reviews.js");
const userRoute = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const User = require("./model/User.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");

//Making connection with mongodb 
async function main() {
  await mongoose.connect(MONGO_URI);
}
main()
  .then((res) => {
    console.log("Sucessfully connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

//Home route
app.get("/", (req, res) => {
  res.send("Hi I am root");
});

const sessionOptions = {
  secret:"mysupersecret",
  resave: false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000
  }
}
  app.use(session(sessionOptions));
  app.use(flash());
  
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  
  //Flash middleware

  app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
  })


//Express Router
app.use("/listing",listingRoute);
app.use("/listing/:id/review",reviewRoute);
app.use("/user",userRoute);
  
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});



// Error handling middleware:
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong!" } = err;
  res.status(status).render("listing/error.ejs", { message });
  // res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("Listening at port 8080");
});