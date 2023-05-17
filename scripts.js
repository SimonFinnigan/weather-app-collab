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
        const { icon } = weather[0];
        // console.log({weather})
        const weatherDiv = document.getElementById("weather");
        weatherDiv.innerHTML = `
        <div class="card">
          <div class="card-header">
          <div class="topRow">
          <div id="icon"><img id="wicon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"></div>
          <p class="mb1 temperatureClass">${temp}°C</p>
          <p class="mb1">${location}</h2>
          </div>
          <p class="mb1">${description}</p>
          <p class="mb1">Humidity: ${humidity}%</p>
          </div>
          </div>
          `;
          $('#weather').removeClass("cloudyWeatherResults snowWeatherResults clearWeatherResults")
          console.log(weather[0].id)
          console.log(data)
          $('#weather').each(function() {
            if (weather[0].id > 800 < 805) {
              $(this).addClass('cloudyWeatherResults');
              console.log("EQUALS")
            } else if (weather[0].id > 199 < 233) {
              $(this).addClass('THUNDERSTORM');
            } else if (weather[0].id > 299 < 322) {
              $(this).addClass('DRIZZLE');
            } else if (weather[0].id > 499 < 523) {
              $(this).addClass('RAIN');
            } else if (weather[0].id > 599 < 623) {
              $(this).addClass('snowWeatherResults');
            } else if (weather[0].id > 700 < 781) {
              $(this).addClass('MIST/SMOKE/HAZE');
            } else if (weather[0].id == 800) {
              $(this).addClass('clearWeatherResults');
              console.log(weather[0].id);
            }
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          const weatherDiv = document.getElementById("weather");
          weatherDiv.innerHTML = `Could not fetch weather data. Please try again later.`;
        });
      }) 
}
  document.addEventListener('DOMContentLoaded', function () {
    const intputField = document.getElementById("location");
    var input = document.getElementById("location");
    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchButton").click();
      }
    });
});
