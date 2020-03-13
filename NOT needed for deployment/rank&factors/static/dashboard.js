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

d3.csv("../whd-2015-19.csv").then(function(data) {
// d3.json("../api/year/2019").then(function(data) {
  console.log(data[0]);
});

d3.csv("../whd-2015-19.csv").then(function(data) {
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



  //===============================
  //filter curr data by bottom 10
  //===============================

  //get bottom 10 ranks using array length
  var min10 = data19.length
  let min1 = min10-9

  // console.log("data 19 max = ", max)

  for(var i = min1; i <= min10; i++){
    minRank.push("" + i);
  }
  // console.log("minRank = ", minRank)
 
  //filter data
  minTenData = data19.filter( el => { if (minRank.includes(el.happiness_rank)) return el; })
  // console.log("bottom10: ", minTenData)

  // minTen1 = minTenData.filter( el => { if (minRank[0].includes(el.country)) return el; })
  // console.log(minTen1)

  // minTen2 = minTenData.filter( el => { if (minRank[1].includes(el.country)) return el; })

  // minTen3 = minTenData.filter( el => { if (minRank[2].includes(el.country)) return el; })

  // minTen4 = minTenData.filter( el => { if (minRank[3].includes(el.country)) return el; })

  // minTen5 = minTenData.filter( el => { if (minRank[4].includes(el.country)) return el; })

  // minTen6 = minTenData.filter( el => { if (minRank[5].includes(el.country)) return el; })

  // minTen7 = minTenData.filter( el => { if (minRank[6].includes(el.country)) return el; })

  // minTen8 = minTenData.filter( el => { if (minRank[7].includes(el.country)) return el; })

  // minTen9 = minTenData.filter( el => { if (minRank[8].includes(el.country)) return el; })

  // minTen10 = minTenData.filter( el => { if (minRank[9].includes(el.country)) return el; })


 
  // //filter bottom ten rank data by year
 

  // minTen15 = minTenData.filter( el => { if (years[0].includes(el.year)) return el; })
  // // console.log(minTen15)

  // minTen16 = minTenData.filter( el => { if (years[1].includes(el.year)) return el; })

  // minTen17 = minTenData.filter( el => { if (years[2].includes(el.year)) return el; })

  // minTen18 = minTenData.filter( el => { if (years[3].includes(el.year)) return el; })

  // minTen19 = minTenData.filter( el => { if (years[4].includes(el.year)) return el; })





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

  //Call function to plot Top default factor data 
  plotfact(currFac1)
  // plotfact2(allFac1)

  
  //  plotten(currFac2)

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

Plotly.newPlot('topten', currData, layout, config);
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
    
Plotly.newPlot('topten', pastData, layout, config);
};


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
      color: y_rank,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var factor1 = [gdp];

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
      color: y_rank,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var factor2 = [support];

  var layout2 = {
  // title: 'Happiness and Social Support (2018-)',
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
      color: y_rank,
      colorscale: 'Portland',
      showscale: true,
    },
  };

  var factor3 = [life];

  var layout3 = {
  // title: 'Happiness and Life Expectancy',
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
      color: y_rank,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var factor4 = [freedom];

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
      color: y_rank,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var factor5 = [generosity];

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
      color: y_rank,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var factor6 = [corruption];

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
      color: v_rank,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var fall1 = [gdp];

  var layout1 = {   
  // title: 'Happiness and GDP',
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
      color: v_rank,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var fall2 = [support];

  var layout2 = {
  // title: 'Happiness and Social Support (2018-)',
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
      color: v_rank,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var fall3 = [life];

  var layout3 = {
  // title: 'Happiness and Life Expectancy',
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
      color: v_rank,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var fall4 = [freedom];

  var layout4= {
  // title: 'Happiness and Freedom',
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
      color: v_rank,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var fall5 = [generosity];

  var layout5 = {
  // title: 'Happiness and Generosity',
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
      color: v_rank,
      colorscale: 'Portland',
      showscale: true,
    }
  };

  var fall6 = [corruption];

  var layout6 = {
  // title: 'Happiness and Government Corruption',
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



//===============================================================
// Plot factor charts for curr year - top10  
//===============================================================
function plotten(currFac2) {

    var gdp = {
      x: topTen19.map(a => a.gdp_per_capita),
      // y: topTen19.map(a => a.country),
      y: topTen19.map(a => a.happiness_rank),
      name: 'GDP',
      orientation: 'h',
      marker: {
        color: 'Portland',
        // width: .5
      },
      type: 'bar'
    };

    var support = {
      x: topTen19.map(a => a.social_support),
      // y: topTen19.map(a => a.country),
      y: topTen19.map(a => a.happiness_rank),
      name: 'Social Support',
      orientation: 'h',
      marker: {
        color: 'Portland',
        // width: 2
      },
      type: 'bar'
    };
  
    var life = {
      x: topTen19.map(a => a.life_expectancy),
      // y: topTen19.map(a => a.country),
      y: topTen19.map(a => a.happiness_rank),
      name: 'Life Expectancy',
      orientation: 'h',
      marker: {
        color: 'Portland',
        // width: 2
      },
      type: 'bar'
    };
  
    var free = {
      x: topTen19.map(a => a.freedom),
      // y: topTen19.map(a => a.country),
      y: topTen19.map(a => a.happiness_rank),
      name: 'Freedom',
      orientation: 'h',
      marker: {
        color: 'Portland',
        // width: 2
      },
      type: 'bar'
    };
  
    var heart= {
      x: topTen19.map(a => a.generosity),
      // y: topTen19.map(a => a.country),
      y: topTen19.map(a => a.happiness_rank),
      name: 'Generosity',
      orientation: 'h',
      marker: {
        color: 'Portland',
        // width: 2
      },
      type: 'bar'
    };
  
    var corruption = {
     x: topTen19.map(a => a.government_corr),
     // y: topTen19.map(a => a.country),
     y: topTen19.map(a => a.happiness_rank),
      name: 'Government Corruption',
      orientation: 'h',
      marker: {
        color: 'Portland',
        // width: 2
      },
      type: 'bar'
    };
  
    var toprank = [gdp, support, life, corruption, free, heart];
    
    var layout = {
      title: {
        // text: '2019 Top Ten Explained by Factors',
        text: '2019 Top Ten',
        font: {
          family: 'Lucida Sans Unicode',
          size: 28
          }, 
        },  
      barmode: 'stack',
      // margin: {
      //   l: 250,
      //   r: 100,
      //   // t: 35,
      //   // b: 20,
      //   pad: 10
      // },
      // width: 1400,
      height: 725,
      xaxis: {
        range: [0, 5],
      },
      yaxis: {autorange:'reversed',
      title: 'Rank',
      tickmode:'linear'
      },
      font: {size:18
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      plot_bgcolor: "rgb(233, 243, 248)",
      paper_bgcolor: "rgb(233, 243, 248)",
      showlegend: false,
	    // legend: {"orientation": "h"}
    };

    config = {responsive: true}
    
    Plotly.newPlot('rankten', toprank, layout, config);

    //run functions to get low and average charts
     plotlow(currLow)
     plotten2(allFac2)
};




//=================================================
// Plot factor charts for curr year - bottom 10 
//=================================================
function plotlow(currLow) {

  var gdp = {
    x: minTenData.map(a => a.gdp_per_capita),
    // y: minTenData.map(a => a.country),
    y: minTenData.map(a => a.happiness_rank),
    name: 'GDP',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: .5
    },
    type: 'bar'
  };

  var support = {
    x: minTenData.map(a => a.social_support),
    // y: minTenData.map(a => a.country),
    y: minTenData.map(a => a.happiness_rank),
    name: 'Social Support',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: 2
    },
    type: 'bar'
  };

  var life = {
    x: minTenData.map(a => a.life_expectancy),
    // y: minTenData.map(a => a.country),
    y: minTenData.map(a => a.happiness_rank),
    name: 'Life Expectancy',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: 2
    },
    type: 'bar'
  };

  var free = {
    x: minTenData.map(a => a.freedom),
    // y: minTenData.map(a => a.country),
    y: minTenData.map(a => a.happiness_rank),
    name: 'Freedom',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: 2
    },
    type: 'bar'
  };

  var heart= {
    x: minTenData.map(a => a.generosity),
    // y: minTenData.map(a => a.country),
    y: minTenData.map(a => a.happiness_rank),
    name: 'Generosity',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: 2
    },
    type: 'bar'
  };

  var corruption = {
   x: minTenData.map(a => a.government_corr),
   // y: minTenData.map(a => a.country),
   y: minTenData.map(a => a.happiness_rank),
    name: 'Government Corruption',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: 2
    },
    type: 'bar'
  };

  var lowrank = [gdp, support, life, corruption, free, heart];
  
  var layout = {
    title: {
      // text: '2019 Bottom Ten Explained by Factors,
      text: '2019 Bottom Ten',
      font: {
        family: 'Lucida Sans Unicode',
        size: 28
        }, 
      },  
    barmode: 'stack',
    // margin: {
    //   l: 250,
    //   r: 100,
    //   // t: 35,
    //   // b: 20,
    //   pad: 10
    // },
    // width: 1400,
    height: 725,
    xaxis: {
      range: [0, 5],
    },
    yaxis: {autorange:'reversed',
    title: 'Rank',
    tickmode:'linear'
    },
    font: {size:18
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    },
    plot_bgcolor: "rgb(233, 243, 248)",
    paper_bgcolor: "rgb(233, 243, 248)",
    showlegend: false,
	  // legend: {"orientation": "h"}
  };

  config = {responsive: true}
  
  Plotly.newPlot('ranklow', lowrank, layout, config);
};




//====================================================
// Plot factor averages for for top10s each all years
//====================================================
function plotten2(allFac2) {

  formatx(avgData)

  var gdp = {
    x: gdpArr,
    y: topRank,
    name: 'GDP',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: .5
    },
    type: 'bar'
  };
  
  var life= {
    x: lifeArr,
    y: topRank,
    name: 'Life Expectancy',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: .5
    },
    type: 'bar'
  };

  var free = {
    x: freeArr,
    y: topRank,
    name: 'Freedom',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: .5
    },
    type: 'bar'
  };

  var heart = {
    x: heartArr,
    y: topRank,
    name: 'Generosity',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: .5
    },
    type: 'bar'
  };

  var corruption= {
    x: corrArr,
    y: topRank,
    name: 'Government Corruption',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: .5
    },
    type: 'bar'
  };

  var support = {
    x: supportArr,
    y: topRank,
    name: 'Support',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: .5
    },
    type: 'bar'
  };

  var allrank = [gdp, support, life, corruption, free, heart];
  
  var layout = {
    title: {
      // text: 'Happiness Explained by Factors (averages)',
      text: '5-Year Averages',
      font: {
        family: 'Lucida Sans Unicode',
        size: 28
        }, 
      },  
    barmode: 'stack',
    // margin: {
    //   l: 250,
    //   r: 100,
    //   // t: 35,
    //   // b: 20,
    //   pad: 10
    // },
    // width: 1400,
    height: 725,
    xaxis: {
      range: [0, 5],
      // title: 'Factors'
    },
    yaxis: {autorange:'reversed',
    title: 'Rank',
    tickmode:'linear'
    },
    font: {size:18},
    options: {
      responsive: true,
      maintainAspectRatio: false
    },
    plot_bgcolor: "rgb(233, 243, 248)",
    paper_bgcolor: "rgb(233, 243, 248)",
    showlegend: false,
	  // legend: {"orientation": "h"}
  };

  config = {responsive: true}
  
  Plotly.newPlot('rankall', allrank, layout, config);
};


//===============================================================
// calculate factor averages of top 10s by rank
//===============================================================
function formatx(avgData) {

  //convert rank1 string arrays to numeric arrays, then calculate average
  x_country = Result1.map(d => d[0]);
  x_score = Result1.map(d => d[2]);  
  x_gdp = Result1.map(d => d[3]);
  x_life = Result1.map(d => d[5]);
  x_freedom = Result1.map(d => d[6]);
  x_generosity = Result1.map(d => d[7]);
  x_corruption = Result1.map(d => d[8]);
  x_social = Result1.map(d => d[9]);
  
  // console.log("#1 countries ", x_country)

  var gdp1 = [];
  var datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_gdp[i]);
    gdp1[i] = datax[i];   
  }
  console.log("x_gdp: ", x_gdp + "gdp1: ", gdp1)
  
  let sum_gdp1 = gdp1.reduce((previous, current) => current += previous);
  let avg_gdp1 = sum_gdp1 / gdp1.length;
  console.log("gdp avg1: ", avg_gdp1)

  var life1 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_life[i]);
    life1[i] = datax[i];   
  }
  let sum_life1 = life1.reduce((previous, current) => current += previous);
  let avg_life1 = sum_life1 / life1.length;

  var freedom1 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_freedom[i]);
    freedom1[i] = datax[i];   
  }
  let sum_freedom1 = freedom1.reduce((previous, current) => current += previous);
  var avg_freedom1 = sum_freedom1 / freedom1.length;

  var generosity1 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_generosity[i]);
    generosity1[i] = datax[i];   
  }
  let sum_generosity1 = generosity1.reduce((previous, current) => current += previous);
  let avg_generosity1 = sum_generosity1 / generosity1.length;

  var corruption1 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_corruption[i]);
    corruption1[i] = datax[i];   
  }
  let sum_corruption1 = corruption1.reduce((previous, current) => current += previous);
  let avg_corruption1 = sum_corruption1 / corruption1.length;

  var support1 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_social[i]);
    support1[i] = datax[i];   
  }
  let sum_support1 = support1.reduce((previous, current) => current += previous);
  let avg_support1 = sum_support1 / support1.length;

  var score1 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_score[i]);
    score1[i] = datax[i];   
  }
  let sum_score1 = score1.reduce((previous, current) => current += previous);
  let avg_score1 = sum_score1 / score1.length;


  //convert rank2 string arrays to numeric arrays, then calculate average
  x_country = Result2.map(d => d[0]);
  x_score = Result2.map(d => d[2]);  
  x_gdp = Result2.map(d => d[3]);
  x_life = Result2.map(d => d[5]);
  x_freedom = Result2.map(d => d[6]);
  x_generosity = Result2.map(d => d[7]);
  x_corruption = Result2.map(d => d[8]);
  x_social = Result2.map(d => d[9]);
  
  var gdp2 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_gdp[i]);
    gdp2[i] = datax[i];   
  }
  
  let sum_gdp2 = gdp2.reduce((previous, current) => current += previous);
  let avg_gdp2 = sum_gdp2 / gdp2.length;
  console.log("gdp avg2: ", avg_gdp2)

  var life2 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_life[i]);
    life2[i] = datax[i];   
  }
  let sum_life2 = life2.reduce((previous, current) => current += previous);
  let avg_life2 = sum_life2 / life2.length;

  var freedom2 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_freedom[i]);
    freedom2[i] = datax[i]; 
  }
  let sum_freedom2 = freedom2.reduce((previous, current) => current += previous);
  let avg_freedom2 = sum_freedom2 / freedom2.length;

  var generosity2 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_generosity[i]);
    generosity2[i] = datax[i];   
  }
  let sum_generosity2 = generosity2.reduce((previous, current) => current += previous);
  let avg_generosity2 = sum_generosity2 / generosity2.length;

  var corruption2 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_corruption[i]);
    corruption2[i] = datax[i];   
  }
  let sum_corruption2 = corruption2.reduce((previous, current) => current += previous);
  let avg_corruption2 = sum_corruption2 / corruption2.length;

  var support2 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_social[i]);
    support2[i] = datax[i];   
  }
  let sum_support2 = support2.reduce((previous, current) => current += previous);
  let avg_support2 = sum_support2/ support2.length;

  var score2 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_score[i]);
    score2[i] = datax[i];   
  }
  let sum_score2 = score2.reduce((previous, current) => current += previous);
  let avg_score2 = sum_score2 / score2.length;

  
  //convert rank3 string arrays to numeric arrays, then calculate average
  x_country = Result3.map(d => d[0]);
  x_score = Result3.map(d => d[2]);  
  x_gdp = Result3.map(d => d[3]);
  x_family = Result3.map(d => d[4]);
  x_life = Result3.map(d => d[5]);
  x_freedom = Result3.map(d => d[6]);
  x_generosity = Result3.map(d => d[7]);
  x_corruption = Result3.map(d => d[8]);
  

  var gdp3 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_gdp[i]);
    gdp3[i] = datax[i];   
  }
  let sum_gdp3 = gdp3.reduce((previous, current) => current += previous);
  let avg_gdp3 = sum_gdp3 / gdp3.length;

  var life3 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_life[i]);
    life3[i] = datax[i];   
  }
  let sum_life3 = life3.reduce((previous, current) => current += previous);
  let avg_life3 = sum_life3 / life3.length;

  var freedom3 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_freedom[i]);
    freedom3[i] = datax[i]; 
  }
  let sum_freedom3 = freedom3.reduce((previous, current) => current += previous);
  let avg_freedom3 = sum_freedom3 / freedom3.length;

  var generosity3 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_generosity[i]);
    generosity3[i] = datax[i];   
  }
  let sum_generosity3 = generosity3.reduce((previous, current) => current += previous);
  let avg_generosity3 = sum_generosity3 / generosity3.length;

  var corruption3 = []
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_corruption[i]);
    corruption3[i] = datax[i];   
  }
  let sum_corruption3 = corruption3.reduce((previous, current) => current += previous);
  let avg_corruption3 = sum_corruption3 / corruption3.length;

  var support3 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_family[i]);
    support3[i] = datax[i];   
  }
  let sum_support3 = support3.reduce((previous, current) => current += previous);
  let avg_support3 = sum_support3 / support3.length;

  var score3 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_score[i]);
    score3[i] = datax[i];   
  }
  let sum_score3 = score3.reduce((previous, current) => current += previous);
  let avg_score3 = sum_score3 / score3.length;


  //convert rank4 string arrays to numeric arrays, then calculate average
  x_country = Result4.map(d => d[0]);
  x_score = Result4.map(d => d[2]);  
  x_gdp = Result4.map(d => d[3]);
  x_family = Result4.map(d => d[4]);
  x_life = Result4.map(d => d[5]);
  x_freedom = Result4.map(d => d[6]);
  x_generosity = Result4.map(d => d[7]);
  x_corruption = Result4.map(d => d[8]);

  console.log("x_gdp: ", x_gdp + "gdp4: ", gdp4)

  var gdp4 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_gdp[i]);
    gdp4[i] = datax[i];   
  }
  let sum_gdp4 = gdp4.reduce((previous, current) => current += previous);
  let avg_gdp4 = sum_gdp4 / gdp4.length;

  var life4 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_life[i]);
    life4[i] = datax[i];   
  }
  let sum_life4 = life4.reduce((previous, current) => current += previous);
  let avg_life4 = sum_life4 / life4.length;

  var freedom4 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_freedom[i]);
    freedom4[i] = datax[i]; 
  }
  let sum_freedom4 = freedom4.reduce((previous, current) => current += previous);
  let avg_freedom4 = sum_freedom4 / freedom4.length;

  var generosity4 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_generosity[i]);
    generosity4[i] = datax[i];   
  }
  let sum_generosity4 = generosity4.reduce((previous, current) => current += previous);
  let avg_generosity4 = sum_generosity4 / generosity4.length;

  var corruption4 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_corruption[i]);
    corruption4[i] = datax[i];   
  }
  let sum_corruption4 = corruption4.reduce((previous, current) => current += previous);
  let avg_corruption4 = sum_corruption4 / corruption4.length;

  var support4 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_family[i]);
    support4[i] = datax[i];   
  }
  let sum_support4 = support4.reduce((previous, current) => current += previous);
  let avg_support4 = sum_support4 / support4.length;

  var score4 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_score[i]);
    score4[i] = datax[i];   
  }
  let sum_score4 = score4.reduce((previous, current) => current += previous);
  let avg_score4 = sum_score4 / score4.length;


  //convert rank5 string arrays to numeric arrays, then calculate average
  x_country = Result5.map(d => d[0]);
  x_score = Result5.map(d => d[2]);  
  x_gdp = Result5.map(d => d[3]);
  x_family = Result5.map(d => d[4]);
  x_life = Result5.map(d => d[5]);
  x_freedom = Result5.map(d => d[6]);
  x_generosity = Result5.map(d => d[7]);
  x_corruption = Result5.map(d => d[8]);

  var gdp5 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_gdp[i]);
    gdp5[i] = datax[i];   
  }
  let sum_gdp5= gdp5.reduce((previous, current) => current += previous);
  let avg_gdp5 = sum_gdp5 / gdp5.length;

  var life5 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_life[i]);
    life5[i] = datax[i];   
  }
  let sum_life5 = life5.reduce((previous, current) => current += previous);
  let avg_life5 = sum_life5 / life5.length;

  var freedom5 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_freedom[i]);
    freedom5[i] = datax[i]; 
  }
  let sum_freedom5 = freedom5.reduce((previous, current) => current += previous);
  let avg_freedom5 = sum_freedom5 / freedom5.length;

  var generosity5 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_generosity[i]);
    generosity5[i] = datax[i];   
  }
  let sum_generosity5 = generosity5.reduce((previous, current) => current += previous);
  let avg_generosity5 = sum_generosity5 / generosity5.length;

  var corruption5 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_corruption[i]);
    corruption5[i] = datax[i];   
  }
  let sum_corruption5 = corruption5.reduce((previous, current) => current += previous);
  let avg_corruption5 = sum_corruption5 / corruption5.length;

  var support5 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_family[i]);
    support5[i] = datax[i];   
  }
  let sum_support5 = support5.reduce((previous, current) => current += previous);
  let avg_support5 = sum_support5 / support5.length;

  var score5 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_score[i]);
    score5[i] = datax[i];   
  }
  let sum_score5 = score5.reduce((previous, current) => current += previous);
  let avg_score5 = sum_score5 / score5.length;


  //convert rank6 string arrays to numeric arrays, then calculate average
  x_country = Result6.map(d => d[0]);
  x_score = Result6.map(d => d[2]);  
  x_gdp = Result6.map(d => d[3]);
  x_life = Result6.map(d => d[5]);
  x_freedom = Result6.map(d => d[6]);
  x_generosity = Result6.map(d => d[7]);
  x_corruption = Result6.map(d => d[8]);
  x_social = Result6.map(d => d[9]);

  var gdp6 = [];
  var datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_gdp[i]);
    gdp6[i] = datax[i];   
  }
  let sum_gdp6 = gdp6.reduce((previous, current) => current += previous);
  let avg_gdp6 = sum_gdp6 / gdp6.length;

  var life6 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_life[i]);
    life6[i] = datax[i];   
  }
  let sum_life6 = life6.reduce((previous, current) => current += previous);
  let avg_life6 = sum_life6 / life6.length;

  var freedom6 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_freedom[i]);
    freedom6[i] = datax[i];   
  }
  let sum_freedom6 = freedom6.reduce((previous, current) => current += previous);
  let avg_freedom6 = sum_freedom6/ freedom6.length;

  var generosity6 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_generosity[i]);
    generosity6[i] = datax[i];   
  }
  let sum_generosity6 = generosity6.reduce((previous, current) => current += previous);
  let avg_generosity6 = sum_generosity6 / generosity6.length;

  var corruption6 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_corruption[i]);
    corruption6[i] = datax[i];   
  }
  let sum_corruption6 = corruption6.reduce((previous, current) => current += previous);
  let avg_corruption6 = sum_corruption6 / corruption6.length;

  var support6 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_social[i]);
    support6[i] = datax[i];   
  }
  let sum_support6 = support6.reduce((previous, current) => current += previous);
  let avg_support6 = sum_support6 / support6.length;

  var score6 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_score[i]);
    score6[i] = datax[i];   
  }
  let sum_score6 = score6.reduce((previous, current) => current += previous);
  let avg_score6 = sum_score6/ score6.length;


  //convert rank7 string arrays to numeric arrays, then calculate average
  x_country = Result7.map(d => d[0]);
  x_score = Result7.map(d => d[2]);  
  x_gdp = Result7.map(d => d[3]);
  x_life = Result7.map(d => d[5]);
  x_freedom = Result7.map(d => d[6]);
  x_generosity = Result7.map(d => d[7]);
  x_corruption = Result7.map(d => d[8]);
  x_social = Result7.map(d => d[9]);
  
  var gdp7 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_gdp[i]);
    gdp7[i] = datax[i];   
  }
  
  let sum_gdp7 = gdp7.reduce((previous, current) => current += previous);
  let avg_gdp7 = sum_gdp7 / gdp7.length;

  var life7 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_life[i]);
    life7[i] = datax[i];   
  }
  let sum_life7 = life7.reduce((previous, current) => current += previous);
  let avg_life7 = sum_life7 / life7.length;

  var freedom7 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_freedom[i]);
    freedom7[i] = datax[i]; 
  }
  let sum_freedom7 = freedom7.reduce((previous, current) => current += previous);
  let avg_freedom7 = sum_freedom7 / freedom7.length;

  var generosity7 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_generosity[i]);
    generosity7[i] = datax[i];   
  }
  let sum_generosity7 = generosity7.reduce((previous, current) => current += previous);
  let avg_generosity7 = sum_generosity7 / generosity7.length;

  var corruption7 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_corruption[i]);
    corruption7[i] = datax[i];   
  }
  let sum_corruption7 = corruption7.reduce((previous, current) => current += previous);
  let avg_corruption7 = sum_corruption7 / corruption7.length;

  var support7 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_social[i]);
    support7[i] = datax[i];   
  }
  let sum_support7 = support7.reduce((previous, current) => current += previous);
  let avg_support7 = sum_support7 / support7.length;

  var score7 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_score[i]);
    score7[i] = datax[i];   
  }
  let sum_score7 = score7.reduce((previous, current) => current += previous);
  let avg_score7 = sum_score7 / score7.length;

  
  //convert rank8 string arrays to numeric arrays, then calculate average
  x_country = Result8.map(d => d[0]);
  x_score = Result8.map(d => d[2]);  
  x_gdp = Result8.map(d => d[3]);
  x_family = Result8.map(d => d[4]);
  x_life = Result8.map(d => d[5]);
  x_freedom = Result8.map(d => d[6]);
  x_generosity = Result8.map(d => d[7]);
  x_corruption = Result8.map(d => d[8]);
  

  var gdp8 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_gdp[i]);
    gdp8[i] = datax[i];   
  }
  let sum_gdp8 = gdp8.reduce((previous, current) => current += previous);
  let avg_gdp8 = sum_gdp8 / gdp8.length;

  var life8 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_life[i]);
    life8[i] = datax[i];   
  }
  let sum_life8 = life8.reduce((previous, current) => current += previous);
  let avg_life8 = sum_life8 / life8.length;

  var freedom8 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_freedom[i]);
    freedom8[i] = datax[i]; 
  }
  let sum_freedom8 = freedom8.reduce((previous, current) => current += previous);
  let avg_freedom8 = sum_freedom8 / freedom8.length;

  var generosity8 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_generosity[i]);
    generosity8[i] = datax[i];   
  }
  let sum_generosity8 = generosity8.reduce((previous, current) => current += previous);
  let avg_generosity8 = sum_generosity8 / generosity8.length;

  var corruption8 = []
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_corruption[i]);
    corruption8[i] = datax[i];   
  }
  let sum_corruption8 = corruption8.reduce((previous, current) => current += previous);
  let avg_corruption8 = sum_corruption8 / corruption8.length;

  var support8 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_family[i]);
    support8[i] = datax[i];   
  }
  let sum_support8 = support8.reduce((previous, current) => current += previous);
  let avg_support8 = sum_support8 / support8.length;

  var score8 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_score[i]);
    score8[i] = datax[i];   
  }
  let sum_score8 = score8.reduce((previous, current) => current += previous);
  let avg_score8 = sum_score8 / score8.length;


  //convert rank9 string arrays to numeric arrays, then calculate average
  x_country = Result9.map(d => d[0]);
  x_score = Result9.map(d => d[2]);  
  x_gdp = Result9.map(d => d[3]);
  x_family = Result9.map(d => d[4]);
  x_life = Result9.map(d => d[5]);
  x_freedom = Result9.map(d => d[6]);
  x_generosity = Result9.map(d => d[7]);
  x_corruption = Result9.map(d => d[8]);

  var gdp9 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_gdp[i]);
    gdp9[i] = datax[i];   
  }
  let sum_gdp9 = gdp9.reduce((previous, current) => current += previous);
  let avg_gdp9 = sum_gdp9 / gdp9.length;

  var life9 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_life[i]);
    life9[i] = datax[i];   
  }
  let sum_life9 = life9.reduce((previous, current) => current += previous);
  let avg_life9 = sum_life9 / life9.length;

  var freedom9 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_freedom[i]);
    freedom9[i] = datax[i]; 
  }
  let sum_freedom9 = freedom9.reduce((previous, current) => current += previous);
  let avg_freedom9 = sum_freedom9 / freedom9.length;

  var generosity9 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_generosity[i]);
    generosity9[i] = datax[i];   
  }
  let sum_generosity9 = generosity9.reduce((previous, current) => current += previous);
  let avg_generosity9 = sum_generosity9 / generosity9.length;

  var corruption9 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_corruption[i]);
    corruption9[i] = datax[i];   
  }
  let sum_corruption9 = corruption9.reduce((previous, current) => current += previous);
  let avg_corruption9 = sum_corruption9 / corruption9.length;

  var support9 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_family[i]);
    support9[i] = datax[i];   
  }
  let sum_support9 = support9.reduce((previous, current) => current += previous);
  let avg_support9 = sum_support9 / support9.length;

  var score9 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_score[i]);
    score9[i] = datax[i];   
  }
  let sum_score9 = score9.reduce((previous, current) => current += previous);
  let avg_score9 = sum_score9 / score9.length;


  //convert rank10 string arrays to numeric arrays, then calculate average
  x_country = Result10.map(d => d[0]);
  x_score = Result10.map(d => d[2]);  
  x_gdp = Result10.map(d => d[3]);
  x_family = Result10.map(d => d[4]);
  x_life = Result10.map(d => d[5]);
  x_freedom = Result10.map(d => d[6]);
  x_generosity = Result10.map(d => d[7]);
  x_corruption = Result10.map(d => d[8]);

  var gdp10 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_gdp[i]);
    gdp10[i] = datax[i];   
  }
  let sum_gdp10= gdp10.reduce((previous, current) => current += previous);
  let avg_gdp10 = sum_gdp10 / gdp10.length;

  var life10 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_life[i]);
    life10[i] = datax[i];   
  }
  let sum_life10 = life10.reduce((previous, current) => current += previous);
  let avg_life10 = sum_life10 / life10.length;

  var freedom10 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_freedom[i]);
    freedom10[i] = datax[i]; 
  }
  let sum_freedom10 = freedom10.reduce((previous, current) => current += previous);
  let avg_freedom10 = sum_freedom10 / freedom10.length;

  var generosity10 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_generosity[i]);
    generosity10[i] = datax[i];   
  }
  let sum_generosity10 = generosity10.reduce((previous, current) => current += previous);
  let avg_generosity10 = sum_generosity10 / generosity10.length;

  var corruption10= [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_corruption[i]);
    corruption10[i] = datax[i];   
  }
  let sum_corruption10 = corruption10.reduce((previous, current) => current += previous);
  let avg_corruption10 = sum_corruption10 / corruption10.length;

  var support10 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_family[i]);
    support10[i] = datax[i];   
  }
  let sum_support10 = support10.reduce((previous, current) => current += previous);
  let avg_support10 = sum_support10 / support10.length;

  var score10 = [];
  datax = [];
  for (var i = 0; i < 5; i++) {
    datax[i] = parseFloat(x_score[i]);
    score10[i] = datax[i];   
  }
  let sum_score10 = score10.reduce((previous, current) => current += previous);
  let avg_score10 = sum_score10 / score10.length;


  // move varables to new arrays
  
  gdpArr = [avg_gdp1, avg_gdp2, avg_gdp3, avg_gdp4, avg_gdp5, avg_gdp6 , avg_gdp7, 
            avg_gdp8, avg_gdp9, avg_gdp10];
  lifeArr = [avg_life1, avg_life2, avg_life3, avg_life4, avg_life5, avg_life6, avg_life7, 
            avg_life8, avg_life9, avg_life10];
  freeArr = [avg_freedom1, avg_freedom2, avg_freedom3, avg_freedom4, avg_freedom5, avg_freedom6, 
            avg_freedom7, avg_freedom8, avg_freedom9, avg_freedom10];
  heartArr = [avg_generosity1, avg_generosity2, avg_generosity3, avg_generosity4, avg_generosity5, avg_generosity6, 
            avg_generosity7, avg_generosity8, avg_generosity9, avg_generosity10];
  corrArr = [avg_corruption1, avg_corruption2, avg_corruption3, avg_generosity4, avg_generosity5, avg_generosity6, 
            avg_corruption7, avg_corruption8, avg_corruption9, avg_corruption10];
  supportArr = [avg_support1, avg_support2, avg_support3, avg_support4, avg_support5, avg_support6, 
            avg_support7, avg_support8, avg_support9, avg_support10];
  // console.log("last look: " ,heartArr)
 
};



//=================================
// Plot user select country charts 
//=================================

//plot rank bar

function plotctry(myData) {
  //#1
  var ctry = {
    x: ctryData.map(a => a.year),
    y: ctryData.map(a => a.happiness_rank),
    type: 'bar',
    marker: {
      color: 'rgba(238, 229, 151, 0.952)'
    },
    text: ctryData.map(a => a.happiness_rank).map(String),
    textposition: 'auto',
    hovertemplate: []
  };

  var datax= [ctry];

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
    height: 400, 
    // width: 700,
    plot_bgcolor: "rgb(233, 243, 248)",
    paper_bgcolor: "rgb(233, 243, 248)",
  };

  config = {responsive: true}

  Plotly.newPlot('myRank', datax, layout, config);



  //plot factor detail bar

  var gdp = {
    x: ctryData.map(a => a.gdp_per_capita),
    y: ctryData.map(a => a.year),
    name: 'GDP',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: .5
    },
    type: 'bar'
  };

  var support = {
    x: ctryData.map(a => a.social_support),
    y: ctryData.map(a => a.year),
    name: 'Social Support',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: 2
    },
    type: 'bar'
  };

  var life = {
    x: ctryData.map(a => a.life_expectancy),
    y: ctryData.map(a => a.year),
    name: 'Life Expectancy',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: 2
    },
    type: 'bar'
  };

  var free = {
    x: ctryData.map(a => a.freedom),
    y: ctryData.map(a => a.year),
    name: 'Freedom',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: 2
    },
    type: 'bar'
  };

  var heart= {
    x: ctryData.map(a => a.generosity),
    y: ctryData.map(a => a.year),
    name: 'Generosity',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: 2
    },
    type: 'bar'
  };

  var corruption = {
   x: ctryData.map(a => a.government_corr),
   y: ctryData.map(a => a.year),
    name: 'Government Corruption',
    orientation: 'h',
    marker: {
      color: 'Portland',
      // width: 2
    },
    type: 'bar'
  };

  var dataxx = [gdp, support, life, corruption, free, heart];
  
  var layout = {
    title: {
      // text: '2019 Top Ten Explained by Factors',
      text: 'Factor Overview Past 5 Years',
      font: {
        family: 'Lucida Sans Unicode',
        size: 18
        }, 
      },  
    barmode: 'stack',
    margin: {
      // l: 50,
      r: 40,
    //   // t: 35,
    //   // b: 20,
      // pad: 10
    },
    height: 400,
    // xaxis: {
    //   range: [0, 5],
    // },
    yaxis: {autorange:'reversed',
    title: 'Year',
    tickmode:'linear'
    },
    // font: {size:18
    // },
    options: {
      responsive: true,
      maintainAspectRatio: false
    },
    plot_bgcolor: "rgb(233, 243, 248)",
    paper_bgcolor: "rgb(233, 243, 248)",
    // showlegend: false,
    legend: {"orientation": "h"}
  };

  config = {responsive: true}
  
  Plotly.newPlot('myRank2', dataxx, layout, config);
};





//====================
// Add Event Listners
//=====================
// d3.select("#submit").on("click", handleSubmit);
// document.getElementById("1").onclick = function() {about()};
// document.getElementById("2").onclick = function() {detail()};

// function top10() {
//Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("body").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
// function updatePlotly() {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.select("#selView");
//   // Assign the value of the dropdown menu option to a variable
//   var view = dropdownMenu.node().value;

//   // var chart = d3.selectAll("#topten").node();

//   switch(view) {
//     case "Current10":
//       plotcurr(currTen)
//       break;

//     case "Past10":
//       plotpast(pastTen)
//       break;

//     default:
//       // call funcrion to plot top 10 data
//       plotdata(current)
    
//       //Call function to plot Top 10 Over 5 Years (AT A GLANCE)
//       plotcurr(currTen)

//       //Call function to plot Top default factor data 
//       plotfact(currFac1)
//       break;
//   }
// // };


// function factors() {
//Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selView");
  var dropdownMenu2 = d3.select("#selData");
  var dropdownMenu3 = d3.select("#selCtry");
  
  // Assign the value of the dropdown menu option to a variable
  var view = dropdownMenu.node().value;
  var data = dropdownMenu2.node().value;
  var myCtry = dropdownMenu3.node().value;

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

      //Call function to plot Top default factor data 
      plotfact(currFac1)
      break;
  }

  switch(data) {
    case "current": 
      plotfact(currFac1)
      break;
      
    case "years": 
     plotfact2(allFac1)
      break;

    case "ranks": 
      plotten(currFac2)
      break;  

    default:
      // call function to plot top 10 data
      plotdata(current)
    
      //Call function to plot Top 10 Over 5 Years (AT A GLANCE)
      plotcurr(currTen)

      //Call function to plot Top default factor data 
      plotfact(currFac1)
          break;
  }


  d3.csv("../whd-2015-19.csv").then(function(data) {
    ctryData = data.filter( el => { if (myCtry.includes(el.country)) return el; })
    console.log("selected country: ", ctryData)
    if (ctryData.length === 0) {
        console.log("warning:  selected country not found")
        plotdata(current) 
        plotcurr(currTen) 
        plotfact(currFac1)
      }  else { 
        plotctry(myData)
      }
  });

};
