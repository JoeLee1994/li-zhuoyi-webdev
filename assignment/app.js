/**
 * Created by Joe on 2017/6/3.
 */
var app = require('../express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/li-zhuoyi-webdev');
mongoose.Promise = require('q').Promise;


require('./services/user.service.server');
require('./services/website.service.server');
require('./services/widget.service.server');
require('./services/page.service.server');