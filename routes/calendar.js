/*
 * GET home page.
 */
exports.view = function(req, res) {
    res.render('calendar', {
        title: 'Calendar',
        calendarIsActive: true
    });
};

/*
 * GET home page.
 */
exports.view2 = function(req, res) {
    res.render('calendar2', {
        title: 'Calendar',
        calendarIsActive: true
    });
};
