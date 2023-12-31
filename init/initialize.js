const mongoose = require("mongoose");
const initData = require("./data.js");
const MONGO_URI = "mongodb://127.0.0.1:27017/airbnb";
const Listing = require("../model/Listing.js");

async function main(){
    await mongoose.connect(MONGO_URI);
}

main()
.then((res)=>{console.log("Sucessfully connected to Database");})
.catch((err)=>{console.log(err);});

const initialize = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"6584852e493a120810ef8732"}));
    await Listing.insertMany(initData.data);
    console.log("Data saved");
}

initialize();