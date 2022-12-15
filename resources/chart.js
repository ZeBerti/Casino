
function createChart (allValues) {
    let xValues = [];
    let yValues = allValues;

    for(let i = 0; i<allValues.length; i++) {
        xValues.push(i+1);
    }

    new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
        scales: {
          yAxes: [{ticks: {min: (Math.min(... yValues)) - 1, max: (Math.max(... yValues) + 1)}}],
        }
      }
    });
}

