/**
 * Created by Joe on 2017/6/23.
 */
var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    name: String,
    cinema: {type: mongoose.Schema.Types.ObjectId, ref: "CinemaModel"},
    likedbyuser: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}
},{collection: "city"});

module.exports = citySchema;