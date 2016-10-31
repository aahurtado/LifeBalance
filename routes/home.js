var data = require('../data.json');

/*
 * GET home page.
 */
 exports.view = function(req, res){
 	console.log("yay,home just ran!");
 	res.render('home', data);
 };