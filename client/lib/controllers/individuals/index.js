var Ember = require("ember")
var ArrayProxy = Ember.ArrayProxy
var getJSON = Ember.$.getJSON
var Promise = Ember.RSVP.Promise
const env = require('../../config/env')

module.exports = Ember.Controller.extend({
  variantRangeStart: 51412705,
  variantRangeEnd: 51413205,
  variants: ArrayProxy.create({content:[]}),

  variantRangeObserver: function() {
    getJSON(env.HOST + 'variants',{
      "INDIVIDUAL_ID": this.get('model.ID'),
      "start": this.get('variantRangeStart'),
      "end": this.get('variantRangeEnd')
    },function(result) {
      this.get('variants').setObjects(result.variants)
    }.bind(this));
  }.observes('variantRangeStart','variantRangeEnd').on('init'),

  variantRangeStartObserver: function() {
    if(parseInt(this.get('variantRangeEnd')) - parseInt(this.get('variantRangeStart')) != 500) {
      this.set('variantRangeEnd',parseInt(this.get('variantRangeStart')) + 500)
    }
  }.observes('variantRangeStart').on('init'),

  variantRangeEndObserver: function() {
    if(parseInt(this.get('variantRangeEnd')) - parseInt(this.get('variantRangeStart')) != 500) {
      this.set('variantRangeStart',parseInt(this.get('variantRangeEnd')) - 500)
    }
  }.observes('variantRangeEnd').on('init')
})
