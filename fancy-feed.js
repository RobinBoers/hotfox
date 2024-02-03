// This file detects RSS and Atom feeds and applies fancy XSLT
// stylesheets to them to make them human-readable.

function detectPageType() {
  const isRSS = /^(application\/rss\+xml|application\/rdf\+xml|application\/atom\+xml|application\/xml|\bxml\b|\brss\b|\batom\b)/i;

  if (isRSS.test(document.contentType)) {
    return "rss";
  } else if (document.contentType.includes("atom+xml")) {
    return "atom";
  } else {
    return "html";
  }
}

function applyXSLT() {
  const type = detectPageType();
  
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
