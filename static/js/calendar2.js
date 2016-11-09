$(document).ready(function() {

    $('#detail_modal')
        .modal({
            allowMultiple: true
        })
        ;

    $('#edit_modal').modal('attach events', '#detail_modal #detail_modal_edit');

    $('#delete_modal').modal('attach events', '#detail_modal #detail_modal_delete');

    $('#delete_modal').modal('attach events', '#edit_modal #edit_modal_delete');

    $("td").click(function() {
        open_add_modal();
    });

    $(".ui.selection.list").click(function(e) {
        e.stopPropagation();
        $('#detail_modal').modal('show');
    });

    function open_edit_modal() {
        $('#edit_modal').modal('show');
    }

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
            startDate: {
                identifier: 'startDate',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter a start date'
                }]
            },
            startTime: {
                identifier: 'startTime',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter a start time'
                }]
            },
            // category: {
            //     identifier: 'category',
            //     rules: [{
            //         type: 'empty',
            //         prompt: 'Please choose a category'
            //     }]
            // }
        },
        inline: true
    });

    /*
     * Defines click function for when an event card is clicked
     */
    $('#add_modal, #edit_modal').modal({
        closable: true,
        blurring: false,
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
