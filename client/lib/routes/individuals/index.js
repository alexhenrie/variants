var Ember = require("ember");
var Promise = Ember.RSVP.Promise;
var Individual = require("../../models/individual");

module.exports = Ember.Route.extend({
  model: function() {
    return this.store.find('individual',params.id)
    // var tmp = Individual.create({id:"fawefaw"});
    // return tmp;
  }
});
