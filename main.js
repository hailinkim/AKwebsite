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

    navbarMenu.classList.remove('open');

    //Remove selection 
    const active = document.querySelector('.navbar__menu__item.active');
    active.classList.remove('active');
    event.target.classList.add('active');

    scrollIntoView(link);
    selectNavItem(target);
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

const sectionIds = ['#about', '#skills', '#portfolio', '#contact'];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
console.log(sections);
console.log(navItems);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions = {
    root: null,
    rootMargin : '0px',
    threshold: 0.3,
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // console.log(entry.target);
        if(!entry.isIntersecting && entry.intersectionRatio >0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            
            // console.log(index, entry.target.id)
            //scorlled down, page comes up
            if(entry.boundingClientRect.y < 0 ){
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
            
        }
    });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY===0){
        selectedNavIndex = 0;
    } else if (window.scrollY + window.innerHeight === document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
})