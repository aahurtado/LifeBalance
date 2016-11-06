$(document).ready(function() {

    $('.menu .item')
        .tab()
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
        $.each(result, function(index, currevent) {
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
        createChart(labels, hours, "monthDonut");
        createChart(labels, hours, "weekDonut");
        createChart(labels, hours, "dayDonut");
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

});