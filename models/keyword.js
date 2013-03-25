(function() {

  "use strict";

  module.exports = function(app, mongoose) {

    var KeywordSchema = app.Schemas.Keyword;

    return mongoose.model('Keyword', KeywordSchema);

  };

}());
