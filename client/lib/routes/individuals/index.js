var Ember = require("ember");

module.exports = Ember.Route.extend({
  model: function(params) {
    return this.store.find('individual',params.id)
    // var tmp = Individual.create({id:"fawefaw"});
    // return tmp;
  }
});
