var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
	imdbID: {type: String, unique: true},
	Title: String,
	Plot: String,
	Actors: [String]
}, {collection: "movie"});

module.exports = movieSchema;
