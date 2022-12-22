let activeNumber = 917870565464

// Fetching User Address Sucessfully by using Open Cage Reverse Geocoding API

function fetchLocation(){

  const successfulLookup = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c2b866cbbf784197830fa18ed8445727`)
      .then(response => response.json())
      .then(data => {
        // alert(data.results[0].formatted)
        // document.querySelector(".allow").innerText = data.results[0].formatted

        let location = data.results[0].formatted;
        
        

        let callAmbulance = document.querySelectorAll(".call")
        for (let i=0; i < callAmbulance.length; i++) {
          let text = callAmbulance[i].innerText
          let combined = "Please send " + text + " at " + location
          let attachLocation = combined.replace(/ /g, "%20")
          let whatsappMsg = (`https://wa.me/${activeNumber}?text=${attachLocation}`)
          callAmbulance[i].href=whatsappMsg
          }
        document.querySelector(".initiate").style.display = "none"
        document.querySelector(".display").style.display = "block";

      });
  };

  const errorCallback = (error) => {
    alert("Unable to Fetch Your Location, Kindly Give Your Location access first!!")
  };

  window.navigator.geolocation
    .getCurrentPosition(successfulLookup, errorCallback);

}



let callAmbulance = document.querySelector(".call-btn");
callAmbulance.addEventListener("click", fetchLocation)
