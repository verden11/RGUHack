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
    //$("#filter-container").height(windowHeight);
    $("#filter-container").width((windowWidth * 0.18));

    //1.Improved sanitation facilities (% of population with access) ImprovedSanitationFacilities.json
    //2.Access to electricity (% of population) accessToElectricity.json   
    //3.Adult literacy rate, population 15+ years, both sexes (%) adultLiteracyRatePopulation15plus.json
    //4.PM2.5 air pollution, mean annual exposure (micrograms per cubic meter) airPollutionPolulationExposedToLevelsExceedingWHOGuidelineValue.json
    //5.Alternative and nuclear energy (% of total energy use) alternativeAndNuclierEnergy.json
    //6.CO2 emissions (kg per 2005 US$ of GDP) co2emissions.json
    //7.Forest area (sq. km) forestArea.json
    //8.Fossil fuel energy consumption (% of total) fossilFuelEnergyConsuption.json
    //9.Gross savings (% of GDP) grossSavings.json
    //10.Internet users (per 100 people) internetUsers.json
    //11.Military expenditure (% of GDP) militaryExpenditure.json
    //12.Mortality rate, under-5 (per 1,000) mortalityRateUnder5.json
    //13.Population, female (% of total) populationFemale.json
    //14.Population growth (annual %) populationGrowth.json
    //15.Population, total populationTotal.json
    //16.Pump price for gasoline (US$ per liter) pumpPriceForGasoline.json
    //17.Total tax rate (% of commercial profits) totalTaxRate.json
    //18.Trade in services (% of GDP) tradeInServices.json
    //19.Unemployment, total (% of total labor force) unemployment.json
    //20.Urban population urbanPopulation.json
    var filterArr = [];
    var valueArr = [
        'Improved sanitation facilities (% of population)',
        'Access to electricity (% of population)',
        'Adult literacy rate, population 15+ years, both sexes (%)',
        'PM2.5 air pollution, mean annual exposure (micrograms per cubic meter)',
        'Alternative and nuclear energy (% of total energy use)',
        'CO2 emissions (kg per 2005 US$ of GDP)',
        'Forest area (sq.km)',
        'Fossil fuel energy consumption (% of total)',
        'Gross savings (% of GDP)',
        'Internet users (per 100 people)',
        'Military expenditure (% of GDP)',
        'Mortality rate, under-5 (per 1,000)',
        'Population, female (% of total)',
        'Population growth (annual %)',
        'Total Population',
        'Pump price for gasoline (US$ per liter)',
        'Total tax rate (% of commercial profits)',
        'Trade in services (% of GDP)',
        'Unemployment, total (% of total labor force)',
        'Urban population'
    ];

    for (var i = 0; i < 20; i++) {
        filterArr[i] = ['Country', valueArr[i]];
    }

    google.charts.load('current', { 'packages': ['geochart'] });

    var year = yearOnSlider;
    var str;
    $("input[name='filter']").on("click", function() {
        str = $(this).val(); //"v10"
        var filterNumber = parseInt(str.substring(1), 10);
        overlay(getCountriesAndValues(window[str], filterNumber));
    });

    function getCountriesAndValues(a, b) {
        var dataArr = [];
        dataArr[0] = filterArr[b];
        $.each(a.data, function(index, value) {
            if (value.Year == year) {
                dataArr.push([value.Country, value.Value]);
            }

        });
        return dataArr;
    }


    $("#ex8").on('slideStop', function() {
        var val = $(this).val();
        year = parseInt(val);
        $("input[value='" + str + "']").trigger('click');
    });


    $(".playButton").click(function() {
        var interval = null;
        yearOnSlider = 1960;
        $("input[value='" + str + "']").trigger('click');

        $("#ex8").slider('setAttribute', 'value', yearOnSlider);
        $("#ex8").slider('refresh');

        interval = setInterval(function() {
            yearOnSlider++;
            $("input[value='" + str + "']").trigger('click');
            $("#ex8").slider('setAttribute', 'value', yearOnSlider);
            $("#ex8").slider('refresh');
            if (yearOnSlider > 2013) {
                clearInterval(interval);
            }
        }, 500);



    });

    function overlay(arr) {
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable(arr);

            var options = {
                colorAxis: { colors: ['#e31b23', '#00853f'] },
                backgroundColor: '#81d4fa',
                datalessRegionColor: '#f8bbd0',
                defaultColor: '#f5f5f5',
            };

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
    }


});
