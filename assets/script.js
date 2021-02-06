//var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=9057e02af26cff387f193be4d1eee3ae";
var cityNames = document.querySelector("#city-names");
var placeEl = document.querySelector("#place");
var tempEl = document.querySelector("#temp");
var humidEl = document.querySelector("#humid");
var windEl = document.querySelector("#wind");
var uvEl = document.querySelector("#uv");


var cityObject = JSON.parse(localStorage.getItem('city'));
var nameObject = JSON.parse(localStorage.getItem('name'));
var indexObject = JSON.parse(localStorage.getItem('index'));
if (!cityObject) {
  placeEl.textContent = 'Choose a City to see weather';
} else {
  placeEl.textContent = nameObject.name;
  tempEl.textContent = "Temperature: " + cityObject.temp + "\u00B0F";
  humidEl.textContent = "Humidity: " + cityObject.humidity + "%";
  windEl.textContent = "Wind Speed: " + cityObject.wind + " MPH";
  uvEl.textContent = "UV Index: " + indexObject.uv;
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

var getCityName = function (event) {
  var cityId = event.target.getAttribute('data-id');
  if (cityId) {
    getName(cityId);
  } else {
    alert("error cant find id");
  }
}

var getCityTemp = function (cityLat, cityLon) {
  var api = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=9057e02af26cff387f193be4d1eee3ae";

  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      console.log(data.daily[0].temp.day)
      var city ={temp: data.daily[0].temp.day, humidity: data.daily[0].humidity, wind: data.daily[0].wind_speed};

      var cityString = JSON.stringify(city);
      localStorage.setItem('city', cityString);
      var cityObject = JSON.parse(localStorage.getItem('city'))
      console.log(cityObject);
      tempEl.textContent = "Temperature: " + cityObject.temp + "\u00B0F";
      humidEl.textContent = "Humidity: " + cityObject.humidity + "%";
      windEl.textContent = "Wind Speed: " + cityObject.wind + " MPH";
    })
}


var getName = function (cityId) {
  var apiName = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=9057e02af26cff387f193be4d1eee3ae"

  fetch(apiName)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.city.name);
      var name = {name: data.city.name};
      var nameString =JSON.stringify(name);
      localStorage.setItem('name', nameString);
      var nameObject = JSON.parse(localStorage.getItem('name'));
      placeEl.textContent = nameObject.name;
    })
}

var getUv = function (cityLat, cityLon) {
  var apiUv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=9057e02af26cff387f193be4d1eee3ae"

  fetch(apiUv)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.value);
      var index = {uv: data.value}
      var indexString = JSON.stringify(index);
      localStorage.setItem('index', indexString);
      var indexObject = JSON.parse(localStorage.getItem('index'));
      uvEl.textContent = "UV Index: " + indexObject.uv;

    })
}
cityNames.addEventListener("click", getCityCord);
cityNames.addEventListener("click", getCityName);


var searchBtnEl = $(".searchBtn");

var searchEl = $("#search");


searchBtnEl.on("click", function () {
  var query = searchEl.val();
  console.log(query);
  var apiSearch = "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&appid=9057e02af26cff387f193be4d1eee3ae";

  fetch(apiSearch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var cityLat = data.city.coord.lat;
      var cityLon = data.city.coord.lon;
      console.log(data.city.coord.lat);
      if (cityLat && cityLon) {
        getCityTemp(cityLat, cityLon);
        getUv(cityLat, cityLon);
      } else {
        alert("error cant find lon and lat");
      }
    })
});





