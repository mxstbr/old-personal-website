var nav = document.querySelector('.nav');
var links = document.querySelectorAll('a');
var scrolled = false;

// Cross browser compatible, non-overriding window.onload function
if (window.addEventListener) {
  window.addEventListener("load", init, false);
} else {
  window.attachEvent && window.attachEvent("onload", init);
}

// Initialize the page
function init() {
  // Fade in the body
  document.body.classList.add("js-has-loaded");
  // Otherwise check if page is already scrolled
  setScrolledClass();
  // Show/Hide the navbar on scroll
  window.onscroll = setScrolledClass;
  // All links should be opened after fading out the body
  for (var i = links.length - 1; i >= 0; i--) {
    links[i].onclick = fadeOutBody;
  }

  // Add analytics asynchronously on load
  var owa_baseUrl = 'http://analytics.mxstbr.com/';
  var owa_cmds = owa_cmds || [];
  owa_cmds.push(['setSiteId', 'dc378514da5080f1d78d90cfa76a9023']);
  owa_cmds.push(['trackPageView']);
  owa_cmds.push(['trackClicks']);
  owa_cmds.push(['trackDomStream']);

  (function() {
    var _owa = document.createElement('script'); _owa.type = 'text/javascript'; _owa.async = true;
    owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl );
    _owa.src = owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js';
    var _owa_s = document.getElementsByTagName('script')[0]; _owa_s.parentNode.insertBefore(_owa, _owa_s);
  }());
}

// Set the js-has-scrolled class on the body depending on scroll position
function setScrolledClass() {
  if (isScrolled() == true) {
    document.body.classList.add("js-has-scrolled");
  } else {
    document.body.classList.remove("js-has-scrolled");
  }
}

// Check if the user has scrolled
function isScrolled() {
  // IE...
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 0) {
    return true;
  } else {
    return false;
  }
}

// Cross browser solution to get document height
function getDocumentHeight() {
    var doc = document;
    // It's gotta be one of those
    return Math.max(
        doc.body.scrollHeight, doc.documentElement.scrollHeight,
        doc.body.offsetHeight, doc.documentElement.offsetHeight,
        doc.body.clientHeight, doc.documentElement.clientHeight
    );
}

// Fade out the body before opening a link
function fadeOutBody(evt) {
  var href;
  // Remove fade in class
  document.body.classList.remove("js-has-loaded");
  // If target was not the anchor tag that wants to be opened
  if (evt.target.href === undefined) {
    // Go through the parent elements
    var parentElements = window.event.path;
    if (parentElements !== undefined) {
      for (var i = 0; i < parentElements.length; i++) {
        // Get the first anchor tag
        if (parentElements[i].nodeName === "A") {
          evt.preventDefault();
          // And open the href of that tag
          href = parentElements[i].href;
          break;
        }
      }
    }
  // If target was an anchor tag, open that href
  } else {
    evt.preventDefault();
    href = evt.target.href;
  }
  // After body faded out, open the link in the same window/tab
  setTimeout(function() {
    window.open(href, "_self");
  }, 150);
}