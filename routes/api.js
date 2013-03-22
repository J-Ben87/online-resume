(function() {

  "use strict";

  module.exports = function(app) {

    require('./experiences')(app);
    require('./educations')(app);

    app.get('/api', function(req, res) {
      res.send("API is running!");
    });

  };

}());
