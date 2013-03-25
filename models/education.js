(function() {

  "use strict";

  module.exports = function(app, mongoose) {

    var KeywordSchema = app.Schemas.Keyword
      , EducationSchema = app.Schemas.Education;

    return mongoose.model('Education', EducationSchema);

  };

}());
