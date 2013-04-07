(function() {

  "use strict";

  module.exports = function(mongoose) {

    return new mongoose.Schema({
      name: String,
      title: String,
      subtitle: String,
      phone: String,
      email: String,
      address: String,
      culture: String,
      country: String,
      flag: String,
      visa: String,
      driving_license: String
    });

  };

}());
