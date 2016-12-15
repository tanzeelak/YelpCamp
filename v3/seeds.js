var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {   name: "Cloud's Rest",
            image: "https://hd.unsplash.com/photo-1471115853179-bb1d604434e0",
            description: "blah blah balh"
        },
        {   name: "Desert Mesa",
            image: "https://hd.unsplash.com/photo-1455763916899-e8b50eca9967",
            description: "blah blah balh"
        },
        {   name: "Canyon Floor",
            image: "https://hd.unsplash.com/19/nomad.JPG",
            description: "blah blah balh"
        }
    ]

// function seedDB(){
//         //remove all campgrounds
//         Campground.remove({}, function(err){
//         if (err){
//             console.log(err);
//         }
//         console.log("removed cap");
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if (err){
//                         console.log(err);
//                     }
//                     else{
//                         console.log("added a campground");
                        
//                         Comment.create({
//                             text: "This place is great, but I wish there was internet.",
//                             author: "Homer"
//                         }, function(err, comment){
//                             if (err){
//                                 console.log(err);
//                             } else {
//                                 campground.comments.push(comment);
//                                 campground.save();
//                                 console.log("created new comment")
//                             }

//                         })
//                     }
//                 });
//             });
//         });

//         //add a few comments
// }

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}


module.exports = seedDB;