const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url.startsWith('/forecast')) {
    handleForecastRequest(req, res);
  } else if (req.url.startsWith('/weather')) {
    handleWeatherRequest(req, res);
  } else {
    serveStaticFile(req, res);
  }
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function handleWeatherRequest(req, res) {
  const cityName = req.url.split('/')[2];

  if (!cityName) {
    sendResponse(res, 400, 'Invalid request! Please provide a city name.');
    return;
  }

  const apiKey = config.apiKey;
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  https.get(weatherApiUrl, (weatherApiRes) => {
    let weatherData = '';

    weatherApiRes.on('data', (chunk) => {
      weatherData += chunk;
    });

    weatherApiRes.on('end', () => {
      const responseData = JSON.parse(weatherData);
      sendResponse(res, 200, responseData);
    });
  }).on('error', (err) => {
    sendResponse(res, 500, 'Error fetching weather data from OpenWeatherMap API: ' + err.message);
  });
}

function handleForecastRequest(req, res) {
  const cityName = req.url.split('/')[2];

  if (!cityName) {
    sendResponse(res, 400, 'Invalid request! Please provide a city name.');
    return;
  }

  const apiKey = config.apiKey;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

  https.get(forecastApiUrl, (forecastApiRes) => {
    let forecastData = '';

    forecastApiRes.on('data', (chunk) => {
      forecastData += chunk;
    });

    forecastApiRes.on('end', () => {
      const responseData = JSON.parse(forecastData);
      sendResponse(res, 200, responseData);
    });
  }).on('error', (err) => {
    sendResponse(res, 500, 'Error fetching forecast data from OpenWeatherMap API: ' + err.message);
  });
}


function serveStaticFile(req, res) {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = path.extname(filePath).toLowerCase();
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

  fs.readFile(filePath, (err, content) => {
    if (err) {
      sendResponse(res, 500, 'Error reading file: ' + err.code);
    } else {
      sendResponse(res, 200, content, contentType);
    }
  });
}

function sendResponse(res, statusCode, data, contentType = 'application/json') {
  res.writeHead(statusCode, { 'Content-Type': contentType });

  if (typeof data === 'string') {
    res.end(data, 'utf-8');
  } else if (Buffer.isBuffer(data)) {
    res.end(data);
  } else {
    res.end(JSON.stringify(data));
  }
}
