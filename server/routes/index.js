
//var encrypt = require('encrypt');
var db = require('mongo_schemas');
//var _ = require('underscore');

module.exports.get = function (req, res) {
    res.redirect('/scoreboard');
};

module.exports.post = function (req, res,next) {
    next();
};
