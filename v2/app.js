var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://hd.unsplash.com/photo-1455763916899-e8b50eca9967",
//         description: "This is a huge granit hill, no bahtrooms. No water. Beautiful granite!"
//      }, 
//      function(err, campground){
//          if (err){
//              console.log(err);
//          }else {
//              console.log("newly created");
//              console.log(campground);
//          }
//      }
// );

// var campgrounds = [
//             {name: "Salmon Creek", image: "https://hd.unsplash.com/photo-1444124818704-4d89a495bbae"},
//             {name: "Granite Hill", image: "https://hd.unsplash.com/photo-1455763916899-e8b50eca9967"},
//             {name: "Mountain Goat's Rest", image: "https://hd.unsplash.com/photo-1465695954255-a262b0f57b40"},
//             {name: "Salmon Creek", image: "https://hd.unsplash.com/photo-1444124818704-4d89a495bbae"},
//             {name: "Granite Hill", image: "https://hd.unsplash.com/photo-1455763916899-e8b50eca9967"},
//             {name: "Mountain Goat's Rest", image: "https://hd.unsplash.com/photo-1465695954255-a262b0f57b40"},
//             {name: "Salmon Creek", image: "https://hd.unsplash.com/photo-1444124818704-4d89a495bbae"},
//             {name: "Granite Hill", image: "https://hd.unsplash.com/photo-1455763916899-e8b50eca9967"},
//             {name: "Mountain Goat's Rest", image: "https://hd.unsplash.com/photo-1465695954255-a262b0f57b40"},
//                {name: "Cloud's Rest", image: "https://hd.unsplash.com/photo-1464207687429-7505649dae38"}
//         ]

app.get("/", function(req, res){
    res.render("landing");
    
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
        Campground.find({}, function(err, allcampgrounds){
            if (err){
                console.log(err);
            }else {
                res.render("index", {campgrounds: allcampgrounds})
            }
        });
        //res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE - add new campgrounds to DB
app.post("/campgrounds", function(req, res){
    var name = req.body.name; //get name and body
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}; //create object
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");  
        }
    })
    //campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

//NEW - show form to create new campgrounds
app.get("/campgrounds/new", function(req, res){
    res.render("new"); 
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            console.log(err);
            console.log("EEEEERRERERERERER")
        }else{
            res.render("show", {campground: foundCampground});
            console.log("DAAAAAA FUUUUU")
            
        }
    });
    req.params.id
    //find the campground wtih provided ID
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelp serv started");
})