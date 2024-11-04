import express from "express";
import axios from "axios";
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const app = express();
const PORT = process.env.PORT;

app.use(express.static("public"));
app.use(express.json()); //express middleware for parsing JSON
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const API_KEY = process.env.API_KEY;


// Get current day
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const day = new Date();

const date = {
  week: days,
  currentDay: days[day.getDay()],
  currentDate: day.getDate(),
  currentMonth: months[day.getMonth()],
  currentYear: day.getFullYear(),
};

app.get("/", (req, res) => {
  res.render('index');
});



app.post("/weather", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are not set" });
  }

  try {
    // fetch current weather data from OpenWeather API
    const currentWeatherForecast = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
    const currentWeatherInfo = currentWeatherForecast.data;
    

    // fetch 5 days weather forecast
    const fiveDaysForecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
    const fiveDaysWeatherInfo = fiveDaysForecast.data;
    const filteredFiveDaysWeatherInfo = fiveDaysWeatherInfo.list.filter(item => item.dt_txt.includes('12:00:00'));
    

    // fetch random quote from ZenQuotes API
    const quote = await axios.get('https://zenquotes.io/api/random');
    const dailyQuote = quote.data;
  
    res.render('dashboard', {
      date: date,
      dailyQuote: dailyQuote,
      currentWeather: currentWeatherInfo,
      fiveDaysForecast: filteredFiveDaysWeatherInfo,
    });

  } catch (error) {
    res.send( error.response.data );
  };

});

app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});
