var data = require('../data.json');
var moods = require('../moodEntries.json');

var fun = ["Hiking", "Swimming", "Bowling"];
var work = ["Go to your job", "Gym", "Go to meetings"];
var sleep = ["Go to bed earlier", "Drink warm milk", "Take a nap"];

var happyPic = "http://emojione.com/wp-content/uploads/assets/emojis/1f604.svg";
var sadPic = "http://emojione.com/wp-content/uploads/assets/emojis/1f62d.svg";
var tiredPic = "http://emojione.com/wp-content/uploads/assets/emojis/1f634.svg";

// Used to construct the next event ID
var curIDNum = data.events.length + 1;
var ID = "event";

/*
 * Takes an ID of an event and removes that event from the passed in array
 */
function deleteEvent(id, arr) {
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
            break;
        }
    }
    if (i < arr.length) {
        arr.splice(i, 1);
    }
}

/*
 * GET home page.
 */
function updateLabelsHours(event, add) {
    delta = timeStringToFloat(event.endTime) - timeStringToFloat(event.startTime);
    delta = delta < 0 ? delta + 24 : delta;

    if (add == true) {
        if (event.hasEndTime == true) {
            if (labels.indexOf(event.category) == -1) {
                labels.push(event.category);
                hours.push(delta);
            }
            else {
                hours[labels.indexOf(event.category)] += delta;
            }
        }
    }
    else {
        hours[labels.indexOf(event.category)] -= delta;
        if (hours[labels.indexOf(event.category)] <= 0) {
            var i;
            for (i = 0; i < labels.length; i++) {
                if (labels[i] == event.category) {
                    break;
                }
            }
            if (i < labels.length) {
                labels.splice(i, 1);
                hours.splice(i, 1);
            }
        }
    }

}

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


// sort on key values
function keysrt(key, desc) {
    return function (a, b) {
        return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
}


// sort on key values
function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? 'am' : 'pm'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}


/*
 * GET home page.
 */
exports.addNewEvent = function (req, res) {
    var name = req.body.name;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var startTime12hr = tConvert(startTime);
    var endTime12hr = tConvert(endTime);
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var details = req.body.details;
    var category = req.body.category;
    var newCategory = req.body.newCategory;
    var hasEndTime;

    if (endTime != "") {
        hasEndTime = true;
    } else {
        hasEndTime = false;
    }

    var newID = ID + curIDNum;
    curIDNum++;

    var eventCategory;
    eventCategory = newCategory == "" ? category : newCategory;

    var newEvent = {
        "name": name,
        "startTime": startTime,
        "endTime": endTime,
        "startTime12hr": startTime12hr,
        "endTime12hr": endTime12hr,
        "startDate": startDate,
        "endDate": endDate,
        "details": details,
        "category": eventCategory,
        "hasEndTime": hasEndTime,
        "id": newID
    }

    data.events.push(newEvent);

    data.events.sort(keysrt('startTime', false));

    var labels = [];
    var hours = [];

    calcHoursPerCategory(labels, hours);

    // updateLabelsHours(newEvent, true);

    var suggestions = calcSuggestCategory(labels, hours);
    var idx = indexOfLeastCategory(hours);

    var hasEvents = data.events.length == 0 ? false : true;

    res.render('home', {
        title: 'Home',
        homeIsActive: true,
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
exports.editEvent = function (req, res) {
    var name = req.body.name;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var startTime12hr = tConvert(startTime);
    var endTime12hr = tConvert(endTime);
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var details = req.body.details;
    var category = req.body.category;
    var newCategory = req.body.newCategory;
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

    var eventCategory;
    eventCategory = newCategory == "" ? category : newCategory;

    event.name = name;
    event.startTime = startTime;
    event.endTime = endTime;
    event.startTime12hr = startTime12hr;
    event.endTime12hr = endTime12hr;
    event.startDate = startDate;
    event.endDate = endDate;
    event.details = details;
    event.category = eventCategory;
    event.hasEndTime = hasEndTime;

    data.events.sort(keysrt('startTime', false));

    var labels = [];
    var hours = [];

    calcHoursPerCategory(labels, hours);

    // updateLabelsHours(event, true);

    var suggestions = calcSuggestCategory(labels, hours);
    var idx = indexOfLeastCategory(hours);

    var hasEvents = data.events.length == 0 ? false : true;

    res.render('home', {
        title: 'Home',
        homeIsActive: true,
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
exports.deleteEvent = function (req, res) {
    var id = req.query.id;   

    // updateLabelsHours(data.events[i], false);

    deleteEvent(id, data.events);

    data.events.sort(keysrt('startTime', false));

    var labels = [];
    var hours = [];

     calcHoursPerCategory(labels, hours);
    var suggestions = calcSuggestCategory(labels, hours);
    var idx = indexOfLeastCategory(hours);

    var hasEvents = data.events.length == 0 ? false : true;

    res.render('home', {
        title: 'Home',
        homeIsActive: true,
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
exports.deleteTodaysEvent = function (req, res) {

    var i;
    for (i = data.events.length; i > 0; i--) {
        data.events.pop();
    }

    var hasEvents = data.events.length == 0 ? false : true;

    res.render('home', {
        title: 'Home',
        homeIsActive: true,
        hasEvents: hasEvents
    });
};


/*
 * GET home page.
 */
exports.editMoodEntry = function (req, res) {
    var id = req.body.id;
    var newMood = req.body.mood;
    var description = req.body.description;

    var i;
    for (i = 0; i < moods.days.length; i++) {
        if (moods.days[i].id == id) {
            break;
        }
    }

    var mood = moods.days[i];
    mood.mood = newMood;

    if (description != "") {
        mood.description = description;
    }    

    if (newMood == "Happy") {
        mood.img = happyPic;
    } else if (newMood == "Sad") {
        mood.img = sadPic;
    } else {
        mood.img = tiredPic;
    }

    res.render('mood_diary', {
        title: 'Mood Diary',
        moodDiaryIsActive: true,
        days: moods.days
    });
};
