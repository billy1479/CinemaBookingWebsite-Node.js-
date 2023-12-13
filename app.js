const express = require('express');
const app = express();
const fs = require('fs');

const bookingsFile = './client/Data/bookings.json';
const currentFilmsFile = './client/Data/currentFilms.json';
const rerunsFile = './client/Data/reruns.json';
const upcomingFilmsFile = './client/Data/upcoming.json';

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'client/index.html')));

const bookings = require(bookingsFile);
const currentFilms = require(currentFilmsFile);
const reruns = require(rerunsFile);
const upcomingFilms = require(upcomingFilmsFile);

app.get('/currentFilms', function (req, resp) {
    resp.send(currentFilms);
});

app.get('/upcomingFilms', function (req, resp) {
    resp.send(upcomingFilms);
});

app.get('/reruns', function (req, resp) {
    resp.send(reruns);
});

app.get('/filmNames', function (req, resp) {
    var filmNameArray = [];
    var currentFilmKeys = Object.keys(currentFilms);
    currentFilmKeys.forEach(function (x) {
        filmNameArray.push([currentFilms[x][0], x]);
    });

    var upComingFilmKeys = Object.keys(upcomingFilms);
    upComingFilmKeys.forEach(function (x) {
        filmNameArray.push([upcomingFilms[x][0], x]);
    });

    var rerunsFilmKeys = Object.keys(reruns);
    rerunsFilmKeys.forEach(function (x) {
        filmNameArray.push([reruns[x][0], x]);
    });
    resp.send(filmNameArray);
});

// For the search bar
app.get('/Bookings/:email', function (req,resp) {
    const email = req.params.email;
    const bookingEmails = Object.keys(bookings);
    try {
        result = bookings[email];
    } catch(err) {result = ['False']};
    resp.send(result);
})

// For making a booking
app.post('/Bookings/MakeABooking', function (req, resp) {
    var userEmail = req.body.email;
    var date = req.body.date;
    var film = req.body.film;
    var filmTime = req.body.time;
    var noOfAdults = req.body.noAdults;
    var noOfChildren = req.body.noChild;
    var firstName = req.body.firstName;
    var surname = req.body.surname;
    var value = [date, film, filmTime, noOfAdults, noOfChildren, firstName, surname]
    bookings[userEmail] = value;
    fs.writeFileSync(bookingsFile, JSON.stringify(bookings));
    resp.send(value);
})

module.exports = app;
