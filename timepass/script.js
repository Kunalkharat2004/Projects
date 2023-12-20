const express = require("express");
const app = express();
const user = require("./routes/user")
const post = require("./routes/post");
// const cookieParser = require("cookie-parser");
const session = require("express-session")

// app.use(cookieParser("secretKey"));

app.use(session({
    secret:"mysecretkey",
    resave:false,
    saveUninitialized:true
}));


app.use("/user",user);
app.use("/post",post);

app.get("/",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1
    }

    res.send(`Request sent ${req.session.count} times`);
})
app.listen(3000,()=>{
    console.log("Listening on port 3000");
});