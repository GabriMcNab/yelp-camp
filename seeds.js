var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Beigua",
    image: "https://farm8.staticflickr.com/7179/6927088769_cc14a7c68e.jpg",
    description: "Lorizzle ipsum funky fresh sit amizzle, uhuh ... yih! adipiscing my shizz. Check out this own yo' velizzle, gizzle volutpizzle, suscipizzle break yo neck, yall, owned vizzle, doggy. Pellentesque hizzle tortor. Sed erizzle. Crazy izzle dolor dapibus yo tempizzle yo. Crazy get down get down nibh yo mamma turpis. Fo shizzle izzle tortor. Pellentesque fo rhoncizzle nisi. In hizzle that's the shizzle pimpin' dictumst. Donec dapibus. Ma nizzle tellizzle check it out, pretizzle go to hizzle, mattizzle ac, sizzle vitae, nunc. We gonna chung suscipit. Integer sempizzle gangsta sizzle shiznit.",
  }, 
  {
    name: "Piccolo Ranch",
    image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
    description: "Lorizzle ipsum funky fresh sit amizzle, uhuh ... yih! adipiscing my shizz. Check out this own yo' velizzle, gizzle volutpizzle, suscipizzle break yo neck, yall, owned vizzle, doggy. Pellentesque hizzle tortor. Sed erizzle. Crazy izzle dolor dapibus yo tempizzle yo. Crazy get down get down nibh yo mamma turpis. Fo shizzle izzle tortor. Pellentesque fo rhoncizzle nisi. In hizzle that's the shizzle pimpin' dictumst. Donec dapibus. Ma nizzle tellizzle check it out, pretizzle go to hizzle, mattizzle ac, sizzle vitae, nunc. We gonna chung suscipit. Integer sempizzle gangsta sizzle shiznit.", 
  }, 
  {
    name: "Silent Hill",
    image: "https://farm8.staticflickr.com/7677/17482091193_e0c121a102.jpg",
    description: "Lorizzle ipsum funky fresh sit amizzle, uhuh ... yih! adipiscing my shizz. Check out this own yo' velizzle, gizzle volutpizzle, suscipizzle break yo neck, yall, owned vizzle, doggy. Pellentesque hizzle tortor. Sed erizzle. Crazy izzle dolor dapibus yo tempizzle yo. Crazy get down get down nibh yo mamma turpis. Fo shizzle izzle tortor. Pellentesque fo rhoncizzle nisi. In hizzle that's the shizzle pimpin' dictumst. Donec dapibus. Ma nizzle tellizzle check it out, pretizzle go to hizzle, mattizzle ac, sizzle vitae, nunc. We gonna chung suscipit. Integer sempizzle gangsta sizzle shiznit.",
  }
]

function seedDB(){
  //Remove campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("removed campgrounds!");
      //Add a few campgrounds
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err){
            console.log(err);
          } else {
            console.log("Added new campground!");
            Comment.create(
              {
                text: "Una volta ho cagato da un albero!",
                author: "Gabri",
              }, function(err, comment){
                if(err){
                  console.log(err);
                } else {
                  campground.comments.push(comment._id);
                  campground.save();
                  console.log("Created new comment");
                }
              });
          }
        });
      });
    }
  });
}

module.exports = seedDB;
