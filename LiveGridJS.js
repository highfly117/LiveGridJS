n = 1;
arr = [];
arr2 = [];
arr3 = [];
data = [];
var Hello = "hello world";

function test(X){
    document.getElementById(X).innerHTML = Hello;
}


function GetCSV(){

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
		
		//$(SomeData1).append(data[1][1]);
		//$(SomeData2).append(arr2[0]);
		drawChart2(data);

    }
});
}

function drawChart(){
	alert(x[1][1])
	var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        [x[1][1], parseFloat(x[1][2])],
        [x[2][1], parseFloat(x[2][2])],
        [x[3][1], parseFloat(x[3][2])],
		[x[4][1], parseFloat(x[4][2])],
		[x[5][1], parseFloat(x[5][2])],
		[x[6][1], parseFloat(x[6][2])],
		[x[7][1], parseFloat(x[7][2])]
        ]);

	var options = {
	width:1000,
	height:240
};
	var chart = new google.visualization.Gauge(document.getElementById('SomeData1'));
	chart.draw(data, options)
};

function drawChart2(data){
	var opts = {
  angle: 0.1, // The span of the gauge arc
  lineWidth: 0.3, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.6, // // Relative to gauge radius
    strokeWidth: 0.035, // The thickness
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
  labels: [35*0.25,35*0.50,35*0.75,35*1.00,],  // Print labels at these values
  color: "#000000",  // Optional: Label text color
  fractionDigits: 0  // Optional: Numerical precision. 0=round off.
},
};

i = 1;

while (i < 5){
	var target = document.getElementById('SomeData'+ i); // your canvas element
	var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
	gauge.maxValue = 35; // set max gauge value
	gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
	gauge.animationSpeed = 32; // set animation speed (32 is default value)
	gauge.set(parseFloat(data[i][2])/1000); // set actual value
i++
};
}
	