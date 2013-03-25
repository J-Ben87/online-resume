(function() {

  "use strict";

  module.exports = function(app, mongoose) {

    var KeywordSchema = app.Schemas.Keyword
      , ExperienceSchema = app.Schemas.Experience;

    return mongoose.model('Experience', ExperienceSchema);

  };

}());
