define([
  "app",
  "modules/experience/views"
],

function(app, Views) {

  var Experience = app.module();

  Experience.Model = Backbone.Model.extend({
    idAttribute: "_id"
  });

  Experience.Collection = Backbone.Collection.extend({
    model: Experience.Model,
    url: "/api/experiences",
    comparator: "order"
  });

  Experience.Views = Views;

  return Experience;

});
