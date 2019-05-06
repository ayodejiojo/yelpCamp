const mongoose = require('mongoose');
const Comment = require('./comments');

const campgroundSchema = new mongoose.Schema({
                   name: String,
                   price: String,
                   image: String,
                   description: String,
                   author: {
                   	     id:{
                              type: mongoose.Schema.Types.ObjectId,
                              ref: 'User'
                   	     },
                   	   username: String
                   },
                   
                   comments: [
                           {
                           	 type: mongoose.Schema.Types.ObjectId,
                           	 ref: 'Comment'
                           }
                          
                   ]
});

//const Campground = mongoose.model('Campground', campgroundSchema);

module.exports = mongoose.model('Campground', campgroundSchema);