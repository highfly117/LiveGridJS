


var n = 1;
var arr = [];
var arr2 = [];
var arr3 = [];
var Hello = "hello world";

function test(X) {
  document.getElementById(X).innerHTML = Hello;
}


function Getfueltype() {

  j = JSON.stringify;

  var data = [];

  $.ajax({
    url: 'https://api.bmreports.com/BMRS/FUELINSTHHCUR/v1?APIKey=66ky5jo5p5w0vbd&ServiceType=CSV',
    async: false,
    success: function (csvd) {
      data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
      



      function deleteRow(arr, row, row2, row3) {
        var sorted = (arr.sort());
        sorted = sorted.slice(0);
        sorted.splice(row, 1);

        sorted = sorted.slice(0);
        sorted.splice(row2 - 1, 1);

        sorted = sorted.slice(0);
        sorted.splice(row3 - 2, 1);

        sorted.sort(function (a, b) {
          return (2 in b ? b[2] : Infinity) - (2 in a ? a[2] : Infinity);
        });

        return sorted;
        alert(sorted);
      }


      console.log(deleteRow(data, 0, 15, 16));
      drawChart2(deleteRow(data, 0, 15, 16));
	
      //alert(sorted);
    }

  });
}

function GetDemand() {

  var data = [];
  var demand = [];
  var j = JSON.stringify;

  $.ajax({
    url: 'https://api.bmreports.com/BMRS/ROLSYSDEM/v1?APIKey=66ky5jo5p5w0vbd&ServiceType=CSV',
    async: false,
    success: function (csvd) {
      data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
      demand = data[data.length - 2][2];



      drawDemand(demand);

    }
  });
}





function GetDailyDemand() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;

  $.ajax({
    url: 'https://api.bmreports.com/BMRS/ROLSYSDEM/v1?APIKey=66ky5jo5p5w0vbd&FromDateTime=' + today + ' 00:00:00&ToDateTime=' + today + ' 23:59:59&ServiceType=CSV',
    async: false,
    success: function (csvd) {
      data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {

      var n = 1
      var Linearray = [];
      var textoutput = '[';

      textoutput += '["Time","Demand (MW)"]';
      while (n < (data.length) - 2) {
        var DailyDemand = (data[n].slice(1, 3));

        var TimeString = String(data[n][1]).substring(8, 12);

        var formatTime = TimeString.replace(/\B(?=(\d{2})+(?!\d))/g, ":");;

        textoutput += ',["' + formatTime + '",' + data[n][2] + ']';

        n++
      }

      textoutput += ']';
      var dataarray = eval(textoutput);



      drawChart(dataarray);
    }
  });
}

function GetDemandPie() {

  j = JSON.stringify


  $.ajax({
    url: 'https://api.bmreports.com/BMRS/FUELINSTHHCUR/v1?APIKey=66ky5jo5p5w0vbd&ServiceType=CSV',
    async: false,
    success: function (csvd) {
      data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {

      var textoutput1 = '[';
      var textoutput2 = '[';
	
      //textoutput2 += '["Fuel Type","MW"]';
      var n = 1

      while (n < (data.length) - 2) {

        textoutput1 += data[n][2];
        textoutput2 += '"' + data[n][1] + '"';

        if (n < (data.length) - 2) {
          textoutput1 += ',';
          textoutput2 += ',';
        }
        n++
      }
      textoutput1 += ']'
      textoutput2 += ']'

      console.log(textoutput2)

      dataarray1 = eval(textoutput1);
      dataarray2 = eval(textoutput2);
      drawPieChart(dataarray1, dataarray2);

    }
  });
}

function drawChart2(data) {
  var opts = {
    angle: 0.1, // The span of the gauge arc
    lineWidth: 0.2, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.5,  // Relative to gauge radius
      strokeWidth: 0.02, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    staticLabels: {
      font: "10px sans-serif",  // Specifies font
      labels: [35 * 0.10, 35 * 0.20, 35 * 0.30, 35 * 0.40, 35 * 0.50, 35 * 0.60, 35 * 0.70, 35 * 0.80, 35 * 0.90, 35 * 1.00],  // Print labels at these values
      color: "#000000",  // Optional: Label text color
      fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },
    renderTicks: {
      divisions: 4,
      divWidth: 1.1,
      divLength: 1.5,
      divColor: "#333333",
      subDivisions: 3,
      subLength: 0.5,
      subWidth: 0.6,
      subColor: "#666666"
    }
  };

  i = 0;
  j = 1;

  while (i < 14) {
    var target = document.getElementById('SomeData' + j); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 35; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(parseFloat(data[i][2]) / 1000); // set actual value
    $('#gValue' + j).html("<h4 style='padding-bottom:5px; margin-bottom:0px;'>" + data[i][1] + "   " + parseFloat(data[i][2]) / 1000 + " GW" + "</h4>")


    i++
    j++

  };



  alert

}

function drawDemand(demand) {
  var opts = {
    angle: 0.1, // The span of the gauge arc
    lineWidth: 0.2, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.5,  // Relative to gauge radius
      strokeWidth: 0.02, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    staticLabels: {
      font: "10px sans-serif",  // Specifies font
      labels: [50 * 0.10, 50 * 0.20, 50 * 0.30, 50 * 0.40, 50 * 0.50, 50 * 0.60, 50 * 0.70, 50 * 0.80, 50 * 0.90, 50 * 1.00],  // Print labels at these values
      color: "#000000",  // Optional: Label text color
      fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },
    renderTicks: {
      divisions: 4,
      divWidth: 1.1,
      divLength: 1.5,
      divColor: "#333333",
      subDivisions: 3,
      subLength: 0.5,
      subWidth: 0.6,
      subColor: "#666666"
    }
  };

  var target = document.getElementById('Demand'); // your canvas element
  var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
  gauge.maxValue = 50; // set max gauge value
  gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = 32; // set animation speed (32 is default value)
  gauge.set(demand / 1000); // set actual value
  $('#DemandVal').html("<h4 style='padding-bottom:5px; margin-bottom:0px;'>" + demand / 1000 + " GW" + "</h4>")

}

function drawChart(dataarray) {
  var data = google.visualization.arrayToDataTable(dataarray);

  var options = {
    curveType: 'function',
    legend: { position: 'bottom' },
		  width: 570,
		  height: 400,
		  vAxis: { title: 'Wattage (MW)' },
		  legend: { position: 'right', alignment: 'center' },
		  chartArea: { width: '65%', height: '60%' },
		  hAxis: { slantedTextAngle: 90, title: 'Time (24Hr)' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('Chart1'));

  chart.draw(data, options);
}

function drawPieChart(dataarray1, dataarray2) {

  /*       var data = google.visualization.arrayToDataTable(dataarray2);

        var options = {
		  width: 570,
		  height: 400,
		  is3D: true,
		  slices: { 1: {offset:0.5},
					2: {offset:0.5},
					3: {offset:0.5},
					4: {offset:0.5},
					5: {offset:0.5},
					6: {offset:0.5},
					7: {offset:0.5},
					8: {offset:0.5},
					9: {offset:0.5}
		  },
		  legend: {position: 'labeled'},
		chartArea:{width: '75%', height: '75%'}
		 
        };

        var chart = new google.visualization.PieChart(document.getElementById('pieChart1'));

        chart.draw(data, options); */

  var ctx = document.getElementById('pieChart1');
  var myDoughnutChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: dataarray2,
      datasets: [{
        data: dataarray1,
        backgroundColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options:
    {
      animation:
      {
        duration: 7000,
        animateRotate: true

      }
    }


  });

}
      
	
