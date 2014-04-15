var Ember = require("ember")
var getJSON = Ember.$.getJSON
var Promise = Ember.RSVP.Promise
const env = require('../config/env')

module.exports = Ember.Route.extend({
  model: function() {
    return new Promise(function(resolve, reject) {
      getJSON(env.HOST + 'individuals',function(data) {
        resolve(data.individuals.map(function(individual) {
          individual.id = individual.ID
          delete individual.ID
          return individual
        }))
      }).fail(function() {
        reject()
      })
    })
  }
})
