const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(cors());

// Route to get the OpenWeather API key
app.get('/api/weather-key', (req, res) => {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key not set in environment variables' });
    }

    res.json({ apiKey });
});

app.get("/api/user", (req, res) => {
    const UserKey = process.env.USER
    if (!UserKey) {
        return res.status(500).json({ error: 'API key not set in environment variables' });
    }

    res.json({ UserKey });
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
