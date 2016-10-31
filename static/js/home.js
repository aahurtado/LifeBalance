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
$("#delete_modal_yes").click(function(e) {
	mostRecClickedEvent.fadeOut();
});

$(document).ready(function() {

});