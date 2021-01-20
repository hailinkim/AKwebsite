'use strict'

// Make navbar transparent when it's on the top
// const navbar = document.querySelector('#navbar');
// const navbarHeight = navbar.getBoundingClientRect().height;
// document.addEventListener('scroll', () => {
//     console.log(window.scrollY);
//     console.log(`navbarHeight: ${navbarHeight}`);
//     if(window.scrollY > navbarHeight) {
//         navbar.classList.add('navbar--dark');
//     } else {
//         navbar.classList.remove('navbar--dark');
//     }

// })


//Scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    
    const target = event.target;
    const link = target.dataset.link;
    if(link == null) {
        return;
    }

    //Remove selection 
    const active = document.querySelector('.navbar__menu__item.selected');
    active.classList.remove('selected');
    event.target.classList.add('selected');

    scrollIntoView(link);
});

//Navbar toggle button
const navbarToggleBtn = document.querySelector('.container');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
})

//Navbar toggle animation
function myFunction(x) {
    x.classList.toggle("change");
  }

//Make about gradually fade to transparent as the window scolls down
const about = document.querySelector('.about__container');
const aboutHeight = about.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    about.style.opacity = 1- window.scrollY / aboutHeight;
})

//Scroll to thesis/projects when tapping on the portfolio category
const portfolioCateg = document.querySelector('.portfolio__categ');
portfolioCateg.addEventListener('click', (event) => {
    
    const target = event.target;
    const link = target.dataset.link;
    if(link == null) {
        return;
    }

    scrollIntoView(link);
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}