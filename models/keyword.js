(function() {

  "use strict";

  module.exports = function(mongoose) {

    return new mongoose.Schema({
      label: String,
      scope: String
    });

  };

}());
