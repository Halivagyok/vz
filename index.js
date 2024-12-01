
async function napciklus() {
    const getUserName = await fetch("http://localhost:3000/api/user")
    const jsonUser = await getUserName.json()
    const user = jsonUser.UserKey
    const pontos = await fetch(`http://api.geonames.org/timezoneJSON?lat=52.25&lng=5.75&username=${user}`)

    
    const adat = await pontos.json()
    const napFelkelte = adat.sunrise.split(" ")
    const napLemente = adat.sunset.split(" ")
    return napFelkelte[1], napLemente[1]
}


async function idojaras(varos) {
    const apiGetKey = await fetch("http://localhost:3000/api/weather-key")
    const jsonKey = await apiGetKey.json()
    const apiKey = jsonKey.apiKey

    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
    
    //jenlegi ido
    var ido = new Date()
    var ora = ido.getHours() + ":" + ido.getMinutes()

    var { napFelkelte, napLemente} = await napciklus()
    
    const valasz = await fetch(`${apiUrl}${varos}&appid=${apiKey}`)
    const adat = await valasz.json()
    const hohely = `${Math.round(adat.main.temp)}°C`
    
    let iconSrc
    switch (adat.weather[0].main) {
        case "Clear":
            iconSrc = ora <= napLemente && ora >= napFelkelte ? "img/icons/sun.png" : "img/icons/moon.png"
            break
        case "Clouds":
            iconSrc = "img/icons/cloud.png"
            break
        case "Rain":
            iconSrc = "img/icons/rain.png"
            break
        case "Drizzle":
            iconSrc = "img/icons/rainy.png"
            break
        default:
            iconSrc = "img/icons/sun.png"
    }
    
    return {hohely, iconSrc}
}

function friss() {
    const most = new Date()
    var ora = String(most.getHours()).padStart(2, "0")
    var perc = String(most.getMinutes()).padStart(2, "0")
    document.querySelector(".clk").textContent = `${ora}:${perc}`
    const masodp = 60 - most.getSeconds()
    const milisc= masodp * 1000
    
    if(ora == 0.0 && perc == 0.0){
        frissites()
    } 
    setTimeout(friss, milisc)}


//lekérés angol városnevekkel, hogy biztos ne legyen gond
async function frissites(){
    const path = window.location.pathname
    let pageName = path.substring(path.lastIndexOf('/') + 1).split(".")
    
    //Amszterdam lekérés
    var ams = await idojaras("Amsterdam")
    function loadAms(ams){
        document.querySelector(".ams_ho").innerHTML = ams.hohely
        document.querySelector(".ams_img").src = ams.iconSrc
    }

    //Rotterdam lekérés
    var rtd = await idojaras("Rotterdam")
    function loadRtd(rtd){
        document.querySelector(".rtd_ho").innerHTML = rtd.hohely
        document.querySelector(".rtd_img").src = rtd.iconSrc
    }

    //Hága lekérés
    var hg = await idojaras("The Hague")
    function loadHg(hg){
        document.querySelector(".hg_ho").innerHTML = hg.hohely
        document.querySelector(".hg_img").src = hg.iconSrc
    }

    //Amszterdam
    if(pageName[0] == "Ams"){
       loadAms(ams)
    }

    //Rotterdam
    else if(pageName[0] == "Rtd"){
        loadRtd(rtd)
    }

    //Hága
    else if(pageName[0] == "Hg"){
        loadHg(hg)
    }
    else{
        loadAms(ams)
        loadRtd(rtd)
        loadHg(hg)
    }
    setInterval(frissites, 600000)
}
friss()
frissites()