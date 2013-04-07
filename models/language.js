(function() {

  "use strict";

  module.exports = function(mongoose, KeywordSchema) {

    return new mongoose.Schema({
      culture: String,
      country: String,
      language: String,
      flag: String,
      keywords: [ KeywordSchema ],
      is_highlighted: Boolean,
      order: Number
    });

  };

}());
