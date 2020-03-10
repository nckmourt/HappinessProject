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

var score = [];
var happiness_score;


//========================================================
//Call updateValue() when a change takes place to the DOM
//========================================================

d3.selectAll("body").on("change", updateValue);

// This function is called when a dropdown menu item is selected
function updateValue() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selCtry");
  
  // Assign the value of the dropdown menu option to a variable
  var myCtry = dropdownMenu.node().value;

  // Change input value to 0 or 1 based on country's happiness score

  d3.csv("/static/data/clean_2019.csv", function(data) { 
    ctryData = data.filter( el => { if (myCtry.includes(el.country)) return el; })
    console.log("selected country: ", ctryData)
    // console.log("ctry score = ", ctryData.map(x => x.happiness_score)
    if (ctryData.length === 0) {
        console.log("warning:  selected country not found")
      }  else { 
        // score = data.map(d => d.happiness_score);  
        score = ctryData.map(x => x.happiness_score)
        // score = Number(ctryData[2])
        if (Number(score) < 5) {
          happiness_score = '0'
        } else {
          happiness_score = '1'
        }
      }
      console.log("score = ", score);
      console.log("happiness score = ", happiness_score);

      console.log(dropdownMenu.node().value);

      var happiness_score_field = d3.select("#happiness_score");
  
      // Assign the value of the dropdown menu option to a variable
      happiness_score_field.node().value = happiness_score;
      console.log("grrr: " + happiness_score_field.node().value)
  });

};
