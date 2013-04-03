define([
  "app",
  "modules/large-widget/views"
],

function(app, AbstractViews) {

  var Views = {}
    , module = {
      Views: Views,
      singular: "education",
      plural: "educations"
    };

  Views.List = AbstractViews.List.extend({
    module: module,
    template: "education/list",
    id: "educations"
  });

  Views.Item = AbstractViews.Item.extend({
    module: module,
    template: "education/item",

    serialize: function() {
      var values = this.model.toJSON();

      values.started_on = $.format.date(new Date(values.started_on), "MMMM yyyy");
      values.ended_on = $.format.date(new Date(values.ended_on), "MMMM yyyy");

      return _.extend(values, { has_separator: (this.model.get("school") && this.model.get("location")) });
    }
  });

  Views.Form = AbstractViews.Form.extend({
    module: module,
    template: "education/form",

    serialize: function() {
      var values = this.model.toJSON();

      values.started_on = (values.started_on ? $.format.date(new Date(values.started_on), "yyyy-MM") : "");
      values.ended_on = (values.ended_on ? $.format.date(new Date(values.ended_on), "yyyy-MM") : "");

      var highlights = "";
      _.each(values.highlights, function(highlight, i) {
        highlights += (i > 0 ? "\n" : "") + highlight.label;
      });
      values.highlights = highlights;

      return values;
    },

    unserialize: function() {
      var values = {
        title: this.$("#title").val(),
        started_on: new Date(this.$("#started_on").val()).toISOString(),
        ended_on: new Date(this.$("#ended_on").val()).toISOString(),
        school: this.$("#school").val(),
        website: this.$("#website").val(),
        location: this.$("#location").val(),
        highlights: [],
        description: this.$("#description").val(),
        order: this.model.get("order") || app.router.Collections.educations.length + 1
      };

      var highlights = this.model.get("highlights");
      _.each(this.$("#highlights").val().split("\n"), function(label) {
        values.highlights.push(_.find(highlights, function(highlight) {
          return highlight.label == label;
        }) || { label: label, scope: "education" });
      });

      return values;
    },

    initialize: function() {
      this.model = this.model || new app.Models.Education();
    }
  });

  return Views;

});
