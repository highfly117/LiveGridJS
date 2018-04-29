n = 1;
arr = [];
arr2 = [];
arr3 = [];
var Hello = "hello world";

function test(X){
    document.getElementById(X).innerHTML = Hello;
}


function Getfueltype(){

j=JSON.stringify
		

	$.ajax({
    url: 'https://api.bmreports.com/BMRS/FUELINSTHHCUR/v1?APIKey=66ky5jo5p5w0vbd&ServiceType=CSV',
    async: false,
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
		
        //alert(data[1][2]);		
		while (n < (data.length)-2) {
			fueltype = j( data[n].slice(1,2));
			GigaWatt = j(parseFloat(data[n].slice(2,3)));
			//arr.push(fueltype);
			arr.push(fueltype);
			arr2.push(GigaWatt);
			
			n++
		}
		
		drawChart2(data);

    }
});
}

function GetDemand(){

	j=JSON.stringify
		
	$.ajax({
    url: 'https://api.bmreports.com/BMRS/ROLSYSDEM/v1?APIKey=66ky5jo5p5w0vbd&ServiceType=CSV',
    async: false,
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
		demand = data[data.length-2][2];
		
        		
		
		drawDemand(demand);

    }
});
}





function GetDailyDemand(){

	$.ajax({
    url: 'https://api.bmreports.com/BMRS/ROLSYSDEM/v1?APIKey=66ky5jo5p5w0vbd&FromDateTime=2018-04-27 00:00:00&ToDateTime=2018-04-27 23:59:59&ServiceType=CSV',
    async: false,
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
	
	n = 1
	Linearray = [];
	while (n < (data.length)-2) {
		DailyDemand = String((data[n].slice(1,2)));
		DailyDemand2 = (data[n].slice(2,3));
		Linearray.push(DailyDemand);
		Linearray.push(DailyDemand2)	
			
						
		n++
		}
	
	alert(Linearray);
	drawChart();
    }
});
}



function drawChart2(data){
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
  percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],
  staticLabels: {
	font: "10px sans-serif",  // Specifies font
	labels: [35*0.10, 35*0.20, 35*0.30,35*0.40,35*0.50,35*0.60, 35*0.70,35*0.80, 35*0.90, 35*1.00],  // Print labels at these values
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

i = 1;

while (i < 15){
	var target = document.getElementById('SomeData' + i); // your canvas element
	var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
	gauge.maxValue = 35; // set max gauge value
	gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
	gauge.animationSpeed = 32; // set animation speed (32 is default value)
	gauge.set(parseFloat(data[i][2])/1000); // set actual value
	$('#gValue'+ i).html(data[i][1] +"   "+ parseFloat(data[i][2])/1000 + " GW")
i++
};

}

function drawDemand(demand){
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
  percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],
  staticLabels: {
	font: "10px sans-serif",  // Specifies font
	labels: [70*0.10, 70*0.20, 70*0.30,70*0.40,70*0.50,70*0.60, 70*0.70,70*0.80, 70*0.90, 70*1.00],  // Print labels at these values
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
	gauge.maxValue = 70; // set max gauge value
	gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
	gauge.animationSpeed = 32; // set animation speed (32 is default value)
	gauge.set(demand / 1000); // set actual value
	$('#DemandVal').html(demand / 1000 + " GW")
	
}

 function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]
        ]);

        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('Chart1'));

        chart.draw(data, options);
      }


	