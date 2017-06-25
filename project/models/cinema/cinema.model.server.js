/**
 * Created by Joe on 2017/6/23.
 */
var mongoose = require('mongoose');
var cinemaSchema = require('./cinema.schema.server');
var cinemaModel = mongoose.model('CinemaModel', cinemaSchema);

cinemaModel.createCinema = createCinema;
cinemaModel.findCinemaById = findCinemaById;
cinemaModel.findCinemaByOwnID = findCinemaByOwnID;
cinemaModel.deleteCinema = deleteCinema;
cinemaModel.findAlllikedCinemas = findAlllikedCinemas;
// cityModel.updateCity = updateCity;

module.exports = cinemaModel;

function findAlllikedCinemas() {
    return cinemaModel.find();
}

function createCinema(cinema) {
    return cinemaModel.create(cinema);
}

function findCinemaById(cinemaId) {
    return cinemaModel.findById(cinemaId);
}

function findCinemaByOwnID(id) {
    return cinemaModel.findOne({id: id});
}

function deleteCinema(cinemaId) {
    return cinemaModel.remove({_id: cinemaId});
}