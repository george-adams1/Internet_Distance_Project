chrome.runtime.onInstalled.addListener(({ reason, version }) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
      showReadme();

      var initialDistance = 0;
      chrome.storage.sync.set({key: totalDistanceTraveled}, function() {
        console.log('On install, value is set to ' + initialDistance);
      }); 
    }
  })

  chrome.tabs.onUpdated.addListener(function (id, info, tab) {
    if (tab.status === 'loading') {

      fetch("https://ipinfo.io/json?d06fb76a59e1a7")
    .then((res) => res.json())
    .then((data) => {
      console.log(data)

      });

    }
  })


  function showReadme(info, tab) {
    let url = chrome.runtime.getURL("readme.html");
    chrome.tabs.create({ url });
  }


