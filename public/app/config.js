require.config({

  "deps": ["main", "jquery-dateFormat", "jquery-ui-sortable", "bootstrap", "bootstrap-datepicker", "handlebars"],

  "paths": {
    "jquery": "../vendor/libs/jquery",
    "jquery-dateFormat": "../vendor/libs/jquery-dateFormat",
    "jquery-ui-sortable": "../vendor/jquery-ui-1.10.2/js/jquery-ui-1.10.2.sortable.min",
    "lodash": "../vendor/libs/lodash.underscore",
    "backbone": "../vendor/libs/backbone",
    "bootstrap": "../vendor/bootstrap/js/bootstrap.min",
    "bootstrap-datepicker": "../vendor/bootstrap/js/bootstrap-datepicker",
    "handlebars": "../vendor/libs/handlebars",
    "backbone.layoutmanager": "../vendor/libs/backbone.layoutmanager"
  },

  "shim": {
    "jquery-dateFormat": {
      "deps": [
        "jquery"
      ]
    },

    "jquery-ui-sortable": {
      "deps": [
        "jquery"
      ]
    },

    "lodash": {
      "exports": "_"
    },

    "backbone": {
      "deps": [
        "jquery",
        "lodash"
      ],
      "exports": "Backbone"
    },

    "bootstrap": {
      "deps": [
        "jquery"
      ]
    },

    "bootstrap-datepicker": {
      "deps": [
        "bootstrap"
      ]
    },

    "handlebars": {
      "exports": "Handlebars"
    },

    "backbone.layoutmanager": {
      "deps": [
        "jquery",
        "lodash",
        "backbone"
      ],
      "exports": "Backbone.LayoutManager"
    }
  }

});
