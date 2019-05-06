const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;  
  passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

//Form to register user
router.get('/register', (req, res) => {
  res.render('register');
});

//Logic to create user
router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username}), req.body.password, (err, user) => {
         if(err){
         // console.log(err);
          req.flash('error', err.message);
          return res.render('register');
         }
         passport.authenticate('local')(req, res, () => {
           req.flash('success', 'welcome ' + user.username);
           res.redirect('/campgrounds');
         })
  });
})


 
  // function(req, name, password, done) {
  //   User.findOne({ username: req.body.username  }, function(err, user) {
  //     if (err)
  //         req.flash('error', err.message);
     
  //   });
  // };
  // function(req, email, password, done) {
  //   User.findOne({ 'local.email':  email }, function(err, user) {
  //     if (err)
  //         return done(err);
  //     if (!user)
  //         return done(null, false, req.flash('loginMessage', 'No user found.'));
  //     if (!user.validPassword(password))
  //         return done(null, false, req.flash('loginMessage', 'Wrong password.'));
  //     return done(null, user);
  //   });
  // }));




//Form to Login
router.get('/login', (req, res) => {
    res.render('login'); //{message: req.flash('error')
     
});
// Logic to create login
// router.post(
//   '/login', passport.authenticate('local', {
 
//   successRedirect: '/campgrounds',
//   failureRedirect: '/login'
// }), (req, res) =>{

// });
// c
// const { firstName, lastName, email, password } = req.body;
//   if (firstName === ' ' || lastName === ' ' || email === ' ' || password === ' ') {
//     res.json('Please fill fields').status(422);
//   } else if (firstName && lastName && email && password) {
//     const user = database.users.filter(u => u.email === email && u.password === password);
//     if (user.length > 0 && user[0].email) {
//       res.status(409).json('Email and password already taken!');


 
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//       // if(username === '' || password === ''){ 
//       //     req.flash('error', 'please fill fields');
//               res.redirect('/login');
      
//        passport.authenticate('local')(req, res, () => {
      
//     req.flash('success', 'Successfully logged in ');
//     res.redirect('/campgrounds');

//     });
//   }
// ));

router.post('/login',(req, res) => {
   // const username = req.body.username;
   // const password = req.body.password;
   User.findOne({ username: req.body.username }, function (err, user) {
      if(err){
          console.log(err);
          res.redirect('/login');
        }
      
       passport.authenticate('local')(req, res, () => {
      
    req.flash('success', 'Successfully logged in ');
    res.redirect('/campgrounds');
  });
   });
 });
  
  
 





//To logout user
router.get('/logout', (req, res) => {
   req.logout();
   req.flash('success', 'successfully signed out');
   res.redirect('/campgrounds');
});

// middleware to Know when a user is logged in
// function isLoggedIn(req, res, next){
//    if(req.isAuthenticated()){
//       return next();
//    }res.redirect('/login');
// }


module.exports = router;