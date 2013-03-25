(function() {

  "use strict";

  module.exports = function(app, passport) {

    require('./api/experiences')(app);
    require('./api/educations')(app);
    require('./api/users')(app);

    app.get('/api', function(req, res) {
      res.send("API is running!");
    });

  };

}());
