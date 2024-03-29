(function(exports) {

  "use strict";

  exports.initialize = function(app, passport) {

    var BearerStrategy = require('passport-http-bearer').Strategy;

    passport.use(new BearerStrategy(function(access_token, done) {
      process.nextTick(function() {

        app.Models.User.findOne({ access_token: access_token }, function(err, user) {
          if (err) return done(err);
          if (!user) return done(null, false);
          return done(null, user);
        });

      });
    }));

    require('./api')(app, passport);
    require('./admin')(app);

    app.get('/', function(req, res) {
      res.render('index.html');
    });

    app.get('/downloads/resume - benoit jouhaud.pdf', function(req, res) {
      res.sendFile('/downloads/resume - benoit jouhaud.pdf');
    });

  };

}(exports));
