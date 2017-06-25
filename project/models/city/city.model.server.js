/**
 * Created by Joe on 2017/6/23.
 */
var mongoose = require('mongoose');
var citySchema = require('./city.schema.server');
var cityModel = mongoose.model('CityModel', citySchema);

cityModel.createCity = createCity;
cityModel.findCityById = findCityById;
cityModel.findCityByOwnID = findCityByOwnID;
cityModel.deleteCity = deleteCity;
cityModel.findAlllikedCities = findAlllikedCities;
// cityModel.updateCity = updateCity;

module.exports = cityModel;

function findAlllikedCities() {
    return cityModel.find();
}

function createCity(city) {
    return cityModel.create(city);
}

function findCityById(cityId) {
    return cityModel.findById(cityId);
}

function findCityByOwnID(id) {
    return cityModel.findOne({id: id});
}

function deleteCity(cityId) {
    return cityModel.remove({_id: cityId});
}

// function updateCity(cityId, newCity) {
//     delete newCity.id;
//     delete newCity.name;
//     delete newCity.country;
//     if (typeof newMovie.roles === 'string') {
//         newMovie.roles = newMovie.roles.split(',');
//     }
//     return cityModel.update({_id: movieId}, {$set: newMovie});
// }