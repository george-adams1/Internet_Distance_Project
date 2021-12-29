$(document).ready(function () {

    if (navigator.userAgent.match(/bot|spider/i)) {
        // Request is a bot, do nothing
    } else { // If its not a bot


        // Checks for localstorage (caching to avoid hitting the number of API requests)
        if (localStorage.getItem('ip')) {
            document.write(`<h1>${data.ip}</h1>`)
            document.write(`<h1>FROM LOCALSTORAGE</h1>`)
        } else {  // No data in localstorage
            fetch('https://ipinfo.io/json?d06fb76a59e1a7')
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('ipinfo', data.ip)
                    console.log("Res", data)
                    document.write(`<h1>${data.ip}</h1>`)



                    // set endpoint and your access key
                   // var ip = '134.201.250.155'
                    var ip = 'google.com'

                    var access_key = '433fd5409b6be57f5516bf15c8af09e4';

                    // get the API result via jQuery.ajax
                    // STILL NEED TO UPDATE THIS
                    $.ajax({
                        url: 'https://api.ipapi.com/' + ip + '?access_key=' + access_key,
                     //   url: 'https://api.ipapi.com/google.com?access_key=433fd5409b6be57f5516bf15c8af09e4'

                        dataType: 'jsonp',
                        success: function (json) {

                            // output the "calling_code" object inside "location"
                            // alert(json.location.calling_code);

                            document.write(`<h2>${json.location.calling_code}</h2>`)

                        }
                    });
                })
        }
    }

});



/*  $.get('https://ipinfo.io/json?d06fb76a59e1a7', function(data) {
    console.log("Res", data)
    document.write(`<h1>${data.ip}</h1>`)
}) */