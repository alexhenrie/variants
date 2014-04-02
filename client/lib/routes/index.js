var Ember = require("ember");
var Individual = require("../models/individual");

module.exports = Ember.Route.extend({
  model: function() {
    var tmp = [
      Individual.create({})
    ];
    return tmp;
  }
});
