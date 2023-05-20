# API Documentation

This API provides weather information based on city names. It has the following endpoints:

## Endpoint: /weather/{cityName}

### Description

This endpoint retrieves the current weather data for a specific city.

### Request

- Method: GET
- URL: /weather/{cityName}
- Headers:
  - Access-Control-Allow-Origin: *

### Parameters

- `cityName` (required): The name of the city for which weather data is requested.

### Response

- Status Code: 200 OK
- Content-Type: application/json

The response contains the following weather information for the specified city:

- `coord`: Contains `lon` (longitude) and `lat` (latitude) of the location.
- `weather`: Contains weather condition information, including `id` (condition ID), `main` (weather condition group), `description` (weather condition description), and `icon` (weather icon ID).
- `base`: Internal parameter.
- `main`: Contains temperature and atmospheric pressure information, including `temp`, `feels_like`, `pressure`, `humidity`, `temp_min`, `temp_max`, `sea_level`, and `grnd_level`.
- `visibility`: Visibility in meters.
- `wind`: Contains wind information, including `speed`, `deg`, and `gust`.
- `clouds`: Contains cloudiness information, including `all` (cloudiness percentage).
- `rain`: Contains rainfall information, including `1h` (rain volume for the last 1 hour) and `3h` (rain volume for the last 3 hours).
- `snow`: Contains snowfall information, including `1h` (snow volume for the last 1 hour) and `3h` (snow volume for the last 3 hours).
- `dt`: Time of data calculation in UNIX UTC format.
- `sys`: Contains additional system-related information, such as `type`, `id`, `message`, `country`, `sunrise`, and `sunset`.
- `timezone`: Shift in seconds from UTC.
- `id`: City ID.
- `name`: City name.
- `cod`: Internal parameter.

Example Response Body:

```json
{
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "pressure": 1023,
    "humidity": 100,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "sea_level": 1023,
    "grnd_level": 1022
  },
  "visibility": 16093,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "rain": {
    "1h": 0.25
  },
  "snow": {
    "1h": 0.01
  },
  "dt": 1485789600,
  "sys": {
    "type": 1,
    "id": 471,
    "message": 0.0114,
    "country": "US",
    "sunrise": 1485762037,
    "sunset": 1485794875
  },
  "timezone": -25200,
  "id": 123456,
  "name": "San Francisco",
  "cod": 200
}

## Endpoint: /forecast/{cityName}

### Description

This endpoint retrieves the weather forecast data for a specific city.

### Request

- Method: GET
- URL: /forecast/{cityName}
- Headers:
  - Access-Control-Allow-Origin: *

### Parameters

- `cityName` (required): The name of the city for which forecast data is requested.

### Response

- Status Code: 200 OK
- Content-Type: application/json

The response contains the following weather forecast information for the specified city:

- `city`: Contains city-related information, including `id`, `name`, and `coord` (latitude and longitude).
- `country`: Country code.
- `population`: Internal parameter.
- `timezone`: Shift in seconds from UTC.
- `cod`: Internal parameter.
- `message`: Internal parameter.
- `cnt`: The number of days returned in the API response.
- `list`: An array of forecasted weather data, each element containing:
  - `dt`: Time of data forecasted in UNIX UTC format.
  - `temp`: Contains temperature information for different times of the day, including `day`, `min`, `max`, `night`, `eve`, and `morn`.
  - `feels_like`: Contains temperature perception information, including `day`, `night`, `eve`, and `morn`.
  - `pressure`: Atmospheric pressure on the sea level (hPa).
  - `humidity`: Humidity percentage.
  - `weather`: Contains weather condition information, including `id` (condition ID), `main` (weather condition group), `description` (weather condition description), and `icon` (weather icon ID).
  - `speed`: Wind speed (meter/sec).
  - `deg`: Wind direction in degrees (meteorological).
  - `gust`: Wind gust (meter/sec).
  - `clouds`: Cloudiness percentage.
  - `rain`: Precipitation volume in mm (if available).
  - `snow`: Snow volume in mm (if available).
  - `pop`: Probability of precipitation. The values range between 0 and 1, where 0 is 0% and 1 is 100%.

Example Response Body:

```json
{
  "city": {
    "id": 123456,
    "name": "San Francisco",
    "coord": {
      "lat": 37.77,
      "lon": -122.43
    },
    "country": "US",
    "population": 864816,
    "timezone": -25200,
    "cod": "200",
    "message": 0.0223
  },
  "cnt": 7,
  "list": [
    {
      "dt": 1485799200,
      "temp": {
        "day": 285.51,
        "min": 281.45,
        "max": 285.51,
        "night": 281.45,
        "eve": 284.86,
        "morn": 282.89
      },
      "feels_like": {
        "day": 282.59,
        "night": 278.28,
        "eve": 282.08,
        "morn": 281.76
      },
      "pressure": 1012.12,
      "humidity": 76,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "speed": 1.65,
      "deg": 83,
      "gust": 3.56,
      "clouds": 0,
      "rain": 0,
      "snow": 0,
      "pop": 0
    },
    ...
  ]
}

# API Contract

The API follows the following contract:

Base URL: http://localhost:3000

- All endpoints require the appropriate request method and headers mentioned in the API documentation.
- Invalid requests or missing parameters will result in an error response.
- The API will respond with the appropriate status codes and response bodies as described in the API documentation.

Please note that the API contract is subject to change based on future updates and enhancements. It's important to refer to the latest version of the API documentation for accurate information.

Error handling should be implemented in your client application to handle scenarios where the API returns an error response or encounters an internal server error.