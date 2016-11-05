var data = require('../data.json');
var fun = ["Hiking", "Swimming", "Bowling"];
var work = ["Go to your job", "Gym", "Go to meetings"];
var sleep = ["Go to bed earlier", "Drink warm milk", "Take a nap"];

exports.calculateSuggestions = function() {
    console.log("Hello Wolrd");
}

function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
}


// sort on key values
function keysrt(key, desc) {
    return function (a, b) {
        return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
}


exports.view = function (req, res) {
    data.events.sort(keysrt('startTime', false));

    var i;
    var currevent;
    var labels = [];
    var hours = [];
    for (i = 0; i < data.events.length; i++) {
        currevent = data.events[i];
        if (currevent.hasEndTime == true) {
            delta = timeStringToFloat(currevent.endTime) - timeStringToFloat(currevent.startTime);
            delta = delta < 0 ? delta + 24 : delta;
            if (labels.indexOf(currevent.category) == -1) {
                labels.push(currevent.category);
                hours.push(delta);
            }
            else {
                hours[labels.indexOf(currevent.category)] += delta;
            }
        }
    }

    var min = Number.MAX_SAFE_INTEGER;
    var idx;
    for (i = 0; i < hours.length; i++) {
        if (hours[i] < min) {
            min = hours[i];
            idx = i;
        }
    }

    var suggestions;
    if (labels[idx] == "Work") { suggestions = work; }
    else if (labels[idx] == "Fun") { suggestions = fun; }
    else if (labels[idx] == "Sleep") { suggestions = sleep; }

    res.render('home', {
        title: 'Home',
        homeIsActive: true,
        category: labels[idx],
        suggestions: suggestions,
        events: data.events
    });

};


exports.eventsJSON = function (req, res) {
    res.json(data.events);
};