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
                    console.log(baseURL);
                    document.querySelector('[data-temp]').textContent = Math.round(weatherData.main.temp) + 'ºC';
                    document.querySelector('[data-sky]').textContent = weatherData.weather[0].description;
                    document.querySelector('[data-city]').textContent = weatherData.name;
                    document.querySelector('[data-country]').textContent = weatherData.sys.country;
                    document.querySelector('[data-humidity]').textContent = `${weatherData.main.humidity}%`;
                    document.querySelector('[data-wind]').textContent = `${weatherData.wind.speed}m/s`;
                    document.querySelector('[data-wind-direction]').style.transform = `rotate(${weatherData.wind.deg}deg)`;
                    document.querySelector('[data-visibility]').textContent = `${+weatherData.visibility/1000}km`;
                    setTimeout(() => {
                        loader.classList.toggle('loader__hide');
                    }, 1000);
                },
                err => {
                    alert('Geolocalization denied or not supported ⚠️');
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
