$(document).ready(function() {

    $("#edit_modal_cancel").click(function() {
        $('#add_modal').modal('hide');
    });

    /*
     * Defines click function for when an event card is clicked
     */
    $(".ui.fixed.celled.table .item").click(function(e) {
        open_edit_modal();
    });

    function open_edit_modal() {
        $('#edit_modal').modal('show');
    }

    $("td").click(function() {
        open_add_modal();
    });

    $(".add_event_button").click(function() {
        open_add_modal();
    });

    function open_add_modal() {
        $('#add_modal').modal('show');
    }

    /*
     * Defines click function for when an event card is clicked
     */
    $('#add_modal_form, #edit_modal_form').form({
        fields: {
            name: {
                identifier: 'name',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter your name'
                }]
            },
            startTime: {
                identifier: 'startTime',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter a start time'
                }]
            },
            category: {
                identifier: 'category',
                rules: [{
                    type: 'empty',
                    prompt: 'Please choose a category'
                }]
            }
        },
        inline: true
    });

    /*
     * Defines click function for when an event card is clicked
     */
    $('#add_modal, #edit_modal').modal({
        closable: true,
        onApprove: function() {
            return false;
        }
    });

    /*
     * Defines click function for when an event card is clicked
     */
    $("#add_modal_cancel").click(function(e) {
        $('#add_modal_form').form('clear');
    });


    /*
     * Defines click function for when an event card is clicked
     */
    $("#edit_modal_cancel").click(function(e) {
        $('#edit_modal_form').form('clear');
    });

});
