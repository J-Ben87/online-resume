(function(exports) {

  "use strict";

  exports.initialize = function(app, mongoose) {

    app.Schemas = {};

    app.Schemas.Keyword =    require('./keyword')(mongoose);
    app.Schemas.Experience = require('./keyword')(mongoose, app.Schemas.Keyword);
    app.Schemas.Education =  require('./keyword')(mongoose, app.Schemas.Education);
    app.Schemas.User =       require('./keyword')(mongoose);

  };

}(exports));
