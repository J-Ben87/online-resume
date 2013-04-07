define([
  "app",
  "modules/abstract/views"
],

function(app, AbstractViews) {

  var Views = { Admin: {} }
    , module = {
      Views: Views.Admin,
      singular: "language",
      plural: "languages"
    };

  Views.Admin.List = AbstractViews.List.extend({
    module: module,
    template: "language/admin/list",
    id: "languages"
  });

  Views.Admin.Item = AbstractViews.Item.extend({
    module: module,
    template: "language/admin/item"
  });

  Views.Admin.Form = AbstractViews.Form.extend({
    module: module,
    template: "language/admin/form",

    serialize: function() {
      var values = _.extend(this.model.toJSON(), { cultures: app.cultures });

      var keywords = "";
      _.each(values.keywords, function(keyword, i) {
        keywords += (i > 0 ? "\n" : "") + keyword.label;
      });
      values.keywords = keywords;

      return values;
    },

    unserialize: function() {
      var values = {
        keywords: [],
        is_highlighted: this.$("#is_highlighted").is(":checked"),
        order: this.model.get("order") || app.router.collections.languages.length + 1
      };

      _.extend(values, _.find(app.cultures, function(culture) {
        return this.$("#culture").val() == culture.id;
      }));

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

  Views.List = Backbone.View.extend({
    template: "language/list",
    tagName: "section",
    className: "span6",
    id: "languages",

    beforeRender: function() {
      this.$el.children().remove();

      this.collection.each(function(model) {
        this.insertView(".row-fluid", new Views.Item({
          model: model
        }));
      }, this);
    },

    initialize: function() {
      this.listenTo(this.collection, "reset", this.render);
    }
  });

  Views.Item = Backbone.View.extend({
    template: "language/item",
    className: "span6",

    serialize: function() {
      return this.model.toJSON();
    }
  });

  return Views;

});
