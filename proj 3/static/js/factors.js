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
  
  //Call funcrion ro plor HIs and LOWs
  plotten(currFac2)

})


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

