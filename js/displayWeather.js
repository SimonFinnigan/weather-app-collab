// const weatherDiv = document.getElementById('weather');

// // Display the current weather data
// export function displayCurrentWeather(data) {
//   // Destructure the necessary weather data from the 'data' object
//   const { main: { temp, feels_like, humidity }, weather: [{ description }] } = data;

//   // Generate HTML markup to display the weather information
//   const weatherHtml = `
//     <div id="weather-heading" aria-level="2">Today:</div>
//     <p>
//       <span id="weather-description" aria-labelledby="weather-heading">Weather: ${description}</span>
//       <span id="temperature" aria-labelledby="weather-heading">Temperature: ${temp}°C</span>
//       <span id="feels-like" aria-labelledby="weather-heading">Feels like: ${feels_like}°C</span>
//       <span id="humidity" aria-labelledby="weather-heading">Humidity: ${humidity}%</span>
//     </p>
//   `;

//   // Update the weatherDiv element with the generated HTML
//   weatherDiv.innerHTML = weatherHtml;
// }

// // Display an error message
// export function displayError() {
//   // Error message to be displayed
//   const errorMessage = 'An error occurred. Please try again later.';

//   // Generate HTML markup to display the error message
//   const errorHtml = `
//     <p id="error-message" role="alert" aria-live="assertive">${errorMessage}</p>
//   `;

//   // Update the weatherDiv element with the error HTML
//   weatherDiv.innerHTML = errorHtml;
// }
