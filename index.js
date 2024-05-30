const body = document.querySelector('body')

const display = document.createElement('div')
display.classList.add('display')

// const conditionText = document.createElement('h1')
// const feelsLikeCtext = document.createElement('h1')
// const feelslikeFtext = document.createElement('h1')
// const tempCtext = document.createElement('h1')
// const tempFtext = document.createElement('h1')
// const windText = document.createElement('h1')
    const humidityText = document.createElement('h1')
// const isDayText = document.createElement('h1')
// const windDirText = document.createElement('h1')
// const windKphText = document.createElement('h1')
// const windMphText = document.createElement('h1')

// const dataArray = [conditionText,
//     feelsLikeCtext,
//     feelslikeFtext,
//     tempCtext,
//     tempFtext,
//     windText,
//     humidityText,
//     windDirText,
//     windKphText,
//     windMphText
// ]


let humidity2;



const getWeather = async (param) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=45d1e3c2830547be96601023242705&q=${param}&aqi=no`;
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
                wind_mph 
            } 
        } = data;
        
        // Return the relevant data
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
            wind_mph 
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null; 
    }
};

const displayWeather = async (city) => {
    const weatherData = await getWeather(city);

    if (weatherData) {
        const { humidity } = weatherData;
        console.log(`Humidity in ${city}: ${humidity}`);
        document.getElementById('humidity-text').textContent = `Humidity: ${humidity}`;
    } else {
        console.error('Failed to retrieve weather data.');
    }
};

// Example usage
displayWeather('San Francisco');




// const locationInput = document.createElement('input')
// locationInput.type = 'text'
// locationInput.placeholder = 'Enter a location'
// locationInput.id = 'locationInput'
// const submitBtn = document.createElement('button')
// submitBtn.textContent = 'Submit'
// submitBtn.id = 'submitBtn'

// submitBtn.onclick = () =>{
//     const location = locationInput.value.trim()
//     getWeather(location)
// }

// body.append(
//     locationInput,
//     submitBtn,
//     conditionText,
//     feelsLikeCtext,
//     feelslikeFtext,
//     tempCtext,
//     tempFtext,
//     humidityText,
//     isDayText,
//     windText,
//     windDirText,
//     windKphText,
//     windMphText
// )

