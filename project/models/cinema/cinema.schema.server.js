/**
 * Created by Joe on 2017/6/23.
 */
var mongoose = require('mongoose');

var cinemaSchema = mongoose.Schema({
    name: String,
    telephone: String,
    website: String,
    likedbyuser: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}
},{collection: "cinema"});

module.exports = cinemaSchema;