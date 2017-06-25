/**
 * Created by Joe on 2017/6/23.
 */
var mongoose = require('mongoose');

var cinemaSchema = mongoose.Schema({
    id: {type: String, unique: true},
    name: String,
    telephone: String,
    website: String
},{collection: "cinema"});

module.exports = cinemaSchema;