d3.csv("https://raw.githubusercontent.com/nckmourt/HappinessProject/master/Heroku%20App/not_sad/static/data/whd-2015-19.csv"), function(data) {
  var lookup = {};
  function getData(year, continent) {
    var byYear, trace;
    if (!(byYear = lookup[year])) {;
      byYear = lookup[year] = {};
    }
    if (!(trace = byYear[continent])) {
      trace = byYear[continent] = {
        x: [],
        y: [],
        s: [],
        c: [],
        id: [],
        text: [],
        marker: {size: []},
        hovertemplate:
        "<b>%{text}</b><br><br>" +
        "%{yaxis.title.text}: %{c:$.0f}<br>" +
        "%{xaxis.title.text}: %{x:.0} out of 10<br>" +
        "Population (in thousands): %{marker.size:,.0f}<br>" +
        "Life expectancy: %{s:.0}<br>" +
        "<extra></extra>"
      };
    }
    return trace;
  }

  for (var i = 0; i < data.length; i++) {
    var datum = data[i];
    var trace = getData(datum.year, datum.continent);
    trace.text.push(datum.country);
    trace.id.push(datum.country);
    trace.x.push(datum.happiness_score);
    trace.y.push(datum.gdp_per_capita);
    trace.s.push(datum.life_expectancy);
    trace.c.push(datum.gdp_usd);
    trace.marker.size.push(datum.population);
  }

  var years = Object.keys(lookup);
  var firstYear = lookup[years[0]];
  var continents = Object.keys(firstYear);

  var traces = [];
  for (i = 0; i < continents.length; i++) {
    var data = firstYear[continents[i]];
    traces.push({
      name: continents[i],
      x: data.x.slice(),
      y: data.y.slice(),
      s: data.s.slice(),
      c: data.c.slice(),
      id: data.id.slice(),
      text: data.text.slice(),
      mode: 'markers',
      marker: {
        size: data.marker.size.slice(),
        sizemode: 'area',
        sizeref: 150,
      }
    });
  }

  var frames = [];
  for (i = 0; i < years.length; i++) {
    frames.push({
      name: years[i],
      data: continents.map(function (continent) {
        return getData(years[i], continent);
      })
    })
  }

  var sliderSteps = [];
  for (i = 0; i < years.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: years[i],
      args: [[years[i]], {
        mode: 'immediate',
        transition: {duration: 300},
        frame: {duration: 300, redraw: false},
      }]
    });
  }

  var layout = {
    xaxis: {
      title: 'Happiness Score',
      range: [2, 8]
    },
    yaxis: {
      title: 'GDP per capita',
      range: [0, 2]
    },
    hovermode: 'closest',
    updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: {t: 87, r: 10},
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: {duration: 3500},
          frame: {duration: 3000, redraw: false}
        }],
        label: 'Play'
      }, {
        method: 'animate',
        args: [[null], {
          mode: 'immediate',
          transition: {duration: 0},
          frame: {duration: 0, redraw: false}
        }],
        label: 'Pause'
      }]
    }],
    sliders: [{
      pad: {l: 130, t: 55},
      currentvalue: {
        visible: true,
        prefix: 'Year: ',
        xanchor: 'right',
        font: {size: 20, color: '#666'}
      },
      steps: sliderSteps
    }]
  };

  Plotly.newPlot('myDiv', {
    data: traces,
    layout: layout,
    frames: frames,
    config: { responsive: true }
  });
});
