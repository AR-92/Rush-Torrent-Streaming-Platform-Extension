console.log("back ground")
chrome.browserAction.onClicked.addListener(function(tab) {
console.log("back ground tab",tab)

    chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url.indexOf(chrome.extension.getURL('index.html')) == 0) {
        console.debug('Found Rush Tab');
        chrome.tabs.update(tab.id, {selected: true});
        return;
      }
    }
    console.debug('Could not find Rush tab. Creating one...');
    chrome.tabs.create({url: chrome.extension.getURL('index.html')});
  });
});