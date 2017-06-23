var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
	imdbID: {type: String, unique: true},
	Title: String,
	Plot: String,
	Actors: [String]
}, {collection: "movie"});

module.exports = movieSchema;
