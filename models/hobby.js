(function() {

  "use strict";

  module.exports = function(mongoose, KeywordSchema) {

    return new mongoose.Schema({
      name: String,
      keywords: [ KeywordSchema ],
      order: Number
    });

  };

}());
