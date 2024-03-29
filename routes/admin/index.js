(function() {

  "use strict";

  module.exports = function(app) {

    var view = 'index.html'
      , root = '/admin/';

    app.get(root + 'experiences', function(req, res) {
      res.render(view);
    });

    app.get(root + 'educations', function(req, res) {
      res.render(view);
    });

    app.get(root + 'languages', function(req, res) {
      res.render(view);
    });

    app.get(root + 'hobbies', function(req, res) {
      res.render(view);
    });

    app.get(root + 'detail', function(req, res) {
      res.render(view);
    });

    app.get(root + 'login', function(req, res) {
      res.render(view);
    });

    app.get(root + 'logout', function(req, res) {
      res.render(view);
    });

  };

}());
