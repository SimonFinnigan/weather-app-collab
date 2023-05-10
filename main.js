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
          <h2>Today in ${location}:</h2>
          <p>Weather: ${description}<br>
          Temperature: ${temp}°C<br>
          Description: ${description}<br>
          Feels like: ${feels_like}°C<br>
          Humidity: ${humidity}%</p>
        `;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        const weatherDiv = document.getElementById("weather");
        weatherDiv.innerHTML = `Could not fetch weather data. Please try again later.`;
      });
  }  