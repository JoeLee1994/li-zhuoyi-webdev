/**
 * Created by Joe on 10/06/2017.
 */
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addFavorite = addFavorite;
userModel.deleteFavorite = deleteFavorite;


module.exports = userModel;



function addFavorite(userId, movieId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.movies.push(movieId);
            return user.save();
        });
}

function deleteFavorite(userId, movieId) {
    return userModel
        .find({movies:movieId})
        .then(function (users) {
            var user = users[0];
            var index = user.movies.indexOf(movieId);
            user.movies.splice(index, 1);
            return user.save();
        });
}


function createUser(user) {
    if (user.roles) {
        user.roles = user.roles.split(',');
    } else {
        user.roles = ['USER'];
    }
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({
        username: username
        //password: password
    });
}

function findUserByFacebookId(facebookId) {
    return userModel
        .findOne({'facebook.id': facebookId});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    if (typeof newUser.roles === 'string') {
        newUser.roles = newUser.roles.split(',');
    }
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}