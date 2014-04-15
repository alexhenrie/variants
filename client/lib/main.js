var Ember = require("ember")

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true
})

App.Router.map(function() {
  this.resource('individuals', {
    path: "/individuals"
  }, function(){
    this.route('index', { path: "/:id" })
    this.resource('variants', { path: ":id/variants" })
  })
})

App.reopen({
  // Routes
  IndexRoute: require("./routes/index.js"),
  IndividualsIndexRoute: require("./routes/individuals/index.js"),
  // VariantsRoute: require("./routes/variants.js"),

  // Controllers
  IndividualsIndexController: require('./controllers/individuals/index'),

  // // Models
  // Individual: require("./models/individual.js"),
  // Variant: require("./models/variant.js")
})

module.exports = window.App = App
