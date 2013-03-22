(function(exports) {

  "use strict";

  exports.initialize = function(app, mongoose) {

    var KeywordSchema = require('./schemas/keyword')(mongoose)
      , ExperienceSchema = require('./schemas/experience')(mongoose, KeywordSchema)
      , EducationSchema  = require('./schemas/education')(mongoose, KeywordSchema);

    app.Models = {
      Keyword:    mongoose.model('Keyword', KeywordSchema),
      Experience: mongoose.model('Experience', ExperienceSchema),
      Education:  mongoose.model('Education', EducationSchema)
    }

  };

}(exports));
