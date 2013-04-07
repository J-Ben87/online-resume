define([
  "app",
  "modules/experience",
  "modules/education",
  "modules/language",
  "modules/hobby",
  "modules/detail",
  "modules/user"
],

function(app, Experience, Education, Language, Hobby, Detail, User) {

  var Router = Backbone.Router.extend({

    routes: {
      "": "index",
      "admin/experiences": "experiences",
      "admin/educations": "educations",
      "admin/languages": "languages",
      "admin/hobbies": "hobbies",
      "admin/detail": "detail",
      "admin/login": "login",
      "admin/logout": "logout"
    },

    index: function() {
      this.reset({ referer: "" });

      app.useLayout("layout").setViews({
        "#header": new Detail.Views.Header({ model: this.models.detail }),
        "#single-column": [
          new Experience.Views.List({ collection: this.collections.experiences }),
          new Education.Views.List({ collection: this.collections.educations })
        ],
        "#two-columns": [
          new Language.Views.List({ collection: this.collections.languages }),
          new Hobby.Views.List({ collection: this.collections.hobbies })
        ],
        "footer": new Detail.Views.Footer({ model: this.models.detail })
      }).render();

      this.collections.experiences.fetch();
      this.collections.educations.fetch();
      this.collections.languages.fetch();
      this.collections.hobbies.fetch();
      this.models.detail.fetch();
    },

    experiences: function() {
      this.reset({ route: "experiences", referer: "admin/experiences" });

      if (!app.user.isAuthenticated()) {
        return this.navigate("admin/login", true);
      }

      app.useLayout("admin-layout").setViews({
        "#content": new Experience.Views.Admin.List({ collection: this.collections.experiences })
      }).render();

      this.collections.experiences.fetch();
    },

    educations: function() {
      this.reset({ route: "educations", referer: "admin/educations" });

      if (!app.user.isAuthenticated()) {
        return this.navigate("admin/login", true);
      }

      app.useLayout("admin-layout").setViews({
        "#content": new Education.Views.Admin.List({ collection: this.collections.educations })
      }).render();

      this.collections.educations.fetch();
    },

    languages: function() {
      this.reset({ route: "languages", referer: "admin/languages" });

      if (!app.user.isAuthenticated()) {
        return this.navigate("admin/login", true);
      }

      app.useLayout("admin-layout").setViews({
        "#content": new Language.Views.Admin.List({ collection: this.collections.languages })
      }).render();

      this.collections.languages.fetch();
    },

    hobbies: function() {
      this.reset({ route: "hobbies", referer: "admin/hobbies" });

      if (!app.user.isAuthenticated()) {
        return this.navigate("admin/login", true);
      }

      app.useLayout("admin-layout").setViews({
        "#content": new Hobby.Views.Admin.List({ collection: this.collections.hobbies })
      }).render();

      this.collections.hobbies.fetch();
    },

    detail: function() {
      this.reset({ route: "detail", referer: "admin/detail" });

      if (!app.user.isAuthenticated()) {
        return this.navigate("admin/login", true);
      }

      app.useLayout("admin-layout").setViews({
        "#content": new Detail.Views.Admin.Item({ model: this.models.detail })
      }).render();

      this.models.detail.fetch();
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
        options.route = route;
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

      this.models.detail.clear();

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

      this.models = {
        detail: new Detail.Model()
      };

      app.modules = {
        Experience: Experience,
        Education: Education,
        Language: Language,
        Hobby: Hobby,
        User: User
      };

      this.homepage = "admin/experiences";
      this.referer = document.location.pathname.slice(1);

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

      Handlebars.registerHelper("is_selected", function(value, origin, options) {
        if (value == origin) {
          return options.fn(this);
        }
      });
    }

  });

  return Router;

});
