define([
  "app",
  "modules/education/views"
],

function(app, Views) {

  var Education = app.module();

  Education.Model = Backbone.Model.extend({
    idAttribute: "_id"
  });

  Education.Collection = Backbone.Collection.extend({
    model: Education.Model,
    url: "/api/educations",
    comparator: "order"
  });

  Education.Views = Views;

  return Education;

});
