const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comments');


let data = [

       {
       	name: 'Wesley Snipes',
       	image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg',
       	description: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
       },

       {
       	name: 'John Travolta',
       	image: 'https://farm4.staticflickr.com/3282/2770447094_2c64348643.jpg',
       	description: 'He is a whiteman'
       },

       {
       	name: 'Jackie Chan',
       	image: 'https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg',
       	description: 'He is a chineseman'
       }
      
]

function seedDB(){
		Campground.remove({}, (err, camp) => {
	   if(err){
	   	console.log(err);
	   }else{
	   	console.log('removed campgrounds!!');
     }
	   //	for(let i =0; i < data.length; i++){
	//    	data.forEach((data) => {
	//    		Campground.create(data, (err, campground) => {
 //                if(err){
 //                	console.log(err);
 //                }else{
 //                	console.log('Campground added');
 //                	Comment.create({
 //                		text: 'Best place ever liveth oya now',
 //                		author: 'Olamide'
 //                	}, (err, comment) => {
 //                          if(err){
 //                          	console.log(err);
 //                          }else{
 //                          	campground.comments.push(comment);
 //                          	campground.save();
 //                          	console.log('new comment added');
 //                          }
 //                	});
 //                }
	//    		});

	//    	});
	   		
	//    	}
	   
	 });

}

module.exports = seedDB;
