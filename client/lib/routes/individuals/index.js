var Ember = require("ember");
var Promise = Ember.RSVP.Promise;
var Individual = require("../models/individual");

module.exports = Ember.Route.extend({
  model: function() {
    var tmp = Individual.create({id:"fawefaw"});
    return tmp;
  }
});
