const express = require("express");
const router = express.Router();

//POST 
//Index
router.get("/",(req,res)=>{
    res.send("GET post route");
})
//Show
router.get("/:id",(req,res)=>{
    res.send("GET particular post route");
})
//Edit
router.post("/",(req,res)=>{
    res.send("POST user route");
})
//New user
router.get("/new",(req,res)=>{
    res.send("GET post route");
})
router.get("/edit",(req,res)=>{
    res.send("GET post route");
})
module.exports = router;