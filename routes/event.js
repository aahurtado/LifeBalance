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
