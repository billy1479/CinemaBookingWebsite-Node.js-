// For Server-functions
rootUrl = 'http://127.0.0.1:5500/';
async function loadCurrentFilms() {
    const currentFilmsObject = await fetch(rootUrl + 'currentFilms');
    const currentFilmsResponse = await currentFilmsObject.text();
    x = JSON.parse(currentFilmsResponse);
    // This returns the dictionary
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
    x.forEach(function (y) {
        listElements += `<option value=${y[1]}>${y[0]}</option>`;
    })  
    document.getElementById('filmSelect').innerHTML = listElements;
}

function assignForm() {
document.getElementById('bookingForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log('this has been run')
    // const x = new FormData(document.getElementById('bookingForm'));
    // make dictionary here
    const JSONx = JSON.stringify(Object.fromEntries(x));
    const formSubmission = await fetch(rootUrl + 'Bookings/MakeABooking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSONx
    })
    document.getElementById('bookingForm').reset();
    // need to add response for JSON
})}

function callerFunction() {
    loadCurrentFilms();
    loadUpcomingFilms();
    loadReruns();
    loadFilmNames();
    assignForm();
}

document.addEventListener('DOMContentLoaded', callerFunction);