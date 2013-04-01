(function() {

  "use strict";

  module.exports = function(app, passport) {

    var EducationModel = app.Models.Education;

    app.get('/api/educations', function(req, res) {
      return EducationModel.find(function(err, educations) {
        if (!err) {
          return res.send(educations);
        } else {
          return console.log(err);
        }
      });
    });

    app.get('/api/educations/:id', function(req, res) {
      return EducationModel.findById(req.params.id, function(err, education) {
        if (!err) {
          return res.send(education);
        } else {
          return console.log(err);
        }
      });
    });

    app.post('/api/educations', passport.authenticate('bearer', { session: false }), function(req, res) {
      var education = new EducationModel({
        title: req.body.title,
        started_on: req.body.started_on,
        ended_on: req.body.ended_on,
        school: req.body.school,
        website: req.body.website,
        location: req.body.location,
        keywords: req.body.keywords,
        description: req.body.description,
        order: req.body.order
      });

      education.save(function(err) {
        if (!err) {
          return console.log('Education created');
        } else {
          return console.log(err);
        }
      });

      return res.send(education);
    });

    app.put('/api/educations/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
      return EducationModel.findById(req.params.id, function(err, education) {
        education.title = req.body.title;
        education.started_on = req.body.started_on;
        education.ended_on = req.body.ended_on;
        education.school = req.body.school;
        education.website = req.body.website;
        education.location = req.body.location;
        education.keywords = req.body.keywords;
        education.description = req.body.description;
        education.order = req.body.order;

        return education.save(function(err) {
          if (!err) {
            console.log('Education updated');
          } else {
            console.log(err);
          }

          return res.send(education);
        });
      });
    });

    app.delete('/api/educations/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
      return EducationModel.findById(req.params.id, function(err, education) {
        return education.remove(function(err) {
          if (!err) {
            console.log('Education removed');
            return res.send('');
          } else {
            console.log(err);
          }
        });
      });
    });

  };

}());
