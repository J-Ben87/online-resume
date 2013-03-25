(function() {

  "use strict";

  module.exports = function(app, mongoose) {

    var UserSchema = app.Schemas.User;

    return mongoose.model('User', UserSchema);

  };

}());
