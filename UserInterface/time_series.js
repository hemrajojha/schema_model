$(document).ready(function() {
show();
});

const apiUrl = "https://ceclnx01.csi.miamioh.edu/~ojhah/cse451-ojhah-web/schema_model/UserInterface/canvasRestServer.php/api/v1/";

function show_time_series(){
function zip() {
    var args = [].slice.call(arguments);
    var longest = args.reduce(function(a,b){
        return a.length>b.length ? a : b
    }, []);

    return longest.map(function(_,i){
        return args.map(function(array){return array[i]})
    });
}
    console.log( "Document loaded." );
	
	$('#mean').text('999');
	$('#variance').text('999');

	getAll

	var data = [183.1, 183.9, 163.1, 179.5, 181.4,
				173.4, 167.6, 177.4, 171.7, 170.1,
				163.7, 151.9, 145.4, 145.0, 138.9];
	var time = [1917, 1918, 1919, 1920, 1921,
				1922, 1923, 1924, 1925, 1926,
				1927, 1928, 1929, 1930, 1931];
	var ts = tstModule.timeseries.Timeseries(data, time);
	var ts_plot = ts.toPlot();
	var tslog_plot = ts.log().toPlot();
	
	var lsq = tstModule.statistics.least_squares_fit(time, data);
	console.log(lsq);
	var lsq_line = [];
	lsq_line.push([1917, 1917*lsq[1] + lsq[0]]);
	lsq_line.push([1931, 1931*lsq[1] + lsq[0]]);
	console.log(lsq_line);
	
	var plot_data = zip(time, data);
	
	var diff_data = diff(data);
	var plot_diff_data = zip(time, diff_data);
	
	var sma_data = tstModule.filtering.simple_moving_average(data, 1);
	var plot_sma_data = zip(time, sma_data);

	var mean = tstModule.statistics.avg(data);
	var v = tstModule.statistics.variance(data);
	var skew = tstModule.statistics.skewness(data);

	$('#mean').text("mean= " + mean);
	$('#variance').text("variance= " + v);
	$('#skew').text("skew= " + skew);

	$('#title').text("Births per 10,00 women");
	$.plot($("#placeholder"), [ts_plot], {});
	
	$('#title2').text("First differences");
	$.plot($("#placeholder2"), [plot_diff_data], {});
	
	$('#btnDiff').click(function(){
		$('#title2').text("First differences");
		$.plot($("#placeholder2"), [plot_diff_data], {});
	});
	
	$('#btnSma').click(function(){
		$('#title2').text("Simple moving average");
		$.plot($("#placeholder2"), [plot_sma_data], {});
	});
	
	$('#btnLine').click(function(){
		$('#title2').text("Line fit");
		$.plot($("#placeholder2"), [lsq_line], {});
	});
	
	$('#btnLog').click(function(){
		$('#title2').text("Log");
		$.plot($("#placeholder2"), [tslog_plot], {});
	});
}
