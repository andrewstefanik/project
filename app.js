"use strict";
var session = require("express-session");
var db_1 = require("./db");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var index_1 = require("./routes/index");
var users_1 = require("./routes/users");
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'this is my secret code...',
    resave: false,
    saveUninitialized: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var restaurants_1 = require("./api/restaurants");
app.use('/api/restaurants', restaurants_1.default);
var users_2 = require("./api/users");
app.use('/api/users', users_2.default);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));
app.use('/', index_1.default);
app.use('/users', users_1.default);
db_1.default.connect().then(function (db) {
});
app.post('/signup', function (request, response) {
    console.log('bob ', request.body);
    db_1.default.db.collection('users').findOne({ username: request.body.username }, function (error, result) {
        if (error != null) {
            throw error;
            console.log('this is the user' + error);
        }
        if (result) {
            console.error('Username already in db.');
            response.json({
                data: {
                    redirect: 'signup',
                    message: 'This username already exists.'
                }
            });
        }
        else {
            db_1.default.db.collection('users').save(request.body, function (error, result) {
                if (error != null) {
                    throw error;
                    console.log(error);
                }
                response.redirect('/login');
            });
        }
    });
});
app.post('/login', function (request, response) {
    db_1.default.db.collection('users').findOne({
        username: request.body.username,
        password: request.body.password
    }, function (error, user) {
        console.log(user);
        if (!user) {
            response.redirect('/error');
        }
        else {
            request.session.user = user;
            if (user && user.admin) {
                response.redirect('/adminHome');
            }
            else {
                response.redirect('/userHome');
            }
        }
        ;
    });
});
app.post('/reset', function (request, response) {
    db_1.default.db.collection('users').findOneAndUpdate({
        username: request.body.username
    }, {
        $set: {
            password: request.body.password
        }
    }, function (error, result) {
        if (error) {
            throw error;
            return;
        }
        response.redirect('/login');
    });
});
app.get('/logout', function (request, response) {
    request.session.destroy();
    response.redirect('/mainHome');
});
app.get('/admins', function (request, response) {
    var user = request.session.user;
    if (user && user.admin) {
        response.redirect('/admin');
    }
    else {
        response.redirect('/error');
    }
});
app.get('/*', function (req, res, next) {
    if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
        return next({ status: 404, message: 'Not Found' });
    }
    else {
        return res.render('index');
    }
});
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function (err, req, res, next) {
    res.status(err['status'] || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
