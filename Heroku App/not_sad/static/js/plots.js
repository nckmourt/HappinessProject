//  python -m http.server
// Use d3 to read in current year dataset

d3.csv("../static/data/clean_2019.csv").then(function(data) {
  console.log(data[0]);
});

d3.csv("../static/data/clean_2019.csv").then(function(data) {
    
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
      x: happiness_score,
      y: gdp_per_capita,
      mode: 'markers',
      type: 'scatter',
      marker: { 
        size: 12,
        color: happiness_rank,
        colorscale: 'Portland',
        showscale: true,
        // title: 'happiness rank'
        // legendgroup: 'happiness_rank',
        // showlegend: true,
      }
  };
    
  var data = [gdp];

  var layout = {   
    // title: 'Happiness and GDP',
    yaxis: {
      title: 'GDP per Capita',
      range: [0, 2],
    },
    xaxis: {
      title: 'Happiness Score',
      range: [.5, 8],
    },
    text: 'happiness rank'
  };

  Plotly.newPlot('plot', data, layout);
    
  var support = {
      x: happiness_score,
      y: social_support, 
      text: country,
      mode: 'markers',
      type: 'scatter',
      marker: { 
        size: 12,
        color: happiness_rank,
        colorscale: 'Portland',
        showscale: true
      }
  };

  var data2 = [support];

  var layout2 = {
    // title: 'Happiness and Social Support',
    yaxis: {
      title: 'Social Support',
      range: [0, 2],
    },
    xaxis: {
      title: 'Happiness Score',
      range: [.5, 8],
    },
    text: 'happiness rank'
  };

  Plotly.newPlot('plot2', data2, layout2);

  var life = {
      x: happiness_score,
      y: life_expectancy, 
      text: country,  
      mode: 'markers',
      type: 'scatter',
      marker: { 
        size: 12,
        color: happiness_rank,
        colorscale: 'Portland',
        showscale: true,
      }
  };

  var data3 = [life];

  var layout3 = {
    // title: 'Happiness and life Expectancy',
    yaxis: {
      title: 'life Expectancy',
      range: [0, 2],
    },
    xaxis: {
      title: 'Happiness Score',
      range: [.5, 8],
    },
    text: 'happiness rank'
  };

  Plotly.newPlot('plot3', data3, layout3);

  var freedom = {
      x: happiness_score,
      y: freedom, 
      text: country,
      mode: 'markers',
      type: 'scatter',
      marker: { 
        size: 12,
        color: happiness_rank,
        colorscale: 'Portland',
        showscale: true,
      }
  };

  var data4 = [freedom];

  var layout4 = {
    // title: 'Happiness and Freedom',
    yaxis: {
      title: 'Freedom',
      range: [0, 2],
    },
    xaxis: {
      title: 'Happiness Score',
      range: [.5, 8],
    },
    text: 'happiness rank'
  };


  Plotly.newPlot('plot4', data4, layout4);

  var generosity= {
      x: happiness_score,
      y: generosity, 
      text: country,
      mode: 'markers',
      type: 'scatter',
      marker: { 
        size: 12,
        color: happiness_rank,
        colorscale: 'Portland',
        showscale: true,
      }
  };

  var data5 = [generosity];

  var layout5 = {
    // title: 'Happiness and Generosity',
    yaxis: {
      title: 'Generosity',
      range: [0, 2],
    },
    xaxis: {
      title: 'Happiness Score',
      range: [.5, 8],
    },
    text: 'happiness rank'
  };

  Plotly.newPlot('plot5', data5, layout5);

  var corruption = {
      x: happiness_score,
      y: government_corr, 
      text: country,
      mode: 'markers',
      type: 'scatter',
      marker: { 
        size: 12,
        color: happiness_rank,
        colorscale: 'Portland',
        showscale: true,
      }
  };

  var data6 = [corruption];

  var layout6 = {
    // title: 'Happiness and Government Corruption',
    yaxis: {
      title: 'Government Corruption',
      range: [0, 2],
    },
    xaxis: {
      title: 'Happiness Score',
      range: [.5, 8],
    },
    text: 'happiness rank'

  };

  Plotly.newPlot('plot6', data6, layout6);

// Make plots responsive to bootstrap
(function() {
  // var d3 = Plotly.d3;
  var WIDTH_IN_PERCENT_OF_PARENT = 100,
      HEIGHT_IN_PERCENT_OF_PARENT = 90;
  
  var gd3 = d3.selectAll(".responsive-plot")
      .style({
        width: WIDTH_IN_PERCENT_OF_PARENT + '%',
        'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',
        
        height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
        'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + 'vh'
      });

  var nodes_to_resize = gd3[0]; 
  window.onresize = function() {
    for (var i = 0; i < nodes_to_resize.length; i++) {
      Plotly.Plots.resize(nodes_to_resize[i]);
    }
  };
  
})();
});


