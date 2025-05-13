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

  changeTheme(response.data.condition.icon_url);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "3f9ec00e23oc6a139aftba624cb575a1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `
    <div class="meteo-forecast-day">
            <div class="meteo-forecast-date">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" class="meteo-forecast-icon"/>  
            <div class="meteo-forecast-temperatures">
              <div class="meteo-forecast-temperature"><strong>${Math.round(
                day.temperature.maximum
              )}</strong></div>
              <div class="meteo-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}</div>
            </div>
          </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function changeTheme(iconUrl) {
  let themeElement = document.querySelector(".meteo-app");
  themeElement.classList.remove(
    "meteo-app-rain",
    "meteo-app-clouds",
    "meteo-app-sun"
  );
  if (
    iconUrl.includes("rain") ||
    iconUrl.includes("shower") ||
    iconUrl.includes("thunderstorm") ||
    iconUrl.includes("snow") ||
    iconUrl.includes("mist")
  ) {
    themeElement.classList.add("meteo-app-rain");
  } else if (iconUrl.includes("clouds")) {
    themeElement.classList.add("meteo-app-clouds");
  } else {
    themeElement.classList.add("meteo-app-sun");
  }
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", resultSubmited);
searchCity("Lisbon");
