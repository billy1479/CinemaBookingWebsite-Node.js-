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

// for the form functions
var formSlide = -1;
function changeFormSlide() {
    slides = document.getElementsByClassName('formSlide');
    for (i=0;i<slides.length;i++) {
        slides[i].style.display = 'none';
    }
    // remove form change button when end of form is reached
    if (formSlide == 3) {
        document.getElementById('formChangeButtonRight').style.display = 'None';
    } else if (formSlide == 0) {
        document.getElementById('formChangeButtonLeft').style.display = 'None';
    } else {
        document.getElementById('formChangeButtonLeft').style.display = 'Block';
        document.getElementById('formChangeButtonRight').style.display = 'Block';
    }
    slides[formSlide].style.display = 'Block';
}

function nextFormSlide() {
    formSlide += 1;
    changeFormSlide();
}

function previousFormSlide() {
    formSlide -= 1;
    changeFormSlide();
}

function pageLoad() {
    changeTab('page1');
    increaseSlide();
    nextFormSlide();
}

