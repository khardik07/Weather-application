let cityInput = document.getElementById('city_input'),
searchBtn = document.getElementById('searchBtn');
const apiKey = "23283e0813d6d0a757ecf65aa678f26b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
let currentWeatherCard = document.querySelectorAll('.weather-left .card')[0];

function getWeatherDetails(name, lat, lon, country) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date();

    fetch(`${apiUrl}${name}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            currentWeatherCard.innerHTML = `
                <div class="current-weather">
                    <div class="details">
                        <p>Now</p>
                        <h2>${data.main.temp.toFixed(2)}&deg;C</h2>
                        <p>${data.weather[0].description}</p>
                    </div>
                    <div class="weather-icon">
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                    </div>
                </div>
                <hr>
                <div class="card-footer">
                    <p><i class="fa-light fa-calendar"></i> ${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}</p>
                    <p><i class="fa-light fa-location-dot"></i>${name}, ${country}</p>
                </div>
            `;
        })
        .catch(() => {
            alert('Failed to fetch current weather');
        });
}

function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if (!cityName) return;

    const GEOCODING_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(GEOCODING_API_URL)
        .then(res => res.json())
        .then(data => {
            let { name, coord: { lat, lon }, sys: { country } } = data;
            getWeatherDetails(name, lat, lon, country);
        })
        .catch(() => {
            alert(`Failed to fetch coordinates of ${cityName}`);
        });
}

searchBtn.addEventListener('click', getCityCoordinates);
