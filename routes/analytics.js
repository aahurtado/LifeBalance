var fs = require('fs');

/*
 * GET home page.
 */
exports.view = function(req, res) {
    res.render('analytics', {
        title: 'Analytics',
        analyticsIsActive: true
    });
};
