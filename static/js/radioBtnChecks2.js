// Year Radio function

function refreshDataForYearRadioValue() {
  var yearele = document.getElementsByName("yearRadios");
  var donutChart = document.getElementById("donutChart")
  for (i = 0; i < yearele.length; i++) {
    if (yearele[i].checked) {
      document.getElementById("yearChoice").innerHTML = yearele[i].value;

      var yearFilter = yearele[i].value;
      console.log(yearFilter);
      
      // Also check Crime Radio Value
      var ele = document.getElementsByName("crimeRadios");
      for (j = 0; j < ele.length; j++) {
        if (ele[j].checked) {
          document.getElementById("crimeChoice").innerHTML = ele[j].value;

          var crimeFilter = ele[j].value;
          console.log(crimeFilter);

          if (crimeFilter == ele[j].value && yearFilter == yearele[i].value) {
            refreshAPIcalls(yearFilter, crimeFilter,donutChart);
          }
        }
      }
    }
  }
}

  // Crime Radio function
  
function refreshDataForCrimeRadioValue() {
  var ele = document.getElementsByName("crimeRadios");
  var donutChart = document.getElementById("donutChart")
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      document.getElementById("crimeChoice").innerHTML = ele[i].value;
      // if (ele[i].checked)
      var crimeFilter = ele[i].value;
      // console.log(crimeFilter)
      
      // Also check Year Radio Value
      var yearele = document.getElementsByName("yearRadios");
      for (j = 0; j < yearele.length; j++) {
        if (yearele[j].checked) {
          document.getElementById("yearChoice").innerHTML = yearele[j].value;
          // if (yearele[i].checked)
          var yearFilter = yearele[j].value;
          // console.log(yearFilter)
          // if (yearele[i].checked)
          if (crimeFilter == ele[i].value && yearFilter == yearele[j].value) {
            refreshAPIcalls(yearFilter, crimeFilter,donutChart);
          }
        }
      }
    }
  }
}

  
  // Leaflet Map setup
  
  // Creating the map object
  var myMap = L.map("map", {
    center: [49.246292, -123.116226],
    zoom: 12,
  });
  

  // Adding the tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);
  


  // Use the following link to get the data from the API
  var baseURL = "http://54.161.222.176:8080/api/v1.0/";
  
  
  var donutCounts = [];
  var donutTypes = [];
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
  // for (m = 0; m < testingDonutJson.length; m++) {
  //   donutCounts.push(testingDonutJson[m].count);
  //   donutTypes.push(testingDonutJson[m].crime_type);
  // }
  
  var donutCheck = 1;
  function crimeDonut(donutCounts, donutTypes, barColors) {
    if (donutCheck == 1){
      
      donutCheck = 2;
    }
    else{
      donutChart.destroy();
      donutCheck = 2
    }
    donutChart = new Chart("donutChart", {
        type: "doughnut",
        data: {
          labels: donutTypes,
          datasets: [
            {
              backgroundColor: barColors,
              data: donutCounts,
            },
          ],
        },
        options: {
          title: {
            display: false,
            text: "Annual Crime Type Distribution",
          },
        },
    });
  
    
  return donutChart
};

  crimeDonut(donutCounts, donutTypes, barColors);


// Crime Line Graph Global defs
var crimeTypes = ['Break and Enter Commercial', 
'Break and Enter Residential', 
'Mischief', 
'Other Theft', 
'Theft from Vehicle', 
'Theft of Bicycle', 
'Theft of Vehicle', 
'Vehicle Collision or Pedestrian Struck (with Fatality)', 
'Vehicle Collision or Pedestrian Struck (with Injury)'];
var borderColours = [
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

var crimeLineUrl = 'http://54.161.222.176:8080/api/v1.0/crimeall/'

    
    var crimeLabel = 'Vehicle Collision or Pedestrian Struck (with Injury)';
    var crimeYears = [];
    var borderColor = "rgba(189,255,0,1.0)";
    var crimeCounts = [];
    var crimeLineCheck = 1;
function crimeLine(crimeCounts, crimeYears) {
  if (crimeLineCheck == 1){
    crimeLineCheck = 2;
  }
  else{
    crimeLineChart.destroy();
    crimeLineCheck = 2
  }
  
  crimeLineChart = new Chart("crimeLineChart", {
    type: "line",
    data: {
      labels: crimeYears,
      datasets: [
        {
          label: crimeLabel,
          data: crimeCounts,
          borderColor: borderColor,
          fill: false,
          // Add additional datasets by adding more dictionaries to list
          // See: https://www.w3schools.com/js/js_graphics_chartjs.asp
        },
      ],
    },
    options: {
      legend: { display: true },
    },
  });
}
crimeLine(crimeCounts, crimeYears);



  // Function to initiate data pull
  function refreshAPIcalls(yearFilter, crimeFilter, donutChart) {
    // Assemble the API query URLs.
    var neighbourhoodURL = baseURL + "neighbourhood" + "/" + yearFilter;
    var crimeURL = baseURL + "crime" + "/" + yearFilter + "/" + crimeFilter;
    var testURL = baseURL + "crime" + "/" + yearFilter;
  
    // Waiting on additional route for groupby below.
    var crimeDonutURL = baseURL + "crimetype" + "/" + yearFilter;
    
  
    console.log(yearFilter)
    console.log(crimeFilter)
    // console.log(neighbourhoodURL)
    // console.log(crimeURL)
    console.log(crimeURL);
    
    //
    // ACTIVATE WHEN Frontend on Github Pages:
    //
  
    // Get the data with d3 for CLUSTERED MARKER PLOTS.
      d3.json(crimeURL).then(function (response) {
      // Create a new marker cluster group.
      console.log(response[0]);
      
      var markers = L.markerClusterGroup();
  
      // Loop through the data.
      for (var i = 0; i < response.length; i++) {
        // console.log(response[i]);
  
        // Add a new marker to the cluster group, and bind a popup.
        markers.addLayer(
          L.marker([
            response[i].crime_latitude,
            response[i].crime_longitude,
          ]).bindPopup(
            "<b>Crime Type:</b> " +
              crimeFilter + "</br>----------------------------------------------------------------" + "</br><b>Crime Year:</b> " + yearFilter +
              "</br><b>Crime Month:</b> " +
              response[i].crime_month
          )
        );
      }
      // Add our marker cluster layer to the map.
      myMap.addLayer(markers);
    });

    
// DONUT MAP
    d3.json(crimeDonutURL).then((responseDonut)=>{
      console.log(responseDonut[0])
      var donutCounts = [];
      var donutTypes = [];
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
      
      for (m = 0; m < responseDonut.length; m++) {
        donutCounts.push(responseDonut[m].count);
        donutTypes.push(responseDonut[m].crime_type);
        console.log(responseDonut.length)
      }
      console.log(donutCounts)
      console.log(donutTypes)

    crimeDonut(donutCounts, donutTypes, barColors);
    });
    
    console.log(donutCounts)
    console.log(donutTypes)

    
  
    // Crime Rate Line Graph

    d3.json(crimeLineUrl + crimeFilter).then((response, crimeTypes, borderColours)=>{
        console.log(response);
        var crimeTypes = ['Break and Enter Commercial', 
        'Break and Enter Residential', 
        'Mischief', 
        'Other Theft', 
        'Theft from Vehicle', 
        'Theft of Bicycle', 
        'Theft of Vehicle', 
        'Vehicle Collision or Pedestrian Struck (with Fatality)', 
        'Vehicle Collision or Pedestrian Struck (with Injury)'];
        var borderColours = [
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
        console.log(yearFilter)
        console.log(crimeFilter)
        var crimeLineUrl = 'http://54.161.222.176:8080/api/v1.0/crimeall/'
        crimeYears = []
        crimeCounts = []
        for (i = 0; i < response.length;i++){
          crimeCounts.push(response[i].count);
          crimeYears.push(response[i].year);
          for (j = 0; j < crimeTypes.length; j++){
            console.log(j+" line447 "+crimeFilter);
            if (crimeTypes[j]==crimeFilter){
              crimeLabel = crimeFilter;
              console.log(j);
              borderColor = borderColours[j];
            }

          }
    }
    crimeLine(crimeCounts, crimeYears, borderColor);
  });   
        
console.log(borderColor + "  " + crimeFilter)

    // var testingCrimeLineJson = [
    //   {
    //     count: 1467,
    //     year: 2010,
    //   },
    //   {
    //     count: 1093,
    //     year: 2011,
    //   },
    //   {
    //     count: 1151,
    //     year: 2012,
    //   },
    //   {
    //     count: 1034,
    //     year: 2013,
    //   },
    //   {
    //     count: 1290,
    //     year: 2014,
    //   },
    //   {
    //     count: 1371,
    //     year: 2015,
    //   },
    //   {
    //     count: 1474,
    //     year: 2016,
    //   },
    //   {
    //     count: 755,
    //     year: 2017,
    //   },
    // ];
  
    // var crimeCounts = [];
    // var crimeYears = [];
    // for (n = 0; n < testingCrimeLineJson.length; n++) {
    //   crimeCounts.push(testingCrimeLineJson[n].count);
    //   crimeYears.push(testingCrimeLineJson[n].year);
    // }
    // function crimeLine(crimeCounts, crimeYears) {
    //   new Chart("crimeLineChart", {
    //     type: "line",
    //     data: {
    //       labels: crimeYears,
    //       datasets: [
    //         {
    //           data: crimeCounts,
    //           borderColor: "blue",
    //           fill: false,
    //           // Add additional datasets by adding more dictionaries to list
    //           // See: https://www.w3schools.com/js/js_graphics_chartjs.asp
    //         },
    //       ],
    //     },
    //     options: {
    //       legend: { display: true },
    //     },
    //   });
    // }
  
  
    // Median Rent Line Graph
    // Using testing data from: http://54.161.222.176:8080/api/v1.0/neighbourhoodmedrent
  
    var testingRentLineJson = [
      {
        "median rental price": 958.5769230769231,
        year: 2010,
      },
      {
        "median rental price": 980.0384615384615,
        year: 2011,
      },
      {
        "median rental price": 998.4230769230769,
        year: 2012,
      },
      {
        "median rental price": 1015.6923076923077,
        year: 2013,
      },
      {
        "median rental price": 1047.8076923076924,
        year: 2014,
      },
      {
        "median rental price": 1084.7307692307693,
        year: 2015,
      },
      {
        "median rental price": 1155.3846153846155,
        year: 2016,
      },
      {
        "median rental price": 1226.1923076923076,
        year: 2017,
      },
    ];
  
    var rentAvg = [];
    var rentYears = [];
    for (q = 0; q < testingRentLineJson.length; q++) {
      rentAvg.push(testingRentLineJson[q]["median rental price"]);
      rentYears.push(testingRentLineJson[q].year);
    }
    function rentLine(rentCounts, rentYears) {
      new Chart("rentLineChart", {
        type: "line",
        data: {
          labels: rentYears,
          datasets: [
            {
              data: rentAvg,
              borderColor: "blue",
              fill: false,
              // Add additional datasets by adding more dictionaries to list
              // See: https://www.w3schools.com/js/js_graphics_chartjs.asp
              // End goal is to display median values by neighbourhood as shown on the 'Top 5 Affordable Neighbourhoods' table
            },
          ],
        },
        options: {
          legend: { display: true },
        },
      });
    }
    rentLine(rentAvg, rentYears);
  
    // LYNN, Add table script below --------------------------------
    let year = document.querySelector("[name=yearRadios]:checked").value;
    console.log("myyear:", year);
    d3.json(neighbourhoodURL).then((data) => {
      const columns = [
        "neighbourhood",
        "units",
        "availability_rate_percent",
        "median_rent_dollars",
      ];
      let filterData = data
        .sort((a, b) => a.median_rent_dollars - b.median_rent_dollars)
        .slice(0, 5);
      x = filterData;
  
      document.getElementById("list").innerHTML = `
          <h3>Most Affordable Neighbourhood</h3>
          <table class="table table-bordered">
              <thead class="thead-light">
                  <tr>
                      <th>#</th>
                      <th>Avail %</th>
                      <th>Median rent ($)</th>
                      <th>Neighbourhood</th>
                      <th>Available Unit</th>
                  </tr>
              </thead>
              <tbody></tbody>
          </table>`;
  
          Object.values(filterData).forEach((obj, i) => {
            let textColor;
            let bgColor;
      
            switch (i) {
              case 0:
                bgColor = "rgba(9,9,121,1.0)";
                textColor = "#fff";
                break;
      
              case 1:
                bgColor = "rgba(9,9,121,0.5)";
                break;
      
              case 2:
                bgColor = "rgba(0,212,255,1.0)";
                break;
      
              case 3:
                bgColor = "rgba(189,255,0,0.5)";
                break;
      
              case 4:
                bgColor = "rgba(189,255,0,1.0)";
                break;
      
              default:
                bgColor = "rgba(9,9,121,1.0)";
                textColor = "#000";
                break;
            }
      
            let row = d3
              .select("tbody")
              .append("tr")
              .style("background-color", bgColor)
              .style("color", textColor);
      
            row.append("td").text(i + 1);
      
            Object.entries(obj).forEach(([key, val]) => {
              if (columns.includes(key)) row.append("td").text(val);
        });
      });
    });
  }
  
  // const loadAffordableNeighbourhoodTable = () => {
  //   var testingNeighTableJSON = [
  //     {
  //       availability_rate_percent: 1.2,
  //       average_rent_dollars: 1436,
  //       median_rent_dollars: 1375,
  //       neighbourhood: "West End/Stanley Park",
  //       percent_change: 4.9,
  //       units: 3870,
  //       vacancy_rate_percent: 1,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.5,
  //       average_rent_dollars: 1467,
  //       median_rent_dollars: 1450,
  //       neighbourhood: "English Bay",
  //       percent_change: 2.4,
  //       units: 6789,
  //       vacancy_rate_percent: 1.3,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 2,
  //       average_rent_dollars: 1549,
  //       median_rent_dollars: 1478,
  //       neighbourhood: "Downtown",
  //       percent_change: 5.6,
  //       units: 10622,
  //       vacancy_rate_percent: 1.3,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.4,
  //       average_rent_dollars: 1423,
  //       median_rent_dollars: 1350,
  //       neighbourhood: "South Granville/Oak",
  //       percent_change: 4.7,
  //       units: 7872,
  //       vacancy_rate_percent: 0.7,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.3,
  //       average_rent_dollars: 1447,
  //       median_rent_dollars: 1400,
  //       neighbourhood: "Kitsilano/Point Grey",
  //       percent_change: 3.7,
  //       units: 7230,
  //       vacancy_rate_percent: 0.7,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.9,
  //       average_rent_dollars: 1658,
  //       median_rent_dollars: 1488,
  //       neighbourhood: "Westside/Kerrisdale",
  //       percent_change: 7,
  //       units: 3094,
  //       vacancy_rate_percent: 1.5,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.1,
  //       average_rent_dollars: 1009,
  //       median_rent_dollars: 950,
  //       neighbourhood: "Marpole",
  //       percent_change: 3.5,
  //       units: 3976,
  //       vacancy_rate_percent: 0.8,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.4,
  //       average_rent_dollars: 1261,
  //       median_rent_dollars: 1195,
  //       neighbourhood: "Mount Pleasant/Renfrew Heights",
  //       percent_change: 6.3,
  //       units: 6521,
  //       vacancy_rate_percent: 0.7,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.3,
  //       average_rent_dollars: 1182,
  //       median_rent_dollars: 1072,
  //       neighbourhood: "East Hastings",
  //       percent_change: 7.2,
  //       units: 5409,
  //       vacancy_rate_percent: 0.4,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.6,
  //       average_rent_dollars: 1228,
  //       median_rent_dollars: 1192,
  //       neighbourhood: "Southeast Vancouver",
  //       percent_change: 3.5,
  //       units: 2179,
  //       vacancy_rate_percent: 0.7,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 0.4,
  //       average_rent_dollars: 1891,
  //       median_rent_dollars: 1760,
  //       neighbourhood: "University Endowment Lands",
  //       percent_change: 7.1,
  //       units: 1396,
  //       vacancy_rate_percent: 0.2,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.5,
  //       average_rent_dollars: 1186,
  //       median_rent_dollars: 1100,
  //       neighbourhood: "Central Park/Metrotown",
  //       percent_change: 6.5,
  //       units: 5825,
  //       vacancy_rate_percent: 0.7,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 0.8,
  //       average_rent_dollars: 1010,
  //       median_rent_dollars: 1000,
  //       neighbourhood: "Southeast Burnaby",
  //       percent_change: 4.1,
  //       units: 2350,
  //       vacancy_rate_percent: 0.5,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.4,
  //       average_rent_dollars: 1292,
  //       median_rent_dollars: 1200,
  //       neighbourhood: "North Burnaby",
  //       percent_change: 9.6,
  //       units: 4128,
  //       vacancy_rate_percent: 0.4,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.5,
  //       average_rent_dollars: 1079,
  //       median_rent_dollars: 1005,
  //       neighbourhood: "New Westminster",
  //       percent_change: 8.9,
  //       units: 8325,
  //       vacancy_rate_percent: 1.1,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 2.1,
  //       average_rent_dollars: 1337,
  //       median_rent_dollars: 1260,
  //       neighbourhood: "North Vancouver CY",
  //       percent_change: 5.2,
  //       units: 6191,
  //       vacancy_rate_percent: 1.3,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 3.3,
  //       average_rent_dollars: 1650,
  //       median_rent_dollars: 1510,
  //       neighbourhood: "North Vancouver DM",
  //       percent_change: 7.4,
  //       units: 1520,
  //       vacancy_rate_percent: 2.6,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 0.5,
  //       average_rent_dollars: 1833,
  //       median_rent_dollars: 1650,
  //       neighbourhood: "West Vancouver",
  //       percent_change: 4.6,
  //       units: 2342,
  //       vacancy_rate_percent: 0.4,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.1,
  //       average_rent_dollars: 1326,
  //       median_rent_dollars: 1265,
  //       neighbourhood: "Richmond",
  //       percent_change: 1.5,
  //       units: 3766,
  //       vacancy_rate_percent: 0.6,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.7,
  //       average_rent_dollars: 997,
  //       median_rent_dollars: 925,
  //       neighbourhood: "Delta",
  //       percent_change: 3.5,
  //       units: 1726,
  //       vacancy_rate_percent: 1.2,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 0.9,
  //       average_rent_dollars: 1025,
  //       median_rent_dollars: 993,
  //       neighbourhood: "Surrey",
  //       percent_change: 6.9,
  //       units: 5892,
  //       vacancy_rate_percent: 0.5,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.1,
  //       average_rent_dollars: 1026,
  //       median_rent_dollars: 975,
  //       neighbourhood: "White Rock",
  //       percent_change: 7.8,
  //       units: 1388,
  //       vacancy_rate_percent: 0.6,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.9,
  //       average_rent_dollars: 1194,
  //       median_rent_dollars: 1100,
  //       neighbourhood: "Langley City and Langley DM",
  //       percent_change: 4.3,
  //       units: 2677,
  //       vacancy_rate_percent: 1.4,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.8,
  //       average_rent_dollars: 1135,
  //       median_rent_dollars: 1100,
  //       neighbourhood: "Tri-Cities",
  //       percent_change: 10.5,
  //       units: 4836,
  //       vacancy_rate_percent: 1.2,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 0.9,
  //       average_rent_dollars: 920,
  //       median_rent_dollars: 875,
  //       neighbourhood: "Maple Ridge/Pitt Meadows",
  //       percent_change: 7.6,
  //       units: 1627,
  //       vacancy_rate_percent: 0.5,
  //       year: 2017,
  //     },
  //     {
  //       availability_rate_percent: 1.5,
  //       average_rent_dollars: 1308,
  //       median_rent_dollars: 1213,
  //       neighbourhood: "Vancouver",
  //       percent_change: 5.8,
  //       units: 111551,
  //       vacancy_rate_percent: 0.9,
  //       year: 2017,
  //     },
  //   ];
  
  //   const sortedNeighbourhoodsByRent = testingNeighTableJSON.sort((a, b) => {
  //     return a.median_rent_dollars - b.median_rent_dollars;
  //   });
  
  //   const csvStringFromJsonArray = [
  //     [
  //       "No.",
  //       "Neighbourhood",
  //       "Available units",
  //       "Vacancy rate (%)",
  //       "Median rent ($)",
  //     ],
  //     ...sortedNeighbourhoodsByRent
  //       .map((item, index) => [
  //         index + 1,
  //         item.neighbourhood,
  //         item.units,
  //         item.vacancy_rate_percent,
  //         item.median_rent_dollars,
  //       ])
  //       .slice(0, 5),
  //   ]
  //     .map((e) => e.join(","))
  //     .join("\n");
  
  //   const rows = d3.csvParseRows(csvStringFromJsonArray);
  // };
  
  // loadAffordableNeighbourhoodTable();