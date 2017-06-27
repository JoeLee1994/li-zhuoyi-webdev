/**
 * Created by Joe on 2017/6/3.
 */
var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var movieModel = require('../models/movie/movie.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['email']
};
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

app.get    ('/api/project/user/:userId', findUserById);
app.get    ('/api/project/user', findUserByUsername);
app.get    ('/api/project/users', isAdmin, findAllUsers);
app.get    ('/api/project/user', findUserByCredentials);
app.post   ('/api/project/user', isAdmin, createUser);
app.delete ('/api/project/user/:userId', isAdmin, deleteUser);
app.get    ('/api/project/movie/', isPublisher, findAlllikedMovies);
app.put    ('/api/project/user/:userId', updateUser); // to be protected
app.post   ('/api/project/login', passport.authenticate('local'), login);
app.post   ('/api/project/logout', logout);
app.get    ('/api/project/loggedin', loggedin);
app.get    ('/api/project/checkAdmin', checkAdmin);
app.get    ('/api/project/checkPublisher', checkPublisher);
app.post   ('/api/project/register', register);
app.post   ('/api/project/unregister', unregister);
app.get    ('/api/project/user/:userId', findAlllikedMovies);
app.get    ('/api/project/user', findUserBylikedmovies);
app.get    ('/api/project/search/user/:keyword', searchByUsername);
app.get    ('/api/project/user/:userId/followings', findAllFollowings);
app.get    ('/api/project/user/:userId/befollowedbys', findAllbefollowedbys);



app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

function findAllFollowings(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            return userModel
                .findAllFollowings(user.following);
        }, function (err) {
            res.send(err);
        })
        .then(function (users) {
            res.json(users);
        });
}

function findAllbefollowedbys(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            return userModel
                .findAllbefollowedbys(user.befollowedby);
        }, function (err) {
            res.send(err);
        })
        .then(function (users) {
            res.json(users);
        });
}

function searchByUsername(req, res) {
    var keyword = req.params['keyword'];
    userModel
        .searchByUsername(keyword)
        .then(
            function (result) {
                if (result) {
                    res.json(result);
                } else {
                    res.status(402).send("No matched result in users.");
                }
            }, function (err) {
                res.status(404).send(err);
            });
}


function findUserBylikedmovies(req, res) {
    movieModel
        .findUserBylikedmovies()
        .then(function (users) {
            res.send(users);
        })
}


function findAlllikedMovies(req, res) {
    movieModel
        .findAlllikedMovies()
        .then(function (movies) {
            res.json(movies);
        })

}

function checkPublisher(req, res) {
    res.send(req.isAuthenticated() && req.user.roles.indexOf('PUBLISHER') > -1 ? req.user : '0');
}



function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next(); // continue to next middleware;
    } else {
        res.sendStatus(401);
    }
}

function isPublisher(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('PUBLISHER') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function findAllUsers(req, res) {
    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        })
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            },
            function(err) {
                done(err, false);
            }
        );
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function checkAdmin(req, res) {
    res.send(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1 ? req.user : '0');
}

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);

    userModel
        .createUser(userObj)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(status);
            });
        });
}

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        });
}


// all parameters send to req
function findUserById (req, res) {
    userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserByCredentials (req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function () {
            res.sendStatus(404);
        });
}

function createUser (req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function updateUser (req, res) {
    var newUser = req.body;
    var userId = req.params.userId;

    userModel
        .updateUser(userId, newUser)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function deleteUser (req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function findUserByUsername (req, res) {
    var username = req.query['username'];

    userModel
        .findUserByUsername(username)
        .then(function (user) {
            res.json(user);
        }, function () {
            user = null;
            res.send(user);
        });
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

