var db = require('mongo_schemas');
var _ = require('underscore');

// '/del' is exception, don't add it in include_guest_get Array

var include_guest_get = [ '/' ],
    exclude_ajax_post = [ '/' ];


module.exports = (function () {
    var _return = {};

    _return.get = function (req, res, next) {

//        console.log(req.url);

        /*if (req.url == '/del' && !req.session.q) {
            next();
        }
        else */if (req.url == '/del') {
            next();
        } else if (req.session.q) {
            db.contacts.findOne({_id: req.session.q }).lean().exec(
                function (err, contact) {
                    if (contact) {
                            req.contact = contact;
                    } else {
                        res.render('auth_error');
                    }
                });
        } else if (_.contains(include_guest_get, req.url)) {
            next();
        } else {
            // res.render('auth_error');
            next();
        }
    };

    _return.post = function (req, res, next) {

//        console.log("star");

        db.contacts.findOne({_id: req.session.q }).lean().exec(
            function (err, contact) {
                if (contact) {
                        req.contact = contact;
                } else {
                    next();
                }
            });
    };

    return _return;
})();
