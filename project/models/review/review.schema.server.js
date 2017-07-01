/**
 * Created by Joe on 2017/6/30.
 */
var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    reviewer: [{type: mongoose.Schema.ObjectId, ref: "UserModel"}],
    movie:[{type: mongoose.Schema.ObjectId, ref: "MovieModel"}],
    content: String
}, {collection: "review"});

module.exports = reviewSchema;