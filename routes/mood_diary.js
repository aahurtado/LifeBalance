var moods = require('../moodEntries.json');

var moodCategories = ["Happy", "Tired", "Sad"];

var todaysMood = {
    "name": "Sunday",
    "img": "http://emojione.com/wp-content/uploads/assets/emojis/1f604.svg",
    "mood": "Happy",
    "description": "Spent the day at the beach!!",
    "id": "day0"
}

/*
 * GET home page.
 */
exports.view = function (req, res) {
    res.render('mood_diary', {
        title: 'Mood Diary',
        moodDiaryIsActive: true,
        days: moods.days,
        moodCategories: moodCategories,
        todaysMood: todaysMood
    });
};
