(function(exports) {

  "use strict";

  exports.initialize = function(app, mongoose) {

    app.Schemas = {};

    app.Schemas.Keyword =    require('./keyword')(mongoose);
    app.Schemas.Experience = require('./experience')(mongoose, app.Schemas.Keyword);
    app.Schemas.Education =  require('./education')(mongoose, app.Schemas.Keyword);
    app.Schemas.User =       require('./user')(mongoose);

  };

}(exports));
