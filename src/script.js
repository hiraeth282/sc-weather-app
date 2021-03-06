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

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(displayForecast);
  }

function displayWeather(response) {
  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  celsiusTemperature = response.data.main.temp

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = `${Math.round(celsiusTemperature)}°`;
  document.querySelector("#precipitation-probability").innerHTML = `${Math.round(response.data.main.humidity)}%`
  document.querySelector("#wind-speed").innerHTML = `${Math.round(response.data.wind.speed)} kph`
  document.querySelector("#weather-description").innerHTML = `${response.data.weather[0].description}`
  currentWeatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function formatForecastTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

  return `${hour}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" />
      <div class="forecast-time">${formatForecastTime(forecast.dt * 1000)}</div>
      <div class="forecast-temperature">${Math.round(forecast.main.temp_max)}°/ ${Math.round(forecast.main.temp_min)}°</div>
    </div>
    `;
  }
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
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayFahrenheitTemp(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let currentTemp = document.querySelector("#main-temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    currentTemp.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemp = document.querySelector("#main-temperature");
  currentTemp.innerHTML = `${Math.round(celsiusTemperature)}°`;
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


let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("Tokyo"); 