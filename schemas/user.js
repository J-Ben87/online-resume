(function() {

  "use strict";

  module.exports = function(mongoose) {

    return new mongoose.Schema({
      email: String,
      password: String,
      access_token: String
    });

  };

}());
