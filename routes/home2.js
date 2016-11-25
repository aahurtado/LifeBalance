// var data = require('../data.json');
var fs = require('fs');
var dataFile = fs.readFileSync('data.json');
var data = JSON.parse(dataFile);

var fun = ["Hiking", "Swimming", "Bowling"];
var work = ["Go to your job", "Gym", "Go to meetings"];
var sleep = ["Go to bed earlier", "Drink warm milk", "Take a nap"];

var labels = [];
var hours = [];

/*
 * GET home page.
 */
function calcHoursPerCategory(labels, hours) {
    var i;
    var currevent;
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
}


/*
 * GET home page.
 */
function indexOfLeastCategory(arr) {
    var min = Number.MAX_SAFE_INTEGER;
    var idx;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            idx = i;
        }
    }
    return idx;
}


/*
 * GET home page.
 */
function calcSuggestCategory(labels, hours) {

    var idx = indexOfLeastCategory(hours);

    if (labels[idx] == "Work") { return work; }
    else if (labels[idx] == "Fun") { return fun; }
    else if (labels[idx] == "Sleep") { return sleep; }
}


/*
 * GET home page.
 */
function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
}


/*
 * GET home page.
 */
function keysrt(key, desc) {
    return function (a, b) {
        return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
}


/*
 * GET home page.
 */
exports.view = function (req, res) {
    data.events.sort(keysrt('startTime', false));

    calcHoursPerCategory(labels, hours);
    var suggestions = calcSuggestCategory(labels, hours);
    var idx = indexOfLeastCategory(hours);

    var hasEvents = data.events.length == 0 ? false : true;

    res.render('home2', {
        title: 'Home',
        //homeIsActive: true,
        category: labels[idx],
        suggestions: suggestions,
        events: data.events,
        eventCategories: labels,
        hasEvents: hasEvents
    });

};


/*
 * GET home page.
 */
exports.eventsJSON = function (req, res) {
    res.json(data.events);
};