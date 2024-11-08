// Loads environment variables from a .env file, useful for storing sensitive information like API keys
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const path = require('path');

const app = express();
// Set the server port from environment variables, or default to 3000
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JavaScript, images, etc.) from the "public" folder
app.use(express.static("public"));

// Middleware to parse JSON in request bodies
app.use(express.json());

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Define the location of view templates
app.set('views', path.join(__dirname, 'views/'));

const API_KEY = process.env.API_KEY; // OpenWeather API key

// Define arrays for days and months
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const day = new Date();

const date = {
  week: days, // List of week day names
  currentDay: days[day.getDay()], // Get the name of the current day
  currentDate: day.getDate(), // Get today’s date number
  currentMonth: months[day.getMonth()], // Get the current month’s name
  currentYear: day.getFullYear(), // Get the current year
};

// Route for the homepage; renders the 'index.ejs' template
app.get("/", (req, res) => {
  res.render('index');
});

// POST route to handle requests for weather data, based on provided location coordinates
app.post("/weather", async (req, res) => {
  const { latitude, longitude } = req.body;

  // Validation: Return an error if latitude or longitude is missing
  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are not set" });
  }

  try {
    // Fetch current weather data from OpenWeather API using coordinates
    const currentWeatherForecast = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
    const currentWeatherInfo = currentWeatherForecast.data; // Store the current weather data

    // Fetch a 5-day weather forecast from OpenWeather API
    const fiveDaysForecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
    const fiveDaysWeatherInfo = fiveDaysForecast.data;

    // Filter forecast data for 12:00 PM each day for a daily snapshot
    const filteredFiveDaysWeatherInfo = fiveDaysWeatherInfo.list.filter(item => item.dt_txt.includes('12:00:00'));

    // Fetch a random quote from the ZenQuotes API
    const quote = await axios.get('https://zenquotes.io/api/random');
    const dailyQuote = quote.data;

    // Render the 'dashboard.ejs' page with all gathered data
    res.render('dashboard', {
      date: date,
      dailyQuote: dailyQuote,
      currentWeather: currentWeatherInfo,
      fiveDaysForecast: filteredFiveDaysWeatherInfo,
    });

  } catch (error) {
    // Handle errors from API requests and respond with the error data
    res.send(error.response.data);
  }
});

// Start the server on the specified port
app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});
