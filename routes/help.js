/*
 * GET home page.
 */
exports.view = function(req, res) {
    res.render('help', {
        title: 'Help'
    });
};
