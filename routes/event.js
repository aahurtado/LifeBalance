var data = require('../data.json');

// Used to construct the next event ID
var curIDNum = data.events.length + 1;
var ID = "event";

/*
 * GET home page.
 */
exports.addNewEvent = function(req, res) {
    var name = req.body.name;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var date = req.body.date;
    var details = req.body.details;
    var category = req.body.category;
    var hasEndTime;

    if (endTime != "") {
        hasEndTime = true;
    } else {
        hasEndTime = false;
    }

    var newID = ID + curIDNum;
    curIDNum++;

    var newEvent = {
        "name": name,
        "startTime": startTime,
        "endTime": endTime,
        "date": date,
        "details": details,
        "category": category,
        "hasEndTime": hasEndTime,
        "id": newID
    }

    data.events.push(newEvent);

    res.render('home', data);
};

/*
 * GET home page.
 */
exports.editEvent = function(req, res) {
    var name = req.body.name;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var date = req.body.date;
    var details = req.body.details;
    var category = req.body.category;
    var id = req.body.id;
    var hasEndTime;

    if (endTime != "") {
        hasEndTime = true;
    } else {
        hasEndTime = false;
    }

    var idx;
    for (idx in data.events) {
        if (data.events[idx].id == id) {
            break;
        }
    }

    var event = data.events[idx];

    event.name = name;
    event.startTime = startTime;
    event.endTime = endTime;
    event.date = date;
    event.details = details;
    event.category = category;
    event.hasEndTime = hasEndTime;

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
