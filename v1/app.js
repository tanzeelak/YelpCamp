var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [
            {name: "Salmon Creek", image: "https://hd.unsplash.com/photo-1444124818704-4d89a495bbae"},
            {name: "Granite Hill", image: "https://hd.unsplash.com/photo-1455763916899-e8b50eca9967"},
            {name: "Mountain Goat's Rest", image: "https://hd.unsplash.com/photo-1465695954255-a262b0f57b40"},
            {name: "Salmon Creek", image: "https://hd.unsplash.com/photo-1444124818704-4d89a495bbae"},
            {name: "Granite Hill", image: "https://hd.unsplash.com/photo-1455763916899-e8b50eca9967"},
            {name: "Mountain Goat's Rest", image: "https://hd.unsplash.com/photo-1465695954255-a262b0f57b40"},
            {name: "Salmon Creek", image: "https://hd.unsplash.com/photo-1444124818704-4d89a495bbae"},
            {name: "Granite Hill", image: "https://hd.unsplash.com/photo-1455763916899-e8b50eca9967"},
            {name: "Mountain Goat's Rest", image: "https://hd.unsplash.com/photo-1465695954255-a262b0f57b40"}

        ]

app.get("/", function(req, res){
    res.render("landing");
    
});

app.get("/campgrounds", function(req, res){
    
        res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelp serv started");
})