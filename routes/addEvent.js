var data = require('../data.json');

/*
 * GET home page.
 */
 exports.addNewEvent = function(req, res){
 	var name = req.query.name;
 	var time = req.query.time;
 	var details = req.query.details;

 	var newEvent = {
 		"name": name,
 		"time": time,
 		"details": details		
 	}

	console.log("[DEBUG] addEvent ran");
	console.log("[DEBUG] newEvent is: ");
	console.log(newEvent);

 	//data.events.push(newEvent);

 	res.render('home', data);
 };