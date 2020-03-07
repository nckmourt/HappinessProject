// Define variables
var happiness_score = [];
var gdp_per_capita  = [];
var social_support = [];
var life_expectancy  = [];
var freedom  = [];
var generosity  = [];
var government_corr  = [];
var country  = [];
var happiness_rank  = [];
var family = [];
var year = [];

// Use d3 to read in current year dataset
// d3.csv("../static/data/clean_2019.csv").then(function(data) {
d3.json("/api/year/2019").then(function(data) {
  console.log(data[0]);
});

// d3.csv("../static/data/clean_2019.csv").then(function(data) {    
d3.json("/api/year/2019").then(function(data) {   
  country = data.map(d => d[0]);
  happiness_rank =data.map(d => d[1]);
  happiness_score = data.map(d => d[2]);  
  gdp_per_capita = data.map(d => d[3]);
  // family = data.map(d => d[4]);
  life_expectancy = data.map(d => d[5]);
  freedom = data.map(d => d[6]);
  generosity = data.map(d => d[7]);
  government_corr = data.map(d => d[8]);
  social_support = data.map(d => d[9]);

  plotcurr(data)
});

// Plot new report format
function plotcurr(data) {
  var score = {
    x: country,
    y: happiness_score,
    name: 'Happiness Score',
    // orientation: 'h',
    marker: {
      // color: 'Portland',
      width: 2
    },
    bargap: 1, 
    type: 'bar'
  };

// function plotcurr(data) {
//   var gdp = {
//     x: gdp_per_capita,
//     y: country,
//     name: 'GDP',
//     orientation: 'h',
//     marker: {
//       color: 'Portland',
//       width: 2
//     },
//     type: 'bar'
//   };

//   var support = {
//     x: social_support,
//     y: country,
//     name: 'Social Support',
//     orientation: 'h',
//     marker: {
//       color: 'Portland',
//       width: 2
//     },
//     type: 'bar'
//   };

//   var life = {
//     x: life_expectancy,
//     y: country,
//     name: 'Life Expectancy',
//     orientation: 'h',
//     marker: {
//       color: 'Portland',
//       width: 2
//     },
//     type: 'bar'
//   };

//   var free = {
//     x: freedom,
//     y: country,
//     name: 'Freedom',
//     orientation: 'h',
//     marker: {
//       color: 'Portland',
//       width: 2
//     },
//     type: 'bar'
//   };

//   var heart= {
//     x: generosity,
//     y: country,
//     name: 'Generosity',
//     orientation: 'h',
//     marker: {
//       color: 'Portland',
//       width: 2
//     },
//     type: 'bar'
//   };

//   var corruption = {
//     x: government_corr,
//     y: country,
//     name: 'Government Corruption',
//     orientation: 'h',
//     marker: {
//       color: 'Portland',
//       width: 2
//     },
//     type: 'bar'
//   };

  //small scale plot
  // var data = [gdp, support, life, corruption,free, heart];
  var data =[score]
  
  var layout = {
    // paper_bgcolor: "rgba(0,0,0,0)",
    // title: '(scroll to see more)',
    // barmode: 'stack',
    margin: {
      l: 225,
      r: 50,
      t: 35,
      b: 20
    },
    // width: 1380
    // height: 2500,
    yaxis: {
      range: [0, 9], 
      title: "Happiness Score"
    },
    // yaxis: {autorange:'reversed'
    // },
    xaxis: {
      title: "Country"
    }, 
    font: {size:18
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  };
  Plotly.newPlot('rank', data, layout);
};

// Plot former report layout
function plotold(year) {
  var score = {
    x: country,
    y: happiness_score,
    name: 'Happiness Score',
    // orientation: 'h',
    marker: {
      // color: 'Portland',
      width: 2
    },
    bargap: 1,
    type: 'bar'
  };

// function plotcurr(data) {
//   var gdp = {
//     x: gdp_per_capita,
//     y: country,
//     name: 'GDP',
//     orientation: 'h',
//     marker: {
//       color: 'Portland',
//       width: 2
//     },
//     type: 'bar'
//  

//   var fam = {
//     x: family,
//     y: country,
//     name: 'Family',
//     orientation: 'h',
//     marker: {
//       color: 'Portland',
//       width: 2
//     },
//     type: 'bar'
//   };

//   var life = {
//     x: life_expectancy,
//     y: country,
//     name: 'Life Expectancy',
//     orientation: 'h',
//     marker: {
//       color: 'Portland',
//       width: 2
//     },
//     type: 'bar'
//   };

//   var free = {
//     x: freedom,
//     y: country,
//     name: 'Freedom',
//     orientation: 'h',
//     marker: {
//       color: 'Portland',
//       width: 2
//     },
//     type: 'bar'
//   };

//   var heart= {
//     x: generosity,
//     y: country,
//     name: 'Generosity',
//     orientation: 'h',
//     marker: {
//       color: 'Portland',
//       width: 2
//     },
//     type: 'bar'
//   };

//   var corruption = {
//     x: government_corr,
//     y: country,
//     name: 'Government Corruption',
//     orientation: 'h',
//     marker: {
//       color: 'Portland',
//       width: 2
//     },
//     type: 'bar'
//   };

//  //small scale plot
//   var data = [gdp, fam, life, corruption,free, heart];
  
var data =[score]
  
  var layout = {
    // paper_bgcolor: "rgba(0,0,0,0)",
    // title: '(scroll to see more)',
    // barmode: 'stack',
    margin: {
      l: 225,
      r: 50,
      t: 35,
      b: 20
    },
    // width: 1380
    // height: 2500,
    yaxis: {
      range: [0, 9], 
      title: "Happiness Score"
    },
    // yaxis: {autorange:'reversed'
    // },
    xaxis: {
      title: "Country"
    }, 
    font: {size:18
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  };
  Plotly.newPlot('rank', data, layout);
};

// On change to the DOM, call getData()
d3.selectAll("#selYear").on("change", getYear);

// Function called by DOM changes
function getYear() {
  var dropdownMenu = d3.select("#selYear");
  // Assign the value of the dropdown menu option to a variable
  var input_yr = dropdownMenu.property("value");
  console.log("event dropdown", input_yr);

  if (input_yr == '2019') {
    // d3.csv("../static/data/clean_2019.csv").then(function(data) {
    d3.json("/api/year/2019").then(function(data) {   
      country = data.map(d => d[0]);
      happiness_rank =data.map(d => d[1]);
      happiness_score = data.map(d => d[2]);  
      gdp_per_capita = data.map(d => d[3]);
      // family = data.map(d => d[4]);
      life_expectancy = data.map(d => d[5]);
      freedom = data.map(d => d[6]);
      generosity = data.map(d => d[7]);
      government_corr = data.map(d => d[8]);
      social_support = data.map(d => d[9]);
      console.log('2019', data[0]);

      plotcurr(year)
    })
  }

  else if (input_yr == '2018') {
    d3.json("/api/year/2018").then(function(data) {   
      country = data.map(d => d[0]);
      happiness_rank =data.map(d => d[1]);
      happiness_score = data.map(d => d[2]);  
      gdp_per_capita = data.map(d => d[3]);
      // family = data.map(d => d[4]);
      life_expectancy = data.map(d => d[5]);
      freedom = data.map(d => d[6]);
      generosity = data.map(d => d[7]);
      government_corr = data.map(d => d[8]);
      social_support = data.map(d => d[9]);
      console.log('2018', data[0]);

      plotcurr(year)
    })
  }

  else if (input_yr == '2017') {
    d3.json("/api/year/2017").then(function(data) {   
      country = data.map(d => d[0]);
      happiness_rank =data.map(d => d[1]);
      happiness_score = data.map(d => d[2]);  
      gdp_per_capita = data.map(d => d[3]);
      family = data.map(d => d[4]);
      life_expectancy = data.map(d => d[5]);
      freedom = data.map(d => d[6]);
      generosity = data.map(d => d[7]);
      government_corr = data.map(d => d[8]);
      // social_support = data.map(d => d[9]);
      console.log('2017', data[0]);

      plotold(year)
    })
  }

  else if (input_yr == '2016') {
    d3.json("/api/year/2016").then(function(data) {   
      country = data.map(d => d[0]);
      happiness_rank =data.map(d => d[1]);
      happiness_score = data.map(d => d[2]);  
      gdp_per_capita = data.map(d => d[3]);
      family = data.map(d => d[4]);
      life_expectancy = data.map(d => d[5]);
      freedom = data.map(d => d[6]);
      generosity = data.map(d => d[7]);
      government_corr = data.map(d => d[8]);
      // social_support = data.map(d => d[9]);
      console.log('2016', data[0]);

      plotold(year)
    })
  }
  else if (input_yr == '2015') {
    d3.json("/api/year/2015").then(function(data) {   
      country = data.map(d => d[0]);
      happiness_rank =data.map(d => d[1]);
      happiness_score = data.map(d => d[2]);  
      gdp_per_capita = data.map(d => d[3]);
      family = data.map(d => d[4]);
      life_expectancy = data.map(d => d[5]);
      freedom = data.map(d => d[6]);
      generosity = data.map(d => d[7]);
      government_corr = data.map(d => d[8]);
      // social_support = data.map(d => d[9]);
      console.log('2015', data[0]);

      plotold(year)
    })
  }
}; 
  