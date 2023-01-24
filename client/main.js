function changeTab (tabName) {
    const tabs = document.getElementsByClassName('page');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }
    document.getElementById(tabName).style.display = 'block';
}

function showSearchBox () {
    const box = document.getElementById('topBarSearchInput');
    box.style.width = '350px';
}

function closeSearchBox () {
    const box = document.getElementById('topBarSearchInput');
    box.style.width = '250px';
}

// Functions for slide changing
const slideNumber = -1;
let currentSlide = slideNumber;
const slideMax = 2;
function changeSlide () {
    const slides = document.getElementsByClassName('slides');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    if (currentSlide > slideMax) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slideMax;
    }
    slides[currentSlide].style.display = 'Block';
}

function increaseSlide () {
    currentSlide += 1;
    changeSlide();
}

function decreaseSlide () {
    currentSlide -= 1;
    changeSlide();
}

// for the form functions
let formSlide = -1;
function changeFormSlide () {
    if (formSlide - 1 == 0) {
        if (!document.getElementById('dateInput').value) {
            makeAlertBox('Please select a date.');
            formSlide -= 1;
        } else {
            if (document.getElementById('filmSelect').value == 'False') {
                makeAlertBox('Please select a film.');
                formSlide -= 1;
            } else {
                formSlideChangeFunction();
            }
        }
    } else if (formSlide - 1 == 1) {
        if (document.getElementById('screenSelect').value == 'False') {
            makeAlertBox('Please select a screen.');
            formSlide -= 1;
        } else {
            if (document.getElementById('adultNumberInput').value == '') {
                makeAlertBox('Please enter the number of adults');
                formSlide -= 1;
            } else if (document.getElementById('childrenNumberInput').value == '') {
                makeAlertBox('Please enter the number of children.');
                formSlide -= 1;
            } else {
                formSlideChangeFunction();
            }
        }
    } else {
        formSlideChangeFunction();
    }
}

function formSlideChangeFunction () {
    const slides = document.getElementsByClassName('formSlide');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    // remove form change button when end of form is reached
    if (formSlide == 2) {
        document.getElementById('formChangeButtonRight').style.display = 'None';
    } else if (formSlide == 0) {
        document.getElementById('formChangeButtonLeft').style.display = 'None';
    } else {
        document.getElementById('formChangeButtonLeft').style.display = 'Block';
        document.getElementById('formChangeButtonRight').style.display = 'Block';
    }
    slides[formSlide].style.display = 'Block';
}

function nextFormSlide () {
    formSlide += 1;
    changeFormSlide();
}

function previousFormSlide () {
    formSlide -= 1;
    changeFormSlide();
}

// for checking you want to reset the form
function resetForm () {
    if (confirm('Would you like to reset your booking?')) {
        document.getElementById('bookingForm').reset();
        formSlide = 0;
        formSlideChangeFunction();
    }
}
// for the buttons on the offer page moving to the element

function moveTo (x) {
    const obj = document.getElementById(x);
    const pageOffset = 80;
    const objPosition = obj.getBoundingClientRect().top;
    const newPosition = objPosition - pageOffset;
    window.scrollTo({
        top: newPosition,
        behavior: 'smooth'
    });
}

// for dropdowns on offer page

function showDropdown (x, y) {
    if (document.getElementById(y).style.display == 'block') {
        document.getElementById(x).style.transform = 'ScaleY(1)';
        document.getElementById(y).style.display = 'None';
    } else {
        document.getElementById(x).style.transform = 'ScaleY(-1)';
        document.getElementById(y).style.display = 'block';
        document.getElementById(y).style.opacity = '0.9';
    }
}

// for getting the date for the home page

function getDate () {
    const daysofweekArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const currentDate = new Date();
    let dayofweek;
    dayofweek = currentDate.getDay();
    dayofweek = daysofweekArray[dayofweek - 1];
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const myString = 'Current Showings : ' + dayofweek + ' ' + day + '/' + month + '/' + year;
    document.getElementById('currentShowingTitle').innerHTML = myString;
}

function setMinDate () {
    // This sets the minimum date for the booking form to be todays date
    const currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    if (currentDay < 10) {
        currentDay = '0' + currentDate;
    }
    if (currentMonth < 10) {
        currentMonth = '0' + currentMonth;
    }
    const minDate = currentYear + '-' + currentMonth + '-' + currentDay;
    document.getElementById('dateInput').setAttribute('min', minDate);
}

function makeAlertBox (message) {
    document.getElementById('alertBox').style.display = 'Block';
    document.getElementById('alertMessage').innerHTML = message;
}

function pageLoad () {
    changeTab('page1');
    increaseSlide();
    nextFormSlide();
    getDate();
    setMinDate();
}

document.addEventListener('DOMContentLoaded', pageLoad);
