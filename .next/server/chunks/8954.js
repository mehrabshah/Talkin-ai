"use strict";
exports.id = 8954;
exports.ids = [8954];
exports.modules = {

/***/ 3437:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ lib_axios)
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/bind.js


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/utils.js




// utils is a library of generic helper functions non-specific to axios

const {toString: utils_toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = utils_toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
}

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
}

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  const pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    utils_toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
}

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
}

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const utils_hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    if (reducer(descriptor, name, obj) !== false) {
      reducedDescriptors[name] = descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
}

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
}

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  }

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
}

const noop = () => {}

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
}

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
}

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0]
  }

  return str;
}

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  }

  return visit(obj, 0);
}

/* harmony default export */ const utils = ({
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty: utils_hasOwnProperty,
  hasOwnProp: utils_hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/AxiosError.js




/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const AxiosError_prototype = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(AxiosError_prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(AxiosError_prototype);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

/* harmony default export */ const core_AxiosError = (AxiosError);

// EXTERNAL MODULE: external "form-data"
var external_form_data_ = __webpack_require__(8941);
;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/node/classes/FormData.js


/* harmony default export */ const classes_FormData = (external_form_data_);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/toFormData.js




// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored


/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (classes_FormData || FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils.isSpecCompliantForm(formData);

  if (!utils.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils.isBlob(value)) {
      throw new core_AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils.isArray(value) && isFlatArray(value)) ||
        ((utils.isFileList(value) || utils.endsWith(key, '[]')) && (arr = utils.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils.forEach(value, function each(el, key) {
      const result = !(utils.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/* harmony default export */ const helpers_toFormData = (toFormData);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/AxiosURLSearchParams.js




/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && helpers_toFormData(params, this, options);
}

const AxiosURLSearchParams_prototype = AxiosURLSearchParams.prototype;

AxiosURLSearchParams_prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

AxiosURLSearchParams_prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/* harmony default export */ const helpers_AxiosURLSearchParams = (AxiosURLSearchParams);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/buildURL.js





/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function buildURL_encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || buildURL_encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils.isURLSearchParams(params) ?
      params.toString() :
      new helpers_AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/InterceptorManager.js




class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

/* harmony default export */ const core_InterceptorManager = (InterceptorManager);

;// CONCATENATED MODULE: ./node_modules/axios/lib/defaults/transitional.js


/* harmony default export */ const defaults_transitional = ({
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
});

// EXTERNAL MODULE: external "url"
var external_url_ = __webpack_require__(7310);
;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/node/classes/URLSearchParams.js



/* harmony default export */ const URLSearchParams = (external_url_.URLSearchParams);

;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/node/index.js



/* harmony default export */ const node = ({
  isNode: true,
  classes: {
    URLSearchParams: URLSearchParams,
    FormData: classes_FormData,
    Blob: typeof Blob !== 'undefined' && Blob || null
  },
  protocols: [ 'http', 'https', 'file', 'data' ]
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/toURLEncodedForm.js






function toURLEncodedForm(data, options) {
  return helpers_toFormData(data, new node.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (node.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/formDataToJSON.js




/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    const obj = {};

    utils.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/* harmony default export */ const helpers_formDataToJSON = (formDataToJSON);

;// CONCATENATED MODULE: ./node_modules/axios/lib/defaults/index.js










const DEFAULT_CONTENT_TYPE = {
  'Content-Type': undefined
};

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: defaults_transitional,

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils.isObject(data);

    if (isObjectPayload && utils.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils.isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(helpers_formDataToJSON(data)) : data;
    }

    if (utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return helpers_toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw core_AxiosError.from(e, core_AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: node.classes.FormData,
    Blob: node.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

/* harmony default export */ const lib_defaults = (defaults);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/parseHeaders.js




// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
/* harmony default export */ const parseHeaders = (rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/AxiosHeaders.js





const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils.isString(value)) return;

  if (utils.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite)
    } else if(utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils.forEach(this, (value, header) => {
      const key = utils.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

utils.freezeMethods(AxiosHeaders.prototype);
utils.freezeMethods(AxiosHeaders);

/* harmony default export */ const core_AxiosHeaders = (AxiosHeaders);

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/transformData.js






/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || lib_defaults;
  const context = response || config;
  const headers = core_AxiosHeaders.from(context.headers);
  let data = context.data;

  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/cancel/isCancel.js


function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/cancel/CanceledError.js





/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  core_AxiosError.call(this, message == null ? 'canceled' : message, core_AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, core_AxiosError, {
  __CANCEL__: true
});

/* harmony default export */ const cancel_CanceledError = (CanceledError);

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/settle.js




/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new core_AxiosError(
      'Request failed with status code ' + response.status,
      [core_AxiosError.ERR_BAD_REQUEST, core_AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/isAbsoluteURL.js


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/combineURLs.js


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/buildFullPath.js





/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

// EXTERNAL MODULE: external "proxy-from-env"
var external_proxy_from_env_ = __webpack_require__(3149);
// EXTERNAL MODULE: external "http"
var external_http_ = __webpack_require__(3685);
// EXTERNAL MODULE: external "https"
var external_https_ = __webpack_require__(5687);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(3837);
// EXTERNAL MODULE: external "follow-redirects"
var external_follow_redirects_ = __webpack_require__(6953);
// EXTERNAL MODULE: external "zlib"
var external_zlib_ = __webpack_require__(9796);
;// CONCATENATED MODULE: ./node_modules/axios/lib/env/data.js
const VERSION = "1.3.5";
;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/parseProtocol.js


function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/fromDataURI.js






const DATA_URL_PATTERN = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;

/**
 * Parse data uri to a Buffer or Blob
 *
 * @param {String} uri
 * @param {?Boolean} asBlob
 * @param {?Object} options
 * @param {?Function} options.Blob
 *
 * @returns {Buffer|Blob}
 */
function fromDataURI(uri, asBlob, options) {
  const _Blob = options && options.Blob || node.classes.Blob;
  const protocol = parseProtocol(uri);

  if (asBlob === undefined && _Blob) {
    asBlob = true;
  }

  if (protocol === 'data') {
    uri = protocol.length ? uri.slice(protocol.length + 1) : uri;

    const match = DATA_URL_PATTERN.exec(uri);

    if (!match) {
      throw new core_AxiosError('Invalid URL', core_AxiosError.ERR_INVALID_URL);
    }

    const mime = match[1];
    const isBase64 = match[2];
    const body = match[3];
    const buffer = Buffer.from(decodeURIComponent(body), isBase64 ? 'base64' : 'utf8');

    if (asBlob) {
      if (!_Blob) {
        throw new core_AxiosError('Blob is not supported', core_AxiosError.ERR_NOT_SUPPORT);
      }

      return new _Blob([buffer], {type: mime});
    }

    return buffer;
  }

  throw new core_AxiosError('Unsupported protocol ' + protocol, core_AxiosError.ERR_NOT_SUPPORT);
}

// EXTERNAL MODULE: external "stream"
var external_stream_ = __webpack_require__(2781);
;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/throttle.js


/**
 * Throttle decorator
 * @param {Function} fn
 * @param {Number} freq
 * @return {Function}
 */
function throttle(fn, freq) {
  let timestamp = 0;
  const threshold = 1000 / freq;
  let timer = null;
  return function throttled(force, args) {
    const now = Date.now();
    if (force || now - timestamp > threshold) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timestamp = now;
      return fn.apply(null, args);
    }
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        timestamp = Date.now();
        return fn.apply(null, args);
      }, threshold - (now - timestamp));
    }
  };
}

/* harmony default export */ const helpers_throttle = (throttle);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/speedometer.js


/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

/* harmony default export */ const helpers_speedometer = (speedometer);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/AxiosTransformStream.js







const kInternals = Symbol('internals');

class AxiosTransformStream extends external_stream_.Transform{
  constructor(options) {
    options = utils.toFlatObject(options, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (prop, source) => {
      return !utils.isUndefined(source[prop]);
    });

    super({
      readableHighWaterMark: options.chunkSize
    });

    const self = this;

    const internals = this[kInternals] = {
      length: options.length,
      timeWindow: options.timeWindow,
      ticksRate: options.ticksRate,
      chunkSize: options.chunkSize,
      maxRate: options.maxRate,
      minChunkSize: options.minChunkSize,
      bytesSeen: 0,
      isCaptured: false,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };

    const _speedometer = helpers_speedometer(internals.ticksRate * options.samplesCount, internals.timeWindow);

    this.on('newListener', event => {
      if (event === 'progress') {
        if (!internals.isCaptured) {
          internals.isCaptured = true;
        }
      }
    });

    let bytesNotified = 0;

    internals.updateProgress = helpers_throttle(function throttledHandler() {
      const totalBytes = internals.length;
      const bytesTransferred = internals.bytesSeen;
      const progressBytes = bytesTransferred - bytesNotified;
      if (!progressBytes || self.destroyed) return;

      const rate = _speedometer(progressBytes);

      bytesNotified = bytesTransferred;

      process.nextTick(() => {
        self.emit('progress', {
          'loaded': bytesTransferred,
          'total': totalBytes,
          'progress': totalBytes ? (bytesTransferred / totalBytes) : undefined,
          'bytes': progressBytes,
          'rate': rate ? rate : undefined,
          'estimated': rate && totalBytes && bytesTransferred <= totalBytes ?
            (totalBytes - bytesTransferred) / rate : undefined
        });
      });
    }, internals.ticksRate);

    const onFinish = () => {
      internals.updateProgress(true);
    };

    this.once('end', onFinish);
    this.once('error', onFinish);
  }

  _read(size) {
    const internals = this[kInternals];

    if (internals.onReadCallback) {
      internals.onReadCallback();
    }

    return super._read(size);
  }

  _transform(chunk, encoding, callback) {
    const self = this;
    const internals = this[kInternals];
    const maxRate = internals.maxRate;

    const readableHighWaterMark = this.readableHighWaterMark;

    const timeWindow = internals.timeWindow;

    const divider = 1000 / timeWindow;
    const bytesThreshold = (maxRate / divider);
    const minChunkSize = internals.minChunkSize !== false ? Math.max(internals.minChunkSize, bytesThreshold * 0.01) : 0;

    function pushChunk(_chunk, _callback) {
      const bytes = Buffer.byteLength(_chunk);
      internals.bytesSeen += bytes;
      internals.bytes += bytes;

      if (internals.isCaptured) {
        internals.updateProgress();
      }

      if (self.push(_chunk)) {
        process.nextTick(_callback);
      } else {
        internals.onReadCallback = () => {
          internals.onReadCallback = null;
          process.nextTick(_callback);
        };
      }
    }

    const transformChunk = (_chunk, _callback) => {
      const chunkSize = Buffer.byteLength(_chunk);
      let chunkRemainder = null;
      let maxChunkSize = readableHighWaterMark;
      let bytesLeft;
      let passed = 0;

      if (maxRate) {
        const now = Date.now();

        if (!internals.ts || (passed = (now - internals.ts)) >= timeWindow) {
          internals.ts = now;
          bytesLeft = bytesThreshold - internals.bytes;
          internals.bytes = bytesLeft < 0 ? -bytesLeft : 0;
          passed = 0;
        }

        bytesLeft = bytesThreshold - internals.bytes;
      }

      if (maxRate) {
        if (bytesLeft <= 0) {
          // next time window
          return setTimeout(() => {
            _callback(null, _chunk);
          }, timeWindow - passed);
        }

        if (bytesLeft < maxChunkSize) {
          maxChunkSize = bytesLeft;
        }
      }

      if (maxChunkSize && chunkSize > maxChunkSize && (chunkSize - maxChunkSize) > minChunkSize) {
        chunkRemainder = _chunk.subarray(maxChunkSize);
        _chunk = _chunk.subarray(0, maxChunkSize);
      }

      pushChunk(_chunk, chunkRemainder ? () => {
        process.nextTick(_callback, null, chunkRemainder);
      } : _callback);
    };

    transformChunk(chunk, function transformNextChunk(err, _chunk) {
      if (err) {
        return callback(err);
      }

      if (_chunk) {
        transformChunk(_chunk, transformNextChunk);
      } else {
        callback(null);
      }
    });
  }

  setLength(length) {
    this[kInternals].length = +length;
    return this;
  }
}

/* harmony default export */ const helpers_AxiosTransformStream = (AxiosTransformStream);

// EXTERNAL MODULE: external "events"
var external_events_ = __webpack_require__(2361);
;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/readBlob.js
const {asyncIterator} = Symbol;

const readBlob = async function* (blob) {
  if (blob.stream) {
    yield* blob.stream()
  } else if (blob.arrayBuffer) {
    yield await blob.arrayBuffer()
  } else if (blob[asyncIterator]) {
    yield* blob[asyncIterator]();
  } else {
    yield blob;
  }
}

/* harmony default export */ const helpers_readBlob = (readBlob);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/formDataToStream.js





const BOUNDARY_ALPHABET = utils.ALPHABET.ALPHA_DIGIT + '-_';

const textEncoder = new external_util_.TextEncoder();

const CRLF = '\r\n';
const CRLF_BYTES = textEncoder.encode(CRLF);
const CRLF_BYTES_COUNT = 2;

class FormDataPart {
  constructor(name, value) {
    const {escapeName} = this.constructor;
    const isStringValue = utils.isString(value);

    let headers = `Content-Disposition: form-data; name="${escapeName(name)}"${
      !isStringValue && value.name ? `; filename="${escapeName(value.name)}"` : ''
    }${CRLF}`;

    if (isStringValue) {
      value = textEncoder.encode(String(value).replace(/\r?\n|\r\n?/g, CRLF));
    } else {
      headers += `Content-Type: ${value.type || "application/octet-stream"}${CRLF}`
    }

    this.headers = textEncoder.encode(headers + CRLF);

    this.contentLength = isStringValue ? value.byteLength : value.size;

    this.size = this.headers.byteLength + this.contentLength + CRLF_BYTES_COUNT;

    this.name = name;
    this.value = value;
  }

  async *encode(){
    yield this.headers;

    const {value} = this;

    if(utils.isTypedArray(value)) {
      yield value;
    } else {
      yield* helpers_readBlob(value);
    }

    yield CRLF_BYTES;
  }

  static escapeName(name) {
      return String(name).replace(/[\r\n"]/g, (match) => ({
        '\r' : '%0D',
        '\n' : '%0A',
        '"' : '%22',
      }[match]));
  }
}

const formDataToStream = (form, headersHandler, options) => {
  const {
    tag = 'form-data-boundary',
    size = 25,
    boundary = tag + '-' + utils.generateString(size, BOUNDARY_ALPHABET)
  } = options || {};

  if(!utils.isFormData(form)) {
    throw TypeError('FormData instance required');
  }

  if (boundary.length < 1 || boundary.length > 70) {
    throw Error('boundary must be 10-70 characters long')
  }

  const boundaryBytes = textEncoder.encode('--' + boundary + CRLF);
  const footerBytes = textEncoder.encode('--' + boundary + '--' + CRLF + CRLF);
  let contentLength = footerBytes.byteLength;

  const parts = Array.from(form.entries()).map(([name, value]) => {
    const part = new FormDataPart(name, value);
    contentLength += part.size;
    return part;
  });

  contentLength += boundaryBytes.byteLength * parts.length;

  contentLength = utils.toFiniteNumber(contentLength);

  const computedHeaders = {
    'Content-Type': `multipart/form-data; boundary=${boundary}`
  }

  if (Number.isFinite(contentLength)) {
    computedHeaders['Content-Length'] = contentLength;
  }

  headersHandler && headersHandler(computedHeaders);

  return external_stream_.Readable.from((async function *() {
    for(const part of parts) {
      yield boundaryBytes;
      yield* part.encode();
    }

    yield footerBytes;
  })());
};

/* harmony default export */ const helpers_formDataToStream = (formDataToStream);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/ZlibHeaderTransformStream.js




class ZlibHeaderTransformStream extends external_stream_.Transform {
  __transform(chunk, encoding, callback) {
    this.push(chunk);
    callback();
  }

  _transform(chunk, encoding, callback) {
    if (chunk.length !== 0) {
      this._transform = this.__transform;

      // Add Default Compression headers if no zlib headers are present
      if (chunk[0] !== 120) { // Hex: 78
        const header = Buffer.alloc(2);
        header[0] = 120; // Hex: 78
        header[1] = 156; // Hex: 9C 
        this.push(header, encoding);
      }
    }

    this.__transform(chunk, encoding, callback);
  }
}

/* harmony default export */ const helpers_ZlibHeaderTransformStream = (ZlibHeaderTransformStream);

;// CONCATENATED MODULE: ./node_modules/axios/lib/adapters/http.js


























const zlibOptions = {
  flush: external_zlib_.constants.Z_SYNC_FLUSH,
  finishFlush: external_zlib_.constants.Z_SYNC_FLUSH
};

const brotliOptions = {
  flush: external_zlib_.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: external_zlib_.constants.BROTLI_OPERATION_FLUSH
}

const isBrotliSupported = utils.isFunction(external_zlib_.createBrotliDecompress);

const {http: httpFollow, https: httpsFollow} = external_follow_redirects_;

const isHttps = /https:?/;

const supportedProtocols = node.protocols.map(protocol => {
  return protocol + ':';
});

/**
 * If the proxy or config beforeRedirects functions are defined, call them with the options
 * object.
 *
 * @param {Object<string, any>} options - The options object that was passed to the request.
 *
 * @returns {Object<string, any>}
 */
function dispatchBeforeRedirect(options) {
  if (options.beforeRedirects.proxy) {
    options.beforeRedirects.proxy(options);
  }
  if (options.beforeRedirects.config) {
    options.beforeRedirects.config(options);
  }
}

/**
 * If the proxy or config afterRedirects functions are defined, call them with the options
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} configProxy configuration from Axios options object
 * @param {string} location
 *
 * @returns {http.ClientRequestArgs}
 */
function setProxy(options, configProxy, location) {
  let proxy = configProxy;
  if (!proxy && proxy !== false) {
    const proxyUrl = (0,external_proxy_from_env_.getProxyForUrl)(location);
    if (proxyUrl) {
      proxy = new URL(proxyUrl);
    }
  }
  if (proxy) {
    // Basic proxy authorization
    if (proxy.username) {
      proxy.auth = (proxy.username || '') + ':' + (proxy.password || '');
    }

    if (proxy.auth) {
      // Support proxy auth object form
      if (proxy.auth.username || proxy.auth.password) {
        proxy.auth = (proxy.auth.username || '') + ':' + (proxy.auth.password || '');
      }
      const base64 = Buffer
        .from(proxy.auth, 'utf8')
        .toString('base64');
      options.headers['Proxy-Authorization'] = 'Basic ' + base64;
    }

    options.headers.host = options.hostname + (options.port ? ':' + options.port : '');
    const proxyHost = proxy.hostname || proxy.host;
    options.hostname = proxyHost;
    // Replace 'host' since options is not a URL object
    options.host = proxyHost;
    options.port = proxy.port;
    options.path = location;
    if (proxy.protocol) {
      options.protocol = proxy.protocol.includes(':') ? proxy.protocol : `${proxy.protocol}:`;
    }
  }

  options.beforeRedirects.proxy = function beforeRedirect(redirectOptions) {
    // Configure proxy for redirected request, passing the original config proxy to apply
    // the exact same logic as if the redirected request was performed by axios directly.
    setProxy(redirectOptions, configProxy, redirectOptions.href);
  };
}

const isHttpAdapterSupported = typeof process !== 'undefined' && utils.kindOf(process) === 'process';

// temporary hotfix

const wrapAsync = (asyncExecutor) => {
  return new Promise((resolve, reject) => {
    let onDone;
    let isDone;

    const done = (value, isRejected) => {
      if (isDone) return;
      isDone = true;
      onDone && onDone(value, isRejected);
    }

    const _resolve = (value) => {
      done(value);
      resolve(value);
    };

    const _reject = (reason) => {
      done(reason, true);
      reject(reason);
    }

    asyncExecutor(_resolve, _reject, (onDoneHandler) => (onDone = onDoneHandler)).catch(_reject);
  })
};

/*eslint consistent-return:0*/
/* harmony default export */ const http = (isHttpAdapterSupported && function httpAdapter(config) {
  return wrapAsync(async function dispatchHttpRequest(resolve, reject, onDone) {
    let {data} = config;
    const {responseType, responseEncoding} = config;
    const method = config.method.toUpperCase();
    let isDone;
    let rejected = false;
    let req;

    // temporary internal emitter until the AxiosRequest class will be implemented
    const emitter = new external_events_();

    const onFinished = () => {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(abort);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', abort);
      }

      emitter.removeAllListeners();
    }

    onDone((value, isRejected) => {
      isDone = true;
      if (isRejected) {
        rejected = true;
        onFinished();
      }
    });

    function abort(reason) {
      emitter.emit('abort', !reason || reason.type ? new cancel_CanceledError(null, config, req) : reason);
    }

    emitter.once('abort', reject);

    if (config.cancelToken || config.signal) {
      config.cancelToken && config.cancelToken.subscribe(abort);
      if (config.signal) {
        config.signal.aborted ? abort() : config.signal.addEventListener('abort', abort);
      }
    }

    // Parse url
    const fullPath = buildFullPath(config.baseURL, config.url);
    const parsed = new URL(fullPath, 'http://localhost');
    const protocol = parsed.protocol || supportedProtocols[0];

    if (protocol === 'data:') {
      let convertedData;

      if (method !== 'GET') {
        return settle(resolve, reject, {
          status: 405,
          statusText: 'method not allowed',
          headers: {},
          config
        });
      }

      try {
        convertedData = fromDataURI(config.url, responseType === 'blob', {
          Blob: config.env && config.env.Blob
        });
      } catch (err) {
        throw core_AxiosError.from(err, core_AxiosError.ERR_BAD_REQUEST, config);
      }

      if (responseType === 'text') {
        convertedData = convertedData.toString(responseEncoding);

        if (!responseEncoding || responseEncoding === 'utf8') {
          convertedData = utils.stripBOM(convertedData);
        }
      } else if (responseType === 'stream') {
        convertedData = external_stream_.Readable.from(convertedData);
      }

      return settle(resolve, reject, {
        data: convertedData,
        status: 200,
        statusText: 'OK',
        headers: new core_AxiosHeaders(),
        config
      });
    }

    if (supportedProtocols.indexOf(protocol) === -1) {
      return reject(new core_AxiosError(
        'Unsupported protocol ' + protocol,
        core_AxiosError.ERR_BAD_REQUEST,
        config
      ));
    }

    const headers = core_AxiosHeaders.from(config.headers).normalize();

    // Set User-Agent (required by some servers)
    // See https://github.com/axios/axios/issues/69
    // User-Agent is specified; handle case where no UA header is desired
    // Only set header if it hasn't been set in config
    headers.set('User-Agent', 'axios/' + VERSION, false);

    const onDownloadProgress = config.onDownloadProgress;
    const onUploadProgress = config.onUploadProgress;
    const maxRate = config.maxRate;
    let maxUploadRate = undefined;
    let maxDownloadRate = undefined;

    // support for spec compliant FormData objects
    if (utils.isSpecCompliantForm(data)) {
      const userBoundary = headers.getContentType(/boundary=([-_\w\d]{10,70})/i);

      data = helpers_formDataToStream(data, (formHeaders) => {
        headers.set(formHeaders);
      }, {
        tag: `axios-${VERSION}-boundary`,
        boundary: userBoundary && userBoundary[1] || undefined
      });
      // support for https://www.npmjs.com/package/form-data api
    } else if (utils.isFormData(data) && utils.isFunction(data.getHeaders)) {
      headers.set(data.getHeaders());

      if (!headers.hasContentLength()) {
        try {
          const knownLength = await external_util_.promisify(data.getLength).call(data);
          Number.isFinite(knownLength) && knownLength >= 0 && headers.setContentLength(knownLength);
          /*eslint no-empty:0*/
        } catch (e) {
        }
      }
    } else if (utils.isBlob(data)) {
      data.size && headers.setContentType(data.type || 'application/octet-stream');
      headers.setContentLength(data.size || 0);
      data = external_stream_.Readable.from(helpers_readBlob(data));
    } else if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(new core_AxiosError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          core_AxiosError.ERR_BAD_REQUEST,
          config
        ));
      }

      // Add Content-Length header if data exists
      headers.setContentLength(data.length, false);

      if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
        return reject(new core_AxiosError(
          'Request body larger than maxBodyLength limit',
          core_AxiosError.ERR_BAD_REQUEST,
          config
        ));
      }
    }

    const contentLength = utils.toFiniteNumber(headers.getContentLength());

    if (utils.isArray(maxRate)) {
      maxUploadRate = maxRate[0];
      maxDownloadRate = maxRate[1];
    } else {
      maxUploadRate = maxDownloadRate = maxRate;
    }

    if (data && (onUploadProgress || maxUploadRate)) {
      if (!utils.isStream(data)) {
        data = external_stream_.Readable.from(data, {objectMode: false});
      }

      data = external_stream_.pipeline([data, new helpers_AxiosTransformStream({
        length: contentLength,
        maxRate: utils.toFiniteNumber(maxUploadRate)
      })], utils.noop);

      onUploadProgress && data.on('progress', progress => {
        onUploadProgress(Object.assign(progress, {
          upload: true
        }));
      });
    }

    // HTTP basic authentication
    let auth = undefined;
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password || '';
      auth = username + ':' + password;
    }

    if (!auth && parsed.username) {
      const urlUsername = parsed.username;
      const urlPassword = parsed.password;
      auth = urlUsername + ':' + urlPassword;
    }

    auth && headers.delete('authorization');

    let path;

    try {
      path = buildURL(
        parsed.pathname + parsed.search,
        config.params,
        config.paramsSerializer
      ).replace(/^\?/, '');
    } catch (err) {
      const customErr = new Error(err.message);
      customErr.config = config;
      customErr.url = config.url;
      customErr.exists = true;
      return reject(customErr);
    }

    headers.set(
      'Accept-Encoding',
      'gzip, compress, deflate' + (isBrotliSupported ? ', br' : ''), false
      );

    const options = {
      path,
      method: method,
      headers: headers.toJSON(),
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth,
      protocol,
      beforeRedirect: dispatchBeforeRedirect,
      beforeRedirects: {}
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
      setProxy(options, config.proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    let transport;
    const isHttpsRequest = isHttps.test(options.protocol);
    options.agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsRequest ? external_https_ : external_http_;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      if (config.beforeRedirect) {
        options.beforeRedirects.config = config.beforeRedirect;
      }
      transport = isHttpsRequest ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    } else {
      // follow-redirects does not skip comparison, so it should always succeed for axios -1 unlimited
      options.maxBodyLength = Infinity;
    }

    if (config.insecureHTTPParser) {
      options.insecureHTTPParser = config.insecureHTTPParser;
    }

    // Create the request
    req = transport.request(options, function handleResponse(res) {
      if (req.destroyed) return;

      const streams = [res];

      const responseLength = +res.headers['content-length'];

      if (onDownloadProgress) {
        const transformStream = new helpers_AxiosTransformStream({
          length: utils.toFiniteNumber(responseLength),
          maxRate: utils.toFiniteNumber(maxDownloadRate)
        });

        onDownloadProgress && transformStream.on('progress', progress => {
          onDownloadProgress(Object.assign(progress, {
            download: true
          }));
        });

        streams.push(transformStream);
      }

      // decompress the response body transparently if required
      let responseStream = res;

      // return the last request in case of redirects
      const lastRequest = res.req || req;

      // if decompress disabled we should not decompress
      if (config.decompress !== false && res.headers['content-encoding']) {
        // if no content, but headers still say that it is encoded,
        // remove the header not confuse downstream operations
        if (method === 'HEAD' || res.statusCode === 204) {
          delete res.headers['content-encoding'];
        }

        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'x-gzip':
        case 'compress':
        case 'x-compress':
          // add the unzipper to the body stream processing pipeline
          streams.push(external_zlib_.createUnzip(zlibOptions));

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        case 'deflate':
          streams.push(new helpers_ZlibHeaderTransformStream());

          // add the unzipper to the body stream processing pipeline
          streams.push(external_zlib_.createUnzip(zlibOptions));

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        case 'br':
          if (isBrotliSupported) {
            streams.push(external_zlib_.createBrotliDecompress(brotliOptions));
            delete res.headers['content-encoding'];
          }
        }
      }

      responseStream = streams.length > 1 ? external_stream_.pipeline(streams, utils.noop) : streams[0];

      const offListeners = external_stream_.finished(responseStream, () => {
        offListeners();
        onFinished();
      });

      const response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: new core_AxiosHeaders(res.headers),
        config,
        request: lastRequest
      };

      if (responseType === 'stream') {
        response.data = responseStream;
        settle(resolve, reject, response);
      } else {
        const responseBuffer = [];
        let totalResponseBytes = 0;

        responseStream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length;

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            // stream.destroy() emit aborted event before calling reject() on Node.js v16
            rejected = true;
            responseStream.destroy();
            reject(new core_AxiosError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              core_AxiosError.ERR_BAD_RESPONSE, config, lastRequest));
          }
        });

        responseStream.on('aborted', function handlerStreamAborted() {
          if (rejected) {
            return;
          }

          const err = new core_AxiosError(
            'maxContentLength size of ' + config.maxContentLength + ' exceeded',
            core_AxiosError.ERR_BAD_RESPONSE,
            config,
            lastRequest
          );
          responseStream.destroy(err);
          reject(err);
        });

        responseStream.on('error', function handleStreamError(err) {
          if (req.destroyed) return;
          reject(core_AxiosError.from(err, null, config, lastRequest));
        });

        responseStream.on('end', function handleStreamEnd() {
          try {
            let responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
            if (responseType !== 'arraybuffer') {
              responseData = responseData.toString(responseEncoding);
              if (!responseEncoding || responseEncoding === 'utf8') {
                responseData = utils.stripBOM(responseData);
              }
            }
            response.data = responseData;
          } catch (err) {
            reject(core_AxiosError.from(err, null, config, response.request, response));
          }
          settle(resolve, reject, response);
        });
      }

      emitter.once('abort', err => {
        if (!responseStream.destroyed) {
          responseStream.emit('error', err);
          responseStream.destroy();
        }
      });
    });

    emitter.once('abort', err => {
      reject(err);
      req.destroy(err);
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      // @todo remove
      // if (req.aborted && err.code !== AxiosError.ERR_FR_TOO_MANY_REDIRECTS) return;
      reject(core_AxiosError.from(err, null, config, req));
    });

    // set tcp keep alive to prevent drop connection by peer
    req.on('socket', function handleRequestSocket(socket) {
      // default interval of sending ack packet is 1 minute
      socket.setKeepAlive(true, 1000 * 60);
    });

    // Handle request timeout
    if (config.timeout) {
      // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
      const timeout = parseInt(config.timeout, 10);

      if (isNaN(timeout)) {
        reject(new core_AxiosError(
          'error trying to parse `config.timeout` to int',
          core_AxiosError.ERR_BAD_OPTION_VALUE,
          config,
          req
        ));

        return;
      }

      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devouring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(timeout, function handleRequestTimeout() {
        if (isDone) return;
        let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
        const transitional = config.transitional || defaults_transitional;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(new core_AxiosError(
          timeoutErrorMessage,
          transitional.clarifyTimeoutError ? core_AxiosError.ETIMEDOUT : core_AxiosError.ECONNABORTED,
          config,
          req
        ));
        abort();
      });
    }


    // Send the request
    if (utils.isStream(data)) {
      let ended = false;
      let errored = false;

      data.on('end', () => {
        ended = true;
      });

      data.once('error', err => {
        errored = true;
        req.destroy(err);
      });

      data.on('close', () => {
        if (!ended && !errored) {
          abort(new cancel_CanceledError('Request stream has been aborted', config, req));
        }
      });

      data.pipe(req);
    } else {
      req.end(data);
    }
  });
});

const __setProxy = (/* unused pure expression or super */ null && (setProxy));

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/cookies.js





/* harmony default export */ const cookies = (node.isStandardBrowserEnv ?

// Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

// Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })());

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/isURLSameOrigin.js





/* harmony default export */ const isURLSameOrigin = (node.isStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })());

;// CONCATENATED MODULE: ./node_modules/axios/lib/adapters/xhr.js
















function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = helpers_speedometer(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

/* harmony default export */ const xhr = (isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = core_AxiosHeaders.from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && (node.isStandardBrowserEnv || node.isStandardBrowserWebWorkerEnv)) {
      requestHeaders.setContentType(false); // Let the browser set it
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = core_AxiosHeaders.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new core_AxiosError('Request aborted', core_AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new core_AxiosError('Network Error', core_AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || defaults_transitional;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new core_AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? core_AxiosError.ETIMEDOUT : core_AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (node.isStandardBrowserEnv) {
      // Add xsrf header
      const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath))
        && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new cancel_CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && node.protocols.indexOf(protocol) === -1) {
      reject(new core_AxiosError('Unsupported protocol ' + protocol + ':', core_AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/adapters/adapters.js





const knownAdapters = {
  http: http,
  xhr: xhr
}

utils.forEach(knownAdapters, (fn, value) => {
  if(fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

/* harmony default export */ const adapters = ({
  getAdapter: (adapters) => {
    adapters = utils.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      if((adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
        break;
      }
    }

    if (!adapter) {
      if (adapter === false) {
        throw new core_AxiosError(
          `Adapter ${nameOrAdapter} is not supported by the environment`,
          'ERR_NOT_SUPPORT'
        );
      }

      throw new Error(
        utils.hasOwnProp(knownAdapters, nameOrAdapter) ?
          `Adapter '${nameOrAdapter}' is not available in the build` :
          `Unknown adapter '${nameOrAdapter}'`
      );
    }

    if (!utils.isFunction(adapter)) {
      throw new TypeError('adapter is not a function');
    }

    return adapter;
  },
  adapters: knownAdapters
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/dispatchRequest.js









/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new cancel_CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = core_AxiosHeaders.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || lib_defaults.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = core_AxiosHeaders.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = core_AxiosHeaders.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/mergeConfig.js





const headersToObject = (thing) => thing instanceof core_AxiosHeaders ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({caseless}, target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/validator.js





const validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new core_AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        core_AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new core_AxiosError('options must be an object', core_AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new core_AxiosError('option ' + opt + ' must be ' + result, core_AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new core_AxiosError('Unknown option ' + opt, core_AxiosError.ERR_BAD_OPTION);
    }
  }
}

/* harmony default export */ const validator = ({
  assertOptions,
  validators
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/Axios.js











const Axios_validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new core_InterceptorManager(),
      response: new core_InterceptorManager()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: Axios_validators.transitional(Axios_validators.boolean),
        forcedJSONParsing: Axios_validators.transitional(Axios_validators.boolean),
        clarifyTimeoutError: Axios_validators.transitional(Axios_validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (utils.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        }
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: Axios_validators.function,
          serialize: Axios_validators.function
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    let contextHeaders;

    // Flatten headers
    contextHeaders = headers && utils.merge(
      headers.common,
      headers[config.method]
    );

    contextHeaders && utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = core_AxiosHeaders.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

/* harmony default export */ const core_Axios = (Axios);

;// CONCATENATED MODULE: ./node_modules/axios/lib/cancel/CancelToken.js




/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new cancel_CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

/* harmony default export */ const cancel_CancelToken = (CancelToken);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/spread.js


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/isAxiosError.js




/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/HttpStatusCode.js
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

/* harmony default export */ const helpers_HttpStatusCode = (HttpStatusCode);

;// CONCATENATED MODULE: ./node_modules/axios/lib/axios.js



















/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new core_Axios(defaultConfig);
  const instance = bind(core_Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, core_Axios.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(lib_defaults);

// Expose Axios class to allow class inheritance
axios.Axios = core_Axios;

// Expose Cancel & CancelToken
axios.CanceledError = cancel_CanceledError;
axios.CancelToken = cancel_CancelToken;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = helpers_toFormData;

// Expose AxiosError class
axios.AxiosError = core_AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = core_AxiosHeaders;

axios.formToJSON = thing => helpers_formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.HttpStatusCode = helpers_HttpStatusCode;

axios.default = axios;

// this module should only have a default export
/* harmony default export */ const lib_axios = (axios);


/***/ }),

/***/ 1594:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ stripe_esm_node)
});

// UNUSED EXPORTS: Stripe

// NAMESPACE OBJECT: ./node_modules/stripe/esm/Error.js
var Error_namespaceObject = {};
__webpack_require__.r(Error_namespaceObject);
__webpack_require__.d(Error_namespaceObject, {
  "StripeAPIError": () => (StripeAPIError),
  "StripeAuthenticationError": () => (StripeAuthenticationError),
  "StripeCardError": () => (StripeCardError),
  "StripeConnectionError": () => (StripeConnectionError),
  "StripeError": () => (StripeError),
  "StripeIdempotencyError": () => (StripeIdempotencyError),
  "StripeInvalidGrantError": () => (StripeInvalidGrantError),
  "StripeInvalidRequestError": () => (StripeInvalidRequestError),
  "StripePermissionError": () => (StripePermissionError),
  "StripeRateLimitError": () => (StripeRateLimitError),
  "StripeSignatureVerificationError": () => (StripeSignatureVerificationError),
  "StripeUnknownError": () => (StripeUnknownError),
  "generate": () => (generate)
});

// NAMESPACE OBJECT: ./node_modules/stripe/esm/resources.js
var resources_namespaceObject = {};
__webpack_require__.r(resources_namespaceObject);
__webpack_require__.d(resources_namespaceObject, {
  "Account": () => (Accounts_Accounts),
  "AccountLinks": () => (AccountLinks),
  "Accounts": () => (Accounts_Accounts),
  "ApplePayDomains": () => (ApplePayDomains),
  "ApplicationFees": () => (ApplicationFees),
  "Apps": () => (Apps),
  "Balance": () => (Balance),
  "BalanceTransactions": () => (BalanceTransactions),
  "BillingPortal": () => (BillingPortal),
  "Charges": () => (Charges),
  "Checkout": () => (Checkout),
  "CountrySpecs": () => (CountrySpecs),
  "Coupons": () => (Coupons),
  "CreditNotes": () => (CreditNotes),
  "Customers": () => (Customers_Customers),
  "Disputes": () => (Disputes_Disputes),
  "EphemeralKeys": () => (EphemeralKeys),
  "Events": () => (Events),
  "ExchangeRates": () => (ExchangeRates),
  "FileLinks": () => (FileLinks),
  "Files": () => (Files),
  "FinancialConnections": () => (FinancialConnections),
  "Identity": () => (Identity),
  "InvoiceItems": () => (InvoiceItems),
  "Invoices": () => (Invoices),
  "Issuing": () => (Issuing),
  "Mandates": () => (Mandates),
  "OAuth": () => (OAuth),
  "PaymentIntents": () => (PaymentIntents),
  "PaymentLinks": () => (PaymentLinks),
  "PaymentMethods": () => (PaymentMethods),
  "Payouts": () => (Payouts),
  "Plans": () => (Plans),
  "Prices": () => (Prices),
  "Products": () => (Products),
  "PromotionCodes": () => (PromotionCodes),
  "Quotes": () => (Quotes),
  "Radar": () => (Radar),
  "Refunds": () => (Refunds_Refunds),
  "Reporting": () => (Reporting),
  "Reviews": () => (Reviews),
  "SetupAttempts": () => (SetupAttempts),
  "SetupIntents": () => (SetupIntents),
  "ShippingRates": () => (ShippingRates),
  "Sigma": () => (Sigma),
  "Sources": () => (Sources),
  "SubscriptionItems": () => (SubscriptionItems),
  "SubscriptionSchedules": () => (SubscriptionSchedules),
  "Subscriptions": () => (Subscriptions),
  "Tax": () => (Tax),
  "TaxCodes": () => (TaxCodes),
  "TaxRates": () => (TaxRates),
  "Terminal": () => (Terminal),
  "TestHelpers": () => (TestHelpers),
  "Tokens": () => (Tokens),
  "Topups": () => (Topups),
  "Transfers": () => (Transfers),
  "Treasury": () => (Treasury),
  "WebhookEndpoints": () => (WebhookEndpoints)
});

// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6113);
// EXTERNAL MODULE: external "events"
var external_events_ = __webpack_require__(2361);
;// CONCATENATED MODULE: ./node_modules/stripe/esm/crypto/CryptoProvider.js
/**
 * Interface encapsulating the various crypto computations used by the library,
 * allowing pluggable underlying crypto implementations.
 */
class CryptoProvider {
    /**
     * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
     * The output HMAC should be encoded in hexadecimal.
     *
     * Sample values for implementations:
     * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
     * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
     */
    computeHMACSignature(payload, secret) {
        throw new Error('computeHMACSignature not implemented.');
    }
    /**
     * Asynchronous version of `computeHMACSignature`. Some implementations may
     * only allow support async signature computation.
     *
     * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
     * The output HMAC should be encoded in hexadecimal.
     *
     * Sample values for implementations:
     * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
     * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
     */
    computeHMACSignatureAsync(payload, secret) {
        throw new Error('computeHMACSignatureAsync not implemented.');
    }
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/crypto/NodeCryptoProvider.js


/**
 * `CryptoProvider which uses the Node `crypto` package for its computations.
 */
class NodeCryptoProvider extends CryptoProvider {
    /** @override */
    computeHMACSignature(payload, secret) {
        return external_crypto_.createHmac('sha256', secret)
            .update(payload, 'utf8')
            .digest('hex');
    }
    /** @override */
    async computeHMACSignatureAsync(payload, secret) {
        const signature = await this.computeHMACSignature(payload, secret);
        return signature;
    }
}

// EXTERNAL MODULE: external "http"
var external_http_ = __webpack_require__(3685);
var external_http_namespaceObject = /*#__PURE__*/__webpack_require__.t(external_http_, 2);
// EXTERNAL MODULE: external "https"
var external_https_ = __webpack_require__(5687);
var external_https_namespaceObject = /*#__PURE__*/__webpack_require__.t(external_https_, 2);
;// CONCATENATED MODULE: ./node_modules/stripe/esm/net/HttpClient.js
/**
 * Encapsulates the logic for issuing a request to the Stripe API.
 *
 * A custom HTTP client should should implement:
 * 1. A response class which extends HttpClientResponse and wraps around their
 *    own internal representation of a response.
 * 2. A client class which extends HttpClient and implements all methods,
 *    returning their own response class when making requests.
 */
class HttpClient {
    /** The client name used for diagnostics. */
    getClientName() {
        throw new Error('getClientName not implemented.');
    }
    makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        throw new Error('makeRequest not implemented.');
    }
    /** Helper to make a consistent timeout error across implementations. */
    static makeTimeoutError() {
        const timeoutErr = new TypeError(HttpClient.TIMEOUT_ERROR_CODE);
        timeoutErr.code = HttpClient.TIMEOUT_ERROR_CODE;
        return timeoutErr;
    }
}
// Public API accessible via Stripe.HttpClient
HttpClient.CONNECTION_CLOSED_ERROR_CODES = ['ECONNRESET', 'EPIPE'];
HttpClient.TIMEOUT_ERROR_CODE = 'ETIMEDOUT';
class HttpClientResponse {
    constructor(statusCode, headers) {
        this._statusCode = statusCode;
        this._headers = headers;
    }
    getStatusCode() {
        return this._statusCode;
    }
    getHeaders() {
        return this._headers;
    }
    getRawResponse() {
        throw new Error('getRawResponse not implemented.');
    }
    toStream(streamCompleteCallback) {
        throw new Error('toStream not implemented.');
    }
    toJSON() {
        throw new Error('toJSON not implemented.');
    }
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/net/NodeHttpClient.js



const defaultHttpAgent = new external_http_.Agent({ keepAlive: true });
const defaultHttpsAgent = new external_https_.Agent({ keepAlive: true });
/**
 * HTTP client which uses the Node `http` and `https` packages to issue
 * requests.`
 */
class NodeHttpClient extends HttpClient {
    constructor(agent) {
        super();
        this._agent = agent;
    }
    /** @override. */
    getClientName() {
        return 'node';
    }
    makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        const isInsecureConnection = protocol === 'http';
        let agent = this._agent;
        if (!agent) {
            agent = isInsecureConnection ? defaultHttpAgent : defaultHttpsAgent;
        }
        const requestPromise = new Promise((resolve, reject) => {
            const req = (isInsecureConnection ? external_http_namespaceObject : external_https_namespaceObject).request({
                host: host,
                port: port,
                path,
                method,
                agent,
                headers,
                ciphers: 'DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5',
            });
            req.setTimeout(timeout, () => {
                req.destroy(HttpClient.makeTimeoutError());
            });
            req.on('response', (res) => {
                resolve(new NodeHttpClientResponse(res));
            });
            req.on('error', (error) => {
                reject(error);
            });
            req.once('socket', (socket) => {
                if (socket.connecting) {
                    socket.once(isInsecureConnection ? 'connect' : 'secureConnect', () => {
                        // Send payload; we're safe:
                        req.write(requestData);
                        req.end();
                    });
                }
                else {
                    // we're already connected
                    req.write(requestData);
                    req.end();
                }
            });
        });
        return requestPromise;
    }
}
class NodeHttpClientResponse extends HttpClientResponse {
    constructor(res) {
        // @ts-ignore
        super(res.statusCode, res.headers || {});
        this._res = res;
    }
    getRawResponse() {
        return this._res;
    }
    toStream(streamCompleteCallback) {
        // The raw response is itself the stream, so we just return that. To be
        // backwards compatible, we should invoke the streamCompleteCallback only
        // once the stream has been fully consumed.
        this._res.once('end', () => streamCompleteCallback());
        return this._res;
    }
    toJSON() {
        return new Promise((resolve, reject) => {
            let response = '';
            this._res.setEncoding('utf8');
            this._res.on('data', (chunk) => {
                response += chunk;
            });
            this._res.once('end', () => {
                try {
                    resolve(JSON.parse(response));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/net/FetchHttpClient.js

/**
 * HTTP client which uses a `fetch` function to issue requests.
 *
 * By default relies on the global `fetch` function, but an optional function
 * can be passed in. If passing in a function, it is expected to match the Web
 * Fetch API. As an example, this could be the function provided by the
 * node-fetch package (https://github.com/node-fetch/node-fetch).
 */
class FetchHttpClient extends HttpClient {
    constructor(fetchFn) {
        super();
        this._fetchFn = fetchFn;
    }
    /** @override. */
    getClientName() {
        return 'fetch';
    }
    makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        const isInsecureConnection = protocol === 'http';
        const url = new URL(path, `${isInsecureConnection ? 'http' : 'https'}://${host}`);
        url.port = port;
        // For methods which expect payloads, we should always pass a body value
        // even when it is empty. Without this, some JS runtimes (eg. Deno) will
        // inject a second Content-Length header. See https://github.com/stripe/stripe-node/issues/1519
        // for more details.
        const methodHasPayload = method == 'POST' || method == 'PUT' || method == 'PATCH';
        const body = requestData || (methodHasPayload ? '' : undefined);
        const fetchFn = this._fetchFn || fetch;
        const fetchPromise = fetchFn(url.toString(), {
            method,
            // @ts-ignore
            headers,
            // @ts-ignore
            body,
        });
        // The Fetch API does not support passing in a timeout natively, so a
        // timeout promise is constructed to race against the fetch and preempt the
        // request, simulating a timeout.
        //
        // This timeout behavior differs from Node:
        // - Fetch uses a single timeout for the entire length of the request.
        // - Node is more fine-grained and resets the timeout after each stage of
        //   the request.
        //
        // As an example, if the timeout is set to 30s and the connection takes 20s
        // to be established followed by 20s for the body, Fetch would timeout but
        // Node would not. The more fine-grained timeout cannot be implemented with
        // fetch.
        let pendingTimeoutId;
        const timeoutPromise = new Promise((_, reject) => {
            pendingTimeoutId = setTimeout(() => {
                pendingTimeoutId = null;
                reject(HttpClient.makeTimeoutError());
            }, timeout);
        });
        return Promise.race([fetchPromise, timeoutPromise])
            .then((res) => {
            return new FetchHttpClientResponse(res);
        })
            .finally(() => {
            if (pendingTimeoutId) {
                clearTimeout(pendingTimeoutId);
            }
        });
    }
}
class FetchHttpClientResponse extends HttpClientResponse {
    constructor(res) {
        super(res.status, FetchHttpClientResponse._transformHeadersToObject(res.headers));
        this._res = res;
    }
    getRawResponse() {
        return this._res;
    }
    toStream(streamCompleteCallback) {
        // Unfortunately `fetch` does not have event handlers for when the stream is
        // completely read. We therefore invoke the streamCompleteCallback right
        // away. This callback emits a response event with metadata and completes
        // metrics, so it's ok to do this without waiting for the stream to be
        // completely read.
        streamCompleteCallback();
        // Fetch's `body` property is expected to be a readable stream of the body.
        return this._res.body;
    }
    toJSON() {
        return this._res.json();
    }
    static _transformHeadersToObject(headers) {
        // Fetch uses a Headers instance so this must be converted to a barebones
        // JS object to meet the HttpClient interface.
        const headersObj = {};
        for (const entry of headers) {
            if (!Array.isArray(entry) || entry.length != 2) {
                throw new Error('Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object.');
            }
            headersObj[entry[0]] = entry[1];
        }
        return headersObj;
    }
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/crypto/SubtleCryptoProvider.js

/**
 * `CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
 *
 * This only supports asynchronous operations.
 */
class SubtleCryptoProvider extends CryptoProvider {
    constructor(subtleCrypto) {
        super();
        // If no subtle crypto is interface, default to the global namespace. This
        // is to allow custom interfaces (eg. using the Node webcrypto interface in
        // tests).
        this.subtleCrypto = subtleCrypto || crypto.subtle;
    }
    /** @override */
    computeHMACSignature(payload, secret) {
        throw new Error('SubtleCryptoProvider cannot be used in a synchronous context.');
    }
    /** @override */
    async computeHMACSignatureAsync(payload, secret) {
        const encoder = new TextEncoder();
        const key = await this.subtleCrypto.importKey('raw', encoder.encode(secret), {
            name: 'HMAC',
            hash: { name: 'SHA-256' },
        }, false, ['sign']);
        const signatureBuffer = await this.subtleCrypto.sign('hmac', key, encoder.encode(payload));
        // crypto.subtle returns the signature in base64 format. This must be
        // encoded in hex to match the CryptoProvider contract. We map each byte in
        // the buffer to its corresponding hex octet and then combine into a string.
        const signatureBytes = new Uint8Array(signatureBuffer);
        const signatureHexCodes = new Array(signatureBytes.length);
        for (let i = 0; i < signatureBytes.length; i++) {
            signatureHexCodes[i] = byteHexMapping[signatureBytes[i]];
        }
        return signatureHexCodes.join('');
    }
}
// Cached mapping of byte to hex representation. We do this once to avoid re-
// computing every time we need to convert the result of a signature to hex.
const byteHexMapping = new Array(256);
for (let i = 0; i < byteHexMapping.length; i++) {
    byteHexMapping[i] = i.toString(16).padStart(2, '0');
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/platform/PlatformFunctions.js


/**
 * Interface encapsulating various utility functions whose
 * implementations depend on the platform / JS runtime.
 */
class PlatformFunctions {
    constructor() {
        this._fetchFn = null;
        this._agent = null;
    }
    /**
     * Gets uname with Node's built-in `exec` function, if available.
     */
    getUname() {
        throw new Error('getUname not implemented.');
    }
    /**
     * Generates a v4 UUID. See https://stackoverflow.com/a/2117523
     */
    uuid4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    /**
     * Compares strings in constant time.
     */
    secureCompare(a, b) {
        // return early here if buffer lengths are not equal
        if (a.length !== b.length) {
            return false;
        }
        const len = a.length;
        let result = 0;
        for (let i = 0; i < len; ++i) {
            result |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return result === 0;
    }
    /**
     * Creates an event emitter.
     */
    createEmitter() {
        throw new Error('createEmitter not implemented.');
    }
    /**
     * Checks if the request data is a stream. If so, read the entire stream
     * to a buffer and return the buffer.
     */
    tryBufferData(data) {
        throw new Error('tryBufferData not implemented.');
    }
    /**
     * Creates an HTTP client which uses the Node `http` and `https` packages
     * to issue requests.
     */
    createNodeHttpClient(agent) {
        throw new Error('createNodeHttpClient not implemented.');
    }
    /**
     * Creates an HTTP client for issuing Stripe API requests which uses the Web
     * Fetch API.
     *
     * A fetch function can optionally be passed in as a parameter. If none is
     * passed, will default to the default `fetch` function in the global scope.
     */
    createFetchHttpClient(fetchFn) {
        return new FetchHttpClient(fetchFn);
    }
    /**
     * Creates an HTTP client using runtime-specific APIs.
     */
    createDefaultHttpClient() {
        throw new Error('createDefaultHttpClient not implemented.');
    }
    /**
     * Creates a CryptoProvider which uses the Node `crypto` package for its computations.
     */
    createNodeCryptoProvider() {
        throw new Error('createNodeCryptoProvider not implemented.');
    }
    /**
     * Creates a CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
     */
    createSubtleCryptoProvider(subtleCrypto) {
        return new SubtleCryptoProvider(subtleCrypto);
    }
    createDefaultCryptoProvider() {
        throw new Error('createDefaultCryptoProvider not implemented.');
    }
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/Error.js
/* eslint-disable camelcase */
const generate = (rawStripeError) => {
    switch (rawStripeError.type) {
        case 'card_error':
            return new StripeCardError(rawStripeError);
        case 'invalid_request_error':
            return new StripeInvalidRequestError(rawStripeError);
        case 'api_error':
            return new StripeAPIError(rawStripeError);
        case 'authentication_error':
            return new StripeAuthenticationError(rawStripeError);
        case 'rate_limit_error':
            return new StripeRateLimitError(rawStripeError);
        case 'idempotency_error':
            return new StripeIdempotencyError(rawStripeError);
        case 'invalid_grant':
            return new StripeInvalidGrantError(rawStripeError);
        default:
            return new StripeUnknownError(rawStripeError);
    }
};
/**
 * StripeError is the base error from which all other more specific Stripe errors derive.
 * Specifically for errors returned from Stripe's REST API.
 */
class StripeError extends Error {
    constructor(raw = {}) {
        super(raw.message);
        this.type = this.constructor.name;
        this.raw = raw;
        this.rawType = raw.type;
        this.code = raw.code;
        this.doc_url = raw.doc_url;
        this.param = raw.param;
        this.detail = raw.detail;
        this.headers = raw.headers;
        this.requestId = raw.requestId;
        this.statusCode = raw.statusCode;
        // @ts-ignore
        this.message = raw.message;
        this.charge = raw.charge;
        this.decline_code = raw.decline_code;
        this.payment_intent = raw.payment_intent;
        this.payment_method = raw.payment_method;
        this.payment_method_type = raw.payment_method_type;
        this.setup_intent = raw.setup_intent;
        this.source = raw.source;
    }
}
/**
 * Helper factory which takes raw stripe errors and outputs wrapping instances
 */
StripeError.generate = generate;
// Specific Stripe Error types:
/**
 * CardError is raised when a user enters a card that can't be charged for
 * some reason.
 */
class StripeCardError extends StripeError {
}
/**
 * InvalidRequestError is raised when a request is initiated with invalid
 * parameters.
 */
class StripeInvalidRequestError extends StripeError {
}
/**
 * APIError is a generic error that may be raised in cases where none of the
 * other named errors cover the problem. It could also be raised in the case
 * that a new error has been introduced in the API, but this version of the
 * Node.JS SDK doesn't know how to handle it.
 */
class StripeAPIError extends StripeError {
}
/**
 * AuthenticationError is raised when invalid credentials are used to connect
 * to Stripe's servers.
 */
class StripeAuthenticationError extends StripeError {
}
/**
 * PermissionError is raised in cases where access was attempted on a resource
 * that wasn't allowed.
 */
class StripePermissionError extends StripeError {
}
/**
 * RateLimitError is raised in cases where an account is putting too much load
 * on Stripe's API servers (usually by performing too many requests). Please
 * back off on request rate.
 */
class StripeRateLimitError extends StripeError {
}
/**
 * StripeConnectionError is raised in the event that the SDK can't connect to
 * Stripe's servers. That can be for a variety of different reasons from a
 * downed network to a bad TLS certificate.
 */
class StripeConnectionError extends StripeError {
}
/**
 * SignatureVerificationError is raised when the signature verification for a
 * webhook fails
 */
class StripeSignatureVerificationError extends StripeError {
    constructor(header, payload, raw = {}) {
        super(raw);
        this.header = header;
        this.payload = payload;
    }
}
/**
 * IdempotencyError is raised in cases where an idempotency key was used
 * improperly.
 */
class StripeIdempotencyError extends StripeError {
}
/**
 * InvalidGrantError is raised when a specified code doesn't exist, is
 * expired, has been used, or doesn't belong to you; a refresh token doesn't
 * exist, or doesn't belong to you; or if an API key's mode (live or test)
 * doesn't match the mode of a code or refresh token.
 */
class StripeInvalidGrantError extends StripeError {
}
/**
 * Any other error from Stripe not specifically captured above
 */
class StripeUnknownError extends StripeError {
}

// EXTERNAL MODULE: external "qs"
var external_qs_ = __webpack_require__(7104);
;// CONCATENATED MODULE: ./node_modules/stripe/esm/utils.js

const OPTIONS_KEYS = [
    'apiKey',
    'idempotencyKey',
    'stripeAccount',
    'apiVersion',
    'maxNetworkRetries',
    'timeout',
    'host',
];
function isOptionsHash(o) {
    return (o &&
        typeof o === 'object' &&
        OPTIONS_KEYS.some((prop) => Object.prototype.hasOwnProperty.call(o, prop)));
}
/**
 * Stringifies an Object, accommodating nested objects
 * (forming the conventional key 'parent[child]=value')
 */
function stringifyRequestData(data) {
    return (external_qs_.stringify(data, {
        serializeDate: (d) => Math.floor(d.getTime() / 1000).toString(),
    })
        // Don't use strict form encoding by changing the square bracket control
        // characters back to their literals. This is fine by the server, and
        // makes these parameter strings easier to read.
        .replace(/%5B/g, '[')
        .replace(/%5D/g, ']'));
}
/**
 * Outputs a new function with interpolated object property values.
 * Use like so:
 *   const fn = makeURLInterpolator('some/url/{param1}/{param2}');
 *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
 */
const makeURLInterpolator = (() => {
    const rc = {
        '\n': '\\n',
        '"': '\\"',
        '\u2028': '\\u2028',
        '\u2029': '\\u2029',
    };
    return (str) => {
        const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0]);
        return (outputs) => {
            return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) => 
            // @ts-ignore
            encodeURIComponent(outputs[$1] || ''));
        };
    };
})();
function extractUrlParams(path) {
    const params = path.match(/\{\w+\}/g);
    if (!params) {
        return [];
    }
    return params.map((param) => param.replace(/[{}]/g, ''));
}
/**
 * Return the data argument from a list of arguments
 *
 * @param {object[]} args
 * @returns {object}
 */
function getDataFromArgs(args) {
    if (!Array.isArray(args) || !args[0] || typeof args[0] !== 'object') {
        return {};
    }
    if (!isOptionsHash(args[0])) {
        return args.shift();
    }
    const argKeys = Object.keys(args[0]);
    const optionKeysInArgs = argKeys.filter((key) => OPTIONS_KEYS.includes(key));
    // In some cases options may be the provided as the first argument.
    // Here we're detecting a case where there are two distinct arguments
    // (the first being args and the second options) and with known
    // option keys in the first so that we can warn the user about it.
    if (optionKeysInArgs.length > 0 &&
        optionKeysInArgs.length !== argKeys.length) {
        emitWarning(`Options found in arguments (${optionKeysInArgs.join(', ')}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`);
    }
    return {};
}
/**
 * Return the options hash from a list of arguments
 */
function getOptionsFromArgs(args) {
    const opts = {
        auth: null,
        host: null,
        headers: {},
        settings: {},
    };
    if (args.length > 0) {
        const arg = args[args.length - 1];
        if (typeof arg === 'string') {
            opts.auth = args.pop();
        }
        else if (isOptionsHash(arg)) {
            const params = Object.assign({}, args.pop());
            const extraKeys = Object.keys(params).filter((key) => !OPTIONS_KEYS.includes(key));
            if (extraKeys.length) {
                emitWarning(`Invalid options found (${extraKeys.join(', ')}); ignoring.`);
            }
            if (params.apiKey) {
                opts.auth = params.apiKey;
            }
            if (params.idempotencyKey) {
                opts.headers['Idempotency-Key'] = params.idempotencyKey;
            }
            if (params.stripeAccount) {
                opts.headers['Stripe-Account'] = params.stripeAccount;
            }
            if (params.apiVersion) {
                opts.headers['Stripe-Version'] = params.apiVersion;
            }
            if (Number.isInteger(params.maxNetworkRetries)) {
                opts.settings.maxNetworkRetries = params.maxNetworkRetries;
            }
            if (Number.isInteger(params.timeout)) {
                opts.settings.timeout = params.timeout;
            }
            if (params.host) {
                opts.host = params.host;
            }
        }
    }
    return opts;
}
/**
 * Provide simple "Class" extension mechanism.
 * <!-- Public API accessible via Stripe.StripeResource.extend -->
 */
function protoExtend(sub) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const Super = this;
    const Constructor = Object.prototype.hasOwnProperty.call(sub, 'constructor')
        ? sub.constructor
        : function (...args) {
            Super.apply(this, args);
        };
    // This initialization logic is somewhat sensitive to be compatible with
    // divergent JS implementations like the one found in Qt. See here for more
    // context:
    //
    // https://github.com/stripe/stripe-node/pull/334
    Object.assign(Constructor, Super);
    Constructor.prototype = Object.create(Super.prototype);
    Object.assign(Constructor.prototype, sub);
    return Constructor;
}
/**
 * Remove empty values from an object
 */
function removeNullish(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Argument must be an object');
    }
    return Object.keys(obj).reduce((result, key) => {
        if (obj[key] != null) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}
/**
 * Normalize standard HTTP Headers:
 * {'foo-bar': 'hi'}
 * becomes
 * {'Foo-Bar': 'hi'}
 */
function normalizeHeaders(obj) {
    if (!(obj && typeof obj === 'object')) {
        return obj;
    }
    return Object.keys(obj).reduce((result, header) => {
        result[normalizeHeader(header)] = obj[header];
        return result;
    }, {});
}
/**
 * Stolen from https://github.com/marten-de-vries/header-case-normalizer/blob/master/index.js#L36-L41
 * without the exceptions which are irrelevant to us.
 */
function normalizeHeader(header) {
    return header
        .split('-')
        .map((text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase())
        .join('-');
}
function callbackifyPromiseWithTimeout(promise, callback) {
    if (callback) {
        // Ensure callback is called outside of promise stack.
        return promise.then((res) => {
            setTimeout(() => {
                callback(null, res);
            }, 0);
        }, (err) => {
            setTimeout(() => {
                callback(err, null);
            }, 0);
        });
    }
    return promise;
}
/**
 * Allow for special capitalization cases (such as OAuth)
 */
function pascalToCamelCase(name) {
    if (name === 'OAuth') {
        return 'oauth';
    }
    else {
        return name[0].toLowerCase() + name.substring(1);
    }
}
function emitWarning(warning) {
    if (typeof process.emitWarning !== 'function') {
        return console.warn(`Stripe: ${warning}`); /* eslint-disable-line no-console */
    }
    return process.emitWarning(warning, 'Stripe');
}
function isObject(obj) {
    const type = typeof obj;
    return (type === 'function' || type === 'object') && !!obj;
}
// For use in multipart requests
function flattenAndStringify(data) {
    const result = {};
    const step = (obj, prevKey) => {
        Object.keys(obj).forEach((key) => {
            // @ts-ignore
            const value = obj[key];
            const newKey = prevKey ? `${prevKey}[${key}]` : key;
            if (isObject(value)) {
                if (!(value instanceof Uint8Array) &&
                    !Object.prototype.hasOwnProperty.call(value, 'data')) {
                    // Non-buffer non-file Objects are recursively flattened
                    return step(value, newKey);
                }
                else {
                    // Buffers and file objects are stored without modification
                    result[newKey] = value;
                }
            }
            else {
                // Primitives are converted to strings
                result[newKey] = String(value);
            }
        });
    };
    step(data, null);
    return result;
}
function validateInteger(name, n, defaultVal) {
    if (!Number.isInteger(n)) {
        if (defaultVal !== undefined) {
            return defaultVal;
        }
        else {
            throw new Error(`${name} must be an integer`);
        }
    }
    return n;
}
function determineProcessUserAgentProperties() {
    return typeof process === 'undefined'
        ? {}
        : {
            lang_version: process.version,
            platform: process.platform,
        };
}
/**
 * Joins an array of Uint8Arrays into a single Uint8Array
 */
function concat(arrays) {
    const totalLength = arrays.reduce((len, array) => len + array.length, 0);
    const merged = new Uint8Array(totalLength);
    let offset = 0;
    arrays.forEach((array) => {
        merged.set(array, offset);
        offset += array.length;
    });
    return merged;
}

// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(2081);
;// CONCATENATED MODULE: ./node_modules/stripe/esm/platform/NodePlatformFunctions.js








class StreamProcessingError extends StripeError {
}
/**
 * Specializes WebPlatformFunctions using APIs available in Node.js.
 */
class NodePlatformFunctions extends PlatformFunctions {
    constructor() {
        super();
        this._exec = external_child_process_.exec;
        this._UNAME_CACHE = null;
    }
    /** @override */
    uuid4() {
        // available in: v14.17.x+
        if (external_crypto_.randomUUID) {
            return external_crypto_.randomUUID();
        }
        return super.uuid4();
    }
    /**
     * @override
     * Node's built in `exec` function sometimes throws outright,
     * and sometimes has a callback with an error,
     * depending on the type of error.
     *
     * This unifies that interface by resolving with a null uname
     * if an error is encountered.
     */
    getUname() {
        if (!this._UNAME_CACHE) {
            this._UNAME_CACHE = new Promise((resolve, reject) => {
                try {
                    this._exec('uname -a', (err, uname) => {
                        if (err) {
                            return resolve(null);
                        }
                        resolve(uname);
                    });
                }
                catch (e) {
                    resolve(null);
                }
            });
        }
        return this._UNAME_CACHE;
    }
    /**
     * @override
     * Secure compare, from https://github.com/freewil/scmp
     */
    secureCompare(a, b) {
        if (!a || !b) {
            throw new Error('secureCompare must receive two arguments');
        }
        // return early here if buffer lengths are not equal since timingSafeEqual
        // will throw if buffer lengths are not equal
        if (a.length !== b.length) {
            return false;
        }
        // use crypto.timingSafeEqual if available (since Node.js v6.6.0),
        // otherwise use our own scmp-internal function.
        if (external_crypto_.timingSafeEqual) {
            const textEncoder = new TextEncoder();
            const aEncoded = textEncoder.encode(a);
            const bEncoded = textEncoder.encode(b);
            return external_crypto_.timingSafeEqual(aEncoded, bEncoded);
        }
        return super.secureCompare(a, b);
    }
    createEmitter() {
        return new external_events_.EventEmitter();
    }
    /** @override */
    tryBufferData(data) {
        if (!(data.file.data instanceof external_events_.EventEmitter)) {
            return Promise.resolve(data);
        }
        const bufferArray = [];
        return new Promise((resolve, reject) => {
            data.file.data
                .on('data', (line) => {
                bufferArray.push(line);
            })
                .once('end', () => {
                // @ts-ignore
                const bufferData = Object.assign({}, data);
                bufferData.file.data = concat(bufferArray);
                resolve(bufferData);
            })
                .on('error', (err) => {
                reject(new StreamProcessingError({
                    message: 'An error occurred while attempting to process the file for upload.',
                    detail: err,
                }));
            });
        });
    }
    /** @override */
    createNodeHttpClient(agent) {
        return new NodeHttpClient(agent);
    }
    /** @override */
    createDefaultHttpClient() {
        return new NodeHttpClient();
    }
    /** @override */
    createNodeCryptoProvider() {
        return new NodeCryptoProvider();
    }
    /** @override */
    createDefaultCryptoProvider() {
        return this.createNodeCryptoProvider();
    }
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/apiVersion.js
// File generated from our OpenAPI spec
const ApiVersion = '2022-11-15';

;// CONCATENATED MODULE: ./node_modules/stripe/esm/ResourceNamespace.js
// ResourceNamespace allows you to create nested resources, i.e. `stripe.issuing.cards`.
// It also works recursively, so you could do i.e. `stripe.billing.invoicing.pay`.
function ResourceNamespace(stripe, resources) {
    for (const name in resources) {
        const camelCaseName = name[0].toLowerCase() + name.substring(1);
        const resource = new resources[name](stripe);
        this[camelCaseName] = resource;
    }
}
function resourceNamespace(namespace, resources) {
    return function (stripe) {
        return new ResourceNamespace(stripe, resources);
    };
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/autoPagination.js

class StripeIterator {
    constructor(firstPagePromise, requestArgs, spec, stripeResource) {
        this.index = 0;
        this.pagePromise = firstPagePromise;
        this.promiseCache = { currentPromise: null };
        this.requestArgs = requestArgs;
        this.spec = spec;
        this.stripeResource = stripeResource;
    }
    async iterate(pageResult) {
        if (!(pageResult &&
            pageResult.data &&
            typeof pageResult.data.length === 'number')) {
            throw Error('Unexpected: Stripe API response does not have a well-formed `data` array.');
        }
        const reverseIteration = isReverseIteration(this.requestArgs);
        if (this.index < pageResult.data.length) {
            const idx = reverseIteration
                ? pageResult.data.length - 1 - this.index
                : this.index;
            const value = pageResult.data[idx];
            this.index += 1;
            return { value, done: false };
        }
        else if (pageResult.has_more) {
            // Reset counter, request next page, and recurse.
            this.index = 0;
            this.pagePromise = this.getNextPage(pageResult);
            const nextPageResult = await this.pagePromise;
            return this.iterate(nextPageResult);
        }
        return { done: true, value: undefined };
    }
    /** @abstract */
    getNextPage(_pageResult) {
        throw new Error('Unimplemented');
    }
    async _next() {
        return this.iterate(await this.pagePromise);
    }
    next() {
        /**
         * If a user calls `.next()` multiple times in parallel,
         * return the same result until something has resolved
         * to prevent page-turning race conditions.
         */
        if (this.promiseCache.currentPromise) {
            return this.promiseCache.currentPromise;
        }
        const nextPromise = (async () => {
            const ret = await this._next();
            this.promiseCache.currentPromise = null;
            return ret;
        })();
        this.promiseCache.currentPromise = nextPromise;
        return nextPromise;
    }
}
class ListIterator extends StripeIterator {
    getNextPage(pageResult) {
        const reverseIteration = isReverseIteration(this.requestArgs);
        const lastId = getLastId(pageResult, reverseIteration);
        return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
            [reverseIteration ? 'ending_before' : 'starting_after']: lastId,
        });
    }
}
class SearchIterator extends StripeIterator {
    getNextPage(pageResult) {
        if (!pageResult.next_page) {
            throw Error('Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true.');
        }
        return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
            page: pageResult.next_page,
        });
    }
}
const makeAutoPaginationMethods = (stripeResource, requestArgs, spec, firstPagePromise) => {
    if (spec.methodType === 'search') {
        return makeAutoPaginationMethodsFromIterator(new SearchIterator(firstPagePromise, requestArgs, spec, stripeResource));
    }
    if (spec.methodType === 'list') {
        return makeAutoPaginationMethodsFromIterator(new ListIterator(firstPagePromise, requestArgs, spec, stripeResource));
    }
    return null;
};
const makeAutoPaginationMethodsFromIterator = (iterator) => {
    const autoPagingEach = makeAutoPagingEach((...args) => iterator.next(...args));
    const autoPagingToArray = makeAutoPagingToArray(autoPagingEach);
    const autoPaginationMethods = {
        autoPagingEach,
        autoPagingToArray,
        // Async iterator functions:
        next: () => iterator.next(),
        return: () => {
            // This is required for `break`.
            return {};
        },
        [getAsyncIteratorSymbol()]: () => {
            return autoPaginationMethods;
        },
    };
    return autoPaginationMethods;
};
/**
 * ----------------
 * Private Helpers:
 * ----------------
 */
function getAsyncIteratorSymbol() {
    if (typeof Symbol !== 'undefined' && Symbol.asyncIterator) {
        return Symbol.asyncIterator;
    }
    // Follow the convention from libraries like iterall: https://github.com/leebyron/iterall#asynciterator-1
    return '@@asyncIterator';
}
function getDoneCallback(args) {
    if (args.length < 2) {
        return null;
    }
    const onDone = args[1];
    if (typeof onDone !== 'function') {
        throw Error(`The second argument to autoPagingEach, if present, must be a callback function; received ${typeof onDone}`);
    }
    return onDone;
}
/**
 * We allow four forms of the `onItem` callback (the middle two being equivalent),
 *
 *   1. `.autoPagingEach((item) => { doSomething(item); return false; });`
 *   2. `.autoPagingEach(async (item) => { await doSomething(item); return false; });`
 *   3. `.autoPagingEach((item) => doSomething(item).then(() => false));`
 *   4. `.autoPagingEach((item, next) => { doSomething(item); next(false); });`
 *
 * In addition to standard validation, this helper
 * coalesces the former forms into the latter form.
 */
function getItemCallback(args) {
    if (args.length === 0) {
        return undefined;
    }
    const onItem = args[0];
    if (typeof onItem !== 'function') {
        throw Error(`The first argument to autoPagingEach, if present, must be a callback function; received ${typeof onItem}`);
    }
    // 4. `.autoPagingEach((item, next) => { doSomething(item); next(false); });`
    if (onItem.length === 2) {
        return onItem;
    }
    if (onItem.length > 2) {
        throw Error(`The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${onItem}`);
    }
    // This magically handles all three of these usecases (the latter two being functionally identical):
    // 1. `.autoPagingEach((item) => { doSomething(item); return false; });`
    // 2. `.autoPagingEach(async (item) => { await doSomething(item); return false; });`
    // 3. `.autoPagingEach((item) => doSomething(item).then(() => false));`
    return function _onItem(item, next) {
        const shouldContinue = onItem(item);
        next(shouldContinue);
    };
}
function getLastId(listResult, reverseIteration) {
    const lastIdx = reverseIteration ? 0 : listResult.data.length - 1;
    const lastItem = listResult.data[lastIdx];
    const lastId = lastItem && lastItem.id;
    if (!lastId) {
        throw Error('Unexpected: No `id` found on the last item while auto-paging a list.');
    }
    return lastId;
}
function makeAutoPagingEach(asyncIteratorNext) {
    return function autoPagingEach( /* onItem?, onDone? */) {
        const args = [].slice.call(arguments);
        const onItem = getItemCallback(args);
        const onDone = getDoneCallback(args);
        if (args.length > 2) {
            throw Error(`autoPagingEach takes up to two arguments; received ${args}`);
        }
        const autoPagePromise = wrapAsyncIteratorWithCallback(asyncIteratorNext, 
        // @ts-ignore we might need a null check
        onItem);
        return callbackifyPromiseWithTimeout(autoPagePromise, onDone);
    };
}
function makeAutoPagingToArray(autoPagingEach) {
    return function autoPagingToArray(opts, onDone) {
        const limit = opts && opts.limit;
        if (!limit) {
            throw Error('You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.');
        }
        if (limit > 10000) {
            throw Error('You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.');
        }
        const promise = new Promise((resolve, reject) => {
            const items = [];
            autoPagingEach((item) => {
                items.push(item);
                if (items.length >= limit) {
                    return false;
                }
            })
                .then(() => {
                resolve(items);
            })
                .catch(reject);
        });
        // @ts-ignore
        return callbackifyPromiseWithTimeout(promise, onDone);
    };
}
function wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem) {
    return new Promise((resolve, reject) => {
        function handleIteration(iterResult) {
            if (iterResult.done) {
                resolve();
                return;
            }
            const item = iterResult.value;
            return new Promise((next) => {
                // Bit confusing, perhaps; we pass a `resolve` fn
                // to the user, so they can decide when and if to continue.
                // They can return false, or a promise which resolves to false, to break.
                onItem(item, next);
            }).then((shouldContinue) => {
                if (shouldContinue === false) {
                    return handleIteration({ done: true, value: undefined });
                }
                else {
                    return asyncIteratorNext().then(handleIteration);
                }
            });
        }
        asyncIteratorNext()
            .then(handleIteration)
            .catch(reject);
    });
}
function isReverseIteration(requestArgs) {
    const args = [].slice.call(requestArgs);
    const dataFromArgs = getDataFromArgs(args);
    return !!dataFromArgs.ending_before;
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/StripeMethod.js


/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with
 *  the instance's path (e.g. 'charges' or 'customers')
 * @param [spec.fullPath=''] Fully qualified path to the method (eg. /v1/a/b/c).
 *  If this is specified, path should not be specified.
 * @param [spec.urlParams=[]] Array of required arguments in the order that they
 *  must be passed by the consumer of the API. Subsequent optional arguments are
 *  optionally passed through a hash (Object) as the penultimate argument
 *  (preceding the also-optional callback argument
 * @param [spec.encode] Function for mutating input parameters to a method.
 *  Usefully for applying transforms to data on a per-method basis.
 * @param [spec.host] Hostname for the request.
 *
 * <!-- Public API accessible via Stripe.StripeResource.method -->
 */
function stripeMethod(spec) {
    if (spec.path !== undefined && spec.fullPath !== undefined) {
        throw new Error(`Method spec specified both a 'path' (${spec.path}) and a 'fullPath' (${spec.fullPath}).`);
    }
    return function (...args) {
        const callback = typeof args[args.length - 1] == 'function' && args.pop();
        spec.urlParams = extractUrlParams(spec.fullPath || this.createResourcePathWithSymbols(spec.path || ''));
        const requestPromise = callbackifyPromiseWithTimeout(this._makeRequest(args, spec, {}), callback);
        Object.assign(requestPromise, makeAutoPaginationMethods(this, args, spec, requestPromise));
        return requestPromise;
    };
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/StripeResource.js


// Provide extension mechanism for Stripe Resource Sub-Classes
StripeResource.extend = protoExtend;
// Expose method-creator
StripeResource.method = stripeMethod;
StripeResource.MAX_BUFFERED_REQUEST_METRICS = 100;
/**
 * Encapsulates request logic for a Stripe Resource
 */
function StripeResource(stripe, deprecatedUrlData) {
    this._stripe = stripe;
    if (deprecatedUrlData) {
        throw new Error('Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.');
    }
    this.basePath = makeURLInterpolator(
    // @ts-ignore changing type of basePath
    this.basePath || stripe.getApiField('basePath'));
    // @ts-ignore changing type of path
    this.resourcePath = this.path;
    // @ts-ignore changing type of path
    this.path = makeURLInterpolator(this.path);
    this.initialize(...arguments);
}
StripeResource.prototype = {
    _stripe: null,
    // @ts-ignore the type of path changes in ctor
    path: '',
    resourcePath: '',
    // Methods that don't use the API's default '/v1' path can override it with this setting.
    basePath: null,
    initialize() { },
    // Function to override the default data processor. This allows full control
    // over how a StripeResource's request data will get converted into an HTTP
    // body. This is useful for non-standard HTTP requests. The function should
    // take method name, data, and headers as arguments.
    requestDataProcessor: null,
    // Function to add a validation checks before sending the request, errors should
    // be thrown, and they will be passed to the callback/promise.
    validateRequest: null,
    createFullPath(commandPath, urlData) {
        const urlParts = [this.basePath(urlData), this.path(urlData)];
        if (typeof commandPath === 'function') {
            const computedCommandPath = commandPath(urlData);
            // If we have no actual command path, we just omit it to avoid adding a
            // trailing slash. This is important for top-level listing requests, which
            // do not have a command path.
            if (computedCommandPath) {
                urlParts.push(computedCommandPath);
            }
        }
        else {
            urlParts.push(commandPath);
        }
        return this._joinUrlParts(urlParts);
    },
    // Creates a relative resource path with symbols left in (unlike
    // createFullPath which takes some data to replace them with). For example it
    // might produce: /invoices/{id}
    createResourcePathWithSymbols(pathWithSymbols) {
        // If there is no path beyond the resource path, we want to produce just
        // /<resource path> rather than /<resource path>/.
        if (pathWithSymbols) {
            return `/${this._joinUrlParts([this.resourcePath, pathWithSymbols])}`;
        }
        else {
            return `/${this.resourcePath}`;
        }
    },
    _joinUrlParts(parts) {
        // Replace any accidentally doubled up slashes. This previously used
        // path.join, which would do this as well. Unfortunately we need to do this
        // as the functions for creating paths are technically part of the public
        // interface and so we need to preserve backwards compatibility.
        return parts.join('/').replace(/\/{2,}/g, '/');
    },
    _getRequestOpts(requestArgs, spec, overrideData) {
        // Extract spec values with defaults.
        const requestMethod = (spec.method || 'GET').toUpperCase();
        const urlParams = spec.urlParams || [];
        const encode = spec.encode || ((data) => data);
        const isUsingFullPath = !!spec.fullPath;
        const commandPath = makeURLInterpolator(isUsingFullPath ? spec.fullPath : spec.path || '');
        // When using fullPath, we ignore the resource path as it should already be
        // fully qualified.
        const path = isUsingFullPath
            ? spec.fullPath
            : this.createResourcePathWithSymbols(spec.path);
        // Don't mutate args externally.
        const args = [].slice.call(requestArgs);
        // Generate and validate url params.
        const urlData = urlParams.reduce((urlData, param) => {
            const arg = args.shift();
            if (typeof arg !== 'string') {
                throw new Error(`Stripe: Argument "${param}" must be a string, but got: ${arg} (on API request to \`${requestMethod} ${path}\`)`);
            }
            urlData[param] = arg;
            return urlData;
        }, {});
        // Pull request data and options (headers, auth) from args.
        const dataFromArgs = getDataFromArgs(args);
        const data = encode(Object.assign({}, dataFromArgs, overrideData));
        const options = getOptionsFromArgs(args);
        const host = options.host || spec.host;
        const streaming = !!spec.streaming;
        // Validate that there are no more args.
        if (args.filter((x) => x != null).length) {
            throw new Error(`Stripe: Unknown arguments (${args}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${requestMethod} \`${path}\`)`);
        }
        // When using full path, we can just invoke the URL interpolator directly
        // as we don't need to use the resource to create a full path.
        const requestPath = isUsingFullPath
            ? commandPath(urlData)
            : this.createFullPath(commandPath, urlData);
        const headers = Object.assign(options.headers, spec.headers);
        if (spec.validator) {
            spec.validator(data, { headers });
        }
        const dataInQuery = spec.method === 'GET' || spec.method === 'DELETE';
        const bodyData = dataInQuery ? {} : data;
        const queryData = dataInQuery ? data : {};
        return {
            requestMethod,
            requestPath,
            bodyData,
            queryData,
            auth: options.auth,
            headers,
            host: host !== null && host !== void 0 ? host : null,
            streaming,
            settings: options.settings,
        };
    },
    _makeRequest(requestArgs, spec, overrideData) {
        return new Promise((resolve, reject) => {
            var _a;
            let opts;
            try {
                opts = this._getRequestOpts(requestArgs, spec, overrideData);
            }
            catch (err) {
                reject(err);
                return;
            }
            function requestCallback(err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(spec.transformResponseData
                        ? spec.transformResponseData(response)
                        : response);
                }
            }
            const emptyQuery = Object.keys(opts.queryData).length === 0;
            const path = [
                opts.requestPath,
                emptyQuery ? '' : '?',
                stringifyRequestData(opts.queryData),
            ].join('');
            const { headers, settings } = opts;
            this._stripe._requestSender._request(opts.requestMethod, opts.host, path, opts.bodyData, opts.auth, { headers, settings, streaming: opts.streaming }, requestCallback, (_a = this.requestDataProcessor) === null || _a === void 0 ? void 0 : _a.bind(this));
        });
    },
};


;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/FinancialConnections/Accounts.js
// File generated from our OpenAPI spec

const Accounts_stripeMethod = StripeResource.method;
const Accounts = StripeResource.extend({
    retrieve: Accounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/financial_connections/accounts/{account}',
    }),
    list: Accounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/financial_connections/accounts',
        methodType: 'list',
    }),
    disconnect: Accounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/disconnect',
    }),
    listOwners: Accounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/financial_connections/accounts/{account}/owners',
        methodType: 'list',
    }),
    refresh: Accounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/refresh',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Issuing/Authorizations.js
// File generated from our OpenAPI spec

const Authorizations_stripeMethod = StripeResource.method;
const Authorizations = StripeResource.extend({
    retrieve: Authorizations_stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/authorizations/{authorization}',
    }),
    update: Authorizations_stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/authorizations/{authorization}',
    }),
    list: Authorizations_stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/authorizations',
        methodType: 'list',
    }),
    approve: Authorizations_stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/authorizations/{authorization}/approve',
    }),
    decline: Authorizations_stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/authorizations/{authorization}/decline',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Tax/Calculations.js
// File generated from our OpenAPI spec

const Calculations_stripeMethod = StripeResource.method;
const Calculations = StripeResource.extend({
    create: Calculations_stripeMethod({
        method: 'POST',
        fullPath: '/v1/tax/calculations',
    }),
    listLineItems: Calculations_stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax/calculations/{calculation}/line_items',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Issuing/Cardholders.js
// File generated from our OpenAPI spec

const Cardholders_stripeMethod = StripeResource.method;
const Cardholders = StripeResource.extend({
    create: Cardholders_stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/cardholders',
    }),
    retrieve: Cardholders_stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/cardholders/{cardholder}',
    }),
    update: Cardholders_stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/cardholders/{cardholder}',
    }),
    list: Cardholders_stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/cardholders',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/TestHelpers/Issuing/Cards.js
// File generated from our OpenAPI spec

const Cards_stripeMethod = StripeResource.method;
const Cards = StripeResource.extend({
    deliverCard: Cards_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/deliver',
    }),
    failCard: Cards_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/fail',
    }),
    returnCard: Cards_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/return',
    }),
    shipCard: Cards_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/ship',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Issuing/Cards.js
// File generated from our OpenAPI spec

const Issuing_Cards_stripeMethod = StripeResource.method;
const Cards_Cards = StripeResource.extend({
    create: Issuing_Cards_stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/cards',
    }),
    retrieve: Issuing_Cards_stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/cards/{card}',
    }),
    update: Issuing_Cards_stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/cards/{card}',
    }),
    list: Issuing_Cards_stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/cards',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/BillingPortal/Configurations.js
// File generated from our OpenAPI spec

const Configurations_stripeMethod = StripeResource.method;
const Configurations = StripeResource.extend({
    create: Configurations_stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing_portal/configurations',
    }),
    retrieve: Configurations_stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing_portal/configurations/{configuration}',
    }),
    update: Configurations_stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing_portal/configurations/{configuration}',
    }),
    list: Configurations_stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing_portal/configurations',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Terminal/Configurations.js
// File generated from our OpenAPI spec

const Terminal_Configurations_stripeMethod = StripeResource.method;
const Configurations_Configurations = StripeResource.extend({
    create: Terminal_Configurations_stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/configurations',
    }),
    retrieve: Terminal_Configurations_stripeMethod({
        method: 'GET',
        fullPath: '/v1/terminal/configurations/{configuration}',
    }),
    update: Terminal_Configurations_stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/configurations/{configuration}',
    }),
    list: Terminal_Configurations_stripeMethod({
        method: 'GET',
        fullPath: '/v1/terminal/configurations',
        methodType: 'list',
    }),
    del: Terminal_Configurations_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/terminal/configurations/{configuration}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Terminal/ConnectionTokens.js
// File generated from our OpenAPI spec

const ConnectionTokens_stripeMethod = StripeResource.method;
const ConnectionTokens = StripeResource.extend({
    create: ConnectionTokens_stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/connection_tokens',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Treasury/CreditReversals.js
// File generated from our OpenAPI spec

const CreditReversals_stripeMethod = StripeResource.method;
const CreditReversals = StripeResource.extend({
    create: CreditReversals_stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/credit_reversals',
    }),
    retrieve: CreditReversals_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/credit_reversals/{credit_reversal}',
    }),
    list: CreditReversals_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/credit_reversals',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/TestHelpers/Customers.js
// File generated from our OpenAPI spec

const Customers_stripeMethod = StripeResource.method;
const Customers = StripeResource.extend({
    fundCashBalance: Customers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/customers/{customer}/fund_cash_balance',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Treasury/DebitReversals.js
// File generated from our OpenAPI spec

const DebitReversals_stripeMethod = StripeResource.method;
const DebitReversals = StripeResource.extend({
    create: DebitReversals_stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/debit_reversals',
    }),
    retrieve: DebitReversals_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/debit_reversals/{debit_reversal}',
    }),
    list: DebitReversals_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/debit_reversals',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Issuing/Disputes.js
// File generated from our OpenAPI spec

const Disputes_stripeMethod = StripeResource.method;
const Disputes = StripeResource.extend({
    create: Disputes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/disputes',
    }),
    retrieve: Disputes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/disputes/{dispute}',
    }),
    update: Disputes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/disputes/{dispute}',
    }),
    list: Disputes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/disputes',
        methodType: 'list',
    }),
    submit: Disputes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/disputes/{dispute}/submit',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Radar/EarlyFraudWarnings.js
// File generated from our OpenAPI spec

const EarlyFraudWarnings_stripeMethod = StripeResource.method;
const EarlyFraudWarnings = StripeResource.extend({
    retrieve: EarlyFraudWarnings_stripeMethod({
        method: 'GET',
        fullPath: '/v1/radar/early_fraud_warnings/{early_fraud_warning}',
    }),
    list: EarlyFraudWarnings_stripeMethod({
        method: 'GET',
        fullPath: '/v1/radar/early_fraud_warnings',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Treasury/FinancialAccounts.js
// File generated from our OpenAPI spec

const FinancialAccounts_stripeMethod = StripeResource.method;
const FinancialAccounts = StripeResource.extend({
    create: FinancialAccounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts',
    }),
    retrieve: FinancialAccounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}',
    }),
    update: FinancialAccounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}',
    }),
    list: FinancialAccounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/financial_accounts',
        methodType: 'list',
    }),
    retrieveFeatures: FinancialAccounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}/features',
    }),
    updateFeatures: FinancialAccounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}/features',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/TestHelpers/Treasury/InboundTransfers.js
// File generated from our OpenAPI spec

const InboundTransfers_stripeMethod = StripeResource.method;
const InboundTransfers = StripeResource.extend({
    fail: InboundTransfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/inbound_transfers/{id}/fail',
    }),
    returnInboundTransfer: InboundTransfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/inbound_transfers/{id}/return',
    }),
    succeed: InboundTransfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/inbound_transfers/{id}/succeed',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Treasury/InboundTransfers.js
// File generated from our OpenAPI spec

const Treasury_InboundTransfers_stripeMethod = StripeResource.method;
const InboundTransfers_InboundTransfers = StripeResource.extend({
    create: Treasury_InboundTransfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/inbound_transfers',
    }),
    retrieve: Treasury_InboundTransfers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/inbound_transfers/{id}',
    }),
    list: Treasury_InboundTransfers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/inbound_transfers',
        methodType: 'list',
    }),
    cancel: Treasury_InboundTransfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/inbound_transfers/{inbound_transfer}/cancel',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Terminal/Locations.js
// File generated from our OpenAPI spec

const Locations_stripeMethod = StripeResource.method;
const Locations = StripeResource.extend({
    create: Locations_stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/locations',
    }),
    retrieve: Locations_stripeMethod({
        method: 'GET',
        fullPath: '/v1/terminal/locations/{location}',
    }),
    update: Locations_stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/locations/{location}',
    }),
    list: Locations_stripeMethod({
        method: 'GET',
        fullPath: '/v1/terminal/locations',
        methodType: 'list',
    }),
    del: Locations_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/terminal/locations/{location}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundPayments.js
// File generated from our OpenAPI spec

const OutboundPayments_stripeMethod = StripeResource.method;
const OutboundPayments = StripeResource.extend({
    fail: OutboundPayments_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}/fail',
    }),
    post: OutboundPayments_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}/post',
    }),
    returnOutboundPayment: OutboundPayments_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}/return',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Treasury/OutboundPayments.js
// File generated from our OpenAPI spec

const Treasury_OutboundPayments_stripeMethod = StripeResource.method;
const OutboundPayments_OutboundPayments = StripeResource.extend({
    create: Treasury_OutboundPayments_stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_payments',
    }),
    retrieve: Treasury_OutboundPayments_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_payments/{id}',
    }),
    list: Treasury_OutboundPayments_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_payments',
        methodType: 'list',
    }),
    cancel: Treasury_OutboundPayments_stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_payments/{id}/cancel',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundTransfers.js
// File generated from our OpenAPI spec

const OutboundTransfers_stripeMethod = StripeResource.method;
const OutboundTransfers = StripeResource.extend({
    fail: OutboundTransfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail',
    }),
    post: OutboundTransfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post',
    }),
    returnOutboundTransfer: OutboundTransfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Treasury/OutboundTransfers.js
// File generated from our OpenAPI spec

const Treasury_OutboundTransfers_stripeMethod = StripeResource.method;
const OutboundTransfers_OutboundTransfers = StripeResource.extend({
    create: Treasury_OutboundTransfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_transfers',
    }),
    retrieve: Treasury_OutboundTransfers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_transfers/{outbound_transfer}',
    }),
    list: Treasury_OutboundTransfers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_transfers',
        methodType: 'list',
    }),
    cancel: Treasury_OutboundTransfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_transfers/{outbound_transfer}/cancel',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/TestHelpers/Terminal/Readers.js
// File generated from our OpenAPI spec

const Readers_stripeMethod = StripeResource.method;
const Readers = StripeResource.extend({
    presentPaymentMethod: Readers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/terminal/readers/{reader}/present_payment_method',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Terminal/Readers.js
// File generated from our OpenAPI spec

const Terminal_Readers_stripeMethod = StripeResource.method;
const Readers_Readers = StripeResource.extend({
    create: Terminal_Readers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers',
    }),
    retrieve: Terminal_Readers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/terminal/readers/{reader}',
    }),
    update: Terminal_Readers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}',
    }),
    list: Terminal_Readers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/terminal/readers',
        methodType: 'list',
    }),
    del: Terminal_Readers_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/terminal/readers/{reader}',
    }),
    cancelAction: Terminal_Readers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/cancel_action',
    }),
    processPaymentIntent: Terminal_Readers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/process_payment_intent',
    }),
    processSetupIntent: Terminal_Readers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/process_setup_intent',
    }),
    refundPayment: Terminal_Readers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/refund_payment',
    }),
    setReaderDisplay: Terminal_Readers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/set_reader_display',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedCredits.js
// File generated from our OpenAPI spec

const ReceivedCredits_stripeMethod = StripeResource.method;
const ReceivedCredits = StripeResource.extend({
    create: ReceivedCredits_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/received_credits',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Treasury/ReceivedCredits.js
// File generated from our OpenAPI spec

const Treasury_ReceivedCredits_stripeMethod = StripeResource.method;
const ReceivedCredits_ReceivedCredits = StripeResource.extend({
    retrieve: Treasury_ReceivedCredits_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/received_credits/{id}',
    }),
    list: Treasury_ReceivedCredits_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/received_credits',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedDebits.js
// File generated from our OpenAPI spec

const ReceivedDebits_stripeMethod = StripeResource.method;
const ReceivedDebits = StripeResource.extend({
    create: ReceivedDebits_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/received_debits',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Treasury/ReceivedDebits.js
// File generated from our OpenAPI spec

const Treasury_ReceivedDebits_stripeMethod = StripeResource.method;
const ReceivedDebits_ReceivedDebits = StripeResource.extend({
    retrieve: Treasury_ReceivedDebits_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/received_debits/{id}',
    }),
    list: Treasury_ReceivedDebits_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/received_debits',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/TestHelpers/Refunds.js
// File generated from our OpenAPI spec

const Refunds_stripeMethod = StripeResource.method;
const Refunds = StripeResource.extend({
    expire: Refunds_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/refunds/{refund}/expire',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Reporting/ReportRuns.js
// File generated from our OpenAPI spec

const ReportRuns_stripeMethod = StripeResource.method;
const ReportRuns = StripeResource.extend({
    create: ReportRuns_stripeMethod({
        method: 'POST',
        fullPath: '/v1/reporting/report_runs',
    }),
    retrieve: ReportRuns_stripeMethod({
        method: 'GET',
        fullPath: '/v1/reporting/report_runs/{report_run}',
    }),
    list: ReportRuns_stripeMethod({
        method: 'GET',
        fullPath: '/v1/reporting/report_runs',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Reporting/ReportTypes.js
// File generated from our OpenAPI spec

const ReportTypes_stripeMethod = StripeResource.method;
const ReportTypes = StripeResource.extend({
    retrieve: ReportTypes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/reporting/report_types/{report_type}',
    }),
    list: ReportTypes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/reporting/report_types',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Sigma/ScheduledQueryRuns.js
// File generated from our OpenAPI spec

const ScheduledQueryRuns_stripeMethod = StripeResource.method;
const ScheduledQueryRuns = StripeResource.extend({
    retrieve: ScheduledQueryRuns_stripeMethod({
        method: 'GET',
        fullPath: '/v1/sigma/scheduled_query_runs/{scheduled_query_run}',
    }),
    list: ScheduledQueryRuns_stripeMethod({
        method: 'GET',
        fullPath: '/v1/sigma/scheduled_query_runs',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Apps/Secrets.js
// File generated from our OpenAPI spec

const Secrets_stripeMethod = StripeResource.method;
const Secrets = StripeResource.extend({
    create: Secrets_stripeMethod({
        method: 'POST',
        fullPath: '/v1/apps/secrets',
    }),
    list: Secrets_stripeMethod({
        method: 'GET',
        fullPath: '/v1/apps/secrets',
        methodType: 'list',
    }),
    deleteWhere: Secrets_stripeMethod({
        method: 'POST',
        fullPath: '/v1/apps/secrets/delete',
    }),
    find: Secrets_stripeMethod({
        method: 'GET',
        fullPath: '/v1/apps/secrets/find',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/BillingPortal/Sessions.js
// File generated from our OpenAPI spec

const Sessions_stripeMethod = StripeResource.method;
const Sessions = StripeResource.extend({
    create: Sessions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing_portal/sessions',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Checkout/Sessions.js
// File generated from our OpenAPI spec

const Checkout_Sessions_stripeMethod = StripeResource.method;
const Sessions_Sessions = StripeResource.extend({
    create: Checkout_Sessions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/checkout/sessions',
    }),
    retrieve: Checkout_Sessions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/checkout/sessions/{session}',
    }),
    list: Checkout_Sessions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/checkout/sessions',
        methodType: 'list',
    }),
    expire: Checkout_Sessions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/checkout/sessions/{session}/expire',
    }),
    listLineItems: Checkout_Sessions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/checkout/sessions/{session}/line_items',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/FinancialConnections/Sessions.js
// File generated from our OpenAPI spec

const FinancialConnections_Sessions_stripeMethod = StripeResource.method;
const FinancialConnections_Sessions_Sessions = StripeResource.extend({
    create: FinancialConnections_Sessions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/financial_connections/sessions',
    }),
    retrieve: FinancialConnections_Sessions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/financial_connections/sessions/{session}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/TestHelpers/TestClocks.js
// File generated from our OpenAPI spec

const TestClocks_stripeMethod = StripeResource.method;
const TestClocks = StripeResource.extend({
    create: TestClocks_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/test_clocks',
    }),
    retrieve: TestClocks_stripeMethod({
        method: 'GET',
        fullPath: '/v1/test_helpers/test_clocks/{test_clock}',
    }),
    list: TestClocks_stripeMethod({
        method: 'GET',
        fullPath: '/v1/test_helpers/test_clocks',
        methodType: 'list',
    }),
    del: TestClocks_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/test_helpers/test_clocks/{test_clock}',
    }),
    advance: TestClocks_stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/test_clocks/{test_clock}/advance',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Treasury/TransactionEntries.js
// File generated from our OpenAPI spec

const TransactionEntries_stripeMethod = StripeResource.method;
const TransactionEntries = StripeResource.extend({
    retrieve: TransactionEntries_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/transaction_entries/{id}',
    }),
    list: TransactionEntries_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/transaction_entries',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Issuing/Transactions.js
// File generated from our OpenAPI spec

const Transactions_stripeMethod = StripeResource.method;
const Transactions = StripeResource.extend({
    retrieve: Transactions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/transactions/{transaction}',
    }),
    update: Transactions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/transactions/{transaction}',
    }),
    list: Transactions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/transactions',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Tax/Transactions.js
// File generated from our OpenAPI spec

const Tax_Transactions_stripeMethod = StripeResource.method;
const Transactions_Transactions = StripeResource.extend({
    retrieve: Tax_Transactions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax/transactions/{transaction}',
    }),
    createFromCalculation: Tax_Transactions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/tax/transactions/create_from_calculation',
    }),
    createReversal: Tax_Transactions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/tax/transactions/create_reversal',
    }),
    listLineItems: Tax_Transactions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax/transactions/{transaction}/line_items',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Treasury/Transactions.js
// File generated from our OpenAPI spec

const Treasury_Transactions_stripeMethod = StripeResource.method;
const Treasury_Transactions_Transactions = StripeResource.extend({
    retrieve: Treasury_Transactions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/transactions/{id}',
    }),
    list: Treasury_Transactions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/transactions',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Radar/ValueListItems.js
// File generated from our OpenAPI spec

const ValueListItems_stripeMethod = StripeResource.method;
const ValueListItems = StripeResource.extend({
    create: ValueListItems_stripeMethod({
        method: 'POST',
        fullPath: '/v1/radar/value_list_items',
    }),
    retrieve: ValueListItems_stripeMethod({
        method: 'GET',
        fullPath: '/v1/radar/value_list_items/{item}',
    }),
    list: ValueListItems_stripeMethod({
        method: 'GET',
        fullPath: '/v1/radar/value_list_items',
        methodType: 'list',
    }),
    del: ValueListItems_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/radar/value_list_items/{item}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Radar/ValueLists.js
// File generated from our OpenAPI spec

const ValueLists_stripeMethod = StripeResource.method;
const ValueLists = StripeResource.extend({
    create: ValueLists_stripeMethod({
        method: 'POST',
        fullPath: '/v1/radar/value_lists',
    }),
    retrieve: ValueLists_stripeMethod({
        method: 'GET',
        fullPath: '/v1/radar/value_lists/{value_list}',
    }),
    update: ValueLists_stripeMethod({
        method: 'POST',
        fullPath: '/v1/radar/value_lists/{value_list}',
    }),
    list: ValueLists_stripeMethod({
        method: 'GET',
        fullPath: '/v1/radar/value_lists',
        methodType: 'list',
    }),
    del: ValueLists_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/radar/value_lists/{value_list}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Identity/VerificationReports.js
// File generated from our OpenAPI spec

const VerificationReports_stripeMethod = StripeResource.method;
const VerificationReports = StripeResource.extend({
    retrieve: VerificationReports_stripeMethod({
        method: 'GET',
        fullPath: '/v1/identity/verification_reports/{report}',
    }),
    list: VerificationReports_stripeMethod({
        method: 'GET',
        fullPath: '/v1/identity/verification_reports',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Identity/VerificationSessions.js
// File generated from our OpenAPI spec

const VerificationSessions_stripeMethod = StripeResource.method;
const VerificationSessions = StripeResource.extend({
    create: VerificationSessions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions',
    }),
    retrieve: VerificationSessions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/identity/verification_sessions/{session}',
    }),
    update: VerificationSessions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions/{session}',
    }),
    list: VerificationSessions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/identity/verification_sessions',
        methodType: 'list',
    }),
    cancel: VerificationSessions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions/{session}/cancel',
    }),
    redact: VerificationSessions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions/{session}/redact',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Accounts.js
// File generated from our OpenAPI spec

const resources_Accounts_stripeMethod = StripeResource.method;
// Since path can either be `account` or `accounts`, support both through stripeMethod path;
const Accounts_Accounts = StripeResource.extend({
    create: resources_Accounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts',
    }),
    retrieve(id, ...args) {
        // No longer allow an api key to be passed as the first string to this function due to ambiguity between
        // old account ids and api keys. To request the account for an api key, send null as the id
        if (typeof id === 'string') {
            return resources_Accounts_stripeMethod({
                method: 'GET',
                fullPath: '/v1/accounts/{id}',
            }).apply(this, [id, ...args]);
        }
        else {
            if (id === null || id === undefined) {
                // Remove id as stripeMethod would complain of unexpected argument
                [].shift.apply([id, ...args]);
            }
            return resources_Accounts_stripeMethod({
                method: 'GET',
                fullPath: '/v1/account',
            }).apply(this, [id, ...args]);
        }
    },
    update: resources_Accounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}',
    }),
    list: resources_Accounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts',
        methodType: 'list',
    }),
    del: resources_Accounts_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/accounts/{account}',
    }),
    createExternalAccount: resources_Accounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/external_accounts',
    }),
    createLoginLink: resources_Accounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/login_links',
    }),
    createPerson: resources_Accounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/persons',
    }),
    deleteExternalAccount: resources_Accounts_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/accounts/{account}/external_accounts/{id}',
    }),
    deletePerson: resources_Accounts_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/accounts/{account}/persons/{person}',
    }),
    listCapabilities: resources_Accounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/capabilities',
        methodType: 'list',
    }),
    listExternalAccounts: resources_Accounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/external_accounts',
        methodType: 'list',
    }),
    listPersons: resources_Accounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/persons',
        methodType: 'list',
    }),
    reject: resources_Accounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/reject',
    }),
    retrieveCapability: resources_Accounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/capabilities/{capability}',
    }),
    retrieveExternalAccount: resources_Accounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/external_accounts/{id}',
    }),
    retrievePerson: resources_Accounts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/persons/{person}',
    }),
    updateCapability: resources_Accounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/capabilities/{capability}',
    }),
    updateExternalAccount: resources_Accounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/external_accounts/{id}',
    }),
    updatePerson: resources_Accounts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/persons/{person}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/OAuth.js



const OAuth_stripeMethod = StripeResource.method;
const oAuthHost = 'connect.stripe.com';
const OAuth = StripeResource.extend({
    basePath: '/',
    authorizeUrl(params, options) {
        params = params || {};
        options = options || {};
        let path = 'oauth/authorize';
        // For Express accounts, the path changes
        if (options.express) {
            path = `express/${path}`;
        }
        if (!params.response_type) {
            params.response_type = 'code';
        }
        if (!params.client_id) {
            params.client_id = this._stripe.getClientId();
        }
        if (!params.scope) {
            params.scope = 'read_write';
        }
        return `https://${oAuthHost}/${path}?${stringifyRequestData(params)}`;
    },
    token: OAuth_stripeMethod({
        method: 'POST',
        path: 'oauth/token',
        host: oAuthHost,
    }),
    deauthorize(spec, ...args) {
        if (!spec.client_id) {
            spec.client_id = this._stripe.getClientId();
        }
        return OAuth_stripeMethod({
            method: 'POST',
            path: 'oauth/deauthorize',
            host: oAuthHost,
        }).apply(this, [spec, ...args]);
    },
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/AccountLinks.js
// File generated from our OpenAPI spec

const AccountLinks_stripeMethod = StripeResource.method;
const AccountLinks = StripeResource.extend({
    create: AccountLinks_stripeMethod({
        method: 'POST',
        fullPath: '/v1/account_links',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/ApplePayDomains.js
// File generated from our OpenAPI spec

const ApplePayDomains_stripeMethod = StripeResource.method;
const ApplePayDomains = StripeResource.extend({
    create: ApplePayDomains_stripeMethod({
        method: 'POST',
        fullPath: '/v1/apple_pay/domains',
    }),
    retrieve: ApplePayDomains_stripeMethod({
        method: 'GET',
        fullPath: '/v1/apple_pay/domains/{domain}',
    }),
    list: ApplePayDomains_stripeMethod({
        method: 'GET',
        fullPath: '/v1/apple_pay/domains',
        methodType: 'list',
    }),
    del: ApplePayDomains_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/apple_pay/domains/{domain}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/ApplicationFees.js
// File generated from our OpenAPI spec

const ApplicationFees_stripeMethod = StripeResource.method;
const ApplicationFees = StripeResource.extend({
    retrieve: ApplicationFees_stripeMethod({
        method: 'GET',
        fullPath: '/v1/application_fees/{id}',
    }),
    list: ApplicationFees_stripeMethod({
        method: 'GET',
        fullPath: '/v1/application_fees',
        methodType: 'list',
    }),
    createRefund: ApplicationFees_stripeMethod({
        method: 'POST',
        fullPath: '/v1/application_fees/{id}/refunds',
    }),
    listRefunds: ApplicationFees_stripeMethod({
        method: 'GET',
        fullPath: '/v1/application_fees/{id}/refunds',
        methodType: 'list',
    }),
    retrieveRefund: ApplicationFees_stripeMethod({
        method: 'GET',
        fullPath: '/v1/application_fees/{fee}/refunds/{id}',
    }),
    updateRefund: ApplicationFees_stripeMethod({
        method: 'POST',
        fullPath: '/v1/application_fees/{fee}/refunds/{id}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Balance.js
// File generated from our OpenAPI spec

const Balance_stripeMethod = StripeResource.method;
const Balance = StripeResource.extend({
    retrieve: Balance_stripeMethod({
        method: 'GET',
        fullPath: '/v1/balance',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/BalanceTransactions.js
// File generated from our OpenAPI spec

const BalanceTransactions_stripeMethod = StripeResource.method;
const BalanceTransactions = StripeResource.extend({
    retrieve: BalanceTransactions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/balance_transactions/{id}',
    }),
    list: BalanceTransactions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/balance_transactions',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Charges.js
// File generated from our OpenAPI spec

const Charges_stripeMethod = StripeResource.method;
const Charges = StripeResource.extend({
    create: Charges_stripeMethod({
        method: 'POST',
        fullPath: '/v1/charges',
    }),
    retrieve: Charges_stripeMethod({
        method: 'GET',
        fullPath: '/v1/charges/{charge}',
    }),
    update: Charges_stripeMethod({
        method: 'POST',
        fullPath: '/v1/charges/{charge}',
    }),
    list: Charges_stripeMethod({
        method: 'GET',
        fullPath: '/v1/charges',
        methodType: 'list',
    }),
    capture: Charges_stripeMethod({
        method: 'POST',
        fullPath: '/v1/charges/{charge}/capture',
    }),
    search: Charges_stripeMethod({
        method: 'GET',
        fullPath: '/v1/charges/search',
        methodType: 'search',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/CountrySpecs.js
// File generated from our OpenAPI spec

const CountrySpecs_stripeMethod = StripeResource.method;
const CountrySpecs = StripeResource.extend({
    retrieve: CountrySpecs_stripeMethod({
        method: 'GET',
        fullPath: '/v1/country_specs/{country}',
    }),
    list: CountrySpecs_stripeMethod({
        method: 'GET',
        fullPath: '/v1/country_specs',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Coupons.js
// File generated from our OpenAPI spec

const Coupons_stripeMethod = StripeResource.method;
const Coupons = StripeResource.extend({
    create: Coupons_stripeMethod({
        method: 'POST',
        fullPath: '/v1/coupons',
    }),
    retrieve: Coupons_stripeMethod({
        method: 'GET',
        fullPath: '/v1/coupons/{coupon}',
    }),
    update: Coupons_stripeMethod({
        method: 'POST',
        fullPath: '/v1/coupons/{coupon}',
    }),
    list: Coupons_stripeMethod({
        method: 'GET',
        fullPath: '/v1/coupons',
        methodType: 'list',
    }),
    del: Coupons_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/coupons/{coupon}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/CreditNotes.js
// File generated from our OpenAPI spec

const CreditNotes_stripeMethod = StripeResource.method;
const CreditNotes = StripeResource.extend({
    create: CreditNotes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/credit_notes',
    }),
    retrieve: CreditNotes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/credit_notes/{id}',
    }),
    update: CreditNotes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/credit_notes/{id}',
    }),
    list: CreditNotes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/credit_notes',
        methodType: 'list',
    }),
    listLineItems: CreditNotes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/credit_notes/{credit_note}/lines',
        methodType: 'list',
    }),
    listPreviewLineItems: CreditNotes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/credit_notes/preview/lines',
        methodType: 'list',
    }),
    preview: CreditNotes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/credit_notes/preview',
    }),
    voidCreditNote: CreditNotes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/credit_notes/{id}/void',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Customers.js
// File generated from our OpenAPI spec

const resources_Customers_stripeMethod = StripeResource.method;
const Customers_Customers = StripeResource.extend({
    create: resources_Customers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers',
    }),
    retrieve: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}',
    }),
    update: resources_Customers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}',
    }),
    list: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers',
        methodType: 'list',
    }),
    del: resources_Customers_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}',
    }),
    createFundingInstructions: resources_Customers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/funding_instructions',
    }),
    createBalanceTransaction: resources_Customers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/balance_transactions',
    }),
    createSource: resources_Customers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/sources',
    }),
    createTaxId: resources_Customers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/tax_ids',
    }),
    deleteDiscount: resources_Customers_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}/discount',
    }),
    deleteSource: resources_Customers_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}/sources/{id}',
    }),
    deleteTaxId: resources_Customers_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}/tax_ids/{id}',
    }),
    listPaymentMethods: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/payment_methods',
        methodType: 'list',
    }),
    listBalanceTransactions: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/balance_transactions',
        methodType: 'list',
    }),
    listCashBalanceTransactions: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/cash_balance_transactions',
        methodType: 'list',
    }),
    listSources: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/sources',
        methodType: 'list',
    }),
    listTaxIds: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/tax_ids',
        methodType: 'list',
    }),
    retrievePaymentMethod: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/payment_methods/{payment_method}',
    }),
    retrieveBalanceTransaction: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/balance_transactions/{transaction}',
    }),
    retrieveCashBalance: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/cash_balance',
    }),
    retrieveCashBalanceTransaction: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/cash_balance_transactions/{transaction}',
    }),
    retrieveSource: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/sources/{id}',
    }),
    retrieveTaxId: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/tax_ids/{id}',
    }),
    search: resources_Customers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/search',
        methodType: 'search',
    }),
    updateBalanceTransaction: resources_Customers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/balance_transactions/{transaction}',
    }),
    updateCashBalance: resources_Customers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/cash_balance',
    }),
    updateSource: resources_Customers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/sources/{id}',
    }),
    verifySource: resources_Customers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/sources/{id}/verify',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Disputes.js
// File generated from our OpenAPI spec

const resources_Disputes_stripeMethod = StripeResource.method;
const Disputes_Disputes = StripeResource.extend({
    retrieve: resources_Disputes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/disputes/{dispute}',
    }),
    update: resources_Disputes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/disputes/{dispute}',
    }),
    list: resources_Disputes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/disputes',
        methodType: 'list',
    }),
    close: resources_Disputes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/disputes/{dispute}/close',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/EphemeralKeys.js
// File generated from our OpenAPI spec

const EphemeralKeys_stripeMethod = StripeResource.method;
const EphemeralKeys = StripeResource.extend({
    create: EphemeralKeys_stripeMethod({
        method: 'POST',
        fullPath: '/v1/ephemeral_keys',
        validator: (data, options) => {
            if (!options.headers || !options.headers['Stripe-Version']) {
                throw new Error('Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node');
            }
        },
    }),
    del: EphemeralKeys_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/ephemeral_keys/{key}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Events.js
// File generated from our OpenAPI spec

const Events_stripeMethod = StripeResource.method;
const Events = StripeResource.extend({
    retrieve: Events_stripeMethod({
        method: 'GET',
        fullPath: '/v1/events/{id}',
    }),
    list: Events_stripeMethod({
        method: 'GET',
        fullPath: '/v1/events',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/ExchangeRates.js
// File generated from our OpenAPI spec

const ExchangeRates_stripeMethod = StripeResource.method;
const ExchangeRates = StripeResource.extend({
    retrieve: ExchangeRates_stripeMethod({
        method: 'GET',
        fullPath: '/v1/exchange_rates/{rate_id}',
    }),
    list: ExchangeRates_stripeMethod({
        method: 'GET',
        fullPath: '/v1/exchange_rates',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/multipart.js

// Method for formatting HTTP body for the multipart/form-data specification
// Mostly taken from Fermata.js
// https://github.com/natevw/fermata/blob/5d9732a33d776ce925013a265935facd1626cc88/fermata.js#L315-L343
const multipartDataGenerator = (method, data, headers) => {
    const segno = (Math.round(Math.random() * 1e16) + Math.round(Math.random() * 1e16)).toString();
    headers['Content-Type'] = `multipart/form-data; boundary=${segno}`;
    const textEncoder = new TextEncoder();
    let buffer = new Uint8Array(0);
    const endBuffer = textEncoder.encode('\r\n');
    function push(l) {
        const prevBuffer = buffer;
        const newBuffer = l instanceof Uint8Array ? l : new Uint8Array(textEncoder.encode(l));
        buffer = new Uint8Array(prevBuffer.length + newBuffer.length + 2);
        buffer.set(prevBuffer);
        buffer.set(newBuffer, prevBuffer.length);
        buffer.set(endBuffer, buffer.length - 2);
    }
    function q(s) {
        return `"${s.replace(/"|"/g, '%22').replace(/\r\n|\r|\n/g, ' ')}"`;
    }
    const flattenedData = flattenAndStringify(data);
    for (const k in flattenedData) {
        const v = flattenedData[k];
        push(`--${segno}`);
        if (Object.prototype.hasOwnProperty.call(v, 'data')) {
            const typedEntry = v;
            push(`Content-Disposition: form-data; name=${q(k)}; filename=${q(typedEntry.name || 'blob')}`);
            push(`Content-Type: ${typedEntry.type || 'application/octet-stream'}`);
            push('');
            push(typedEntry.data);
        }
        else {
            push(`Content-Disposition: form-data; name=${q(k)}`);
            push('');
            push(v);
        }
    }
    push(`--${segno}--`);
    return buffer;
};
function multipartRequestDataProcessor(method, data, headers, callback) {
    data = data || {};
    if (method !== 'POST') {
        return callback(null, stringifyRequestData(data));
    }
    this._stripe._platformFunctions
        .tryBufferData(data)
        .then((bufferedData) => {
        const buffer = multipartDataGenerator(method, bufferedData, headers);
        return callback(null, buffer);
    })
        .catch((err) => callback(err, null));
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Files.js
// File generated from our OpenAPI spec


const Files_stripeMethod = StripeResource.method;
const Files = StripeResource.extend({
    create: Files_stripeMethod({
        method: 'POST',
        fullPath: '/v1/files',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        host: 'files.stripe.com',
    }),
    retrieve: Files_stripeMethod({
        method: 'GET',
        fullPath: '/v1/files/{file}',
    }),
    list: Files_stripeMethod({
        method: 'GET',
        fullPath: '/v1/files',
        methodType: 'list',
    }),
    requestDataProcessor: multipartRequestDataProcessor,
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/FileLinks.js
// File generated from our OpenAPI spec

const FileLinks_stripeMethod = StripeResource.method;
const FileLinks = StripeResource.extend({
    create: FileLinks_stripeMethod({
        method: 'POST',
        fullPath: '/v1/file_links',
    }),
    retrieve: FileLinks_stripeMethod({
        method: 'GET',
        fullPath: '/v1/file_links/{link}',
    }),
    update: FileLinks_stripeMethod({
        method: 'POST',
        fullPath: '/v1/file_links/{link}',
    }),
    list: FileLinks_stripeMethod({
        method: 'GET',
        fullPath: '/v1/file_links',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Invoices.js
// File generated from our OpenAPI spec

const Invoices_stripeMethod = StripeResource.method;
const Invoices = StripeResource.extend({
    create: Invoices_stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices',
    }),
    retrieve: Invoices_stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoices/{invoice}',
    }),
    update: Invoices_stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}',
    }),
    list: Invoices_stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoices',
        methodType: 'list',
    }),
    del: Invoices_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/invoices/{invoice}',
    }),
    finalizeInvoice: Invoices_stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/finalize',
    }),
    listLineItems: Invoices_stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoices/{invoice}/lines',
        methodType: 'list',
    }),
    listUpcomingLines: Invoices_stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoices/upcoming/lines',
        methodType: 'list',
    }),
    markUncollectible: Invoices_stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/mark_uncollectible',
    }),
    pay: Invoices_stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/pay',
    }),
    retrieveUpcoming: Invoices_stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoices/upcoming',
    }),
    search: Invoices_stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoices/search',
        methodType: 'search',
    }),
    sendInvoice: Invoices_stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/send',
    }),
    voidInvoice: Invoices_stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/void',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/InvoiceItems.js
// File generated from our OpenAPI spec

const InvoiceItems_stripeMethod = StripeResource.method;
const InvoiceItems = StripeResource.extend({
    create: InvoiceItems_stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoiceitems',
    }),
    retrieve: InvoiceItems_stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoiceitems/{invoiceitem}',
    }),
    update: InvoiceItems_stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoiceitems/{invoiceitem}',
    }),
    list: InvoiceItems_stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoiceitems',
        methodType: 'list',
    }),
    del: InvoiceItems_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/invoiceitems/{invoiceitem}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Mandates.js
// File generated from our OpenAPI spec

const Mandates_stripeMethod = StripeResource.method;
const Mandates = StripeResource.extend({
    retrieve: Mandates_stripeMethod({
        method: 'GET',
        fullPath: '/v1/mandates/{mandate}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/PaymentIntents.js
// File generated from our OpenAPI spec

const PaymentIntents_stripeMethod = StripeResource.method;
const PaymentIntents = StripeResource.extend({
    create: PaymentIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents',
    }),
    retrieve: PaymentIntents_stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_intents/{intent}',
    }),
    update: PaymentIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}',
    }),
    list: PaymentIntents_stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_intents',
        methodType: 'list',
    }),
    applyCustomerBalance: PaymentIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/apply_customer_balance',
    }),
    cancel: PaymentIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/cancel',
    }),
    capture: PaymentIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/capture',
    }),
    confirm: PaymentIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/confirm',
    }),
    incrementAuthorization: PaymentIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/increment_authorization',
    }),
    search: PaymentIntents_stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_intents/search',
        methodType: 'search',
    }),
    verifyMicrodeposits: PaymentIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/verify_microdeposits',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/PaymentLinks.js
// File generated from our OpenAPI spec

const PaymentLinks_stripeMethod = StripeResource.method;
const PaymentLinks = StripeResource.extend({
    create: PaymentLinks_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_links',
    }),
    retrieve: PaymentLinks_stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_links/{payment_link}',
    }),
    update: PaymentLinks_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_links/{payment_link}',
    }),
    list: PaymentLinks_stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_links',
        methodType: 'list',
    }),
    listLineItems: PaymentLinks_stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_links/{payment_link}/line_items',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/PaymentMethods.js
// File generated from our OpenAPI spec

const PaymentMethods_stripeMethod = StripeResource.method;
const PaymentMethods = StripeResource.extend({
    create: PaymentMethods_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_methods',
    }),
    retrieve: PaymentMethods_stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_methods/{payment_method}',
    }),
    update: PaymentMethods_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_methods/{payment_method}',
    }),
    list: PaymentMethods_stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_methods',
        methodType: 'list',
    }),
    attach: PaymentMethods_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_methods/{payment_method}/attach',
    }),
    detach: PaymentMethods_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_methods/{payment_method}/detach',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Payouts.js
// File generated from our OpenAPI spec

const Payouts_stripeMethod = StripeResource.method;
const Payouts = StripeResource.extend({
    create: Payouts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payouts',
    }),
    retrieve: Payouts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/payouts/{payout}',
    }),
    update: Payouts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payouts/{payout}',
    }),
    list: Payouts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/payouts',
        methodType: 'list',
    }),
    cancel: Payouts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payouts/{payout}/cancel',
    }),
    reverse: Payouts_stripeMethod({
        method: 'POST',
        fullPath: '/v1/payouts/{payout}/reverse',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Plans.js
// File generated from our OpenAPI spec

const Plans_stripeMethod = StripeResource.method;
const Plans = StripeResource.extend({
    create: Plans_stripeMethod({
        method: 'POST',
        fullPath: '/v1/plans',
    }),
    retrieve: Plans_stripeMethod({
        method: 'GET',
        fullPath: '/v1/plans/{plan}',
    }),
    update: Plans_stripeMethod({
        method: 'POST',
        fullPath: '/v1/plans/{plan}',
    }),
    list: Plans_stripeMethod({
        method: 'GET',
        fullPath: '/v1/plans',
        methodType: 'list',
    }),
    del: Plans_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/plans/{plan}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Prices.js
// File generated from our OpenAPI spec

const Prices_stripeMethod = StripeResource.method;
const Prices = StripeResource.extend({
    create: Prices_stripeMethod({
        method: 'POST',
        fullPath: '/v1/prices',
    }),
    retrieve: Prices_stripeMethod({
        method: 'GET',
        fullPath: '/v1/prices/{price}',
    }),
    update: Prices_stripeMethod({
        method: 'POST',
        fullPath: '/v1/prices/{price}',
    }),
    list: Prices_stripeMethod({
        method: 'GET',
        fullPath: '/v1/prices',
        methodType: 'list',
    }),
    search: Prices_stripeMethod({
        method: 'GET',
        fullPath: '/v1/prices/search',
        methodType: 'search',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Products.js
// File generated from our OpenAPI spec

const Products_stripeMethod = StripeResource.method;
const Products = StripeResource.extend({
    create: Products_stripeMethod({
        method: 'POST',
        fullPath: '/v1/products',
    }),
    retrieve: Products_stripeMethod({
        method: 'GET',
        fullPath: '/v1/products/{id}',
    }),
    update: Products_stripeMethod({
        method: 'POST',
        fullPath: '/v1/products/{id}',
    }),
    list: Products_stripeMethod({
        method: 'GET',
        fullPath: '/v1/products',
        methodType: 'list',
    }),
    del: Products_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/products/{id}',
    }),
    search: Products_stripeMethod({
        method: 'GET',
        fullPath: '/v1/products/search',
        methodType: 'search',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/PromotionCodes.js
// File generated from our OpenAPI spec

const PromotionCodes_stripeMethod = StripeResource.method;
const PromotionCodes = StripeResource.extend({
    create: PromotionCodes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/promotion_codes',
    }),
    retrieve: PromotionCodes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/promotion_codes/{promotion_code}',
    }),
    update: PromotionCodes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/promotion_codes/{promotion_code}',
    }),
    list: PromotionCodes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/promotion_codes',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Quotes.js
// File generated from our OpenAPI spec

const Quotes_stripeMethod = StripeResource.method;
const Quotes = StripeResource.extend({
    create: Quotes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/quotes',
    }),
    retrieve: Quotes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}',
    }),
    update: Quotes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/quotes/{quote}',
    }),
    list: Quotes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/quotes',
        methodType: 'list',
    }),
    accept: Quotes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/quotes/{quote}/accept',
    }),
    cancel: Quotes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/quotes/{quote}/cancel',
    }),
    finalizeQuote: Quotes_stripeMethod({
        method: 'POST',
        fullPath: '/v1/quotes/{quote}/finalize',
    }),
    listComputedUpfrontLineItems: Quotes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}/computed_upfront_line_items',
        methodType: 'list',
    }),
    listLineItems: Quotes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}/line_items',
        methodType: 'list',
    }),
    pdf: Quotes_stripeMethod({
        host: 'files.stripe.com',
        method: 'GET',
        fullPath: '/v1/quotes/{quote}/pdf',
        streaming: true,
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Refunds.js
// File generated from our OpenAPI spec

const resources_Refunds_stripeMethod = StripeResource.method;
const Refunds_Refunds = StripeResource.extend({
    create: resources_Refunds_stripeMethod({
        method: 'POST',
        fullPath: '/v1/refunds',
    }),
    retrieve: resources_Refunds_stripeMethod({
        method: 'GET',
        fullPath: '/v1/refunds/{refund}',
    }),
    update: resources_Refunds_stripeMethod({
        method: 'POST',
        fullPath: '/v1/refunds/{refund}',
    }),
    list: resources_Refunds_stripeMethod({
        method: 'GET',
        fullPath: '/v1/refunds',
        methodType: 'list',
    }),
    cancel: resources_Refunds_stripeMethod({
        method: 'POST',
        fullPath: '/v1/refunds/{refund}/cancel',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Reviews.js
// File generated from our OpenAPI spec

const Reviews_stripeMethod = StripeResource.method;
const Reviews = StripeResource.extend({
    retrieve: Reviews_stripeMethod({
        method: 'GET',
        fullPath: '/v1/reviews/{review}',
    }),
    list: Reviews_stripeMethod({
        method: 'GET',
        fullPath: '/v1/reviews',
        methodType: 'list',
    }),
    approve: Reviews_stripeMethod({
        method: 'POST',
        fullPath: '/v1/reviews/{review}/approve',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/SetupAttempts.js
// File generated from our OpenAPI spec

const SetupAttempts_stripeMethod = StripeResource.method;
const SetupAttempts = StripeResource.extend({
    list: SetupAttempts_stripeMethod({
        method: 'GET',
        fullPath: '/v1/setup_attempts',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/SetupIntents.js
// File generated from our OpenAPI spec

const SetupIntents_stripeMethod = StripeResource.method;
const SetupIntents = StripeResource.extend({
    create: SetupIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/setup_intents',
    }),
    retrieve: SetupIntents_stripeMethod({
        method: 'GET',
        fullPath: '/v1/setup_intents/{intent}',
    }),
    update: SetupIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}',
    }),
    list: SetupIntents_stripeMethod({
        method: 'GET',
        fullPath: '/v1/setup_intents',
        methodType: 'list',
    }),
    cancel: SetupIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}/cancel',
    }),
    confirm: SetupIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}/confirm',
    }),
    verifyMicrodeposits: SetupIntents_stripeMethod({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}/verify_microdeposits',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/ShippingRates.js
// File generated from our OpenAPI spec

const ShippingRates_stripeMethod = StripeResource.method;
const ShippingRates = StripeResource.extend({
    create: ShippingRates_stripeMethod({
        method: 'POST',
        fullPath: '/v1/shipping_rates',
    }),
    retrieve: ShippingRates_stripeMethod({
        method: 'GET',
        fullPath: '/v1/shipping_rates/{shipping_rate_token}',
    }),
    update: ShippingRates_stripeMethod({
        method: 'POST',
        fullPath: '/v1/shipping_rates/{shipping_rate_token}',
    }),
    list: ShippingRates_stripeMethod({
        method: 'GET',
        fullPath: '/v1/shipping_rates',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Sources.js
// File generated from our OpenAPI spec

const Sources_stripeMethod = StripeResource.method;
const Sources = StripeResource.extend({
    create: Sources_stripeMethod({
        method: 'POST',
        fullPath: '/v1/sources',
    }),
    retrieve: Sources_stripeMethod({
        method: 'GET',
        fullPath: '/v1/sources/{source}',
    }),
    update: Sources_stripeMethod({
        method: 'POST',
        fullPath: '/v1/sources/{source}',
    }),
    listSourceTransactions: Sources_stripeMethod({
        method: 'GET',
        fullPath: '/v1/sources/{source}/source_transactions',
        methodType: 'list',
    }),
    verify: Sources_stripeMethod({
        method: 'POST',
        fullPath: '/v1/sources/{source}/verify',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Subscriptions.js
// File generated from our OpenAPI spec

const Subscriptions_stripeMethod = StripeResource.method;
const Subscriptions = StripeResource.extend({
    create: Subscriptions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscriptions',
    }),
    retrieve: Subscriptions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}',
    }),
    update: Subscriptions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}',
    }),
    list: Subscriptions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscriptions',
        methodType: 'list',
    }),
    cancel: Subscriptions_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}',
    }),
    del: Subscriptions_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}',
    }),
    deleteDiscount: Subscriptions_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}/discount',
    }),
    resume: Subscriptions_stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscriptions/{subscription}/resume',
    }),
    search: Subscriptions_stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscriptions/search',
        methodType: 'search',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/SubscriptionItems.js
// File generated from our OpenAPI spec

const SubscriptionItems_stripeMethod = StripeResource.method;
const SubscriptionItems = StripeResource.extend({
    create: SubscriptionItems_stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscription_items',
    }),
    retrieve: SubscriptionItems_stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscription_items/{item}',
    }),
    update: SubscriptionItems_stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscription_items/{item}',
    }),
    list: SubscriptionItems_stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscription_items',
        methodType: 'list',
    }),
    del: SubscriptionItems_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/subscription_items/{item}',
    }),
    createUsageRecord: SubscriptionItems_stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscription_items/{subscription_item}/usage_records',
    }),
    listUsageRecordSummaries: SubscriptionItems_stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscription_items/{subscription_item}/usage_record_summaries',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/SubscriptionSchedules.js
// File generated from our OpenAPI spec

const SubscriptionSchedules_stripeMethod = StripeResource.method;
const SubscriptionSchedules = StripeResource.extend({
    create: SubscriptionSchedules_stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscription_schedules',
    }),
    retrieve: SubscriptionSchedules_stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscription_schedules/{schedule}',
    }),
    update: SubscriptionSchedules_stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscription_schedules/{schedule}',
    }),
    list: SubscriptionSchedules_stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscription_schedules',
        methodType: 'list',
    }),
    cancel: SubscriptionSchedules_stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscription_schedules/{schedule}/cancel',
    }),
    release: SubscriptionSchedules_stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscription_schedules/{schedule}/release',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/TaxCodes.js
// File generated from our OpenAPI spec

const TaxCodes_stripeMethod = StripeResource.method;
const TaxCodes = StripeResource.extend({
    retrieve: TaxCodes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax_codes/{id}',
    }),
    list: TaxCodes_stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax_codes',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/TaxRates.js
// File generated from our OpenAPI spec

const TaxRates_stripeMethod = StripeResource.method;
const TaxRates = StripeResource.extend({
    create: TaxRates_stripeMethod({
        method: 'POST',
        fullPath: '/v1/tax_rates',
    }),
    retrieve: TaxRates_stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax_rates/{tax_rate}',
    }),
    update: TaxRates_stripeMethod({
        method: 'POST',
        fullPath: '/v1/tax_rates/{tax_rate}',
    }),
    list: TaxRates_stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax_rates',
        methodType: 'list',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Tokens.js
// File generated from our OpenAPI spec

const Tokens_stripeMethod = StripeResource.method;
const Tokens = StripeResource.extend({
    create: Tokens_stripeMethod({
        method: 'POST',
        fullPath: '/v1/tokens',
    }),
    retrieve: Tokens_stripeMethod({
        method: 'GET',
        fullPath: '/v1/tokens/{token}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Topups.js
// File generated from our OpenAPI spec

const Topups_stripeMethod = StripeResource.method;
const Topups = StripeResource.extend({
    create: Topups_stripeMethod({
        method: 'POST',
        fullPath: '/v1/topups',
    }),
    retrieve: Topups_stripeMethod({
        method: 'GET',
        fullPath: '/v1/topups/{topup}',
    }),
    update: Topups_stripeMethod({
        method: 'POST',
        fullPath: '/v1/topups/{topup}',
    }),
    list: Topups_stripeMethod({
        method: 'GET',
        fullPath: '/v1/topups',
        methodType: 'list',
    }),
    cancel: Topups_stripeMethod({
        method: 'POST',
        fullPath: '/v1/topups/{topup}/cancel',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/Transfers.js
// File generated from our OpenAPI spec

const Transfers_stripeMethod = StripeResource.method;
const Transfers = StripeResource.extend({
    create: Transfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/transfers',
    }),
    retrieve: Transfers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/transfers/{transfer}',
    }),
    update: Transfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/transfers/{transfer}',
    }),
    list: Transfers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/transfers',
        methodType: 'list',
    }),
    createReversal: Transfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/transfers/{id}/reversals',
    }),
    listReversals: Transfers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/transfers/{id}/reversals',
        methodType: 'list',
    }),
    retrieveReversal: Transfers_stripeMethod({
        method: 'GET',
        fullPath: '/v1/transfers/{transfer}/reversals/{id}',
    }),
    updateReversal: Transfers_stripeMethod({
        method: 'POST',
        fullPath: '/v1/transfers/{transfer}/reversals/{id}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources/WebhookEndpoints.js
// File generated from our OpenAPI spec

const WebhookEndpoints_stripeMethod = StripeResource.method;
const WebhookEndpoints = StripeResource.extend({
    create: WebhookEndpoints_stripeMethod({
        method: 'POST',
        fullPath: '/v1/webhook_endpoints',
    }),
    retrieve: WebhookEndpoints_stripeMethod({
        method: 'GET',
        fullPath: '/v1/webhook_endpoints/{webhook_endpoint}',
    }),
    update: WebhookEndpoints_stripeMethod({
        method: 'POST',
        fullPath: '/v1/webhook_endpoints/{webhook_endpoint}',
    }),
    list: WebhookEndpoints_stripeMethod({
        method: 'GET',
        fullPath: '/v1/webhook_endpoints',
        methodType: 'list',
    }),
    del: WebhookEndpoints_stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/webhook_endpoints/{webhook_endpoint}',
    }),
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/resources.js
// File generated from our OpenAPI spec




























































































const Apps = resourceNamespace('apps', { Secrets: Secrets });
const BillingPortal = resourceNamespace('billingPortal', {
    Configurations: Configurations,
    Sessions: Sessions,
});
const Checkout = resourceNamespace('checkout', {
    Sessions: Sessions_Sessions,
});
const FinancialConnections = resourceNamespace('financialConnections', {
    Accounts: Accounts,
    Sessions: FinancialConnections_Sessions_Sessions,
});
const Identity = resourceNamespace('identity', {
    VerificationReports: VerificationReports,
    VerificationSessions: VerificationSessions,
});
const Issuing = resourceNamespace('issuing', {
    Authorizations: Authorizations,
    Cardholders: Cardholders,
    Cards: Cards_Cards,
    Disputes: Disputes,
    Transactions: Transactions,
});
const Radar = resourceNamespace('radar', {
    EarlyFraudWarnings: EarlyFraudWarnings,
    ValueListItems: ValueListItems,
    ValueLists: ValueLists,
});
const Reporting = resourceNamespace('reporting', {
    ReportRuns: ReportRuns,
    ReportTypes: ReportTypes,
});
const Sigma = resourceNamespace('sigma', {
    ScheduledQueryRuns: ScheduledQueryRuns,
});
const Tax = resourceNamespace('tax', {
    Calculations: Calculations,
    Transactions: Transactions_Transactions,
});
const Terminal = resourceNamespace('terminal', {
    Configurations: Configurations_Configurations,
    ConnectionTokens: ConnectionTokens,
    Locations: Locations,
    Readers: Readers_Readers,
});
const TestHelpers = resourceNamespace('testHelpers', {
    Customers: Customers,
    Refunds: Refunds,
    TestClocks: TestClocks,
    Issuing: resourceNamespace('issuing', { Cards: Cards }),
    Terminal: resourceNamespace('terminal', {
        Readers: Readers,
    }),
    Treasury: resourceNamespace('treasury', {
        InboundTransfers: InboundTransfers,
        OutboundPayments: OutboundPayments,
        OutboundTransfers: OutboundTransfers,
        ReceivedCredits: ReceivedCredits,
        ReceivedDebits: ReceivedDebits,
    }),
});
const Treasury = resourceNamespace('treasury', {
    CreditReversals: CreditReversals,
    DebitReversals: DebitReversals,
    FinancialAccounts: FinancialAccounts,
    InboundTransfers: InboundTransfers_InboundTransfers,
    OutboundPayments: OutboundPayments_OutboundPayments,
    OutboundTransfers: OutboundTransfers_OutboundTransfers,
    ReceivedCredits: ReceivedCredits_ReceivedCredits,
    ReceivedDebits: ReceivedDebits_ReceivedDebits,
    TransactionEntries: TransactionEntries,
    Transactions: Treasury_Transactions_Transactions,
});

;// CONCATENATED MODULE: ./node_modules/stripe/esm/RequestSender.js



const MAX_RETRY_AFTER_WAIT = 60;
class RequestSender {
    constructor(stripe, maxBufferedRequestMetric) {
        this._stripe = stripe;
        this._maxBufferedRequestMetric = maxBufferedRequestMetric;
    }
    _addHeadersDirectlyToObject(obj, headers) {
        // For convenience, make some headers easily accessible on
        // lastResponse.
        // NOTE: Stripe responds with lowercase header names/keys.
        obj.requestId = headers['request-id'];
        obj.stripeAccount = obj.stripeAccount || headers['stripe-account'];
        obj.apiVersion = obj.apiVersion || headers['stripe-version'];
        obj.idempotencyKey = obj.idempotencyKey || headers['idempotency-key'];
    }
    _makeResponseEvent(requestEvent, statusCode, headers) {
        const requestEndTime = Date.now();
        const requestDurationMs = requestEndTime - requestEvent.request_start_time;
        return removeNullish({
            api_version: headers['stripe-version'],
            account: headers['stripe-account'],
            idempotency_key: headers['idempotency-key'],
            method: requestEvent.method,
            path: requestEvent.path,
            status: statusCode,
            request_id: this._getRequestId(headers),
            elapsed: requestDurationMs,
            request_start_time: requestEvent.request_start_time,
            request_end_time: requestEndTime,
        });
    }
    _getRequestId(headers) {
        return headers['request-id'];
    }
    /**
     * Used by methods with spec.streaming === true. For these methods, we do not
     * buffer successful responses into memory or do parse them into stripe
     * objects, we delegate that all of that to the user and pass back the raw
     * http.Response object to the callback.
     *
     * (Unsuccessful responses shouldn't make it here, they should
     * still be buffered/parsed and handled by _jsonResponseHandler -- see
     * makeRequest)
     */
    _streamingResponseHandler(requestEvent, callback) {
        return (res) => {
            const headers = res.getHeaders();
            const streamCompleteCallback = () => {
                const responseEvent = this._makeResponseEvent(requestEvent, res.getStatusCode(), headers);
                this._stripe._emitter.emit('response', responseEvent);
                this._recordRequestMetrics(this._getRequestId(headers), responseEvent.elapsed);
            };
            const stream = res.toStream(streamCompleteCallback);
            // This is here for backwards compatibility, as the stream is a raw
            // HTTP response in Node and the legacy behavior was to mutate this
            // response.
            this._addHeadersDirectlyToObject(stream, headers);
            return callback(null, stream);
        };
    }
    /**
     * Default handler for Stripe responses. Buffers the response into memory,
     * parses the JSON and returns it (i.e. passes it to the callback) if there
     * is no "error" field. Otherwise constructs/passes an appropriate Error.
     */
    _jsonResponseHandler(requestEvent, callback) {
        return (res) => {
            const headers = res.getHeaders();
            const requestId = this._getRequestId(headers);
            const statusCode = res.getStatusCode();
            const responseEvent = this._makeResponseEvent(requestEvent, statusCode, headers);
            this._stripe._emitter.emit('response', responseEvent);
            res
                .toJSON()
                .then((jsonResponse) => {
                if (jsonResponse.error) {
                    let err;
                    // Convert OAuth error responses into a standard format
                    // so that the rest of the error logic can be shared
                    if (typeof jsonResponse.error === 'string') {
                        jsonResponse.error = {
                            type: jsonResponse.error,
                            message: jsonResponse.error_description,
                        };
                    }
                    jsonResponse.error.headers = headers;
                    jsonResponse.error.statusCode = statusCode;
                    jsonResponse.error.requestId = requestId;
                    if (statusCode === 401) {
                        err = new StripeAuthenticationError(jsonResponse.error);
                    }
                    else if (statusCode === 403) {
                        err = new StripePermissionError(jsonResponse.error);
                    }
                    else if (statusCode === 429) {
                        err = new StripeRateLimitError(jsonResponse.error);
                    }
                    else {
                        err = StripeError.generate(jsonResponse.error);
                    }
                    throw err;
                }
                return jsonResponse;
            }, (e) => {
                throw new StripeAPIError({
                    message: 'Invalid JSON received from the Stripe API',
                    exception: e,
                    requestId: headers['request-id'],
                });
            })
                .then((jsonResponse) => {
                this._recordRequestMetrics(requestId, responseEvent.elapsed);
                // Expose raw response object.
                const rawResponse = res.getRawResponse();
                this._addHeadersDirectlyToObject(rawResponse, headers);
                Object.defineProperty(jsonResponse, 'lastResponse', {
                    enumerable: false,
                    writable: false,
                    value: rawResponse,
                });
                callback(null, jsonResponse);
            }, (e) => callback(e, null));
        };
    }
    static _generateConnectionErrorMessage(requestRetries) {
        return `An error occurred with our connection to Stripe.${requestRetries > 0 ? ` Request was retried ${requestRetries} times.` : ''}`;
    }
    // For more on when and how to retry API requests, see https://stripe.com/docs/error-handling#safely-retrying-requests-with-idempotency
    static _shouldRetry(res, numRetries, maxRetries, error) {
        if (error &&
            numRetries === 0 &&
            HttpClient.CONNECTION_CLOSED_ERROR_CODES.includes(error.code)) {
            return true;
        }
        // Do not retry if we are out of retries.
        if (numRetries >= maxRetries) {
            return false;
        }
        // Retry on connection error.
        if (!res) {
            return true;
        }
        // The API may ask us not to retry (e.g., if doing so would be a no-op)
        // or advise us to retry (e.g., in cases of lock timeouts); we defer to that.
        if (res.getHeaders()['stripe-should-retry'] === 'false') {
            return false;
        }
        if (res.getHeaders()['stripe-should-retry'] === 'true') {
            return true;
        }
        // Retry on conflict errors.
        if (res.getStatusCode() === 409) {
            return true;
        }
        // Retry on 500, 503, and other internal errors.
        //
        // Note that we expect the stripe-should-retry header to be false
        // in most cases when a 500 is returned, since our idempotency framework
        // would typically replay it anyway.
        if (res.getStatusCode() >= 500) {
            return true;
        }
        return false;
    }
    _getSleepTimeInMS(numRetries, retryAfter = null) {
        const initialNetworkRetryDelay = this._stripe.getInitialNetworkRetryDelay();
        const maxNetworkRetryDelay = this._stripe.getMaxNetworkRetryDelay();
        // Apply exponential backoff with initialNetworkRetryDelay on the
        // number of numRetries so far as inputs. Do not allow the number to exceed
        // maxNetworkRetryDelay.
        let sleepSeconds = Math.min(initialNetworkRetryDelay * Math.pow(numRetries - 1, 2), maxNetworkRetryDelay);
        // Apply some jitter by randomizing the value in the range of
        // (sleepSeconds / 2) to (sleepSeconds).
        sleepSeconds *= 0.5 * (1 + Math.random());
        // But never sleep less than the base sleep seconds.
        sleepSeconds = Math.max(initialNetworkRetryDelay, sleepSeconds);
        // And never sleep less than the time the API asks us to wait, assuming it's a reasonable ask.
        if (Number.isInteger(retryAfter) && retryAfter <= MAX_RETRY_AFTER_WAIT) {
            sleepSeconds = Math.max(sleepSeconds, retryAfter);
        }
        return sleepSeconds * 1000;
    }
    // Max retries can be set on a per request basis. Favor those over the global setting
    _getMaxNetworkRetries(settings = {}) {
        return settings.maxNetworkRetries &&
            Number.isInteger(settings.maxNetworkRetries)
            ? settings.maxNetworkRetries
            : this._stripe.getMaxNetworkRetries();
    }
    _defaultIdempotencyKey(method, settings) {
        // If this is a POST and we allow multiple retries, ensure an idempotency key.
        const maxRetries = this._getMaxNetworkRetries(settings);
        if (method === 'POST' && maxRetries > 0) {
            return `stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;
        }
        return null;
    }
    _makeHeaders(auth, contentLength, apiVersion, clientUserAgent, method, userSuppliedHeaders, userSuppliedSettings) {
        const defaultHeaders = {
            // Use specified auth token or use default from this stripe instance:
            Authorization: auth ? `Bearer ${auth}` : this._stripe.getApiField('auth'),
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': this._getUserAgentString(),
            'X-Stripe-Client-User-Agent': clientUserAgent,
            'X-Stripe-Client-Telemetry': this._getTelemetryHeader(),
            'Stripe-Version': apiVersion,
            'Stripe-Account': this._stripe.getApiField('stripeAccount'),
            'Idempotency-Key': this._defaultIdempotencyKey(method, userSuppliedSettings),
        };
        // As per https://datatracker.ietf.org/doc/html/rfc7230#section-3.3.2:
        //   A user agent SHOULD send a Content-Length in a request message when
        //   no Transfer-Encoding is sent and the request method defines a meaning
        //   for an enclosed payload body.  For example, a Content-Length header
        //   field is normally sent in a POST request even when the value is 0
        //   (indicating an empty payload body).  A user agent SHOULD NOT send a
        //   Content-Length header field when the request message does not contain
        //   a payload body and the method semantics do not anticipate such a
        //   body.
        //
        // These method types are expected to have bodies and so we should always
        // include a Content-Length.
        const methodHasPayload = method == 'POST' || method == 'PUT' || method == 'PATCH';
        // If a content length was specified, we always include it regardless of
        // whether the method semantics anticipate such a body. This keeps us
        // consistent with historical behavior. We do however want to warn on this
        // and fix these cases as they are semantically incorrect.
        if (methodHasPayload || contentLength) {
            if (!methodHasPayload) {
                emitWarning(`${method} method had non-zero contentLength but no payload is expected for this verb`);
            }
            defaultHeaders['Content-Length'] = contentLength;
        }
        return Object.assign(removeNullish(defaultHeaders), 
        // If the user supplied, say 'idempotency-key', override instead of appending by ensuring caps are the same.
        normalizeHeaders(userSuppliedHeaders));
    }
    _getUserAgentString() {
        const packageVersion = this._stripe.getConstant('PACKAGE_VERSION');
        const appInfo = this._stripe._appInfo
            ? this._stripe.getAppInfoAsString()
            : '';
        return `Stripe/v1 NodeBindings/${packageVersion} ${appInfo}`.trim();
    }
    _getTelemetryHeader() {
        if (this._stripe.getTelemetryEnabled() &&
            this._stripe._prevRequestMetrics.length > 0) {
            const metrics = this._stripe._prevRequestMetrics.shift();
            return JSON.stringify({
                last_request_metrics: metrics,
            });
        }
    }
    _recordRequestMetrics(requestId, requestDurationMs) {
        if (this._stripe.getTelemetryEnabled() && requestId) {
            if (this._stripe._prevRequestMetrics.length > this._maxBufferedRequestMetric) {
                emitWarning('Request metrics buffer is full, dropping telemetry message.');
            }
            else {
                this._stripe._prevRequestMetrics.push({
                    request_id: requestId,
                    request_duration_ms: requestDurationMs,
                });
            }
        }
    }
    _request(method, host, path, data, auth, options = {}, callback, requestDataProcessor = null) {
        let requestData;
        const retryRequest = (requestFn, apiVersion, headers, requestRetries, retryAfter) => {
            return setTimeout(requestFn, this._getSleepTimeInMS(requestRetries, retryAfter), apiVersion, headers, requestRetries + 1);
        };
        const makeRequest = (apiVersion, headers, numRetries) => {
            // timeout can be set on a per-request basis. Favor that over the global setting
            const timeout = options.settings &&
                options.settings.timeout &&
                Number.isInteger(options.settings.timeout) &&
                options.settings.timeout >= 0
                ? options.settings.timeout
                : this._stripe.getApiField('timeout');
            const req = this._stripe
                .getApiField('httpClient')
                .makeRequest(host || this._stripe.getApiField('host'), this._stripe.getApiField('port'), path, method, headers, requestData, this._stripe.getApiField('protocol'), timeout);
            const requestStartTime = Date.now();
            // @ts-ignore
            const requestEvent = removeNullish({
                api_version: apiVersion,
                account: headers['Stripe-Account'],
                idempotency_key: headers['Idempotency-Key'],
                method,
                path,
                request_start_time: requestStartTime,
            });
            const requestRetries = numRetries || 0;
            const maxRetries = this._getMaxNetworkRetries(options.settings || {});
            this._stripe._emitter.emit('request', requestEvent);
            req
                .then((res) => {
                if (RequestSender._shouldRetry(res, requestRetries, maxRetries)) {
                    return retryRequest(makeRequest, apiVersion, headers, requestRetries, 
                    // @ts-ignore
                    res.getHeaders()['retry-after']);
                }
                else if (options.streaming && res.getStatusCode() < 400) {
                    return this._streamingResponseHandler(requestEvent, callback)(res);
                }
                else {
                    return this._jsonResponseHandler(requestEvent, callback)(res);
                }
            })
                .catch((error) => {
                if (RequestSender._shouldRetry(null, requestRetries, maxRetries, error)) {
                    return retryRequest(makeRequest, apiVersion, headers, requestRetries, null);
                }
                else {
                    const isTimeoutError = error.code && error.code === HttpClient.TIMEOUT_ERROR_CODE;
                    return callback(new StripeConnectionError({
                        message: isTimeoutError
                            ? `Request aborted due to timeout being reached (${timeout}ms)`
                            : RequestSender._generateConnectionErrorMessage(requestRetries),
                        // @ts-ignore
                        detail: error,
                    }));
                }
            });
        };
        const prepareAndMakeRequest = (error, data) => {
            if (error) {
                return callback(error);
            }
            requestData = data;
            this._stripe.getClientUserAgent((clientUserAgent) => {
                var _a, _b;
                const apiVersion = this._stripe.getApiField('version');
                const headers = this._makeHeaders(auth, requestData.length, apiVersion, clientUserAgent, method, (_a = options.headers) !== null && _a !== void 0 ? _a : null, (_b = options.settings) !== null && _b !== void 0 ? _b : {});
                makeRequest(apiVersion, headers, 0);
            });
        };
        if (requestDataProcessor) {
            requestDataProcessor(method, data, options.headers, prepareAndMakeRequest);
        }
        else {
            prepareAndMakeRequest(null, stringifyRequestData(data || {}));
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/Webhooks.js

function createWebhooks(platformFunctions) {
    const Webhook = {
        DEFAULT_TOLERANCE: 300,
        // @ts-ignore
        signature: null,
        constructEvent(payload, header, secret, tolerance, cryptoProvider) {
            this.signature.verifyHeader(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider);
            const jsonPayload = payload instanceof Uint8Array
                ? JSON.parse(new TextDecoder('utf8').decode(payload))
                : JSON.parse(payload);
            return jsonPayload;
        },
        async constructEventAsync(payload, header, secret, tolerance, cryptoProvider) {
            await this.signature.verifyHeaderAsync(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider);
            const jsonPayload = payload instanceof Uint8Array
                ? JSON.parse(new TextDecoder('utf8').decode(payload))
                : JSON.parse(payload);
            return jsonPayload;
        },
        /**
         * Generates a header to be used for webhook mocking
         *
         * @typedef {object} opts
         * @property {number} timestamp - Timestamp of the header. Defaults to Date.now()
         * @property {string} payload - JSON stringified payload object, containing the 'id' and 'object' parameters
         * @property {string} secret - Stripe webhook secret 'whsec_...'
         * @property {string} scheme - Version of API to hit. Defaults to 'v1'.
         * @property {string} signature - Computed webhook signature
         * @property {CryptoProvider} cryptoProvider - Crypto provider to use for computing the signature if none was provided. Defaults to NodeCryptoProvider.
         */
        generateTestHeaderString: function (opts) {
            if (!opts) {
                throw new StripeError({
                    message: 'Options are required',
                });
            }
            opts.timestamp =
                Math.floor(opts.timestamp) || Math.floor(Date.now() / 1000);
            opts.scheme = opts.scheme || signature.EXPECTED_SCHEME;
            opts.cryptoProvider = opts.cryptoProvider || getCryptoProvider();
            opts.signature =
                opts.signature ||
                    opts.cryptoProvider.computeHMACSignature(opts.timestamp + '.' + opts.payload, opts.secret);
            const generatedHeader = [
                't=' + opts.timestamp,
                opts.scheme + '=' + opts.signature,
            ].join(',');
            return generatedHeader;
        },
    };
    const signature = {
        EXPECTED_SCHEME: 'v1',
        verifyHeader(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider) {
            const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType, } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
            cryptoProvider = cryptoProvider || getCryptoProvider();
            const expectedSignature = cryptoProvider.computeHMACSignature(makeHMACContent(payload, details), secret);
            validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType);
            return true;
        },
        async verifyHeaderAsync(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider) {
            const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType, } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
            cryptoProvider = cryptoProvider || getCryptoProvider();
            const expectedSignature = await cryptoProvider.computeHMACSignatureAsync(makeHMACContent(payload, details), secret);
            return validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType);
        },
    };
    function makeHMACContent(payload, details) {
        return `${details.timestamp}.${payload}`;
    }
    function parseEventDetails(encodedPayload, encodedHeader, expectedScheme) {
        if (!encodedPayload) {
            throw new StripeSignatureVerificationError(encodedHeader, encodedPayload, {
                message: 'No webhook payload was provided.',
            });
        }
        const suspectPayloadType = typeof encodedPayload != 'string' &&
            !(encodedPayload instanceof Uint8Array);
        const textDecoder = new TextDecoder('utf8');
        const decodedPayload = encodedPayload instanceof Uint8Array
            ? textDecoder.decode(encodedPayload)
            : encodedPayload;
        // Express's type for `Request#headers` is `string | []string`
        // which is because the `set-cookie` header is an array,
        // but no other headers are an array (docs: https://nodejs.org/api/http.html#http_message_headers)
        // (Express's Request class is an extension of http.IncomingMessage, and doesn't appear to be relevantly modified: https://github.com/expressjs/express/blob/master/lib/request.js#L31)
        if (Array.isArray(encodedHeader)) {
            throw new Error('Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.');
        }
        if (encodedHeader == null || encodedHeader == '') {
            throw new StripeSignatureVerificationError(encodedHeader, encodedPayload, {
                message: 'No stripe-signature header value was provided.',
            });
        }
        const decodedHeader = encodedHeader instanceof Uint8Array
            ? textDecoder.decode(encodedHeader)
            : encodedHeader;
        const details = parseHeader(decodedHeader, expectedScheme);
        if (!details || details.timestamp === -1) {
            throw new StripeSignatureVerificationError(decodedHeader, decodedPayload, {
                message: 'Unable to extract timestamp and signatures from header',
            });
        }
        if (!details.signatures.length) {
            throw new StripeSignatureVerificationError(decodedHeader, decodedPayload, {
                message: 'No signatures found with expected scheme',
            });
        }
        return {
            decodedPayload,
            decodedHeader,
            details,
            suspectPayloadType,
        };
    }
    function validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType) {
        const signatureFound = !!details.signatures.filter(platformFunctions.secureCompare.bind(platformFunctions, expectedSignature)).length;
        if (!signatureFound) {
            if (suspectPayloadType) {
                throw new StripeSignatureVerificationError(header, payload, {
                    message: 'Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.' +
                        'Payload was provided as a parsed JavaScript object instead. \n' +
                        'Signature verification is impossible without access to the original signed material. \n' +
                        'Learn more about webhook signing and explore webhook integration examples for various frameworks at ' +
                        'https://github.com/stripe/stripe-node#webhook-signing',
                });
            }
            throw new StripeSignatureVerificationError(header, payload, {
                message: 'No signatures found matching the expected signature for payload.' +
                    ' Are you passing the raw request body you received from Stripe? \n' +
                    'Learn more about webhook signing and explore webhook integration examples for various frameworks at ' +
                    'https://github.com/stripe/stripe-node#webhook-signing',
            });
        }
        const timestampAge = Math.floor(Date.now() / 1000) - details.timestamp;
        if (tolerance > 0 && timestampAge > tolerance) {
            // @ts-ignore
            throw new StripeSignatureVerificationError(header, payload, {
                message: 'Timestamp outside the tolerance zone',
            });
        }
        return true;
    }
    function parseHeader(header, scheme) {
        if (typeof header !== 'string') {
            return null;
        }
        return header.split(',').reduce((accum, item) => {
            const kv = item.split('=');
            if (kv[0] === 't') {
                accum.timestamp = parseInt(kv[1], 10);
            }
            if (kv[0] === scheme) {
                accum.signatures.push(kv[1]);
            }
            return accum;
        }, {
            timestamp: -1,
            signatures: [],
        });
    }
    let webhooksCryptoProviderInstance = null;
    /**
     * Lazily instantiate a CryptoProvider instance. This is a stateless object
     * so a singleton can be used here.
     */
    function getCryptoProvider() {
        if (!webhooksCryptoProviderInstance) {
            webhooksCryptoProviderInstance = platformFunctions.createDefaultCryptoProvider();
        }
        return webhooksCryptoProviderInstance;
    }
    Webhook.signature = signature;
    return Webhook;
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/stripe.core.js









const DEFAULT_HOST = 'api.stripe.com';
const DEFAULT_PORT = '443';
const DEFAULT_BASE_PATH = '/v1/';
const DEFAULT_API_VERSION = ApiVersion;
const DEFAULT_TIMEOUT = 80000;
const MAX_NETWORK_RETRY_DELAY_SEC = 2;
const INITIAL_NETWORK_RETRY_DELAY_SEC = 0.5;
const APP_INFO_PROPERTIES = ['name', 'version', 'url', 'partner_id'];
const ALLOWED_CONFIG_PROPERTIES = [
    'apiVersion',
    'typescript',
    'maxNetworkRetries',
    'httpAgent',
    'httpClient',
    'timeout',
    'host',
    'port',
    'protocol',
    'telemetry',
    'appInfo',
    'stripeAccount',
];
const defaultRequestSenderFactory = (stripe) => new RequestSender(stripe, StripeResource.MAX_BUFFERED_REQUEST_METRICS);
function createStripe(platformFunctions, requestSender = defaultRequestSenderFactory) {
    Stripe.PACKAGE_VERSION = '12.1.0';
    Stripe.USER_AGENT = Object.assign({ bindings_version: Stripe.PACKAGE_VERSION, lang: 'node', publisher: 'stripe', uname: null, typescript: false }, determineProcessUserAgentProperties());
    Stripe.StripeResource = StripeResource;
    Stripe.resources = resources_namespaceObject;
    Stripe.HttpClient = HttpClient;
    Stripe.HttpClientResponse = HttpClientResponse;
    Stripe.CryptoProvider = CryptoProvider;
    function Stripe(key, config = {}) {
        if (!(this instanceof Stripe)) {
            return new Stripe(key, config);
        }
        const props = this._getPropsFromConfig(config);
        this._platformFunctions = platformFunctions;
        Object.defineProperty(this, '_emitter', {
            value: this._platformFunctions.createEmitter(),
            enumerable: false,
            configurable: false,
            writable: false,
        });
        this.VERSION = Stripe.PACKAGE_VERSION;
        this.on = this._emitter.on.bind(this._emitter);
        this.once = this._emitter.once.bind(this._emitter);
        this.off = this._emitter.removeListener.bind(this._emitter);
        if (props.protocol &&
            props.protocol !== 'https' &&
            (!props.host || /\.stripe\.com$/.test(props.host))) {
            throw new Error('The `https` protocol must be used when sending requests to `*.stripe.com`');
        }
        const agent = props.httpAgent || null;
        this._api = {
            auth: null,
            host: props.host || DEFAULT_HOST,
            port: props.port || DEFAULT_PORT,
            protocol: props.protocol || 'https',
            basePath: DEFAULT_BASE_PATH,
            version: props.apiVersion || DEFAULT_API_VERSION,
            timeout: validateInteger('timeout', props.timeout, DEFAULT_TIMEOUT),
            maxNetworkRetries: validateInteger('maxNetworkRetries', props.maxNetworkRetries, 0),
            agent: agent,
            httpClient: props.httpClient ||
                (agent
                    ? this._platformFunctions.createNodeHttpClient(agent)
                    : this._platformFunctions.createDefaultHttpClient()),
            dev: false,
            stripeAccount: props.stripeAccount || null,
        };
        const typescript = props.typescript || false;
        if (typescript !== Stripe.USER_AGENT.typescript) {
            // The mutation here is uncomfortable, but likely fastest;
            // serializing the user agent involves shelling out to the system,
            // and given some users may instantiate the library many times without switching between TS and non-TS,
            // we only want to incur the performance hit when that actually happens.
            Stripe.USER_AGENT.typescript = typescript;
        }
        if (props.appInfo) {
            this._setAppInfo(props.appInfo);
        }
        this._prepResources();
        this._setApiKey(key);
        this.errors = Error_namespaceObject;
        this.webhooks = createWebhooks(platformFunctions);
        this._prevRequestMetrics = [];
        this._enableTelemetry = props.telemetry !== false;
        this._requestSender = requestSender(this);
        // Expose StripeResource on the instance too
        // @ts-ignore
        this.StripeResource = Stripe.StripeResource;
    }
    Stripe.errors = Error_namespaceObject;
    Stripe.webhooks = createWebhooks;
    Stripe.createNodeHttpClient = platformFunctions.createNodeHttpClient;
    /**
     * Creates an HTTP client for issuing Stripe API requests which uses the Web
     * Fetch API.
     *
     * A fetch function can optionally be passed in as a parameter. If none is
     * passed, will default to the default `fetch` function in the global scope.
     */
    Stripe.createFetchHttpClient = platformFunctions.createFetchHttpClient;
    /**
     * Create a CryptoProvider which uses the built-in Node crypto libraries for
     * its crypto operations.
     */
    Stripe.createNodeCryptoProvider = platformFunctions.createNodeCryptoProvider;
    /**
     * Creates a CryptoProvider which uses the Subtle Crypto API from the Web
     * Crypto API spec for its crypto operations.
     *
     * A SubtleCrypto interface can optionally be passed in as a parameter. If none
     * is passed, will default to the default `crypto.subtle` object in the global
     * scope.
     */
    Stripe.createSubtleCryptoProvider =
        platformFunctions.createSubtleCryptoProvider;
    Stripe.prototype = {
        // Properties are set in the constructor above
        _appInfo: undefined,
        on: null,
        off: null,
        once: null,
        VERSION: null,
        StripeResource: null,
        webhooks: null,
        errors: null,
        _api: null,
        _prevRequestMetrics: null,
        _emitter: null,
        _enableTelemetry: null,
        _requestSender: null,
        _platformFunctions: null,
        /**
         * @private
         */
        _setApiKey(key) {
            if (key) {
                this._setApiField('auth', `Bearer ${key}`);
            }
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _setAppInfo(info) {
            if (info && typeof info !== 'object') {
                throw new Error('AppInfo must be an object.');
            }
            if (info && !info.name) {
                throw new Error('AppInfo.name is required');
            }
            info = info || {};
            this._appInfo = APP_INFO_PROPERTIES.reduce((accum, prop) => {
                if (typeof info[prop] == 'string') {
                    accum = accum || {};
                    accum[prop] = info[prop];
                }
                return accum;
            }, 
            // @ts-ignore
            undefined);
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _setApiField(key, value) {
            this._api[key] = value;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */
        getApiField(key) {
            return this._api[key];
        },
        setClientId(clientId) {
            this._clientId = clientId;
        },
        getClientId() {
            return this._clientId;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */
        getConstant: (c) => {
            switch (c) {
                case 'DEFAULT_HOST':
                    return DEFAULT_HOST;
                case 'DEFAULT_PORT':
                    return DEFAULT_PORT;
                case 'DEFAULT_BASE_PATH':
                    return DEFAULT_BASE_PATH;
                case 'DEFAULT_API_VERSION':
                    return DEFAULT_API_VERSION;
                case 'DEFAULT_TIMEOUT':
                    return DEFAULT_TIMEOUT;
                case 'MAX_NETWORK_RETRY_DELAY_SEC':
                    return MAX_NETWORK_RETRY_DELAY_SEC;
                case 'INITIAL_NETWORK_RETRY_DELAY_SEC':
                    return INITIAL_NETWORK_RETRY_DELAY_SEC;
            }
            return Stripe[c];
        },
        getMaxNetworkRetries() {
            return this.getApiField('maxNetworkRetries');
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _setApiNumberField(prop, n, defaultVal) {
            const val = validateInteger(prop, n, defaultVal);
            this._setApiField(prop, val);
        },
        getMaxNetworkRetryDelay() {
            return MAX_NETWORK_RETRY_DELAY_SEC;
        },
        getInitialNetworkRetryDelay() {
            return INITIAL_NETWORK_RETRY_DELAY_SEC;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         *
         * Gets a JSON version of a User-Agent and uses a cached version for a slight
         * speed advantage.
         */
        getClientUserAgent(cb) {
            return this.getClientUserAgentSeeded(Stripe.USER_AGENT, cb);
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         *
         * Gets a JSON version of a User-Agent by encoding a seeded object and
         * fetching a uname from the system.
         */
        getClientUserAgentSeeded(seed, cb) {
            this._platformFunctions.getUname().then((uname) => {
                var _a;
                const userAgent = {};
                for (const field in seed) {
                    userAgent[field] = encodeURIComponent((_a = seed[field]) !== null && _a !== void 0 ? _a : 'null');
                }
                // URI-encode in case there are unusual characters in the system's uname.
                userAgent.uname = encodeURIComponent(uname || 'UNKNOWN');
                const client = this.getApiField('httpClient');
                if (client) {
                    userAgent.httplib = encodeURIComponent(client.getClientName());
                }
                if (this._appInfo) {
                    userAgent.application = this._appInfo;
                }
                cb(JSON.stringify(userAgent));
            });
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */
        getAppInfoAsString() {
            if (!this._appInfo) {
                return '';
            }
            let formatted = this._appInfo.name;
            if (this._appInfo.version) {
                formatted += `/${this._appInfo.version}`;
            }
            if (this._appInfo.url) {
                formatted += ` (${this._appInfo.url})`;
            }
            return formatted;
        },
        getTelemetryEnabled() {
            return this._enableTelemetry;
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _prepResources() {
            for (const name in resources_namespaceObject) {
                // @ts-ignore
                this[pascalToCamelCase(name)] = new resources_namespaceObject[name](this);
            }
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _getPropsFromConfig(config) {
            // If config is null or undefined, just bail early with no props
            if (!config) {
                return {};
            }
            // config can be an object or a string
            const isString = typeof config === 'string';
            const isObject = config === Object(config) && !Array.isArray(config);
            if (!isObject && !isString) {
                throw new Error('Config must either be an object or a string');
            }
            // If config is a string, we assume the old behavior of passing in a string representation of the api version
            if (isString) {
                return {
                    apiVersion: config,
                };
            }
            // If config is an object, we assume the new behavior and make sure it doesn't contain any unexpected values
            const values = Object.keys(config).filter((value) => !ALLOWED_CONFIG_PROPERTIES.includes(value));
            if (values.length > 0) {
                throw new Error(`Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(', ')}`);
            }
            return config;
        },
    };
    return Stripe;
}

;// CONCATENATED MODULE: ./node_modules/stripe/esm/stripe.esm.node.js


const Stripe = createStripe(new NodePlatformFunctions());
/* harmony default export */ const stripe_esm_node = (Stripe);


/***/ })

};
;