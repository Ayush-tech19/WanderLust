const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const path = require("path");
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");

app.use(methodOverride('_method')); 
app.set("view engine", "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "public")));

let port = 8080;
main().then((res)=>{
    console.log("connected to mongo");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');
}
app.get("/" , (req, res)=>{
    res.send("working");
});

app.get("/listings" , async(req, res)=>{
    let allListings = await Listing.find();
    // console.log(allListings);
    // console.log(Data);
    res.render("./listings/index.ejs" , { allListings });
});
// create route(show a form to user)
// humee yha iss route ko phle likhna pdha bcz :id niche wala route new ko id smj rha hai new id ko du
app.get("/listings/new" , (req, res)=>{
    res.render("./listings/new.ejs");
});


// show route of a peritcular listing
app.get("/listings/:id",  async (req,res)=>{
    let { id } = req.params;
    let inFo = await Listing.findById(id);
    res.render("./listings/show.ejs" , { inFo });
    // console.log(inFo);
});

app.post("/listings" , async (req,res)=>{
    let { title , description, image, price, location, country} = req.body;
    let addData = new Listing({
        title : title,
        description:description,
        image:image,
        price:price,
        location:location,
        country:country,
    });
//    console.log(addData);
   await addData.save();
   console.log("data added by post request");
   res.redirect("/listings");
});

// app.get("/test", async (req, res) => {
//     try {
//         let list = new Listing({
//             title: "Cozy Beachside Villa",
//             description: "A beautiful villa near the beach with a private balcony and amazing sea views.",
//             price: 2500,
//             location: "Goa",
//             country: "India"
//         });
//         await test.save();
//         console.log("saved");
//         let show = await Listing.find({location:"Goa"});
//         console.log(show);
//         res.send("testing on listing model");
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error saving listing: " + err.message);
//     }
// });
app.get("/listings/:id/edit" , async (req , res)=>{
    let {id} = req.params;
    let editList = await Listing.findById(id);
    console.log(editList);
    res.render("./listings/edit.ejs" , { editList });
});
app.put("/listings/:id" , async (req, res)=>{
    let { id } = req.params;
    console.log(id);
    let { title , description, image, price, location, country} = req.body;
    await Listing.findByIdAndUpdate(id , {
        title : title,
        description:description,
        image:image,
        price:price,
        location:location,
        country:country,
    });
    // console.log(updateList);
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id/delete" , async (req, res)=>{
    let { id } = req.params;
    let deleteList = await Listing.findByIdAndDelete(id);
    console.log(deleteList);
    res.redirect("/listings");
});
app.listen(port , ()=>{
    console.log("server started at http://localhost:8080/");
});