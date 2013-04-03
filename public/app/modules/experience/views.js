define([
  "app",
  "modules/large-widget/views"
],

function(app, AbstractViews) {

  var Views = {}
    , module = {
      Views: Views,
      singular: "experience",
      plural: "experiences"
    };

  Views.List = AbstractViews.List.extend({
    module: module,
    template: "experience/list",
    id: "experiences"
  });

  Views.Item = AbstractViews.Item.extend({
    module: module,
    template: "experience/item",

    serialize: function() {
      var values = this.model.toJSON();

      values.started_on = $.format.date(new Date(values.started_on), "MMMM yyyy");
      values.ended_on = $.format.date(new Date(values.ended_on), "MMMM yyyy");

      return _.extend(values, { has_separator: (this.model.get("project") && this.model.get("company")) });
    }
  });

  Views.Form = AbstractViews.Form.extend({
    module: module,
    template: "experience/form",

    serialize: function() {
      var values = this.model.toJSON();

      values.started_on = (values.started_on ? $.format.date(new Date(values.started_on), "yyyy-MM") : "");
      values.ended_on = (values.ended_on ? $.format.date(new Date(values.ended_on), "yyyy-MM") : "");

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
        order: this.model.get("order") || app.router.collections.experiences.length + 1
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

  return Views;

});
