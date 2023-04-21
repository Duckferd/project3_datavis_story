// Transforming WGS84 Projected Coordinates to Lat/Long:
// From: https://javascript.plainenglish.io/transforming-xy-coordinates-to-latlng-values-with-proj4-js-d91a6139ba90

// var fromProj = proj4.defs('EPSG:42105');
// var toProj = proj4.defs('EPSG:4326');


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
function refreshAPIcalls() {

  // Assemble the API query URLs.
  var neighbourhoodURL = baseURL + "neighbourhood" + "/" + yearFilter + "";
  var crimeURL = baseURL + "crime" + "/" + yearFilter + "/" + crimeFilter;

  // Waiting on additional route for groupby below.
  var crimeDonutURL = baseURL + "crime" + "/" + yearFilter + "";

  console.log(neighbourhoodURL)
  console.log(crimeURL)

  // Marker Cluster creation:

  // d3.json(link).then(function (response) {

  //   // Create a new marker cluster group.
  //   var markers = L.markerClusterGroup();

  //   // Loop through the data.
  //   for (var i = 0; i < response.length; i++) {

  //     // Set the data location property to a variable.
  //     var location = response[i].location;

  //     // Check for the location property.
  //     if (location) {

  //       // Add a new marker to the cluster group, and bind a popup.
  //       markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
  //         .bindPopup(response[i].descriptor));
  //     }

  //   }

  //   // Add our marker cluster layer to the map.
  //   myMap.addLayer(markers);

  // })

}

// refreshAPIcalls function above is initiated by dropdown 'Refresh' button clicks 

// Getting our GeoJSON data
// d3.json(link).then(function (data) {
//   // Convert coordinates to Lat/Long
//   for (var i = 0; i < data.length; i++) {
//     if (i == 16) { i++ };
//     for (var j = 0; j < data[i].geometry.coordinates[0].length; j++) {
//       // console.log(data[i].geometry.coordinates[0][0])
//       // console.log(data[i].geometry.coordinates[0])


//       //proj4.js attempt:
//       //data[i].geometry.coordinates[0][j] = proj4(fromProj, toProj, [data[i].geometry.coordinates[0][j][0], data[i].geometry.coordinates[0][j][1]])

//       // console.log(data[i].geometry.coordinates[0][j])
//     };
//     console.log(data[i]);
//     // L.geoJson(data, {
//     //   style: function (feature) {
//     //     return {
//     //       color: "white",
//     //       fillColor: "red",
//     //       fillOpacity: 0.9,
//     //       weight: 1.5
//     //     };
//     //   }
//     // }).addTo(myMap);
//   }

//   // Test that data is being read
//   console.log(data)

//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data, {
//     style: function (feature) {
//       return {
//         color: "white",
//         fillColor: "red",
//         fillOpacity: 0.9,
//         weight: 1.5
//       };
//     }
//   }).addTo(myMap);
//   var zonePolygons = []
//   for (var key in data) {
//     console.log(data[key].properties.ZONENAME_E)
//   }
// });


// // --------------------------------------------------------
// // Earthquake circleMarker example from Christopher Yang:

// // var earthquakes = L.geoJSON(earthquakeData, {
// //   onEachFeature: onEachFeature,
// //   pointToLayer: function (feature, latlng) {
// // //...
// // //circle marker generation
// //     return L.circleMarker(latlng, {
// //       color: color,
// //       radius: radius,
// //       opacity:0.5,
// //       fillOpacity:0.5,        
// //     });
// //   }
// // });