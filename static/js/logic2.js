// Creating the map object
var myMap = L.map("map", {
  center: [49.246292, -123.116226],
  zoom: 12
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
// var link = "https://zmoloci.github.io/Project-3_Dashboard/cleaned_CMHC_ZONE.geojson";

// USE THIS LINK TO TEST without broken West Van Data:
// var link = "https://zmoloci.github.io/Project-3_Dashboard/cleaned_CMHC_ZONE-noWestVan.geojson";

// USE THIS LINK TO TEST pre-converted coordinates and no West Van:
var link = "https://zmoloci.github.io/Project-3_Dashboard/cleaned_CMHC_ZONE-noWestVan-latlong.geojson";


// Getting our GeoJSON data
d3.json(link).then(function (data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    style: function (feature) {
      return {
        color: "white",
        fillColor: "blue",
        fillOpacity: 0.95,
        weight: 1.5
      };
    }
  }).addTo(myMap);

  // Test that data is being read
  for (var key in data) {
    console.log(data[key].properties.ZONENAME_E)
  }
  // Test that data is being read
  console.log(data);
});






