/*
 * GET home page.
 */
exports.view = function(req, res) {
    res.render('friends', {
        title: 'Friends',
        friendsIsActive: true
    });
};
