(function() {

  "use strict";

  module.exports = function(app) {

    var ExperienceModel = app.Models.Experience;

    app.get('/api/experiences', function(req, res) {
      return ExperienceModel.find(function(err, experiences) {
        if (!err) {
          return res.send(experiences);
        } else {
          return console.log(err);
        }
      });
    });

    app.get('/api/experiences/:id', function(req, res) {
      return ExperienceModel.findById(req.params.id, function(err, experience) {
        if (!err) {
          return res.send(experience);
        } else {
          return console.log(err);
        }
      });
    });

    app.post('/api/experiences', function(req, res) {
      var experience = new ExperienceModel({
        position: req.body.position,
        started_on: req.body.started_on,
        ended_on: req.body.ended_on,
        project: req.body.project,
        project_website: req.body.project_website,
        company: req.body.company,
        company_website: req.body.company_website,
        keywords: req.body.keywords,
        description: req.body.description,
        order: req.body.order
      });

      experience.save(function(err) {
        if (!err) {
          return console.log('Experience created');
        } else {
          return console.log(err);
        }
      });

      return res.send(experience);
    });

    app.put('/api/experiences/:id', function(req, res) {
      return ExperienceModel.findById(req.params.id, function(err, experience) {
        experience.position = req.body.position;
        experience.started_on = req.body.started_on;
        experience.ended_on = req.body.ended_on;
        experience.project = req.body.project;
        experience.project_website = req.body.project_website;
        experience.company = req.body.company;
        experience.company_website = req.body.company_website;
        experience.keywords = req.body.keywords;
        experience.description = req.body.description;
        experience.order = req.body.order;

        return experience.save(function(err) {
          if (!err) {
            console.log('Experience updated');
          } else {
            console.log(err);
          }

          return res.send(experience);
        });
      });
    });

    app.delete('/api/experiences/:id', function(req, res) {
      return ExperienceModel.findById(req.params.id, function(err, experience) {
        return experience.remove(function(err) {
          if (!err) {
            console.log('Experience removed');
            return res.send('');
          } else {
            console.log(err);
          }
        });
      });
    });

  };

}());
