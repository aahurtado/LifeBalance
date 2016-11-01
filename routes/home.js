var data = require('../data.json');
var gData = require('../graphData.json');

exports.view = function(req, res) {
    res.render('home', {
        title: 'Home',
        homeIsActive: true,
        events: data.events,
        graphData: gData
    });
};
