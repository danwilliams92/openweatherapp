$(document).ready(function(){
	// var city = $('#cityQuery').val();
	var apiKey = '5958a0c82ce1feb418bac86d825ef5f6';
	
	$("#getWeather").on("click", function(){
		
		$.ajax({
				type: 'GET',
				dataType: 'json',
				url: 'http://api.openweathermap.org/data/2.5/weather?q=' + $('#cityQuery').val() + '&units=metric' + '&appid=' + apiKey,
				success: function(data){
					$("#description").html("The weather in " + $('#cityQuery').val() + " is: " + data["weather"][0]["description"]);
					$("#temperature").html("The temperature is: " + data.main.temp + " &#8451;.");
					$("#humidity").html("The humidity is: " + data.main.humidity + " %");
					
				}
	
		});
	});
	
	// Use geolocation to get browser's local weather
	
	$("#getUserWeather").on("click", function(){
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(userCityWeather);
			
			function userCityWeather(position){
			  var lat = position.coords.latitude;
			  var longit = position.coords.longitude;
			  var city_name;
			
				$.ajax({
						type: 'GET',
						dataType: 'json',
						url: ("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + longit + '&units=metric' + "&appid=" + apiKey),
						success: function(data){
							city_name = data["name"];
							$("#user-weather-description").html("The weather in " + city_name + " is: " + data["weather"][0]["description"]);
							$("#user-temperature").html("The temperature is: " + data.main.temp + " &#8451;.");
							$("#user-humidity").html("The humidity is: " + data.main.humidity + " %");
							
						}
				});
			}
		}
	});
	
	
});