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

document.getElementById('bookingForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const x = new FormData(document.getElementById('bookingForm'));
    const JSONx = JSON.stringify(Object.fromEntries(x));
    // need to add response for JSON
})

function callerFunction() {
    loadCurrentFilms();
    loadUpcomingFilms();
    loadReruns();
}

document.addEventListener('DOMContentLoaded', callerFunction);