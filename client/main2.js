const { response } = require("express");

rootUrl = 'http://127.0.0.1:5500/';
async function loadCurrentFilms() {
    const currentFilmsObject = await fetch(rootUrl + 'currentFilms');
    const currentFilmsResponse = await currentFilmsObject.text();
    const x = JSON.parse(currentFilmsResponse);
    var myKeys = Object.keys(x);
    var currentFilmContainers = document.getElementsByClassName('currentFilmContainer');
    var counter = 0;
    var keyIndex = 0;
    for (z = 0;z<currentFilmContainers.length;z++) {
        var expression = '';
        if (counter == 0) {
            expression = `<img class="currentFilmImage" src="Images/${x[myKeys[keyIndex]][4]}"><div class="currentFilmDescription">
            <p>${x[myKeys[keyIndex]][0]}</p>
            <p>${x[myKeys[keyIndex]][1]}</p>
            <p>${x[myKeys[keyIndex]][2]}</p>
            <p>${x[myKeys[keyIndex]][3]}</p>
            </div>`;
            counter = 1;
        } else {
            expression = `<div class="currentFilmDescription">
            <p>${x[myKeys[keyIndex]][0]}</p>
            <p>${x[myKeys[keyIndex]][1]}</p>
            <p>${x[myKeys[keyIndex]][2]}</p>
            <p>${x[myKeys[keyIndex]][3]}</p>
            </div>
            <img class="currentFilmImage" src="Images/${x[myKeys[keyIndex]][4]}">`;
            counter = 0
        }
        currentFilmContainers[z].innerHTML = expression;
        keyIndex += 1;
    }
    
}

async function loadUpcomingFilms () {
    const upcomingFilmsObject = await fetch(rootUrl + 'upcomingFilms');
    const upcomingFilmsResponse = await upcomingFilmsObject.text();
    x = JSON.parse(upcomingFilmsResponse);
    var myKeys = Object.keys(x);
    var keyIndex =  0;
    var upcomingFilmContainers = document.getElementsByClassName('UFFElement');
    for (z = 0;z<upcomingFilmContainers.length;z++) {
        expression = `<h3>${x[myKeys[keyIndex]][0]}</h3>
        <img class="UFFImage" src="Images/${x[myKeys[keyIndex]][4]}">
        <div class="imageInformation">
        <p>${x[myKeys[keyIndex]][1]}</p>
        <p>Release Date - ${x[myKeys[keyIndex]][2]}</p>
        <p>Age Rating - ${x[myKeys[keyIndex]][3]}</p>
        </div>`;
        keyIndex += 1;
        upcomingFilmContainers[z].innerHTML = expression
    }
}

async function loadReruns () {
    const rerunsObject = await fetch(rootUrl + 'reruns');
    const rerunsResponse = await rerunsObject.text();
    x = JSON.parse(rerunsResponse);
    var myKeys = Object.keys(x);
    var keyIndex =  0;
    var rerunsFilmContainers = document.getElementsByClassName('RRElement');
    for (z = 0;z<rerunsFilmContainers.length;z++) {
        expression = `<h3>${x[myKeys[keyIndex]][0]}</h3>
        <img class="UFFImage" src="Images/${x[myKeys[keyIndex]][5]}">
        <div class="imageInformation">
        <p>${x[myKeys[keyIndex]][1]}</p>
        <p>Year - ${x[myKeys[keyIndex]][2]}</p>
        <p>Duration - ${x[myKeys[keyIndex]][3]}</p>
        <p>Age Rating - ${x[myKeys[keyIndex]][4]}</p>
        </div>`;
        keyIndex += 1;
        rerunsFilmContainers[z].innerHTML = expression
    }
}

async function loadFilmNames() {
    const filmNamesObject = await fetch(rootUrl + 'filmNames');
    const filmNamesResponse = await filmNamesObject.text();
    x = JSON.parse(filmNamesResponse);
    var listElements = '';
    listElements += "<option value='False'>Select film</option>";
    x.forEach(function (y) {
        listElements += `<option value="${y[0]}">${y[0]}</option>`;
    })  
    document.getElementById('filmSelect').innerHTML = listElements;
}

function assignForm() {
document.getElementById('bookingForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    var date = document.getElementById('dateInput').value;
    var filmName = document.getElementById('filmSelect').value;
    var filmTime = document.getElementById('screenSelect').value;
    var nAdults = document.getElementById('adultNumberInput').value;
    var nChildren = document.getElementById('childrenNumberInput').value;
    var firstName = document.getElementById('firstNameInput').value;
    var surname = document.getElementById('surnameInput').value;
    var email = document.getElementById('emailInput').value;
    var tempScreen;
    if (filmTime == 'screen1') {
        filmTime = '10.00AM';
        tempScreen = 'Screen 1';
    } else if (filmTime == 'screen2') {
        filmTime = '3.00PM';
        tempScreen = 'Screen 2;'
    } else {
        filmTime = '7.00PM';
        tempScreen = 'Screen 3';
    }

    if (document.getElementById('firstNameInput').value == '') {
        makeAlertBox('Please enter your first name.');
    } else if (document.getElementById('surnameInput').value == '') {
        makeAlertBox('Please enter your surname.');
    } else if (document.getElementById('emailInput').value == '' || !(document.getElementById('emailInput').value.includes('@'))) {
        makeAlertBox('Please enter your email.');
    } else {
        var x = {'email': email, 'date': date, 'film': filmName, 'time': filmTime, 'noAdults': nAdults, 'noChild': nChildren, 'firstName': firstName, 'surname': surname}
        const JSONx = JSON.stringify(x);
        // document.getElementById('bookingForm').reset();
        // formSlide = 0;
        // formSlideChangeFunction();
        const formSubmission = await fetch(rootUrl + 'Bookings/MakeABooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSONx
        }).then((response) => {
            if (response.ok) {
                document.getElementById('line1').innerHTML = 'You are booked to go see ' + filmName + ' at ' + filmTime;
                document.getElementById('line2').innerHTML = tempScreen
                document.getElementById('bookingModal').style.display = 'Block';
                document.getElementById('bookingForm').reset();
                formSlide = 0;
                formSlideChangeFunction();
            }
        }).catch((response) => {
            makeAlertBox('Disconnection from server - please wait for reconnection...');
        })
    }
})}

function assignSearchBar() {
    document.getElementById('bookingSearch').addEventListener('submit', async function (e) {
        e.preventDefault();
        var userEmail = document.getElementById('topBarSearchInput').value;
        if (document.getElementById('topBarSearchInput').value.includes('@')) {
            const bookingResponse = await fetch(rootUrl + `Bookings/${userEmail}`);
            const bookingText = await bookingResponse.text();
            var bookingArray = JSON.parse(bookingText);
            var filmTime, tempScreen;
            if (bookingArray[0] == 'False') {
                document.getElementById('searchline1').innerHTML = 'We have no email address matching that in our system.';
                document.getElementById('searchline3').innerHTML = '';
            } else {
                if (bookingArray[2] == 'screen1') {
                    filmTime = '10.00AM';
                    tempScreen = 'Screen 1';
                } else if (bookingArray[2] == 'screen2') {
                    filmTime = '3.00PM';
                    tempScreen = 'Screen 2;'
                } else {
                    filmTime = '7.00PM';
                    tempScreen = 'Screen 3';
                }
                document.getElementById('searchline1').innerHTML = 'You are booked to go see ' + bookingArray[1] + ' at ' + filmTime
                document.getElementById('searchline2').innerHTML = tempScreen
            }
            document.getElementById('bookingSearchModal').style.display = 'Block';
            document.getElementById('topBarSearchInput').value = '';
        } else {
            makeAlertBox('Please enter a valid email.')
        }
        
    })
}

function callerFunction() {
    loadCurrentFilms();
    loadUpcomingFilms();
    loadReruns();
    loadFilmNames();
    assignForm();
    assignSearchBar();
}
 
document.addEventListener('DOMContentLoaded', callerFunction);

