document.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation && !sessionStorage.getItem("dataSent")) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        console.log(latitude);
  
        // send user location to server
        fetch('/weather', {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({latitude, longitude}),
        })
        .then(response => response.text())
        .then(htmlContent => {
          console.log('User location data has been sent to the server : ', htmlContent);
          sessionStorage.setItem("dataSent", "true");
          document.open();
          document.write(htmlContent);
          document.close();
        })
        .catch(error => console.log('Unable to send data to server', error));
      },
      (error) => {
        console.error("Unable to get user location", error);
      }
    );
  } else {
    console.log("Geolocation tidak didukung oleh browser ini!");
  }

});
