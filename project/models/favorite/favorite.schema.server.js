var mongoose = require('mongoose');

var favoriteSchema = mongoose.Schema({
	userId: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
	movieId: {type: mongoose.Schema.ObjectId, ref: "MovieModel"}
}, {collection: "favorite"});

module.exports = favoriteSchema;
