//  python -m http.server
// Use d3 to read in current year dataset

d3.csv("clean_2019.csv").then(function(data) {
  console.log(data[0]);
});

d3.csv("clean_2019.csv").then(function(data) {
    
  happiness_score = data.map(d => d.happiness_score);
  gdp_per_capita = data.map(d => d.gdp_per_capita);
  social_support = data.map(d => d.social_support);
  life_expectancy = data.map(d => d.life_expectancy);
  freedom = data.map(d => d.freedom);
  generosity = data.map(d => d.generosity);
  government_corr = data.map(d => d.government_corr);
  country = data.map(d => d.country);
  happiness_rank = data.map(d => d.happiness_rank);

  var gdp = {
    x: gdp_per_capita,
    y: country,
    name: 'GDP',
    orientation: 'h',
    marker: {
      color: 'Portland',
      width: 1
    },
    type: 'bar'
  };

    
  var support = {
    x: social_support,
    y: country,
    name: 'Social Support',
    orientation: 'h',
    marker: {
      color: 'Portland',
      width: 1
    },
    type: 'bar'
  };

  var life = {
    x: life_expectancy,
    y: country,
    name: 'Life Expectancy',
    orientation: 'h',
    marker: {
      color: 'Portland',
      width: 1
    },
    type: 'bar'
  };

  var freedom = {
    x: freedom,
    y: country,
    name: 'Freedom',
    orientation: 'h',
    marker: {
      color: 'Portland',
      width: 1
    },
    type: 'bar'
  };

  var generosity= {
    x: generosity,
    y: country,
    name: 'Generosity',
    orientation: 'h',
    marker: {
      color: 'Portland',
      width: 1
    },
    type: 'bar'
  };

  var corruption = {
    x: government_corr,
    y: country,
    name: 'Government Corruption',
    orientation: 'h',
    marker: {
      color: 'Portland',
      width: 1
    },
    type: 'bar'
  };

  var data = [gdp, support, life, freedom, generosity, corruption];
  
  var layout = {
    // paper_bgcolor: "rgba(0,0,0,0)",
    title: '(scroll to see more)',
    barmode: 'stack',
    margin: {
      l: 200,
      r: 20,
      t: 35,
      b: 20
    },
    // width: 480,
    height: 2500,
    xaxis: {
      range: [0, 6,]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  };
  
  Plotly.newPlot('rank', data, layout);

});


