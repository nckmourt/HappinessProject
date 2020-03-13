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

d3.csv("/static/data/whd-2015-19.csv", function(data) {
  console.log(data[0]);
});

d3.csv("/static/data/whd-2015-19.csv", function(data) {
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


});

//=================================
// Plot user select country charts 
//=================================

//plot rank line graph

function plotctry(myData) {
  //#1
  var ctry = {
    x: ctryData.map(a => a.year),
    y: ctryData.map(a => a.happiness_rank),
    type: 'scatter', //'bar',
    // marker: {
    //   color: 'rgba(238, 229, 151, 0.952)'
    // },
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
      autorange:'reversed'
    },
    xaxis: {
      title: 'Year',
      // autorange: 'reversed',
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
    xaxis: {
      range: [0, 5],
    },
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
    legend: {"orientation": "h",
          // autorange:'reversed'
        }
  };

  config = {responsive: true}
  
  Plotly.newPlot('myRank2', dataxx, layout, config);
};



//====================
// Add Event Listners
//=====================
//Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu3 = d3.select("#selCtry");
  
  // Assign the value of the dropdown menu option to a variable
  var myCtry = dropdownMenu3.node().value;

  var chart = d3.selectAll("#topten").node();

  d3.csv("/static/data/whd-2015-19.csv").then(function(data) { 
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
