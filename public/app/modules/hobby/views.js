define([
  "app",
  "modules/abstract/views"
],

function(app, AbstractViews) {

  var Views = {}
    , module = {
      Views: Views,
      singular: "hobby",
      plural: "hobbies"
    };

  Views.List = AbstractViews.List.extend({
    module: module,
    template: "hobby/list",
    id: "hobbies"
  });

  Views.Item = AbstractViews.Item.extend({
    module: module,
    template: "hobby/item"
  });

  Views.Form = AbstractViews.Form.extend({
    module: module,
    template: "hobby/form",

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
        is_highlighted: this.$("#is_highlighted").is(":checked"),
        order: this.model.get("order") || app.router.collections.hobbies.length + 1
      };

      var keywords = this.model.get("keywords");
      _.each(this.$("#keywords").val().split("\n"), function(label) {
        values.keywords.push(_.find(keywords, function(keyword) {
          return keyword.label == label;
        }) || { label: label, scope: "hobby" });
      });

      return values;
    },

    initialize: function() {
      this.model = this.model || new app.modules.Hobby.Model();
    }
  });

  return Views;

});
