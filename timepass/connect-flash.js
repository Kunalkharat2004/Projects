const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
    secret:"mysecretkey",
    resave:false,
    saveUninitialized:true
}));
app.use(flash());

app.get("/flash",(req,res)=>{
    req.flash("info","Registration successfull!");
    res.redirect("/")
})

app.get("/register",(req,res)=>{
    let {name = "anonmyous"} = req.query;
    req.session.name = name;
    console.log(req.session.cookie);
    if(name === "anonmyous"){
        req.flash("error","Invalid user");
    }else{
        req.flash("success","Registration successfull!")
    }
    res.redirect("/");
})
app.get("/",(req,res)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.name = req.session.name;
    res.render("showUser.ejs");
})


app.listen(3000,()=>{
    console.log("Port is listening");
})