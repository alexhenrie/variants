var Ember = require("ember")

module.exports = Ember.View.extend({
  click: function(event) {
    var variantId
    if(variantId = event.target.getAttribute('variant-id')) {
      this.get('controller').set('showcaseVariantId',variantId)
    }
  }
})
