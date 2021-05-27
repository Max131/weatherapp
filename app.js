'use strict';
const loader = document.querySelector('.loader');
const getLocationWeather = async () => {
	try{
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                async pos => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    const API_KEY = '692dc59d5191d0c6036a4c3712840bc3';
                    const weatherIconURL = 'https://openweathermap.org/img/wn/';
                    const baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
                    const data = await fetch(baseURL);
                    const weatherData = await data.json();
                    //console.log(weatherData);
										console.log(baseURL);
                    document.querySelector('.temp-icon').setAttribute('src', weatherIconURL + weatherData.weather[0].icon + '@2x.png');
                    document.querySelector('.weather-temp').textContent = Math.round(weatherData.main.temp) + 'ºC';
                    document.querySelector('.weather-description').textContent = weatherData.weather[0].description;
                    document.querySelector('.city').textContent = weatherData.name;
                    document.querySelector('.country').textContent = weatherData.sys.country;
                    document.querySelector('.min-temp').textContent = Math.round(weatherData.main.temp_min) + 'ºC';
                    document.querySelector('.feels').textContent = Math.round(parseFloat(weatherData.main.feels_like)) + 'ºC';
                    document.querySelector('.max-temp').textContent = Math.round(weatherData.main.temp_max) + 'ºC';
                    setTimeout(() => {
                        loader.classList.toggle('loader--hidden');
                    }, 1500);
                },
                err => {
                    throw(err);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000
                }
            );
        }
        else{
            throw('Geolocation no supported');
        }

        
	}
	catch(err){
		console.log(err);
	}
};

getLocationWeather();
