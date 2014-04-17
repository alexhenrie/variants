Ember.TEMPLATES['application'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<div class=\"container\" style=\"margin-top: 24px;\">\n  ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
  
});
Ember.TEMPLATES['index'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n      <tr>\n        <td>\n          ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "individuals", "individual", options) : helperMissing.call(depth0, "link-to", "individuals", "individual", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </td>\n      </tr>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            Individual #");
  stack1 = helpers._triageMustache.call(depth0, "individual.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          ");
  return buffer;
  }

  data.buffer.push("<h1>Individuals</h1>\n\n<table class=\"table table-hover table-border table-striped\">\n  <tbody>\n    ");
  stack1 = helpers.each.call(depth0, "individual", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </tbody>\n</table>\n");
  return buffer;
  
});
Ember.TEMPLATES['individuals/index'] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <div>\n      <a style=\"cursor: pointer\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "goto", "variant.Start", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "variant.cosmicVariant.GeneName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" (");
  stack1 = helpers._triageMustache.call(depth0, "variant.Start", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" - ");
  stack1 = helpers._triageMustache.call(depth0, "variant.End", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(")</a>\n    </div>\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <table class=\"table table-bordered table-striped table-condensed\" style=\"width: 400px;margin-top: 12px;\">\n      <tbody>\n        <tr>\n          <th>Reference sequence</th>\n          <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.ReferenceSequence", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        </tr>\n        <tr>\n          <th>Variant sequence</th>\n          <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.VariantSequence", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        </tr>\n        <tr>\n          <th>Strand</th>\n          <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.Strand", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        </tr>\n        <tr>\n          <th>Type</th>\n          <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.Type", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        </tr>\n        <tr>\n          <th>Range</th>\n          <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.Start", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" - ");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.End", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        </tr>\n\n        ");
  stack1 = helpers['if'].call(depth0, "showcaseVariant.thousandGenomeVariant", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        ");
  stack1 = helpers['if'].call(depth0, "showcaseVariant.cosmicVariant", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </tbody>\n    </table>\n  ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <tr>\n            <th>Variant frequency</th>\n            <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.thousandGenomeVariant.VariantFrequency", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          </tr>\n        ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <tr>\n            <th>Gene name</th>\n            <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.cosmicVariant.GeneName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          </tr>\n          <tr>\n            <th>Primary site</th>\n            <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.cosmicVariant.PrimarySite", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          </tr>\n          <tr>\n            <th>Site subtype</th>\n            <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.cosmicVariant.SiteSubtype", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          </tr>\n          <tr>\n            <th>Cosmic strand</th>\n            <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.cosmicVariant.Strand", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          </tr>\n          <tr>\n            <th>Primary histology</th>\n            <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.cosmicVariant.PrimaryHistology", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          </tr>\n          <tr>\n            <th>Histology subtype</th>\n            <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.cosmicVariant.HistologySubtype", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          </tr>\n          <tr>\n            <th>Somatic status</th>\n            <td>");
  stack1 = helpers._triageMustache.call(depth0, "showcaseVariant.cosmicVariant.SomaticStatus", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n          </tr>\n        ");
  return buffer;
  }

  data.buffer.push("<h2>Individual #");
  stack1 = helpers._triageMustache.call(depth0, "model.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\n\n<h3>Deleterious variants</h3>\n\n<div>\n  ");
  stack1 = helpers.each.call(depth0, "variant", "in", "model.deleterious", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n\n<h3>Variants</h3>\n\n<div>\n  ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("number"),
    'placeholder': ("Start"),
    'autofocus': ("autofocus"),
    'min': ("0"),
    'step': ("1000"),
    'value': ("variantRangeStart")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'autofocus': "STRING",'min': "STRING",'step': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'autofocus': depth0,'min': depth0,'step': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n  -\n  ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("number"),
    'placeholder': ("End"),
    'min': ("0"),
    'step': ("1000"),
    'value': ("variantRangeEnd")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'min': "STRING",'step': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'min': depth0,'step': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n\n  <div style=\"line-height: 0; margin-top: 12px;\">\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NucleotidesView", {hash:{
    'start': ("variantRangeStart"),
    'end': ("variantRangeEnd"),
    'variants': ("variants")
  },hashTypes:{'start': "ID",'end': "ID",'variants': "ID"},hashContexts:{'start': depth0,'end': depth0,'variants': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n  </div>\n\n  ");
  stack1 = helpers['if'].call(depth0, "showcaseVariant", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
  
});
