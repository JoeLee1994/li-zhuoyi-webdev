/**
 * Created by Joe on 2017/6/23.
 */
var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var movieModel = require('../models/movie/movie.model.server');

app.get('/api/project/movies', findAlllikedMovies);
app.get('/api/project/movies/:movieId', findMovieById);
app.put('/api/project/:movieId', updateMovie);
app.get('/api/project/movie', findMovieByImdbID);
app.post('/api/project/movie', createMovie);

function createMovie(req, res) {
    var movie = req.body;
    movieModel
        .createMovie(movie)
        .then(function (movie) {
            res.json(movie);
        }, function (err) {
            res.send(err);
        });
}

function findMovieByImdbID(req, res) {
    movieimdbID = req.params['imdbID'];
    movieModel
        .findMovieByImdbID(movieimdbID)
        .then(function (movie) {
            res.json(movie);
        })
}


function findAlllikedMovies(req, res) {
    movieModel
        .findAlllikedMovies()
        .then(function (movies) {
            res.json(movies);
        })
}

function findMovieById(req, res) {
    movieId = req.params['movieId'];
    movieModel
        .findMovieById(movieId)
        .then(function (movie) {
            res.json(movie);
        }, function (err) {
            res.send(err);
        });
}

function updateMovie(req, res) {
    var newMovie = req.body;
    var movieId = req.params.movieId;
    movieModel
        .updateMovie(movieId, newMovie)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}