define([
  "app",
  "modules/abstract/views"
],

function(app, AbstractViews) {

  var Views = { Admin: {} }
    , module = {
      Views: Views.Admin,
      singular: "education",
      plural: "educations"
    };

  Views.Admin.List = AbstractViews.List.extend({
    module: module,
    template: "education/admin/list",
    id: "educations"
  });

  Views.Admin.Item = AbstractViews.Item.extend({
    module: module,
    template: "education/admin/item",

    serialize: function() {
      var values = this.model.toJSON();

      values.started_on = $.format.date(new Date(values.started_on), "MMMM yyyy");
      values.ended_on = $.format.date(new Date(values.ended_on), "MMMM yyyy");

      return _.extend(values, { has_separator: (this.model.get("school") && this.model.get("location")) });
    }
  });

  Views.Admin.Form = AbstractViews.Form.extend({
    module: module,
    template: "education/admin/form",

    serialize: function() {
      var values = this.model.toJSON();

      values.started_on = (values.started_on ? $.format.date(new Date(values.started_on), "yyyy-MM") : "");
      values.ended_on = (values.ended_on ? $.format.date(new Date(values.ended_on), "yyyy-MM") : "");

      values.order = this.model.get("order") || app.router.collections.educations.length + 1;

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
        order: this.$("#order").val()
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
      this.model = this.model || new app.modules.Education.Model();
    }
  });

  Views.List = Backbone.View.extend({
    template: "education/list",
    tagName: "section",
    id: "educations",

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
    template: "education/item",
    className: "well",

    serialize: function() {
      var values = this.model.toJSON();

      values.started_on = $.format.date(new Date(values.started_on), "MMMM yyyy");
      values.ended_on = $.format.date(new Date(values.ended_on), "MMMM yyyy");

      return _.extend(values, { has_separator: (this.model.get("school") && this.model.get("location")) });
    }
  });

  return Views;

});
