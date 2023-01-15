// function for changing pages will go here
// will need to manipulate CSS - thats it

// functions for dropdowns will go here in order to open them - check w3schools for dropdown code

// This is for changing the tabs on the main page
function changeTab(tabName) {
    tabs = document.getElementsByClassName('page');
    for (i=0;i<tabs.length;i++) {
        tabs[i].style.display = 'none';   
    }
    document.getElementById(tabName).style.display = 'block';
}

// Functions for slide changing
var slideNumber = -1;
var currentSlide = slideNumber;
var slideMax = 2;
function changeSlide() {
    slides = document.getElementsByClassName('slides');
    for (i=0;i<slides.length;i++) {
        slides[i].style.display = 'none';
    }
    if (currentSlide > slideMax) {
        currentSlide = 0
    } else if (currentSlide < 0) {
        currentSlide = slideMax
    }
    slides[currentSlide].style.display = 'Block';
}

function increaseSlide() {
    currentSlide += 1
    changeSlide()
}

function decreaseSlide() {
    currentSlide -= 1
    changeSlide()
}

function pageLoad() {
    changeTab('page1')
    increaseSlide()
}