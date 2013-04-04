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
      highlights: [ KeywordSchema ],
      description: String,
      technologies: [ KeywordSchema ],
      frameworks: [ KeywordSchema ],
      softwares: [ KeywordSchema ],
      tools: [ KeywordSchema ],
      keywords: [ KeywordSchema ],
      order: Number
    });

  };

}());
