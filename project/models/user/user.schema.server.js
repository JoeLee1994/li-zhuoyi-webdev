/**
 * Created by Joe on 10/06/2017.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,

    roles: [{type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN', 'PUBLISHER']}],

    facebook: {
        id:    String,
        token: String
    },

    email: String,
    phone: String,
    dateCreated: {type: Date, default: Date.now},
    following: [{type: mongoose.Schema.ObjectId, ref: "UserModel"}],
    befollowedby:[{type: mongoose.Schema.ObjectId, ref: "UserModel"}],
    likedmovies:[{type: mongoose.Schema.ObjectId, ref: "MovieModel"}],
    likedcities:[{type: mongoose.Schema.ObjectId, ref: "CityModel"}],
    likedcinemas:[{type: mongoose.Schema.ObjectId, ref: "CinemaModel"}]
}, {collection: "user"});

module.exports = userSchema;