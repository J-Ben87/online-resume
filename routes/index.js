(function(exports) {

  "use strict";

  exports.initialize = function(app, passport, BearerStrategy) {

    var BearerStrategy = require('passport-http-bearer').Strategy;

    passport.use(new BearerStrategy(
      function(token, done) {
        app.Models.User.findOne({ token: token }, function(err, user) {
          if (err) return done(err);
          if (!user) return done(null, false);
          return done(null, user);
        });
      }
    ));

    require('./api')(app, passport);
    require('./admin')(app);

    // app.get(/^(\/\w+)*$/, function(req, res) {
    //   res.render('index.html');
    // });

  };

}(exports));
