let cityInput = document.getElementById('city_input'),
searchBtn = document.getElementById('searchBtn'),
api_key = '23283e0813d6d0a757ecf65aa678f26b',
currentWeatherCard=document.querySelectorAll('.weather-left .card')[0]; 
function  getWeatherDetails(name, lat, lon, country, state){
 let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=23283e0813d6d0a757ecf65aa678f26b`,
 WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=23283e0813d6d0a757ecf65aa678f26b`,
 days = [
   'Sunday',
   'Monday',
   'Tuesday',
   'wednesday',
   'Thursday',
   'Friday',
   'Saturday'
 ],
 months = [
   'Jan',
   'Feb',
   'Mar',
   'Apr',
   'May',
   'Jun',
   'Jul',
   'Aug',
   'Sep',
   'Oct',
   'Nov',
   'Dec'
 ];
 fetch(WEATHER_API_URL).then(res => res.json()).then(data =>{
let date =new Date();
currentWeatherCard.innerHTML=`
<div class="current-weather">
                        <div class="details">
                            <p>Now</p>
                            <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;</h2>
                            <p>${data.weather[0].description}</p>
                        </div>
                        <div class="weather-icon">
                            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                        </div>
                    </div>
                    <hr>
                    <div class="card-footer">
                        <p><i class="fa-light fa-calendar"></i> ${days[date.getDay()]}, ${date.getDate()}, ${date.getMonth()}, ${date.getFullYear()}</p>
                        <p><i class="fa-light fa-location-dot"></i>${name}, ${country}</p>
                    </div>
`;
 }).catch(() => {
   alert('Failed to fetch current weather');
 });
}
function getCityCoordinates(){
    let cityName=cityInput.value.trim();
   cityInput.value='';
   if(!cityName) return;
   let GEOCODING_API_URL_ = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=23283e0813d6d0a757ecf65aa678f26b`;
   fetch(GEOCODING_API_URL_).then(res => res.json()).then(data =>{
     let {name, lat, lon, country, state} = data[0];
     getWeatherDetails(name, lat, lon, country, state);
   }).catch(() =>{
    alert(`Failed to fetch coordinates of ${cityName}`)
   }); 
}

searchBtn.addEventListener('click', getCityCoordinates);

