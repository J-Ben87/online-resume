define([
  "backbone.layoutmanager"
],

function() {

  Backbone.Collection.prototype.fetch = function() {
    var fetch = Backbone.Collection.prototype.fetch;

    return function() {
      this.trigger("fetch");

      return fetch.apply(this, arguments);
    };
  }();

  Number.prototype.between = function(first, last) {
    return (first < last ? this >= first && this <= last : this <= first && this >= last);
  };

  var _sync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    options.data = options.data || {};

    if (model && (method === "create" || method === "update" || method === "delete" /*|| method="patch"*/)) {
      options.contentType = "application/json";
      options.data = JSON.stringify(_.extend(options.attrs || model.toJSON(), {
        "access_token": app.user.get("access_token")
      }));
    }

    return _sync.call(this, method, model, options);
  };

  var app = {
    root: "/",
    cultures: [
      { id: "fr_BE", country: "Belgium", language: "French", flag: "BE.png" },
      { id: "de_DE", country: "German", language: "German", flag: "DE.png" },
      { id: "en_GB", country: "United Kingdom", language: "English", flag: "GB.png" },
      { id: "es_ES", country: "Spain", language: "Spanish", flag: "ES.png" },
      { id: "fr_FR", country: "France", language: "French", flag: "FR.png" },
      { id: "hu_HU", country: "Hungary", language: "Hungarian", flag: "HU.png" },
      { id: "sk_SK", country: "Slovakia", language: "Slovak", flag: "SK.png" }
    ]
  };

  var JST = window.JST = window.JST || {};

  Backbone.Layout.configure({
    manage: true,

    prefix: "app/templates/",

    fetch: function(path) {
      path = path + ".html";

      if (JST[path]) {
        return JST[path];
      }

      var done = this.async();

      $.get(app.root + path, function(contents) {
        JST[path] = Handlebars.compile(contents);
        JST[path].__compiled__ = true;

        done(JST[path]);
      });
    }
  });

  return _.extend(app, {
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    useLayout: function(name, options) {
      if (_.isObject(name)) {
        options = name;
      }

      options = options || {};

      if (_.isString(name)) {
        options.template = name;
      }

      var layout = new Backbone.Layout(_.extend({
        el: "#main"
      }, options));

      return this.layout = layout;
    }
  }, Backbone.Events);

});
