function refreshWeather(response) {
	let todayTemperatureElement = document.querySelector(
		"#todays-weather-temperature"
	);
	let temperature = Math.round(response.data.temperature.current);
	let cityElement = document.querySelector("#weather-app-city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windspeedElement = document.querySelector("#wind-speed");
	let timeElement = document.querySelector("#time");
	let date = new Date(response.data.time * 1000);

	cityElement.innerHTML = response.data.city;
	todayTemperatureElement.innerHTML = temperature;
	descriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = response.data.temperature.humidity;
	windspeedElement.innerHTML = response.data.wind.speed;
	timeElement.innerHTML = formatDate(date);
	console.log(response.data);
}

function formatDate(date) {
	let minutes = date.getMinutes();
	let hours = date.getHours();
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

	return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
	let apiKey = "bc4649524ebb028af8032a47bt4c53o0";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
	axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-form-input");
	let cityElement = document.querySelector("#weather-app-city");
	cityElement.innerHTML = searchInput.value;
	searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
