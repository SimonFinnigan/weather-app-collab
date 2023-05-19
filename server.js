const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/weather')) {
    const cityName = req.url.split('/')[2];

    if (!cityName) {
      res.writeHead(400);
      res.end('Invalid request! Please provide a city name.');
      return;
    }

    const apiKey = config.apiKey;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=5&appid=${apiKey}`;

    // Fetch current weather data
    https.get(weatherApiUrl, (weatherApiRes) => {
      let weatherData = '';

      weatherApiRes.on('data', (chunk) => {
        weatherData += chunk;
      });

      weatherApiRes.on('end', () => {
        // Fetch forecast data
        https.get(forecastApiUrl, (forecastApiRes) => {
          let forecastData = '';

          forecastApiRes.on('data', (chunk) => {
            forecastData += chunk;
          });

          forecastApiRes.on('end', () => {
            const responseData = {
              current: JSON.parse(weatherData),
              forecast: JSON.parse(forecastData)
            };

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(responseData));
          });
        }).on('error', (err) => {
          res.writeHead(500);
          res.end('Error fetching forecast data from OpenWeatherMap API: ' + err.message);
        });
      });
    }).on('error', (err) => {
      res.writeHead(500);
      res.end('Error fetching weather data from OpenWeatherMap API: ' + err.message);
    });
  } else {
    // Serve static files
    let filePath = '.' + req.url;
    if (filePath == './') {
      filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.svg': 'image/svg+xml'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (err, content) {
      if (err) {
        res.writeHead(500);
        res.end('Error reading file: ' + err.code);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
