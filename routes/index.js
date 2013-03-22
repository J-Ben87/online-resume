(function(exports) {

  "use strict";

  exports.initialize = function(app) {

    require('./api')(app);

    app.get(/^(\/\w+)*$/, function(req, res) {
      res.sendfile('public/index.html');
    });

  };

}(exports));
