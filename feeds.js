const dropdown = document.getElementById("dropdown");
const extensionPageURL = browser.runtime.getURL("subscribe.html");

doForCurrentTab(tab => {
  const feeds = getFeedsForTab(tab.id)
  renderDropdown(feeds);
})

function getFeedsForTab(tabID) {
  return JSON.parse(localStorage.getItem(tabID));
}

function renderDropdown(feeds) {
  if (feeds && feeds.length > 0) {
    feeds.forEach(renderItem);
  } else {
    dropdown.textContent = "No feeds found on this page.";
  }
}

function renderItem({ title, url }) {
  const item = document.createElement("div");
  
  item.textContent = `Subscribe to '${title}'...`;
  item.className = "panel-list-item";

  item.onclick = function() {
    const params = `title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

    browser.windows.create({
      type: `panel`,
      url: `subscribe.html?${params}`,
      width: 200,
      height: 50,
    });
  }

  dropdown.appendChild(item);
}

function doForCurrentTab(callback) {
  browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    callback(tabs[0])
  });
}
