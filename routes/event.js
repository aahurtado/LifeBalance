var data = require('../data.json');
var moods = require('../moodEntries.json');
var happyPic = "http://emojione.com/wp-content/uploads/assets/emojis/1f604.svg";
var sadPic = "http://emojione.com/wp-content/uploads/assets/emojis/1f62d.svg";
var tiredPic = "http://emojione.com/wp-content/uploads/assets/emojis/1f634.svg";


// Used to construct the next event ID
var curIDNum = data.events.length + 1;
var ID = "event";


// sort on key values
function keysrt(key, desc) {
    return function(a, b) {
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
exports.addNewEvent = function(req, res) {
    var name = req.body.name;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var startTime12hr = tConvert(startTime);
    var endTime12hr = tConvert(endTime);
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
        "startTime12hr": startTime12hr,
        "endTime12hr": endTime12hr,
        "date": date,
        "details": details,
        "category": category,
        "hasEndTime": hasEndTime,
        "id": newID
    }

    data.events.push(newEvent);

    data.events.sort(keysrt('startTime', false));

    console.log(data.events);

    res.render('home', data);
};


/*
 * GET home page.
 */
exports.editEvent = function(req, res) {
    var name = req.body.name;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var startTime12hr = tConvert(startTime);
    var endTime12hr = tConvert(endTime);
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
    event.startTime12hr = startTime12hr;
    event.endTime12hr = endTime12hr;
    event.date = date;
    event.details = details;
    event.category = category;
    event.hasEndTime = hasEndTime;

    data.events.sort(keysrt('startTime', false));

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

    data.events.sort(keysrt('startTime', false));

    res.render('home', data);
};


/*
 * GET home page.
 */
exports.editMoodEntry = function(req, res) {
    var id = req.body.id;
    var newMood = req.body.mood;

    var i;
    for (i = 0; i < moods.days.length; i++) {
        if (moods.days[i].id == id) {
            break;
        }
    }

    var mood = moods.days[i];
    mood.mood = newMood;

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
