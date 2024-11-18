async function napciklus() {
    const pontos = await fetch('http://api.geonames.org/timezoneJSON?lat=52.25&lng=5.75&username=halivagyok')
    const adat = await pontos.json()
    const napFelkelte = adat.sunrise.split(" ")
    const napLemente = adat.sunset.split(" ")
    return napFelkelte[1], napLemente[1]
}


async function idojaras(varos, imgHely, hoHely) {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
    const apiKey = "fbb6faf8f00c1f2f79d939fe03a9059b"
    
    //jenlegi ido
    var ido = new Date()
    var ora = ido.getHours() + ":" + ido.getMinutes()

    var { napFelkelte, napLemente} = await napciklus()
    const img = document.querySelector(imgHely)
    const valasz = await fetch(`${apiUrl}${varos}&appid=${apiKey}`)
    const adat = await valasz.json()

    document.querySelector(hoHely).innerHTML = `${Math.round(adat.main.temp)}°C`
    
    let iconSrc;
    switch (adat.weather[0].main) {
        case "Clear":
            iconSrc = ora <= napLemente && ora >= napFelkelte ? "img/icons/sun.png" : "img/icons/moon.png"
            break;
        case "Clouds":
                iconSrc = "img/icons/cloud.png"
            break;
        case "Rain":
            iconSrc = "img/icons/rain.png"
            break;
        case "Drizzle":
            iconSrc = "img/icons/rainy.png"
            break;
        default:
            iconSrc = "img/icons/sun.png"
    }
    img.src = iconSrc
}

function friss() {
    const most = new Date()
    var ora = String(most.getHours()).padStart(2, "0");
    var perc = String(most.getMinutes()).padStart(2, "0");
    document.querySelector(".clk").textContent = `${ora}:${perc}`
    const masodp = 60 - most.getSeconds()
    const milisc= masodp * 1000
    
    if(ora == 0.0 && perc == 0.0){
        frissites();
    } 
    setTimeout(friss, milisc);
}


//lekérés angol városnevekkel, hogy biztos ne legyen gond
async function frissites(){
    await idojaras("Amsterdam", ".ams_img", ".ams_ho")
    await idojaras("Rotterdam", ".rtd_img", ".rtd_ho")
    await idojaras("The Hague", ".hg_img", ".hg_ho")
    setInterval(frissites, 600000)
    friss()
}
frissites()