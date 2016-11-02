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
    document.getElementById('edit_modal_form_hiddenID').value = mostRecClickedEvent[0].id;
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

    $(".delete_event_button").click(function() {
        open_delete_modal();
    });

    function open_delete_modal() {
        $('#delete_modal').modal('show');
    }

    $(".edit_event_button").click(function() {
        open_edit_modal();
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

    var ctx = document.getElementById("myChart");

    var data = {
        labels: [
            "Work",
            "Fun",
            "Sleep"
        ],
        datasets: [{
            data: [70, 15, 20],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
    };

    var options = {
        animation: {
            animateScale: true
        }
    }

    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });

});
