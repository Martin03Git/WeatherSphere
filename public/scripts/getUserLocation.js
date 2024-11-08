// Deletes the "dataSent" item from sessionStorage when the page is about to unload
window.addEventListener("beforeunload", () => {
  sessionStorage.removeItem("dataSent");
});

/* 
  This ensures that on page reload or revisit, the "dataSent" flag is removed,
  allowing the location request to be sent again if the page is revisited.
*/

// Sends user location and retrieves weather data when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // Check if geolocation is supported and "dataSent" flag is not set
  if (navigator.geolocation && !sessionStorage.getItem("dataSent")) {
    // Requests the user’s current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Retrieves latitude and longitude from the position object
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        // Sends user location data to the server
        fetch('/weather', {
          method: "POST",
          headers: {
            "Content-Type" : "application/json", // Specifies JSON content type
          },
          body: JSON.stringify({ latitude, longitude }), // Sends latitude and longitude as JSON
        })
        .then(response => response.text()) // Converts the server response to text
        .then(htmlContent => {
          // Logs confirmation of data sent to the console
          console.log('User location data has been sent to the server:', htmlContent);
          
          // Sets "dataSent" to "true" in sessionStorage to prevent re-sending data
          sessionStorage.setItem("dataSent", "true");

          // Clears the current document and writes the server response into it
          document.open();
          document.write(htmlContent);
          document.close();
        })
        .catch(error => console.log('Unable to send data to server', error)); // Logs any errors
      },
      (error) => {
        console.error("Unable to get user location", error); // Logs error if geolocation fails
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser!"); // Logs if geolocation isn't supported
  }
});
