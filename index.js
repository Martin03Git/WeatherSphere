import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3100;

app.use(express.static("public"));

const APIKey = "";
const latitude = "44.34";
const longitude = "10.99";

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

app.get("/", async (req, res) => {
  try {
    // fetch current weather data from OpenWeather API
    const currentWeatherForecast = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`);
    const currentWeatherInfo = currentWeatherForecast.data;
    // console.log(weatherInfo.weather[0].icon); 

    // fetch 5 days weather forecast
    const fiveDaysForecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`);
    const fiveDaysWeatherInfo = fiveDaysForecast.data;
    const filteredFiveDaysWeatherInfo = fiveDaysWeatherInfo.list.filter(item => item.dt_txt.includes('12:00:00'));
    // console.log(filteredFiveDaysWeatherInfo[1]);
  
    res.render("index.ejs", {
      date: date,
      currentWeather: currentWeatherInfo,
      fiveDaysForecast: filteredFiveDaysWeatherInfo,
    });

  } catch (error) {
    res.send( error.response.data );
  };

});

app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});