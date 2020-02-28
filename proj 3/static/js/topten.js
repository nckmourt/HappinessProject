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



 
  //=================================
  //filter data by top ten countries
  //=================================

  topTenData = data.filter( el => { if (topTen.includes(el.country)) return el; })
  console.log(topTenData)

  topTen1 = topTenData.filter( el => { if (topTen[0].includes(el.country)) return el; })
  console.log(topTen1)

  topTen2 = topTenData.filter( el => { if (topTen[1].includes(el.country)) return el; })

  topTen3 = topTenData.filter( el => { if (topTen[2].includes(el.country)) return el; })

  topTen4 = topTenData.filter( el => { if (topTen[3].includes(el.country)) return el; })

  topTen5 = topTenData.filter( el => { if (topTen[4].includes(el.country)) return el; })

  topTen6 = topTenData.filter( el => { if (topTen[5].includes(el.country)) return el; })

  topTen7 = topTenData.filter( el => { if (topTen[6].includes(el.country)) return el; })

  topTen8 = topTenData.filter( el => { if (topTen[7].includes(el.country)) return el; })

  topTen9 = topTenData.filter( el => { if (topTen[8].includes(el.country)) return el; })

  topTen10 = topTenData.filter( el => { if (topTen[9].includes(el.country)) return el; })

  
  
  //filter top ten country data by year
  

  topTen15 = topTenData.filter( el => { if (years[0].includes(el.year)) return el; })
  // console.log(topTen15)

  topTen16 = topTenData.filter( el => { if (years[1].includes(el.year)) return el; })
  // console.log(topTen16)

  topTen17 = topTenData.filter( el => { if (years[2].includes(el.year)) return el; })
  // console.log(topTen17)

  topTen18 = topTenData.filter( el => { if (years[3].includes(el.year)) return el; })
  // console.log(topTen18)

  topTen19 = topTenData.filter( el => { if (years[4].includes(el.year)) return el; })
  // console.log(topTen19)




  //===================================
  //filter data by top tens over years
  //===================================
  topRankData = data.filter( el => { if (topRank.includes(el.happiness_rank)) return el; })
  console.log("by rank: ", topRankData)

  //capture top rank countries for charts
  countries = topRankData.map(d => d.country)

  //remove duplicates from coutries
  $.each(countries, function(i, el){
      if($.inArray(el, uniqueCtry) === -1) uniqueCtry.push(el);
  });

  uniqueCtry.sort();

  console.log('unique ctry: ', uniqueCtry )

  topRank1 = topRankData.filter( el => { if (uniqueCtry[0].includes(el.country)) return el; })
  console.log(topRank1)

  topRank2 = topRankData.filter( el => { if (uniqueCtry[1].includes(el.country)) return el; })

  topRank3 = topRankData.filter( el => { if (uniqueCtry[2].includes(el.country)) return el; })

  topRank4 = topRankData.filter( el => { if (uniqueCtry[3].includes(el.country)) return el; })

  topRank5 = topRankData.filter( el => { if (uniqueCtry[4].includes(el.country)) return el; })

  topRank6 = topRankData.filter( el => { if (uniqueCtry[5].includes(el.country)) return el; })

  topRank7 = topRankData.filter( el => { if (uniqueCtry[6].includes(el.country)) return el; })

  topRank8 = topRankData.filter( el => { if (uniqueCtry[7].includes(el.country)) return el; })

  topRank9 = topRankData.filter( el => { if (uniqueCtry[8].includes(el.country)) return el; })

  topRank10 = topRankData.filter( el => { if (uniqueCtry[9].includes(el.country)) return el; })

  topRank11 = topRankData.filter( el => { if (uniqueCtry[10].includes(el.country)) return el; })



  //================================================================== 
  //filter top 10s by rank and change array of objects into new array
  //==================================================================

  Top1 = topRankData.filter( el => { if (topRank[0].includes(el.happiness_rank)) return el; })
  Result1 = Top1.map(Object.values);
  // console.log("Top1: ", Top1)
  // console.log("Result 1: ", Result1)

  Top2 = topRankData.filter( el => { if (topRank[1].includes(el.happiness_rank)) return el; })
  Result2 = Top2.map(Object.values);

  Top3 = topRankData.filter( el => { if (topRank[2].includes(el.happiness_rank)) return el; })
  Result3 = Top3.map(Object.values);

  Top4 = topRankData.filter( el => { if (topRank[3].includes(el.happiness_rank)) return el; })
  Result4 = Top4.map(Object.values);

  Top5 = topRankData.filter( el => { if (topRank[4].includes(el.happiness_rank)) return el; })
  Result5 = Top5.map(Object.values);

  Top6 = topRankData.filter( el => { if (topRank[5].includes(el.happiness_rank)) return el; })
  Result6 = Top6.map(Object.values);

  Top7 = topRankData.filter( el => { if (topRank[6].includes(el.happiness_rank)) return el; })
  Result7 = Top7.map(Object.values);

  Top8 = topRankData.filter( el => { if (topRank[7].includes(el.happiness_rank)) return el; })
  Result8 = Top8.map(Object.values);

  Top9 = topRankData.filter( el => { if (topRank[8].includes(el.happiness_rank)) return el; })
  Result9 = Top9.map(Object.values);

  Top10 = topRankData.filter( el => { if (topRank[9].includes(el.happiness_rank)) return el; })
  Result10 = Top10.map(Object.values);



  //====================================
  //build initial (defualt) data charts 
  //====================================

  // call function to plot top10 countries 5-year ranking numbers
  plotdata(current)

  //Call function to plot Top 10 Over 5 Years (AT A GLANCE)
  plotcurr(currTen)
  // plotpast(pastTen)

})

   
//========================
// Plot current year top10 
//========================
function plotdata(current) {
  //#1
  var currData1 = {
    x: topTen1.map(a => a.year),
    y: topTen1.map(a => a.happiness_rank),
    type: 'bar',
    marker: {
      color: 'rgba(238, 229, 151, 0.952)'
    },
    text: topTen1.map(a => a.happiness_rank).map(String),
    textposition: 'auto',
    hovertemplate: []
  };

  var data = [currData1];

  var layout = {   
    title: {
      text: 'Happiness Rank',
      font: {
        size: 18
      }
    },  
    barmode: 'group',
    yaxis: {
      title: 'Rank',
    },
    xaxis: {
      title: 'Year',
      autorange: 'reversed',
    },
    height: 300, 
    width: 700,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)"
  };

  config = {responsive: true}

  Plotly.newPlot('rank1', data, layout, config);

  //#2
  var currData2 = {
    x: topTen2.map(a => a.year),
    y: topTen2.map(a => a.happiness_rank),
    type: 'bar',
    marker: {
      color: 'rgba(238, 229, 151, 0.952)'
    },
    text: topTen2.map(a => a.happiness_rank).map(String),
    textposition: 'auto',
    hovertemplate: []
  }

  var data = [currData2];

  var layout = {   
    title: {
      text: 'Happiness Rank',
      font: {
        size: 18
      }
    },  
    barmode: 'group',
    yaxis: {
      title: 'Rank',
    },
    xaxis: {
      title: 'Year',
      autorange: 'reversed',
    },
    height: 300, 
    width: 700,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)"
  };

  config = {responsive: true}

  Plotly.newPlot('rank2', data, layout, config);

  //#3
  var currData3 = {
    x: topTen3.map(a => a.year),
    y: topTen3.map(a => a.happiness_rank),
    type: 'bar',
    marker: {
      color: 'rgba(238, 229, 151, 0.952)'
    },
    text: topTen3.map(a => a.happiness_rank).map(String),
    textposition: 'auto',
    hovertemplate: []
  };

  var data = [currData3];

  var layout = {   
    title: {
      text: 'Happiness Rank',
      font: {
        size: 18
      }
    },  
    barmode: 'group',
    yaxis: {
      title: 'Rank',
    },
    xaxis: {
      title: 'Year',
      autorange: 'reversed',
    },
    height: 300, 
    width: 700,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)"
  };

  config = {responsive: true}
  
  Plotly.newPlot('rank3', data, layout, config);

//#4  
  var currData4 = {
    x: topTen4.map(a => a.year),
    y: topTen4.map(a => a.happiness_rank),
    type: 'bar',
    marker: {
      color: 'rgba(238, 229, 151, 0.952)'
    },
    text: topTen4.map(a => a.happiness_rank).map(String),
    textposition: 'auto',
    hovertemplate: []
  }

  var data = [currData4];

  var layout = {   
    title: {
      text: 'Happiness Rank',
      font: {
        size: 18
      }
    },  
    barmode: 'group',
    yaxis: {
      title: 'Rank',
    },
    xaxis: {
      title: 'Year',
      autorange: 'reversed',
    },
    height: 300, 
    width: 700,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)"
  };

  config = {responsive: true}
  
  Plotly.newPlot('rank4', data, layout, config);

//#5
  var currData5 = {
    x: topTen5.map(a => a.year),
    y: topTen5.map(a => a.happiness_rank),
    marker: {
      color: 'rgba(238, 229, 151, 0.952)'
    },
    type: 'bar',
    text: topTen5.map(a => a.happiness_rank).map(String),
    textposition: 'auto',
    hovertemplate: []
  };

  var data = [currData5];

  var layout = {   
    title: {
      text: 'Happiness Rank',
      font: {
        size: 18
      }
    },  
    barmode: 'group',
    yaxis: {
      title: 'Rank',
    },
    xaxis: {
      title: 'Year',
      autorange: 'reversed',
    },
    height: 300, 
    width: 700,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)"
  };

  config = {responsive: true}
  
  Plotly.newPlot('rank5', data, layout, config);

//#6  
  var currData6 = {
    x: topTen6.map(a => a.year),
    y: topTen6.map(a => a.happiness_rank),
    type: 'bar',
    marker: {
      color: 'rgba(238, 229, 151, 0.952)'
    },
    text: topTen6.map(a => a.happiness_rank).map(String),
    textposition: 'auto',
    hovertemplate: []
  }

  var data = [currData6];

  var layout = {   
    title: {
      text: 'Happiness Rank',
      font: {
        size: 18
      }
    },  
    barmode: 'group',
    yaxis: {
      title: 'Rank',
    },
    xaxis: {
      title: 'Year',
      autorange: 'reversed',
    },
    height: 300, 
    width: 700,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)"
  };

  config = {responsive: true}
  
  Plotly.newPlot('rank6', data, layout, config);

  //#7  
  var currData7 = {
    x: topTen7.map(a => a.year),
    y: topTen7.map(a => a.happiness_rank),
    type: 'bar',
    marker: {
      color: 'rgba(238, 229, 151, 0.952)'
    },
    text: topTen7.map(a => a.happiness_rank).map(String),
    textposition: 'auto',
    hovertemplate: []
  };

  var data = [currData7];

  var layout = {   
    title: {
      text: 'Happiness Rank',
      font: {
        size: 18
      }
    },  
    barmode: 'group',
    yaxis: {
      title: 'Rank',
    },
    xaxis: {
      title: 'Year',
      autorange: 'reversed',
    },
    height: 300, 
    width: 700,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)"
  };

  config = {responsive: true}
  
  Plotly.newPlot('rank7', data, layout, config);

  //#8
  var currData8 = {
    x: topTen8.map(a => a.year),
    y: topTen8.map(a => a.happiness_rank),
    type: 'bar',
    marker: {
      color: 'rgba(238, 229, 151, 0.952)'
    },
    text: topTen8.map(a => a.happiness_rank).map(String),
    textposition: 'auto',
    hovertemplate: []
  }

  var data = [currData8];

  var layout = {   
    title: {
      text: 'Happiness Rank',
      font: {
        size: 18
      }
    },  
    barmode: 'group',
    yaxis: {
      title: 'Rank',
    },
    xaxis: {
      title: 'Year',
      autorange: 'reversed',
    },
    height: 300, 
    width: 700,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)"
  };

  config = {responsive: true}
  
  Plotly.newPlot('rank8', data, layout, config);

  //#9
  var currData9 = {
    x: topTen9.map(a => a.year),
    y: topTen9.map(a => a.happiness_rank),
    type: 'bar',
    marker: {
      color: 'rgba(238, 229, 151, 0.952)'
    },
    text: topTen9.map(a => a.happiness_rank).map(String),
    textposition: 'auto',
    hovertemplate: []
  };

  var data = [currData9];

  var layout = {   
    title: {
      text: 'Happiness Rank',
      font: {
        size: 18
      }
    },  
    barmode: 'group',
    yaxis: {
      title: 'Rank',
    },
    xaxis: {
      title: 'Year',
      autorange: 'reversed',
    },
    height: 300, 
    width: 700,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)"
  };

  config = {responsive: true}
  
  Plotly.newPlot('rank9', data, layout, config);

  //#10
  var currData10 = {
    x: topTen10.map(a => a.year),
    y: topTen10.map(a => a.happiness_rank),
    type: 'bar',
    marker: {
      color: 'rgba(238, 229, 151, 0.952)'
    },
    text: topTen10.map(a => a.happiness_rank).map(String),
    textposition: 'auto',
    hovertemplate: []
  }

  var data = [currData10];

  var layout = {   
    title: {
      text: 'Happiness Rank',
      font: {
        size: 18
      }
    },  
    barmode: 'group',
    yaxis: {
      title: 'Rank',
    },
    xaxis: {
      title: 'Year',
      autorange: 'reversed',
    },
    height: 300, 
    width: 700,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)"
  };

  config = {responsive: true}
  
  Plotly.newPlot('rank10', data, layout, config);

};
 

//========================
// Plot current year top10 
//========================

function plotcurr(currTen) {
  var curr2015 = {
    x: topTen15.map(a => a.country),
    y: topTen15.map(a => a.happiness_rank),
    name: years[0],
    type: 'bar',
  };

  var curr2016 = {
    x: topTen16.map(a => a.country),
    y: topTen16.map(a => a.happiness_rank),
    name: years[1],
    type: 'bar',
  };

  var curr2017 = {
    x: topTen17.map(a => a.country),
    y: topTen17.map(a => a.happiness_rank),
    name: years[2],
    type: 'bar',
  };

  var curr2018 = {
    x: topTen18.map(a => a.country),
    y: topTen18.map(a => a.happiness_rank),
    name: years[3],
    type: 'bar',
  };

  var curr2019 = {
    x: topTen19.map(a => a.country),
    y: topTen19.map(a => a.happiness_rank),
    name: years[4],
    type: 'bar',
  };

  var currData = [curr2019, curr2018, curr2017, curr2016, curr2015];
    
  config = {responsive: true}

  var layout = {   
  title: {
    text: '2019 Top 10: 5-YEAR AT A GLANCE',
    font: {
      family: 'Lucida Sans Unicode',
      size: 36
      }, 
    },   
    barmode: 'group',
    yaxis: {
      title: 'Hppiness Rank',
      range: [0, 15],
    },
    xaxis: {
      title: 'Country',
    },
    height: 650, 
    margin: {
      b: 100,
      t: 200,
      r: 200,
      l: 250,
      pad: 4
    },
  };

// var CHART = d3.selectAll("#topten").node();

Plotly.newPlot('tens', currData, layout, config);
};



//====================
// Plot former top10s
//====================

function plotpast(pastTen) {
  var pastData1 = {
    x: topRank1.map(a => a.year),
    y: topRank1.map(a => a.happiness_rank),
    name: uniqueCtry [0],
    type: 'bar',
  };

  var pastData2 = {
    x: topRank2.map(a => a.year),
    y: topRank2.map(a => a.happiness_rank),
    name: uniqueCtry [1],
    type: 'bar',
  };

  var pastData3 = {
    x: topRank3.map(a => a.year),
    y: topRank3.map(a => a.happiness_rank),
    name: uniqueCtry [2],
    type: 'bar',
  };

  var pastData4 = {
    x: topRank4.map(a => a.year),
    y: topRank4.map(a => a.happiness_rank),
    name: uniqueCtry [3],
    type: 'bar',
  };

  var pastData5 = {
    x: topRank5.map(a => a.year),
    y: topRank5.map(a => a.happiness_rank),
    name: uniqueCtry [4],
    type: 'bar',
  };

  var pastData6 = {
    x: topRank6.map(a => a.year),
    y: topRank6.map(a => a.happiness_rank),
    name: uniqueCtry [5],
    type: 'bar',
  };

  var pastData7 = {
    x: topRank7.map(a => a.year),
    y: topRank7.map(a => a.happiness_rank),
    name: uniqueCtry [6],
    type: 'bar',
  };

  var pastData8 = {
    x: topRank8.map(a => a.year),
    y: topRank8.map(a => a.happiness_rank),
    name: uniqueCtry [7],
    type: 'bar',
  };

  var pastData9 = {
    x: topRank9.map(a => a.year),
    y: topRank9.map(a => a.happiness_rank),
    name: uniqueCtry [8],
    type: 'bar',
  };

  var pastData10 = {
    x: topRank10.map(a => a.year),
    y: topRank10.map(a => a.happiness_rank),
    name: uniqueCtry [9],
    type: 'bar',
  };

  var pastData11 = {
    x: topRank11.map(a => a.year),
    y: topRank11.map(a => a.happiness_rank),
    name: uniqueCtry [10],
    type: 'bar',
  };

  var pastData = [pastData1, pastData2, pastData3, pastData4, pastData5, 
                pastData6, pastData7, pastData8, pastData9, pastData10, pastData11];
    
  config = {responsive: true}

  var layout = {   
  title: {
    text: 'Top 10s: 5-YEAR AT A GLANCE',
    font: {
      family: 'Lucida Sans Unicode',
      size: 36
      }, 
    },   
    barmode: 'group',
    yaxis: {
      title: 'Hppiness Rank',
      range: [0, 15],
    },
    xaxis: {
      title: 'Year',
    },
    height: 650, 
    margin: {
      b: 100,
      t: 200,
      r: 200,
      l: 250,
      pad: 4
    },
  };
    
Plotly.newPlot('tens', pastData, layout, config);
};





//====================
// Add Event Listners
//=====================
// function factors() {
//Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selView");
  
  // Assign the value of the dropdown menu option to a variable
  var view = dropdownMenu.node().value;
  

  var chart = d3.selectAll("#topten").node();

  switch(view) {
    case "Current10":
      plotcurr(currTen)
      break;

    case "Past10":
      plotpast(pastTen)
      break;

    default:
      // call funcrion to plot top 10 data
      plotdata(current)
    
      //Call function to plot Top 10 Over 5 Years (AT A GLANCE)
      plotcurr(currTen)
  }

 
};
