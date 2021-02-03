//var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=9057e02af26cff387f193be4d1eee3ae";
var cityNames = document.querySelector("#city-names");
var btn = document.querySelector(".btn")
var places = document.querySelector("#places");

var cityCode = btn.getAttribute('data-id');
console.log(cityCode);

cityNames.addEventListener("click", function() {
  localStorage.setItem('code', cityCode);

  console.log(cityCode);
});

