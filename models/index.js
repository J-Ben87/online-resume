(function(exports) {

  "use strict";

  exports.initialize = function(app, mongoose) {

    var KeywordSchema =    require('./keyword')(mongoose)
      , ExperienceSchema = require('./experience')(mongoose, KeywordSchema)
      , EducationSchema =  require('./education')(mongoose, KeywordSchema)
      , LanguageSchema =   require('./language')(mongoose, KeywordSchema)
      , HobbySchema =      require('./hobby')(mongoose, KeywordSchema)
      , UserSchema =       require('./user')(mongoose);

    app.Models = {};

    app.Models.Keyword =    mongoose.model('Keyword', KeywordSchema),
    app.Models.Experience = mongoose.model('Experience', ExperienceSchema),
    app.Models.Education =  mongoose.model('Education', EducationSchema),
    app.Models.Language =   mongoose.model('Language', LanguageSchema),
    app.Models.Hobby =      mongoose.model('Hobby', HobbySchema),
    app.Models.User =       mongoose.model('User', UserSchema)

  };

}(exports));
