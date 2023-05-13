import { fetchCurrentWeather } from './api.js';
import { displayCurrentWeather, displayError } from './displayWeather.js';

// Fetches the weather data for the specified location
export function getWeather() {
  const locationInput = document.getElementById('location-input');
  const apiKey = 'f97f1ab753599aee7f08d7f884a89c89';

  // Constructs the weather API URL based on the location and API key
  function getCurrentWeatherUrl(location) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  }

  // Handles the successful retrieval of weather data
  function handleSuccess(weatherData) {
    displayCurrentWeather(weatherData);
  }

  // Handles errors that occur during weather data retrieval
  function handleError(error) {
    console.error('Error fetching weather data:', error);
    displayError();
  }

  // Get the location value from the input field
  const location = locationInput.value;

  // Construct the weather API URL for the specified location
  const currentWeatherUrl = getCurrentWeatherUrl(location);

  // Fetch weather data and handle success and error cases
  fetchCurrentWeather(currentWeatherUrl)
    .then(handleSuccess)
    .catch(handleError);
}

// Event handler for 'keydown' event on the location input field
export function handleKeyDown(event) {
  // Check if the 'Enter' key was pressed
  if (event.key === 'Enter') {
    event.preventDefault();

    // Call the getWeather function to fetch weather data
    getWeather();
  }
}
