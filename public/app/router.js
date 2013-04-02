define([
  "app",
  "modules/experience",
  "modules/education",
  "modules/user"
],

function(app, Experience, Education, User) {

  var Router = Backbone.Router.extend({

    routes: {
      "": "index",
      "admin/experiences": "experiences",
      "admin/educations": "educations",
      "admin/login": "login",
      "admin/logout": "logout"
    },

    index: function() {

    },

    experiences: function() {
      this.reset("experiences");

      if (!app.user.isAuthenticated()) {
        return this.navigate("admin/login", true);
      }

      app.useLayout("admin-layout").setViews({
        "#content": new Experience.Views.List({ collection: this.Collections.experiences })
      }).render();

      this.Collections.experiences.fetch();
    },

    educations: function() {
      this.reset("educations");

      if (!app.user.isAuthenticated()) {
        return this.navigate("admin/login", true);
      }

      app.useLayout("admin-layout").setViews({
        "#content": new Education.Views.List({ collection: this.Collections.educations })
      }).render();

      this.Collections.educations.fetch();
    },

    login: function() {
      this.reset();

      app.useLayout("admin-layout").setViews({
        "#content": new User.Views.Login({ model: app.user })
      }).render();
    },

    logout: function() {
      this.reset();
      app.trigger("user:logout");
    },

    reset: function(route) {
      if (this.Collections.experiences.length) {
        this.Collections.experiences.reset();
      }

      if (this.Collections.educations.length) {
        this.Collections.educations.reset();
      }

      if (app.layout) {
        app.layout.getViews().each(function(view) {
          view.remove();
        });
      }

      this.routes.active = route;
    },

    initialize: function() {
      this.Collections = {
        experiences: new Experience.Collection(),
        educations: new Education.Collection()
      };

      app.Models = {
        Experience: Experience.Model,
        Education: Education.Model,
        User: User.Model
      };

      app.Collections = {
        Experiences: Experience.Collection,
        Educations: Education.Collection
      };

      app.user = new User.Model();
      app.on("user:login", app.user.login, app.user);
      app.on("user:logout", app.user.logout, app.user);

      var self = this;
      Handlebars.registerHelper("is_active", function(route, options) {
        if (self.routes.active == route) {
          return options.fn(this);
        }
      });

      Handlebars.registerHelper("is_authenticated", function(options) {
        if (app.user.isAuthenticated()) {
          return options.fn(this);
        }
      });
    }

  });

  return Router;
});
