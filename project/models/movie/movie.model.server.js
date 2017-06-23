var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel = mongoose.model('MovieModel', movieSchema);

movieModel.createMovie = createMovie;
movieModel.findMovieById = findMovieById;
movieModel.findMovieByImdbID = findMovieByImdbID;
movieModel.deleteMovie = deleteMovie;
movieModel.findAlllikedMovies = findAlllikedMovies;
movieModel.updateMovie = updateMovie;

module.exports = movieModel;

function findAlllikedMovies() {
	return movieModel.find();
}

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

function updateMovie(movieId, newMovie) {
    delete newMovie.imdbID;
    delete newMovie.Title;
    delete newMovie.Plot;
    delete newMovie.Actors;
    if (typeof newMovie.roles === 'string') {
        newMovie.roles = newMovie.roles.split(',');
    }
    return movieModel.update({_id: movieId}, {$set: newMovie});
}