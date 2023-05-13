import { getWeather, handleKeyDown } from './weather.js';

// Get the location input element
const locationInput = document.getElementById('location-input');

// Get the Get Weather button element
const getWeatherButton = document.getElementById('get-weather-btn');

// Event listener for 'keydown' event on location input field
locationInput.addEventListener('keydown', handleKeyDown);

// Event listener for 'click' event on Get Weather button
getWeatherButton.addEventListener('click', getWeather);
