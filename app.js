const express = require('express');
const app = express()
const fs = require('fs')

const bookingsFile = './Data/bookings.json';
const currentFilmsFile = './Data/currentFilms.json';
const rerunsFile = './Data/reruns.json';
const upcomingFilmsFile = './Data/upcoming.json';

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'client')));

const bookings = require(bookingsFile);
const currentFilms = require(currentFilmsFile);
const reruns = require(rerunsFile);
const upcomingFilms = require(upcomingFilmsFile);

app.get('/currentFilms', function (req, resp) {
    resp.send(currentFilms);
})

app.get('/upcomingFilms', function (req, resp) {
    resp.send(upcomingFilms);
})

app.get('/reruns', function (req, resp) {
    resp.send(reruns);
})

app.get('/filmbookings', function (req, resp) {
    // For getting the names of all films being shown for the form
})

// For the search bar
app.get('/Bookings/:reference', function (req,resp) {
    const bookingReference = req.params.reference;
    const result = bookings[bookingReference];
    resp.send(result);
})