var Ember = require("ember")

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true
})

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3002'
  // namespace: 'api/v1',
  // headers: {
  //   "session-id": env.SESSION_ID
  // },
  // pathForType: function(type) {
  //   var dasherized = Ember.String.dasherize(type)
  //   return Ember.String.pluralize(dasherized)
  // }
})

App.ApplicationSerializer = DS.ActiveModelSerializer.extend({
  normalize: function(type, hash) {
    hash.id = hash.ID
    return this._super(type, hash)
  }
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
  VariantsRoute: require("./routes/variants.js"),

  // Models
  Individual: require("./models/individual.js"),
  Variant: require("./models/variant.js")
})

module.exports = window.App = App
