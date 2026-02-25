const API_KEY = "dba761ba3b0bdfdb3364590b98581039";

const input = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const tempEl = document.getElementById("temp");
const cityEl = document.getElementById("cityName");
const condEl = document.getElementById("condition");
const humEl = document.getElementById("humidity");
const windEl = document.getElementById("windSpeed");
const statusEl = document.getElementById("statusMsg");
const sunIcon = document.getElementById("weatherIcon");

async function getWeather(city) {
  if (!city.trim()) return;
  statusEl.textContent = "Fetching weather…";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`,
    );
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    console.log(data);
    tempEl.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
    cityEl.textContent = data.name;
    condEl.textContent = data.weather[0].description;
    humEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${(data.wind.speed * 3.6).toFixed(2)} km/h`;
    statusEl.textContent = "";
    const iconCode = data.weather[0].icon;
    sunIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png">`;

    // TODO: update weatherIcon based on data.weather[0].icon
  } catch (err) {
    statusEl.textContent = err.message;
  }
}

searchBtn.addEventListener("click", () => getWeather(input.value));
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather(input.value);
});
