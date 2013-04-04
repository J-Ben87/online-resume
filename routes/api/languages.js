(function() {

  "use strict";

  module.exports = function(app, passport) {

    var LanguageModel = app.Models.Language;

    app.get('/api/languages', function(req, res) {
      return LanguageModel.find(function(err, languages) {
        if (!err) {
          return res.send(languages);
        } else {
          return console.log(err);
        }
      });
    });

    app.get('/api/languages/:id', function(req, res) {
      return LanguageModel.findById(req.params.id, function(err, language) {
        if (!err) {
          return res.send(language);
        } else {
          return console.log(err);
        }
      });
    });

    app.post('/api/languages', passport.authenticate('bearer', { session: false }), function(req, res) {
      var language = new LanguageModel({
        name: req.body.name,
        flag: req.body.flag,
        keywords: req.body.keywords,
        order: req.body.order
      });

      language.save(function(err) {
        if (!err) {
          return console.log('Language created');
        } else {
          return console.log(err);
        }
      });

      return res.send(language);
    });

    app.put('/api/languages/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
      return LanguageModel.findById(req.params.id, function(err, language) {
        language.name = req.body.name;
        language.flags = req.body.flags;
        language.keywords = req.body.keywords;
        language.order = req.body.order;

        return language.save(function(err) {
          if (!err) {
            console.log('Language updated');
          } else {
            console.log(err);
          }

          return res.send(language);
        });
      });
    });

    app.delete('/api/languages/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
      return LanguageModel.findById(req.params.id, function(err, language) {
        return language.remove(function(err) {
          if (!err) {
            console.log('Language removed');
            return res.send('');
          } else {
            console.log(err);
          }
        });
      });
    });

  };

}());
