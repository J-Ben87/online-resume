define([
  "app",
  "modules/experience",
  "modules/education",
  "modules/language",
  "modules/hobby",
  "modules/user"
],

function(app, Experience, Education, Language, Hobby, User) {

  var Router = Backbone.Router.extend({

    routes: {
      "": "index",
      "admin/experiences": "experiences",
      "admin/educations": "educations",
      "admin/languages": "languages",
      "admin/hobbies": "hobbies",
      "admin/login": "login",
      "admin/logout": "logout"
    },

    index: function() {
    },

    experiences: function() {
      this.reset({ route: "experiences", referer: "admin/experiences" });

      if (!app.user.isAuthenticated()) {
        return this.navigate("admin/login", true);
      }

      app.useLayout("admin-layout").setViews({
        "#content": new Experience.Views.List({ collection: this.collections.experiences })
      }).render();

      this.collections.experiences.fetch();
    },

    educations: function() {
      this.reset({ route: "educations", referer: "admin/educations" });

      if (!app.user.isAuthenticated()) {
        return this.navigate("admin/login", true);
      }

      app.useLayout("admin-layout").setViews({
        "#content": new Education.Views.List({ collection: this.collections.educations })
      }).render();

      this.collections.educations.fetch();
    },

    languages: function() {
      this.reset({ route: "languages", referer: "admin/languages" });

      if (!app.user.isAuthenticated()) {
        return this.navigate("admin/login", true);
      }

      app.useLayout("admin-layout").setViews({
        "#content": new Language.Views.List({ collection: this.collections.languages })
      }).render();

      this.collections.languages.fetch();
    },

    hobbies: function() {
      this.reset({ route: "hobbies", referer: "admin/hobbies" });

      if (!app.user.isAuthenticated()) {
        return this.navigate("admin/login", true);
      }

      app.useLayout("admin-layout").setViews({
        "#content": new Hobby.Views.List({ collection: this.collections.hobbies })
      }).render();

      this.collections.hobbies.fetch();
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

    reset: function(route, options) {
      if (_.isObject(route)) {
        options = route;
      }

      options = options || {};

      if (_.isString(route)) {
        options.template = route;
      }

      if (this.collections.experiences.length) {
        this.collections.experiences.reset();
      }

      if (this.collections.educations.length) {
        this.collections.educations.reset();
      }

      if (this.collections.languages.length) {
        this.collections.languages.reset();
      }

      if (this.collections.hobbies.length) {
        this.collections.hobbies.reset();
      }

      if (app.layout) {
        app.layout.getViews().each(function(view) {
          view.remove();
        });
      }

      if (options.referer) {
        this.referer = options.referer;
      }
      this.routes.active = options.route;
    },

    initialize: function() {
      this.collections = {
        experiences: new Experience.Collection(),
        educations: new Education.Collection(),
        languages: new Language.Collection(),
        hobbies: new Hobby.Collection()
      };

      app.modules = {
        Experience: Experience,
        Education: Education,
        Language: Language,
        Hobby: Hobby,
        User: User
      };

      this.referer = "admin/educations";

      app.user = new User.Model();
      app.rememberMe = new User.RememberMe();

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
