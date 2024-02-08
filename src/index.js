function formSearchsubmit(event) {
  event.preventDefault();

  let searchCity = document.querySelector("#search-city");
 let cityElement = document.querySelector("#weather-city");

 cityElement.innerHTML = searchCity.value
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", formSearchsubmit);
