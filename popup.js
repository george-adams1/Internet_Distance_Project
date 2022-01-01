chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var tab = tabs[0];
  var url = new URL(tab.url);
  var domain = url.hostname; // `domain` now has a value like 'example.com'

  // display current domain
  var domainUI = document.getElementById("userDomain");
  domainUI.innerText = domain;

  var ipAddressUI = document.getElementById("userIp");
  var locationUI = document.getElementById("userLocation");

  var totalDistanceUI = document.getElementById("totalDistance");


  var totalDistanceTraveled = 0;

  // fetch user ip info
  fetch("https://ipinfo.io/json?d06fb76a59e1a7")
    .then((res) => res.json())
    .then((data) => {
       console.info(JSON.stringify(data));

      // display user ip address
      var ip = data.ip;
      console.log(ip);
      ipAddressUI.innerText = ip;
     
      var city = data.city;
      var region = data.region;
      var country = data.country;

      var location = city + ", " + region + ", " + country;
        locationUI.innerText = location;


        // NEED TO WORK ON TOTAL DISTANCE ACCUMULATED
        // hardcoded for reference
        var distance = 100;
        totalDistanceTraveled += distance;
       // totalDistanceUI.innerText = totalDistanceTraveled;


       let totalDistance = parseInt(window.localStorage.getItem("distance"));
       console.log(totalDistance);

       totalDistance += distance;

       console.log(totalDistance);

       window.localStorage.setItem("distance", totalDistance);
     
      

        

        // RETRIEVE SERVER IP, LOCATION, AND CALCULATE DISTANCE

        // ADDTIONAL FEATURE: ADD A MAP
    });

   

});
