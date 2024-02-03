function discoverFeeds() {
  let links = document.querySelectorAll('link[rel="alternate"][type^="application/"]')
  let feeds = Array.from(links).map(link => {
    const href = link.getAttribute("href");
    return { title: link.title || href, url: href }
  });

  return feeds;
}

const feeds = discoverFeeds();

browser.runtime.sendMessage({ action: "show", feeds });
browser.runtime.onMessage.addListener((message, sender, response) => {
  if (message !== "findFeeds") return;
  response({ action: "show", feeds })
});
