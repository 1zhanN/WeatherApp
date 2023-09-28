
const apiKey = "70807926925d67e4033b761ebed61da4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const errorMessage = document.querySelector(".error")
const cardElement = document.querySelector(".card");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png"
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png"
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png"
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
    // Convert sunrise and sunset timestamps to milliseconds
    const sunriseTime = data.sys.sunrise * 1000;
    const sunsetTime = data.sys.sunset * 1000;	
    // Get the current time in milliseconds
    const currentTime = new Date().getTime();
    
    if (currentTime >= sunriseTime && currentTime < sunsetTime){
        cardElement.style.background = "linear-gradient(123deg, #f6d365, #fda085)";

    } 
    else {
        cardElement.style.background = "linear-gradient(123deg, #6a60ab, #0b0f3f)";
      }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);


})


