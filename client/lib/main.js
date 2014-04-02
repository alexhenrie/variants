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
  IndividualsRoute: require("./routes/individuals.js"),
  VariantsRoute: require("./routes/variants.js")
});

// Templates
// require("./.templates");

module.exports = window.App = App.create()
