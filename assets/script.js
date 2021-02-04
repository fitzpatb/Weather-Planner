//var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=9057e02af26cff387f193be4d1eee3ae";
var cityNames = document.querySelector("#city-names");
var cityObject = JSON.parse(localStorage.getItem('city'))
if (!cityObject) {
  place.textContent = 'Choose a City to see weather';
} else {
  place.textContent = cityObject.place;
}
var getCityCord = function (event) {
  var cityLat = event.target.getAttribute('data-lat');
  var cityLon = event.target.getAttribute('data-lon')
  if (cityLat && cityLon) {
    getCityTemp(cityLat, cityLon);
    getUv(cityLat, cityLon);
  } else {
    alert("error cant find lon and lat");
  }
};

var getCityTemp = function (cityLat, cityLon) {
  var api = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=9057e02af26cff387f193be4d1eee3ae";

  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      console.log(data.daily[0].temp.day)
      var city ={place: data.name, temp: data.daily[0].temp.day, humidity: data.daily[0].humidity, wind: data.daily.wind_speed};
      console.log(city);
      cityString = JSON.stringify(city);
      localStorage.setItem('city', cityString);
      var cityObject = JSON.parse(localStorage.getItem('city'))
      place.textContent = cityObject.place;

    })
}
var getCityName = function (event) {
  var cityId = event.target.getAttribute('data-id');

}

var getUv = function (cityLat, cityLon) {
  var apiUv = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=9057e02af26cff387f193be4d1eee3ae"

  fetch(apiUv)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.value);
    })
}


cityNames.addEventListener("click", getCityCord);
cityNames.addEventListener("click", getCityName);



