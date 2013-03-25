(function(exports) {

  "use strict";

  exports.initialize = function(app) {

    require('./api')(app);
    require('./admin')(app);

    // app.get(/^(\/\w+)*$/, function(req, res) {
    //   res.render('index.html');
    // });

  };

}(exports));
