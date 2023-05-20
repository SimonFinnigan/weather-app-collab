// server.js

// Import required modules
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const hostname = '127.0.0.1';
const port = 3000;

// Create HTTP server
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Route requests based on URL path
  if (req.url.startsWith('/forecast')) {
    handleForecastRequest(req, res);
  } else if (req.url.startsWith('/weather')) {
    handleWeatherRequest(req, res);
  } else {
    serveStaticFile(req, res);
  }
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Handle weather requests
function handleWeatherRequest(req, res) {
  const cityName = req.url.split('/')[2];

  // Check if the city name is provided
  if (!cityName) {
    sendResponse(res, 400, 'Invalid request! Please provide a city name.');
    return;
  }

  const apiKey = config.apiKey;
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  // Fetch weather data from OpenWeatherMap API
  https.get(weatherApiUrl, (weatherApiRes) => {
    let weatherData = '';

    // Accumulate the received data
    weatherApiRes.on('data', (chunk) => {
      weatherData += chunk;
    });

    // Process the complete response
    weatherApiRes.on('end', () => {
      const responseData = JSON.parse(weatherData);
      sendResponse(res, 200, responseData);
    });
  }).on('error', (err) => {
    sendResponse(res, 500, 'Error fetching weather data from OpenWeatherMap API: ' + err.message);
  });
}

// Handle forecast requests
function handleForecastRequest(req, res) {
  const cityName = req.url.split('/')[2];

  // Check if the city name is provided
  if (!cityName) {
    sendResponse(res, 400, 'Invalid request! Please provide a city name.');
    return;
  }

  const apiKey = config.apiKey;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

  // Fetch forecast data from OpenWeatherMap API
  https.get(forecastApiUrl, (forecastApiRes) => {
    let forecastData = '';

    // Accumulate the received data
    forecastApiRes.on('data', (chunk) => {
      forecastData += chunk;
    });

    // Process the complete response
    forecastApiRes.on('end', () => {
      const responseData = JSON.parse(forecastData);
      sendResponse(res, 200, responseData);
    });
  }).on('error', (err) => {
    sendResponse(res, 500, 'Error fetching forecast data from OpenWeatherMap API: ' + err.message);
  });
}

// Serve static files
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

  // Read the file and send response
  fs.readFile(filePath, (err, content) => {
    if (err) {
      sendResponse(res, 500, 'Error reading file: ' + err.code);
    } else {
      sendResponse(res, 200, content, contentType);
    }
  });
}

// Send HTTP response
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
