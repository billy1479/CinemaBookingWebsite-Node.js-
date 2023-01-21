// For Server-functions
rootUrl = 'http://127.0.0.1:5500/';
async function loadCurrentFilms() {
    const currentFilmsObject = await fetch(rootUrl + 'currentFilms');
    const currentFilmsResponse = await currentFilmsObject.text();
    x = JSON.parse(currentFilmsResponse);
    
    var currentFilmContainers = document.getElementsByClassName('currentFilmContainer');
    var counter = 0;
    // need to set up a loop that checks if the counter is odd for when to swap the positioning of the image with the text
    // add a button element that works with a function not made yet - when clicked, takes the user to the booking page and has the date selected to today as well as the film already selected by the function
    // Need to sort CSS for button however
    currentFilmContainers.forEach(function (y) {
        
    })
    
}

async function loadUpcomingFilms () {
    const upcomingFilmsObject = await fetch(rootUrl + 'upcomingFilms');
    const upcomingFilmsResponse = await upcomingFilmsObject.text();
    x = JSON.parse(upcomingFilmsResponse);
    // This returns the dictionary
}

async function loadReruns () {
    const rerunsObject = await fetch(rootUrl + 'reruns');
    const rerunsResponse = await rerunsObject.text();
    x = JSON.parse(rerunsResponse);
    // This returns the dictionary
}

async function loadFilmNames() {
    const filmNamesObject = await fetch(rootUrl + 'filmNames');
    const filmNamesResponse = await filmNamesObject.text();
    x = JSON.parse(filmNamesResponse);
    var listElements = '';
    listElements += "<option value='False'>Select film</option>";
    x.forEach(function (y) {
        listElements += `<option value=${y[1]}>${y[0]}</option>`;
    })  
    document.getElementById('filmSelect').innerHTML = listElements;
}

function assignForm() {
document.getElementById('bookingForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    var date = document.getElementById('dateInput').value;
    var filmName = document.getElementById('filmSelect').value;
    var nAdults = document.getElementById('adultNumberInput').value;
    var nChildren = document.getElementById('childrenNumberInput').value;
    var firstName = document.getElementById('firstNameInput').value;
    var surname = document.getElementById('surnameInput').value;
    var email = document.getElementById('emailInput').value;

    if (date == '') {
        
    }



    var x = {'email': email, 'date': date, 'film': filmName, 'noAdults': nAdults, 'noChild': nChildren, 'firstName': firstName, 'surname': surname}
    const JSONx = JSON.stringify(x);
    document.getElementById('bookingForm').reset();
    const formSubmission = await fetch(rootUrl + 'Bookings/MakeABooking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSONx
    })
})}

function assignSearchBar() {
    document.getElementById('bookingSearch').addEventListener('submit', async function (e) {
        e.preventDefault();
        var userEmail = document.getElementById('topBarSearchInput').value;
        const bookingResponse = await fetch(rootUrl + `Bookings/${userEmail}`);
        const bookingText = await bookingResponse.text();
        var bookingArray = JSON.parse(bookingText);
        if (bookingArray[0] == 'False') {
            // make modal so no booking was found with that email
        } else {
            // make modal appear with booking information associated with that email
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