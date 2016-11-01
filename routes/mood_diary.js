/*
 * GET home page.
 */
exports.view = function(req, res) {
    res.render('mood_diary', {
        title: 'Mood Diary',
        moodDiaryIsActive: true,
        'days': [{
            'name': 'Sunday',
            'img': 'http://emojione.com/wp-content/uploads/assets/emojis/1f604.svg',
            'mood': 'Happy',
            'id': 'day1'
        }, {
            'name': 'Monday',
            'img': 'http://emojione.com/wp-content/uploads/assets/emojis/1f604.svg',
            'mood': 'Happy',
            'id': 'day1'
        }, {
            'name': 'Tuesday',
            'img': 'http://emojione.com/wp-content/uploads/assets/emojis/1f604.svg',
            'mood': 'Happy',
            'id': 'day1'
        }, {
            'name': 'Wednesday',
            'img': 'http://emojione.com/wp-content/uploads/assets/emojis/1f604.svg',
            'mood': 'Happy',
            'id': 'day1'
        }, {
            'name': 'Thursday',
            'img': 'http://emojione.com/wp-content/uploads/assets/emojis/1f604.svg',
            'mood': 'Happy',
            'id': 'day1'
        }, {
            'name': 'Friday',
            'img': 'http://emojione.com/wp-content/uploads/assets/emojis/1f604.svg',
            'mood': 'Happy',
            'id': 'day1'
        }, {
            'name': 'Saturday',
            'img': 'http://emojione.com/wp-content/uploads/assets/emojis/1f604.svg',
            'mood': 'Happy',
            'id': 'day1'
        }, ]
    });
};
