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
