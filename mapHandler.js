$(document).ready(function() {

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    var mapContainer = $("#regions_div");

    // With JQuery
    $("#ex8").slider({
        tooltip: 'always'
    });
    var yearOnSlider = $("#ex8").slider('getValue');

    //Adjust map to window's 90%
    mapContainer.width((windowWidth * 0.9));
    mapContainer.height((windowHeight * 0.9));

    //Adjust filter container height and width
    $("#filter-container").height(windowHeight);
    $("#filter-container").width((windowWidth * 0.18));


    google.charts.load('current', { 'packages': ['geochart'] });
    overlay(yearOnSlider);




    $("#ex8").on('slideStop', function() {
        var val = $(this).val();
        yearOnSlider = parseInt(val);
        overlay(yearOnSlider);
        // console.log(val);
    });

    $(".playButton").click(function() {
    	var interval = null;
        yearOnSlider = 1960;
        overlay(yearOnSlider);

        $("#ex8").slider('setAttribute', 'value', yearOnSlider);
        $("#ex8").slider('refresh');

        interval =  setInterval(function() {
            yearOnSlider++;
            overlay(yearOnSlider);
            $("#ex8").slider('setAttribute', 'value', yearOnSlider);
            $("#ex8").slider('refresh');
            if (yearOnSlider > 2013){
            	clearInterval(interval);
            }
        }, 1000);



    });

});


function overlay(yr) {
    var ka = function getCountriesAndValues() {
        var dataArr = [];
        dataArr[0] = ['Country', 'Life Expectancy'];
        $.each(x.data, function(index, value) {
            if (value.Year == yr) {
                dataArr.push([value.Country, value.Value]);
                // console.log(value.Year);
                // console.log(value.Country);
            }

        })
        return dataArr
    }


    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable(new ka());

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
    }
}
