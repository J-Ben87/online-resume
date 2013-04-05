(function() {

  "use strict";

  module.exports = function(app, passport) {

    var HobbyModel = app.Models.Hobby;

    app.get('/api/hobbies', function(req, res) {
      return HobbyModel.find(function(err, hobbies) {
        if (!err) {
          return res.send(hobbies);
        } else {
          return console.log(err);
        }
      });
    });

    app.get('/api/hobbies/:id', function(req, res) {
      return HobbyModel.findById(req.params.id, function(err, hobby) {
        if (!err) {
          return res.send(hobby);
        } else {
          return console.log(err);
        }
      });
    });

    app.post('/api/hobbies', passport.authenticate('bearer', { session: false }), function(req, res) {
      var hobby = new HobbyModel({
        name: req.body.name,
        flag: req.body.flag,
        keywords: req.body.keywords,
        is_highlighted: req.body.is_highlighted,
        order: req.body.order
      });

      hobby.save(function(err) {
        if (!err) {
          return console.log('Hobby created');
        } else {
          return console.log(err);
        }
      });

      return res.send(hobby);
    });

    app.put('/api/hobbies/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
      return HobbyModel.findById(req.params.id, function(err, hobby) {
        hobby.name = req.body.name;
        hobby.flags = req.body.flags;
        hobby.keywords = req.body.keywords;
        hobby.is_highlighted = req.body.is_highlighted;
        hobby.order = req.body.order;

        return hobby.save(function(err) {
          if (!err) {
            console.log('Hobby updated');
          } else {
            console.log(err);
          }

          return res.send(hobby);
        });
      });
    });

    app.delete('/api/hobbies/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
      return HobbyModel.findById(req.params.id, function(err, hobby) {
        return hobby.remove(function(err) {
          if (!err) {
            console.log('Hobby removed');
            return res.send('');
          } else {
            console.log(err);
          }
        });
      });
    });

  };

}());
