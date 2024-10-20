const WApi = process.env.WeatherApi;
const Wurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="


//ido
async function nap(lat, lon){
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`
    const val = await fetch(url)
    const adat = await val.json()

    const napf = new Date(adat.results.sunrise)
    const napl = new Date(adat.results.sunrset)

}










//idojaras