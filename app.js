const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy =require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const methodOverride = require('method-override');

const User = require('./models/user');
const Campground = require('./models/campground');
const Comment = require('./models/comments');
const seedDB = require('./seed');

//Reqiuring Routes
const commentRoute = require('./routes/comment');
const campgroundRoute = require('./routes/campground');
const authRoute = require('./routes/auth');


const port = process.env.PORT || 5000;


//seedDB();

app.use(express.static( __dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(require('express-session')({
    secret: 'for  money without happiness',
    resave: false,
    saveUninitialized : false
}));

//================
// PASSPORT CONFIG
//================

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
//passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//============
// Flash Messages
//==============

app.use(flash());

  //================================
 // TO GET CURRENT USER FOR NAV BAR
 //==================================
 app.use((req, res, next)=> {
     res.locals.currentUser = req.user;
     res.locals.error = req.flash('error');
     res.locals.success = req.flash('success');
      next();
 });
 //=================================
// TO get the Current Flash Messsages
//===================================


app.use('/campgrounds/:id/comments', commentRoute);
app.use('/campgrounds', campgroundRoute);
app.use('/', authRoute);



app.set('view engine', 'ejs');



mongoose.connect('mongodb://localhost/yelp_camp')
.then(() => console.log('connected to DB:'))
.catch((err) => console.err('failed to cnnnect to DB:'));



// Campground.create({
//       name: 'Wesley Snipes',
//      image: 'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg',
//      description: 'This is wesley snipes baba, oya black man'
// }, (err, campground) =>{
//          if(err){
//           console.log('could not add');
//          }else{
//           console.log(campground);
//           }
//  });

 // campground = [
     
 //       {name: 'Wesley Snipes', image: 'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg'},
 //       {name: 'Alexenda daddario', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
 //         {name: 'Will Smith', image: 'https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144491f0c770afeeb0_340.jpg'},
 //       {name: 'Wesley Snipes', image: 'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg'},
 //       {name: 'Alexenda daddario', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
 //       {name: 'Alexenda daddario', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
 //         {name: 'Will Smith', image: 'https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144491f0c770afeeb0_340.jpg'},
 //       {name: 'Wesley Snipes', image: 'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg'}
    
 //  ];




app.get('/', (req, res) => {
   res.render('landing');
});


// app.get('/campgrounds', (req, res) => {
   
//    // To get who is currently logged in 
//    // console.log(req.user);
//     Campground.find({}, (err, allCampgrounds) => {
//         if(err){
//           console.log('err');
//         }else{
//            res.render('campground/index', {campground: allCampgrounds});
//         }
//     });

 
// });


// app.post('/campgrounds', (req, res) => {
//     // let name = req.body.names;
//     // let image = req.body.image;
//     // let newCampground = {name: name, image: image};
//     Campground.create({
//          name: req.body.name,
//          image: req.body.image,
//          description: req.body.description
//     }, (err) =>{
//       if(err){
//         console.log(err);
//       }else{
//             res.redirect('/campground');
//       }
//     });
//     //campground.push(newCampground);

  
// });

// app.get('/Campgrounds/new', (req, res) => {
//     res.render('campground/new');
// });

// app.get('/campgrounds/:id', (req, res) =>{
//   Campground.findById(req.params.id).populate('comments').exec((err, allCampgrounds) => {
//     if(err){
//       console.log(err)
//     }else{
//       //console.log(allCampgrounds);
//       res.render('campground/show', {campground: allCampgrounds});
//     }
//   });
//   // res.send('this is id page');
// });

//==========================
// COMMMENTS ROUTES
//=========================

// app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
//   Campground.findById(req.params.id, (err, allCampgrounds) => {
//             if(err){
//               console.log(err);
//             }else{
//               res.render('comments/new', {campground: allCampgrounds});
//             }
//   });
// });


// app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) =>{
//  Campground.findById(req.params.id, (err, campground) =>{
//        if(err){
//         res.redirect('/campgrounds');
//        }else{
//             Comment.create(req.body.comment, (err, comment) => {
//                     if(err){
//                       res.redirect('/campgrounds');
//                     }else{
//                       campground.comments.push(comment);
//                       campground.save();
//                       res.redirect('/campgrounds/' + campground._id);
//                     }
//             });
//        }
//  });
// });


//=====================
// REGISTER USER
//================


// app.get('/register', (req, res) => {
//   res.render('register');
// });

// app.post('/register', (req, res) => {
//   User.register(new User({ username: req.body.username}), req.body.password, (err, user) => {
//          if(err){
//           console.log(err);
//           return res.render('register');
//          }
//          passport.authenticate('local')(req, res, () => {
//            res.redirect('/campgrounds');
//          })
//   });
// })







//=================
// LOGIN USER
//=================


// app.get('/login', (req, res) => {
//     res.render('login')
// });

// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/campgrounds',
//   failureRedirect: '/login'
// }), (req, res) =>{

// });







//===========
// LOGOUT
//===========

// app.get('/logout', (req, res) => {
//    req.logout();
//    res.redirect('/campgrounds');
// });


// function isLoggedIn(req, res, next){
//    if(req.isAuthenticated()){
//       return next();
//    }res.redirect('/login');
// }




app.listen(port, () => { console.log(`listening on ${port}...`)});







 






