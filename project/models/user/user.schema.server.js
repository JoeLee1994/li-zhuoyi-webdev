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
        enum: ['USER', 'ADMIN', 'Publisher']}],

    facebook: {
        id:    String,
        token: String
    },

    email: String,
    phone: String,
    websites:[{type: mongoose.Schema.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;