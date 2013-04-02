/**
 * Backbone localStorage Adapter
 * Version 1.1.0
 * Edited by "Benoit Jouhaud <bjouhaud@gmail.com>"
 *
 * https://github.com/jeromegn/Backbone.localStorage
 * http://docs.appcelerator.com/backbone/0.9.2/docs/backbone-localstorage.html
 */
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["lodash","backbone"], function(_, Backbone) {
      return factory(_ || root._, Backbone || root.Backbone);
    });
  } else {
    factory(_, Backbone);
  }
}(this, function(_, Backbone) {

  function S4() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };

  function guid() {
     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  };

  Backbone.LocalStorage = window.Store = function(name) {
    this.name = name;
    var store = this.localStorage().getItem(this.name);
    this.data = (store && JSON.parse(store)) || {};
  };

  _.extend(Backbone.LocalStorage.prototype, {

    save: function() {
      this.localStorage().setItem(this.name, JSON.stringify(this.data));
    },

    create: function(model) {
      if (!model.id) model.id = model.attributes.id = guid();
      this.data[model.id] = model;
      this.save();
      return model;
    },

    update: function(model) {
      this.data[model.id] = model;
      this.save();
      return model;
    },

    find: function(model) {
      return this.data[model.id];
    },

    findAll: function() {
      return _.values(this.data);
    },

    destroy: function(model) {
      delete this.data[model.id];
      this.save();
      return model;
    },

    localStorage: function() {
      return localStorage;
    }

  });

  Backbone.LocalStorage.sync = window.Store.sync = Backbone.localSync = function(method, model, options) {

    var store = model.localStorage || model.collection.localStorage;
    var resp, errorMessage, syncDfd = $.Deferred && $.Deferred();

    try {

      switch (method) {
        case "read":
          resp = model.id != undefined ? store.find(model) : store.findAll();
          break;
        case "create":
          resp = store.create(model);
          break;
        case "update":
          resp = store.update(model);
          break;
        case "delete":
          resp = store.destroy(model);
          break;
      }

    } catch(error) {
      if (error.code === DOMException.QUOTA_EXCEEDED_ERR && store._storageSize() === 0) {
        errorMessage = "Private browsing is unsupported";
      } else {
        errorMessage = error.message;
      }
    }

    if (resp) {
      model.trigger("sync", model, resp, options);
      if (options && options.success)
        if (Backbone.VERSION === "0.9.10") {
          options.success(model, resp, options);
        } else {
          options.success(resp);
        }
      if (syncDfd) {
        syncDfd.resolve(resp);
      }
    } else {
      errorMessage = errorMessage ? errorMessage : "Record Not Found";

      model.trigger("error", model, errorMessage, options);
      if (options && options.error) {
        if (Backbone.VERSION === "0.9.10") {
          options.error(model, errorMessage, options);
        } else {
          options.error(errorMessage);
        }
      }

      if (syncDfd) {
        syncDfd.reject(errorMessage);
      }
    }

    if (options && options.complete) {
      options.complete(resp);
    }

    return syncDfd && syncDfd.promise();

  };

  Backbone.ajaxSync = Backbone.sync;

  Backbone.getSyncMethod = function(model) {
    if(model.localStorage || (model.collection && model.collection.localStorage)) {
      return Backbone.localSync;
    }

    return Backbone.ajaxSync;
  };

  Backbone.sync = function(method, model, options) {
    return Backbone.getSyncMethod(model).apply(this, [method, model, options]);
  };

  return Backbone.LocalStorage;

}));
