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
var link = "https://zmoloci.github.io/Project-3_Dashboard/cleaned_CMHC_ZONE.geojson";
// var link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/nyc.geojson";

// Getting our GeoJSON data
d3.json(link).then(function (data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(myMap);
});

// load the shapefiles containing web mercator WGS 84 projection vertices using Leaflet.js
var censusZoneLayer = L.esri.featureLayer({
  url: 'https://zmoloci.github.io/Project-3_Dashboard/cleaned_CMHC_ZONE.geojson',
  style: function (feature) {
    return { color: 'blue', weight: 1, opacity: 0.7, fillOpacity: 0.3 };
  },
  onEachFeature: function (feature, layer) {
    // convert the web mercator WGS 84 projection vertices to longitude and latitude
    var coordinates = feature.geometry.coordinates;
    var newCoordinates = [];
    for (var i = 0; i < coordinates.length; i++) {
      newCoordinates.push([(coordinates[i][1] / 20037508.34) * 180, (coordinates[i][0] / 20037508.34) * 180]);
    }
    // update the layer with the new coordinates
    layer.setLatLngs(newCoordinates);
  }
}).addTo(map);
