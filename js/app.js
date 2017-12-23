var nav = document.querySelector('.nav');
var scrolled = false;

// Cross browser compatible, non-overriding window.onload function
if (window.addEventListener) {
  window.addEventListener("load", init, false);
} else {
  window.attachEvent && window.attachEvent("onload", init);
}

var rbStarsElem = document.querySelector('#react-boilerplate-stars');
var scStarsElem = document.querySelector('#styled-components-stars');
function getGitHubUrl(owner, repo) {
    return 'https://api.github.com/search/repositories?q=repo%3A' + owner + '%2F' + repo;
}
var repos = [{
    owner: 'styled-components',
    name: 'styled-components'
}, {
    owner: 'react-boilerplate',
    name: 'react-boilerplate'
}]

// Initialize the page
function init() {
  // Fade in the body
  document.body.classList.add("js-has-loaded");
  // Otherwise check if page is already scrolled
  setScrolledClass();
  // Show/Hide the navbar on scroll
  window.onscroll = setScrolledClass;

    repos.forEach(function (repo) {
        var elem = document.querySelector('#' + repo.name + '-stars');
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (localStorage.getItem(repo.name + '-stars') && localStorage.getItem(repo.name + '-stars-time') && localStorage.getItem(repo.name + '-stars-time') < yesterday) {
            elem.innerHTML = localStorage.getItem(repo.name + '-stars') + ' stars';
        } else {
            var url = getGitHubUrl(repo.owner, repo.name);
            var request = new XMLHttpRequest();
            request.onload = function(response) {
                if (elem) {
                    var stars = JSON.parse(this.responseText).items[0].stargazers_count
                    elem.innerHTML = stars + ' stars';
                    localStorage.setItem(repo.name + '-stars', stars)
                    localStorage.setItem(repo.name + '-stars-time', new Date())
                }
            }
            request.open('GET', url);
            request.send();
        }
    })


  // Add analytics asynchronously on load
  window.owa_baseUrl = 'http://analytics.mxstbr.com/';
  window.owa_cmds = window.owa_cmds || [];
  window.owa_cmds.push(['setSiteId', 'dc378514da5080f1d78d90cfa76a9023']);
  window.owa_cmds.push(['trackPageView']);
  window.owa_cmds.push(['trackClicks']);
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
