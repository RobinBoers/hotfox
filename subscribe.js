// This file renders a simple dropdown to let the user pick an
// RSS reader to subscribe to the feed. Nothing fancy.

const services = [
  { title: "Inoreader", url: "https://www.inoreader.com/search/feeds/{{URI}}" },
  { title: "Feedly", url: "http://www.feedly.com/home#subscription/feed/{{URI}}" },
  { title: "NewsBlur", url: "https://www.newsblur.com/?url={{URI}}" },
  { title: "My Yahoo", url: "https://add.my.yahoo.com/rss?url={{URI}}" },
  { title: "The Old Reader", url: "http://theoldreader.com/feeds/subscribe?url={{URI}}" },
  { title: "Feedbin", url: "https://feedbin.com/?subscribe={{URI}}" },
  { title: "WordPress", url: "https://wordpress.com/following/edit/?follow={{URI}}" },
  { title: "BazQux", url: "https://bazqux.com/add?url={{URI}}" },
  { title: "Rivered", url: "http://www.rivered.io/add?url={{URI}}" },
  { title: "Bloglovin", url: "https://www.bloglovin.com/search/{{URI}}" },
  { title: "Blogtrottr", url: "https://blogtrottr.com/?subscribe={{URI}}" },
  { title: "FeedHQ", url: "https://feedhq.org/subscribe/?feeds={{URI}}" },
]

const URLParams = new URLSearchParams(window.location.search);
const dropdown = document.getElementById("select-service");

const title = URLParams.get("title");
const url = URLParams.get("url");

document.querySelectorAll(".feed-title").forEach(element => {
  element.innerText = title;
});

services.forEach(service => {
  const entry = document.createElement("option");

  entry.innerText = service.title;
  entry.value = service.url.replace("{{URI}}", encodeURIComponent(url));

  dropdown.appendChild(entry)
});

dropdown.onchange = function() {
  window.open(dropdown.value);
  window.close();
}
