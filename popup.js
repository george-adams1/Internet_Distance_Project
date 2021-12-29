chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

    var tab = tabs[0];
    var url = new URL(tab.url)
    var domain = url.hostname    // `domain` now has a value like 'example.com'


    var identifyIP = "https://ident.me"
    document.write(`<h1>${identifyIP}</h1>`)

    let request = new XMLHttpRequest();
    request.open("GET", identifyIP);
    request.send();
    request.onload = () => {
        document.write(`<h1>${request}</h1>`)
        if(request.status === 200) {
            document.write(`<h1>${request.response}</h1>`) 
        } else {
            document.write(`<h1>ERROR: ${request.status}, ${request.statusText}</h1>`) 

        }
        
    }

    // https://ipinfo.io/json?token=d06fb76a59e1a7


    // need to use Geolocation Data
     $(document).ready(function() {
        // all custom jQuery will go here
        console.log("DOCU EXE")
    });

    $.get('https://ipinfo.io/json?d06fb76a59e1a7', function(data) {
        console.log("Res", data)
    }) 


    var apiCall = "http://nominatim.openstreetmap.org/reverse?json_callback=cb&format=json&lat=-23.56320001&lon=-46.66140002&zoom=27&addressdetails=1";


 
}
)



