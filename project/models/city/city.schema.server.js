/**
 * Created by Joe on 2017/6/23.
 */
var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    name: String,
    country: String,
    id: {type: String, unique: true},
    cinema: {type: mongoose.Schema.Types.ObjectId, ref: "CinemaModel"},
},{collection: "city"});

module.exports = citySchema;