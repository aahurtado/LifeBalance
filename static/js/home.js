// Represents the most recently clicked event card
var mostRecClickedEvent;

/*
 * Defines click function for when an event card is clicked
 */
$(".raised.blue.card").click(function(e) {
    mostRecClickedEvent = $(this);
});

/*
 * Defines click function for when the "Yes" button is clicked
 * in the delete modal
 */
$("#edit_modal_save").click(function(e) {
    var editEventForm = $("#edit_modal_form");

    allFields = editEventForm.form('get values')

    var name = allFields.name;
    var time = allFields.time;
    var details = allFields.details;
    var category = allFields.category;

    $.getScript('/js/URI.js', function() {
        var URL = "/editEvent?id=" + mostRecClickedEvent[0].id + "&name={newName}&time={newTime}&details={newDetails}&category={newcategory}";
        var template = new URITemplate(URL);
        var result = template.expand({ newName: name, newTime: time, newDetails: details, newcategory: category });
        window.location.href = result;
    });
});

/*
 * Defines click function for when the "Yes" button is clicked
 * in the delete modal
 */
$("#delete_modal_yes").click(function(e) {
    var URL = "/deleteEvent?id=" + mostRecClickedEvent[0].id;
    window.location.href = URL;
});

$(document).ready(function() {

});
