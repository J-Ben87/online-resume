(function() {

  "use strict";

  module.exports = function(app) {

    var UserModel = app.Models.User;

    app.get('/api/users', function(req, res) {
      return UserModel.find(function(err, users) {
        if (!err) {
          return res.send(users);
        } else {
          return console.log(err);
        }
      });
    });

    app.get('/api/users/:id', function(req, res) {
      return UserModel.findById(req.params.id, function(err, user) {
        if (!err) {
          return res.send(user);
        } else {
          return console.log(err);
        }
      });
    });

    app.post('/api/users', function(req, res) {
      var user = new UserModel({
        email: req.body.email,
        password: req.body.password,
        token: req.body.token
      });

      user.save(function(err) {
        if (!err) {
          return console.log('User created');
        } else {
          return console.log(err);
        }
      });

      return res.send(user);
    });

    app.put('/api/users/:id', function(req, res) {
      return UserModel.findById(req.params.id, function(err, user) {
        user.email = req.body.email;
        user.password = req.body.password;
        user.token = req.body.token;

        return user.save(function(err) {
          if (!err) {
            console.log('User updated');
          } else {
            console.log(err);
          }

          return res.send(user);
        });
      });
    });

    app.delete('/api/users/:id', function(req, res) {
      return UserModel.findById(req.params.id, function(err, user) {
        return user.remove(function(err) {
          if (!err) {
            console.log('User removed');
            return res.send('');
          } else {
            console.log(err);
          }
        });
      });
    });

  };

}());
