$(document).ready(function(){
	// var city = $('#cityQuery').val();
	var apiKey = '5958a0c82ce1feb418bac86d825ef5f6';
	
	$("#getWeather").on("click", function(){
		
		$.ajax({
				type: 'GET',
				dataType: 'json',
				url: 'http://api.openweathermap.org/data/2.5/weather?q=' + $('#cityQuery').val() + '&units=metric' + '&appid=' + apiKey,
				success: function(data){
				sunrise_time = data["sys"]["sunrise"];
				sunset_time = data["sys"]["sunset"];	
				
					$("#description").html("The weather in " + $('#cityQuery').val() + " is: " + "<br>" + "<span class='weather-info'>" + data["weather"][0]["description"] + "</span>");
					$("#temperature").html("The temperature is: " + "<br>" + "<span class='weather-info'>" + data.main.temp + " &#8451;" + "</span>");
					//$("#humidity").html("The humidity is: " + "<br>" + "<span class='weather-info'>" + data.main.humidity + " %" + "</span>" );
					
					var sec = sunrise_time;
					var date = new Date(sec * 1000);
					var timestr = date.toLocaleTimeString();
					
					$("#sunrise").html("Sunrise is at: " + "<br>" + "<span class='weather-info'>" + timestr + "</span>");
					
					var sec2 = sunset_time;
					var date2 = new Date(sec2 * 1000);
					var timestr2 = date2.toLocaleTimeString();
					
					$("#sunset").html("Sunset is at: " + "<br>" + "<span class='weather-info'>" + timestr2 + "</span>");

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
			  var sunrise_time;
			
				$.ajax({
						type: 'GET',
						dataType: 'json',
						url: ("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + longit + '&units=metric' + "&appid=" + apiKey),
						success: function(data){
							sunset_time = data["sys"]["sunset"];
							sunrise_time = data["sys"]["sunrise"];
							city_name = data["name"];
							$("#user-weather-description").html("The weather in " + city_name + " is: " + "<br>" +  "<span class='weather-info'>" + data["weather"][0]["description"] + "</span>");
							$("#user-temperature").html("The temperature is: " + "<br>" +  "<span class='weather-info'>" + data.main.temp + " &#8451;" + "</span>");
							
							//$("#user-humidity").html("The humidity is: " + "<br>" + "<span class='weather-info'>" + data.main.humidity + " %" + "</span>");
							
							// convert data timestamp to readable format
							var sec = sunrise_time;
							var date = new Date(sec * 1000);
							var timestr = date.toLocaleTimeString();
							$("#user-sunrise").html("Sunrise is at: " + "<br>" + "<span class='weather-info'>" + timestr + "</span>");
							
							var sec2 = sunset_time;
							var date2 = new Date(sec2 * 1000);
							var timestr2 = date2.toLocaleTimeString();
							
							$("#user-sunset").html("Sunset is at: " + "<br>" + "<span class='weather-info'>" + timestr2 + "</span>");
						}
				});
			}
		}
	});
	
	
});