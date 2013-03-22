(function() {

  "use strict";

  module.exports = function(mongoose, KeywordSchema) {

    return new mongoose.Schema({
      position: String,
      started_on: Date,
      ended_on: Date,
      project: String,
      project_website: String,
      company: String,
      company_website: String,
      keywords: [ KeywordSchema ],
      description: String,
      order: Number
    });

  };

}());
