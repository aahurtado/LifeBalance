/*
 * GET home page.
 */
exports.view = function(req, res) {
    res.render('sign_up', {
        title: "Sign Up",
        layout: "sign_in"
    });
};
