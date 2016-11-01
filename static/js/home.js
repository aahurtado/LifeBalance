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
 	console.log("[DEBUG] An event was faded out!");
 });

/*
 * Defines click function for when the "Yes" button is clicked
 * in the delete modal
 */
 $("#add_modal_add").click(function(e) {
 	var addEventForm = $("#add_modal_form");

 	allFields = addEventForm.form('get values')

 	console.log("[DEBUG] An event was added!");

 	console.log(allFields);
 });



 $(document).ready(function() {

 });