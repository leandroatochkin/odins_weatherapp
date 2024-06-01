document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');

    const display = document.createElement('div');
    display.classList.add('display');

    let tempUnit = 'C';
    let metricUnit = 'KM/H';
    let city;
    const date = new Date();

    const cityTitle = document.querySelector('.city-name');
    const dateText = document.querySelector('.date');
    dateText.textContent = date;

    const conditionText = document.querySelector('#condition');
    const feelsLikeText = document.querySelector('#feels-like');
    const tempText = document.querySelector('#temperature');
    const humidityText = document.querySelector('#humidity');
    const windDirText = document.querySelector('#wind-direction');
    const windSpeedText = document.querySelector('#wind-speed');

    const cityInput = document.querySelector('#city-input');

    const searchBtn = document.querySelector('#search-btn');
    searchBtn.onclick = () => {
        city = cityInput.value;
        cityTitle.textContent = city;
        displayWeather(city, tempUnit, metricUnit);
    };

    const getWeather = async (param) => {
        const url = `https://api.weatherapi.com/v1/current.json?key=45d1e3c2830547be96601023242705&q=${param}&aqi=no`;
        try {
            const response = await fetch(url, { mode: 'cors' });
            const data = await response.json();

            const {
                current: {
                    condition: { text: current_condition },
                    feelslike_c,
                    feelslike_f,
                    temp_c,
                    temp_f,
                    humidity,
                    is_day,
                    wind_dir,
                    wind_kph,
                    wind_mph,
                },
            } = data;

            return {
                current_condition,
                feelslike_c,
                feelslike_f,
                temp_c,
                temp_f,
                humidity,
                is_day,
                wind_dir,
                wind_kph,
                wind_mph,
            };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    };

    const displayWeather = async (city, tempUnit, metricUnit) => {
        const weatherData = await getWeather(city);

        if (weatherData) {
            const {
                current_condition,
                feelslike_c,
                feelslike_f,
                temp_c,
                temp_f,
                humidity,
                wind_dir,
                wind_kph,
                wind_mph,
            } = weatherData;

            conditionText.textContent = `Condition: ${current_condition}`;
            humidityText.textContent = `Humidity: ${humidity}`;
            windDirText.textContent = `Wind direction: ${wind_dir}`;
            feelsLikeText.textContent = `Feels like: ${tempUnit === 'C' ? feelslike_c : feelslike_f}°${tempUnit}`;
            tempText.textContent = `Temperature: ${tempUnit === 'C' ? temp_c : temp_f}°${tempUnit}`;
            windSpeedText.textContent = `Wind speed: ${metricUnit === 'KM/H' ? wind_kph : wind_mph} ${metricUnit.toLowerCase()}`;
        } else {
            console.error('Failed to retrieve weather data.');
        }
    };

    const unitSelector = document.querySelector('#temp');
    const systemSelector = document.querySelector('#system');


    const success = (data) => {
        const lat = data.coords.latitude;
        const long = data.coords.longitude;
        displayWeather(`${lat},${long}`, tempUnit, metricUnit);
        cityTitle.textContent = 'Your current location';
    };

    navigator.geolocation.getCurrentPosition(success);

    displayWeather(city, tempUnit, metricUnit);
});








