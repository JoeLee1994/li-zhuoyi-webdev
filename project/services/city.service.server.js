/**
 * Created by Joe on 2017/6/23.
 */
var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var movieModel = require('../models/movie/movie.model.server');
var cityModel = require('../models/city/city.model.server');

app.get('/api/project/cities', findAlllikedCities);
app.get('/api/project/cities/:cityId', findCityById);
// app.put('/api/project/:cityId', updateMovie);
app.get('/api/project/citiesByOwnId/:id', findCityByOwnID);
app.post('/api/project/city', createCity);

function createCity(req, res) {
    var city = req.body;
    cityModel
        .createCity(city)
        .then(function (city) {
            console.log(city);
            res.send(city);
        }, function (err) {
            res.send(err);
        });
}

function findAlllikedCities(req, res) {
    cityModel
        .findAlllikedCities()
        .then(function (cities) {
            res.send(cities);
        })
}

function findCityById(req, res) {
    cityId = req.params['cityId'];
    cityModel
        .findCityById(cityId)
        .then(function (city) {
            res.send(city);
        }, function (err) {
            res.send(err);
        });
}

function findCityByOwnID(req, res) {
    cityid = req.params['id'];
    cityModel
        .findCityByOwnID(cityid)
        .then(function (city) {
            res.send(city);
        })
}