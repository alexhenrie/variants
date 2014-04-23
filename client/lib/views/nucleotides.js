var Ember = require("ember")

module.exports = Ember.View.extend({
  tagName: 'div',

  didInsertElement : function(){
    this._super()
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.$.on('click',function() {
        alert('click')
      })
    });
  },

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
        if(x > end) continue;
        variantRange[x-start] = variant
      }
    })

    variantRange.forEach(function(variant) {
      if(!variant) {
        buffer.push('<div class="nucleotide"></div>')
      } else if(variant.cOSMIC) {
        buffer.push('<div class="nucleotide variant deleterious" variant-id="' + variant.ID + '"></div>')
      } else {
        buffer.push('<div class="nucleotide variant" variant-id="' + variant.ID + '"></div>')
      }
    })
  },
  variantsChanged: function() {
    this.rerender();
  }.observes('variants.@each')
})
