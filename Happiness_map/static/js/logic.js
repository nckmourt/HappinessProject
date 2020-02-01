// Creating map object
var myMap = L.map("map", {
  center: [36, 0],
  zoom: 1.5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
// var geoData = "static/data/Median_Household_Income_2016.geojson";
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
      layer.bindPopup("<b> Country: " + feature.properties.country + "<br>&#129351; Happiness Rank: " +
        feature.properties.happiness_rank + "<br>&#128515; Happiness Score: " +
        feature.properties.happiness_score + "<br>&#128178; GDP Per Capita: " +
        feature.properties.gdp_per_capita + "<br>&#128106; Social Support: " +
        feature.properties.social_support + "<br>&#128368; Life Expectancy: " +
        feature.properties.life_expectancy + "<br>&#127480; Freedom: " +
        feature.properties.freedom+ "<br>&#128147; Generosity: " +
        feature.properties.generosity+ "<br>&#128706; Gov Corr: " +
        feature.properties.government_corr);
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
    var legendInfo = "<h1>Happiness Rank</h1>" +
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
