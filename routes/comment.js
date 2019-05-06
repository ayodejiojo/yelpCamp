const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comments');
const Auth       = require('./auth');
const middleware = require('../middleware')


//To show form for new comments
router.get('/new', middleware.isLoggedIn, (req, res) => {
	console.log(req.params);
  Campground.findById(req.params.id, (err, allCampgrounds) => {
            if(err){
              console.log(err);
            }else{
              res.render('comments/new', {campground: allCampgrounds});
            }
  });
});

//Logic to create new comments
router.post('/',  middleware.isLoggedIn, (req, res) =>{
 Campground.findById(req.params.id, (err, campground) =>{
       if(err){
        res.redirect('/campgrounds');
       }else{
            Comment.create(req.body.comment, (err, comment) => {
                    if(err){
                      req.flash('error', 'something went wrong');
                      res.redirect('/campgrounds');
                    }else{
                      comment.author.id = req.user._id;
                      comment.author.username = req.user.username;
                      comment.save();

                      campground.comments.push(comment);
                      campground.save();
                      req.flash('success', 'successfully added comment');
                      res.redirect('/campgrounds/' + campground._id);
                    }
            });
       }
 });
});


router.get('/:comments_id/edit',  middleware.checkCommentOwnership, (req, res) => {
     Comment.findById(req.params.comments_id, (err, updatedComment) => {
         if(err){
          res.redirect('back');
         }else{
             res.render('comments/edit', {campground_id: req.params.id, comment: updatedComment});
         }
     });
        
});

router.put('/:comments_id',  middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, (err) => {
      if(err){
          res.redirect('back');
      }else{
        req.flash('success', 'successfully added comment');
         res.redirect('/campgrounds/' + req.params.id);
      }
    });
});

router.delete('/:comments_id',  middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comments_id, (err) => {
      if(err){
        res.redirect('back');
      }else{
        req.flash('success', 'sucessfully deleted comment');
        res.redirect('/campgrounds/' + req.params.id);
      }
    })
})


// middleware to Know when a user is logged in


module.exports = router;