var Ember = require("ember");
var App = require("./config/application");

// Routes
var routes = require("./config/routes");
App.initializer({
  name: "routes",
  initialize: function(container,application) {
    application.Router.map(routes);
  }
});

App.reopen({
  // Routes
  IndexRoute: require("./routes/index.js"),
  IndividualsIndexRoute: require("./routes/individuals/index.js"),
  VariantsRoute: require("./routes/variants.js")
});

// Templates
// require("./.templates");

module.exports = window.App = App.create()
