
async function napciklus() {
    const get = await fetch("http://localhost:3000/api/user")
    const adat = await get.json();
    const napFelkelte = adat.sunrise.split(" ")
    const napLemente = adat.sunset.split(" ")
    return napFelkelte[1], napLemente[1]
}


async function idojaras(adat) {
    //jenlegi ido
    var ido = new Date()
    var ora = ido.getHours() + ":" + ido.getMinutes()

    var { napFelkelte, napLemente} = await napciklus()
    console.log(adat);
    var hohely = `${Math.round(adat.main.temp)}°C`
    
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
    const getAms = await fetch("http://localhost:3000/api/ams")
    const jsonAms = await getAms.json()
    const ams = await idojaras(jsonAms)
    function loadAms(ams){
        document.querySelector(".ams_ho").innerHTML = ams.hohely
        document.querySelector(".ams_img").src = ams.iconSrc
    }

    //Rotterdam lekérés
    const getRtd= await fetch("http://localhost:3000/api/rtd")
    const jsonRtd = await getRtd.json()
    const rtd = await idojaras(jsonRtd)
    function loadRtd(rtd){
        document.querySelector(".rtd_ho").innerHTML = rtd.hohely
        document.querySelector(".rtd_img").src = rtd.iconSrc
    }

    //Hága lekérés
    const getHg = await fetch("http://localhost:3000/api/hg")
    const jsonHg = await getHg.json()
    const hg = await idojaras(jsonHg)
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