
var db = require('mongo_schemas');
var _ = require('underscore');
//var convert_date = require('date');
var fs = require('fs');

var debug_mode = false;

var simple_routes = [];

var file_routes = [ 'sign_up' ,'scoreboard'];

app.route('/*').get(require('./star').get).post(require('./star').post);
app.route('/').get(require('./index').get).post(require('./index').post);


module.exports = function (app) {

    simple_routes.forEach(function (data) {
        app.route('/' + data)
            .get(function (req, res) {
                res.render(data);
            });
    });

    file_routes.forEach(function (file_name) {
        if (debug_mode)
            console.log('/' + file_name);
//        if(file_name.indexOf("base") > -1)

        app.route('/' + file_name)
            .get(require('./' + file_name).get)
            .post(require('./' + file_name).post);
    });

//------------------------------------------------------------------

    if(global.init.developer){
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handlers

        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function (err, req, res) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    }

    app.route('/*').get(function (req, res) {
        res.redirect('/');
    });
};
