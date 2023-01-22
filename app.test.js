const request = require('supertest')
const app = require('./app')

describe('Test for WS Films API', () => {
    test("GET /currentFilms succeeds", () => {
        return request(app).get('/currentFilms').expect(200)
    })

    test("GET /upcomingFilms succeeds", () => {
        return request(app).get('/upcomingFilms').expect(200)
    })

    test("GET /reruns succeeds", () => {
        return request(app).get('/reruns').expect(200)
    })

    test("GET /Bookings/:email succeeds", () => {
        return request(app).get('/Bookings/test@durham.ac.uk').expect(200)
    })

    test("POST /Bookings/MakeaBooking succeeds", () => {
        const myParams = {"email": "test2@durham.ac.uk",
        "date": "2023-01-24",
        "film": "SMATSV",
        "time": "screen1",
        "noAdults": 1,
        "noChild": 1,
        "firstName": "Billy",
        "surname": "Stapleton"
    }
    return request(app).post('/Bookings/MakeABooking').send(myParams).expect(200)
    })
})