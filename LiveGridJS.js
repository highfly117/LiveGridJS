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
			console.log(fueltype)
			n++
		}
		
		$(SomeData).append("["+data[1][1]+"]");
		$(SomeData2).append(arr[0]);
		drawChart();

    }
});
}

function drawChart(){
	
	var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        [[data[1][1]]], parseFloat(arr2[0])],
        [arr[1], parseFloat(arr2[1])],
        [arr[2], parseFloat(arr2[2])],
		[arr[3], parseFloat(arr2[3])],
		[arr[4], parseFloat(arr2[4])],
		[arr[5], parseFloat(arr2[5])],
		[arr[6], parseFloat(arr2[6])]
        ]);

	var options = {
	width:700,
	height:240
};
	var chart = new google.visualization.Gauge(document.getElementById('SomeData'));
	chart.draw(data, options)
};