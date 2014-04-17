(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  HOST: 'http://localhost:3002/'
}

},{}],2:[function(require,module,exports){
var Ember = (window.Ember)
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

},{"../../config/env":1,"lodash-node/modern/functions/throttle":9}],3:[function(require,module,exports){
var Ember = (window.Ember)

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true
})

App.Router.map(function() {
  this.resource('individuals', {
    path: "/individuals"
  }, function(){
    this.route('index', { path: "/:id" })
    this.resource('variants', { path: ":id/variants" })
  })
})

// Routes
App.IndexRoute = require("./routes/index.js"),
App.IndividualsIndexRoute = require("./routes/individuals/index.js"),
// VariantsRoute: require("./routes/variants.js"),

// Controllers
App.IndividualsIndexController = require('./controllers/individuals/index'),

// // Models
// Individual: require("./models/individual.js"),
// Variant: require("./models/variant.js")

// Views
App.IndividualsIndexView = require("./views/individuals/index")
App.NucleotidesView = require("./views/nucleotides")

module.exports = window.App = App

},{"./controllers/individuals/index":2,"./routes/index.js":4,"./routes/individuals/index.js":5,"./views/individuals/index":6,"./views/nucleotides":7}],4:[function(require,module,exports){
var Ember = (window.Ember)
var getJSON = Ember.$.getJSON
var Promise = Ember.RSVP.Promise
const env = require('../config/env')

module.exports = Ember.Route.extend({
  model: function() {
    return new Promise(function(resolve, reject) {
      getJSON(env.HOST + 'individuals',function(data) {
        resolve(data.individuals.map(function(individual) {
          individual.id = individual.ID
          delete individual.ID
          return individual
        }))
      }).fail(function() {
        reject()
      })
    })
  }
})

},{"../config/env":1}],5:[function(require,module,exports){
var Ember = (window.Ember)
var ArrayProxy = Ember.ArrayProxy
var getJSON = Ember.$.getJSON
var Promise = Ember.RSVP.Promise
const env = require('../../config/env')

module.exports = Ember.Route.extend({
  model: function(params) {
    return new Promise(function(resolve, reject) {
      getJSON(env.HOST + 'individuals/' + params.id,function(result) {
        result.individual.id = result.individual.ID
        result.individual.deleterious = ArrayProxy.create({content:[]})
        getJSON(env.HOST + 'variants/',{
          where: JSON.stringify({
            "INDIVIDUAL_ID": params.id,
            "cosmic_variant.ID": {"gt": 0}
          })
        }, function(deleteriousResult) {
          result.individual.deleterious.setObjects(deleteriousResult.variants)
        })
        delete result.individual.ID
        resolve(result.individual)
      }).fail(function() {
        alert('reject')
        reject()
      })
    })
  }
})

},{"../../config/env":1}],6:[function(require,module,exports){
var Ember = (window.Ember)

module.exports = Ember.View.extend({
  click: function(event) {
    var variantId
    if(variantId = event.target.getAttribute('variant-id')) {
      this.get('controller').set('showcaseVariantId',variantId)
    }
  }
})

},{}],7:[function(require,module,exports){
var Ember = (window.Ember)

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
      } else if(variant.cosmicVariant) {
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

},{}],8:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../objects/isFunction'),
    isObject = require('../objects/isObject'),
    now = require('../utilities/now');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Creates a function that will delay the execution of `func` until after
 * `wait` milliseconds have elapsed since the last time it was invoked.
 * Provide an options object to indicate that `func` should be invoked on
 * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
 * to the debounced function will return the result of the last `func` call.
 *
 * Note: If `leading` and `trailing` options are `true` `func` will be called
 * on the trailing edge of the timeout only if the the debounced function is
 * invoked more than once during the `wait` timeout.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to debounce.
 * @param {number} wait The number of milliseconds to delay.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
 * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
 * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // avoid costly calculations while the window size is in flux
 * var lazyLayout = _.debounce(calculateLayout, 150);
 * jQuery(window).on('resize', lazyLayout);
 *
 * // execute `sendMail` when the click event is fired, debouncing subsequent calls
 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * });
 *
 * // ensure `batchLog` is executed once after 1 second of debounced calls
 * var source = new EventSource('/stream');
 * source.addEventListener('message', _.debounce(batchLog, 250, {
 *   'maxWait': 1000
 * }, false);
 */
function debounce(func, wait, options) {
  var args,
      maxTimeoutId,
      result,
      stamp,
      thisArg,
      timeoutId,
      trailingCall,
      lastCalled = 0,
      maxWait = false,
      trailing = true;

  if (!isFunction(func)) {
    throw new TypeError;
  }
  wait = nativeMax(0, wait) || 0;
  if (options === true) {
    var leading = true;
    trailing = false;
  } else if (isObject(options)) {
    leading = options.leading;
    maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
    trailing = 'trailing' in options ? options.trailing : trailing;
  }
  var delayed = function() {
    var remaining = wait - (now() - stamp);
    if (remaining <= 0) {
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId);
      }
      var isCalled = trailingCall;
      maxTimeoutId = timeoutId = trailingCall = undefined;
      if (isCalled) {
        lastCalled = now();
        result = func.apply(thisArg, args);
        if (!timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
      }
    } else {
      timeoutId = setTimeout(delayed, remaining);
    }
  };

  var maxDelayed = function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
    if (trailing || (maxWait !== wait)) {
      lastCalled = now();
      result = func.apply(thisArg, args);
      if (!timeoutId && !maxTimeoutId) {
        args = thisArg = null;
      }
    }
  };

  return function() {
    args = arguments;
    stamp = now();
    thisArg = this;
    trailingCall = trailing && (timeoutId || !leading);

    if (maxWait === false) {
      var leadingCall = leading && !timeoutId;
    } else {
      if (!maxTimeoutId && !leading) {
        lastCalled = stamp;
      }
      var remaining = maxWait - (stamp - lastCalled),
          isCalled = remaining <= 0;

      if (isCalled) {
        if (maxTimeoutId) {
          maxTimeoutId = clearTimeout(maxTimeoutId);
        }
        lastCalled = stamp;
        result = func.apply(thisArg, args);
      }
      else if (!maxTimeoutId) {
        maxTimeoutId = setTimeout(maxDelayed, remaining);
      }
    }
    if (isCalled && timeoutId) {
      timeoutId = clearTimeout(timeoutId);
    }
    else if (!timeoutId && wait !== maxWait) {
      timeoutId = setTimeout(delayed, wait);
    }
    if (leadingCall) {
      isCalled = true;
      result = func.apply(thisArg, args);
    }
    if (isCalled && !timeoutId && !maxTimeoutId) {
      args = thisArg = null;
    }
    return result;
  };
}

module.exports = debounce;

},{"../objects/isFunction":12,"../objects/isObject":13,"../utilities/now":14}],9:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var debounce = require('./debounce'),
    isFunction = require('../objects/isFunction'),
    isObject = require('../objects/isObject');

/** Used as an internal `_.debounce` options object */
var debounceOptions = {
  'leading': false,
  'maxWait': 0,
  'trailing': false
};

/**
 * Creates a function that, when executed, will only call the `func` function
 * at most once per every `wait` milliseconds. Provide an options object to
 * indicate that `func` should be invoked on the leading and/or trailing edge
 * of the `wait` timeout. Subsequent calls to the throttled function will
 * return the result of the last `func` call.
 *
 * Note: If `leading` and `trailing` options are `true` `func` will be called
 * on the trailing edge of the timeout only if the the throttled function is
 * invoked more than once during the `wait` timeout.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to throttle.
 * @param {number} wait The number of milliseconds to throttle executions to.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // avoid excessively updating the position while scrolling
 * var throttled = _.throttle(updatePosition, 100);
 * jQuery(window).on('scroll', throttled);
 *
 * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
 * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
 *   'trailing': false
 * }));
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (!isFunction(func)) {
    throw new TypeError;
  }
  if (options === false) {
    leading = false;
  } else if (isObject(options)) {
    leading = 'leading' in options ? options.leading : leading;
    trailing = 'trailing' in options ? options.trailing : trailing;
  }
  debounceOptions.leading = leading;
  debounceOptions.maxWait = wait;
  debounceOptions.trailing = trailing;

  return debounce(func, wait, debounceOptions);
}

module.exports = throttle;

},{"../objects/isFunction":12,"../objects/isObject":13,"./debounce":8}],10:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Used to detect if a method is native */
var reNative = RegExp('^' +
  String(toString)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/toString| for [^\]]+/g, '.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
 */
function isNative(value) {
  return typeof value == 'function' && reNative.test(value);
}

module.exports = isNative;

},{}],11:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to determine if values are of the language type Object */
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

module.exports = objectTypes;

},{}],12:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Checks if `value` is a function.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 */
function isFunction(value) {
  return typeof value == 'function';
}

module.exports = isFunction;

},{}],13:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = require('../internals/objectTypes');

/**
 * Checks if `value` is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.io/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
}

module.exports = isObject;

},{"../internals/objectTypes":11}],14:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('../internals/isNative');

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch
 * (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @example
 *
 * var stamp = _.now();
 * _.defer(function() { console.log(_.now() - stamp); });
 * // => logs the number of milliseconds it took for the deferred function to be called
 */
var now = isNative(now = Date.now) && now || function() {
  return new Date().getTime();
};

module.exports = now;

},{"../internals/isNative":10}]},{},[3])