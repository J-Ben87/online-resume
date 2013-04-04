(function() {

  "use strict";

  module.exports = function(mongoose, KeywordSchema) {

    return new mongoose.Schema({
      title: String,
      started_on: Date,
      ended_on: Date,
      school: String,
      website: String,
      location: String,
      highlights: [ KeywordSchema ],
      description: String,
      order: Number
    });

  };

}());
