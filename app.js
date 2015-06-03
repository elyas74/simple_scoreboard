
global.init = require('./config.json');

// downloaded modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var logger = require('morgan');
var session = require('cookie-session');
var compression = require('compression');

//------------------------------------------------------------------
// my own modules
require('./server/utils/requires');
//------------------------------------------------------------------
app = express();

// view engine setup
//app.use(logger('dev'));
app.use(compression());
app.use(cookieParser('dfinsfnafihtcoytounrgw'));
app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'client/public')));

app.use(session({
    name: 'shroom',
    secret: 'cgnkytdkhgvouyvouyfjgfhch'
}));
//------------------------------------------------------------------
// app.use needs for posting data from forms to node
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//------------------------------------------------------------------
// add routes
require('./server/routes/_root')(app);
module.exports = app;
