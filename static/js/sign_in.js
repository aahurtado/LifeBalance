/*
 * Defines click function for when an event card is clicked
 */
$('#sign_in_form').form({
    fields: {
        email: ['email', 'empty'],
        password: ['minLength[6]', 'empty']
    }
});
