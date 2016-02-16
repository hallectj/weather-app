/*if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(pos) {
    loadWeather(pos.coords.latitude + ',' + pos.coords.longitude, "");
  });
} else {
  loadWeather("New York City", "");
}*/

$(document).ready(function() {
  //testing various locations
  loadWeather("New York City", "");
  
    $.ajax({
      //url: 'http://freegeoip.net/json/?callback=?',
      url: '//freegeoip.net/json/?callback=?',
      type: 'POST',
      dataType: 'jsonp',
      
      success: function(response){
        //console.log(JSON.stringify(response, null, 4));
        var city = response.city;
        var state = response.region_code;
        loadWeather(city, "");
      },

      error: function(err){
        console.log(err);
      }
    });
});

function loadWeather(location, woeid) {
  var forecast_boxes = $('.forecast-boxes');
  $.simpleWeather({
    //location based on longitude latitude, but could just as well be city
    location: location,
    woeid: woeid,
    unit: "f",
    success: function(weather) {
      today = weather.forecast[0].day;
      theDate = weather.forecast[0].date;
      city = weather.city;
      region = weather.region;
      weatherCode = '<i class="icon-' + weather.code + '">'
      temperature = weather.temp;
      low = weather.low;
      high = weather.high;
      desc = weather.text;

      //assign to the elements
      $('.day').text(today);
      $('.date').text(theDate);

      $('.temperature').find('.city').text(city + ", " + region);
      $('.temperature').find('.deg').html(temperature + "&deg;");
      $('.weather-symbol-container p:first-child').html(weatherCode);
      $('.low').find('p').eq(1).html(low + "&deg;");
      $('.high').find('p').eq(1).html(high + "&deg;");
      $('.likely-weather').text(desc);

      for (var i = 0; i < forecast_boxes.length; i++) {
        $(forecast_boxes).eq(i).find('p').first().html(weather.forecast[i].day);
        $(forecast_boxes).eq(i).find('p').last().html(weather.forecast[i].high);
      }
    },

    error: function(err) {
      //if all else fails, of all the test I ran this never came up unless
      //I purposely put failure in.
      $('.error').text("error in obtaining the weather");
    }
  });
}
