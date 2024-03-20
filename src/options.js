const services = [
  { title: "Inoreader", url: "https://www.inoreader.com/search/feeds/{{URI}}" },
  {
    title: "Feedly",
    url: "http://www.feedly.com/home#subscription/feed/{{URI}}",
  },
  { title: "NewsBlur", url: "https://www.newsblur.com/?url={{URI}}" },
  { title: "My Yahoo", url: "https://add.my.yahoo.com/rss?url={{URI}}" },
  {
    title: "The Old Reader",
    url: "http://theoldreader.com/feeds/subscribe?url={{URI}}",
  },
  { title: "Feedbin", url: "https://feedbin.com/?subscribe={{URI}}" },
  {
    title: "WordPress",
    url: "https://wordpress.com/following/edit/?follow={{URI}}",
  },
  { title: "BazQux", url: "https://bazqux.com/add?url={{URI}}" },
  { title: "Rivered", url: "http://www.rivered.io/add?url={{URI}}" },
  { title: "Bloglovin", url: "https://www.bloglovin.com/search/{{URI}}" },
  { title: "Blogtrottr", url: "https://blogtrottr.com/?subscribe={{URI}}" },
  { title: "FeedHQ", url: "https://feedhq.org/subscribe/?feeds={{URI}}" },
  { title: "Custom", url: "custom" },
];

const dropdown = document.getElementById("select-service");
const custom = document.getElementById("custom-service");
const submit = document.getElementById("save-service");

services.forEach((service) => {
  const entry = document.createElement("option");

  entry.innerText = service.title;
  entry.value = service.url;

  dropdown.appendChild(entry);
});

custom.oninput = function () {
  submit.value = "Save";
};

dropdown.onchange = function () {
  submit.value = "Save";

  if (dropdown.value == "custom") {
    custom.style.display = "block";
  } else {
    custom.style.display = "none";
  }
};

function saveOptions(e) {
  e.preventDefault();

  let url = dropdown.value;
  if (url == "none") return;
  if (url == "custom") url = custom.value;

  browser.storage.sync.set({ reader: url });
  submit.value = "Saved!";
}

function restoreOptions(e) {
  browser.storage.sync.get({ reader: null }).then(({ reader }) => {
    if (!reader) return;

    let option = dropdown.querySelector(`[value="${reader}"]`);

    if (!option) {
      option = dropdown.querySelector(`[value="custom"]`);

      custom.style.display = "block";
      custom.value = reader;
    }

    option.selected = true;
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
