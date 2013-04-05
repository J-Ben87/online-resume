define([
  "app",
  "modules/abstract/views"
],

function(app, AbstractViews) {

  var Views = { Admin: {} }
    , module = {
      Views: Views.Admin,
      singular: "hobby",
      plural: "hobbies"
    };

  Views.Admin.List = AbstractViews.List.extend({
    module: module,
    template: "hobby/admin/list",
    id: "hobbies"
  });

  Views.Admin.Item = AbstractViews.Item.extend({
    module: module,
    template: "hobby/admin/item"
  });

  Views.Admin.Form = AbstractViews.Form.extend({
    module: module,
    template: "hobby/admin/form",

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

  Views.List = Backbone.View.extend({
    template: "hobby/list",
    tagName: "section",
    className: "span6",
    id: "hobbies",

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
    template: "hobby/item",
    className: "span4",

    serialize: function() {
      return this.model.toJSON();
    }
  });

  return Views;

});
