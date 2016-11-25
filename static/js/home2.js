// Represents the most recently clicked event card
var mostRecClickedEvent;
var start;
var elapsed;

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
    onApprove: function () {
        return false;
    }
});


/*
 * Defines click function for when an event card is clicked
 */
$('#delete_modal').modal({
    blurring: false
});


/*
 * Defines click function for when an event card is clicked
 */
$("#add_modal_cancel").click(function (e) {
    $('#add_modal_form').form('clear');
});


/*
 * Defines click function for when an event card is clicked
 */
$("#edit_modal_cancel").click(function (e) {
    elapsed = new Date().getTime() - start;
    alert("Time Elapsed Since Opening Edit Module in Milliseconds: " + elapsed,5000);
    ga('send', 'timing', 'Edit Module2', 'Edit Canceled2', elapsed);
    $('#edit_modal_form').form('clear');
});


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
$(".raised.card").click(function (e) {
    mostRecClickedEvent = $(this);
});


$(document).ready(function () {

    $("#homeTab").addClass("active");

    /*
     * Defines click function for when the "Yes" button is clicked
     * in the delete modal
     */
    $("#edit_modal_save").click(function (e) {
        elapsed = new Date().getTime() - start;
        alert("Time Elapsed Since Opening Edit Module in Milliseconds: " + elapsed,5000);
        document.getElementById('edit_modal_form_hiddenID').value = mostRecClickedEvent[0].id;
        updateGraph();
        ga('send', 'timing', 'Edit Module2', 'Edit Saved2', elapsed);
    });

    /*
     * Defines click function for when an event card is clicked
     */
    $("#add_modal_add").click(function (e) {
        updateGraph();
    });

    /*
     * Defines click function for when the "Yes" button is clicked
     * in the delete modal
     */
    $("#delete_modal_yes").click(function (e) {
        var id = mostRecClickedEvent[0].id;
        var URL = "/deleteEvent?id=" + mostRecClickedEvent[0].id;
        window.location.href = URL;
        // id = "" + id + "";
        // $.post("/deleteEvent", {
        //     "id": id
        // }, updateGraph);
    });

    function open_edit_modal() {
        $('#edit_modal').modal('show');
        start = new Date().getTime();
    }

    $(".edit_event_button").click(function () {

        open_edit_modal();

        var editEventForm = $("#edit_modal_form");

        var event = $(this).parents(".raised.card")[0];

        var fields = $(event)["0"].innerText;

        var arr = fields.split("\n");

        var name = arr[0];

        var details = arr[2];

        var firstDigit = arr[1].match(/\d/);

        var idx = arr[1].indexOf(firstDigit);

        var category = arr[1].substring(0, idx);

        var startTime = arr[1].substring(idx);

        var endTime = "";

        if (startTime.length > 7) {
            endTime = startTime.slice(startTime.indexOf("-") + 2);
            endTime = convertTo24Hour(endTime);
        }

        startTime = startTime.indexOf("-") == -1 ? startTime : startTime.slice(0, startTime.indexOf("-") - 1);

        startTime = convertTo24Hour(startTime);

        // editEventForm.form('set values', {
        //     "name": name,
        //     "startTime": startTime,
        //     "endTime": endTime,
        //     "details": details,
        //     "category": category
        // });

    });        

    $(".clear_event_button").click(function () {
        $('#delete_today_modal').modal('show');
    });

    $("#delete_today_modal_yes").click(function () {
        var URL = "/deleteTodaysEvent?";
        window.location.href = URL;
        updateGraph();
    });

    $(".delete_event_button").click(function () {
        open_delete_modal();
    });

    function open_delete_modal() {
        $('#delete_modal').modal('show');
    }

    $(".add_event_button").click(function () {
        open_add_modal();
    });

    function open_add_modal() {
        $('#add_modal').modal('show');
    }

    function timeStringToFloat(time) {
        var hoursMinutes = time.split(/[.:]/);
        var hours = parseInt(hoursMinutes[0], 10);
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        return hours + minutes / 60;
    }

    labels = [];
    hours = [];

    function updateGraph() {
        $.get("/getEvents", updateChart);
    }

    $.get("/getEvents", updateChart);

    function updateChart(result) {
        $.each(result, function (index, currevent) {
            if (currevent.hasEndTime == true) {
                delta = timeStringToFloat(currevent.endTime) - timeStringToFloat(currevent.startTime);
                delta = delta < 0 ? delta + 24 : delta;
                if (labels.indexOf(currevent.category) == -1) {
                    labels.push(currevent.category);
                    hours.push(delta);
                }
                else {
                    hours[labels.indexOf(currevent.category)] += delta;
                }
            }
        });
        createChart(labels, hours);
    }

    function createChart(labels, data) {
        var ctx = document.getElementById("myChart");

        if (data.length == 0) { data = [100]; labels = ["Example Category"]; }

        bg = ["#FF6384", "#36A2EB", "#FFCE56", "#63E072", "#00E5E5"];
        hbg = ["#FF6384", "#36A2EB", "#FFCE56", "#63E072", "#00E5E5"];

        var data = {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: bg,
                hoverBackgroundColor: hbg
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
    }

    $("#schedule_help_modal_close").click(function () {
        $('#schedule_help_modal').modal('hide');
    });

    $("#help_sched_button").click(function () {
        open_schedule_help_modal();
    });

    function open_schedule_help_modal() {
        $('#schedule_help_modal').modal('show');
    }

    $("#todaysbalance_help_modal_close").click(function () {
        $('#schedule_help_modal').modal('hide');
    });

    $("#help_todays_balance_button").click(function () {
        open_todaysbalance_help_modal();
    });

    function open_todaysbalance_help_modal() {
        $('#todaysbalance_help_modal').modal('show');
    }


});
