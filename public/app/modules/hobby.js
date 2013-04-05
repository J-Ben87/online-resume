define([
  "app",
  "modules/hobby/views"
],

function(app, Views) {

  var Hobby = app.module();

  Hobby.Model = Backbone.Model.extend({
    idAttribute: "_id"
  });

  Hobby.Collection = Backbone.Collection.extend({
    model: Hobby.Model,
    url: "/api/hobbies",
    comparator: "order"
  });

  Hobby.Views = Views;

  return Hobby;

});
