define([
  "app"
],

function(app) {

  var Views = {};

  Views.List = Backbone.View.extend({
    tagName: "section",

    events: {
      "click #add": "add"
    },

    add: function(e) {
      e.preventDefault();

      if (!this.getView("#form-container")) {
        this.insertView("#form-container", new this.module.Views.Form()).render();
      }
    },

    create: function(model) {
      this.collection.create(model);
    },

    update: function(model, attributes) {
      model.save(attributes);
    },

    drop: function(order) {
      var droppedModel = _.find(this.collection.models, function(model) {
        return model.get("order") == order.initial;
      });

      var sortedModels = _.filter(this.collection.models, function(model) {
        return model.get("order").between(order.initial, order.final) && model != droppedModel;
      });

      var self = this;
      _.each(sortedModels, function(model) {
        app.trigger(self.module.singular + ":update", model, { order: order.initial > order.final ? model.get("order") + 1 : model.get("order") - 1 });
      });

      app.trigger(this.module.singular + ":update", droppedModel, { "order": order.final });
    },

    insertItem: function(model) {
      return this.insertView(new this.module.Views.Item({
        model: model
      }));
    },

    beforeRender: function() {
      this.$el.children().remove();

      this.collection.each(function(model) {
        this.insertItem(model);
      }, this);
    },

    afterRender: function() {
      var self = this
        , order = {};

      this.$el.sortable({
        items: ".ui-state-default",
        placeholder: "ui-state-highlight",
        forcePlaceholderSize: true,

        start: function(event, ui) {
          order.initial = ui.item.index() - 1;
        },

        update: function(event, ui) {
          order.final = ui.item.index() - 1;
        },

        stop: function(event, ui) {
          app.trigger(self.module.singular + ":drop", order);
        }
      });

      this.$(".ui-state-default").disableSelection();
    },

    initialize: function() {
      app.on(this.module.singular + ":create", this.create, this);
      app.on(this.module.singular + ":update", this.update, this);
      app.on(this.module.singular + ":drop", this.drop, this);

      this.listenTo(this.collection, "reset", this.render);
      this.listenTo(this.collection, "add", this.insertItem);
    }
  });

  Views.Item = Backbone.View.extend({
    className: "well ui-state-default",

    events: {
      "click #edit": "edit",
      "click #delete": "delete"
    },

    edit: function(e) {
      e.preventDefault();

      if (!this.getView("#form-container")) {
        this.insertView("#form-container", new this.module.Views.Form({
          model: this.model
        })).render();
      }
    },

    delete: function(e) {
      e.preventDefault();

      this.model.destroy();
    },

    initialize: function() {
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "destroy", this.remove);
    }
  });

  Views.Form = Backbone.View.extend({
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

      if (this.model.isNew()) {
        app.trigger(this.module.singular + ":create", this.model);
      } else {
        app.trigger(this.module.singular + ":update", this.model);
      }

      this.remove();
    },

    cancel: function(e) {
      e.preventDefault();

      this.remove();
    }
  });

  return Views;

});
