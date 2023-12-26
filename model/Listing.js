const mongoose = require("mongoose");
const {Schema} = mongoose;
const Review = require("./Review.js");

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
       url: String,
       filename: String,
       
    },
    review:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User"
    }
});

//Handling deletion of reviews once a listing is deleted
listingSchema.post("findOneAndDelete",async(listing)=>{
    await Review.deleteMany({_id:{$in:listing.review}});
})

const Listing = mongoose.model('Listing',listingSchema);
module.exports = Listing;