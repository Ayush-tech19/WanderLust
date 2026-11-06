// if user apni property ko sell kare to kya kya details dena hoga uske liye ek model banaya h
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema({
    title:{
        type:String,
        required : true,
    },
    description : String,
    // yha set : (v)=> v ==="" ?"..." yha iss set ka matlb hai agar kisi user nai image to di lekin url nhi diya to agr v===empty string to default image url de dega
    image : {
        type : String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-97TAOexswB8hqanmxJxJS8WBwjOYMDaXQwP1JWPkJS4VEvxCBI-5LLqU&s=10",
        set : (v)=> v === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-97TAOexswB8hqanmxJxJS8WBwjOYMDaXQwP1JWPkJS4VEvxCBI-5LLqU&s=10" : v,
    },
    price : Number,
    location :String,
    country : String
});

const Listing = mongoose.model("Listing" , listSchema);
module.exports = Listing;
