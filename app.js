const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const WeatherBox = document.querySelector(".weather-box");
const WeatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector('.not-found');

search.addEventListener("click", async () => {
    const APIkey = 'c1be2d1cc71bf32297e8a51db9e9bb1d';
    const city = document.querySelector(".search-box input").value;
    if (city == '') return;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`);
        const json = await response.json();
        
        if (json.cod == '404') {
            container.style.height = '400px';
            WeatherBox.classList.remove('active'); 
            WeatherDetails.classList.remove('active');  
            error404.classList.add('active');  
            return;
        }

        container.style.height = '555px';
        WeatherBox.classList.add('active'); 
        WeatherDetails.classList.add('active');  
        error404.classList.remove('active');  

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temprature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'clear.png';
                break;
            case 'Rain':
                image.src = 'rain.png';
                break;
            case 'Snow':
                image.src = 'snow.png';
                break;
            case 'Clouds':
                image.src = 'cloud.png';
                break;
            case 'Mist':
            case 'Haze':
            case 'Smoke':
                image.src = 'mist.png';
                break;
            default:
                image.src = 'cloud.png';
        }
          
        temperature.innerHTML = `${parseInt(json.main.temp-273.15)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        wind.innerHTML = `${json.wind.speed} Km/hr`;
        humidity.innerHTML = `${json.main.humidity}%`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
});