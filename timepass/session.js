const express = require("express");
const app = express();
const session = require("express-session");

app.use(session({
    secret:"mysecretkey",
    resave:false,
    saveUninitialized:true
}))

app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query
    console.log(req.session);
    req.session.name = name;
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    res.send(`Hi, ${req.session.name}`)
})

app.listen(3000,(req,res)=>{
    console.log("Listening on port 3000");
})