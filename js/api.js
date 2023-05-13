// Fetches the current weather data from the specified URL
export function fetchCurrentWeather(url) {
    // Use the Fetch API to send a GET request to the specified URL and receive a response
    return fetch(url)
        // Parse the response data as JSON
        .then((response) => response.json());
}
