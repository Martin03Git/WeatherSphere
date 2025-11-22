WeatherSphere
WeatherSphere is a personal project built to explore and demonstrate skills in building interactive web applications. It fetches, manages, and displays live weather data from an external API, allowing users to view accurate weather forecasts based on their current location.

Features
- Current Weather Forecast: Provides real-time weather information based on the user's location.
- 5-Day Weather Forecast: Displays a 5-day weather forecast with midday temperature predictions.
- Daily Inspirational Quotes: Fetches a random quote to provide daily motivation.
- Responsive UI: Designed with CSS Flexbox and Grid to adapt across devices.

Technologies Used
- HTML/CSS: Structure and styling of the web interface.
- JavaScript (Client-side): Fetches and manages data from APIs.
- Node.js & Express.js: Backend server to handle API requests and render views.
- EJS: Templating engine for rendering dynamic HTML.
- OpenWeather API: Provides real-time weather and forecast data.
- ZenQuotes API: Fetches a daily inspirational quote.
- Browser Geolocation API: Requests and utilizes user location for accurate weather forecasts.
- Git & GitHub: Version control and collaboration tools for managing project changes.

Learning Highlights
Through this project, the following concepts and techniques were explored and developed:
- Making API requests, processing JSON data, and rendering it on the web.
- Utilizing Geolocation for personalized data fetching based on user input.
- Implementing Git for version control and collaboration.
- Creating responsive layouts with CSS Flexbox and Grid.


Installation & Setup
Clone the Repository:
- git clone https://github.com/Martin03Git/WeatherSphere.git
- cd weather-sphere

Install Dependencies: Make sure you have Node.js installed, then run:
- npm install

Environment Variables: Create a .env file in the root directory and add your OpenWeather API key your PORT:
- API_KEY=your_openweather_api_key
- PORT=3000

Run the Server:
- node index.js

View the App: Open your browser and navigate to http://localhost:3000.

Usage
On loading, the app requests user permission for geolocation data. If accepted, it displays the current weather and a 5-day forecast. Users can also read a random quote on each visit.

Folder Structure
- public/: Static files (CSS, JavaScript).
- views/: EJS templates for rendering HTML.
- index.js: Main server file.

Future Enhancements
- Adding features for selecting and displaying weather for different locations.
- Enhancing the UI with animations and transitions.
- Implementing caching for faster load times.