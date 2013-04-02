define([
  "app"
],

function(app) {

  var Views = {};

  Views.Login = Backbone.View.extend({
    template: "user/login",
    tagName: "form",
    className: "form-horizontal",

    events: {
      "submit": "login"
    },

    login: function(e) {
      e.preventDefault();

      this.model.set(this.unserialize());
      this.model.fetch({
        success: function() {
          app.trigger("user:login");
        }
      });
    },

    unserialize: function() {
      return {
        email: this.$("#email").val(),
        password: this.$("#password").val()
      };
    }
  });

  return Views;

});
