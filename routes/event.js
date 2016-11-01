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

    var event;
    for (event in data.events) {
        if (data.events[event].id == id) {
            break;
        }
    }

    data.events.splice(event, 1);

    res.render('home', data);
};
