/*
 * GET home page.
 */
exports.view = function(req, res) {
    res.render('past_data', {
        title: 'Past Data',
        pastDataIsActive: true,
        isName: false
    });
};

/*
 * GET home page.
 */
exports.viewWithUser = function(req, res) {
    var nameToShow = req.params.userName;
    res.render('past_data', {
        title: 'Past Data',
        pastDataIsActive: true,
        isName: true,
        name: nameToShow
    });
};
