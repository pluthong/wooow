/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var http = require('http');
var config = require('./config')();
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
/**
 * Every controller need to be registered here.
 */

// var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routeconfig = require('./routes/routeconfig');

var Model = require('./model');
/**
 * Setup main environments.
 */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

passport.use(new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'join_email',
        passwordField: 'join_password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req,join_email, join_password, done) {

        new Model.User({ email: join_email }).fetch().then(function (data) {

            var user = data;

            if (user === null) {
                return done(null, false, { message: 'Invalid email or password' });
            } else {
                user = data.toJSON();

                // Generate a salt
                // var salt = bcrypt.genSaltSync(10);
                // Hash the password with the salt
                // var hash = bcrypt.hashSync(join_password, salt);
                // if (!bcrypt.compareSync(user.passcode, hash))

                if (join_password != user.password) {
                    return done(null, false, { message: 'Invalid email or password' });
                } else {
                    return done(null, user);
                }
            }
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (join_email, done) {
    new Model.User({ email: join_email }).fetch().then(function (user) {
        done(null, user);
    });
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routeconfig);
app.use('/lead', routeconfig);
app.use('/lead/:id', routeconfig);
app.use('/products/:productId', routeconfig);
app.use('/lead/save-lead', routeconfig);
app.use('/search-lead', routeconfig);
app.use('/search-lead/list', routeconfig);
app.use('/search-lead/:search?', routeconfig);
app.use('/about', routeconfig);
app.use('/signup', routeconfig);
app.use('/signin', routeconfig);
app.use('/signin/:email', routeconfig);
app.use('/products/list', routeconfig);


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.render('shared/error_page', {
            message: err.message,
            error: err,
            status: err.status || 500
        });
    });
}


/**
 * Let's handle some Errors.
 */
app.use(function (req, res, fn) {
    res.render('shared/error_page', { status: 404, url: req.url, error: 'Oooops ! Page not Found' });
});

app.use(function (err, req, res, next) {

    res.render('shared/error_page', {
        status: err.status || 500
      , error: err
    });

});

module.exports = app;

/**
 * Create server.
 */

http.createServer(app).listen(config.port,
  function () {
      console.log('Express server listening on port ' + config.port);
  });