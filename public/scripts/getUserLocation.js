// Sends user location and retrieves weather data when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // Prevent running this script if we are already on the dashboard to avoid loops
  if (window.location.pathname.includes('/weather')) {
    return;
  }

  // Check if geolocation is supported and "dataSent" flag is not set
  if (navigator.geolocation && !sessionStorage.getItem("dataSent")) {
    // Requests the user’s current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Retrieves latitude and longitude from the position object
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Sets "dataSent" to "true" in sessionStorage to prevent re-sending data
        sessionStorage.setItem("dataSent", "true");

        // Redirects the user to the /weather endpoint with query parameters
        window.location.href = `/weather?latitude=${latitude}&longitude=${longitude}`;
      },
      (error) => {
        console.error("Unable to get user location", error); // Logs error if geolocation fails
        alert("Unable to retrieve your location. Please allow location access to see the weather.");
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser!"); // Logs if geolocation isn't supported
  }
});
