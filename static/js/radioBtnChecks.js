// Year Radio function

function refreshDataForYearRadioValue() {
    var yearele = document.getElementsByName("yearRadios");

    for (i = 0; i < yearele.length; i++) {
        if (yearele[i].checked) {
            document.getElementById("yearChoice").innerHTML
                = yearele[i].value;

            var yearFilter = yearele[i].value;
            console.log(yearFilter)

            // Also check Crime Radio Value
            var ele = document.getElementsByName("crimeRadios");
            for (j = 0; j < ele.length; j++) {
                if (ele[j].checked) {
                    document.getElementById("crimeChoice").innerHTML
                        = ele[j].value;

                    var crimeFilter = ele[j].value;
                    console.log(crimeFilter)

                    if (crimeFilter == ele[j].value && yearFilter == yearele[i].value) {
                        refreshAPIcalls(yearFilter, crimeFilter);
                    }

                }
            }
        }

    }
}
// Crime Radio function

function refreshDataForCrimeRadioValue() {
    var ele = document.getElementsByName("crimeRadios");

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            document.getElementById("crimeChoice").innerHTML
                = ele[i].value;
            // if (ele[i].checked)
            var crimeFilter = ele[i].value;
            // console.log(crimeFilter)


            // Also check Year Radio Value
            var yearele = document.getElementsByName("yearRadios");
            for (i = 0; i < yearele.length; i++) {
                if (yearele[i].checked) {
                    document.getElementById("yearChoice").innerHTML
                        = yearele[i].value;
                    // if (yearele[i].checked)
                    var yearFilter = yearele[i].value;
                    // console.log(yearFilter)
                    // if (yearele[i].checked)
                    if (crimeFilter == ele[i].value && yearFilter == yearele[i].value) {
                        refreshAPIcalls(yearFilter, crimeFilter);
                    }
                }
            }
        }
    }
}

// Originally logic5.js BELOW

// Creating the map object
var myMap = L.map("map", {
    center: [49.246292, -123.116226],
    zoom: 12
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use the following links to get the data.
var baseURL = "http://54.161.222.176:8080/api/v1.0/";

// Function to initiate data pull
function refreshAPIcalls(yearFilter, crimeFilter) {

    // Assemble the API query URLs.
    var neighbourhoodURL = baseURL + "neighbourhood" + "/" + yearFilter;
    var crimeURL = baseURL + "crime" + "/" + yearFilter + "/" + crimeFilter;
    var testURL = baseURL + "crime" + "/" + yearFilter;

    // Waiting on additional route for groupby below.
    var crimeDonutURL = baseURL + "crime" + "/" + yearFilter + "";

    // console.log(yearFilter)
    // console.log(crimeFilter)
    // console.log(neighbourhoodURL)
    // console.log(crimeURL)
    console.log(testURL)

    //
    // ACTIVATE WHEN Frontend on Github Pages:
    //

    // // Get the data with d3.
    // d3.json(testURL).then(function (response) {

    //     // Create a new marker cluster group.
    //     var markers = L.markerClusterGroup();

    //     // Loop through the data.
    //     for (var i = 0; i < response.length; i++) {


    //         // Add a new marker to the cluster group, and bind a popup.
    //         markers.addLayer(L.marker([response[i].crime_longitude[0], response.crime_latitude[0]])
    //             .bindPopup("Crime Type: " + response[i].crime_type[0] + " -  Crime Month: " + response[i].crime_month[0]));
    //     }
    //     // Add our marker cluster layer to the map.
    //     myMap.addLayer(markers);
    // });


    // Cluster Marker Testing using API CORS Workaround:

    testingCrimeJson = [{ "crime_latitude": 49.23234363, "crime_longitude": -123.0324753, "crime_month": 1, "crime_type": "Other Theft", "year": 2010 }, { "crime_latitude": 49.20618582, "crime_longitude": -123.1422511, "crime_month": 12, "crime_type": "Mischief", "year": 2010 }, { "crime_latitude": 49.23945355, "crime_longitude": -123.0236453, "crime_month": 4, "crime_type": "Theft from Vehicle", "year": 2010 }, { "crime_latitude": 49.24134565, "crime_longitude": -123.178583, "crime_month": 6, "crime_type": "Theft from Vehicle", "year": 2010 }, { "crime_latitude": 49.20571523, "crime_longitude": -123.1376911, "crime_month": 8, "crime_type": "Mischief", "year": 2010 }, { "crime_latitude": 49.20542281, "crime_longitude": -123.1406606, "crime_month": 4, "crime_type": "Mischief", "year": 2010 }, { "crime_latitude": 49.20577681, "crime_longitude": -123.1405619, "crime_month": 5, "crime_type": "Mischief", "year": 2010 }, { "crime_latitude": 49.20542277, "crime_longitude": -123.1403992, "crime_month": 1, "crime_type": "Mischief", "year": 2010 }, { "crime_latitude": 49.20449851, "crime_longitude": -123.1348013, "crime_month": 4, "crime_type": "Mischief", "year": 2010 }, { "crime_latitude": 49.20610222, "crime_longitude": -123.125848, "crime_month": 2, "crime_type": "Mischief", "year": 2010 }, { "crime_latitude": 49.28245092, "crime_longitude": -123.1182643, "crime_month": 12, "crime_type": "Other Theft", "year": 2010 }, { "crime_latitude": 49.27058278, "crime_longitude": -123.1430687, "crime_month": 7, "crime_type": "Theft from Vehicle", "year": 2010 }, { "crime_latitude": 49.28124255, "crime_longitude": -123.0725686, "crime_month": 10, "crime_type": "Theft from Vehicle", "year": 2010 }, { "crime_latitude": 49.27013974, "crime_longitude": -123.0676202, "crime_month": 12, "crime_type": "Theft of Vehicle", "year": 2010 }, { "crime_latitude": 49.25750072, "crime_longitude": -123.1036065, "crime_month": 9, "crime_type": "Mischief", "year": 2010 }, { "crime_latitude": 49.27012444, "crime_longitude": -123.1030674, "crime_month": 9, "crime_type": "Mischief", "year": 2010 }]
    console.log(testingCrimeJson[0])
    console.log(testingCrimeJson[0].crime_longitude)

    // Create a new marker cluster group.
    var markers = L.markerClusterGroup();

    // Loop through the data.
    for (var i = 0; i < testingCrimeJson.length; i++) {


        // Add a new marker to the cluster group, and bind a popup.
        markers.addLayer(L.marker([testingCrimeJson[i].crime_latitude, testingCrimeJson[i].crime_longitude])
            .bindPopup("Crime Type: " + testingCrimeJson[i].crime_type + " -  Crime Month: " + testingCrimeJson[i].crime_month));
        console.log(testingCrimeJson[i])
    }
    // Add our marker cluster layer to the map.
    myMap.addLayer(markers);



    // Donut Chart with assist from : https://www.w3schools.com/js/js_graphics_chartjs.asp
    // Need to flip to API data - testing works - http://54.161.222.176:8080/api/v1.0/crimetype/<year> 
    var testingDonutJson = [
        {
            "count": 1656,
            "crime_type": "Break and Enter Commercial"
        },
        {
            "count": 3270,
            "crime_type": "Break and Enter Residential/Other"
        },
        {
            "count": 4506,
            "crime_type": "Mischief"
        },
        {
            "count": 3432,
            "crime_type": "Other Theft"
        },
        {
            "count": 8612,
            "crime_type": "Theft from Vehicle"
        },
        {
            "count": 1667,
            "crime_type": "Theft of Bicycle"
        },
        {
            "count": 1467,
            "crime_type": "Theft of Vehicle"
        },
        {
            "count": 1006,
            "crime_type": "Vehicle Collision or Pedestrian Struck (with Fatality)"
        },
        {
            "count": 1327,
            "crime_type": "Vehicle Collision or Pedestrian Struck (with Injury)"
        }
    ]

    var donutCounts = []
    var donutTypes = []
    var barColors = [
        "rgba(18,83,0,1.0)",
        "rgba(18,83,0,0.5)",
        "rgba(81,5,187,1.0)",
        "rgba(81,5,187,0.5)",
        "rgba(9,9,121,1.0)",
        "rgba(9,9,121,0.5)",
        "rgba(0,212,255,1.0)",
        "rgba(189,255,0,0.5)",
        "rgba(189,255,0,1.0)",
    ];
    for (m = 0; m < testingDonutJson.length; m++) {
        donutCounts.push(testingDonutJson[m].count);
        donutTypes.push(testingDonutJson[m].crime_type);
    }
    function crimeDonut(donutCounts, donutTypes, barColors) {
        const donutChart = new Chart("donutChart", {
            type: "doughnut",
            data: {
                labels: donutTypes,
                datasets: [{
                    backgroundColor: barColors,
                    data: donutCounts
                }]
            },
            options: {
                title: {
                    display: false,
                    text: "Annual Crime Type Distribution"
                }
            }


        });
    }

    crimeDonut(donutCounts, donutTypes, barColors);


    // Crime Rate Line Graph
    // Using testing data from: http://54.161.222.176:8080/api/v1.0/crimeall/Theft%20of%20Vehicle

    var testingCrimeLineJson = [
        {
            "count": 1467,
            "year": 2010
        },
        {
            "count": 1093,
            "year": 2011
        },
        {
            "count": 1151,
            "year": 2012
        },
        {
            "count": 1034,
            "year": 2013
        },
        {
            "count": 1290,
            "year": 2014
        },
        {
            "count": 1371,
            "year": 2015
        },
        {
            "count": 1474,
            "year": 2016
        },
        {
            "count": 755,
            "year": 2017
        }
    ]

    var crimeCounts = []
    var crimeYears = []
    for (n = 0; n < testingCrimeLineJson.length; n++) {
        crimeCounts.push(testingCrimeLineJson[n].count);
        crimeYears.push(testingCrimeLineJson[n].year);
    }
    function crimeLine(crimeCounts, crimeYears) {
        new Chart("crimeLineChart", {
            type: "line",
            data: {
                labels: crimeYears,
                datasets: [{
                    data: crimeCounts,
                    borderColor: "blue",
                    fill: false
                    // Add additional datasets by adding more dictionaries to list
                    // See: https://www.w3schools.com/js/js_graphics_chartjs.asp
                }]
            },
            options: {
                legend: { display: true }
            }
        })
    }
    crimeLine(crimeCounts, crimeYears);



    // Median Rent Line Graph
    // Using testing data from: http://54.161.222.176:8080/api/v1.0/neighbourhoodmedrent

    var testingRentLineJson = [
        {
            "median rental price": 958.5769230769231,
            "year": 2010
        },
        {
            "median rental price": 980.0384615384615,
            "year": 2011
        },
        {
            "median rental price": 998.4230769230769,
            "year": 2012
        },
        {
            "median rental price": 1015.6923076923077,
            "year": 2013
        },
        {
            "median rental price": 1047.8076923076924,
            "year": 2014
        },
        {
            "median rental price": 1084.7307692307693,
            "year": 2015
        },
        {
            "median rental price": 1155.3846153846155,
            "year": 2016
        },
        {
            "median rental price": 1226.1923076923076,
            "year": 2017
        }
    ]

    var rentAvg = []
    var rentYears = []
    for (q = 0; q < testingRentLineJson.length; q++) {
        rentAvg.push(testingRentLineJson[q]["median rental price"]);
        rentYears.push(testingRentLineJson[q].year);
    }
    function rentLine(rentCounts, rentYears) {
        new Chart("rentLineChart", {
            type: "line",
            data: {
                labels: rentYears,
                datasets: [{
                    data: rentAvg,
                    borderColor: "blue",
                    fill: false
                    // Add additional datasets by adding more dictionaries to list
                    // See: https://www.w3schools.com/js/js_graphics_chartjs.asp
                    // End goal is to display median values by neighbourhood as shown on the 'Top 5 Affordable Neighbourhoods' table
                }]
            },
            options: {
                legend: { display: true }
            }
        })
    }
    rentLine(rentAvg, rentYears);







};
