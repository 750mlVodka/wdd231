const weatherSection = document.querySelector('.weather ul')
const forecastSection = document.querySelector('.forecast ul')

const apiKey = 'a9d27d957846390b0fb35a4a9c48bf56';
const city = 'cuautla';
const units = 'imperial';

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

async function getWeather() {
    try {
        // === Current Weather ===
        const response = await fetch(weatherUrl);
        const data = await response.json();

        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const high = Math.round(data.main.temp_max);
        const low = Math.round(data.main.temp_min);
        const humidity = data.main.humidity;

        // Sunrise & Sunset
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
        });
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
        });

        weatherSection.innerHTML = `
            <li><strong>${temp}</strong>°F</li>
            <li>${desc}</li>
            <li>High: ${high}°</li>
            <li>Low: ${low}°</li>
            <li>Humidity: ${humidity}%</li>
            <li>Sunrise: ${sunrise}</li>
            <li>Sunset: ${sunset}</li>
    `;

        // === Forecast ===
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        const daily = [];
        forecastData.list.forEach(item => {
            if (item.dt_txt.includes("12:00:00")) {
                daily.push(item);
            }
        });

        forecastSection.innerHTML = daily.slice(0, 3).map(day => {
            const date = new Date(day.dt_txt);
            const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
            const temp = Math.round(day.main.temp);
            return `<li>${weekday}: <strong>${temp}°F</strong></li>`;
        }).join("");

    } catch (err) {
        console.error("Weather fetch error:", err);
        weatherSection.innerHTML = "<li>Error loading weather</li>";
        forecastSection.innerHTML = "<li>Error loading forecast</li>";
    }
}

getWeather();

// async function getWeather() {
//     try {
//         // Current Weather
//         const response = await fetch(weatherUrl);
//         const data = await response.json();

//         const temp = Math.round(data.main.temp);
//         const desc = data.weather[0].description;
//         const high = Math.round(data.main.temp_max);
//         const low = Math.round(data.main.temp_min);
//         const humidity = data.main.humidity;

//         weatherSection.innerHTML = `
//         <h2>Current Weather</h2>
//                 <span>Img</span>
//                 <ul>
//                     <li>${temp}°F</li>
//                     <li>${desc}</li>
//                     <li>High: ${high}°F</li>
//                     <li>Low: ${low}°F</li>
//                     <li>Humidity: ${humidity}%</li>
//                     <li>Sunrise: 7:30am</li>
//                     <li>Sunset: 9:59pm</li>
//                 </ul>
//     `;

//         // Forecast
//         const forecastResponse = await fetch(forecastUrl);
//         const forecastData = await forecastResponse.json();

//         const daily = [];
//         forecastData.list.forEach(item => {
//             if (item.dt_txt.includes("12:00:00")) {
//                 daily.push(item);
//             }
//         });

//         forecastSection.innerHTML = `


// getWeather();