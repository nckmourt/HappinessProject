// Creating map object
// An array of countries and their locations
var countries = [
  {
    name: "Finland",
    location: [60.192059, 24.945831],
    happinessRank: 1
},
{
    name: "Denmark",
    location: [56.263920, 9.501785],
    happinessRank: 2
},
{
    name: "Norway",
    location: [60.472023, 8.468946],
    happinessRank: 3
},
{
    name: "Iceland",
    location: [64.963051, -19.020836],
    happinessRank: 4
},
{
    name: "Netherlands",
    location: [52.132633, 5.291266],
    happinessRank: 5
},
{
  name: "Switzerland",
  location: [46.818188, 8.227512],
  happinessRank: 6
},
{
  name: "Sweden",
  location: [60.128162, 18.643501],
  happinessRank: 7,
},
{
  name: "New Zealand",
  location: [-36.848461, 174.763336],
  happinessRank: 8,
  happinessScore: "7.3070",
  pop2019: "4783.0630"
},
{
  name: "Canada",
  location: [56.130367, -106.346771],
  happinessRank: 9
},
{
  name: "Austria",
  location: [47.5162, 14.5501],
  happinessRank: 10
}
];

// An array which will be used to store created countryMarkers
var countryMarkers = [];

for (var i = 0; i < countries.length; i++) {
  // loop through the countires array, create a new marker, push it to the countryMarkers array
  countryMarkers.push(
    L.marker(countries[i].location).bindPopup("<h1>" + countries[i].name + "</h1>" + "Happiness Rank: " + countries[i].happinessRank)
    );    
}

// Add all the countryMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var countryLayer = L.layerGroup(countryMarkers);

// Define variables for our tile layers
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});


// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
};

// Overlays that may be toggled on or off
var overlayMaps = {
  Countries: countryLayer
};

// Create map object and set default layers
var myMap = L.map("map", {
  center: [60.192059, 24.945831],
  zoom: 4,
  layers: [light, countryLayer]
});


// var myMap = L.map("map", {
//   center: [36, 0],
//   zoom: 1.5
// });

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
// var geoData = "static/data/countries.geojson";
var geoData = "static/data/countries.geojson";

var geojson;

// Grab data with d3
d3.json(geoData, function(data) {

  // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "happiness_rank",

    // Set color scale
    scale: ["#00FFFF","#800000"],

    // Number of breaks in step range
    steps: 7,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#FFFFFF",
      weight: 1,
      fillOpacity: 0.5
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<b> Country: " + feature.properties.country + "<br> Happiness Rank: " +
        feature.properties.happiness_rank + "<br> Happiness Score: " +
        feature.properties.happiness_score);
    }
  }).addTo(myMap);
  
  // Set up the legend
  var legend = L.control({ position: "bottomleft" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h2>Happiness Rank</h2>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";
    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

});