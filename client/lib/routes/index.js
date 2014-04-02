var Ember = require("ember");
var Individual = require("../models/individual");
var jQuery = require("jquery");
var Promise = Ember.RSVP.Promise;

var API_HOST = 'http://localhost:8080/';

module.exports = Ember.Route.extend({
  model: function() {
    return new Promise(function(resolve,reject) {
      jQuery.getJSON(API_HOST + 'individuals', function(data) {
        data.individuals = data.individuals.map(function(individual) {
          return Individual.create(individual);
        });
        resolve(data.individuals);
      });
    });
  }
});
