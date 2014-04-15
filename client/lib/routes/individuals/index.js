var Ember = require("ember")
var ArrayProxy = Ember.ArrayProxy
var getJSON = Ember.$.getJSON
var Promise = Ember.RSVP.Promise
const env = require('../../config/env')

module.exports = Ember.Route.extend({
  model: function(params) {
    return new Promise(function(resolve, reject) {
      getJSON(env.HOST + 'individuals/' + params.id,function(result) {
        result.individual.id = result.individual.ID
        result.individual.deleterious = ArrayProxy.create({content:[]})
        getJSON(env.HOST + 'variants/',{
          where: JSON.stringify({
            "INDIVIDUAL_ID": params.id,
            "cosmic_variant.ID": {"gt": 0}
          })
        }, function(deleteriousResult) {
          result.individual.deleterious.setObjects(deleteriousResult.variants)
        })
        delete result.individual.ID
        resolve(result.individual)
      }).fail(function() {
        alert('reject')
        reject()
      })
    })
  }
})
