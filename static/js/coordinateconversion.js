// Use this link to get the GeoJSON data.
var link = "https://zmoloci.github.io/Project-3_Dashboard/cleaned_CMHC_ZONE.geojson";

d3.json(link).then(function (data) {
    // Convert coordinates to Lat/Long
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].geometry.coordinates[0].length; j++) {
            // data[i].geometry.coordinates[0][j][0] = (((data[i].geometry.coordinates[0][j][1]) / 20037508.34) * 180)
            // data[i].geometry.coordinates[0][j][1] = (((data[i].geometry.coordinates[0][j][0]) / 20037508.34) * 180)
            data[i].geometry.coordinates[0][j] = [(((data[i].geometry.coordinates[0][j][1]) / 20037508.34) * 180), (((data[i].geometry.coordinates[0][j][0]) / 20037508.34) * 180)]
        }
    }

    FileSystem.writeFile("cleaned_CMHC_ZONE_latlong.geojson", JSON.stringify(data, null, 4), (err) => {
        if (err) {
            console.error(err);
        };
        console.log("File has been created");
    });

    // Test that data is being read
    // console.log(data)

});