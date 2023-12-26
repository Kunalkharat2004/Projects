const User = require("../model/User");

//Get request to signup user
module.exports.renderSignupForm = (req,res)=>{
    res.render("../views/user/signup.ejs")
}

//Post request to signup user
module.exports.signup = async(req,res,next)=>{
    try{
        let {username,email,password} = req.body;
        let newUser = new User({username,email});
       let registerdUser = await User.register(newUser,password);
       req.login(registerdUser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success",`Hi ${username}. Welcome to Airbnb.`)
        res.redirect("/listing");
       })
       console.log(registerdUser);
      
    }catch(e){
        req.flash("error",e.message);
        console.log("Signup page");
        res.redirect("/user/signup");
    }
}

//Login user form
module.exports.renderLoginForm = (req,res)=>{
    res.render("../views/user/login.ejs");
}

// Post request to login
module.exports.login =  async(req,res)=>{
    let {username} = req.body;
    req.flash("success",`Welcome ${username}.`);
    let redirectUrl = res.locals.redirectUrl ? res.locals.redirectUrl : "/listing";
    res.redirect(redirectUrl);
}

// Logout
module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/user/login");
    })
}