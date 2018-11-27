$(document).ready(function(){
	$('#SubmitWeather').click(function(){
		var city = $('#city').val();
		var strCity = String(city);
		var htmlSyntax =  "<iframe width='600' height='500' id='gmap_canvas' src='https://maps.google.com/maps?q="+strCity+"&t=&z=13&ie=UTF8&iwloc=&output=embed' frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe><a href='https://www.embedgooglemap.net'>embedgooglemap.net</a>"
		if(city !=''){
			$.ajax({
				url : 'http://api.openweathermap.org/data/2.5/weather?q=' + city +"&units=metric"+"&APPID=c22e7a4f2648af26d5aabec57c46f30d",
				type : "GET",
				dataType:"jsonp",
				success:function(data){
					console.log(data);
					var widget = show(data);

					$("#show").html(widget);
					$('#gmap_canvas').html(htmlSyntax);
					$('#city').val('');
				}
			});
		}else{
			$("#error").html('Field cannot be empty');
		}
	});
});

function show(data){
	return "<h4 style='font-size:40px; font-weight:bold;'>Cuaca saat ini untuk Kota " + data.name+ " , " + data.sys.country + "</h4>" +
			"<h5><strong>Cuaca</strong>: " + data.weather[0].main + " </h5>" +
			"<h5><strong>Deskripsi</strong>: " + data.weather[0].description + "</h5>" +
			"<h5><strong>Suhu</strong>: " + data.main.temp +" ℃</h5>" +
			"<h5><strong>Tekanan Udara </strong>: " + data.main.pressure +" hPa</h5>" +
			"<h5><strong>Kelembapan</strong>: " + data.main.humidity +" % </h5>" +
			"<h5><strong>Suhu Minimal</strong>: " + data.main.temp_main +" ℃</h5>" +
			"<h5><strong>Suhu Maksimal</strong>: " + data.main.temp_max +" ℃</h5>" +
			"<h5><strong>Kecepatan Angin</strong>: " + data.wind.speed +" m/s</h5>" +
			"<h5><strong>Arah Angin</strong>: " + data.wind.deg +" </h5>";
}