const apiKey = "c7fa4f8124794acbbaf40621261603";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherBox = document.getElementById("weatherResult");
const historyBox = document.getElementById("history");
const consoleBox = document.getElementById("consoleLog");

function log(message) {
    console.log(message);
    consoleBox.innerHTML += message + "<br>";
}

log("Sync Start");

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {
        return;
    }

    getWeather(city);

});

log("Sync End");

async function getWeather(city) {

    log("[ASYNC] Start fetching");

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {

        const response = await fetch(url);

        Promise.resolve().then(() => {
            log("Promise.then (Microtask)");
        });

        setTimeout(() => {
            log("setTimeout (Macrotask)");
        }, 0);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

        saveHistory(city);

        log("[ASYNC] Data received");

    } catch (error) {

        weatherBox.innerHTML = `<p style="color:red">City not found</p>`;

    }

}

function displayWeather(data) {

    const city = data.location.name + ", " + data.location.country;
    const temp = data.current.temp_c + " °C";
    const weather = data.current.condition.text;
    const humidity = data.current.humidity + "%";
    const wind = data.current.wind_kph + " m/s";

    weatherBox.innerHTML = `
        <div class="row"><b>City</b> <span>${city}</span></div>
        <div class="row"><b>Temp</b> <span>${temp}</span></div>
        <div class="row"><b>Weather</b> <span>${weather}</span></div>
        <div class="row"><b>Humidity</b> <span>${humidity}</span></div>
        <div class="row"><b>Wind</b> <span>${wind}</span></div>
    `;

}

function saveHistory(city) {

    let history = JSON.parse(localStorage.getItem("cities")) || [];

    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem("cities", JSON.stringify(history));
    }

    showHistory();

}

function showHistory() {

    historyBox.innerHTML = "";

    const history = JSON.parse(localStorage.getItem("cities")) || [];

    history.forEach(city => {

        const btn = document.createElement("button");

        btn.textContent = city;

        btn.classList.add("history-btn");

        btn.onclick = () => {
            cityInput.value = city;
            getWeather(city);
        };

        historyBox.appendChild(btn);

    });

}

window.onload = showHistory;