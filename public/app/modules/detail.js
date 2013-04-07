define([
  "app",
  "modules/detail/views"
],

function(app, Views) {

  var Details = app.module();

  Details.Model = Backbone.Model.extend({
    idAttribute: "_id",
    url: "/api/detail"
  });

  Details.Views = Views;

  return Details;

});
