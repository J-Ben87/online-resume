define([
  "app",
  "modules/abstract/views"
],

function(app, AbstractViews) {

  var Views = { Admin: {} }
    , module = {
      Views: Views.Admin,
      singular: "experience",
      plural: "experiences"
    };

  Views.Admin.List = AbstractViews.List.extend({
    module: module,
    template: "experience/admin/list",
    id: "experiences"
  });

  Views.Admin.Item = AbstractViews.Item.extend({
    module: module,
    template: "experience/admin/item",

    serialize: function() {
      var values = this.model.toJSON();

      values.started_on = $.format.date(new Date(values.started_on), "MMMM yyyy");
      values.ended_on = $.format.date(new Date(values.ended_on), "MMMM yyyy");

      return _.extend(values, { has_separator: (this.model.get("project") && this.model.get("company")) });
    }
  });

  Views.Admin.Form = AbstractViews.Form.extend({
    module: module,
    template: "experience/admin/form",

    serialize: function() {
      var values = this.model.toJSON();

      values.started_on = (values.started_on ? $.format.date(new Date(values.started_on), "yyyy-MM") : "");
      values.ended_on = (values.ended_on ? $.format.date(new Date(values.ended_on), "yyyy-MM") : "");

      values.order = this.model.get("order") || app.router.collections.experiences.length + 1;

      var attributes = ["highlights", "technologies", "frameworks", "softwares", "tools", "keywords"];
      _.each(attributes, function(attribute) {

        var items = "";
        _.each(values[attribute], function(item, i) {
          items += (i > 0 ? "\n" : "") + item.label;
        });
        values[attribute] = items;

      });

      return values;
    },

    unserialize: function() {
      var values = {
        position: this.$("#position").val(),
        started_on: new Date(this.$("#started_on").val()).toISOString(),
        ended_on: new Date(this.$("#ended_on").val()).toISOString(),
        project: this.$("#project").val(),
        project_website: this.$("#project_website").val(),
        company: this.$("#company").val(),
        company_website: this.$("#company_website").val(),
        highlights: [],
        description: this.$("#description").val(),
        technologies: [],
        frameworks: [],
        softwares: [],
        tools: [],
        keywords: [],
        order: this.$("#order").val()
      };

      var self = this;

      var attributes = ["highlights", "technologies", "frameworks", "softwares", "tools", "keywords"];
      _.each(attributes, function(attribute) {

        var items = self.model.get(attribute);
        _.each(self.$("#" + attribute).val().split("\n"), function(label) {
          values[attribute].push(_.find(items, function(item) {
            return item.label == label;
          }) || { label: label, scope: "experience" });
        });

      });

      return values;
    },

    initialize: function() {
      this.model = this.model || new app.modules.Experience.Model();
    }
  });

  Views.List = Backbone.View.extend({
    template: "experience/list",
    tagName: "section",
    id: "experiences",

    beforeRender: function() {
      this.$el.children().remove();

      this.collection.each(function(model) {
        this.insertView(new Views.Item({
          model: model
        }));
      }, this);
    },

    initialize: function() {
      this.listenTo(this.collection, "reset", this.render);
    }
  });

  Views.Item = Backbone.View.extend({
    template: "experience/item",
    className: "well",

    serialize: function() {
      var values = this.model.toJSON();

      values.started_on = $.format.date(new Date(values.started_on), "MMMM yyyy");
      values.ended_on = $.format.date(new Date(values.ended_on), "MMMM yyyy");

      return _.extend(values, { has_separator: (this.model.get("project") && this.model.get("company")) });
    }
  });

  return Views;

});
