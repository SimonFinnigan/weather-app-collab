function getWeather() {
    const location = document.getElementById("location").value;
    const apiKey = "f97f1ab753599aee7f08d7f884a89c89";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const { main, weather } = data;
        const { temp, feels_like, humidity } = main;
        const { description } = weather[0];
  
        const weatherDiv = document.getElementById("weather");
        weatherDiv.innerHTML = `
          <h2 class="mb1">Today in ${location}:</h2>
          <p class="mb1">Weather: ${description}</p>
          <p class="mb1">Temperature: ${temp}°C</p>
          <p class="mb1">Description: ${description}</p>
          <p class="mb1">Feels like: ${feels_like}°C</p>
          <p class="mb1">Humidity: ${humidity}%</p>
        `;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        const weatherDiv = document.getElementById("weather");
        weatherDiv.innerHTML = `Could not fetch weather data. Please try again later.`;
      });
  }  


  document.addEventListener('DOMContentLoaded', function () {
const intputField = document.getElementById("location");



// Get the input field
var input = document.getElementById("location");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchButton").click();
  }
});
});