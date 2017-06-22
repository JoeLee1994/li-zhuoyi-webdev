var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel = mongoose.model('MovieModel', movieSchema);

movieModel.createMovie = createMovie;
movieModel.findMovieById = findMovieById;
movieModel.findMovieByImdbID = findMovieByImdbID;
movieModel.deleteMovie = deleteMovie;

module.exports = movieModel;

function createMovie(movie) {
	return movieModel.create(movie);
}

function findMovieById(movieId) {
	return movieModel.findById(movieId);
}

function findMovieByImdbID(imdbID) {
	return movieModel.findOne({imdbID: imdbID});
}

function deleteMovie(movieId) {
	return movieModel.remove({_id: movieId});
}