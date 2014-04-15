var attr = DS.attr;

module.exports = DS.Model.extend({
  individual: DS.belogsTo('individual', {async:true})
})
