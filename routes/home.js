var data = require('../data.json');

// sort on key values
function keysrt(key, desc) {
    return function(a, b) {
        return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
}

exports.view = function(req, res) {

    data.events.sort(keysrt('startTime', false));

    res.render('home', {
        title: 'Home',
        homeIsActive: true,
        events: data.events
    });

};

exports.eventsJSON = function(req, res) {
    res.json(data.events);
};