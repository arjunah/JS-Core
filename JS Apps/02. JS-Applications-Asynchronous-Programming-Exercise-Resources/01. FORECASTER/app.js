async function attachEvents() {
    const submit = document.getElementById("submit");
    const location = document.getElementById("location");
    const current = document.getElementById("current");
    const upcoming = document.getElementById("upcoming");
    const forecastContainer = document.getElementById("forecast");

    submit.addEventListener("click", getForecast);

    const locations = await fetch("https://judgetests.firebaseio.com/locations.json")
        .then(response => response.json())
        .catch(err => console.log(err));

    let currentForecast = document.createElement("div");
    currentForecast.classList.add("forecasts");
    let symbolSpan = document.createElement("span");
    symbolSpan.classList.add("symbol");
    let conditionSpan = document.createElement("span");
    conditionSpan.classList.add("condition");

    let forecastInfo = document.createElement("div");
    forecastInfo.classList.add("forecast-info");
    let upcomingSpan = document.createElement("span");
    upcomingSpan.classList.add("upcoming");
    
    const degrees = "&#176;";
    let symbol;

    async function getForecast() {
        [...locations].forEach(async (l) => {
            if (l.name === location.value) {
                forecastContainer.style.display = "block";
                await getCurrentWeather(l.code);
                get3DayForecast(l.code);
            }
        })
    }

    async function getCurrentWeather(location) {
        const { forecast, name } = await fetch(`https://judgetests.firebaseio.com/forecast/today/${location}.json`)
        .then(response => response.json())
        .catch(err => console.log(err));
        
        switch (forecast.condition) {
            case "Sunny": symbol = "&#x2600;"; break;
            case "Partly sunny": symbol = "&#x26C5;"; break;
            case "Overcast": symbol = "&#x2601;"; break;
            case "Rain": symbol = "&#x2614;"; break;
        }

        symbolSpan.innerHTML = symbol;

        current.appendChild(currentForecast);
        currentForecast.appendChild(symbolSpan);
        currentForecast.appendChild(conditionSpan);
        conditionSpan.innerHTML = `
            <span class="forecast-data">${name}</span>
            <span class="forecast-data">${forecast.low}${degrees}/${forecast.high}${degrees}</span>
            <span class="forecast-data">${forecast.condition}</span>
        `
    }

    async function get3DayForecast(location) {

        const { forecast } = await fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${location}.json`)
        .then(response => response.json())
        .catch(err => console.log(err));

        forecastInfo.innerHTML = "";
        upcoming.appendChild(forecastInfo);
        

        [...forecast].forEach(day => {

            switch (day.condition) {
                case "Sunny": symbol = "&#x2600;"; break;
                case "Partly sunny": symbol = "&#x26C5;"; break;
                case "Overcast": symbol = "&#x2601;"; break;
                case "Rain": symbol = "&#x2614;"; break;
            }
            
            const html = `
                <span class="symbol">${symbol}</sp>
                <span class="forecast-data">${day.low}${degrees}/${day.high}${degrees}</span>
                <span class="forecast-data">${day.condition}</span>
            `
            const cloneSpan = upcomingSpan.cloneNode();
            cloneSpan.innerHTML = html;
            forecastInfo.appendChild(cloneSpan);
        })
        
    }

}

attachEvents();