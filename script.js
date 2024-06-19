const inputValue = document.querySelector('.input-val');
const searchBtn = document.getElementById('searchButton');
const weather_status = document.querySelector('.weather-status');
const not_found = document.querySelector('.not-found');
const display = document.querySelector('.display');
const temperature = document.querySelector('.weather-data');
const description = document.querySelector('.weather-data2');
const humidityIcon = document.querySelector('.humidity-icon');
const visibilityIcon = document.querySelector('.visibility-icon');
const windIcon = document.querySelector('.wind-icon');
const humidity = document.getElementById('humidity');
const visibility = document.getElementById('visibility');
const wind_speed = document.getElementById('wind-speed');

async function getGifForWeatherCondition(condition) {
    const response = await fetch(`${condition.toLowerCase()}.json`);
    const data = await response.json();
    return data.gif;
}

async function weatherCheck(city) {
    if (inputValue.value === '') return;

    const API_KEY = "aafc4233f5bb6119a3d5fdad93926f0e";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const weather_data = await fetch(URL).then(response => response.json());

    if (weather_data.cod === '404') {
        not_found.style.display = "flex";
        display.style.display = "none";
        return;
    }

    not_found.style.display = "none";
    display.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}<sup>°C</sup>`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    visibility.innerHTML = `${weather_data.visibility / 1000} Km`;
    humidity.innerHTML = `${weather_data.main.humidity} %`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/h`;

    const weatherMain = weather_data.weather[0].main;
    const gif = await getGifForWeatherCondition(weatherMain);
    weather_status.src = gif || "weather.png";
}

searchBtn.addEventListener('click', () => {
    weatherCheck(inputValue.value);
});
