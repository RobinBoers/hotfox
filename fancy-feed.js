// This file detects RSS and Atom feeds and applies fancy XSLT
// stylesheets to them to make them human-readable.

function detectPageType() {
  switch(document.documentElement.tagName) {
    case "feed":
      return "atom";
    case "rss":
      return "rss";
    default:
      return "html";
  }
}

function applyXSLT() {
  const type = detectPageType();

  console.log("Applying XSLT styling to feed (" + type + ")...")
  
  const xsltPath = type === "rss" ? "feed/rss.xslt" : "feed/atom.xslt";
  const xsltURL = chrome.runtime.getURL(xsltPath);

  fetch(xsltURL)
    .then(response => response.text())
    .then(xslt => {
      const parser = new DOMParser();
      const xsltDoc = parser.parseFromString(xslt, "text/xml");
      const xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsltDoc);
      
      const transformedContent = xsltProcessor.transformToFragment(document, document);
      document.documentElement.innerHTML = "";
      document.documentElement.appendChild(transformedContent);

      const button = document.getElementById("subscribe");
      
      button.onclick = function() {
        browser.runtime.sendMessage({ 
          action: "subscribe",
          title: button.getAttribute("data-title"), 
          url: window.location.href 
        });
      };
    });
}

const type = detectPageType();

if(type == "rss" || type == "atom") {
  applyXSLT();
}
