define([
  "app",
  "modules/language/views"
],

function(app, Views) {

  var Language = app.module();

  Language.Model = Backbone.Model.extend({
    idAttribute: "_id"
  });

  Language.Collection = Backbone.Collection.extend({
    model: Language.Model,
    url: "/api/languages",
    comparator: "order"
  });

  Language.Views = Views;

  return Language;

});
