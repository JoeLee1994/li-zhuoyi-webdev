var mongoose = require('mongoose');
var favoriteSchema = require('./favorite.schema.server');
var favoriteModel = mongoose.model('FavoriteModel', favoriteSchema);

favoriteModel.addFavorite = addFavorite;
favoriteModel.findFavorite = findFavorite;
favoriteModel.findFavoritesByUserId = findFavoritesByUserId;
favoriteModel.findFavoritesByMovieId = findFavoritesByMovieId;
favoriteModel.countFavoritesByUserId = countFavoritesByUserId;
favoriteModel.countFavoritesByMovieId = countFavoritesByMovieId;
favoriteModel.deleteFavorite = deleteFavorite;

module.exports = favoriteModel;

function addFavorite(userId, movieId) {
	if (favoriteModel.findFavorite(userId, movieId)) {
		return;
	} else {
		var favorite = new FavoriteModel({
			userId: userId,
			movieId: movieId
		});
		return favorite.save();
	}
}

function findFavorite(userId, movieId) {
	return favoriteModel.findOne({
        userId: userId,
        movieId: movieId
    });
}

function findFavoritesByUserId(userId) {
	return favoriteModel.find({userId: userId});
}

function findFavoritesByMovieId(movieId) {
	return favoriteModel.find({movieId: movieId});
}

function countFavoritesByUserId(userId) {
	return favoriteModel.findFavoritesByUserId(userId).length;
}

function countFavoritesByMovieId(movieId) {
	return favoriteModel.findFavoritesByMovieId(movieId).length;
}

function deleteFavorite(userId, movieId) {
	return favoriteModel.remove({
        userId: userId,
        movieId: movieId
    });
}


