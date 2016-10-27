import * as session from 'express-session'
import Database from './db';
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';

import routes from './routes/index';
import users from './routes/users';
import * as mongodb from 'mongodb';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use (session ({
    secret: 'this is my secret code...',
    resave: false,
    saveUninitialized: true
}));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API routes.
import restaurants from './api/restaurants';
app.use('/api/restaurants', restaurants);


// app.get('/api/users', (req, res) => {
//     console.log ('- here at users endpoint...');
//     res.json ({});
// });

import usersApi from './api/users';
app.use('/api/users', usersApi);


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));

app.use('/', routes);
app.use('/users', users);



Database.connect().then((db) => {

})
////////////////////////////////////////////////////////////////////////////////
app.post('/signup', function(request, response) {
    console.log('bob ', request.body);

    Database.db.collection('users').findOne({username: request.body.username}, function(error, result){
        if(error != null) {
            throw error;
            console.log('this is the user' + error);
        }


        if(result) {
            // throw an error if user is found and if user already exists
            // throw new Error ('Username already in db.');
            console.error ('Username already in db.');
            // response.send ('Username already in db.');
            response.json ({
                data: {
                    redirect: 'signup',
                    message: 'This username already exists.'
                }
            });
        } else {
            // if no user is found with existing username create username
            Database.db.collection('users').save(request.body, function(error, result) {
                if(error != null) {
                    throw error;
                    console.log(error);
                }
                response.redirect('/login');
            });
        }
    });
});
app.post('/login', function(request, response) {
    Database.db.collection('users').findOne (
        {
            username: request.body.username,
            password: request.body.password
        },
        function (error, user) {
            console.log(user);

            if(!user) {
                response.redirect('/error');
            } else {
                //sets user session
                request.session.user = user;

                if (user && user.admin) {
                    response.redirect('/adminHome');
                }
                else {
                    //redirect to user page
                    response.redirect('/userHome');
                }

            };
        });

    });

    app.post('/reset', function(request, response) {
        Database.db.collection('users').findOneAndUpdate(
            {
                username: request.body.username
            },
            {
                $set: {
                    password: request.body.password

                }
            },

            function (error, result) {
                if(error) {
                    throw error;
                    return;
                }
                response.redirect('/login');
            }
        );
    });
    // app.get('/profile', function(request, response) {
    //     var user = request.session.user;
    //     response.render('/profile');
    // });

    app.get('/logout', function(request, response) {
        request.session.destroy();
        response.redirect('/mainHome');
    });

    app.get('/admin', function(request, response) {
        var user = request.session.user;

        if (user && user.admin) {
            response.redirect('/adminHome');
        }
        else {
            response.redirect('/error');
        }
    });


////////////////////////////////////////////////////////////////////////////////

// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err:Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export = app;
