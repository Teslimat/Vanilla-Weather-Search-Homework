function refreshWeather(response) {
  let cityElement = document.querySelector("#weather-city");
  let detailsElement = document.querySelector("#weather-details");
  let temperatureElement = document.querySelector("#weather-temp");
  let temperature = Math.round(response.data.temperature.current);
  let iconElement = document.querySelector("#weather-icon");

  console.log(response.data);

  cityElement.innerHTML = response.data.city;
  detailsElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = `${temperature}°`;
  iconElement.innerHTML = `<img src=${response.data.condition.icon_url} class="weather-icon">`;
}

function apiCity(city) {
  let apiKey = "92dd828taa17b53d1feo43a40bd1ab2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function formSearchsubmit(event) {
  event.preventDefault();

  let searchCity = document.querySelector("#search-city");

  apiCity(searchCity.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", formSearchsubmit);

apiCity("Lagos");
