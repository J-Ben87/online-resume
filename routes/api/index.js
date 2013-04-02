(function() {

  "use strict";

  module.exports = function(app, passport) {

    require('./experiences')(app, passport);
    require('./educations')(app, passport);
    require('./users')(app, passport);

    app.get('/api', function(req, res) {
      res.send("API is running!");
    });

  };

}());