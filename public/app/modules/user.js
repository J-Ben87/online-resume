define([
  "app",
  "modules/user/views",
  "backbone.localstorage"
],

function(app, Views) {

  var User = app.module();

  User.Model = Backbone.Model.extend({
    idAttribute: "_id",

    url: function() {
      return "/api/users/" + this.get("email") + "/" + this.get("password");
    },

    login: function(user) {
      this.set(user);
      this.fetch({
        success: function(model, response, options) {
          if (app.rememberMe.isNew()) {
            app.rememberMe.save(model.toJSON());
          }

          return app.router.navigate(app.router.referer, true);
        },
        error: function(model, response, options) {
          return app.trigger("user:login:error", model);
        }
      });
    },

    logout: function() {
      this.clear();
      app.rememberMe.destroy();

      return app.router.navigate("admin/login", true);
    },

    isAuthenticated: function() {
      return (this.get("access_token") ? true : false);
    },

    initialize: function() {
      app.on("user:login", this.login, this);
      app.on("user:logout", this.logout, this);
    }
  });

  User.RememberMe = Backbone.Model.extend({
    idAttribute: "_id",
    localStorage: new Backbone.LocalStorage("cv-rememberme"),

    parse: function(response, options) {
      return _.first(response);
    },

    initialize: function() {
      var self = this;
      this.fetch({
        success: function(model, response, options) {
          if (!self.isNew()) {
            app.trigger("user:login", model.toJSON());
          }
        }
      });
    }
  });

  User.Views = Views;

  return User;

});
