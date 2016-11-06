$(document).ready(function () {
    
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
        createChart(labels, hours, "monthDonut");
        createChart(labels, hours, "weekDonut");
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