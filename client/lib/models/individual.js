var attr = DS.attr;

module.exports = DS.Model.extend({
  variants: DS.hasMany('variant', {async:true})
})
