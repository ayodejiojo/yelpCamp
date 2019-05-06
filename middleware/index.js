  

//====================================================================
// To check If the Current User has the same id with campgrounds routes
//=====================================================================

const express = require('express');
const Campground = require('../models/campground');
const Comment = require('../models/comments');
 let middlewareObj = {};

  middlewareObj.checkCampgroundOwnership= function (req, res, next){
	  if(req.isAuthenticated()){
      Campground.findById(req.params.id, (err, campground) => {
          if(err){
            req.flash('error', 'Campground no found');
          	res.redirect('back');
          }else{
              if(campground.author.id.equals(req.user._id)){
              		next();
              	}else{
                  req.flash('error', 'you do not have permission to do that');
              		res.redirect('back');
              	}
          }

        });
  }else{
    req.flash('error', 'you need to be logged in to that');
  	res.redirect('back');
  }
}

   middlewareObj.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
      Comment.findById(req.params.comments_id, (err, comment) => {
          if(err){
            req.flash('error', 'comment not found');
            res.redirect('back');
          }else{
              if(comment.author.id.equals(req.user._id)){
                  next();
                }else{
                  req.flash('error', 'need to be logged in ')
                  res.redirect('back');
                }
          }

        });
  }else{
    req.flash('error', 'you need to be loggged in to do that');
    res.redirect('back');
  }

}
// middleware to Know when a user is logged in
middlewareObj.isLoggedIn= function (req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   req.flash('error', 'Please Login first!!');
   res.redirect('/login');
}


module.exports = middlewareObj;