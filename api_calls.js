const https = require('https');

// Replace City and number of days
const cityName = 'London';
const days = 5;
const apiKey = process.env.WEATHER_KEY;

// Current weather API call
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

https.get(weatherUrl, (weatherRes) => {
  let weatherData = '';

  weatherRes.on('data', (chunk) => {
    weatherData += chunk;
  });

  weatherRes.on('end', () => {
    const weather = JSON.parse(weatherData);
    console.log('Current Weather:', weather);

    // Forecast API call
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&days=${days}&appid=${apiKey}`;

    https.get(forecastUrl, (forecastRes) => {
      let forecastData = '';

      forecastRes.on('data', (chunk) => {
        forecastData += chunk;
      });

      forecastRes.on('end', () => {
        const forecast = JSON.parse(forecastData);
        console.log('Forecast:', forecast);
      });
    }).on('error', (err) => {
      console.error('Error fetching forecast data:', err.message);
    });
  });
}).on('error', (err) => {
  console.error('Error fetching weather data:', err.message);
});

