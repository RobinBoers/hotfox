// This script talks to the content script,
// and depending on whether the page has RSS feeds,
// shows the page action. It saves the feeds to localStorage
// that the popup JS can then read.

// Show button on initial load
browser.runtime.onMessage.addListener(maybeShowSubscribeButton);

// Open subscribe box when asked to.
browser.runtime.onMessage.addListener(({ action, url }, sender, response) => {
  if (action == "subscribe") {
    openReader(url);
  }
});

function openReader(feedURL) {
  return new Promise((resolve, reject) => {
    browser.storage.sync.get({ reader: null }).then(({ reader: reader }) => {
      if (reader) {
        const url = reader.replace("{{URI}}", encodeURIComponent(feedURL));
        browser.tabs.create({ url });

        resolve();
      } else {
        reject();
      }
    });
  });
}

// Show button after switching tabs
browser.tabs.onActivated.addListener((tabInfo) => {
  const discoveredFeeds = browser.tabs.sendMessage(tabInfo.tabId, "findFeeds");
  discoveredFeeds.then(maybeShowSubscribeButton);
});

function maybeShowSubscribeButton({ action, feeds }) {
  if (action != "show") return;

  doForCurrentTab((tab) => {
    if (feeds && feeds.length > 0) {
      storeFeedsForPopup(tab.id, feeds);
      chrome.pageAction.show(tab.id);
    } else {
      chrome.pageAction.hide(tab.id);
    }
  });
}

function storeFeedsForPopup(tabID, feeds) {
  localStorage.setItem(tabID, JSON.stringify(feeds));
}

function doForCurrentTab(callback) {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    callback(tabs[0]);
  });
}
