define([
  "app",
  "modules/user/views"
],

function(app, Views) {

  var User = app.module();

  User.Model = Backbone.Model.extend({
    idAttribute: "_id",

    url: function() {
      return "/api/users/" + this.get("email") + "/" + this.get("password");
    }
  });

  User.Views = Views;

  return User;

});
