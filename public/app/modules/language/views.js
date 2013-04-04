define([
  "app",
  "modules/abstract/views"
],

function(app, AbstractViews) {

  var Views = {}
    , module = {
      Views: Views,
      singular: "language",
      plural: "languages"
    };

  Views.List = AbstractViews.List.extend({
    module: module,
    template: "language/list",
    id: "languages"
  });

  Views.Item = AbstractViews.Item.extend({
    module: module,
    template: "language/item"
  });

  Views.Form = AbstractViews.Form.extend({
    module: module,
    template: "language/form",

    serialize: function() {
      var values = this.model.toJSON();

      var keywords = "";
      _.each(values.keywords, function(keyword, i) {
        keywords += (i > 0 ? "\n" : "") + keyword.label;
      });
      values.keywords = keywords;

      return values;
    },

    unserialize: function() {
      var values = {
        name: this.$("#name").val(),
        // flag: this.$("#flag").val(),
        keywords: [],
        order: this.model.get("order") || app.router.collections.languages.length + 1
      };

      var keywords = this.model.get("keywords");
      _.each(this.$("#keywords").val().split("\n"), function(label) {
        values.keywords.push(_.find(keywords, function(keyword) {
          return keyword.label == label;
        }) || { label: label, scope: "language" });
      });

      return values;
    },

    initialize: function() {
      this.model = this.model || new app.modules.Language.Model();
    }
  });

  return Views;

});
