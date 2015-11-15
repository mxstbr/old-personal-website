var nav = document.querySelector('.nav');
var links = document.querySelectorAll('a');
var scrolled = false;

document.body.classList.remove('js-has-loaded');
document.body.classList.remove('js-has-scrolled');

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
  // If the user won't be able to scroll
  if (window.innerHeight >= getDocumentHeight()) {
    // Make the margin of the main content smaller
    // And show the nav bar after a short timeout
    setTimeout(function() {
      document.body.classList.add("js-big-screen");
      document.body.classList.add("js-has-scrolled");
    }, 1500);
  } else {
    // Otherwise check if page is already scrolled
    setScrolledClass();
    // Show/Hide the navbar on scroll
    window.onscroll = setScrolledClass;
    // All links should be opened after fading out the body
    for (var i = links.length - 1; i >= 0; i--) {
      links[i].onclick = fadeOutBody;
    }
  }
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