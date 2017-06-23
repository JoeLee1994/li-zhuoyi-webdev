/**
 * Created by Joe on 2017/6/15.
 */
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://localhost/li-zhuoyi-webdev'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds017246.mlab.com:17246/heroku_g48msg32'; // user yours
}

mongoose.connect(connectionString);

require('./services/user.service.server');
require('./services/city.service.server');
require('./services/movie.service.server');
require('./services/cinema.service.server');