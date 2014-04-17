var Ember = require("ember")
var ArrayProxy = Ember.ArrayProxy
var getJSON = Ember.$.getJSON
var Promise = Ember.RSVP.Promise
var throttle = require('lodash-node/modern/functions/throttle')
const env = require('../../config/env')

module.exports = Ember.Controller.extend({
  variantRangeStart: 1650000,
  variantRangeEnd: 1651000,
  variants: ArrayProxy.create({content:[]}),
  showcaseVariantId: null,
  showcaseVariant: null,

  showcaseVariantIdObserver: function() {
    var id = this.get('showcaseVariantId')
    var variant = this.get('variants').findBy('ID',parseInt(id))
    this.set('showcaseVariant',variant)
  }.observes('showcaseVariantId'),

  actions: {
    goto: function(number) {
      this.set('variantRangeStart',Math.floor((number / 1000)) * 1000)
    }
  },

  getVariants: function() {
    this.set('showcaseVariant',null)

    getJSON(env.HOST + 'variants',{
      "INDIVIDUAL_ID": this.get('model.ID'),
      "start": this.get('variantRangeStart'),
      "end": this.get('variantRangeEnd')
    },function(result) {
      this.get('variants').setObjects(result.variants)
    }.bind(this))
  }.on('init'),

  variantRangeStartObserver: function() {
    if(parseInt(this.get('variantRangeEnd')) - parseInt(this.get('variantRangeStart')) != 1000) {
      this.set('variantRangeEnd',parseInt(this.get('variantRangeStart')) + 1000)
      this.getVariants()
    }
  }.observes('variantRangeStart').on('init'),

  variantRangeEndObserver: function() {
    if(parseInt(this.get('variantRangeEnd')) - parseInt(this.get('variantRangeStart')) != 1000) {
      this.set('variantRangeStart',parseInt(this.get('variantRangeEnd')) - 1000)
      this.getVariants()
    }
  }.observes('variantRangeEnd').on('init')
})
