define([
  "app"
],

function(app) {

  var Views = { Admin: {} };

  Views.Admin.Item = Backbone.View.extend({
    template: "detail/admin/item",
    tagName: "section",
    id: "details",
    events: {
      "click #edit": "edit"
    },

    edit: function(e) {
      e.preventDefault();

      if (!this.getView("#form-container")) {
        this.insertView("#form-container", new Views.Admin.Form({
          model: this.model
        })).render();
      }
    },

    update: function(model, attributes) {
      model.save(attributes);
    },

    serialize: function() {
      return this.model.toJSON();
    },

    initialize: function() {
      app.on("detail:create", this.create, this);
      app.on("detail:update", this.update, this);

      this.listenTo(this.model, "change", this.render);
    }
  });

  Views.Admin.Form = Backbone.View.extend({
    template: "detail/admin/form",
    tagName: "form",
    className: "form-horizontal",
    events: {
      "submit": "save",
      "click #cancel": "cancel"
    },

    save: function(e) {
      e.preventDefault();

      this.model.set(this.unserialize());

      if (!this.model.hasChanged()) {
        return;
      }

      app.trigger("detail:update", this.model);

      this.remove();
    },

    cancel: function(e) {
      e.preventDefault();

      this.remove();
    },

    serialize: function() {
      return _.extend(this.model.toJSON(), { cultures: app.cultures });
    },

    unserialize: function() {
      var values = {
        name: this.$("#name").val(),
        title: this.$("#title").val(),
        subtitle: this.$("#subtitle").val(),
        phone: this.$("#phone").val(),
        email: this.$("#email").val(),
        address: this.$("#address").val(),
        visa: this.$("#visa").val(),
        driving_license: this.$("#driving_license").val()
      };

      _.extend(values, _.find(app.cultures, function(culture) {
        return this.$("#culture").val() == culture.culture;
      }));

      return values;
    }
  });

  Views.Header = Backbone.View.extend({
    template: "detail/header",

    serialize: function() {
      return this.model.toJSON();
    },

    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    }
  });

  Views.Footer = Backbone.View.extend({
    template: "detail/footer",
    className: "container",

    serialize: function() {
      return this.model.toJSON();
    },

    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    }
  });

  return Views;

});
