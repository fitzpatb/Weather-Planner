//var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=9057e02af26cff387f193be4d1eee3ae";
var searches = [];

var imgDash = document.createElement('img');
var imgOne = document.createElement('img');
var imgTwo = document.createElement('img');
var imgThree = document.createElement('img');
var imgFour = document.createElement('img');
var imgFive = document.createElement('img');




if (searches.length === 0){
  var option = document.createElement("option");
  option.text = "no previous searches";
} else {
  for (var i = 0; i < searches.length; i++) {
    var option = document.createElement("option");
    option.value = searches[i];
    option.text = searches[i]
    searchHistEl.appendChild(option);
  }
}

var cityNames = document.querySelector("#city-names");
var placeEl = document.querySelector("#place");
var tempEl = document.querySelector("#temp");
var humidEl = document.querySelector("#humid");
var windEl = document.querySelector("#wind");
var uvEl = document.querySelector("#uv");
var dayOneEl = document.querySelector("#dayOne");
var dayTwoEl = document.querySelector("#dayTwo");
var dayThreeEl = document.querySelector("#dayThree");
var dayFourEl = document.querySelector("#dayFour");
var dayFiveEl = document.querySelector("#dayFive");
var oneTempEl = document.querySelector("#tempOne");
var twoTempEl = document.querySelector("#tempTwo");
var threeTempEl = document.querySelector("#tempThree");
var fourTempEl = document.querySelector("#tempFour");
var fiveTempEl = document.querySelector("#tempFive");
var oneHumidEl = document.querySelector("#humidOne");
var twoHumidEl = document.querySelector("#humidTwo");
var threeHumidEl = document.querySelector("#humidThree");
var fourHumidEl = document.querySelector("#humidFour");
var fiveHumidEl = document.querySelector("#humidFive");
var searchHistEl = document.querySelector("#searchHist")

var cityObject = JSON.parse(localStorage.getItem('city'));
var nameObject = JSON.parse(localStorage.getItem('name'));
var indexObject = JSON.parse(localStorage.getItem('index'));
var fiveTempObject = JSON.parse(localStorage.getItem('fiveTemp'));
var fiveHumidObject = JSON.parse(localStorage.getItem('fiveHumid'));
if (!cityObject) {
  placeEl.textContent = 'Choose a City to see weather';
} else {
  placeEl.textContent = nameObject.name + " " + moment().format("(MM/DD/YY)");
  tempEl.textContent = "Temperature: " + cityObject.temp + "\u00B0F";
  humidEl.textContent = "Humidity: " + cityObject.humidity + "%";
  windEl.textContent = "Wind Speed: " + cityObject.wind + " MPH";
  uvEl.textContent = "UV Index: " + indexObject.uv;
  dayOneEl.textContent = moment().add(1, "day").format("MM/DD/YY");
  dayTwoEl.textContent = moment().add(2, "days").format("MM/DD/YY");
  dayThreeEl.textContent = moment().add(3, "days").format("MM/DD/YY");
  dayFourEl.textContent = moment().add(4, "days").format("MM/DD/YY");
  dayFiveEl.textContent = moment().add(5, "days").format("MM/DD/YY");
  var fiveTempObject = JSON.parse(localStorage.getItem('fiveTemp'));
  console.log(fiveTempObject);
  oneTempEl.textContent = "Temp: " + fiveTempObject.one + "\u00B0F";
  twoTempEl.textContent = "Temp: " + fiveTempObject.two + "\u00B0F";
  threeTempEl.textContent = "Temp: " + fiveTempObject.three + "\u00B0F";
  fourTempEl.textContent = "Temp: " + fiveTempObject.four + "\u00B0F";
  fiveTempEl.textContent = "Temp: " + fiveTempObject.five + "\u00B0F";
  var fiveHumidObject = JSON.parse(localStorage.getItem('fiveHumid'));
  console.log(fiveHumidObject);
  oneHumidEl.textContent = "Humidity: " + fiveHumidObject.one + "%";
  twoHumidEl.textContent = "Humidity: " + fiveHumidObject.two + "%";
  threeHumidEl.textContent = "Humidity: " + fiveHumidObject.three + "%";
  fourHumidEl.textContent = "Humidity: " + fiveHumidObject.four + "%";
  fiveHumidEl.textContent = "Humidity: " + fiveHumidObject.five + "%";
  var weathIconsObject = JSON.parse(localStorage.getItem('icons'));
  imgDash.src = "http://openweathermap.org/img/wn/" + weathIconsObject.zero + "@2x.png";
  imgOne.src = "http://openweathermap.org/img/wn/" + weathIconsObject.one + "@2x.png";
  imgTwo.src = "http://openweathermap.org/img/wn/" + weathIconsObject.two + "@2x.png";
  imgThree.src = "http://openweathermap.org/img/wn/" + weathIconsObject.three + "@2x.png";
  imgFour.src = "http://openweathermap.org/img/wn/" + weathIconsObject.four + "@2x.png";
  imgFive.src = "http://openweathermap.org/img/wn/" + weathIconsObject.five + "@2x.png";
  placeEl.appendChild(imgDash);
  dayOneEl.appendChild(imgOne);
  dayTwoEl.appendChild(imgTwo);
  dayThreeEl.appendChild(imgThree);
  dayFourEl.appendChild(imgFour);
  dayFiveEl.appendChild(imgFive);
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
      console.log(data);
      var weathIcons = {zero: data.daily[0].weather[0].icon, one: data.daily[1].weather[0].icon, two: data.daily[2].weather[0].icon, three: data.daily[3].weather[0].icon, four: data.daily[4].weather[0].icon, five: data.daily[5].weather[0].icon};
      console.log(weathIcons)
      var fiveDayHumid = {one: data.daily[1].humidity, two: data.daily[2].humidity, three: data.daily[3].humidity, four: data.daily[4].humidity, five: data.daily[5].humidity};
      console.log(fiveDayHumid);
      var fiveDayTemp = {one: data.daily[1].temp.day, two: data.daily[2].temp.day, three: data.daily[3].temp.day, four: data.daily[4].temp.day, five: data.daily[5].temp.day};
      console.log(fiveDayTemp);
      var city ={temp: data.daily[0].temp.day, humidity: data.daily[0].humidity, wind: data.daily[0].wind_speed};
      var weathIconsString = JSON.stringify(weathIcons);
      localStorage.setItem('icons', weathIconsString);
      var weathIconsObject = JSON.parse(localStorage.getItem('icons'));
      var fiveDayHumidString =JSON.stringify(fiveDayHumid);
      localStorage.setItem('fiveHumid', fiveDayHumidString);
      var fiveHumidObject = JSON.parse(localStorage.getItem('fiveHumid'));
      var fiveDayTempString = JSON.stringify(fiveDayTemp);
      localStorage.setItem('fiveTemp', fiveDayTempString);
      var fiveTempObject = JSON.parse(localStorage.getItem('fiveTemp'));
      var cityString = JSON.stringify(city);
      localStorage.setItem('city', cityString);
      var cityObject = JSON.parse(localStorage.getItem('city'))
      console.log(cityObject);
      var weathIconsObject = JSON.parse(localStorage.getItem('icons'));
      imgDash.src = "http://openweathermap.org/img/wn/" + weathIconsObject.zero + "@2x.png";
      placeEl.appendChild(imgDash);
      tempEl.textContent = "Temperature: " + cityObject.temp + "\u00B0F";
      humidEl.textContent = "Humidity: " + cityObject.humidity + "%";
      windEl.textContent = "Wind Speed: " + cityObject.wind + " MPH";
      generateFiveDay();
    })
}

var generateFiveDay = function () {
  dayOneEl.textContent = moment().add(1, "day").format("MM/DD/YY");
  dayTwoEl.textContent = moment().add(2, "days").format("MM/DD/YY");
  dayThreeEl.textContent = moment().add(3, "days").format("MM/DD/YY");
  dayFourEl.textContent = moment().add(4, "days").format("MM/DD/YY");
  dayFiveEl.textContent = moment().add(5, "days").format("MM/DD/YY");
  var fiveTempObject = JSON.parse(localStorage.getItem('fiveTemp'));
  console.log(fiveTempObject);
  oneTempEl.textContent = "Temp: " + fiveTempObject.one + "\u00B0F";
  twoTempEl.textContent = "Temp: " + fiveTempObject.two + "\u00B0F";
  threeTempEl.textContent = "Temp: " + fiveTempObject.three + "\u00B0F";
  fourTempEl.textContent = "Temp: " + fiveTempObject.four + "\u00B0F";
  fiveTempEl.textContent = "Temp: " + fiveTempObject.five + "\u00B0F";
  var fiveHumidObject = JSON.parse(localStorage.getItem('fiveHumid'));
  console.log(fiveHumidObject);
  oneHumidEl.textContent = "Humidity: " + fiveHumidObject.one + "%";
  twoHumidEl.textContent = "Humidity: " + fiveHumidObject.two + "%";
  threeHumidEl.textContent = "Humidity: " + fiveHumidObject.three + "%";
  fourHumidEl.textContent = "Humidity: " + fiveHumidObject.four + "%";
  fiveHumidEl.textContent = "Humidity: " + fiveHumidObject.five + "%";

  var weathIconsObject = JSON.parse(localStorage.getItem('icons'));
  imgOne.src = "http://openweathermap.org/img/wn/" + weathIconsObject.one + "@2x.png";
  imgTwo.src = "http://openweathermap.org/img/wn/" + weathIconsObject.two + "@2x.png";
  imgThree.src = "http://openweathermap.org/img/wn/" + weathIconsObject.three + "@2x.png";
  imgFour.src = "http://openweathermap.org/img/wn/" + weathIconsObject.four + "@2x.png";
  imgFive.src = "http://openweathermap.org/img/wn/" + weathIconsObject.five + "@2x.png";

  dayOneEl.appendChild(imgOne);
  dayTwoEl.appendChild(imgTwo);
  dayThreeEl.appendChild(imgThree);
  dayFourEl.appendChild(imgFour);
  dayFiveEl.appendChild(imgFive);
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
      placeEl.textContent = nameObject.name + " " + moment().format("(MM/DD/YY)");
      var weathIconsObject = JSON.parse(localStorage.getItem('icons'));
      imgDash.src = "http://openweathermap.org/img/wn/" + weathIconsObject.zero + "@2x.png";
      placeEl.appendChild(imgDash);
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
      if (indexObject.uv <= 2) {
        uvEl.style.backgroundColor = "green"
      } else if (indexObject.uv > 2 && indexObject.uv < 6) {
        uvEl.style.backgroundColor = "yellow"
      } else if (indexObject.uv > 6 && indexObject.uv < 8) {
        uvEl.style.backgroundColor = "orange"
      } else {
        uvEl.style.backgroundColor = "red"
      }
    })
}
cityNames.addEventListener("click", getCityCord);
cityNames.addEventListener("click", getCityName);


var searchBtnEl = $(".searchBtn");

var searchEl = $("#search");


searchBtnEl.on("click", function () {
  var query = searchEl.val().trim();
  console.log(query);

  searches.push(query);
  localStorage.setItem('searchHist', searches);
  console.log(searches);

  if (searches[0] === undefined){
    var option = document.createElement("option");
    option.text = "no previous searches";
  } else {
    for (var i = 0; i < searches.length; i++) {
      var option = document.createElement("option");
      option.value = searches[i];
      option.text = searches[i]
      searchHistEl.appendChild(option);
    }
  }

  var apiSearch = "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&appid=9057e02af26cff387f193be4d1eee3ae";

  fetch(apiSearch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var cityLat = data.city.coord.lat;
      var cityLon = data.city.coord.lon;
      var cityId = data.city.id;
      console.log(data.city.id);
      if (cityLat && cityLon && cityId) {
        getCityTemp(cityLat, cityLon);
        getUv(cityLat, cityLon);
        getName(cityId);
      } else {
        alert("error cant find lon and lat");
      }
    })
});





