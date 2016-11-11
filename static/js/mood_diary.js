// Represents the most recently clicked event card
var mostRecClickedMood;


/*
 * Defines click function for when an event card is clicked
 */
$(".mood_entry").click(function (e) {
    mostRecClickedMood = $(this);
});


/*
 * Defines click function for when the "Yes" button is clicked
 * in the delete modal
 */
$("#edit_modal_save").click(function (e) {
    document.getElementById('edit_modal_form_hiddenID').value = mostRecClickedMood[0].id;
});


$(document).ready(function () {

    $("#moodTab").addClass("active");

    $('.menu .item')
        .tab()
        ;

    $(".edit_mood_entry_button").click(function () {
        open_edit_modal();
    });

    function open_edit_modal() {
        $('#edit_modal').modal('show');
    }

    $("#mooddiary_help_modal_close").click(function () {
        $('#mooddiary_help_modal').modal('hide');
    });

    $("#help_mooddiary_button").click(function () {
        open_mooddiary_help_modal();
    });

    function open_mooddiary_help_modal() {
        $('#mooddiary_help_modal').modal('show');
    }



});
