/*
 * GET home page.
 */
 exports.view = function(req, res){
 	res.render('suggestions', {
 		title: 'Suggestions',
 		suggestionsIsActive: true
 	});
 }; 