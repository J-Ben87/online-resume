(function() {

  "use strict";

  module.exports = function(app, passport) {

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

    app.post('/api/experiences', passport.authenticate('bearer', { session: false }), function(req, res) {
      var experience = new ExperienceModel({
        position: req.body.position,
        started_on: req.body.started_on,
        ended_on: req.body.ended_on,
        project: req.body.project,
        project_website: req.body.project_website,
        company: req.body.company,
        company_website: req.body.company_website,
        highlights: req.body.highlights,
        description: req.body.description,
        technologies: req.body.technologies,
        frameworks: req.body.frameworks,
        softwares: req.body.softwares,
        tools: req.body.tools,
        keywords: req.body.keywords,
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

    app.put('/api/experiences/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
      return ExperienceModel.findById(req.params.id, function(err, experience) {
        experience.position = req.body.position;
        experience.started_on = req.body.started_on;
        experience.ended_on = req.body.ended_on;
        experience.project = req.body.project;
        experience.project_website = req.body.project_website;
        experience.company = req.body.company;
        experience.company_website = req.body.company_website;
        experience.highlights = req.body.highlights;
        experience.description = req.body.description;
        experience.technologies = req.body.technologies;
        experience.frameworks = req.body.frameworks;
        experience.softwares = req.body.softwares;
        experience.tools = req.body.tools;
        experience.keywords = req.body.keywords;
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

    app.delete('/api/experiences/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
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
