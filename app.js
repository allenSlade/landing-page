/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

const sections = document.querySelectorAll('section');
const navBarList = document.querySelector('#navbar__list');
const navBarMenu = document.querySelector('.navbar__menu');
const landingContainer = document.querySelector('.landing__container');
// const menuLinks = document.querySelectorAll('.menu__link');
/**
 * End Global Variables
 * Start Helper Functions
 *
*/

let inViewport = function(elem) {
    let bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// Set sections as active
let menuLinks = [];

function isActive() {
  menuLinks = document.querySelectorAll('.menu__link');
  console.log(menuLinks);
  for (const [i, section] of sections.entries()) {
    window.addEventListener('scroll', function(e) {
      if (inViewport(sections[i])) {
        section.classList.add('active');
        menuLinks[i].classList.add('menu__active');
      } else {
        section.classList.remove('active');
        menuLinks.classList.remove('menu__active');
      }
    })
  }
};


// build the nav
function buildNav() {
  sections.forEach((iter, i) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = iter.dataset.nav;
    a.classList.add('menu__link');
    a.href = '#'+ iter.id;
    li.appendChild(a);
    navBarList.appendChild(li);
  });
};

// Scroll to section on link click
function scroll() {
  const menuScroll = document.querySelectorAll('a');
  for (let i = 0; i <= sections.length; i++) {
    const top = sections[i].getBoundingClientRect().top + window.pageYOffset;
    menuScroll[i].addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top,
        behavior: 'smooth'
      })
    });
  }
}

/**
 * End Main Functions
 * Begin Events
 *
*/


function onDOMReady(callback) {
    if (document.readyState !== 'loading') {
        callback();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', callback);
    } else { // IE <= 8
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                callback();
            }
        });
    }
}

onDOMReady(function() {
    isActive();
    buildNav();
    scroll();
});
