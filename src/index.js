function refreshWeather(response) {
  let cityElement = document.querySelector("#weather-city");
  let detailsElement = document.querySelector("#weather-details");
  let temperatureElement = document.querySelector("#weather-temp");
  let temperature = Math.round(response.data.temperature.current);
  let iconElement = document.querySelector("#weather-icon");
  let windElement = document.querySelector("#weather-wind");
  let wind = response.data.wind.speed;
  let pressureElement = document.querySelector("#weather-pressure");
  let pressure = response.data.temperature.pressure;
  let humidityElement = document.querySelector("#weather-humidity");
  let humidity = response.data.temperature.humidity;

  let timeElement = document.querySelector("#weather-date");
  let date = new Date(response.data.time * 1000);

  console.log(response.data);

  cityElement.innerHTML = response.data.city;
  detailsElement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = `${temperature}°C`;
  iconElement.innerHTML = `<img src=${response.data.condition.icon_url} class="weather-icon">`;
  windElement.innerHTML = `Wind: <strong> ${wind} km/h </strong>`;
  pressureElement.innerHTML = `Pressure:<strong> ${pressure} hPa </strong> `;
  humidityElement.innerHTML = `Humidity: <strong> ${humidity} % </strong>`;

  getForeCast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForeCast(city) {
  let apiKey = "92dd828taa17b53d1feo43a40bd1ab2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data);

  let forecastHtml = "";

   
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <div>
      <img src="${day.condition.icon_url}"  class="weather-forecast-icon">
      </div>
      <div class="weather-forecast-temps">
        <span class="weather-forecast-temp">
          <strong>${Math.round(day.temperature.maximum)}°</strong>
        </span>
        <span class="weather-forecast-temp">${Math.round(
          day.temperature.minimum
        )}°</span>
      </div>
    </div>
        
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}


let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", formSearchsubmit);

apiCity("Lagos");