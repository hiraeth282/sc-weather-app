function formatDate(date) {
    let dayIndex = now.getDay();
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ];
    let day = days[dayIndex];

    let currentDate = now.getDate();

    let monthIndex = now.getMonth();
    let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
    ];
    let month = months[monthIndex];

    return `${day}, ${currentDate} ${month}`;
}

function formatTime(date) {
    let hour = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hour}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "7ce1ca7802b06113d47476aa0d7d11c9";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(displayWeather);
  }

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = `${Math.round(response.data.main.temp)}°`;
  document.querySelector("#precipitation-probability").innerHTML = `${Math.round(response.data.main.humidity)}%`
  document.querySelector("#wind-speed").innerHTML = `${Math.round(response.data.wind.speed)} kph`
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

function searchPosition(position) {
  let apiKey = "7ce1ca7802b06113d47476aa0d7d11c9";
  let unit = "metric"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}



let dateElement = document.querySelector("#current-date");
let timeElement = document.querySelector("#current-time");
let now = new Date();
dateElement.innerHTML = formatDate(now);
timeElement.innerHTML = formatTime(now);


let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", handleSubmit);


let currentLocationButton = document.querySelector("#local-button");
currentLocationButton.addEventListener("click", findCurrentLocation);

searchCity("Tokyo");

//Temperature
function getFahrenheitTemp(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#main-temperature");
    currentTemp.innerHTML = `46°`;
}

function getCelsiusTemp(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#main-temperature");
    currentTemp.innerHTML = `8°`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", getFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", getCelsiusTemp);