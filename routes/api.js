(function() {

  "use strict";

  module.exports = function(app) {

    require('./api/experiences')(app);
    require('./api/educations')(app);

    app.get('/api', function(req, res) {
      res.send("API is running!");
    });

  };

}());
