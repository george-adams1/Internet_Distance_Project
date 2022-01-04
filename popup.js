chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var tab = tabs[0];
  var url = new URL(tab.url);
  var domain = url.hostname; // `domain` now has a value like 'example.com'
  console.log(url);

  // display current domain
  var domainUI = document.getElementById("userDomain");


  var ipAddressUI = document.getElementById("userIp");
  var locationUI = document.getElementById("userLocation");

  var serverIpUI = document.getElementById("serverIp");
  var distanceUI = document.getElementById("distance");

  var totalDistanceUI = document.getElementById("totalDistance");

  // fetch user ip info
  fetch("https://ipinfo.io/json?d06fb76a59e1a7")
    .then((res) => res.json())
    .then((data) => {
      console.info(JSON.stringify(data));

      // display user ip address
      var ip = data.ip;
     // console.log(ip);
     

      var city = data.city;
      var region = data.region;
      var country = data.country;

      var location = city + ", " + region + ", " + country;
     

      var totalDistanceTraveled = 0;

      chrome.storage.sync.get(['key'], function(result) {
        console.log('Value currently is ' + result.key);
        totalDistanceTraveled  = result.key;
      });

      // https://internet-distance.herokuapp.com/IP/24.50.91.241/apple.com

      fetch(`https://internet-distance.herokuapp.com/IP/${ip}/${domain}`)
        .then((res) => res.json())
        .then((data) => {

         // console.info(JSON.stringify(data));
          var serverIp = data.server_IP;
          var distance = data.distance;
          
          var newTotalDistanceTraveled = parseFloat(totalDistanceTraveled + distance).toFixed(2);
          
          let conversion = 0.621371;
          var distanceInMiles = parseInt(distance) * conversion;
          var totalDistance = parseFloat(newTotalDistanceTraveled);
          var totalDistanceInMiles = parseFloat(totalDistance) * conversion;
          
          chrome.storage.sync.set({key: totalDistance}, function() {
            console.log('Value is set to ' + totalDistance);
          }); 
    
          domainUI.innerText = domain;
          ipAddressUI.innerText = ip;
          locationUI.innerText = location;
          serverIpUI.innerText = serverIp;
          distanceUI.innerText = `${distanceInMiles.toFixed(2)} mi / ${distance} km`;
          totalDistanceUI.innerText = `${totalDistanceInMiles.toFixed(2)} mi / ${totalDistance.toFixed(2)} km`
        });

     
    });
});
