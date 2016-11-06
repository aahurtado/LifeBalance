/*
 * Defines click function for when an event card is clicked
 */
$(document).ready(function() {

    $('#sign_up_form').form({
        fields: {
            // email: ['email', 'empty'],
            // password: ['minLength[6]', 'empty'],
            // password2: ['match[password]']
            email: ['not[""]'],
            password: ['not[""]'],
            password2: ['not[""]']
        }
    });

});
