var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds")
    
mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})


//COMMENTS ROUTES
app.get("/campgrounds/:id/comments/new", function(req, res){
    console.log("YOOOOOOOOOOO");
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log("didn't make it past error");
            console.log(err);
        } else {
            console.log("made it past error");
            res.render("comments/new", {campground: campground})
            console.log("totally made it past");
        }
    })
})

app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
            redirect("/campgrounds");

        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
    //create new comment
    //connect new comment to campground
    //redirect campground show page
})

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});

// var express     = require("express"),
//     app         = express(),
//     bodyParser  = require("body-parser"),
//     mongoose    = require("mongoose"),
//     Campground  = require("./models/campground"),
//     seedDB      = require("./seeds")
//     // Comment     = require("./models/comment"),
//     // User        = require("./models/user")


// mongoose.connect("mongodb://localhost/yelp_camp_v3");
// app.use(bodyParser.urlencoded({extended:true}));
// app.set("view engine", "ejs");
// seedDB();


// app.get("/", function(req, res){
//     res.render("landing");
    
// });

// //INDEX - show all campgrounds
// app.get("/campgrounds", function(req, res){
//         Campground.find({}, function(err, allcampgrounds){
//             if (err){
//                 console.log(err);
//             }else {
//                 res.render("index", {campgrounds: allcampgrounds})
//             }
//         });
//         //res.render("campgrounds", {campgrounds: campgrounds});
// });

// //CREATE - add new campgrounds to DB
// app.post("/campgrounds", function(req, res){
//     var name = req.body.name; //get name and body
//     var image = req.body.image;
//     var desc = req.body.description;
//     var newCampground = {name: name, image: image, description: desc}; //create object
//     Campground.create(newCampground, function(err, newlyCreated){
//         if (err){
//             console.log(err);
//         } else{
//             res.redirect("/campgrounds");  
//         }
//     })
//     //campgrounds.push(newCampground);
//     res.redirect("/campgrounds");
// });

// //NEW - show form to create new campgrounds
// app.get("/campgrounds/new", function(req, res){
//     res.render("new"); 
// });

// //SHOW - shows more info about one campground
// app.get("/campgrounds/:id", function(req, res){
//     Campground.findById(req.params.id, function(err, foundCampground){
//         if (err){
//             console.log(err);
//             console.log("EEEEERRERERERERER")
//         }else{
//             res.render("show", {campground: foundCampground});
//             console.log("DAAAAAA FUUUUU")
            
//         }
//     });
//     //req.params.id
//     //find the campground wtih provided ID
// })

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("yelp serv started");
// })