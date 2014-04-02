var Ember = require("ember");
var getJSON = require("jquery").getJSON;

var API_HOST = 'http://localhost:8080/';

var Individual = Ember.Object.extend({
  name: "John Doe",
  deleteriousVariants: function() {
    var deleterious = Ember.ArrayProxy.create([]);
    getJSON(API_HOST + "deleterious?individual=" + this.get('id'), function(data) {
      deleterious.pushObjects(data.deleterious);
    });

    return deleterious;
  }.property('id')
});

module.exports = Individual;
