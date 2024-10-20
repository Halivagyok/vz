const apiKey = "fbb6faf8f00c1f2f79d939fe03a9059b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const kerDoboz = document.querySelector(".keres input");
const kerGomb = document.querySelector(".keres button");
const idoKep = document.querySelector(".ido-kep");

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
var ora = 4
console.log(time)

async function checkWeather(varos){
    const valasz = await fetch(apiUrl + varos + `&appid=${apiKey}`);
    var data = await valasz.json();
    console.log(data);

    document.querySelector(".varos").innerHTML = data.name;
    document.querySelector(".ho").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".para").innerHTML = data.main.humidity + "%";
    document.querySelector(".szel").innerHTML = Math.round(data.wind.speed) + " km/h";


    if(data.weather[0].main == "Clear"){
        if(ora <= 19 &&  ora >= 6){
            idoKep.src = "icons/sun.png";
        }
        else{
            idoKep.src = "icons/moon.png";
        }
    }
    else if(data.weather[0].main == "Clouds"){
        idoKep.src = "icons/sun.png";
    }
    else if(data.weather[0].main == "Rain"){
        idoKep.src = "icons/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        idoKep.src = "icons/rainy.png";
    }
    document.querySelector(".weather").style.display = "block";
}




checkWeather("kecskemet");
kerGomb.addEventListener("click", ()=>{
    checkWeather(kerDoboz.value);
});

