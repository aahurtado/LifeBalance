var moods = require('../moodEntries.json');

/*
 * GET home page.
 */
exports.view = function(req, res) {
    res.render('mood_diary', {
        title: 'Mood Diary',
        moodDiaryIsActive: true,
        days: moods.days
    });
};
