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
    },

    login: function() {
      return app.router.navigate("admin/educations", { trigger: true });
    },

    logout: function() {
      this.clear();
      return app.router.navigate("admin/login", { trigger: true });
    },

    isAuthenticated: function() {
      return this.get("access_token") ? true : false;
    }
  });

  User.Views = Views;

  return User;

});
