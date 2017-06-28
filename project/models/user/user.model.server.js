/**
 * Created by Joe on 10/06/2017.
 */
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
// var movieSchema = require('../movie/movie.schema.server');
// var movieModel = mongoose.model("MovieModel", movieSchema);


userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserBylikedmovies = findUserBylikedmovies;
userModel.searchByUsername = searchByUsername;
userModel.findAllFollowings = findAllFollowings;
userModel.findAllbefollowedbys = findAllbefollowedbys;
// userModel.findAllLikedMovies = findAllLikedMovies;

module.exports = userModel;


//  function findAllLikedMovies(likedmovies) {
//      return userModel.find(likedmovies: movieTitle});
// }

function findAllFollowings(following) {
    return userModel.find({_id: {$in: following}});
}

function findAllbefollowedbys(follower) {
    return userModel.find({_id: {$in: follower}});
}

function searchByUsername(keyword) {
    return userModel.find({"username": new RegExp(keyword, 'i')});
}

function findUserBylikedmovies(movieTitle) {
    return userModel.find({likedmovies: movieTitle});
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