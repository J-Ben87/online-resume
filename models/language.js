(function() {

  "use strict";

  module.exports = function(mongoose, KeywordSchema) {

    return new mongoose.Schema({
      name: String,
      flag: String,
      keywords: [ KeywordSchema ],
      is_highlighted: Boolean,
      order: Number
    });

  };

}());
