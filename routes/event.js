var data = require('../data.json');

/*
 * GET home page.
 */
exports.addNewEvent = function(req, res) {
    var name = req.query.name;
    var time = req.query.time;
    var details = req.query.details;

    var newEvent = {
        "name": name,
        "time": time,
        "details": details
    }

    //console.log("[DEBUG] addEvent ran");
    //console.log("[DEBUG] newEvent is: ");
    //console.log(newEvent);

    data.events.push(newEvent);

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
