(function() {

  "use strict";

  module.exports = function(app, passport) {

    var DetailModel = app.Models.Detail;

    app.get('/api/detail', function(req, res) {
      return DetailModel.findOne(function(err, detail) {
        if (!err) {
          return res.send(detail);
        } else {
          return console.log(err);
        }
      });
    });

    app.post('/api/detail', passport.authenticate('bearer', { session: false }), function(req, res) {
      var detail = new DetailModel({
        name: req.body.name,
        title: req.body.title,
        subtitle: req.body.subtitle,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        culture: req.body.culture,
        country: req.body.country,
        flag: req.body.flag,
        visa: req.body.visa,
        driving_license: req.body.driving_license
      });

      detail.save(function(err) {
        if (!err) {
          return console.log('Detail created');
        } else {
          return console.log(err);
        }
      });

      return res.send(detail);
    });

    app.put('/api/detail', passport.authenticate('bearer', { session: false }), function(req, res) {
      return DetailModel.findOne(function(err, detail) {
        detail.name = req.body.name;
        detail.title = req.body.title;
        detail.subtitle = req.body.subtitle;
        detail.phone = req.body.phone;
        detail.email = req.body.email;
        detail.address = req.body.address;
        detail.culture = req.body.culture;
        detail.country = req.body.country;
        detail.flag = req.body.flag;
        detail.visa = req.body.visa;
        detail.driving_license = req.body.driving_license;

        return detail.save(function(err) {
          if (!err) {
            console.log('Detail updated');
          } else {
            console.log(err);
          }

          return res.send(detail);
        });
      });
    });

  };

}());
