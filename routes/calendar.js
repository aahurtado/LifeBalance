var data = require('../data.json');
var fs = require('fs');

/*
 * GET home page.
 */
function calcHoursPerCategory(labels, hours) {
    var dataFile = fs.readFileSync('data.json');
    var data = JSON.parse(dataFile);
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
function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
}

/*
 * GET home page.
 */
exports.view = function(req, res) {
    res.render('calendar', {
        title: 'Calendar',
        calendarIsActive: true,
        eventCategories: labels
    });
};

/*
 * GET home page.
 */
exports.view2 = function(req, res) {
    var labels = [];
    var hours = [];
    calcHoursPerCategory(labels, hours);

    res.render('calendar2', {
        title: 'Calendar',
        calendarIsActive: true,
        eventCategories: labels
    });
};
