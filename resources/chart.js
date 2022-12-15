<!DOCTYPE html>
<html>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
<body>
<canvas id="myChart" style="width:100%;max-width:600px"></canvas>

<script>

chart([7,8,8,9,9,9,10,11,14,14,15]);

function chart (allValues) {
    let xValues = [];
    let yValues = allValues;

    for(let i = 0; i<allValues.length; i++) {
        xValues.push(i);
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

</script>

</body>
</html>