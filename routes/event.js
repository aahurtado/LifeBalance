var data = require('../data.json');

// Used to construct the next event ID
var curIDNum = 5;
var ID = "event";

/*
 * GET home page.
 */
exports.addNewEvent = function(req, res) {
    var name = req.body.name;
    var time = req.body.time;
    var details = req.body.details;
    var category = req.body.category;

    var newID = ID + curIDNum;
    curIDNum++;

    var newEvent = {
        "name": name,
        "time": time,
        "details": details,
        "category": category,
        "id": newID
    }

    data.events.push(newEvent);

    res.render('home', data);
};

/*
 * GET home page.
 */
exports.editEvent = function(req, res) {
    var name = req.query.name;
    var time = req.query.time;
    var details = req.query.details;
    var category = req.query.category;
    var id = req.query.id;

    var idx;
    for (idx in data.events) {
        if (data.events[idx].id == id) {
            break;
        }
    }

    var event = data.events[idx];

    event.name = name;
    event.time = time;
    event.details = details;
    event.category = category;

    res.render('home', data);
};

/*
 * GET home page.
 */
exports.deleteEvent = function(req, res) {
    var id = req.query.id;

    var i;
    for (i = 0; i < data.events.length; i++) {
        if (data.events[i].id == id) {
            break;
        }
    }

    if (i < data.events.length) {
        data.events.splice(i, 1);
    }

    res.render('home', data);
};
