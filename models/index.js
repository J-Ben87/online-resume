(function(exports) {

  "use strict";

  exports.initialize = function(app, mongoose) {

    app.Models = {};

    app.Models.Keyword =    require('./keyword')(app, mongoose),
    app.Models.Experience = require('./experience')(app, mongoose),
    app.Models.Education =  require('./education')(app, mongoose),
    app.Models.User =       require('./user')(app, mongoose)

  };

}(exports));
