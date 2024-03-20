const dropdown = document.getElementById("dropdown");

doForCurrentTab((tab) => {
  const feeds = getFeedsForTab(tab.id);
  renderDropdown(feeds);
  maybeShowWarning();
});

function getFeedsForTab(tabID) {
  return JSON.parse(localStorage.getItem(tabID));
}

function renderDropdown(feeds) {
  if (feeds && feeds.length > 0) {
    feeds.forEach(renderItem);
  } else {
    showWarning("No feeds found on this page.");
  }
}

function renderItem({ title, url }) {
  const item = document.createElement("div");

  item.textContent = `Subscribe to '${title}'...`;
  item.className = "panel-list-item";

  item.onclick = function () {
    browser.runtime.sendMessage({ action: "subscribe", title, url });
  };

  dropdown.appendChild(item);
}

function maybeShowWarning() {
  const warning =
    "You didn't configure your reader yet. You can set your preferred RSS reader in the Add-on settings.";

  browser.storage.sync.get({ reader: null }).then(({ reader }) => {
    if (!reader) showWarning(warning);
  });
}

function showWarning(message) {
  dropdown.textContent = message;
  dropdown.style.maxWidth = "200px";
  dropdown.style.padding = ".7em";
}

function doForCurrentTab(callback) {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    callback(tabs[0]);
  });
}
