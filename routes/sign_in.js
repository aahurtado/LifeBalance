/*
 * GET home page.
 */
exports.view = function(req, res) {
    res.render('sign_in', {
        title: "Sign In",
        layout: "sign_in"
    });
};
