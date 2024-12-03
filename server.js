const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/api/ams', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const varos = "Amsterdam"
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${varos}&appid=${apiKey}`
    const get = await fetch(url)
    const adat = await get.json();
    res.json(adat)
})

app.get('/api/rtd', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const varos = "Rotterdam"
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${varos}&appid=${apiKey}`
    const get = await fetch(url)
    const adat = await get.json();
    res.json(adat);
})

app.get('/api/hg', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const varos = "The Hague"
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${varos}&appid=${apiKey}`
    const get = await fetch(url)
    const adat = await get.json();
    res.json(adat);
})

app.get("/api/user", async (req, res) => {
    const user = process.env.USER
    const url = `http://api.geonames.org/timezoneJSON?lat=52.25&lng=5.75&username=${user}`
    const get = await fetch(url)
    const adat = await get.json();
    res.json(adat)
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
