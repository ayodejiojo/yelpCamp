const express =require('express');
const router = express.Router();
const Campground = require('../models/campground');
const Comment= require('../models/comments');
const middleware = require('../middleware');





router.get('/', (req, res) => {
 //  console.log(req.params);
   // To get who is currently logged in 
   // console.log(req.user);
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
          console.log('err');
        }else{
           res.render('campground/index', {campground: allCampgrounds});
        }
    });

 
});


router.post('/',  middleware.isLoggedIn, (req, res) => {
    // let name = req.body.names;
    // let image = req.body.image;
    // let newCampground = {name: name, image: image};
    Campground.create({
         name: req.body.name,
         image: req.body.image,
         price:req.body.price,
         description: req.body.description,
         author: {
         	id: req.user._id,
         	username: req.user.username
         }
    }, (err) =>{
      if(err){
        req.flash('error', 'something went wrong');
        console.log(err);
      }else{
            res.redirect('/campgrounds');
      }
    });
    //campground.push(newCampground);

  
});

router.get('/new',  middleware.isLoggedIn, (req, res) => {
    res.render('campground/new');
});

router.get('/:id', (req, res) =>{
  Campground.findById(req.params.id).populate('comments').exec((err, allCampgrounds) => {
    if(err){
      console.log(err)
    }else{
      //console.log(allCampgrounds);
      res.render('campground/show', {campground: allCampgrounds});
    }
  });
  // res.send('this is id page');
});


router.get('/:id/edit',  middleware.checkCampgroundOwnership, (req, res) => {
      Campground.findById(req.params.id, (err, campground) => {
          if(err){
            req.flash('error', 'something went wrong');
          	res.redirect('back');
          }else{
             
              		res.render('campground/edit', {camp: campground});
              	}   
});

 });


router.put('/:id',  middleware.checkCampgroundOwnership, (req, res) => {
   Campground.findByIdAndUpdate(req.params.id, req.body.camp, (err) => {
        if(err){
          req.flash('error', 'Something went wrong');
        	res.redirect('/campgrounds');
        }else{
          req.flash('successs', 'successfully added a comment');
        	res.redirect('/campgrounds/' + req.params.id);
        }
   });
});

router.delete('/:id',  middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
  	  if(err){
  	  	res.redirect('/campgrounds');
  	  }else{
        req.flash('success', 'successfully deleted campground');
  	  	res.redirect('/campgrounds');
  	  }
  })
});


// function isLoggedIn(req, res, next){
//    if(req.isAuthenticated()){
//       return next();
//    }res.redirect('/login');
// }

//====================================================================
// To check If the Current User has the same id with campgrounds routes
//=====================================================================




module.exports = router;