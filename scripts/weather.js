const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.querySelector('figcaption');
const townName = document.getElementById('townName');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.77&lon=6.64&units=metric&appid=d71b5b087eb9678cb857d2744075462d';
async function apiFetch (){
    try{
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // currentTemp.textContent = data;
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }  
    } catch (error){
        console.log(error);
    }
}

function displayResults (data){
    townName.innerHTML = data.name;
    // captionDesc.innerHTML = data.weather[0].description;
    currentTemp.innerHTML = `${data.main.temp}&deg:F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', 'data.weather[0].description');
}

apiFetch();