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

      var keywords = "";
      _.each(values.keywords, function(keyword, i) {
        keywords += (i > 0 ? "\n" : "") + keyword.label;
      });
      values.keywords = keywords;

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
        keywords: [],
        description: this.$("#description").val(),
        order: this.model.get("order") || app.router.Collections.experiences.length + 1
      };

      var keywords = this.model.get("keywords");

      _.each(this.$("#keywords").val().split("\n"), function(label) {
        values.keywords.push(_.find(keywords, function(keyword) {
          return keyword.label == label;
        }) || { label: label, scope: "experience" });
      });

      return values;
    },

    afterRender: function() {
      this.$(".datepicker").datepicker();
    },

    initialize: function() {
      this.model = this.model || new app.Models.Experience();
    }
  });

  return Views;

});
