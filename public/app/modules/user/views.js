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
        success: function(model, response, options) {
          app.user.access_token = model.get("access_token");
          app.router.navigate("admin/educations", { trigger: true });
        },
        error: function(model, response) {
        }
      });
    },

    unserialize: function() {
      return {
        email: this.$("#email").val(),
        password: this.$("#password").val()
      };
    },

    initialize: function() {
      this.model = new app.Models.User();
    }
  });

  return Views;

});
