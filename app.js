var express = require('express')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , models = require('./models')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(passport.initialize());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/cv');
models.initialize(app, mongoose);
routes.initialize(app, passport);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port %d in %s environment", app.get('port'), app.settings.env);
});
