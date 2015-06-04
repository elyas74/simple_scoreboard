var db = require('mongo_schemas');
var _ = require('underscore');

// '/del' is exception, don't add it in include_guest_get Array

var include_guest_get = [ '/' ],
    exclude_ajax_post = [ '/' ];


var black_list = {};
var printed_black_list = {} ;

setInterval(function(){
    black_list = {};
    printed_black_list = {};
    // console.log("clean the IPs");
},60000);


module.exports = (function () {
    var _return = {};

    _return.get = function (req, res, next) {

        black_list[req.ip] = black_list[req.ip] + 1 || 1 ;

        // console.open(black_list);
        if( black_list[req.ip] < global.init.req_per_min){
            next();
    //        console.log(req.url);

            /*if (req.url == '/del' && !req.session.q) {
                next();
            }
            else */ /*if (req.url == '/del') {
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
            }*/
        } else {
            res.status(403).send('u r blocked for sending too many request..');
            if(!printed_black_list[req.ip]){
                console.log("*** too many requests from -> " + req.ip);
                printed_black_list[req.ip] = true ;
            }
            
        }
    };

    _return.post = function (req, res, next) {

//        console.log("star");

        black_list[req.ip] = black_list[req.ip] + 1 || 1 ;

        if( black_list[req.ip] < global.init.req_per_min){
            next();
            /*db.contacts.findOne({_id: req.session.q }).lean().exec(
                function (err, contact) {
                    if (contact) {
                            req.contact = contact;
                    } else {
                        next();
                    }
                });*/
        } else {
            res.status(403).send('u r blocked for sending too many request...');
            if(!printed_black_list[req.ip]){
                console.log("*** too many requests from -> " + req.ip);
                printed_black_list[req.ip] = true ;
            }
            
        }  
    };

    return _return;
})();
