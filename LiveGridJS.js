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
	
	var demand = [];
	var j=JSON.stringify;
		
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
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1
	var yyyy = today.getFullYear();

	if (dd<10) {
		dd = '0'+ dd
	}
	
	if (mm<10){
		mm = '0'+ mm
	}

	today = yyyy + '-' + mm + '-' + dd;
	
	$.ajax({
    url: 'https://api.bmreports.com/BMRS/ROLSYSDEM/v1?APIKey=66ky5jo5p5w0vbd&FromDateTime='+today+' 00:00:00&ToDateTime='+today+' 23:59:59&ServiceType=CSV',
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
	while (n < (data.length)-2) {
		var DailyDemand = (data[n].slice(1,3));
		
		var TimeString = String(data[n][1]).substring(8,12);
		
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

 function drawChart(dataarray) {
        var data = google.visualization.arrayToDataTable(dataarray);

        var options = {
          curveType: 'function',
          legend: { position: 'bottom' },
		  width: 575,
		  height: 400,
		  vAxis: {title: 'Wattage (MW)'},
		  legend: {position: 'right', alignment: 'center'},
		  chartArea: {width: '65%', height: '60%'},
		  hAxis: {slantedTextAngle: 90, title: 'Time (24Hr)'}
        };

        var chart = new google.visualization.LineChart(document.getElementById('Chart1'));

        chart.draw(data, options);
      }

function drawPieChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart1'));

        chart.draw(data, options);
      }
	