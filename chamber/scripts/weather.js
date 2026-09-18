// Replace with your own OpenWeatherMap API key
const apiKey = "d71b5b087eb9678cb857d2744075462d";
const lat = -4.2634;
const lon = 15.2429;

async function getCurrentWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error("Error fetching current weather:", error);
    }
}

function displayCurrentWeather(data) {
    const container = document.querySelector("#current-weather");
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    container.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}" width="60" height="60">
        <p class="temp">${temp}&deg;C</p>
        <p class="description">${description}</p>
    `;
}

async function getForecast() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        displayForecast(data.list);
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
}

function displayForecast(list) {
    const container = document.querySelector("#forecast");
    container.innerHTML = "";

    // one entry per day, taken near midday
    const dailyEntries = list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    dailyEntries.forEach(entry => {
        const date = new Date(entry.dt * 1000);
        const dayName = dayNames[date.getDay()];
        const temp = Math.round(entry.main.temp);

        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.innerHTML = `
            <p class="day-name">${dayName}</p>
            <p class="day-temp">${temp}&deg;C</p>
        `;
        container.appendChild(dayDiv);
    });
}

getCurrentWeather();
getForecast();