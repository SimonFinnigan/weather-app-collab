function getWeather() {
    const location = document.getElementById("location").value;
    const apiKey = "f97f1ab753599aee7f08d7f884a89c89";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;


    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const { main, weather } = data;
        const { temp, feels_like, humidity } = main;
        const { icon } = weather[0];
        let degreeCelcius = (temp - 273)
        let newTemp = parseFloat(degreeCelcius).toFixed(0);
        const jsonLocation = data.name
        const description = data.weather[0].main
        const country  = data.sys.country
        const weatherDiv = document.getElementById("weather");
        weatherDiv.innerHTML = `
        <div class="card">
          <div class="card-header">
          <div class="topRow">
          <div id="icon"><img id="wicon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"></div>
          <p class="mb1 temperatureClass">${(newTemp)}°C</p>
          <p class="mb1">${jsonLocation}, ${country}</h2>
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
            if (weather[0].id > 800 && weather[0].id < 805) {
              $(this).addClass('cloudyWeatherResults');
              console.log("EQUALS")
            } else if (weather[0].id > 199 && weather[0].id < 233) {
              $(this).addClass('THUNDERSTORM');
            } else if (weather[0].id > 299 && weather[0].id < 322) {
              $(this).addClass('DRIZZLE');
            } else if (weather[0].id > 499 && weather[0].id < 523) {
              $(this).addClass('RAIN');
            } else if (weather[0].id > 599 && weather[0].id < 623) {
              $(this).addClass('snowWeatherResults');
            } else if (weather[0].id > 700 && weather[0].id < 781) {
              $(this).addClass('MIST/SMOKE/HAZE');
            } else if (weather[0].id === 800) {
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
