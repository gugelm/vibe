var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser');
const models = require('./models/model');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var vibesRouter = require('./routes/vibes');
var roomsRouter = require('./routes/rooms');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/frontend/dist/frontend/')));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors())

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/vibes', vibesRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/rooms', require('./models/crud')(models.Rooms));
app.use('/api/vibes', require('./models/crud')(models.Vibes));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/frontend/dist/frontend/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
