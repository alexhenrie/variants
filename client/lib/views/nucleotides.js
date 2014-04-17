var Ember = require("ember")

module.exports = Ember.View.extend({
  tagName: 'div',
  render: function(buffer) {
    var start = this.get('start')
    var end = this.get('end')

    var variantRange = []
    var x
    for(x = this.get('start');x <= this.get('end');x++) {
      variantRange.push(null)
    }

    this.get('variants').forEach(function(variant) {
      for(x = variant.Start;x <= variant.End;x++) {
        if(variant.End > end) continue;
        variantRange[x-start] = variant
      }
    })

    variantRange.forEach(function(variant) {
      if(!variant) {
        buffer.push('<div class="nucleotide"></div>')
      } else if(variant.cosmicVariant) {
        buffer.push('<div class="nucleotide variant deleterious"></div>')
      } else {
        buffer.push('<div class="nucleotide variant"></div>')
      }
    })
  },
  variantsChanged: function() {
    this.rerender();
  }.observes('variants.@each')
})
