function fetchApiData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error(`Error fetching data: ${error}`);
    });
}

function getWeatherData(location) {
  const url = `http://localhost:3000/weather/${location}`;
  fetchApiData(url)
    .then(data => {
      if (data) {
        displayWeatherData(data);
        styleWeatherCard(data.weather[0].id);
      }
    })
    .catch(() => {
      const weatherDiv = document.getElementById("weather");
      weatherDiv.innerHTML = `Could not fetch weather data. Please try again later.`;
    });
}

function getForecastData(location) {
  // const url = `http://localhost:3000/forecast/${location}`;
  // fetchApiData(url)
  //   .then(data => {
  //     if (data) {
  //       // Display the forecast data
  //     }
  //   })
  //   .catch(() => {
  //     // Handle error
  //   });
}

function displayWeatherData(data) {
  const { main, weather, name, sys } = data;
  const { temp, humidity } = main;
  const { icon } = weather[0];
  let degreeCelcius = temp - 273;
  let newTemp = parseFloat(degreeCelcius).toFixed(0);
  const description = weather[0].main;
  const country  = sys.country;
  const weatherDiv = document.getElementById("weather");
  weatherDiv.innerHTML = `
    <div class="card">
      <div class="card-header">
      <div class="topRow">
      <div id="icon"><img id="wicon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"></div>
      <p class="mb1 temperatureClass">${newTemp}°C</p>
      <p class="mb1">${name}, ${country}</h2>
      </div>
      <p class="mb1">${description}</p>
      <p class="mb1">Humidity: ${humidity}%</p>
      </div>
      </div>
      `;
}

function styleWeatherCard(weatherId) {
  $('#weather').removeClass("cloudyWeatherResults snowWeatherResults clearWeatherResults");
  $('#weather').each(function() {
    if (weatherId > 800 && weatherId < 805) {
      $(this).addClass('cloudyWeatherResults');
    } else if (weatherId > 199 && weatherId < 233) {
      $(this).addClass('THUNDERSTORM');
    } else if (weatherId > 299 && weatherId < 322) {
      $(this).addClass('DRIZZLE');
    } else if (weatherId > 499 && weatherId < 523) {
      $(this).addClass('RAIN');
    } else if (weatherId > 599 && weatherId < 623) {
      $(this).addClass('snowWeatherResults');
    } else if (weatherId > 700 && weatherId < 781) {
      $(this).addClass('MIST/SMOKE/HAZE');
    } else if (weatherId === 800) {
      $(this).addClass('clearWeatherResults');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById("location");
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const location = document.getElementById("location").value;
      getWeatherData(location);
    }
  });

  document.getElementById("searchButton").addEventListener("click", function() {
    const location = document.getElementById("location").value;
    getWeatherData(location);
  });
});