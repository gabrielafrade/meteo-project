function refreshMeteo(response) {
  let temperatureElement = document.querySelector(
    "#meteo-app-temperature-value"
  );
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#meteo-app-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", resultSubmited);
searchCity("Lisbon");
