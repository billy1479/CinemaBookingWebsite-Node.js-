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

function showSearchBox() {
    box = document.getElementById('topBarSearchInput');
    box.style.width = '250px';
}

function closeSearchBox() {
    box = document.getElementById('topBarSearchInput');
    box.style.width = '50px';
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

function nextFormSlide() {
    formSlide += 1;
    changeFormSlide();
}

function previousFormSlide() {
    formSlide -= 1;
    changeFormSlide();
}

// for checking you want to reset the form
function resetForm() {
    if (confirm('Would you like to reset your booking?')) {
        document.getElementById('bookingForm').reset();
        formSlide = -1;
        nextFormSlide();
    }
}

function pageLoad() {
    changeTab('page1');
    increaseSlide();
    nextFormSlide();
    getDate();
}

// for the buttons on the offer page moving to the element

function moveTo(x) {
    var obj = document.getElementById(x)
    pageOffset = 80;
    objPosition = obj.getBoundingClientRect().top
    var newPosition = objPosition - pageOffset;
    window.scrollTo({
        top: newPosition,
        behavior: "smooth"
    })
}

// for dropdowns on offer page

function showDropdown(x,y) {
    if (document.getElementById(y).style.display == 'block') {
        console.log('hello')
        document.getElementById(x).style.transform = 'ScaleY(1)';
        document.getElementById(y).style.display = 'None';
        
    } else {
        console.log('this has run')
        document.getElementById(x).style.transform = 'ScaleY(-1)';
        document.getElementById(y).style.display = 'block';
        document.getElementById(y).style.opacity = '0.9';
    }
}

// for getting the date for the home page

function getDate() {
    daysofweekArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var currentDate = new Date();
    var dayofweek,day, month, year;
    dayofweek = currentDate.getDay();
    dayofweek = daysofweekArray[dayofweek - 1];
    day = currentDate.getDate();
    month = currentDate.getMonth() + 1;
    year = currentDate.getFullYear();
    var myString = 'Current Showings : ' + dayofweek + ' ' + day + '/' + month + '/' + year;
    document.getElementById('currentShowingTitle').innerHTML = myString;
}
