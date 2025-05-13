function refreshMeteo(response) {
  let temperatureElement = document.querySelector(
    "#meteo-app-temperature-value"
  );
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#meteo-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#emoji");

  iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}"
      class="meteo-app-emoji"/>`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeedElement.innerHTML = response.data.wind.speed;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "3f9ec00e23oc6a139aftba624cb575a1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshMeteo);
}

function resultSubmited(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "3f9ec00e23oc6a139aftba624cb575a1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="meteo-forecast-day">
            <div class="meteo-forecast-date">${day}</div>
            <div class="meteo-forecast-icon">🌥️</div>
            <div class="meteo-forecast-temperatures">
              <div class="meteo-forecast-temperature"><strong>19º</strong></div>
              <div class="meteo-forecast-temperature">12º</div>
            </div>
          </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", resultSubmited);
searchCity("Lisbon");
