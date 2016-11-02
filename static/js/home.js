// Represents the most recently clicked event card
var mostRecClickedEvent;


/*
 * Defines click function for when an event card is clicked
 */
function convertTo24Hour(time) {
    var hours = parseInt(time.substr(0, 2));
    if (time.indexOf('am') != -1 && hours == 12) {
        time = time.replace('12', '0');
    }
    if (time.indexOf('pm') != -1 && hours < 12) {
        time = time.replace(hours, (hours + 12));
    }
    time = time.replace(/(am|pm)/, '');
    return time.length == 4 ? ("0" + time) : time;
}


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

    function open_edit_modal() {
        $('#edit_modal').modal('show');
    }

    $(".edit_event_button").click(function() {

        open_edit_modal();

        var editEventForm = $("#edit_modal_form");

        var event = $(this).parents(".raised.blue.card")[0];

        var fields = $(event)["0"].innerText;

        var arr = fields.split("\n");

        var name = arr[0];

        var details = arr[2];

        var firstDigit = arr[1].match(/\d/);

        var idx = arr[1].indexOf(firstDigit);

        var category = arr[1].substring(0, idx);

        var startTime = arr[1].substring(idx);

        startTime = startTime.indexOf("-") == -1 ? startTime : startTime.slice(0, startTime.indexOf("-") - 1);

        startTime = convertTo24Hour(startTime);

        editEventForm.form('set values', {
            "name": name,
            "startTime": startTime,
            "details": details,
            "category": category
        });

    });

    $(".delete_event_button").click(function() {
        open_delete_modal();
    });

    function open_delete_modal() {
        $('#delete_modal').modal('show');
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
