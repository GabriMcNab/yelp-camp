var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//NEW
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
        res.render("comments/new", {campground: foundCampground});
    }
  });
});

//CREATE
router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req, res){
  //Lookup campground using ID
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //Create new comment
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          req.flash("error", "Something went wrong...");
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          //Connect comment to campground
          foundCampground.comments.push(comment._id);
          foundCampground.save();
          //Redirect to show page
          req.flash("success", "Comment successfully created!");
          res.redirect("/campgrounds/" + foundCampground._id)
        }
      });
    }
  });
});

//EDIT
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err || !foundCampground){
      req.flash("error", "Campground not found");
      return res.redirect("back");
    }
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err || !foundComment){
        req.flash("error", "Comment not found");
        res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
    });
  });
});

//UPDATE
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Comment removed!");
      res.redirect("back");
    }
  });
});

module.exports = router;
