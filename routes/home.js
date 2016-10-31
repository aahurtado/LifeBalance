/*
 * GET home page.
 */
exports.view = function(req, res){
 	res.render('home', {
 		title: 'Home',
 		homeIsActive: true,
 		'events':	[	
 			{ 'name': 'Lunch With Family',	
 			  'time': '12:30pm',	
 		      'details': 'Armins birthday lunch.',
 		      'id': 'event1'
 			},	
 			{ 'name': 'Dinner Date',	
 			  'time': '6:00pm',
 			  'details': 'Dinner with Emily',	
 			  'id': 'event2'
 			},	
 			{ 'name': 'Gym',	
 			  'time': '11:00pm',	
 			  'details': 'Leg day',
 	 		  'id':	'event3'	
			},
			{ 'name': 'Sleep',	
 			  'time': '12:00pm',	
 			  'details': 'Go to bed',
 	 		  'id':	'event3'	
			},
		]
 	});
 };