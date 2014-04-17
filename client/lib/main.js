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

// Routes
App.IndexRoute = require("./routes/index.js"),
App.IndividualsIndexRoute = require("./routes/individuals/index.js"),
// VariantsRoute: require("./routes/variants.js"),

// Controllers
App.IndividualsIndexController = require('./controllers/individuals/index'),

// // Models
// Individual: require("./models/individual.js"),
// Variant: require("./models/variant.js")

// Views
App.NucleotidesView = require("./views/nucleotides")

module.exports = window.App = App
