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

  var app = {
    root: "/"
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
