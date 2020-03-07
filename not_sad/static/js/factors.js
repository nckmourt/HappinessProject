//  python -m http.server

//=================
// Define variables
//=================
var v_score = [];
var v_gdp  = [];
var v_social = [];
var v_life  = [];
var v_family  = [];
var v_freedom  = [];
var v_generosity  = [];
var v_corruption  = [];
var v_country  = [];
var v_rank  = [];
var v_year = [];
var v_region = [];
var v_support = [];

var re_support = [];

var y_country = [];
var y_rank = [];
var y_score = [];  
var y_gdp = [];
var y_life = [];
var y_freedom = [];
var y_generosity = [];
var y_corruption= [];
var y_social = [];
var y_year = [];

var topTen = ["Finland",  "Denmark", "Norway", "Iceland", "Netherlands", "Switzerland",
            "Sweden", "New Zealand", "Canada", "Austria"];
var years = ['2015', '2016', '2017', '2018', '2019'] ; 
var rptYr = ['2019'];
var topRank = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']; 
var minRank = []; 

var countries = []; 
var uniqueCtry = [];      
var CtryData = []; 
var current = [];
var pastTen = [];
var currTen = [];
var currLow = [];
// var data19 = [];
var past = []; 
var allFac1 = []; //all years - all countries
var allFac2 = []; //all years - top10 countries
var currFac1 = []; //curr year - all countries
var currFac2 = []; //curr year - top10 countries
var avgData = []; 

var topTenData = [];
var topRankData = [];
var minTenData = [];
var minRankData = [];
var myData = [];



//============================================
// Use d3 to read database - build chart data
//============================================

// d3.json("../api/year/2019").then(function(data) {
// d3.csv("../data/whd-2015-19.csv").then(function(data) {

  d3.csv("/static/data/whd-2015-19.csv").then(function(data) {
    console.log(data[0]);
  });
  
  d3.csv("/static/data/whd-2015-19.csv").then(function(data) {
    v_country = data.map(d => d.country);
    v_rank =data.map(d => d.happiness_rank);
    v_score = data.map(d => d.happiness_score);  
    v_gdp = data.map(d => d.gdp_per_capita);
    v_family = data.map(d => d.family);
    v_life = data.map(d => d.life_expectancy);
    v_freedom = data.map(d => d.freedom);
    v_generosity = data.map(d => d.generosity);
    v_corruption = data.map(d => d.government_corr);
    v_social = data.map(d => d.social_support);
    v_continent = data.map(d => d.continent);
    v_year = data.map(d => d.year);

  //concatenate data values renamed over time and remove null values
  v_support = v_social.concat(v_family);
  re_support = v_support.filter(function (el) {
    return el != null && el != "";
  });
  // console.log("years support: ", re_support)




  //==================================================================== 
  //filter data by curr year and change array of objects into new array
  //====================================================================

  data19 = data.filter( el => { if (rptYr.includes(el.year)) return el; })
  console.log(data19)
  //change array of objects into array
  var currYear = data19.map(Object.values);

  //filter curr year arrays
  y_country = currYear.map(d => d[0]);
  // console.log("y_country: ", y_country)
 
  y_rank = currYear.map(d => d[1]);
  y_score = currYear.map(d => d[2]);  
  y_gdp = currYear.map(d => d[3]);
  y_life = currYear.map(d => d[5]);
  y_freedom = currYear.map(d => d[6]);
  y_generosity = currYear.map(d => d[7]);
  y_corruption = currYear.map(d => d[8]);
  y_social = currYear.map(d => d[9]);
  y_year = currYear.map(d=> d[11]);



  //====================================
  //build initial (defualt) data charts 
  //====================================

  //Call function to plot Top default factor data 
  plotfact(currFac1)
  // plotfact2(allFac1)
  
})



//===============================================================
// Plot default factor charts (curr year - all countries) 
//===============================================================
function plotfact(currFac1) {
  //#1
  var gdp = {
    x: y_score,
    y: y_gdp,
    text: y_country,
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 12,
      color: y_score,
      colorscale: 'Portland',
      showscale: true,
      // reversescale: true,
    }
  };

  var factor1 = [gdp];

  var layout = {   
    title: 'Happiness v GDP',
    yaxis: {
      title: 'GDP per Capita',
      range: [0, 2],
    },
    xaxis: {
      title: 'Happiness Score',
      range: [.5, 8],
    },
    text: 'happiness rank',
    // legend: {traceorder: reversed,
    // }
  };

  config = {responsive: true}

  Plotly.newPlot('plot1', factor1, layout, config);

  //#2
  var support = {
    x: y_score,
    y: y_social,
    text: y_country,
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 12,
      color: y_score,
      colorscale: 'Portland',
      showscale: true
      // reversescale: true,
    }
  };

  var factor2 = [support];

  var layout2 = {
    title: 'Happiness v Social Support',
    yaxis: {
      title: 'Social Support',
      range: [0, 2],
    },
    xaxis: {
      title: 'Happiness Score',
      range: [.5, 8],
    },
    text: 'happiness rank',
    // legend: {traceorder: reversed,
    // }
  };

  Plotly.newPlot('plot2', factor2, layout2);

  //#3
  var life = {
    x: y_score,
    y: y_life,
    text: y_country,  
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 12,
      color: y_score,
      colorscale: 'Portland',
      showscale: true,
      // reversescale: true,
    },
  };

  var factor3 = [life];

  var layout3 = {
    title: 'Happiness v Life Expectancy',
    yaxis: {
      title: 'Life Expectancy',
      range: [0, 2],
    },
    xaxis: {
      title: 'Happiness Score',
      range: [.5, 8],
    },
    text: 'happiness rank',
    // legend: {traceorder: reversed,
    // }
  };

  config = {responsive: true}

  Plotly.newPlot('plot3', factor3, layout3, config);

  //#4
  var freedom = {
    x: y_score,
    y: y_freedom, 
    text: y_country,
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 12,
      color: y_score,
      colorscale: 'Portland',
      showscale: true,
    //  reversescale: true,
    }
  };

  var factor4 = [freedom];

  var layout4 = {
    title: 'Happiness v Freedom',
    yaxis: {
      title: 'Freedom',
      range: [0, 2],
    },
    xaxis: {
      title: 'Happiness Score',
      range: [.5, 8],
    },
    text: 'happiness rank',
    // legend: {traceorder: reversed,
    // }
  };

  config = {responsive: true}

  Plotly.newPlot('plot4', factor4, layout4, config);

  //#5
  var generosity= {
    x: y_score,
    y: y_generosity, 
    text: y_country,
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 12,
      color: y_score,
      colorscale: 'Portland',
      showscale: true,
    //   reversescale: true,
    }
  };

  var factor5 = [generosity];

  var layout5 = {
    title: 'Happiness v Generosity',
    yaxis: {
      title: 'Generosity',
      range: [0, 2],
    },
    xaxis: {
      title: 'Happiness Score',
      range: [.5, 8],
    },
    text: 'happiness rank',
    // legend: {traceorder: reversed,
    // }
  };

  config = {responsive: true}

  Plotly.newPlot('plot5', factor5, layout5, config);

  //#6
  var corruption = {
    x: y_score,
    y: y_corruption, 
    text: y_country,
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 12,
      color: y_score,
      colorscale: 'Portland',
      showscale: true,
      // reversescale: true, 
    }
  };

  var factor6 = [corruption];

  var layout6 = {
  title: 'Happiness v Government Corruption',
    yaxis: {
      title: 'Government Corruption',
      range: [0, 2],
    },
    xaxis: {
      title: 'Happiness Score',
      range: [.5, 8],
    },
    text: 'happiness rank',
    // legend: {traceorder: reversed,
    // }
  };

  config = {responsive: true}
  Plotly.newPlot('plot6', factor6, layout6, config);
};



//===============================================================
// Plot factor charts for all years - all countries 
//===============================================================
function plotfact2(allFac1) {
  
  //#1
  var gdp = {
    x: v_score,
    y: v_gdp, 
    text: v_country,
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 12,
      color: v_score,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var fall1 = [gdp];

  var layout1 = {   
  title: 'Happiness v GDP',
  yaxis: {
    title: 'GDP per Capita',
    range: [-1, 2],
  },
  xaxis: {
    title: 'Happiness Score',
    range: [.5, 8],
  },
  text: 'happiness rank'
  };

  config = {responsive: true}

  Plotly.newPlot('plot1', fall1, layout1, config);

  //#2
  var support = {
    x: v_score,
    y: re_support,
    text: v_country,
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 12,
      color: v_score,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var fall2 = [support];

  var layout2 = {
  title: 'Happiness v Social Support',
  yaxis: {
    title: 'Support',
    range: [-1, 2],
  },
  xaxis: {
    title: 'Happiness Score',
    range: [.5, 8],
  },
  text: 'happiness rank'
  };

  config = {responsive: true}

  Plotly.newPlot('plot2', fall2, layout2, config);

  //#3
  var life = {
    x: v_score,
    y: v_life,
    text: v_country, 
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 12,
      color: v_score,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var fall3 = [life];

  var layout3 = {
  title: 'Happiness v Life Expectancy',
  yaxis: {
    title: 'Life Expectancy',
    range: [-1, 2],
  },
  xaxis: {
    title: 'Happiness Score',
    range: [.5, 8],
  },
  text: 'happiness rank'
  };

  config = {responsive: true}

  Plotly.newPlot('plot3', fall3, layout3, config);

  //#5
  var freedom = {
    x: v_score,
    y: v_freedom, 
    text: v_country,
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 12,
      color: v_score,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var fall4 = [freedom];

  var layout4= {
  title: 'Happiness v Freedom',
  yaxis: {
    title: 'Freedom',
    range: [-1, 2],
  },
  xaxis: {
    title: 'Happiness Score',
    range: [.5, 8],
  },
  text: 'happiness rank'
  };

  config = {responsive: true}

  Plotly.newPlot('plot4', fall4, layout4, config);

  //#5
  var generosity= {
    x: v_score,
    y: v_generosity, 
    text: v_country,
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 12,
      color: v_score,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var fall5 = [generosity];

  var layout5 = {
  title: 'Happiness v Generosity',
  yaxis: {
    title: 'Generosity',
    range: [-1, 2],
  },
  xaxis: {
    title: 'Happiness Score',
    range: [.5, 8],
  },
  text: 'happiness rank'
  };

  config = {responsive: true}

  Plotly.newPlot('plot5', fall5, layout5, config);

  //#7
  var corruption = {
    x: v_score,
    y: v_corruption, 
    text: v_country,
    mode: 'markers',
    type: 'scatter',
    marker: { 
      size: 12,
      color: v_score,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var fall6 = [corruption];

  var layout6 = {
  title: 'Happiness v Government Corruption',
  yaxis: {
    title: 'Government Corruption',
    range: [-1, 2],
  },
  xaxis: {
    title: 'Happiness Score',
    range: [.5, 8],
  },
  text: 'happiness rank'

  };

  config = {responsive: true}

  Plotly.newPlot('plot6', fall6, layout6, config);
};


//====================
// Add Event Listners
//=====================
//Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu2 = d3.select("#selData");
  
  // Assign the value of the dropdown menu option to a variable
  var data = dropdownMenu2.node().value;

  var chart = d3.selectAll("#topten").node();

  
  switch(data) {
    case "current": 
      plotfact(currFac1)
      break;
      
    case "years": 
     plotfact2(allFac1)
      break;


    default:
      //Call function to plot Top default factor data 
      plotfact(currFac1)
  };

};
