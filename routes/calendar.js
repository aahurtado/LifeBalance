/*
 * GET home page.
 */
exports.view = function(req, res) {
    res.render('calendar', {
        title: 'Calendar',
        calendarIsActive: true
    });
};
