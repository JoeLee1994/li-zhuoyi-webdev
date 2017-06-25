/**
 * Created by Joe on 2017/6/23.
 */
/**
 * Created by Joe on 2017/6/23.
 */
var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var movieModel = require('../models/movie/movie.model.server');
var cityModel = require('../models/city/city.model.server');
var cinemaModel = require('../models/cinema/cinema.model.server');

app.get('/api/project/cinemas', findAlllikedCinemas);
app.get('/api/project/cinemas/:cinemaId', findCinemaById);
// app.put('/api/project/:cityId', updateMovie);
app.get('/api/project/cinemasByOwnId/:id', findCinemaByOwnID);
app.post('/api/project/cinema', createCinema);

function createCinema(req, res) {
    var cinema = req.body;
    cinemaModel
        .createCinema(cinema)
        .then(function (cinema) {
            res.send(cinema);
        }, function (err) {
            res.send(err);
        });
}

function findAlllikedCinemas(req, res) {
    cinemaModel
        .findAlllikedCinemas()
        .then(function (cinemas) {
            res.send(cinemas);
        })
}

function findCinemaById(req, res) {
    cinemaId = req.params['cinemaId'];
    cinemaModel
        .findCinemaById(cinemaId)
        .then(function (cinema) {
            res.send(cinema);
        }, function (err) {
            res.send(err);
        });
}

function findCinemaByOwnID(req, res) {
    cinemaid = req.params['id'];
    cinemaModel
        .findCinemaByOwnID(cinemaid)
        .then(function (cinema) {
            res.send(cinema);
        })
}