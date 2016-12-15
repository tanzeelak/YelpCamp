var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//comments new
//COMMENTS ROUTES
router.get("/new", isLoggedIn, function(req, res){
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
    });
});

//comments create
router.post("/", isLoggedIn, function(req, res){
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
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
    //create new comment
    //connect new comment to campground
    //redirect campground show page
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
