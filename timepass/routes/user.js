const express = require("express");
const router = express.Router();

//User
//Index
router.get("/",(req,res)=>{
    res.send("GET user route");
})
//New user
router.get("/new",(req,res)=>{
    res.send("GET new user route");
})
router.get("/edit",(req,res)=>{
    res.send("GET user edit route");
})
//Edit
router.post("/",(req,res)=>{
    res.send("POST user route");
})
//Show
router.get("/:id",(req,res)=>{
    res.send("GET particular user route");
})
module.exports = router;