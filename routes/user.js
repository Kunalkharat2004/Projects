const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewares");
const userController = require("../controllers/user");

//Get request to signup user & Post request to signup user
router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup))



router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/user/login",failureFlash:true}),
   userController.login);

//Logout
router.get("/logout",userController.logout)

module.exports = router;