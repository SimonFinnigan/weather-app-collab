# Weather App

A simple weather application that allows users to fetch current weather data for a specified location.

## Installation

1. Clone the repository:

git clone https://github.com/SimonFinnigan/weather-app-collab.git


2. Install the required dependencies:

npm install


3. Build the project:

npm run build


4. Open the `index.html` file in your web browser.

## Usage

1. Enter the location for which you want to fetch the weather data in the input field.

2. Press Enter or click the "Get Weather" button to fetch and display the current weather information for the specified location.

## Features

- Fetches current weather data using the OpenWeatherMap API.
- Displays the temperature, description, feels like, and humidity.
- Error handling for failed data retrieval.
- Responsive design using Tailwind CSS.

## File Structure

The project structure is as follows:

- css/
  - styles.css            # CSS file for styling the application
- dist/
  - output.css            # CSS file generated by Tailwind CSS
- js/
  - api.js                # JavaScript file for making API requests
  - displayWeather.js     # JavaScript file for displaying weather information
  - main.js               # JavaScript file for handling main functionality
  - weather.js            # JavaScript file for weather data retrieval
- index.html              # HTML file for the weather application
- package.json            # Project metadata and dependencies
- README.md               # Project documentation
- tailwind.config.js      # Tailwind CSS configuration file

## Dependencies

The project uses the following dependencies:

- Tailwind CSS: Utility-first CSS framework for styling the application.

## Credits

This project was created by Danny Lambert and Simon Finnigan.

## License

This project is licensed under the [MIT License](LICENSE).