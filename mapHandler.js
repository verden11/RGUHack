$(document).ready(function() {
	
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	
	var mapContainer = $("#regions_div");
	
	//Adjust map to window's 90%
	mapContainer.width((windowWidth * 0.9));
	mapContainer.height((windowHeight * 0.9));
	
	//Adjust filter container height and width
	$("#filter-container").height(windowHeight);
    $("#filter-container").width((windowWidth * 0.18));

	var ka = function getCountriesAndValues() {
		var dataArr = [];
		dataArr[0] = ['Country', 'Life Expectancy'];
		$.each(x.data, function(index,value){
		  if(value.Year == 2000){
		  dataArr.push([value.Country, value.Value]);
			console.log(value.Year);
			console.log(value.Country);
		  }

		})
		return dataArr
	}
	
	google.charts.load('current', {'packages':['geochart']});
	google.charts.setOnLoadCallback(drawRegionsMap);

	function drawRegionsMap() {
		var data = google.visualization.arrayToDataTable(new ka());

		var options = {};

		var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

		chart.draw(data, options);
	}
});
