$(document).ready(function () {

    $('.menu .item')
        .tab()
        ;

    $('.paths.example .menu .item')
        .tab({
            context: '.paths.example'
        })
        ;

    // var waypoint = new Waypoint({
    //     element: document.getElementById('monthDonut'),
    //     handler: function(direction) {
    //        $('#monthMenu').addClass('active');
    //        $('#weekMenu').removeClass('active');
    //        $('#dayMenu').removeClass('active');
    //     }
    // })

    // var waypoint1 = new Waypoint({
    //     element: document.getElementById('weekDonut'),
    //     handler: function(direction) {
    //        $('#monthMenu').removeClass('active');
    //        $('#weekMenu').addClass('active');
    //        $('#dayMenu').removeClass('active');
    //     },
    //     offset: '-35%'
    // })

    // var waypoint2 = new Waypoint({
    //     element: document.getElementById('dayDonut'),
    //     handler: function(direction) {
    //        $('#monthMenu').removeClass('active');
    //        $('#weekMenu').removeClass('active');
    //        $('#dayMenu').addClass('active');
    //     },
    //     offset: '-50%'
    // })

    // $('.ui .item').on('click', function() {
    //     $('.ui .item').removeClass('active');
    //     $(this).addClass('active');
    // });

    // $('.ui.sticky')
    //     .sticky({
    //         context: '#mySegment'
    //     })
    //     ;

    $("#activeTab").addClass("active");

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
        createChart(labels, [4, 12, 7], "monthDonut");
        createChart(labels, [5, 11, 9], "weekDonut");
        createChart(labels, [5, 5, 5], "dayDonut");
        createLineChart();
        createMoodChart([5, 5, 5], "todayMood");
        createMoodChart([5, 10, 7], "weekMood");
        createMoodChart([10, 7, 5], "monthMood");
    }

    function createChart(labels, data, id) {
        var ctx = document.getElementById(id);

        var data = {
            labels: labels,
            datasets: [{
                data: data,
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
    }

    function createLineChart() {
        var ctx = document.getElementById("eventsLine");

        var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Work",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "#FF6384",
                    borderColor: "#FF6384",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#FF6384",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#FF6384",
                    pointHoverBorderColor: "#FF6384",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 60],
                    spanGaps: false,
                },
                {
                    label: "Sleep",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "#FFCE56",
                    borderColor: "#FFCE56",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#FFCE56",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#FFCE56",
                    pointHoverBorderColor: "#FFCE56",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [100, 50, 60, 40, 30, 25, 50],
                    spanGaps: false,
                },
                {
                    label: "Fun",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "#36A2EB",
                    borderColor: "#36A2EB",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#36A2EB",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#36A2EB",
                    pointHoverBorderColor: "#36A2EB",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [30, 40, 50, 50, 45, 50, 55],
                    spanGaps: false,
                }
            ]
        };

        var options = {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        };

        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: data
            // options: options
        });
    }

    function createMoodChart(data, id) {
        var ctx = document.getElementById(id);

        var data = {
            datasets: [{
                data: data,
                backgroundColor: [
                    "#4BC0C0",
                    "#FFCE56",
                    "#36A2EB"
                ],
                label: 'My dataset' // for legend
            }],
            labels: [
                "Tired",
                "Happy",
                "Sad"
            ]
        };

        new Chart(ctx, {
            data: data,
            type: 'polarArea',
        });
    }

    $("#analytics_help_modal_close").click(function () {
        $('#analytics_help_modal').modal('hide');
    });

    $("#help_analytics_button").click(function () {
        open_analytics_help_modal();
    });

    function open_analytics_help_modal() {
        $('#analytics_help_modal').modal('show');
    }

    $("#analytics_help_mood_modal_close").click(function () {
        $('#analytics_help_mood_modal').modal('hide');
    });

    $("#help_analytics_mood_button").click(function () {
        open_analytics_help_mood_modal();
    });

    function open_analytics_help_mood_modal() {
        $('#analytics_help_mood_modal').modal('show');
    }

});
