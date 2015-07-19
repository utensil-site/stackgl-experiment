/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1);
	__webpack_require__(5);
	//require('./vendor/bootcards-1.1.2/css/bootcards-desktop.min.css');
	__webpack_require__(14);
	__webpack_require__(16);
	__webpack_require__(19);
	//require('script!./vendor/bootcards-1.1.2/js/bootcards.min.js');

	//Initialize shell
	var glNow = __webpack_require__(21);
	var createShader = __webpack_require__(39);
	var createBuffer = __webpack_require__(48);
	var createVAO = __webpack_require__(64);
	var divideTriangle = __webpack_require__(68);
	var drawTriangles = __webpack_require__(98);

	var config = {
	  level: 5,
	  degrees: 90,
	  animation: true,
	  wireframe: true,
	  gasket: false
	};

	drawTriangles("main", config);

	$("#refresh").click(function () {
	  var level = $("#tessellation-level").val();
	  var degrees = $("#twist-degree").val();

	  config.level = /\d+/.test(level) ? parseInt(level) : 5;
	  config.degrees = /\d+/.test(degrees) ? parseInt(degrees) : 90;
	  config.animation = $("#whether-animation").is(":checked") == true;
	  config.wireframe = $("#whether-wireframe").is(":checked") == true;
	  config.gasket = $("#whether-gasket").is(":checked") == true;

	  console.log($("#whether-animation").attr("checked"));

	  try {
	    drawTriangles("main", config);
	  } catch (e) {
	    console.error(e);
	  } finally {}

	  return false;
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel/polyfill is allowed");
	}
	global._babelPolyfill = true;

	__webpack_require__(3);

	__webpack_require__(4);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Core.js 0.6.1
	 * https://github.com/zloirock/core-js
	 * License: http://rock.mit-license.org
	 * © 2015 Denis Pushkarev
	 */
	!function(global, framework, undefined){
	'use strict';

	/******************************************************************************
	 * Module : common                                                            *
	 ******************************************************************************/

	  // Shortcuts for [[Class]] & property names
	var OBJECT          = 'Object'
	  , FUNCTION        = 'Function'
	  , ARRAY           = 'Array'
	  , STRING          = 'String'
	  , NUMBER          = 'Number'
	  , REGEXP          = 'RegExp'
	  , DATE            = 'Date'
	  , MAP             = 'Map'
	  , SET             = 'Set'
	  , WEAKMAP         = 'WeakMap'
	  , WEAKSET         = 'WeakSet'
	  , SYMBOL          = 'Symbol'
	  , PROMISE         = 'Promise'
	  , MATH            = 'Math'
	  , ARGUMENTS       = 'Arguments'
	  , PROTOTYPE       = 'prototype'
	  , CONSTRUCTOR     = 'constructor'
	  , TO_STRING       = 'toString'
	  , TO_STRING_TAG   = TO_STRING + 'Tag'
	  , TO_LOCALE       = 'toLocaleString'
	  , HAS_OWN         = 'hasOwnProperty'
	  , FOR_EACH        = 'forEach'
	  , ITERATOR        = 'iterator'
	  , FF_ITERATOR     = '@@' + ITERATOR
	  , PROCESS         = 'process'
	  , CREATE_ELEMENT  = 'createElement'
	  // Aliases global objects and prototypes
	  , Function        = global[FUNCTION]
	  , Object          = global[OBJECT]
	  , Array           = global[ARRAY]
	  , String          = global[STRING]
	  , Number          = global[NUMBER]
	  , RegExp          = global[REGEXP]
	  , Date            = global[DATE]
	  , Map             = global[MAP]
	  , Set             = global[SET]
	  , WeakMap         = global[WEAKMAP]
	  , WeakSet         = global[WEAKSET]
	  , Symbol          = global[SYMBOL]
	  , Math            = global[MATH]
	  , TypeError       = global.TypeError
	  , RangeError      = global.RangeError
	  , setTimeout      = global.setTimeout
	  , setImmediate    = global.setImmediate
	  , clearImmediate  = global.clearImmediate
	  , parseInt        = global.parseInt
	  , isFinite        = global.isFinite
	  , process         = global[PROCESS]
	  , nextTick        = process && process.nextTick
	  , document        = global.document
	  , html            = document && document.documentElement
	  , navigator       = global.navigator
	  , define          = global.define
	  , console         = global.console || {}
	  , ArrayProto      = Array[PROTOTYPE]
	  , ObjectProto     = Object[PROTOTYPE]
	  , FunctionProto   = Function[PROTOTYPE]
	  , Infinity        = 1 / 0
	  , DOT             = '.';

	// http://jsperf.com/core-js-isobject
	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	// Native function?
	var isNative = ctx(/./.test, /\[native code\]\s*\}\s*$/, 1);

	// Object internal [[Class]] or toStringTag
	// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring
	var toString = ObjectProto[TO_STRING];
	function setToStringTag(it, tag, stat){
	  if(it && !has(it = stat ? it : it[PROTOTYPE], SYMBOL_TAG))hidden(it, SYMBOL_TAG, tag);
	}
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	function classof(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[SYMBOL_TAG]) == 'string' ? T : cof(O);
	}

	// Function
	var call  = FunctionProto.call
	  , apply = FunctionProto.apply
	  , REFERENCE_GET;
	// Partial apply
	function part(/* ...args */){
	  var fn     = assertFunction(this)
	    , length = arguments.length
	    , args   = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((args[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that    = this
	      , _length = arguments.length
	      , i = 0, j = 0, _args;
	    if(!holder && !_length)return invoke(fn, args, that);
	    _args = args.slice();
	    if(holder)for(;length > i; i++)if(_args[i] === _)_args[i] = arguments[j++];
	    while(_length > j)_args.push(arguments[j++]);
	    return invoke(fn, _args, that);
	  }
	}
	// Optional / simple context binding
	function ctx(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    }
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    }
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    }
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	  }
	}
	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	function invoke(fn, args, that){
	  var un = that === undefined;
	  switch(args.length | 0){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	}

	// Object:
	var create           = Object.create
	  , getPrototypeOf   = Object.getPrototypeOf
	  , setPrototypeOf   = Object.setPrototypeOf
	  , defineProperty   = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , getOwnDescriptor = Object.getOwnPropertyDescriptor
	  , getKeys          = Object.keys
	  , getNames         = Object.getOwnPropertyNames
	  , getSymbols       = Object.getOwnPropertySymbols
	  , isFrozen         = Object.isFrozen
	  , has              = ctx(call, ObjectProto[HAS_OWN], 2)
	  // Dummy, fix for not array-like ES3 string in es5 module
	  , ES5Object        = Object
	  , Dict;
	function toObject(it){
	  return ES5Object(assertDefined(it));
	}
	function returnIt(it){
	  return it;
	}
	function returnThis(){
	  return this;
	}
	function get(object, key){
	  if(has(object, key))return object[key];
	}
	function ownKeys(it){
	  assertObject(it);
	  return getSymbols ? getNames(it).concat(getSymbols(it)) : getNames(it);
	}
	// 19.1.2.1 Object.assign(target, source, ...)
	var assign = Object.assign || function(target, source){
	  var T = Object(assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = ES5Object(arguments[i++])
	      , keys   = getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	}
	function keyOf(object, el){
	  var O      = toObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	}

	// Array
	// array('str1,str2,str3') => ['str1', 'str2', 'str3']
	function array(it){
	  return String(it).split(',');
	}
	var push    = ArrayProto.push
	  , unshift = ArrayProto.unshift
	  , slice   = ArrayProto.slice
	  , splice  = ArrayProto.splice
	  , indexOf = ArrayProto.indexOf
	  , forEach = ArrayProto[FOR_EACH];
	/*
	 * 0 -> forEach
	 * 1 -> map
	 * 2 -> filter
	 * 3 -> some
	 * 4 -> every
	 * 5 -> find
	 * 6 -> findIndex
	 */
	function createArrayMethod(type){
	  var isMap       = type == 1
	    , isFilter    = type == 2
	    , isSome      = type == 3
	    , isEvery     = type == 4
	    , isFindIndex = type == 6
	    , noholes     = type == 5 || isFindIndex;
	  return function(callbackfn/*, that = undefined */){
	    var O      = Object(assertDefined(this))
	      , that   = arguments[1]
	      , self   = ES5Object(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = isMap ? Array(length) : isFilter ? [] : undefined
	      , val, res;
	    for(;length > index; index++)if(noholes || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(type){
	        if(isMap)result[index] = res;             // map
	        else if(res)switch(type){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(isEvery)return false;           // every
	      }
	    }
	    return isFindIndex ? -1 : isSome || isEvery ? isEvery : result;
	  }
	}
	function createArrayContains(isContains){
	  return function(el /*, fromIndex = 0 */){
	    var O      = toObject(this)
	      , length = toLength(O.length)
	      , index  = toIndex(arguments[1], length);
	    if(isContains && el != el){
	      for(;length > index; index++)if(sameNaN(O[index]))return isContains || index;
	    } else for(;length > index; index++)if(isContains || index in O){
	      if(O[index] === el)return isContains || index;
	    } return !isContains && -1;
	  }
	}
	function generic(A, B){
	  // strange IE quirks mode bug -> use typeof vs isFunction
	  return typeof A == 'function' ? A : B;
	}

	// Math
	var MAX_SAFE_INTEGER = 0x1fffffffffffff // pow(2, 53) - 1 == 9007199254740991
	  , pow    = Math.pow
	  , abs    = Math.abs
	  , ceil   = Math.ceil
	  , floor  = Math.floor
	  , max    = Math.max
	  , min    = Math.min
	  , random = Math.random
	  , trunc  = Math.trunc || function(it){
	      return (it > 0 ? floor : ceil)(it);
	    }
	// 20.1.2.4 Number.isNaN(number)
	function sameNaN(number){
	  return number != number;
	}
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it) ? 0 : trunc(it);
	}
	// 7.1.15 ToLength
	function toLength(it){
	  return it > 0 ? min(toInteger(it), MAX_SAFE_INTEGER) : 0;
	}
	function toIndex(index, length){
	  var index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	}
	function lz(num){
	  return num > 9 ? num : '0' + num;
	}

	function createReplacer(regExp, replace, isStatic){
	  var replacer = isObject(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(isStatic ? it : this).replace(regExp, replacer);
	  }
	}
	function createPointAt(toString){
	  return function(pos){
	    var s = String(assertDefined(this))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return toString ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? toString ? s.charAt(i) : a
	      : toString ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  }
	}

	// Assertion & errors
	var REDUCE_ERROR = 'Reduce of empty object with no initial value';
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError('Function called on null or undefined');
	  return it;
	}
	function assertFunction(it){
	  assert(isFunction(it), it, ' is not a function!');
	  return it;
	}
	function assertObject(it){
	  assert(isObject(it), it, ' is not an object!');
	  return it;
	}
	function assertInstance(it, Constructor, name){
	  assert(it instanceof Constructor, name, ": use the 'new' operator!");
	}

	// Property descriptors & Symbol
	function descriptor(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  }
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return defineProperty(object, key, descriptor(bitmap, value));
	  } : simpleSet;
	}
	function uid(key){
	  return SYMBOL + '(' + key + ')_' + (++sid + random())[TO_STRING](36);
	}
	function getWellKnownSymbol(name, setter){
	  return (Symbol && Symbol[name]) || (setter ? Symbol : safeSymbol)(SYMBOL + DOT + name);
	}
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	      try {
	        return defineProperty({}, 'a', {get: function(){ return 2 }}).a == 2;
	      } catch(e){}
	    }()
	  , sid    = 0
	  , hidden = createDefiner(1)
	  , set    = Symbol ? simpleSet : hidden
	  , safeSymbol = Symbol || uid;
	function assignHidden(target, src){
	  for(var key in src)hidden(target, key, src[key]);
	  return target;
	}

	var SYMBOL_UNSCOPABLES = getWellKnownSymbol('unscopables')
	  , ArrayUnscopables   = ArrayProto[SYMBOL_UNSCOPABLES] || {}
	  , SYMBOL_TAG         = getWellKnownSymbol(TO_STRING_TAG)
	  , SYMBOL_SPECIES     = getWellKnownSymbol('species')
	  , SYMBOL_ITERATOR;
	function setSpecies(C){
	  if(DESC && (framework || !isNative(C)))defineProperty(C, SYMBOL_SPECIES, {
	    configurable: true,
	    get: returnThis
	  });
	}

	/******************************************************************************
	 * Module : common.export                                                     *
	 ******************************************************************************/

	var NODE = cof(process) == PROCESS
	  , core = {}
	  , path = framework ? global : core
	  , old  = global.core
	  , exportGlobal
	  // type bitmap
	  , FORCED = 1
	  , GLOBAL = 2
	  , STATIC = 4
	  , PROTO  = 8
	  , BIND   = 16
	  , WRAP   = 32;
	function $define(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & GLOBAL
	    , target   = isGlobal ? global : (type & STATIC)
	        ? global[name] : (global[name] || ObjectProto)[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // there is a similar native
	    own = !(type & FORCED) && target && key in target
	      && (!isFunction(target[key]) || isNative(target[key]));
	    // export native or passed
	    out = (own ? target : source)[key];
	    // prevent global pollution for namespaces
	    if(!framework && isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & BIND && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & WRAP && !framework && target[key] == out){
	      exp = function(param){
	        return this instanceof out ? new out(param) : out(param);
	      }
	      exp[PROTOTYPE] = out[PROTOTYPE];
	    } else exp = type & PROTO && isFunction(out) ? ctx(call, out) : out;
	    // extend global
	    if(framework && target && !own){
	      if(isGlobal)target[key] = out;
	      else delete target[key] && hidden(target, key, out);
	    }
	    // export
	    if(exports[key] != out)hidden(exports, key, exp);
	  }
	}
	// CommonJS export
	if(typeof module != 'undefined' && module.exports)module.exports = core;
	// RequireJS export
	else if(isFunction(define) && define.amd)define(function(){return core});
	// Export to global object
	else exportGlobal = true;
	if(exportGlobal || framework){
	  core.noConflict = function(){
	    global.core = old;
	    return core;
	  }
	  global.core = core;
	}

	/******************************************************************************
	 * Module : common.iterators                                                  *
	 ******************************************************************************/

	SYMBOL_ITERATOR = getWellKnownSymbol(ITERATOR);
	var ITER  = safeSymbol('iter')
	  , KEY   = 1
	  , VALUE = 2
	  , Iterators = {}
	  , IteratorPrototype = {}
	    // Safari has byggy iterators w/o `next`
	  , BUGGY_ITERATORS = 'keys' in ArrayProto && !('next' in [].keys());
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, returnThis);
	function setIterator(O, value){
	  hidden(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  FF_ITERATOR in ArrayProto && hidden(O, FF_ITERATOR, value);
	}
	function createIterator(Constructor, NAME, next, proto){
	  Constructor[PROTOTYPE] = create(proto || IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	}
	function defineIterator(Constructor, NAME, value, DEFAULT){
	  var proto = Constructor[PROTOTYPE]
	    , iter  = get(proto, SYMBOL_ITERATOR) || get(proto, FF_ITERATOR) || (DEFAULT && get(proto, DEFAULT)) || value;
	  if(framework){
	    // Define iterator
	    setIterator(proto, iter);
	    if(iter !== value){
	      var iterProto = getPrototypeOf(iter.call(new Constructor));
	      // Set @@toStringTag to native iterators
	      setToStringTag(iterProto, NAME + ' Iterator', true);
	      // FF fix
	      has(proto, FF_ITERATOR) && setIterator(iterProto, returnThis);
	    }
	  }
	  // Plug for library
	  Iterators[NAME] = iter;
	  // FF & v8 fix
	  Iterators[NAME + ' Iterator'] = returnThis;
	  return iter;
	}
	function defineStdIterators(Base, NAME, Constructor, next, DEFAULT, IS_SET){
	  function createIter(kind){
	    return function(){
	      return new Constructor(this, kind);
	    }
	  }
	  createIterator(Constructor, NAME, next);
	  var entries = createIter(KEY+VALUE)
	    , values  = createIter(VALUE);
	  if(DEFAULT == VALUE)values = defineIterator(Base, NAME, values, 'values');
	  else entries = defineIterator(Base, NAME, entries, 'entries');
	  if(DEFAULT){
	    $define(PROTO + FORCED * BUGGY_ITERATORS, NAME, {
	      entries: entries,
	      keys: IS_SET ? values : createIter(KEY),
	      values: values
	    });
	  }
	}
	function iterResult(done, value){
	  return {value: value, done: !!done};
	}
	function isIterable(it){
	  var O      = Object(it)
	    , Symbol = global[SYMBOL]
	    , hasExt = (Symbol && Symbol[ITERATOR] || FF_ITERATOR) in O;
	  return hasExt || SYMBOL_ITERATOR in O || has(Iterators, classof(O));
	}
	function getIterator(it){
	  var Symbol  = global[SYMBOL]
	    , ext     = it[Symbol && Symbol[ITERATOR] || FF_ITERATOR]
	    , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[classof(it)];
	  return assertObject(getIter.call(it));
	}
	function stepCall(fn, value, entries){
	  return entries ? invoke(fn, value) : fn(value);
	}
	function checkDangerIterClosing(fn){
	  var danger = true;
	  var O = {
	    next: function(){ throw 1 },
	    'return': function(){ danger = false }
	  };
	  O[SYMBOL_ITERATOR] = returnThis;
	  try {
	    fn(O);
	  } catch(e){}
	  return danger;
	}
	function closeIterator(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)ret.call(iterator);
	}
	function safeIterClose(exec, iterator){
	  try {
	    exec(iterator);
	  } catch(e){
	    closeIterator(iterator);
	    throw e;
	  }
	}
	function forOf(iterable, entries, fn, that){
	  safeIterClose(function(iterator){
	    var f = ctx(fn, that, entries ? 2 : 1)
	      , step;
	    while(!(step = iterator.next()).done)if(stepCall(f, step.value, entries) === false){
	      return closeIterator(iterator);
	    }
	  }, getIterator(iterable));
	}

	/******************************************************************************
	 * Module : es6.symbol                                                        *
	 ******************************************************************************/

	// ECMAScript 6 symbols shim
	!function(TAG, SymbolRegistry, AllSymbols, setter){
	  // 19.4.1.1 Symbol([description])
	  if(!isNative(Symbol)){
	    Symbol = function(description){
	      assert(!(this instanceof Symbol), SYMBOL + ' is not a ' + CONSTRUCTOR);
	      var tag = uid(description)
	        , sym = set(create(Symbol[PROTOTYPE]), TAG, tag);
	      AllSymbols[tag] = sym;
	      DESC && setter && defineProperty(ObjectProto, tag, {
	        configurable: true,
	        set: function(value){
	          hidden(this, tag, value);
	        }
	      });
	      return sym;
	    }
	    hidden(Symbol[PROTOTYPE], TO_STRING, function(){
	      return this[TAG];
	    });
	  }
	  $define(GLOBAL + WRAP, {Symbol: Symbol});
	  
	  var symbolStatics = {
	    // 19.4.2.1 Symbol.for(key)
	    'for': function(key){
	      return has(SymbolRegistry, key += '')
	        ? SymbolRegistry[key]
	        : SymbolRegistry[key] = Symbol(key);
	    },
	    // 19.4.2.4 Symbol.iterator
	    iterator: SYMBOL_ITERATOR || getWellKnownSymbol(ITERATOR),
	    // 19.4.2.5 Symbol.keyFor(sym)
	    keyFor: part.call(keyOf, SymbolRegistry),
	    // 19.4.2.10 Symbol.species
	    species: SYMBOL_SPECIES,
	    // 19.4.2.13 Symbol.toStringTag
	    toStringTag: SYMBOL_TAG = getWellKnownSymbol(TO_STRING_TAG, true),
	    // 19.4.2.14 Symbol.unscopables
	    unscopables: SYMBOL_UNSCOPABLES,
	    pure: safeSymbol,
	    set: set,
	    useSetter: function(){setter = true},
	    useSimple: function(){setter = false}
	  };
	  // 19.4.2.2 Symbol.hasInstance
	  // 19.4.2.3 Symbol.isConcatSpreadable
	  // 19.4.2.6 Symbol.match
	  // 19.4.2.8 Symbol.replace
	  // 19.4.2.9 Symbol.search
	  // 19.4.2.11 Symbol.split
	  // 19.4.2.12 Symbol.toPrimitive
	  forEach.call(array('hasInstance,isConcatSpreadable,match,replace,search,split,toPrimitive'),
	    function(it){
	      symbolStatics[it] = getWellKnownSymbol(it);
	    }
	  );
	  $define(STATIC, SYMBOL, symbolStatics);
	  
	  setToStringTag(Symbol, SYMBOL);
	  
	  $define(STATIC + FORCED * !isNative(Symbol), OBJECT, {
	    // 19.1.2.7 Object.getOwnPropertyNames(O)
	    getOwnPropertyNames: function(it){
	      var names = getNames(toObject(it)), result = [], key, i = 0;
	      while(names.length > i)has(AllSymbols, key = names[i++]) || result.push(key);
	      return result;
	    },
	    // 19.1.2.8 Object.getOwnPropertySymbols(O)
	    getOwnPropertySymbols: function(it){
	      var names = getNames(toObject(it)), result = [], key, i = 0;
	      while(names.length > i)has(AllSymbols, key = names[i++]) && result.push(AllSymbols[key]);
	      return result;
	    }
	  });
	  
	  // 20.2.1.9 Math[@@toStringTag]
	  setToStringTag(Math, MATH, true);
	  // 24.3.3 JSON[@@toStringTag]
	  setToStringTag(global.JSON, 'JSON', true);
	}(safeSymbol('tag'), {}, {}, true);

	/******************************************************************************
	 * Module : es6.object.statics                                                *
	 ******************************************************************************/

	!function(){
	  var objectStatic = {
	    // 19.1.3.1 Object.assign(target, source)
	    assign: assign,
	    // 19.1.3.10 Object.is(value1, value2)
	    is: function(x, y){
	      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	    }
	  };
	  // 19.1.3.19 Object.setPrototypeOf(O, proto)
	  // Works with __proto__ only. Old v8 can't works with null proto objects.
	  '__proto__' in ObjectProto && function(buggy, set){
	    try {
	      set = ctx(call, getOwnDescriptor(ObjectProto, '__proto__').set, 2);
	      set({}, ArrayProto);
	    } catch(e){ buggy = true }
	    objectStatic.setPrototypeOf = setPrototypeOf = setPrototypeOf || function(O, proto){
	      assertObject(O);
	      assert(proto === null || isObject(proto), proto, ": can't set as prototype!");
	      if(buggy)O.__proto__ = proto;
	      else set(O, proto);
	      return O;
	    }
	  }();
	  $define(STATIC, OBJECT, objectStatic);
	}();

	/******************************************************************************
	 * Module : es6.object.prototype                                              *
	 ******************************************************************************/

	!function(tmp){
	  // 19.1.3.6 Object.prototype.toString()
	  tmp[SYMBOL_TAG] = DOT;
	  if(cof(tmp) != DOT)hidden(ObjectProto, TO_STRING, function(){
	    return '[object ' + classof(this) + ']';
	  });
	}({});

	/******************************************************************************
	 * Module : es6.object.statics-accept-primitives                              *
	 ******************************************************************************/

	!function(){
	  // Object static methods accept primitives
	  function wrapObjectMethod(key, MODE){
	    var fn  = Object[key]
	      , exp = core[OBJECT][key]
	      , f   = 0
	      , o   = {};
	    if(!exp || isNative(exp)){
	      o[key] = MODE == 1 ? function(it){
	        return isObject(it) ? fn(it) : it;
	      } : MODE == 2 ? function(it){
	        return isObject(it) ? fn(it) : true;
	      } : MODE == 3 ? function(it){
	        return isObject(it) ? fn(it) : false;
	      } : MODE == 4 ? function(it, key){
	        return fn(toObject(it), key);
	      } : function(it){
	        return fn(toObject(it));
	      };
	      try { fn(DOT) }
	      catch(e){ f = 1 }
	      $define(STATIC + FORCED * f, OBJECT, o);
	    }
	  }
	  wrapObjectMethod('freeze', 1);
	  wrapObjectMethod('seal', 1);
	  wrapObjectMethod('preventExtensions', 1);
	  wrapObjectMethod('isFrozen', 2);
	  wrapObjectMethod('isSealed', 2);
	  wrapObjectMethod('isExtensible', 3);
	  wrapObjectMethod('getOwnPropertyDescriptor', 4);
	  wrapObjectMethod('getPrototypeOf');
	  wrapObjectMethod('keys');
	  wrapObjectMethod('getOwnPropertyNames');
	}();

	/******************************************************************************
	 * Module : es6.function                                                      *
	 ******************************************************************************/

	!function(NAME){
	  // 19.2.4.2 name
	  NAME in FunctionProto || (DESC && defineProperty(FunctionProto, NAME, {
	    configurable: true,
	    get: function(){
	      var match = String(this).match(/^\s*function ([^ (]*)/)
	        , name  = match ? match[1] : '';
	      has(this, NAME) || defineProperty(this, NAME, descriptor(5, name));
	      return name;
	    },
	    set: function(value){
	      has(this, NAME) || defineProperty(this, NAME, descriptor(0, value));
	    }
	  }));
	}('name');

	/******************************************************************************
	 * Module : es6.number.constructor                                            *
	 ******************************************************************************/

	Number('0o1') && Number('0b1') || function(_Number, NumberProto){
	  function toNumber(it){
	    if(isObject(it))it = toPrimitive(it);
	    if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
	      var binary = false;
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : binary = true;
	        case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
	      }
	    } return +it;
	  }
	  function toPrimitive(it){
	    var fn, val;
	    if(isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))return val;
	    if(isFunction(fn = it[TO_STRING]) && !isObject(val = fn.call(it)))return val;
	    throw TypeError("Can't convert object to number");
	  }
	  Number = function Number(it){
	    return this instanceof Number ? new _Number(toNumber(it)) : toNumber(it);
	  }
	  forEach.call(DESC ? getNames(_Number)
	  : array('MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY'), function(key){
	    key in Number || defineProperty(Number, key, getOwnDescriptor(_Number, key));
	  });
	  Number[PROTOTYPE] = NumberProto;
	  NumberProto[CONSTRUCTOR] = Number;
	  hidden(global, NUMBER, Number);
	}(Number, Number[PROTOTYPE]);

	/******************************************************************************
	 * Module : es6.number.statics                                                *
	 ******************************************************************************/

	!function(isInteger){
	  $define(STATIC, NUMBER, {
	    // 20.1.2.1 Number.EPSILON
	    EPSILON: pow(2, -52),
	    // 20.1.2.2 Number.isFinite(number)
	    isFinite: function(it){
	      return typeof it == 'number' && isFinite(it);
	    },
	    // 20.1.2.3 Number.isInteger(number)
	    isInteger: isInteger,
	    // 20.1.2.4 Number.isNaN(number)
	    isNaN: sameNaN,
	    // 20.1.2.5 Number.isSafeInteger(number)
	    isSafeInteger: function(number){
	      return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
	    },
	    // 20.1.2.6 Number.MAX_SAFE_INTEGER
	    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
	    // 20.1.2.10 Number.MIN_SAFE_INTEGER
	    MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
	    // 20.1.2.12 Number.parseFloat(string)
	    parseFloat: parseFloat,
	    // 20.1.2.13 Number.parseInt(string, radix)
	    parseInt: parseInt
	  });
	// 20.1.2.3 Number.isInteger(number)
	}(Number.isInteger || function(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	});

	/******************************************************************************
	 * Module : es6.math                                                          *
	 ******************************************************************************/

	// ECMAScript 6 shim
	!function(){
	  // 20.2.2.28 Math.sign(x)
	  var E    = Math.E
	    , exp  = Math.exp
	    , log  = Math.log
	    , sqrt = Math.sqrt
	    , sign = Math.sign || function(x){
	        return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	      };
	  
	  // 20.2.2.5 Math.asinh(x)
	  function asinh(x){
	    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
	  }
	  // 20.2.2.14 Math.expm1(x)
	  function expm1(x){
	    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
	  }
	    
	  $define(STATIC, MATH, {
	    // 20.2.2.3 Math.acosh(x)
	    acosh: function(x){
	      return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
	    },
	    // 20.2.2.5 Math.asinh(x)
	    asinh: asinh,
	    // 20.2.2.7 Math.atanh(x)
	    atanh: function(x){
	      return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
	    },
	    // 20.2.2.9 Math.cbrt(x)
	    cbrt: function(x){
	      return sign(x = +x) * pow(abs(x), 1 / 3);
	    },
	    // 20.2.2.11 Math.clz32(x)
	    clz32: function(x){
	      return (x >>>= 0) ? 32 - x[TO_STRING](2).length : 32;
	    },
	    // 20.2.2.12 Math.cosh(x)
	    cosh: function(x){
	      return (exp(x = +x) + exp(-x)) / 2;
	    },
	    // 20.2.2.14 Math.expm1(x)
	    expm1: expm1,
	    // 20.2.2.16 Math.fround(x)
	    // TODO: fallback for IE9-
	    fround: function(x){
	      return new Float32Array([x])[0];
	    },
	    // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	    hypot: function(value1, value2){
	      var sum  = 0
	        , len1 = arguments.length
	        , len2 = len1
	        , args = Array(len1)
	        , larg = -Infinity
	        , arg;
	      while(len1--){
	        arg = args[len1] = +arguments[len1];
	        if(arg == Infinity || arg == -Infinity)return Infinity;
	        if(arg > larg)larg = arg;
	      }
	      larg = arg || 1;
	      while(len2--)sum += pow(args[len2] / larg, 2);
	      return larg * sqrt(sum);
	    },
	    // 20.2.2.18 Math.imul(x, y)
	    imul: function(x, y){
	      var UInt16 = 0xffff
	        , xn = +x
	        , yn = +y
	        , xl = UInt16 & xn
	        , yl = UInt16 & yn;
	      return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
	    },
	    // 20.2.2.20 Math.log1p(x)
	    log1p: function(x){
	      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
	    },
	    // 20.2.2.21 Math.log10(x)
	    log10: function(x){
	      return log(x) / Math.LN10;
	    },
	    // 20.2.2.22 Math.log2(x)
	    log2: function(x){
	      return log(x) / Math.LN2;
	    },
	    // 20.2.2.28 Math.sign(x)
	    sign: sign,
	    // 20.2.2.30 Math.sinh(x)
	    sinh: function(x){
	      return (abs(x = +x) < 1) ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
	    },
	    // 20.2.2.33 Math.tanh(x)
	    tanh: function(x){
	      var a = expm1(x = +x)
	        , b = expm1(-x);
	      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	    },
	    // 20.2.2.34 Math.trunc(x)
	    trunc: trunc
	  });
	}();

	/******************************************************************************
	 * Module : es6.string                                                        *
	 ******************************************************************************/

	!function(fromCharCode){
	  function assertNotRegExp(it){
	    if(cof(it) == REGEXP)throw TypeError();
	  }
	  
	  $define(STATIC, STRING, {
	    // 21.1.2.2 String.fromCodePoint(...codePoints)
	    fromCodePoint: function(x){
	      var res = []
	        , len = arguments.length
	        , i   = 0
	        , code
	      while(len > i){
	        code = +arguments[i++];
	        if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	        res.push(code < 0x10000
	          ? fromCharCode(code)
	          : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	        );
	      } return res.join('');
	    },
	    // 21.1.2.4 String.raw(callSite, ...substitutions)
	    raw: function(callSite){
	      var raw = toObject(callSite.raw)
	        , len = toLength(raw.length)
	        , sln = arguments.length
	        , res = []
	        , i   = 0;
	      while(len > i){
	        res.push(String(raw[i++]));
	        if(i < sln)res.push(String(arguments[i]));
	      } return res.join('');
	    }
	  });
	  
	  $define(PROTO, STRING, {
	    // 21.1.3.3 String.prototype.codePointAt(pos)
	    codePointAt: createPointAt(false),
	    // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	    endsWith: function(searchString /*, endPosition = @length */){
	      assertNotRegExp(searchString);
	      var that = String(assertDefined(this))
	        , endPosition = arguments[1]
	        , len = toLength(that.length)
	        , end = endPosition === undefined ? len : min(toLength(endPosition), len);
	      searchString += '';
	      return that.slice(end - searchString.length, end) === searchString;
	    },
	    // 21.1.3.7 String.prototype.includes(searchString, position = 0)
	    includes: function(searchString /*, position = 0 */){
	      assertNotRegExp(searchString);
	      return !!~String(assertDefined(this)).indexOf(searchString, arguments[1]);
	    },
	    // 21.1.3.13 String.prototype.repeat(count)
	    repeat: function(count){
	      var str = String(assertDefined(this))
	        , res = ''
	        , n   = toInteger(count);
	      if(0 > n || n == Infinity)throw RangeError("Count can't be negative");
	      for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	      return res;
	    },
	    // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	    startsWith: function(searchString /*, position = 0 */){
	      assertNotRegExp(searchString);
	      var that  = String(assertDefined(this))
	        , index = toLength(min(arguments[1], that.length));
	      searchString += '';
	      return that.slice(index, index + searchString.length) === searchString;
	    }
	  });
	}(String.fromCharCode);

	/******************************************************************************
	 * Module : es6.array.statics                                                 *
	 ******************************************************************************/

	!function(){
	  $define(STATIC + FORCED * checkDangerIterClosing(Array.from), ARRAY, {
	    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	    from: function(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	      var O       = Object(assertDefined(arrayLike))
	        , mapfn   = arguments[1]
	        , mapping = mapfn !== undefined
	        , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
	        , index   = 0
	        , length, result, step;
	      if(isIterable(O)){
	        result = new (generic(this, Array));
	        safeIterClose(function(iterator){
	          for(; !(step = iterator.next()).done; index++){
	            result[index] = mapping ? f(step.value, index) : step.value;
	          }
	        }, getIterator(O));
	      } else {
	        result = new (generic(this, Array))(length = toLength(O.length));
	        for(; length > index; index++){
	          result[index] = mapping ? f(O[index], index) : O[index];
	        }
	      }
	      result.length = index;
	      return result;
	    }
	  });
	  
	  $define(STATIC, ARRAY, {
	    // 22.1.2.3 Array.of( ...items)
	    of: function(/* ...args */){
	      var index  = 0
	        , length = arguments.length
	        , result = new (generic(this, Array))(length);
	      while(length > index)result[index] = arguments[index++];
	      result.length = length;
	      return result;
	    }
	  });
	  
	  setSpecies(Array);
	}();

	/******************************************************************************
	 * Module : es6.array.prototype                                               *
	 ******************************************************************************/

	!function(){
	  $define(PROTO, ARRAY, {
	    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	    copyWithin: function(target /* = 0 */, start /* = 0, end = @length */){
	      var O     = Object(assertDefined(this))
	        , len   = toLength(O.length)
	        , to    = toIndex(target, len)
	        , from  = toIndex(start, len)
	        , end   = arguments[2]
	        , fin   = end === undefined ? len : toIndex(end, len)
	        , count = min(fin - from, len - to)
	        , inc   = 1;
	      if(from < to && to < from + count){
	        inc  = -1;
	        from = from + count - 1;
	        to   = to + count - 1;
	      }
	      while(count-- > 0){
	        if(from in O)O[to] = O[from];
	        else delete O[to];
	        to += inc;
	        from += inc;
	      } return O;
	    },
	    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	    fill: function(value /*, start = 0, end = @length */){
	      var O      = Object(assertDefined(this))
	        , length = toLength(O.length)
	        , index  = toIndex(arguments[1], length)
	        , end    = arguments[2]
	        , endPos = end === undefined ? length : toIndex(end, length);
	      while(endPos > index)O[index++] = value;
	      return O;
	    },
	    // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	    find: createArrayMethod(5),
	    // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	    findIndex: createArrayMethod(6)
	  });
	  
	  if(framework){
	    // 22.1.3.31 Array.prototype[@@unscopables]
	    forEach.call(array('find,findIndex,fill,copyWithin,entries,keys,values'), function(it){
	      ArrayUnscopables[it] = true;
	    });
	    SYMBOL_UNSCOPABLES in ArrayProto || hidden(ArrayProto, SYMBOL_UNSCOPABLES, ArrayUnscopables);
	  }
	}();

	/******************************************************************************
	 * Module : es6.iterators                                                     *
	 ******************************************************************************/

	!function(at){
	  // 22.1.3.4 Array.prototype.entries()
	  // 22.1.3.13 Array.prototype.keys()
	  // 22.1.3.29 Array.prototype.values()
	  // 22.1.3.30 Array.prototype[@@iterator]()
	  defineStdIterators(Array, ARRAY, function(iterated, kind){
	    set(this, ITER, {o: toObject(iterated), i: 0, k: kind});
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	  }, function(){
	    var iter  = this[ITER]
	      , O     = iter.o
	      , kind  = iter.k
	      , index = iter.i++;
	    if(!O || index >= O.length){
	      iter.o = undefined;
	      return iterResult(1);
	    }
	    if(kind == KEY)  return iterResult(0, index);
	    if(kind == VALUE)return iterResult(0, O[index]);
	                     return iterResult(0, [index, O[index]]);
	  }, VALUE);
	  
	  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	  Iterators[ARGUMENTS] = Iterators[ARRAY];
	  
	  // 21.1.3.27 String.prototype[@@iterator]()
	  defineStdIterators(String, STRING, function(iterated){
	    set(this, ITER, {o: String(iterated), i: 0});
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	  }, function(){
	    var iter  = this[ITER]
	      , O     = iter.o
	      , index = iter.i
	      , point;
	    if(index >= O.length)return iterResult(1);
	    point = at.call(O, index);
	    iter.i += point.length;
	    return iterResult(0, point);
	  });
	}(createPointAt(true));

	/******************************************************************************
	 * Module : es6.regexp                                                        *
	 ******************************************************************************/

	DESC && !function(RegExpProto, _RegExp){  
	  // RegExp allows a regex with flags as the pattern
	  if(!function(){try{return RegExp(/a/g, 'i') == '/a/i'}catch(e){}}()){
	    RegExp = function RegExp(pattern, flags){
	      return new _RegExp(cof(pattern) == REGEXP && flags !== undefined
	        ? pattern.source : pattern, flags);
	    }
	    forEach.call(getNames(_RegExp), function(key){
	      key in RegExp || defineProperty(RegExp, key, {
	        configurable: true,
	        get: function(){ return _RegExp[key] },
	        set: function(it){ _RegExp[key] = it }
	      });
	    });
	    RegExpProto[CONSTRUCTOR] = RegExp;
	    RegExp[PROTOTYPE] = RegExpProto;
	    hidden(global, REGEXP, RegExp);
	  }
	  
	  // 21.2.5.3 get RegExp.prototype.flags()
	  if(/./g.flags != 'g')defineProperty(RegExpProto, 'flags', {
	    configurable: true,
	    get: createReplacer(/^.*\/(\w*)$/, '$1')
	  });
	  
	  setSpecies(RegExp);
	}(RegExp[PROTOTYPE], RegExp);

	/******************************************************************************
	 * Module : web.immediate                                                     *
	 ******************************************************************************/

	// setImmediate shim
	// Node.js 0.9+ & IE10+ has setImmediate, else:
	isFunction(setImmediate) && isFunction(clearImmediate) || function(ONREADYSTATECHANGE){
	  var postMessage      = global.postMessage
	    , addEventListener = global.addEventListener
	    , MessageChannel   = global.MessageChannel
	    , counter          = 0
	    , queue            = {}
	    , defer, channel, port;
	  setImmediate = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    }
	    defer(counter);
	    return counter;
	  }
	  clearImmediate = function(id){
	    delete queue[id];
	  }
	  function run(id){
	    if(has(queue, id)){
	      var fn = queue[id];
	      delete queue[id];
	      fn();
	    }
	  }
	  function listner(event){
	    run(event.data);
	  }
	  // Node.js 0.8-
	  if(NODE){
	    defer = function(id){
	      nextTick(part.call(run, id));
	    }
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
	    defer = function(id){
	      postMessage(id, '*');
	    }
	    addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(document && ONREADYSTATECHANGE in document[CREATE_ELEMENT]('script')){
	    defer = function(id){
	      html.appendChild(document[CREATE_ELEMENT]('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run(id);
	      }
	    }
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(run, 0, id);
	    }
	  }
	}('onreadystatechange');
	$define(GLOBAL + BIND, {
	  setImmediate:   setImmediate,
	  clearImmediate: clearImmediate
	});

	/******************************************************************************
	 * Module : es6.promise                                                       *
	 ******************************************************************************/

	// ES6 promises shim
	// Based on https://github.com/getify/native-promise-only/
	!function(Promise, test){
	  isFunction(Promise) && isFunction(Promise.resolve)
	  && Promise.resolve(test = new Promise(function(){})) == test
	  || function(asap, RECORD){
	    function isThenable(it){
	      var then;
	      if(isObject(it))then = it.then;
	      return isFunction(then) ? then : false;
	    }
	    function handledRejectionOrHasOnRejected(promise){
	      var record = promise[RECORD]
	        , chain  = record.c
	        , i      = 0
	        , react;
	      if(record.h)return true;
	      while(chain.length > i){
	        react = chain[i++];
	        if(react.fail || handledRejectionOrHasOnRejected(react.P))return true;
	      }
	    }
	    function notify(record, reject){
	      var chain = record.c;
	      if(reject || chain.length)asap(function(){
	        var promise = record.p
	          , value   = record.v
	          , ok      = record.s == 1
	          , i       = 0;
	        if(reject && !handledRejectionOrHasOnRejected(promise)){
	          setTimeout(function(){
	            if(!handledRejectionOrHasOnRejected(promise)){
	              if(NODE){
	                if(!process.emit('unhandledRejection', value, promise)){
	                  // default node.js behavior
	                }
	              } else if(isFunction(console.error)){
	                console.error('Unhandled promise rejection', value);
	              }
	            }
	          }, 1e3);
	        } else while(chain.length > i)!function(react){
	          var cb = ok ? react.ok : react.fail
	            , ret, then;
	          try {
	            if(cb){
	              if(!ok)record.h = true;
	              ret = cb === true ? value : cb(value);
	              if(ret === react.P){
	                react.rej(TypeError(PROMISE + '-chain cycle'));
	              } else if(then = isThenable(ret)){
	                then.call(ret, react.res, react.rej);
	              } else react.res(ret);
	            } else react.rej(value);
	          } catch(err){
	            react.rej(err);
	          }
	        }(chain[i++]);
	        chain.length = 0;
	      });
	    }
	    function resolve(value){
	      var record = this
	        , then, wrapper;
	      if(record.d)return;
	      record.d = true;
	      record = record.r || record; // unwrap
	      try {
	        if(then = isThenable(value)){
	          wrapper = {r: record, d: false}; // wrap
	          then.call(value, ctx(resolve, wrapper, 1), ctx(reject, wrapper, 1));
	        } else {
	          record.v = value;
	          record.s = 1;
	          notify(record);
	        }
	      } catch(err){
	        reject.call(wrapper || {r: record, d: false}, err); // wrap
	      }
	    }
	    function reject(value){
	      var record = this;
	      if(record.d)return;
	      record.d = true;
	      record = record.r || record; // unwrap
	      record.v = value;
	      record.s = 2;
	      notify(record, true);
	    }
	    function getConstructor(C){
	      var S = assertObject(C)[SYMBOL_SPECIES];
	      return S != undefined ? S : C;
	    }
	    // 25.4.3.1 Promise(executor)
	    Promise = function(executor){
	      assertFunction(executor);
	      assertInstance(this, Promise, PROMISE);
	      var record = {
	        p: this,      // promise
	        c: [],        // chain
	        s: 0,         // state
	        d: false,     // done
	        v: undefined, // value
	        h: false      // handled rejection
	      };
	      hidden(this, RECORD, record);
	      try {
	        executor(ctx(resolve, record, 1), ctx(reject, record, 1));
	      } catch(err){
	        reject.call(record, err);
	      }
	    }
	    assignHidden(Promise[PROTOTYPE], {
	      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	      then: function(onFulfilled, onRejected){
	        var S = assertObject(assertObject(this)[CONSTRUCTOR])[SYMBOL_SPECIES];
	        var react = {
	          ok:   isFunction(onFulfilled) ? onFulfilled : true,
	          fail: isFunction(onRejected)  ? onRejected  : false
	        } , P = react.P = new (S != undefined ? S : Promise)(function(resolve, reject){
	          react.res = assertFunction(resolve);
	          react.rej = assertFunction(reject);
	        }), record = this[RECORD];
	        record.c.push(react);
	        record.s && notify(record);
	        return P;
	      },
	      // 25.4.5.1 Promise.prototype.catch(onRejected)
	      'catch': function(onRejected){
	        return this.then(undefined, onRejected);
	      }
	    });
	    assignHidden(Promise, {
	      // 25.4.4.1 Promise.all(iterable)
	      all: function(iterable){
	        var Promise = getConstructor(this)
	          , values  = [];
	        return new Promise(function(resolve, reject){
	          forOf(iterable, false, push, values);
	          var remaining = values.length
	            , results   = Array(remaining);
	          if(remaining)forEach.call(values, function(promise, index){
	            Promise.resolve(promise).then(function(value){
	              results[index] = value;
	              --remaining || resolve(results);
	            }, reject);
	          });
	          else resolve(results);
	        });
	      },
	      // 25.4.4.4 Promise.race(iterable)
	      race: function(iterable){
	        var Promise = getConstructor(this);
	        return new Promise(function(resolve, reject){
	          forOf(iterable, false, function(promise){
	            Promise.resolve(promise).then(resolve, reject);
	          });
	        });
	      },
	      // 25.4.4.5 Promise.reject(r)
	      reject: function(r){
	        return new (getConstructor(this))(function(resolve, reject){
	          reject(r);
	        });
	      },
	      // 25.4.4.6 Promise.resolve(x)
	      resolve: function(x){
	        return isObject(x) && RECORD in x && getPrototypeOf(x) === this[PROTOTYPE]
	          ? x : new (getConstructor(this))(function(resolve, reject){
	            resolve(x);
	          });
	      }
	    });
	  }(nextTick || setImmediate, safeSymbol('record'));
	  setToStringTag(Promise, PROMISE);
	  setSpecies(Promise);
	  $define(GLOBAL + FORCED * !isNative(Promise), {Promise: Promise});
	}(global[PROMISE]);

	/******************************************************************************
	 * Module : es6.collections                                                   *
	 ******************************************************************************/

	// ECMAScript 6 collections shim
	!function(){
	  var UID   = safeSymbol('uid')
	    , O1    = safeSymbol('O1')
	    , WEAK  = safeSymbol('weak')
	    , LEAK  = safeSymbol('leak')
	    , LAST  = safeSymbol('last')
	    , FIRST = safeSymbol('first')
	    , SIZE  = DESC ? safeSymbol('size') : 'size'
	    , uid   = 0
	    , tmp   = {};
	  
	  function getCollection(C, NAME, methods, commonMethods, isMap, isWeak){
	    var ADDER = isMap ? 'set' : 'add'
	      , proto = C && C[PROTOTYPE]
	      , O     = {};
	    function initFromIterable(that, iterable){
	      if(iterable != undefined)forOf(iterable, isMap, that[ADDER], that);
	      return that;
	    }
	    function fixSVZ(key, chain){
	      var method = proto[key];
	      if(framework)proto[key] = function(a, b){
	        var result = method.call(this, a === 0 ? 0 : a, b);
	        return chain ? this : result;
	      };
	    }
	    if(!isNative(C) || !(isWeak || (!BUGGY_ITERATORS && has(proto, FOR_EACH) && has(proto, 'entries')))){
	      // create collection constructor
	      C = isWeak
	        ? function(iterable){
	            assertInstance(this, C, NAME);
	            set(this, UID, uid++);
	            initFromIterable(this, iterable);
	          }
	        : function(iterable){
	            var that = this;
	            assertInstance(that, C, NAME);
	            set(that, O1, create(null));
	            set(that, SIZE, 0);
	            set(that, LAST, undefined);
	            set(that, FIRST, undefined);
	            initFromIterable(that, iterable);
	          };
	      assignHidden(assignHidden(C[PROTOTYPE], methods), commonMethods);
	      isWeak || !DESC || defineProperty(C[PROTOTYPE], 'size', {get: function(){
	        return assertDefined(this[SIZE]);
	      }});
	    } else {
	      var Native = C
	        , inst   = new C
	        , chain  = inst[ADDER](isWeak ? {} : -0, 1)
	        , buggyZero;
	      // wrap to init collections from iterable
	      if(checkDangerIterClosing(function(O){ new C(O) })){
	        C = function(iterable){
	          assertInstance(this, C, NAME);
	          return initFromIterable(new Native, iterable);
	        }
	        C[PROTOTYPE] = proto;
	        if(framework)proto[CONSTRUCTOR] = C;
	      }
	      isWeak || inst[FOR_EACH](function(val, key){
	        buggyZero = 1 / key === -Infinity;
	      });
	      // fix converting -0 key to +0
	      if(buggyZero){
	        fixSVZ('delete');
	        fixSVZ('has');
	        isMap && fixSVZ('get');
	      }
	      // + fix .add & .set for chaining
	      if(buggyZero || chain !== inst)fixSVZ(ADDER, true);
	    }
	    setToStringTag(C, NAME);
	    setSpecies(C);
	    
	    O[NAME] = C;
	    $define(GLOBAL + WRAP + FORCED * !isNative(C), O);
	    
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    isWeak || defineStdIterators(C, NAME, function(iterated, kind){
	      set(this, ITER, {o: iterated, k: kind});
	    }, function(){
	      var iter  = this[ITER]
	        , kind  = iter.k
	        , entry = iter.l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
	        // or finish the iteration
	        iter.o = undefined;
	        return iterResult(1);
	      }
	      // return step by kind
	      if(kind == KEY)  return iterResult(0, entry.k);
	      if(kind == VALUE)return iterResult(0, entry.v);
	                       return iterResult(0, [entry.k, entry.v]);   
	    }, isMap ? KEY+VALUE : VALUE, !isMap);
	    
	    return C;
	  }
	  
	  function fastKey(it, create){
	    // return primitive with prefix
	    if(!isObject(it))return (typeof it == 'string' ? 'S' : 'P') + it;
	    // can't set id to frozen object
	    if(isFrozen(it))return 'F';
	    if(!has(it, UID)){
	      // not necessary to add id
	      if(!create)return 'E';
	      // add missing object id
	      hidden(it, UID, ++uid);
	    // return object id with prefix
	    } return 'O' + it[UID];
	  }
	  function getEntry(that, key){
	    // fast case
	    var index = fastKey(key), entry;
	    if(index != 'F')return that[O1][index];
	    // frozen object case
	    for(entry = that[FIRST]; entry; entry = entry.n){
	      if(entry.k == key)return entry;
	    }
	  }
	  function def(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry)entry.v = value;
	    // create new entry
	    else {
	      that[LAST] = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that[LAST],          // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that[FIRST])that[FIRST] = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index != 'F')that[O1][index] = entry;
	    } return that;
	  }

	  var collectionMethods = {
	    // 23.1.3.1 Map.prototype.clear()
	    // 23.2.3.2 Set.prototype.clear()
	    clear: function(){
	      for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
	        entry.r = true;
	        if(entry.p)entry.p = entry.p.n = undefined;
	        delete data[entry.i];
	      }
	      that[FIRST] = that[LAST] = undefined;
	      that[SIZE] = 0;
	    },
	    // 23.1.3.3 Map.prototype.delete(key)
	    // 23.2.3.4 Set.prototype.delete(value)
	    'delete': function(key){
	      var that  = this
	        , entry = getEntry(that, key);
	      if(entry){
	        var next = entry.n
	          , prev = entry.p;
	        delete that[O1][entry.i];
	        entry.r = true;
	        if(prev)prev.n = next;
	        if(next)next.p = prev;
	        if(that[FIRST] == entry)that[FIRST] = next;
	        if(that[LAST] == entry)that[LAST] = prev;
	        that[SIZE]--;
	      } return !!entry;
	    },
	    // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	    // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	    forEach: function(callbackfn /*, that = undefined */){
	      var f = ctx(callbackfn, arguments[1], 3)
	        , entry;
	      while(entry = entry ? entry.n : this[FIRST]){
	        f(entry.v, entry.k, this);
	        // revert to the last existing entry
	        while(entry && entry.r)entry = entry.p;
	      }
	    },
	    // 23.1.3.7 Map.prototype.has(key)
	    // 23.2.3.7 Set.prototype.has(value)
	    has: function(key){
	      return !!getEntry(this, key);
	    }
	  }
	  
	  // 23.1 Map Objects
	  Map = getCollection(Map, MAP, {
	    // 23.1.3.6 Map.prototype.get(key)
	    get: function(key){
	      var entry = getEntry(this, key);
	      return entry && entry.v;
	    },
	    // 23.1.3.9 Map.prototype.set(key, value)
	    set: function(key, value){
	      return def(this, key === 0 ? 0 : key, value);
	    }
	  }, collectionMethods, true);
	  
	  // 23.2 Set Objects
	  Set = getCollection(Set, SET, {
	    // 23.2.3.1 Set.prototype.add(value)
	    add: function(value){
	      return def(this, value = value === 0 ? 0 : value, value);
	    }
	  }, collectionMethods);
	  
	  function defWeak(that, key, value){
	    if(isFrozen(assertObject(key)))leakStore(that).set(key, value);
	    else {
	      has(key, WEAK) || hidden(key, WEAK, {});
	      key[WEAK][that[UID]] = value;
	    } return that;
	  }
	  function leakStore(that){
	    return that[LEAK] || hidden(that, LEAK, new Map)[LEAK];
	  }
	  
	  var weakMethods = {
	    // 23.3.3.2 WeakMap.prototype.delete(key)
	    // 23.4.3.3 WeakSet.prototype.delete(value)
	    'delete': function(key){
	      if(!isObject(key))return false;
	      if(isFrozen(key))return leakStore(this)['delete'](key);
	      return has(key, WEAK) && has(key[WEAK], this[UID]) && delete key[WEAK][this[UID]];
	    },
	    // 23.3.3.4 WeakMap.prototype.has(key)
	    // 23.4.3.4 WeakSet.prototype.has(value)
	    has: function(key){
	      if(!isObject(key))return false;
	      if(isFrozen(key))return leakStore(this).has(key);
	      return has(key, WEAK) && has(key[WEAK], this[UID]);
	    }
	  };
	  
	  // 23.3 WeakMap Objects
	  WeakMap = getCollection(WeakMap, WEAKMAP, {
	    // 23.3.3.3 WeakMap.prototype.get(key)
	    get: function(key){
	      if(isObject(key)){
	        if(isFrozen(key))return leakStore(this).get(key);
	        if(has(key, WEAK))return key[WEAK][this[UID]];
	      }
	    },
	    // 23.3.3.5 WeakMap.prototype.set(key, value)
	    set: function(key, value){
	      return defWeak(this, key, value);
	    }
	  }, weakMethods, true, true);
	  
	  // IE11 WeakMap frozen keys fix
	  if(framework && new WeakMap().set(Object.freeze(tmp), 7).get(tmp) != 7){
	    forEach.call(array('delete,has,get,set'), function(key){
	      var method = WeakMap[PROTOTYPE][key];
	      WeakMap[PROTOTYPE][key] = function(a, b){
	        // store frozen objects on leaky map
	        if(isObject(a) && isFrozen(a)){
	          var result = leakStore(this)[key](a, b);
	          return key == 'set' ? this : result;
	        // store all the rest on native weakmap
	        } return method.call(this, a, b);
	      };
	    });
	  }
	  
	  // 23.4 WeakSet Objects
	  WeakSet = getCollection(WeakSet, WEAKSET, {
	    // 23.4.3.1 WeakSet.prototype.add(value)
	    add: function(value){
	      return defWeak(this, value, true);
	    }
	  }, weakMethods, false, true);
	}();

	/******************************************************************************
	 * Module : es6.reflect                                                       *
	 ******************************************************************************/

	!function(){
	  function Enumerate(iterated){
	    var keys = [], key;
	    for(key in iterated)keys.push(key);
	    set(this, ITER, {o: iterated, a: keys, i: 0});
	  }
	  createIterator(Enumerate, OBJECT, function(){
	    var iter = this[ITER]
	      , keys = iter.a
	      , key;
	    do {
	      if(iter.i >= keys.length)return iterResult(1);
	    } while(!((key = keys[iter.i++]) in iter.o));
	    return iterResult(0, key);
	  });
	  
	  function wrap(fn){
	    return function(it){
	      assertObject(it);
	      try {
	        return fn.apply(undefined, arguments), true;
	      } catch(e){
	        return false;
	      }
	    }
	  }
	  
	  function reflectGet(target, propertyKey/*, receiver*/){
	    var receiver = arguments.length < 3 ? target : arguments[2]
	      , desc = getOwnDescriptor(assertObject(target), propertyKey), proto;
	    if(desc)return has(desc, 'value')
	      ? desc.value
	      : desc.get === undefined
	        ? undefined
	        : desc.get.call(receiver);
	    return isObject(proto = getPrototypeOf(target))
	      ? reflectGet(proto, propertyKey, receiver)
	      : undefined;
	  }
	  function reflectSet(target, propertyKey, V/*, receiver*/){
	    var receiver = arguments.length < 4 ? target : arguments[3]
	      , ownDesc  = getOwnDescriptor(assertObject(target), propertyKey)
	      , existingDescriptor, proto;
	    if(!ownDesc){
	      if(isObject(proto = getPrototypeOf(target))){
	        return reflectSet(proto, propertyKey, V, receiver);
	      }
	      ownDesc = descriptor(0);
	    }
	    if(has(ownDesc, 'value')){
	      if(ownDesc.writable === false || !isObject(receiver))return false;
	      existingDescriptor = getOwnDescriptor(receiver, propertyKey) || descriptor(0);
	      existingDescriptor.value = V;
	      return defineProperty(receiver, propertyKey, existingDescriptor), true;
	    }
	    return ownDesc.set === undefined
	      ? false
	      : (ownDesc.set.call(receiver, V), true);
	  }
	  var isExtensible = Object.isExtensible || returnIt;
	  
	  var reflect = {
	    // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	    apply: ctx(call, apply, 3),
	    // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	    construct: function(target, argumentsList /*, newTarget*/){
	      var proto    = assertFunction(arguments.length < 3 ? target : arguments[2])[PROTOTYPE]
	        , instance = create(isObject(proto) ? proto : ObjectProto)
	        , result   = apply.call(target, instance, argumentsList);
	      return isObject(result) ? result : instance;
	    },
	    // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	    defineProperty: wrap(defineProperty),
	    // 26.1.4 Reflect.deleteProperty(target, propertyKey)
	    deleteProperty: function(target, propertyKey){
	      var desc = getOwnDescriptor(assertObject(target), propertyKey);
	      return desc && !desc.configurable ? false : delete target[propertyKey];
	    },
	    // 26.1.5 Reflect.enumerate(target)
	    enumerate: function(target){
	      return new Enumerate(assertObject(target));
	    },
	    // 26.1.6 Reflect.get(target, propertyKey [, receiver])
	    get: reflectGet,
	    // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	    getOwnPropertyDescriptor: function(target, propertyKey){
	      return getOwnDescriptor(assertObject(target), propertyKey);
	    },
	    // 26.1.8 Reflect.getPrototypeOf(target)
	    getPrototypeOf: function(target){
	      return getPrototypeOf(assertObject(target));
	    },
	    // 26.1.9 Reflect.has(target, propertyKey)
	    has: function(target, propertyKey){
	      return propertyKey in target;
	    },
	    // 26.1.10 Reflect.isExtensible(target)
	    isExtensible: function(target){
	      return !!isExtensible(assertObject(target));
	    },
	    // 26.1.11 Reflect.ownKeys(target)
	    ownKeys: ownKeys,
	    // 26.1.12 Reflect.preventExtensions(target)
	    preventExtensions: wrap(Object.preventExtensions || returnIt),
	    // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	    set: reflectSet
	  }
	  // 26.1.14 Reflect.setPrototypeOf(target, proto)
	  if(setPrototypeOf)reflect.setPrototypeOf = function(target, proto){
	    return setPrototypeOf(assertObject(target), proto), true;
	  };
	  
	  $define(GLOBAL, {Reflect: {}});
	  $define(STATIC, 'Reflect', reflect);
	}();

	/******************************************************************************
	 * Module : es7.proposals                                                     *
	 ******************************************************************************/

	!function(){
	  $define(PROTO, ARRAY, {
	    // https://github.com/domenic/Array.prototype.includes
	    includes: createArrayContains(true)
	  });
	  $define(PROTO, STRING, {
	    // https://github.com/mathiasbynens/String.prototype.at
	    at: createPointAt(true)
	  });
	  
	  function createObjectToArray(isEntries){
	    return function(object){
	      var O      = toObject(object)
	        , keys   = getKeys(object)
	        , length = keys.length
	        , i      = 0
	        , result = Array(length)
	        , key;
	      if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
	      else while(length > i)result[i] = O[keys[i++]];
	      return result;
	    }
	  }
	  $define(STATIC, OBJECT, {
	    // https://gist.github.com/WebReflection/9353781
	    getOwnPropertyDescriptors: function(object){
	      var O      = toObject(object)
	        , result = {};
	      forEach.call(ownKeys(O), function(key){
	        defineProperty(result, key, descriptor(0, getOwnDescriptor(O, key)));
	      });
	      return result;
	    },
	    // https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-04/apr-9.md#51-objectentries-objectvalues
	    values:  createObjectToArray(false),
	    entries: createObjectToArray(true)
	  });
	  $define(STATIC, REGEXP, {
	    // https://gist.github.com/kangax/9698100
	    escape: createReplacer(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)
	  });
	}();

	/******************************************************************************
	 * Module : es7.abstract-refs                                                 *
	 ******************************************************************************/

	// https://github.com/zenparsing/es-abstract-refs
	!function(REFERENCE){
	  REFERENCE_GET = getWellKnownSymbol(REFERENCE+'Get', true);
	  var REFERENCE_SET = getWellKnownSymbol(REFERENCE+SET, true)
	    , REFERENCE_DELETE = getWellKnownSymbol(REFERENCE+'Delete', true);
	  
	  $define(STATIC, SYMBOL, {
	    referenceGet: REFERENCE_GET,
	    referenceSet: REFERENCE_SET,
	    referenceDelete: REFERENCE_DELETE
	  });
	  
	  hidden(FunctionProto, REFERENCE_GET, returnThis);
	  
	  function setMapMethods(Constructor){
	    if(Constructor){
	      var MapProto = Constructor[PROTOTYPE];
	      hidden(MapProto, REFERENCE_GET, MapProto.get);
	      hidden(MapProto, REFERENCE_SET, MapProto.set);
	      hidden(MapProto, REFERENCE_DELETE, MapProto['delete']);
	    }
	  }
	  setMapMethods(Map);
	  setMapMethods(WeakMap);
	}('reference');

	/******************************************************************************
	 * Module : js.array.statics                                                  *
	 ******************************************************************************/

	// JavaScript 1.6 / Strawman array statics shim
	!function(arrayStatics){
	  function setArrayStatics(keys, length){
	    forEach.call(array(keys), function(key){
	      if(key in ArrayProto)arrayStatics[key] = ctx(call, ArrayProto[key], length);
	    });
	  }
	  setArrayStatics('pop,reverse,shift,keys,values,entries', 1);
	  setArrayStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	  setArrayStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	                  'reduce,reduceRight,copyWithin,fill,turn');
	  $define(STATIC, ARRAY, arrayStatics);
	}({});

	/******************************************************************************
	 * Module : web.dom.itarable                                                  *
	 ******************************************************************************/

	!function(NodeList){
	  if(framework && NodeList && !(SYMBOL_ITERATOR in NodeList[PROTOTYPE])){
	    hidden(NodeList[PROTOTYPE], SYMBOL_ITERATOR, Iterators[ARRAY]);
	  }
	  Iterators.NodeList = Iterators[ARRAY];
	}(global.NodeList);
	}(typeof self != 'undefined' && self.Math === Math ? self : Function('return this')(), true);

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    return new Generator(innerFn, outerFn, self || null, tryLocsList || []);
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    genFun.__proto__ = GeneratorFunctionPrototype;
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    return new Promise(function(resolve, reject) {
	      var generator = wrap(innerFn, outerFn, self, tryLocsList);
	      var callNext = step.bind(generator.next);
	      var callThrow = step.bind(generator["throw"]);

	      function step(arg) {
	        var record = tryCatch(this, null, arg);
	        if (record.type === "throw") {
	          reject(record.arg);
	          return;
	        }

	        var info = record.arg;
	        if (info.done) {
	          resolve(info.value);
	        } else {
	          Promise.resolve(info.value).then(callNext, callThrow);
	        }
	      }

	      callNext();
	    });
	  };

	  function Generator(innerFn, outerFn, self, tryLocsList) {
	    var generator = outerFn ? Object.create(outerFn.prototype) : this;
	    var context = new Context(tryLocsList);
	    var state = GenStateSuspendedStart;

	    function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;

	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          if (state === GenStateSuspendedStart &&
	              typeof arg !== "undefined") {
	            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	            throw new TypeError(
	              "attempt to send " + JSON.stringify(arg) + " to newborn generator"
	            );
	          }

	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            delete context.sent;
	          }

	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;

	          if (method === "next") {
	            context.dispatchException(record.arg);
	          } else {
	            arg = record.arg;
	          }
	        }
	      }
	    }

	    generator.next = invoke.bind(generator, "next");
	    generator["throw"] = invoke.bind(generator, "throw");
	    generator["return"] = invoke.bind(generator, "return");

	    return generator;
	  }

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset();
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function() {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      // Pre-initialize at least 20 temporary variables to enable hidden
	      // class optimizations for simple generators.
	      for (var tempIndex = 0, tempName;
	           hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20;
	           ++tempIndex) {
	        this[tempName] = null;
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg < finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          return this.complete(entry.completion, entry.afterLoc);
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./bootstrap.min.css", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./bootstrap.min.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "/*!\n * Bootstrap v3.3.5 (http://getbootstrap.com)\n * Copyright 2011-2015 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n *//*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{margin:.67em 0;font-size:2em}mark{color:#000;background:#ff0}small{font-size:80%}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{height:0;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{margin:0;font:inherit;color:inherit}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}input{line-height:normal}input[type=checkbox],input[type=radio]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-appearance:textfield}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{padding:.35em .625em .75em;margin:0 2px;border:1px solid silver}legend{padding:0;border:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-spacing:0;border-collapse:collapse}td,th{padding:0}/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */@media print{*,:after,:before{color:#000!important;text-shadow:none!important;background:0 0!important;-webkit-box-shadow:none!important;box-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}a[href^=\"javascript:\"]:after,a[href^=\"#\"]:after{content:\"\"}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}.navbar{display:none}.btn>.caret,.dropup>.btn>.caret{border-top-color:#000!important}.label{border:1px solid #000}.table{border-collapse:collapse!important}.table td,.table th{background-color:#fff!important}.table-bordered td,.table-bordered th{border:1px solid #ddd!important}}@font-face{font-family:'Glyphicons Halflings';src:url(" + __webpack_require__(8) + ");src:url(" + __webpack_require__(8) + "?#iefix) format('embedded-opentype'),url(" + __webpack_require__(9) + ") format('woff2'),url(" + __webpack_require__(10) + ") format('woff'),url(" + __webpack_require__(11) + ") format('truetype'),url(" + __webpack_require__(12) + "#glyphicons_halflingsregular) format('svg')}.glyphicon{position:relative;top:1px;display:inline-block;font-family:'Glyphicons Halflings';font-style:normal;font-weight:400;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.glyphicon-asterisk:before{content:\"*\"}.glyphicon-plus:before{content:\"+\"}.glyphicon-eur:before,.glyphicon-euro:before{content:\"\\20AC\"}.glyphicon-minus:before{content:\"\\2212\"}.glyphicon-cloud:before{content:\"\\2601\"}.glyphicon-envelope:before{content:\"\\2709\"}.glyphicon-pencil:before{content:\"\\270F\"}.glyphicon-glass:before{content:\"\\E001\"}.glyphicon-music:before{content:\"\\E002\"}.glyphicon-search:before{content:\"\\E003\"}.glyphicon-heart:before{content:\"\\E005\"}.glyphicon-star:before{content:\"\\E006\"}.glyphicon-star-empty:before{content:\"\\E007\"}.glyphicon-user:before{content:\"\\E008\"}.glyphicon-film:before{content:\"\\E009\"}.glyphicon-th-large:before{content:\"\\E010\"}.glyphicon-th:before{content:\"\\E011\"}.glyphicon-th-list:before{content:\"\\E012\"}.glyphicon-ok:before{content:\"\\E013\"}.glyphicon-remove:before{content:\"\\E014\"}.glyphicon-zoom-in:before{content:\"\\E015\"}.glyphicon-zoom-out:before{content:\"\\E016\"}.glyphicon-off:before{content:\"\\E017\"}.glyphicon-signal:before{content:\"\\E018\"}.glyphicon-cog:before{content:\"\\E019\"}.glyphicon-trash:before{content:\"\\E020\"}.glyphicon-home:before{content:\"\\E021\"}.glyphicon-file:before{content:\"\\E022\"}.glyphicon-time:before{content:\"\\E023\"}.glyphicon-road:before{content:\"\\E024\"}.glyphicon-download-alt:before{content:\"\\E025\"}.glyphicon-download:before{content:\"\\E026\"}.glyphicon-upload:before{content:\"\\E027\"}.glyphicon-inbox:before{content:\"\\E028\"}.glyphicon-play-circle:before{content:\"\\E029\"}.glyphicon-repeat:before{content:\"\\E030\"}.glyphicon-refresh:before{content:\"\\E031\"}.glyphicon-list-alt:before{content:\"\\E032\"}.glyphicon-lock:before{content:\"\\E033\"}.glyphicon-flag:before{content:\"\\E034\"}.glyphicon-headphones:before{content:\"\\E035\"}.glyphicon-volume-off:before{content:\"\\E036\"}.glyphicon-volume-down:before{content:\"\\E037\"}.glyphicon-volume-up:before{content:\"\\E038\"}.glyphicon-qrcode:before{content:\"\\E039\"}.glyphicon-barcode:before{content:\"\\E040\"}.glyphicon-tag:before{content:\"\\E041\"}.glyphicon-tags:before{content:\"\\E042\"}.glyphicon-book:before{content:\"\\E043\"}.glyphicon-bookmark:before{content:\"\\E044\"}.glyphicon-print:before{content:\"\\E045\"}.glyphicon-camera:before{content:\"\\E046\"}.glyphicon-font:before{content:\"\\E047\"}.glyphicon-bold:before{content:\"\\E048\"}.glyphicon-italic:before{content:\"\\E049\"}.glyphicon-text-height:before{content:\"\\E050\"}.glyphicon-text-width:before{content:\"\\E051\"}.glyphicon-align-left:before{content:\"\\E052\"}.glyphicon-align-center:before{content:\"\\E053\"}.glyphicon-align-right:before{content:\"\\E054\"}.glyphicon-align-justify:before{content:\"\\E055\"}.glyphicon-list:before{content:\"\\E056\"}.glyphicon-indent-left:before{content:\"\\E057\"}.glyphicon-indent-right:before{content:\"\\E058\"}.glyphicon-facetime-video:before{content:\"\\E059\"}.glyphicon-picture:before{content:\"\\E060\"}.glyphicon-map-marker:before{content:\"\\E062\"}.glyphicon-adjust:before{content:\"\\E063\"}.glyphicon-tint:before{content:\"\\E064\"}.glyphicon-edit:before{content:\"\\E065\"}.glyphicon-share:before{content:\"\\E066\"}.glyphicon-check:before{content:\"\\E067\"}.glyphicon-move:before{content:\"\\E068\"}.glyphicon-step-backward:before{content:\"\\E069\"}.glyphicon-fast-backward:before{content:\"\\E070\"}.glyphicon-backward:before{content:\"\\E071\"}.glyphicon-play:before{content:\"\\E072\"}.glyphicon-pause:before{content:\"\\E073\"}.glyphicon-stop:before{content:\"\\E074\"}.glyphicon-forward:before{content:\"\\E075\"}.glyphicon-fast-forward:before{content:\"\\E076\"}.glyphicon-step-forward:before{content:\"\\E077\"}.glyphicon-eject:before{content:\"\\E078\"}.glyphicon-chevron-left:before{content:\"\\E079\"}.glyphicon-chevron-right:before{content:\"\\E080\"}.glyphicon-plus-sign:before{content:\"\\E081\"}.glyphicon-minus-sign:before{content:\"\\E082\"}.glyphicon-remove-sign:before{content:\"\\E083\"}.glyphicon-ok-sign:before{content:\"\\E084\"}.glyphicon-question-sign:before{content:\"\\E085\"}.glyphicon-info-sign:before{content:\"\\E086\"}.glyphicon-screenshot:before{content:\"\\E087\"}.glyphicon-remove-circle:before{content:\"\\E088\"}.glyphicon-ok-circle:before{content:\"\\E089\"}.glyphicon-ban-circle:before{content:\"\\E090\"}.glyphicon-arrow-left:before{content:\"\\E091\"}.glyphicon-arrow-right:before{content:\"\\E092\"}.glyphicon-arrow-up:before{content:\"\\E093\"}.glyphicon-arrow-down:before{content:\"\\E094\"}.glyphicon-share-alt:before{content:\"\\E095\"}.glyphicon-resize-full:before{content:\"\\E096\"}.glyphicon-resize-small:before{content:\"\\E097\"}.glyphicon-exclamation-sign:before{content:\"\\E101\"}.glyphicon-gift:before{content:\"\\E102\"}.glyphicon-leaf:before{content:\"\\E103\"}.glyphicon-fire:before{content:\"\\E104\"}.glyphicon-eye-open:before{content:\"\\E105\"}.glyphicon-eye-close:before{content:\"\\E106\"}.glyphicon-warning-sign:before{content:\"\\E107\"}.glyphicon-plane:before{content:\"\\E108\"}.glyphicon-calendar:before{content:\"\\E109\"}.glyphicon-random:before{content:\"\\E110\"}.glyphicon-comment:before{content:\"\\E111\"}.glyphicon-magnet:before{content:\"\\E112\"}.glyphicon-chevron-up:before{content:\"\\E113\"}.glyphicon-chevron-down:before{content:\"\\E114\"}.glyphicon-retweet:before{content:\"\\E115\"}.glyphicon-shopping-cart:before{content:\"\\E116\"}.glyphicon-folder-close:before{content:\"\\E117\"}.glyphicon-folder-open:before{content:\"\\E118\"}.glyphicon-resize-vertical:before{content:\"\\E119\"}.glyphicon-resize-horizontal:before{content:\"\\E120\"}.glyphicon-hdd:before{content:\"\\E121\"}.glyphicon-bullhorn:before{content:\"\\E122\"}.glyphicon-bell:before{content:\"\\E123\"}.glyphicon-certificate:before{content:\"\\E124\"}.glyphicon-thumbs-up:before{content:\"\\E125\"}.glyphicon-thumbs-down:before{content:\"\\E126\"}.glyphicon-hand-right:before{content:\"\\E127\"}.glyphicon-hand-left:before{content:\"\\E128\"}.glyphicon-hand-up:before{content:\"\\E129\"}.glyphicon-hand-down:before{content:\"\\E130\"}.glyphicon-circle-arrow-right:before{content:\"\\E131\"}.glyphicon-circle-arrow-left:before{content:\"\\E132\"}.glyphicon-circle-arrow-up:before{content:\"\\E133\"}.glyphicon-circle-arrow-down:before{content:\"\\E134\"}.glyphicon-globe:before{content:\"\\E135\"}.glyphicon-wrench:before{content:\"\\E136\"}.glyphicon-tasks:before{content:\"\\E137\"}.glyphicon-filter:before{content:\"\\E138\"}.glyphicon-briefcase:before{content:\"\\E139\"}.glyphicon-fullscreen:before{content:\"\\E140\"}.glyphicon-dashboard:before{content:\"\\E141\"}.glyphicon-paperclip:before{content:\"\\E142\"}.glyphicon-heart-empty:before{content:\"\\E143\"}.glyphicon-link:before{content:\"\\E144\"}.glyphicon-phone:before{content:\"\\E145\"}.glyphicon-pushpin:before{content:\"\\E146\"}.glyphicon-usd:before{content:\"\\E148\"}.glyphicon-gbp:before{content:\"\\E149\"}.glyphicon-sort:before{content:\"\\E150\"}.glyphicon-sort-by-alphabet:before{content:\"\\E151\"}.glyphicon-sort-by-alphabet-alt:before{content:\"\\E152\"}.glyphicon-sort-by-order:before{content:\"\\E153\"}.glyphicon-sort-by-order-alt:before{content:\"\\E154\"}.glyphicon-sort-by-attributes:before{content:\"\\E155\"}.glyphicon-sort-by-attributes-alt:before{content:\"\\E156\"}.glyphicon-unchecked:before{content:\"\\E157\"}.glyphicon-expand:before{content:\"\\E158\"}.glyphicon-collapse-down:before{content:\"\\E159\"}.glyphicon-collapse-up:before{content:\"\\E160\"}.glyphicon-log-in:before{content:\"\\E161\"}.glyphicon-flash:before{content:\"\\E162\"}.glyphicon-log-out:before{content:\"\\E163\"}.glyphicon-new-window:before{content:\"\\E164\"}.glyphicon-record:before{content:\"\\E165\"}.glyphicon-save:before{content:\"\\E166\"}.glyphicon-open:before{content:\"\\E167\"}.glyphicon-saved:before{content:\"\\E168\"}.glyphicon-import:before{content:\"\\E169\"}.glyphicon-export:before{content:\"\\E170\"}.glyphicon-send:before{content:\"\\E171\"}.glyphicon-floppy-disk:before{content:\"\\E172\"}.glyphicon-floppy-saved:before{content:\"\\E173\"}.glyphicon-floppy-remove:before{content:\"\\E174\"}.glyphicon-floppy-save:before{content:\"\\E175\"}.glyphicon-floppy-open:before{content:\"\\E176\"}.glyphicon-credit-card:before{content:\"\\E177\"}.glyphicon-transfer:before{content:\"\\E178\"}.glyphicon-cutlery:before{content:\"\\E179\"}.glyphicon-header:before{content:\"\\E180\"}.glyphicon-compressed:before{content:\"\\E181\"}.glyphicon-earphone:before{content:\"\\E182\"}.glyphicon-phone-alt:before{content:\"\\E183\"}.glyphicon-tower:before{content:\"\\E184\"}.glyphicon-stats:before{content:\"\\E185\"}.glyphicon-sd-video:before{content:\"\\E186\"}.glyphicon-hd-video:before{content:\"\\E187\"}.glyphicon-subtitles:before{content:\"\\E188\"}.glyphicon-sound-stereo:before{content:\"\\E189\"}.glyphicon-sound-dolby:before{content:\"\\E190\"}.glyphicon-sound-5-1:before{content:\"\\E191\"}.glyphicon-sound-6-1:before{content:\"\\E192\"}.glyphicon-sound-7-1:before{content:\"\\E193\"}.glyphicon-copyright-mark:before{content:\"\\E194\"}.glyphicon-registration-mark:before{content:\"\\E195\"}.glyphicon-cloud-download:before{content:\"\\E197\"}.glyphicon-cloud-upload:before{content:\"\\E198\"}.glyphicon-tree-conifer:before{content:\"\\E199\"}.glyphicon-tree-deciduous:before{content:\"\\E200\"}.glyphicon-cd:before{content:\"\\E201\"}.glyphicon-save-file:before{content:\"\\E202\"}.glyphicon-open-file:before{content:\"\\E203\"}.glyphicon-level-up:before{content:\"\\E204\"}.glyphicon-copy:before{content:\"\\E205\"}.glyphicon-paste:before{content:\"\\E206\"}.glyphicon-alert:before{content:\"\\E209\"}.glyphicon-equalizer:before{content:\"\\E210\"}.glyphicon-king:before{content:\"\\E211\"}.glyphicon-queen:before{content:\"\\E212\"}.glyphicon-pawn:before{content:\"\\E213\"}.glyphicon-bishop:before{content:\"\\E214\"}.glyphicon-knight:before{content:\"\\E215\"}.glyphicon-baby-formula:before{content:\"\\E216\"}.glyphicon-tent:before{content:\"\\26FA\"}.glyphicon-blackboard:before{content:\"\\E218\"}.glyphicon-bed:before{content:\"\\E219\"}.glyphicon-apple:before{content:\"\\F8FF\"}.glyphicon-erase:before{content:\"\\E221\"}.glyphicon-hourglass:before{content:\"\\231B\"}.glyphicon-lamp:before{content:\"\\E223\"}.glyphicon-duplicate:before{content:\"\\E224\"}.glyphicon-piggy-bank:before{content:\"\\E225\"}.glyphicon-scissors:before{content:\"\\E226\"}.glyphicon-bitcoin:before{content:\"\\E227\"}.glyphicon-btc:before{content:\"\\E227\"}.glyphicon-xbt:before{content:\"\\E227\"}.glyphicon-yen:before{content:\"\\A5\"}.glyphicon-jpy:before{content:\"\\A5\"}.glyphicon-ruble:before{content:\"\\20BD\"}.glyphicon-rub:before{content:\"\\20BD\"}.glyphicon-scale:before{content:\"\\E230\"}.glyphicon-ice-lolly:before{content:\"\\E231\"}.glyphicon-ice-lolly-tasted:before{content:\"\\E232\"}.glyphicon-education:before{content:\"\\E233\"}.glyphicon-option-horizontal:before{content:\"\\E234\"}.glyphicon-option-vertical:before{content:\"\\E235\"}.glyphicon-menu-hamburger:before{content:\"\\E236\"}.glyphicon-modal-window:before{content:\"\\E237\"}.glyphicon-oil:before{content:\"\\E238\"}.glyphicon-grain:before{content:\"\\E239\"}.glyphicon-sunglasses:before{content:\"\\E240\"}.glyphicon-text-size:before{content:\"\\E241\"}.glyphicon-text-color:before{content:\"\\E242\"}.glyphicon-text-background:before{content:\"\\E243\"}.glyphicon-object-align-top:before{content:\"\\E244\"}.glyphicon-object-align-bottom:before{content:\"\\E245\"}.glyphicon-object-align-horizontal:before{content:\"\\E246\"}.glyphicon-object-align-left:before{content:\"\\E247\"}.glyphicon-object-align-vertical:before{content:\"\\E248\"}.glyphicon-object-align-right:before{content:\"\\E249\"}.glyphicon-triangle-right:before{content:\"\\E250\"}.glyphicon-triangle-left:before{content:\"\\E251\"}.glyphicon-triangle-bottom:before{content:\"\\E252\"}.glyphicon-triangle-top:before{content:\"\\E253\"}.glyphicon-console:before{content:\"\\E254\"}.glyphicon-superscript:before{content:\"\\E255\"}.glyphicon-subscript:before{content:\"\\E256\"}.glyphicon-menu-left:before{content:\"\\E257\"}.glyphicon-menu-right:before{content:\"\\E258\"}.glyphicon-menu-down:before{content:\"\\E259\"}.glyphicon-menu-up:before{content:\"\\E260\"}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}:after,:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}html{font-size:10px;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:14px;line-height:1.42857143;color:#333;background-color:#fff}button,input,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit}a{color:#337ab7;text-decoration:none}a:focus,a:hover{color:#23527c;text-decoration:underline}a:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}figure{margin:0}img{vertical-align:middle}.carousel-inner>.item>a>img,.carousel-inner>.item>img,.img-responsive,.thumbnail a>img,.thumbnail>img{display:block;max-width:100%;height:auto}.img-rounded{border-radius:6px}.img-thumbnail{display:inline-block;max-width:100%;height:auto;padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:4px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.img-circle{border-radius:50%}hr{margin-top:20px;margin-bottom:20px;border:0;border-top:1px solid #eee}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}[role=button]{cursor:pointer}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{font-family:inherit;font-weight:500;line-height:1.1;color:inherit}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-weight:400;line-height:1;color:#777}.h1,.h2,.h3,h1,h2,h3{margin-top:20px;margin-bottom:10px}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small{font-size:65%}.h4,.h5,.h6,h4,h5,h6{margin-top:10px;margin-bottom:10px}.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-size:75%}.h1,h1{font-size:36px}.h2,h2{font-size:30px}.h3,h3{font-size:24px}.h4,h4{font-size:18px}.h5,h5{font-size:14px}.h6,h6{font-size:12px}p{margin:0 0 10px}.lead{margin-bottom:20px;font-size:16px;font-weight:300;line-height:1.4}@media (min-width:768px){.lead{font-size:21px}}.small,small{font-size:85%}.mark,mark{padding:.2em;background-color:#fcf8e3}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-justify{text-align:justify}.text-nowrap{white-space:nowrap}.text-lowercase{text-transform:lowercase}.text-uppercase{text-transform:uppercase}.text-capitalize{text-transform:capitalize}.text-muted{color:#777}.text-primary{color:#337ab7}a.text-primary:focus,a.text-primary:hover{color:#286090}.text-success{color:#3c763d}a.text-success:focus,a.text-success:hover{color:#2b542c}.text-info{color:#31708f}a.text-info:focus,a.text-info:hover{color:#245269}.text-warning{color:#8a6d3b}a.text-warning:focus,a.text-warning:hover{color:#66512c}.text-danger{color:#a94442}a.text-danger:focus,a.text-danger:hover{color:#843534}.bg-primary{color:#fff;background-color:#337ab7}a.bg-primary:focus,a.bg-primary:hover{background-color:#286090}.bg-success{background-color:#dff0d8}a.bg-success:focus,a.bg-success:hover{background-color:#c1e2b3}.bg-info{background-color:#d9edf7}a.bg-info:focus,a.bg-info:hover{background-color:#afd9ee}.bg-warning{background-color:#fcf8e3}a.bg-warning:focus,a.bg-warning:hover{background-color:#f7ecb5}.bg-danger{background-color:#f2dede}a.bg-danger:focus,a.bg-danger:hover{background-color:#e4b9b9}.page-header{padding-bottom:9px;margin:40px 0 20px;border-bottom:1px solid #eee}ol,ul{margin-top:0;margin-bottom:10px}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}.list-unstyled{padding-left:0;list-style:none}.list-inline{padding-left:0;margin-left:-5px;list-style:none}.list-inline>li{display:inline-block;padding-right:5px;padding-left:5px}dl{margin-top:0;margin-bottom:20px}dd,dt{line-height:1.42857143}dt{font-weight:700}dd{margin-left:0}@media (min-width:768px){.dl-horizontal dt{float:left;width:160px;overflow:hidden;clear:left;text-align:right;text-overflow:ellipsis;white-space:nowrap}.dl-horizontal dd{margin-left:180px}}abbr[data-original-title],abbr[title]{cursor:help;border-bottom:1px dotted #777}.initialism{font-size:90%;text-transform:uppercase}blockquote{padding:10px 20px;margin:0 0 20px;font-size:17.5px;border-left:5px solid #eee}blockquote ol:last-child,blockquote p:last-child,blockquote ul:last-child{margin-bottom:0}blockquote .small,blockquote footer,blockquote small{display:block;font-size:80%;line-height:1.42857143;color:#777}blockquote .small:before,blockquote footer:before,blockquote small:before{content:'\\2014   \\A0'}.blockquote-reverse,blockquote.pull-right{padding-right:15px;padding-left:0;text-align:right;border-right:5px solid #eee;border-left:0}.blockquote-reverse .small:before,.blockquote-reverse footer:before,.blockquote-reverse small:before,blockquote.pull-right .small:before,blockquote.pull-right footer:before,blockquote.pull-right small:before{content:''}.blockquote-reverse .small:after,.blockquote-reverse footer:after,.blockquote-reverse small:after,blockquote.pull-right .small:after,blockquote.pull-right footer:after,blockquote.pull-right small:after{content:'\\A0   \\2014'}address{margin-bottom:20px;font-style:normal;line-height:1.42857143}code,kbd,pre,samp{font-family:Menlo,Monaco,Consolas,\"Courier New\",monospace}code{padding:2px 4px;font-size:90%;color:#c7254e;background-color:#f9f2f4;border-radius:4px}kbd{padding:2px 4px;font-size:90%;color:#fff;background-color:#333;border-radius:3px;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.25);box-shadow:inset 0 -1px 0 rgba(0,0,0,.25)}kbd kbd{padding:0;font-size:100%;font-weight:700;-webkit-box-shadow:none;box-shadow:none}pre{display:block;padding:9.5px;margin:0 0 10px;font-size:13px;line-height:1.42857143;color:#333;word-break:break-all;word-wrap:break-word;background-color:#f5f5f5;border:1px solid #ccc;border-radius:4px}pre code{padding:0;font-size:inherit;color:inherit;white-space:pre-wrap;background-color:transparent;border-radius:0}.pre-scrollable{max-height:340px;overflow-y:scroll}.container{padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:768px){.container{width:750px}}@media (min-width:992px){.container{width:970px}}@media (min-width:1200px){.container{width:1170px}}.container-fluid{padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}.row{margin-right:-15px;margin-left:-15px}.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{position:relative;min-height:1px;padding-right:15px;padding-left:15px}.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{float:left}.col-xs-12{width:100%}.col-xs-11{width:91.66666667%}.col-xs-10{width:83.33333333%}.col-xs-9{width:75%}.col-xs-8{width:66.66666667%}.col-xs-7{width:58.33333333%}.col-xs-6{width:50%}.col-xs-5{width:41.66666667%}.col-xs-4{width:33.33333333%}.col-xs-3{width:25%}.col-xs-2{width:16.66666667%}.col-xs-1{width:8.33333333%}.col-xs-pull-12{right:100%}.col-xs-pull-11{right:91.66666667%}.col-xs-pull-10{right:83.33333333%}.col-xs-pull-9{right:75%}.col-xs-pull-8{right:66.66666667%}.col-xs-pull-7{right:58.33333333%}.col-xs-pull-6{right:50%}.col-xs-pull-5{right:41.66666667%}.col-xs-pull-4{right:33.33333333%}.col-xs-pull-3{right:25%}.col-xs-pull-2{right:16.66666667%}.col-xs-pull-1{right:8.33333333%}.col-xs-pull-0{right:auto}.col-xs-push-12{left:100%}.col-xs-push-11{left:91.66666667%}.col-xs-push-10{left:83.33333333%}.col-xs-push-9{left:75%}.col-xs-push-8{left:66.66666667%}.col-xs-push-7{left:58.33333333%}.col-xs-push-6{left:50%}.col-xs-push-5{left:41.66666667%}.col-xs-push-4{left:33.33333333%}.col-xs-push-3{left:25%}.col-xs-push-2{left:16.66666667%}.col-xs-push-1{left:8.33333333%}.col-xs-push-0{left:auto}.col-xs-offset-12{margin-left:100%}.col-xs-offset-11{margin-left:91.66666667%}.col-xs-offset-10{margin-left:83.33333333%}.col-xs-offset-9{margin-left:75%}.col-xs-offset-8{margin-left:66.66666667%}.col-xs-offset-7{margin-left:58.33333333%}.col-xs-offset-6{margin-left:50%}.col-xs-offset-5{margin-left:41.66666667%}.col-xs-offset-4{margin-left:33.33333333%}.col-xs-offset-3{margin-left:25%}.col-xs-offset-2{margin-left:16.66666667%}.col-xs-offset-1{margin-left:8.33333333%}.col-xs-offset-0{margin-left:0}@media (min-width:768px){.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9{float:left}.col-sm-12{width:100%}.col-sm-11{width:91.66666667%}.col-sm-10{width:83.33333333%}.col-sm-9{width:75%}.col-sm-8{width:66.66666667%}.col-sm-7{width:58.33333333%}.col-sm-6{width:50%}.col-sm-5{width:41.66666667%}.col-sm-4{width:33.33333333%}.col-sm-3{width:25%}.col-sm-2{width:16.66666667%}.col-sm-1{width:8.33333333%}.col-sm-pull-12{right:100%}.col-sm-pull-11{right:91.66666667%}.col-sm-pull-10{right:83.33333333%}.col-sm-pull-9{right:75%}.col-sm-pull-8{right:66.66666667%}.col-sm-pull-7{right:58.33333333%}.col-sm-pull-6{right:50%}.col-sm-pull-5{right:41.66666667%}.col-sm-pull-4{right:33.33333333%}.col-sm-pull-3{right:25%}.col-sm-pull-2{right:16.66666667%}.col-sm-pull-1{right:8.33333333%}.col-sm-pull-0{right:auto}.col-sm-push-12{left:100%}.col-sm-push-11{left:91.66666667%}.col-sm-push-10{left:83.33333333%}.col-sm-push-9{left:75%}.col-sm-push-8{left:66.66666667%}.col-sm-push-7{left:58.33333333%}.col-sm-push-6{left:50%}.col-sm-push-5{left:41.66666667%}.col-sm-push-4{left:33.33333333%}.col-sm-push-3{left:25%}.col-sm-push-2{left:16.66666667%}.col-sm-push-1{left:8.33333333%}.col-sm-push-0{left:auto}.col-sm-offset-12{margin-left:100%}.col-sm-offset-11{margin-left:91.66666667%}.col-sm-offset-10{margin-left:83.33333333%}.col-sm-offset-9{margin-left:75%}.col-sm-offset-8{margin-left:66.66666667%}.col-sm-offset-7{margin-left:58.33333333%}.col-sm-offset-6{margin-left:50%}.col-sm-offset-5{margin-left:41.66666667%}.col-sm-offset-4{margin-left:33.33333333%}.col-sm-offset-3{margin-left:25%}.col-sm-offset-2{margin-left:16.66666667%}.col-sm-offset-1{margin-left:8.33333333%}.col-sm-offset-0{margin-left:0}}@media (min-width:992px){.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9{float:left}.col-md-12{width:100%}.col-md-11{width:91.66666667%}.col-md-10{width:83.33333333%}.col-md-9{width:75%}.col-md-8{width:66.66666667%}.col-md-7{width:58.33333333%}.col-md-6{width:50%}.col-md-5{width:41.66666667%}.col-md-4{width:33.33333333%}.col-md-3{width:25%}.col-md-2{width:16.66666667%}.col-md-1{width:8.33333333%}.col-md-pull-12{right:100%}.col-md-pull-11{right:91.66666667%}.col-md-pull-10{right:83.33333333%}.col-md-pull-9{right:75%}.col-md-pull-8{right:66.66666667%}.col-md-pull-7{right:58.33333333%}.col-md-pull-6{right:50%}.col-md-pull-5{right:41.66666667%}.col-md-pull-4{right:33.33333333%}.col-md-pull-3{right:25%}.col-md-pull-2{right:16.66666667%}.col-md-pull-1{right:8.33333333%}.col-md-pull-0{right:auto}.col-md-push-12{left:100%}.col-md-push-11{left:91.66666667%}.col-md-push-10{left:83.33333333%}.col-md-push-9{left:75%}.col-md-push-8{left:66.66666667%}.col-md-push-7{left:58.33333333%}.col-md-push-6{left:50%}.col-md-push-5{left:41.66666667%}.col-md-push-4{left:33.33333333%}.col-md-push-3{left:25%}.col-md-push-2{left:16.66666667%}.col-md-push-1{left:8.33333333%}.col-md-push-0{left:auto}.col-md-offset-12{margin-left:100%}.col-md-offset-11{margin-left:91.66666667%}.col-md-offset-10{margin-left:83.33333333%}.col-md-offset-9{margin-left:75%}.col-md-offset-8{margin-left:66.66666667%}.col-md-offset-7{margin-left:58.33333333%}.col-md-offset-6{margin-left:50%}.col-md-offset-5{margin-left:41.66666667%}.col-md-offset-4{margin-left:33.33333333%}.col-md-offset-3{margin-left:25%}.col-md-offset-2{margin-left:16.66666667%}.col-md-offset-1{margin-left:8.33333333%}.col-md-offset-0{margin-left:0}}@media (min-width:1200px){.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9{float:left}.col-lg-12{width:100%}.col-lg-11{width:91.66666667%}.col-lg-10{width:83.33333333%}.col-lg-9{width:75%}.col-lg-8{width:66.66666667%}.col-lg-7{width:58.33333333%}.col-lg-6{width:50%}.col-lg-5{width:41.66666667%}.col-lg-4{width:33.33333333%}.col-lg-3{width:25%}.col-lg-2{width:16.66666667%}.col-lg-1{width:8.33333333%}.col-lg-pull-12{right:100%}.col-lg-pull-11{right:91.66666667%}.col-lg-pull-10{right:83.33333333%}.col-lg-pull-9{right:75%}.col-lg-pull-8{right:66.66666667%}.col-lg-pull-7{right:58.33333333%}.col-lg-pull-6{right:50%}.col-lg-pull-5{right:41.66666667%}.col-lg-pull-4{right:33.33333333%}.col-lg-pull-3{right:25%}.col-lg-pull-2{right:16.66666667%}.col-lg-pull-1{right:8.33333333%}.col-lg-pull-0{right:auto}.col-lg-push-12{left:100%}.col-lg-push-11{left:91.66666667%}.col-lg-push-10{left:83.33333333%}.col-lg-push-9{left:75%}.col-lg-push-8{left:66.66666667%}.col-lg-push-7{left:58.33333333%}.col-lg-push-6{left:50%}.col-lg-push-5{left:41.66666667%}.col-lg-push-4{left:33.33333333%}.col-lg-push-3{left:25%}.col-lg-push-2{left:16.66666667%}.col-lg-push-1{left:8.33333333%}.col-lg-push-0{left:auto}.col-lg-offset-12{margin-left:100%}.col-lg-offset-11{margin-left:91.66666667%}.col-lg-offset-10{margin-left:83.33333333%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-8{margin-left:66.66666667%}.col-lg-offset-7{margin-left:58.33333333%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-5{margin-left:41.66666667%}.col-lg-offset-4{margin-left:33.33333333%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-2{margin-left:16.66666667%}.col-lg-offset-1{margin-left:8.33333333%}.col-lg-offset-0{margin-left:0}}table{background-color:transparent}caption{padding-top:8px;padding-bottom:8px;color:#777;text-align:left}th{text-align:left}.table{width:100%;max-width:100%;margin-bottom:20px}.table>tbody>tr>td,.table>tbody>tr>th,.table>tfoot>tr>td,.table>tfoot>tr>th,.table>thead>tr>td,.table>thead>tr>th{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #ddd}.table>thead>tr>th{vertical-align:bottom;border-bottom:2px solid #ddd}.table>caption+thead>tr:first-child>td,.table>caption+thead>tr:first-child>th,.table>colgroup+thead>tr:first-child>td,.table>colgroup+thead>tr:first-child>th,.table>thead:first-child>tr:first-child>td,.table>thead:first-child>tr:first-child>th{border-top:0}.table>tbody+tbody{border-top:2px solid #ddd}.table .table{background-color:#fff}.table-condensed>tbody>tr>td,.table-condensed>tbody>tr>th,.table-condensed>tfoot>tr>td,.table-condensed>tfoot>tr>th,.table-condensed>thead>tr>td,.table-condensed>thead>tr>th{padding:5px}.table-bordered{border:1px solid #ddd}.table-bordered>tbody>tr>td,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>td,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border:1px solid #ddd}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped>tbody>tr:nth-of-type(odd){background-color:#f9f9f9}.table-hover>tbody>tr:hover{background-color:#f5f5f5}table col[class*=col-]{position:static;display:table-column;float:none}table td[class*=col-],table th[class*=col-]{position:static;display:table-cell;float:none}.table>tbody>tr.active>td,.table>tbody>tr.active>th,.table>tbody>tr>td.active,.table>tbody>tr>th.active,.table>tfoot>tr.active>td,.table>tfoot>tr.active>th,.table>tfoot>tr>td.active,.table>tfoot>tr>th.active,.table>thead>tr.active>td,.table>thead>tr.active>th,.table>thead>tr>td.active,.table>thead>tr>th.active{background-color:#f5f5f5}.table-hover>tbody>tr.active:hover>td,.table-hover>tbody>tr.active:hover>th,.table-hover>tbody>tr:hover>.active,.table-hover>tbody>tr>td.active:hover,.table-hover>tbody>tr>th.active:hover{background-color:#e8e8e8}.table>tbody>tr.success>td,.table>tbody>tr.success>th,.table>tbody>tr>td.success,.table>tbody>tr>th.success,.table>tfoot>tr.success>td,.table>tfoot>tr.success>th,.table>tfoot>tr>td.success,.table>tfoot>tr>th.success,.table>thead>tr.success>td,.table>thead>tr.success>th,.table>thead>tr>td.success,.table>thead>tr>th.success{background-color:#dff0d8}.table-hover>tbody>tr.success:hover>td,.table-hover>tbody>tr.success:hover>th,.table-hover>tbody>tr:hover>.success,.table-hover>tbody>tr>td.success:hover,.table-hover>tbody>tr>th.success:hover{background-color:#d0e9c6}.table>tbody>tr.info>td,.table>tbody>tr.info>th,.table>tbody>tr>td.info,.table>tbody>tr>th.info,.table>tfoot>tr.info>td,.table>tfoot>tr.info>th,.table>tfoot>tr>td.info,.table>tfoot>tr>th.info,.table>thead>tr.info>td,.table>thead>tr.info>th,.table>thead>tr>td.info,.table>thead>tr>th.info{background-color:#d9edf7}.table-hover>tbody>tr.info:hover>td,.table-hover>tbody>tr.info:hover>th,.table-hover>tbody>tr:hover>.info,.table-hover>tbody>tr>td.info:hover,.table-hover>tbody>tr>th.info:hover{background-color:#c4e3f3}.table>tbody>tr.warning>td,.table>tbody>tr.warning>th,.table>tbody>tr>td.warning,.table>tbody>tr>th.warning,.table>tfoot>tr.warning>td,.table>tfoot>tr.warning>th,.table>tfoot>tr>td.warning,.table>tfoot>tr>th.warning,.table>thead>tr.warning>td,.table>thead>tr.warning>th,.table>thead>tr>td.warning,.table>thead>tr>th.warning{background-color:#fcf8e3}.table-hover>tbody>tr.warning:hover>td,.table-hover>tbody>tr.warning:hover>th,.table-hover>tbody>tr:hover>.warning,.table-hover>tbody>tr>td.warning:hover,.table-hover>tbody>tr>th.warning:hover{background-color:#faf2cc}.table>tbody>tr.danger>td,.table>tbody>tr.danger>th,.table>tbody>tr>td.danger,.table>tbody>tr>th.danger,.table>tfoot>tr.danger>td,.table>tfoot>tr.danger>th,.table>tfoot>tr>td.danger,.table>tfoot>tr>th.danger,.table>thead>tr.danger>td,.table>thead>tr.danger>th,.table>thead>tr>td.danger,.table>thead>tr>th.danger{background-color:#f2dede}.table-hover>tbody>tr.danger:hover>td,.table-hover>tbody>tr.danger:hover>th,.table-hover>tbody>tr:hover>.danger,.table-hover>tbody>tr>td.danger:hover,.table-hover>tbody>tr>th.danger:hover{background-color:#ebcccc}.table-responsive{min-height:.01%;overflow-x:auto}@media screen and (max-width:767px){.table-responsive{width:100%;margin-bottom:15px;overflow-y:hidden;-ms-overflow-style:-ms-autohiding-scrollbar;border:1px solid #ddd}.table-responsive>.table{margin-bottom:0}.table-responsive>.table>tbody>tr>td,.table-responsive>.table>tbody>tr>th,.table-responsive>.table>tfoot>tr>td,.table-responsive>.table>tfoot>tr>th,.table-responsive>.table>thead>tr>td,.table-responsive>.table>thead>tr>th{white-space:nowrap}.table-responsive>.table-bordered{border:0}.table-responsive>.table-bordered>tbody>tr>td:first-child,.table-responsive>.table-bordered>tbody>tr>th:first-child,.table-responsive>.table-bordered>tfoot>tr>td:first-child,.table-responsive>.table-bordered>tfoot>tr>th:first-child,.table-responsive>.table-bordered>thead>tr>td:first-child,.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}.table-responsive>.table-bordered>tbody>tr>td:last-child,.table-responsive>.table-bordered>tbody>tr>th:last-child,.table-responsive>.table-bordered>tfoot>tr>td:last-child,.table-responsive>.table-bordered>tfoot>tr>th:last-child,.table-responsive>.table-bordered>thead>tr>td:last-child,.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}.table-responsive>.table-bordered>tbody>tr:last-child>td,.table-responsive>.table-bordered>tbody>tr:last-child>th,.table-responsive>.table-bordered>tfoot>tr:last-child>td,.table-responsive>.table-bordered>tfoot>tr:last-child>th{border-bottom:0}}fieldset{min-width:0;padding:0;margin:0;border:0}legend{display:block;width:100%;padding:0;margin-bottom:20px;font-size:21px;line-height:inherit;color:#333;border:0;border-bottom:1px solid #e5e5e5}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700}input[type=search]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}input[type=checkbox],input[type=radio]{margin:4px 0 0;margin-top:1px\\9;line-height:normal}input[type=file]{display:block}input[type=range]{display:block;width:100%}select[multiple],select[size]{height:auto}input[type=file]:focus,input[type=checkbox]:focus,input[type=radio]:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}output{display:block;padding-top:7px;font-size:14px;line-height:1.42857143;color:#555}.form-control{display:block;width:100%;height:34px;padding:6px 12px;font-size:14px;line-height:1.42857143;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.form-control:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.form-control::-moz-placeholder{color:#999;opacity:1}.form-control:-ms-input-placeholder{color:#999}.form-control::-webkit-input-placeholder{color:#999}.form-control[disabled],.form-control[readonly],fieldset[disabled] .form-control{background-color:#eee;opacity:1}.form-control[disabled],fieldset[disabled] .form-control{cursor:not-allowed}textarea.form-control{height:auto}input[type=search]{-webkit-appearance:none}@media screen and (-webkit-min-device-pixel-ratio:0){input[type=date].form-control,input[type=time].form-control,input[type=datetime-local].form-control,input[type=month].form-control{line-height:34px}.input-group-sm input[type=date],.input-group-sm input[type=time],.input-group-sm input[type=datetime-local],.input-group-sm input[type=month],input[type=date].input-sm,input[type=time].input-sm,input[type=datetime-local].input-sm,input[type=month].input-sm{line-height:30px}.input-group-lg input[type=date],.input-group-lg input[type=time],.input-group-lg input[type=datetime-local],.input-group-lg input[type=month],input[type=date].input-lg,input[type=time].input-lg,input[type=datetime-local].input-lg,input[type=month].input-lg{line-height:46px}}.form-group{margin-bottom:15px}.checkbox,.radio{position:relative;display:block;margin-top:10px;margin-bottom:10px}.checkbox label,.radio label{min-height:20px;padding-left:20px;margin-bottom:0;font-weight:400;cursor:pointer}.checkbox input[type=checkbox],.checkbox-inline input[type=checkbox],.radio input[type=radio],.radio-inline input[type=radio]{position:absolute;margin-top:4px\\9;margin-left:-20px}.checkbox+.checkbox,.radio+.radio{margin-top:-5px}.checkbox-inline,.radio-inline{position:relative;display:inline-block;padding-left:20px;margin-bottom:0;font-weight:400;vertical-align:middle;cursor:pointer}.checkbox-inline+.checkbox-inline,.radio-inline+.radio-inline{margin-top:0;margin-left:10px}fieldset[disabled] input[type=checkbox],fieldset[disabled] input[type=radio],input[type=checkbox].disabled,input[type=checkbox][disabled],input[type=radio].disabled,input[type=radio][disabled]{cursor:not-allowed}.checkbox-inline.disabled,.radio-inline.disabled,fieldset[disabled] .checkbox-inline,fieldset[disabled] .radio-inline{cursor:not-allowed}.checkbox.disabled label,.radio.disabled label,fieldset[disabled] .checkbox label,fieldset[disabled] .radio label{cursor:not-allowed}.form-control-static{min-height:34px;padding-top:7px;padding-bottom:7px;margin-bottom:0}.form-control-static.input-lg,.form-control-static.input-sm{padding-right:0;padding-left:0}.input-sm{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}select.input-sm{height:30px;line-height:30px}select[multiple].input-sm,textarea.input-sm{height:auto}.form-group-sm .form-control{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}.form-group-sm select.form-control{height:30px;line-height:30px}.form-group-sm select[multiple].form-control,.form-group-sm textarea.form-control{height:auto}.form-group-sm .form-control-static{height:30px;min-height:32px;padding:6px 10px;font-size:12px;line-height:1.5}.input-lg{height:46px;padding:10px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}select.input-lg{height:46px;line-height:46px}select[multiple].input-lg,textarea.input-lg{height:auto}.form-group-lg .form-control{height:46px;padding:10px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}.form-group-lg select.form-control{height:46px;line-height:46px}.form-group-lg select[multiple].form-control,.form-group-lg textarea.form-control{height:auto}.form-group-lg .form-control-static{height:46px;min-height:38px;padding:11px 16px;font-size:18px;line-height:1.3333333}.has-feedback{position:relative}.has-feedback .form-control{padding-right:42.5px}.form-control-feedback{position:absolute;top:0;right:0;z-index:2;display:block;width:34px;height:34px;line-height:34px;text-align:center;pointer-events:none}.form-group-lg .form-control+.form-control-feedback,.input-group-lg+.form-control-feedback,.input-lg+.form-control-feedback{width:46px;height:46px;line-height:46px}.form-group-sm .form-control+.form-control-feedback,.input-group-sm+.form-control-feedback,.input-sm+.form-control-feedback{width:30px;height:30px;line-height:30px}.has-success .checkbox,.has-success .checkbox-inline,.has-success .control-label,.has-success .help-block,.has-success .radio,.has-success .radio-inline,.has-success.checkbox label,.has-success.checkbox-inline label,.has-success.radio label,.has-success.radio-inline label{color:#3c763d}.has-success .form-control{border-color:#3c763d;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-success .form-control:focus{border-color:#2b542c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168}.has-success .input-group-addon{color:#3c763d;background-color:#dff0d8;border-color:#3c763d}.has-success .form-control-feedback{color:#3c763d}.has-warning .checkbox,.has-warning .checkbox-inline,.has-warning .control-label,.has-warning .help-block,.has-warning .radio,.has-warning .radio-inline,.has-warning.checkbox label,.has-warning.checkbox-inline label,.has-warning.radio label,.has-warning.radio-inline label{color:#8a6d3b}.has-warning .form-control{border-color:#8a6d3b;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-warning .form-control:focus{border-color:#66512c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b}.has-warning .input-group-addon{color:#8a6d3b;background-color:#fcf8e3;border-color:#8a6d3b}.has-warning .form-control-feedback{color:#8a6d3b}.has-error .checkbox,.has-error .checkbox-inline,.has-error .control-label,.has-error .help-block,.has-error .radio,.has-error .radio-inline,.has-error.checkbox label,.has-error.checkbox-inline label,.has-error.radio label,.has-error.radio-inline label{color:#a94442}.has-error .form-control{border-color:#a94442;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-error .form-control:focus{border-color:#843534;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483}.has-error .input-group-addon{color:#a94442;background-color:#f2dede;border-color:#a94442}.has-error .form-control-feedback{color:#a94442}.has-feedback label~.form-control-feedback{top:25px}.has-feedback label.sr-only~.form-control-feedback{top:0}.help-block{display:block;margin-top:5px;margin-bottom:10px;color:#737373}@media (min-width:768px){.form-inline .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .form-control-static{display:inline-block}.form-inline .input-group{display:inline-table;vertical-align:middle}.form-inline .input-group .form-control,.form-inline .input-group .input-group-addon,.form-inline .input-group .input-group-btn{width:auto}.form-inline .input-group>.form-control{width:100%}.form-inline .control-label{margin-bottom:0;vertical-align:middle}.form-inline .checkbox,.form-inline .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.form-inline .checkbox label,.form-inline .radio label{padding-left:0}.form-inline .checkbox input[type=checkbox],.form-inline .radio input[type=radio]{position:relative;margin-left:0}.form-inline .has-feedback .form-control-feedback{top:0}}.form-horizontal .checkbox,.form-horizontal .checkbox-inline,.form-horizontal .radio,.form-horizontal .radio-inline{padding-top:7px;margin-top:0;margin-bottom:0}.form-horizontal .checkbox,.form-horizontal .radio{min-height:27px}.form-horizontal .form-group{margin-right:-15px;margin-left:-15px}@media (min-width:768px){.form-horizontal .control-label{padding-top:7px;margin-bottom:0;text-align:right}}.form-horizontal .has-feedback .form-control-feedback{right:15px}@media (min-width:768px){.form-horizontal .form-group-lg .control-label{padding-top:14.33px;font-size:18px}}@media (min-width:768px){.form-horizontal .form-group-sm .control-label{padding-top:6px;font-size:12px}}.btn{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1px solid transparent;border-radius:4px}.btn.active.focus,.btn.active:focus,.btn.focus,.btn:active.focus,.btn:active:focus,.btn:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.btn.focus,.btn:focus,.btn:hover{color:#333;text-decoration:none}.btn.active,.btn:active{background-image:none;outline:0;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn.disabled,.btn[disabled],fieldset[disabled] .btn{cursor:not-allowed;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none;opacity:.65}a.btn.disabled,fieldset[disabled] a.btn{pointer-events:none}.btn-default{color:#333;background-color:#fff;border-color:#ccc}.btn-default.focus,.btn-default:focus{color:#333;background-color:#e6e6e6;border-color:#8c8c8c}.btn-default:hover{color:#333;background-color:#e6e6e6;border-color:#adadad}.btn-default.active,.btn-default:active,.open>.dropdown-toggle.btn-default{color:#333;background-color:#e6e6e6;border-color:#adadad}.btn-default.active.focus,.btn-default.active:focus,.btn-default.active:hover,.btn-default:active.focus,.btn-default:active:focus,.btn-default:active:hover,.open>.dropdown-toggle.btn-default.focus,.open>.dropdown-toggle.btn-default:focus,.open>.dropdown-toggle.btn-default:hover{color:#333;background-color:#d4d4d4;border-color:#8c8c8c}.btn-default.active,.btn-default:active,.open>.dropdown-toggle.btn-default{background-image:none}.btn-default.disabled,.btn-default.disabled.active,.btn-default.disabled.focus,.btn-default.disabled:active,.btn-default.disabled:focus,.btn-default.disabled:hover,.btn-default[disabled],.btn-default[disabled].active,.btn-default[disabled].focus,.btn-default[disabled]:active,.btn-default[disabled]:focus,.btn-default[disabled]:hover,fieldset[disabled] .btn-default,fieldset[disabled] .btn-default.active,fieldset[disabled] .btn-default.focus,fieldset[disabled] .btn-default:active,fieldset[disabled] .btn-default:focus,fieldset[disabled] .btn-default:hover{background-color:#fff;border-color:#ccc}.btn-default .badge{color:#fff;background-color:#333}.btn-primary{color:#fff;background-color:#337ab7;border-color:#2e6da4}.btn-primary.focus,.btn-primary:focus{color:#fff;background-color:#286090;border-color:#122b40}.btn-primary:hover{color:#fff;background-color:#286090;border-color:#204d74}.btn-primary.active,.btn-primary:active,.open>.dropdown-toggle.btn-primary{color:#fff;background-color:#286090;border-color:#204d74}.btn-primary.active.focus,.btn-primary.active:focus,.btn-primary.active:hover,.btn-primary:active.focus,.btn-primary:active:focus,.btn-primary:active:hover,.open>.dropdown-toggle.btn-primary.focus,.open>.dropdown-toggle.btn-primary:focus,.open>.dropdown-toggle.btn-primary:hover{color:#fff;background-color:#204d74;border-color:#122b40}.btn-primary.active,.btn-primary:active,.open>.dropdown-toggle.btn-primary{background-image:none}.btn-primary.disabled,.btn-primary.disabled.active,.btn-primary.disabled.focus,.btn-primary.disabled:active,.btn-primary.disabled:focus,.btn-primary.disabled:hover,.btn-primary[disabled],.btn-primary[disabled].active,.btn-primary[disabled].focus,.btn-primary[disabled]:active,.btn-primary[disabled]:focus,.btn-primary[disabled]:hover,fieldset[disabled] .btn-primary,fieldset[disabled] .btn-primary.active,fieldset[disabled] .btn-primary.focus,fieldset[disabled] .btn-primary:active,fieldset[disabled] .btn-primary:focus,fieldset[disabled] .btn-primary:hover{background-color:#337ab7;border-color:#2e6da4}.btn-primary .badge{color:#337ab7;background-color:#fff}.btn-success{color:#fff;background-color:#5cb85c;border-color:#4cae4c}.btn-success.focus,.btn-success:focus{color:#fff;background-color:#449d44;border-color:#255625}.btn-success:hover{color:#fff;background-color:#449d44;border-color:#398439}.btn-success.active,.btn-success:active,.open>.dropdown-toggle.btn-success{color:#fff;background-color:#449d44;border-color:#398439}.btn-success.active.focus,.btn-success.active:focus,.btn-success.active:hover,.btn-success:active.focus,.btn-success:active:focus,.btn-success:active:hover,.open>.dropdown-toggle.btn-success.focus,.open>.dropdown-toggle.btn-success:focus,.open>.dropdown-toggle.btn-success:hover{color:#fff;background-color:#398439;border-color:#255625}.btn-success.active,.btn-success:active,.open>.dropdown-toggle.btn-success{background-image:none}.btn-success.disabled,.btn-success.disabled.active,.btn-success.disabled.focus,.btn-success.disabled:active,.btn-success.disabled:focus,.btn-success.disabled:hover,.btn-success[disabled],.btn-success[disabled].active,.btn-success[disabled].focus,.btn-success[disabled]:active,.btn-success[disabled]:focus,.btn-success[disabled]:hover,fieldset[disabled] .btn-success,fieldset[disabled] .btn-success.active,fieldset[disabled] .btn-success.focus,fieldset[disabled] .btn-success:active,fieldset[disabled] .btn-success:focus,fieldset[disabled] .btn-success:hover{background-color:#5cb85c;border-color:#4cae4c}.btn-success .badge{color:#5cb85c;background-color:#fff}.btn-info{color:#fff;background-color:#5bc0de;border-color:#46b8da}.btn-info.focus,.btn-info:focus{color:#fff;background-color:#31b0d5;border-color:#1b6d85}.btn-info:hover{color:#fff;background-color:#31b0d5;border-color:#269abc}.btn-info.active,.btn-info:active,.open>.dropdown-toggle.btn-info{color:#fff;background-color:#31b0d5;border-color:#269abc}.btn-info.active.focus,.btn-info.active:focus,.btn-info.active:hover,.btn-info:active.focus,.btn-info:active:focus,.btn-info:active:hover,.open>.dropdown-toggle.btn-info.focus,.open>.dropdown-toggle.btn-info:focus,.open>.dropdown-toggle.btn-info:hover{color:#fff;background-color:#269abc;border-color:#1b6d85}.btn-info.active,.btn-info:active,.open>.dropdown-toggle.btn-info{background-image:none}.btn-info.disabled,.btn-info.disabled.active,.btn-info.disabled.focus,.btn-info.disabled:active,.btn-info.disabled:focus,.btn-info.disabled:hover,.btn-info[disabled],.btn-info[disabled].active,.btn-info[disabled].focus,.btn-info[disabled]:active,.btn-info[disabled]:focus,.btn-info[disabled]:hover,fieldset[disabled] .btn-info,fieldset[disabled] .btn-info.active,fieldset[disabled] .btn-info.focus,fieldset[disabled] .btn-info:active,fieldset[disabled] .btn-info:focus,fieldset[disabled] .btn-info:hover{background-color:#5bc0de;border-color:#46b8da}.btn-info .badge{color:#5bc0de;background-color:#fff}.btn-warning{color:#fff;background-color:#f0ad4e;border-color:#eea236}.btn-warning.focus,.btn-warning:focus{color:#fff;background-color:#ec971f;border-color:#985f0d}.btn-warning:hover{color:#fff;background-color:#ec971f;border-color:#d58512}.btn-warning.active,.btn-warning:active,.open>.dropdown-toggle.btn-warning{color:#fff;background-color:#ec971f;border-color:#d58512}.btn-warning.active.focus,.btn-warning.active:focus,.btn-warning.active:hover,.btn-warning:active.focus,.btn-warning:active:focus,.btn-warning:active:hover,.open>.dropdown-toggle.btn-warning.focus,.open>.dropdown-toggle.btn-warning:focus,.open>.dropdown-toggle.btn-warning:hover{color:#fff;background-color:#d58512;border-color:#985f0d}.btn-warning.active,.btn-warning:active,.open>.dropdown-toggle.btn-warning{background-image:none}.btn-warning.disabled,.btn-warning.disabled.active,.btn-warning.disabled.focus,.btn-warning.disabled:active,.btn-warning.disabled:focus,.btn-warning.disabled:hover,.btn-warning[disabled],.btn-warning[disabled].active,.btn-warning[disabled].focus,.btn-warning[disabled]:active,.btn-warning[disabled]:focus,.btn-warning[disabled]:hover,fieldset[disabled] .btn-warning,fieldset[disabled] .btn-warning.active,fieldset[disabled] .btn-warning.focus,fieldset[disabled] .btn-warning:active,fieldset[disabled] .btn-warning:focus,fieldset[disabled] .btn-warning:hover{background-color:#f0ad4e;border-color:#eea236}.btn-warning .badge{color:#f0ad4e;background-color:#fff}.btn-danger{color:#fff;background-color:#d9534f;border-color:#d43f3a}.btn-danger.focus,.btn-danger:focus{color:#fff;background-color:#c9302c;border-color:#761c19}.btn-danger:hover{color:#fff;background-color:#c9302c;border-color:#ac2925}.btn-danger.active,.btn-danger:active,.open>.dropdown-toggle.btn-danger{color:#fff;background-color:#c9302c;border-color:#ac2925}.btn-danger.active.focus,.btn-danger.active:focus,.btn-danger.active:hover,.btn-danger:active.focus,.btn-danger:active:focus,.btn-danger:active:hover,.open>.dropdown-toggle.btn-danger.focus,.open>.dropdown-toggle.btn-danger:focus,.open>.dropdown-toggle.btn-danger:hover{color:#fff;background-color:#ac2925;border-color:#761c19}.btn-danger.active,.btn-danger:active,.open>.dropdown-toggle.btn-danger{background-image:none}.btn-danger.disabled,.btn-danger.disabled.active,.btn-danger.disabled.focus,.btn-danger.disabled:active,.btn-danger.disabled:focus,.btn-danger.disabled:hover,.btn-danger[disabled],.btn-danger[disabled].active,.btn-danger[disabled].focus,.btn-danger[disabled]:active,.btn-danger[disabled]:focus,.btn-danger[disabled]:hover,fieldset[disabled] .btn-danger,fieldset[disabled] .btn-danger.active,fieldset[disabled] .btn-danger.focus,fieldset[disabled] .btn-danger:active,fieldset[disabled] .btn-danger:focus,fieldset[disabled] .btn-danger:hover{background-color:#d9534f;border-color:#d43f3a}.btn-danger .badge{color:#d9534f;background-color:#fff}.btn-link{font-weight:400;color:#337ab7;border-radius:0}.btn-link,.btn-link.active,.btn-link:active,.btn-link[disabled],fieldset[disabled] .btn-link{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.btn-link,.btn-link:active,.btn-link:focus,.btn-link:hover{border-color:transparent}.btn-link:focus,.btn-link:hover{color:#23527c;text-decoration:underline;background-color:transparent}.btn-link[disabled]:focus,.btn-link[disabled]:hover,fieldset[disabled] .btn-link:focus,fieldset[disabled] .btn-link:hover{color:#777;text-decoration:none}.btn-group-lg>.btn,.btn-lg{padding:10px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}.btn-group-sm>.btn,.btn-sm{padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}.btn-group-xs>.btn,.btn-xs{padding:1px 5px;font-size:12px;line-height:1.5;border-radius:3px}.btn-block{display:block;width:100%}.btn-block+.btn-block{margin-top:5px}input[type=button].btn-block,input[type=reset].btn-block,input[type=submit].btn-block{width:100%}.fade{opacity:0;-webkit-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}.fade.in{opacity:1}.collapse{display:none}.collapse.in{display:block}tr.collapse.in{display:table-row}tbody.collapse.in{display:table-row-group}.collapsing{position:relative;height:0;overflow:hidden;-webkit-transition-timing-function:ease;-o-transition-timing-function:ease;transition-timing-function:ease;-webkit-transition-duration:.35s;-o-transition-duration:.35s;transition-duration:.35s;-webkit-transition-property:height,visibility;-o-transition-property:height,visibility;transition-property:height,visibility}.caret{display:inline-block;width:0;height:0;margin-left:2px;vertical-align:middle;border-top:4px dashed;border-top:4px solid\\9;border-right:4px solid transparent;border-left:4px solid transparent}.dropdown,.dropup{position:relative}.dropdown-toggle:focus{outline:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;font-size:14px;text-align:left;list-style:none;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #ccc;border:1px solid rgba(0,0,0,.15);border-radius:4px;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175)}.dropdown-menu.pull-right{right:0;left:auto}.dropdown-menu .divider{height:1px;margin:9px 0;overflow:hidden;background-color:#e5e5e5}.dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;color:#333;white-space:nowrap}.dropdown-menu>li>a:focus,.dropdown-menu>li>a:hover{color:#262626;text-decoration:none;background-color:#f5f5f5}.dropdown-menu>.active>a,.dropdown-menu>.active>a:focus,.dropdown-menu>.active>a:hover{color:#fff;text-decoration:none;background-color:#337ab7;outline:0}.dropdown-menu>.disabled>a,.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{color:#777}.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{text-decoration:none;cursor:not-allowed;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.open>.dropdown-menu{display:block}.open>a{outline:0}.dropdown-menu-right{right:0;left:auto}.dropdown-menu-left{right:auto;left:0}.dropdown-header{display:block;padding:3px 20px;font-size:12px;line-height:1.42857143;color:#777;white-space:nowrap}.dropdown-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:990}.pull-right>.dropdown-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{content:\"\";border-top:0;border-bottom:4px dashed;border-bottom:4px solid\\9}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:2px}@media (min-width:768px){.navbar-right .dropdown-menu{right:0;left:auto}.navbar-right .dropdown-menu-left{right:auto;left:0}}.btn-group,.btn-group-vertical{position:relative;display:inline-block;vertical-align:middle}.btn-group-vertical>.btn,.btn-group>.btn{position:relative;float:left}.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group-vertical>.btn:hover,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus,.btn-group>.btn:hover{z-index:2}.btn-group .btn+.btn,.btn-group .btn+.btn-group,.btn-group .btn-group+.btn,.btn-group .btn-group+.btn-group{margin-left:-1px}.btn-toolbar{margin-left:-5px}.btn-toolbar .btn,.btn-toolbar .btn-group,.btn-toolbar .input-group{float:left}.btn-toolbar>.btn,.btn-toolbar>.btn-group,.btn-toolbar>.input-group{margin-left:5px}.btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){border-radius:0}.btn-group>.btn:first-child{margin-left:0}.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){border-top-right-radius:0;border-bottom-right-radius:0}.btn-group>.btn:last-child:not(:first-child),.btn-group>.dropdown-toggle:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.btn-group>.btn-group{float:left}.btn-group>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-top-right-radius:0;border-bottom-right-radius:0}.btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-left-radius:0;border-bottom-left-radius:0}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0}.btn-group>.btn+.dropdown-toggle{padding-right:8px;padding-left:8px}.btn-group>.btn-lg+.dropdown-toggle{padding-right:12px;padding-left:12px}.btn-group.open .dropdown-toggle{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn-group.open .dropdown-toggle.btn-link{-webkit-box-shadow:none;box-shadow:none}.btn .caret{margin-left:0}.btn-lg .caret{border-width:5px 5px 0;border-bottom-width:0}.dropup .btn-lg .caret{border-width:0 5px 5px}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group,.btn-group-vertical>.btn-group>.btn{display:block;float:none;width:100%;max-width:100%}.btn-group-vertical>.btn-group>.btn{float:none}.btn-group-vertical>.btn+.btn,.btn-group-vertical>.btn+.btn-group,.btn-group-vertical>.btn-group+.btn,.btn-group-vertical>.btn-group+.btn-group{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:not(:first-child):not(:last-child){border-radius:0}.btn-group-vertical>.btn:first-child:not(:last-child){border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn:last-child:not(:first-child){border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:4px}.btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-left-radius:0;border-top-right-radius:0}.btn-group-justified{display:table;width:100%;table-layout:fixed;border-collapse:separate}.btn-group-justified>.btn,.btn-group-justified>.btn-group{display:table-cell;float:none;width:1%}.btn-group-justified>.btn-group .btn{width:100%}.btn-group-justified>.btn-group .dropdown-menu{left:auto}[data-toggle=buttons]>.btn input[type=checkbox],[data-toggle=buttons]>.btn input[type=radio],[data-toggle=buttons]>.btn-group>.btn input[type=checkbox],[data-toggle=buttons]>.btn-group>.btn input[type=radio]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}.input-group{position:relative;display:table;border-collapse:separate}.input-group[class*=col-]{float:none;padding-right:0;padding-left:0}.input-group .form-control{position:relative;z-index:2;float:left;width:100%;margin-bottom:0}.input-group-lg>.form-control,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.btn{height:46px;padding:10px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}select.input-group-lg>.form-control,select.input-group-lg>.input-group-addon,select.input-group-lg>.input-group-btn>.btn{height:46px;line-height:46px}select[multiple].input-group-lg>.form-control,select[multiple].input-group-lg>.input-group-addon,select[multiple].input-group-lg>.input-group-btn>.btn,textarea.input-group-lg>.form-control,textarea.input-group-lg>.input-group-addon,textarea.input-group-lg>.input-group-btn>.btn{height:auto}.input-group-sm>.form-control,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.btn{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}select.input-group-sm>.form-control,select.input-group-sm>.input-group-addon,select.input-group-sm>.input-group-btn>.btn{height:30px;line-height:30px}select[multiple].input-group-sm>.form-control,select[multiple].input-group-sm>.input-group-addon,select[multiple].input-group-sm>.input-group-btn>.btn,textarea.input-group-sm>.form-control,textarea.input-group-sm>.input-group-addon,textarea.input-group-sm>.input-group-btn>.btn{height:auto}.input-group .form-control,.input-group-addon,.input-group-btn{display:table-cell}.input-group .form-control:not(:first-child):not(:last-child),.input-group-addon:not(:first-child):not(:last-child),.input-group-btn:not(:first-child):not(:last-child){border-radius:0}.input-group-addon,.input-group-btn{width:1%;white-space:nowrap;vertical-align:middle}.input-group-addon{padding:6px 12px;font-size:14px;font-weight:400;line-height:1;color:#555;text-align:center;background-color:#eee;border:1px solid #ccc;border-radius:4px}.input-group-addon.input-sm{padding:5px 10px;font-size:12px;border-radius:3px}.input-group-addon.input-lg{padding:10px 16px;font-size:18px;border-radius:6px}.input-group-addon input[type=checkbox],.input-group-addon input[type=radio]{margin-top:0}.input-group .form-control:first-child,.input-group-addon:first-child,.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group>.btn,.input-group-btn:first-child>.dropdown-toggle,.input-group-btn:last-child>.btn-group:not(:last-child)>.btn,.input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle){border-top-right-radius:0;border-bottom-right-radius:0}.input-group-addon:first-child{border-right:0}.input-group .form-control:last-child,.input-group-addon:last-child,.input-group-btn:first-child>.btn-group:not(:first-child)>.btn,.input-group-btn:first-child>.btn:not(:first-child),.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group>.btn,.input-group-btn:last-child>.dropdown-toggle{border-top-left-radius:0;border-bottom-left-radius:0}.input-group-addon:last-child{border-left:0}.input-group-btn{position:relative;font-size:0;white-space:nowrap}.input-group-btn>.btn{position:relative}.input-group-btn>.btn+.btn{margin-left:-1px}.input-group-btn>.btn:active,.input-group-btn>.btn:focus,.input-group-btn>.btn:hover{z-index:2}.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group{margin-right:-1px}.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group{z-index:2;margin-left:-1px}.nav{padding-left:0;margin-bottom:0;list-style:none}.nav>li{position:relative;display:block}.nav>li>a{position:relative;display:block;padding:10px 15px}.nav>li>a:focus,.nav>li>a:hover{text-decoration:none;background-color:#eee}.nav>li.disabled>a{color:#777}.nav>li.disabled>a:focus,.nav>li.disabled>a:hover{color:#777;text-decoration:none;cursor:not-allowed;background-color:transparent}.nav .open>a,.nav .open>a:focus,.nav .open>a:hover{background-color:#eee;border-color:#337ab7}.nav .nav-divider{height:1px;margin:9px 0;overflow:hidden;background-color:#e5e5e5}.nav>li>a>img{max-width:none}.nav-tabs{border-bottom:1px solid #ddd}.nav-tabs>li{float:left;margin-bottom:-1px}.nav-tabs>li>a{margin-right:2px;line-height:1.42857143;border:1px solid transparent;border-radius:4px 4px 0 0}.nav-tabs>li>a:hover{border-color:#eee #eee #ddd}.nav-tabs>li.active>a,.nav-tabs>li.active>a:focus,.nav-tabs>li.active>a:hover{color:#555;cursor:default;background-color:#fff;border:1px solid #ddd;border-bottom-color:transparent}.nav-tabs.nav-justified{width:100%;border-bottom:0}.nav-tabs.nav-justified>li{float:none}.nav-tabs.nav-justified>li>a{margin-bottom:5px;text-align:center}.nav-tabs.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}@media (min-width:768px){.nav-tabs.nav-justified>li{display:table-cell;width:1%}.nav-tabs.nav-justified>li>a{margin-bottom:0}}.nav-tabs.nav-justified>li>a{margin-right:0;border-radius:4px}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover{border:1px solid #ddd}@media (min-width:768px){.nav-tabs.nav-justified>li>a{border-bottom:1px solid #ddd;border-radius:4px 4px 0 0}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover{border-bottom-color:#fff}}.nav-pills>li{float:left}.nav-pills>li>a{border-radius:4px}.nav-pills>li+li{margin-left:2px}.nav-pills>li.active>a,.nav-pills>li.active>a:focus,.nav-pills>li.active>a:hover{color:#fff;background-color:#337ab7}.nav-stacked>li{float:none}.nav-stacked>li+li{margin-top:2px;margin-left:0}.nav-justified{width:100%}.nav-justified>li{float:none}.nav-justified>li>a{margin-bottom:5px;text-align:center}.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}@media (min-width:768px){.nav-justified>li{display:table-cell;width:1%}.nav-justified>li>a{margin-bottom:0}}.nav-tabs-justified{border-bottom:0}.nav-tabs-justified>li>a{margin-right:0;border-radius:4px}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:focus,.nav-tabs-justified>.active>a:hover{border:1px solid #ddd}@media (min-width:768px){.nav-tabs-justified>li>a{border-bottom:1px solid #ddd;border-radius:4px 4px 0 0}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:focus,.nav-tabs-justified>.active>a:hover{border-bottom-color:#fff}}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-left-radius:0;border-top-right-radius:0}.navbar{position:relative;min-height:50px;margin-bottom:20px;border:1px solid transparent}@media (min-width:768px){.navbar{border-radius:4px}}@media (min-width:768px){.navbar-header{float:left}}.navbar-collapse{padding-right:15px;padding-left:15px;overflow-x:visible;-webkit-overflow-scrolling:touch;border-top:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.1)}.navbar-collapse.in{overflow-y:auto}@media (min-width:768px){.navbar-collapse{width:auto;border-top:0;-webkit-box-shadow:none;box-shadow:none}.navbar-collapse.collapse{display:block!important;height:auto!important;padding-bottom:0;overflow:visible!important}.navbar-collapse.in{overflow-y:visible}.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse,.navbar-static-top .navbar-collapse{padding-right:0;padding-left:0}}.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse{max-height:340px}@media (max-device-width:480px) and (orientation:landscape){.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse{max-height:200px}}.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:-15px;margin-left:-15px}@media (min-width:768px){.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:0;margin-left:0}}.navbar-static-top{z-index:1000;border-width:0 0 1px}@media (min-width:768px){.navbar-static-top{border-radius:0}}.navbar-fixed-bottom,.navbar-fixed-top{position:fixed;right:0;left:0;z-index:1030}@media (min-width:768px){.navbar-fixed-bottom,.navbar-fixed-top{border-radius:0}}.navbar-fixed-top{top:0;border-width:0 0 1px}.navbar-fixed-bottom{bottom:0;margin-bottom:0;border-width:1px 0 0}.navbar-brand{float:left;height:50px;padding:15px 15px;font-size:18px;line-height:20px}.navbar-brand:focus,.navbar-brand:hover{text-decoration:none}.navbar-brand>img{display:block}@media (min-width:768px){.navbar>.container .navbar-brand,.navbar>.container-fluid .navbar-brand{margin-left:-15px}}.navbar-toggle{position:relative;float:right;padding:9px 10px;margin-top:8px;margin-right:15px;margin-bottom:8px;background-color:transparent;background-image:none;border:1px solid transparent;border-radius:4px}.navbar-toggle:focus{outline:0}.navbar-toggle .icon-bar{display:block;width:22px;height:2px;border-radius:1px}.navbar-toggle .icon-bar+.icon-bar{margin-top:4px}@media (min-width:768px){.navbar-toggle{display:none}}.navbar-nav{margin:7.5px -15px}.navbar-nav>li>a{padding-top:10px;padding-bottom:10px;line-height:20px}@media (max-width:767px){.navbar-nav .open .dropdown-menu{position:static;float:none;width:auto;margin-top:0;background-color:transparent;border:0;-webkit-box-shadow:none;box-shadow:none}.navbar-nav .open .dropdown-menu .dropdown-header,.navbar-nav .open .dropdown-menu>li>a{padding:5px 15px 5px 25px}.navbar-nav .open .dropdown-menu>li>a{line-height:20px}.navbar-nav .open .dropdown-menu>li>a:focus,.navbar-nav .open .dropdown-menu>li>a:hover{background-image:none}}@media (min-width:768px){.navbar-nav{float:left;margin:0}.navbar-nav>li{float:left}.navbar-nav>li>a{padding-top:15px;padding-bottom:15px}}.navbar-form{padding:10px 15px;margin-top:8px;margin-right:-15px;margin-bottom:8px;margin-left:-15px;border-top:1px solid transparent;border-bottom:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1)}@media (min-width:768px){.navbar-form .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.navbar-form .form-control{display:inline-block;width:auto;vertical-align:middle}.navbar-form .form-control-static{display:inline-block}.navbar-form .input-group{display:inline-table;vertical-align:middle}.navbar-form .input-group .form-control,.navbar-form .input-group .input-group-addon,.navbar-form .input-group .input-group-btn{width:auto}.navbar-form .input-group>.form-control{width:100%}.navbar-form .control-label{margin-bottom:0;vertical-align:middle}.navbar-form .checkbox,.navbar-form .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.navbar-form .checkbox label,.navbar-form .radio label{padding-left:0}.navbar-form .checkbox input[type=checkbox],.navbar-form .radio input[type=radio]{position:relative;margin-left:0}.navbar-form .has-feedback .form-control-feedback{top:0}}@media (max-width:767px){.navbar-form .form-group{margin-bottom:5px}.navbar-form .form-group:last-child{margin-bottom:0}}@media (min-width:768px){.navbar-form{width:auto;padding-top:0;padding-bottom:0;margin-right:0;margin-left:0;border:0;-webkit-box-shadow:none;box-shadow:none}}.navbar-nav>li>.dropdown-menu{margin-top:0;border-top-left-radius:0;border-top-right-radius:0}.navbar-fixed-bottom .navbar-nav>li>.dropdown-menu{margin-bottom:0;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.navbar-btn{margin-top:8px;margin-bottom:8px}.navbar-btn.btn-sm{margin-top:10px;margin-bottom:10px}.navbar-btn.btn-xs{margin-top:14px;margin-bottom:14px}.navbar-text{margin-top:15px;margin-bottom:15px}@media (min-width:768px){.navbar-text{float:left;margin-right:15px;margin-left:15px}}@media (min-width:768px){.navbar-left{float:left!important}.navbar-right{float:right!important;margin-right:-15px}.navbar-right~.navbar-right{margin-right:0}}.navbar-default{background-color:#f8f8f8;border-color:#e7e7e7}.navbar-default .navbar-brand{color:#777}.navbar-default .navbar-brand:focus,.navbar-default .navbar-brand:hover{color:#5e5e5e;background-color:transparent}.navbar-default .navbar-text{color:#777}.navbar-default .navbar-nav>li>a{color:#777}.navbar-default .navbar-nav>li>a:focus,.navbar-default .navbar-nav>li>a:hover{color:#333;background-color:transparent}.navbar-default .navbar-nav>.active>a,.navbar-default .navbar-nav>.active>a:focus,.navbar-default .navbar-nav>.active>a:hover{color:#555;background-color:#e7e7e7}.navbar-default .navbar-nav>.disabled>a,.navbar-default .navbar-nav>.disabled>a:focus,.navbar-default .navbar-nav>.disabled>a:hover{color:#ccc;background-color:transparent}.navbar-default .navbar-toggle{border-color:#ddd}.navbar-default .navbar-toggle:focus,.navbar-default .navbar-toggle:hover{background-color:#ddd}.navbar-default .navbar-toggle .icon-bar{background-color:#888}.navbar-default .navbar-collapse,.navbar-default .navbar-form{border-color:#e7e7e7}.navbar-default .navbar-nav>.open>a,.navbar-default .navbar-nav>.open>a:focus,.navbar-default .navbar-nav>.open>a:hover{color:#555;background-color:#e7e7e7}@media (max-width:767px){.navbar-default .navbar-nav .open .dropdown-menu>li>a{color:#777}.navbar-default .navbar-nav .open .dropdown-menu>li>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>li>a:hover{color:#333;background-color:transparent}.navbar-default .navbar-nav .open .dropdown-menu>.active>a,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:hover{color:#555;background-color:#e7e7e7}.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#ccc;background-color:transparent}}.navbar-default .navbar-link{color:#777}.navbar-default .navbar-link:hover{color:#333}.navbar-default .btn-link{color:#777}.navbar-default .btn-link:focus,.navbar-default .btn-link:hover{color:#333}.navbar-default .btn-link[disabled]:focus,.navbar-default .btn-link[disabled]:hover,fieldset[disabled] .navbar-default .btn-link:focus,fieldset[disabled] .navbar-default .btn-link:hover{color:#ccc}.navbar-inverse{background-color:#222;border-color:#080808}.navbar-inverse .navbar-brand{color:#9d9d9d}.navbar-inverse .navbar-brand:focus,.navbar-inverse .navbar-brand:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-text{color:#9d9d9d}.navbar-inverse .navbar-nav>li>a{color:#9d9d9d}.navbar-inverse .navbar-nav>li>a:focus,.navbar-inverse .navbar-nav>li>a:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav>.active>a,.navbar-inverse .navbar-nav>.active>a:focus,.navbar-inverse .navbar-nav>.active>a:hover{color:#fff;background-color:#080808}.navbar-inverse .navbar-nav>.disabled>a,.navbar-inverse .navbar-nav>.disabled>a:focus,.navbar-inverse .navbar-nav>.disabled>a:hover{color:#444;background-color:transparent}.navbar-inverse .navbar-toggle{border-color:#333}.navbar-inverse .navbar-toggle:focus,.navbar-inverse .navbar-toggle:hover{background-color:#333}.navbar-inverse .navbar-toggle .icon-bar{background-color:#fff}.navbar-inverse .navbar-collapse,.navbar-inverse .navbar-form{border-color:#101010}.navbar-inverse .navbar-nav>.open>a,.navbar-inverse .navbar-nav>.open>a:focus,.navbar-inverse .navbar-nav>.open>a:hover{color:#fff;background-color:#080808}@media (max-width:767px){.navbar-inverse .navbar-nav .open .dropdown-menu>.dropdown-header{border-color:#080808}.navbar-inverse .navbar-nav .open .dropdown-menu .divider{background-color:#080808}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a{color:#9d9d9d}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:hover{color:#fff;background-color:#080808}.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#444;background-color:transparent}}.navbar-inverse .navbar-link{color:#9d9d9d}.navbar-inverse .navbar-link:hover{color:#fff}.navbar-inverse .btn-link{color:#9d9d9d}.navbar-inverse .btn-link:focus,.navbar-inverse .btn-link:hover{color:#fff}.navbar-inverse .btn-link[disabled]:focus,.navbar-inverse .btn-link[disabled]:hover,fieldset[disabled] .navbar-inverse .btn-link:focus,fieldset[disabled] .navbar-inverse .btn-link:hover{color:#444}.breadcrumb{padding:8px 15px;margin-bottom:20px;list-style:none;background-color:#f5f5f5;border-radius:4px}.breadcrumb>li{display:inline-block}.breadcrumb>li+li:before{padding:0 5px;color:#ccc;content:\"/\\A0\"}.breadcrumb>.active{color:#777}.pagination{display:inline-block;padding-left:0;margin:20px 0;border-radius:4px}.pagination>li{display:inline}.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:6px 12px;margin-left:-1px;line-height:1.42857143;color:#337ab7;text-decoration:none;background-color:#fff;border:1px solid #ddd}.pagination>li:first-child>a,.pagination>li:first-child>span{margin-left:0;border-top-left-radius:4px;border-bottom-left-radius:4px}.pagination>li:last-child>a,.pagination>li:last-child>span{border-top-right-radius:4px;border-bottom-right-radius:4px}.pagination>li>a:focus,.pagination>li>a:hover,.pagination>li>span:focus,.pagination>li>span:hover{z-index:3;color:#23527c;background-color:#eee;border-color:#ddd}.pagination>.active>a,.pagination>.active>a:focus,.pagination>.active>a:hover,.pagination>.active>span,.pagination>.active>span:focus,.pagination>.active>span:hover{z-index:2;color:#fff;cursor:default;background-color:#337ab7;border-color:#337ab7}.pagination>.disabled>a,.pagination>.disabled>a:focus,.pagination>.disabled>a:hover,.pagination>.disabled>span,.pagination>.disabled>span:focus,.pagination>.disabled>span:hover{color:#777;cursor:not-allowed;background-color:#fff;border-color:#ddd}.pagination-lg>li>a,.pagination-lg>li>span{padding:10px 16px;font-size:18px;line-height:1.3333333}.pagination-lg>li:first-child>a,.pagination-lg>li:first-child>span{border-top-left-radius:6px;border-bottom-left-radius:6px}.pagination-lg>li:last-child>a,.pagination-lg>li:last-child>span{border-top-right-radius:6px;border-bottom-right-radius:6px}.pagination-sm>li>a,.pagination-sm>li>span{padding:5px 10px;font-size:12px;line-height:1.5}.pagination-sm>li:first-child>a,.pagination-sm>li:first-child>span{border-top-left-radius:3px;border-bottom-left-radius:3px}.pagination-sm>li:last-child>a,.pagination-sm>li:last-child>span{border-top-right-radius:3px;border-bottom-right-radius:3px}.pager{padding-left:0;margin:20px 0;text-align:center;list-style:none}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#fff;border:1px solid #ddd;border-radius:15px}.pager li>a:focus,.pager li>a:hover{text-decoration:none;background-color:#eee}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.pager .disabled>a,.pager .disabled>a:focus,.pager .disabled>a:hover,.pager .disabled>span{color:#777;cursor:not-allowed;background-color:#fff}.label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}a.label:focus,a.label:hover{color:#fff;text-decoration:none;cursor:pointer}.label:empty{display:none}.btn .label{position:relative;top:-1px}.label-default{background-color:#777}.label-default[href]:focus,.label-default[href]:hover{background-color:#5e5e5e}.label-primary{background-color:#337ab7}.label-primary[href]:focus,.label-primary[href]:hover{background-color:#286090}.label-success{background-color:#5cb85c}.label-success[href]:focus,.label-success[href]:hover{background-color:#449d44}.label-info{background-color:#5bc0de}.label-info[href]:focus,.label-info[href]:hover{background-color:#31b0d5}.label-warning{background-color:#f0ad4e}.label-warning[href]:focus,.label-warning[href]:hover{background-color:#ec971f}.label-danger{background-color:#d9534f}.label-danger[href]:focus,.label-danger[href]:hover{background-color:#c9302c}.badge{display:inline-block;min-width:10px;padding:3px 7px;font-size:12px;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:middle;background-color:#777;border-radius:10px}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.btn-group-xs>.btn .badge,.btn-xs .badge{top:0;padding:1px 5px}a.badge:focus,a.badge:hover{color:#fff;text-decoration:none;cursor:pointer}.list-group-item.active>.badge,.nav-pills>.active>a>.badge{color:#337ab7;background-color:#fff}.list-group-item>.badge{float:right}.list-group-item>.badge+.badge{margin-right:5px}.nav-pills>li>a>.badge{margin-left:3px}.jumbotron{padding-top:30px;padding-bottom:30px;margin-bottom:30px;color:inherit;background-color:#eee}.jumbotron .h1,.jumbotron h1{color:inherit}.jumbotron p{margin-bottom:15px;font-size:21px;font-weight:200}.jumbotron>hr{border-top-color:#d5d5d5}.container .jumbotron,.container-fluid .jumbotron{border-radius:6px}.jumbotron .container{max-width:100%}@media screen and (min-width:768px){.jumbotron{padding-top:48px;padding-bottom:48px}.container .jumbotron,.container-fluid .jumbotron{padding-right:60px;padding-left:60px}.jumbotron .h1,.jumbotron h1{font-size:63px}}.thumbnail{display:block;padding:4px;margin-bottom:20px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:4px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out}.thumbnail a>img,.thumbnail>img{margin-right:auto;margin-left:auto}a.thumbnail.active,a.thumbnail:focus,a.thumbnail:hover{border-color:#337ab7}.thumbnail .caption{padding:9px;color:#333}.alert{padding:15px;margin-bottom:20px;border:1px solid transparent;border-radius:4px}.alert h4{margin-top:0;color:inherit}.alert .alert-link{font-weight:700}.alert>p,.alert>ul{margin-bottom:0}.alert>p+p{margin-top:5px}.alert-dismissable,.alert-dismissible{padding-right:35px}.alert-dismissable .close,.alert-dismissible .close{position:relative;top:-2px;right:-21px;color:inherit}.alert-success{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}.alert-success hr{border-top-color:#c9e2b3}.alert-success .alert-link{color:#2b542c}.alert-info{color:#31708f;background-color:#d9edf7;border-color:#bce8f1}.alert-info hr{border-top-color:#a6e1ec}.alert-info .alert-link{color:#245269}.alert-warning{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.alert-warning hr{border-top-color:#f7e1b5}.alert-warning .alert-link{color:#66512c}.alert-danger{color:#a94442;background-color:#f2dede;border-color:#ebccd1}.alert-danger hr{border-top-color:#e4b9c0}.alert-danger .alert-link{color:#843534}@-webkit-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@-o-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}.progress{height:20px;margin-bottom:20px;overflow:hidden;background-color:#f5f5f5;border-radius:4px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.1)}.progress-bar{float:left;width:0;height:100%;font-size:12px;line-height:20px;color:#fff;text-align:center;background-color:#337ab7;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}.progress-bar-striped,.progress-striped .progress-bar{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);-webkit-background-size:40px 40px;background-size:40px 40px}.progress-bar.active,.progress.active .progress-bar{-webkit-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-bar-success{background-color:#5cb85c}.progress-striped .progress-bar-success{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-info{background-color:#5bc0de}.progress-striped .progress-bar-info{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-warning{background-color:#f0ad4e}.progress-striped .progress-bar-warning{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-danger{background-color:#d9534f}.progress-striped .progress-bar-danger{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.media{margin-top:15px}.media:first-child{margin-top:0}.media,.media-body{overflow:hidden;zoom:1}.media-body{width:10000px}.media-object{display:block}.media-object.img-thumbnail{max-width:none}.media-right,.media>.pull-right{padding-left:10px}.media-left,.media>.pull-left{padding-right:10px}.media-body,.media-left,.media-right{display:table-cell;vertical-align:top}.media-middle{vertical-align:middle}.media-bottom{vertical-align:bottom}.media-heading{margin-top:0;margin-bottom:5px}.media-list{padding-left:0;list-style:none}.list-group{padding-left:0;margin-bottom:20px}.list-group-item{position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #ddd}.list-group-item:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.list-group-item:last-child{margin-bottom:0;border-bottom-right-radius:4px;border-bottom-left-radius:4px}a.list-group-item,button.list-group-item{color:#555}a.list-group-item .list-group-item-heading,button.list-group-item .list-group-item-heading{color:#333}a.list-group-item:focus,a.list-group-item:hover,button.list-group-item:focus,button.list-group-item:hover{color:#555;text-decoration:none;background-color:#f5f5f5}button.list-group-item{width:100%;text-align:left}.list-group-item.disabled,.list-group-item.disabled:focus,.list-group-item.disabled:hover{color:#777;cursor:not-allowed;background-color:#eee}.list-group-item.disabled .list-group-item-heading,.list-group-item.disabled:focus .list-group-item-heading,.list-group-item.disabled:hover .list-group-item-heading{color:inherit}.list-group-item.disabled .list-group-item-text,.list-group-item.disabled:focus .list-group-item-text,.list-group-item.disabled:hover .list-group-item-text{color:#777}.list-group-item.active,.list-group-item.active:focus,.list-group-item.active:hover{z-index:2;color:#fff;background-color:#337ab7;border-color:#337ab7}.list-group-item.active .list-group-item-heading,.list-group-item.active .list-group-item-heading>.small,.list-group-item.active .list-group-item-heading>small,.list-group-item.active:focus .list-group-item-heading,.list-group-item.active:focus .list-group-item-heading>.small,.list-group-item.active:focus .list-group-item-heading>small,.list-group-item.active:hover .list-group-item-heading,.list-group-item.active:hover .list-group-item-heading>.small,.list-group-item.active:hover .list-group-item-heading>small{color:inherit}.list-group-item.active .list-group-item-text,.list-group-item.active:focus .list-group-item-text,.list-group-item.active:hover .list-group-item-text{color:#c7ddef}.list-group-item-success{color:#3c763d;background-color:#dff0d8}a.list-group-item-success,button.list-group-item-success{color:#3c763d}a.list-group-item-success .list-group-item-heading,button.list-group-item-success .list-group-item-heading{color:inherit}a.list-group-item-success:focus,a.list-group-item-success:hover,button.list-group-item-success:focus,button.list-group-item-success:hover{color:#3c763d;background-color:#d0e9c6}a.list-group-item-success.active,a.list-group-item-success.active:focus,a.list-group-item-success.active:hover,button.list-group-item-success.active,button.list-group-item-success.active:focus,button.list-group-item-success.active:hover{color:#fff;background-color:#3c763d;border-color:#3c763d}.list-group-item-info{color:#31708f;background-color:#d9edf7}a.list-group-item-info,button.list-group-item-info{color:#31708f}a.list-group-item-info .list-group-item-heading,button.list-group-item-info .list-group-item-heading{color:inherit}a.list-group-item-info:focus,a.list-group-item-info:hover,button.list-group-item-info:focus,button.list-group-item-info:hover{color:#31708f;background-color:#c4e3f3}a.list-group-item-info.active,a.list-group-item-info.active:focus,a.list-group-item-info.active:hover,button.list-group-item-info.active,button.list-group-item-info.active:focus,button.list-group-item-info.active:hover{color:#fff;background-color:#31708f;border-color:#31708f}.list-group-item-warning{color:#8a6d3b;background-color:#fcf8e3}a.list-group-item-warning,button.list-group-item-warning{color:#8a6d3b}a.list-group-item-warning .list-group-item-heading,button.list-group-item-warning .list-group-item-heading{color:inherit}a.list-group-item-warning:focus,a.list-group-item-warning:hover,button.list-group-item-warning:focus,button.list-group-item-warning:hover{color:#8a6d3b;background-color:#faf2cc}a.list-group-item-warning.active,a.list-group-item-warning.active:focus,a.list-group-item-warning.active:hover,button.list-group-item-warning.active,button.list-group-item-warning.active:focus,button.list-group-item-warning.active:hover{color:#fff;background-color:#8a6d3b;border-color:#8a6d3b}.list-group-item-danger{color:#a94442;background-color:#f2dede}a.list-group-item-danger,button.list-group-item-danger{color:#a94442}a.list-group-item-danger .list-group-item-heading,button.list-group-item-danger .list-group-item-heading{color:inherit}a.list-group-item-danger:focus,a.list-group-item-danger:hover,button.list-group-item-danger:focus,button.list-group-item-danger:hover{color:#a94442;background-color:#ebcccc}a.list-group-item-danger.active,a.list-group-item-danger.active:focus,a.list-group-item-danger.active:hover,button.list-group-item-danger.active,button.list-group-item-danger.active:focus,button.list-group-item-danger.active:hover{color:#fff;background-color:#a94442;border-color:#a94442}.list-group-item-heading{margin-top:0;margin-bottom:5px}.list-group-item-text{margin-bottom:0;line-height:1.3}.panel{margin-bottom:20px;background-color:#fff;border:1px solid transparent;border-radius:4px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.05);box-shadow:0 1px 1px rgba(0,0,0,.05)}.panel-body{padding:15px}.panel-heading{padding:10px 15px;border-bottom:1px solid transparent;border-top-left-radius:3px;border-top-right-radius:3px}.panel-heading>.dropdown .dropdown-toggle{color:inherit}.panel-title{margin-top:0;margin-bottom:0;font-size:16px;color:inherit}.panel-title>.small,.panel-title>.small>a,.panel-title>a,.panel-title>small,.panel-title>small>a{color:inherit}.panel-footer{padding:10px 15px;background-color:#f5f5f5;border-top:1px solid #ddd;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.list-group,.panel>.panel-collapse>.list-group{margin-bottom:0}.panel>.list-group .list-group-item,.panel>.panel-collapse>.list-group .list-group-item{border-width:1px 0;border-radius:0}.panel>.list-group:first-child .list-group-item:first-child,.panel>.panel-collapse>.list-group:first-child .list-group-item:first-child{border-top:0;border-top-left-radius:3px;border-top-right-radius:3px}.panel>.list-group:last-child .list-group-item:last-child,.panel>.panel-collapse>.list-group:last-child .list-group-item:last-child{border-bottom:0;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.panel-heading+.panel-collapse>.list-group .list-group-item:first-child{border-top-left-radius:0;border-top-right-radius:0}.panel-heading+.list-group .list-group-item:first-child{border-top-width:0}.list-group+.panel-footer{border-top-width:0}.panel>.panel-collapse>.table,.panel>.table,.panel>.table-responsive>.table{margin-bottom:0}.panel>.panel-collapse>.table caption,.panel>.table caption,.panel>.table-responsive>.table caption{padding-right:15px;padding-left:15px}.panel>.table-responsive:first-child>.table:first-child,.panel>.table:first-child{border-top-left-radius:3px;border-top-right-radius:3px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child,.panel>.table:first-child>thead:first-child>tr:first-child{border-top-left-radius:3px;border-top-right-radius:3px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table:first-child>thead:first-child>tr:first-child th:first-child{border-top-left-radius:3px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table:first-child>thead:first-child>tr:first-child th:last-child{border-top-right-radius:3px}.panel>.table-responsive:last-child>.table:last-child,.panel>.table:last-child{border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child{border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:first-child{border-bottom-left-radius:3px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:last-child{border-bottom-right-radius:3px}.panel>.panel-body+.table,.panel>.panel-body+.table-responsive,.panel>.table+.panel-body,.panel>.table-responsive+.panel-body{border-top:1px solid #ddd}.panel>.table>tbody:first-child>tr:first-child td,.panel>.table>tbody:first-child>tr:first-child th{border-top:0}.panel>.table-bordered,.panel>.table-responsive>.table-bordered{border:0}.panel>.table-bordered>tbody>tr>td:first-child,.panel>.table-bordered>tbody>tr>th:first-child,.panel>.table-bordered>tfoot>tr>td:first-child,.panel>.table-bordered>tfoot>tr>th:first-child,.panel>.table-bordered>thead>tr>td:first-child,.panel>.table-bordered>thead>tr>th:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:first-child,.panel>.table-responsive>.table-bordered>thead>tr>td:first-child,.panel>.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}.panel>.table-bordered>tbody>tr>td:last-child,.panel>.table-bordered>tbody>tr>th:last-child,.panel>.table-bordered>tfoot>tr>td:last-child,.panel>.table-bordered>tfoot>tr>th:last-child,.panel>.table-bordered>thead>tr>td:last-child,.panel>.table-bordered>thead>tr>th:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:last-child,.panel>.table-responsive>.table-bordered>thead>tr>td:last-child,.panel>.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}.panel>.table-bordered>tbody>tr:first-child>td,.panel>.table-bordered>tbody>tr:first-child>th,.panel>.table-bordered>thead>tr:first-child>td,.panel>.table-bordered>thead>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>th,.panel>.table-responsive>.table-bordered>thead>tr:first-child>td,.panel>.table-responsive>.table-bordered>thead>tr:first-child>th{border-bottom:0}.panel>.table-bordered>tbody>tr:last-child>td,.panel>.table-bordered>tbody>tr:last-child>th,.panel>.table-bordered>tfoot>tr:last-child>td,.panel>.table-bordered>tfoot>tr:last-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>th,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>td,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>th{border-bottom:0}.panel>.table-responsive{margin-bottom:0;border:0}.panel-group{margin-bottom:20px}.panel-group .panel{margin-bottom:0;border-radius:4px}.panel-group .panel+.panel{margin-top:5px}.panel-group .panel-heading{border-bottom:0}.panel-group .panel-heading+.panel-collapse>.list-group,.panel-group .panel-heading+.panel-collapse>.panel-body{border-top:1px solid #ddd}.panel-group .panel-footer{border-top:0}.panel-group .panel-footer+.panel-collapse .panel-body{border-bottom:1px solid #ddd}.panel-default{border-color:#ddd}.panel-default>.panel-heading{color:#333;background-color:#f5f5f5;border-color:#ddd}.panel-default>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ddd}.panel-default>.panel-heading .badge{color:#f5f5f5;background-color:#333}.panel-default>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ddd}.panel-primary{border-color:#337ab7}.panel-primary>.panel-heading{color:#fff;background-color:#337ab7;border-color:#337ab7}.panel-primary>.panel-heading+.panel-collapse>.panel-body{border-top-color:#337ab7}.panel-primary>.panel-heading .badge{color:#337ab7;background-color:#fff}.panel-primary>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#337ab7}.panel-success{border-color:#d6e9c6}.panel-success>.panel-heading{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}.panel-success>.panel-heading+.panel-collapse>.panel-body{border-top-color:#d6e9c6}.panel-success>.panel-heading .badge{color:#dff0d8;background-color:#3c763d}.panel-success>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#d6e9c6}.panel-info{border-color:#bce8f1}.panel-info>.panel-heading{color:#31708f;background-color:#d9edf7;border-color:#bce8f1}.panel-info>.panel-heading+.panel-collapse>.panel-body{border-top-color:#bce8f1}.panel-info>.panel-heading .badge{color:#d9edf7;background-color:#31708f}.panel-info>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#bce8f1}.panel-warning{border-color:#faebcc}.panel-warning>.panel-heading{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.panel-warning>.panel-heading+.panel-collapse>.panel-body{border-top-color:#faebcc}.panel-warning>.panel-heading .badge{color:#fcf8e3;background-color:#8a6d3b}.panel-warning>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#faebcc}.panel-danger{border-color:#ebccd1}.panel-danger>.panel-heading{color:#a94442;background-color:#f2dede;border-color:#ebccd1}.panel-danger>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ebccd1}.panel-danger>.panel-heading .badge{color:#f2dede;background-color:#a94442}.panel-danger>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ebccd1}.embed-responsive{position:relative;display:block;height:0;padding:0;overflow:hidden}.embed-responsive .embed-responsive-item,.embed-responsive embed,.embed-responsive iframe,.embed-responsive object,.embed-responsive video{position:absolute;top:0;bottom:0;left:0;width:100%;height:100%;border:0}.embed-responsive-16by9{padding-bottom:56.25%}.embed-responsive-4by3{padding-bottom:75%}.well{min-height:20px;padding:19px;margin-bottom:20px;background-color:#f5f5f5;border:1px solid #e3e3e3;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.05);box-shadow:inset 0 1px 1px rgba(0,0,0,.05)}.well blockquote{border-color:#ddd;border-color:rgba(0,0,0,.15)}.well-lg{padding:24px;border-radius:6px}.well-sm{padding:9px;border-radius:3px}.close{float:right;font-size:21px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2}.close:focus,.close:hover{color:#000;text-decoration:none;cursor:pointer;filter:alpha(opacity=50);opacity:.5}button.close{-webkit-appearance:none;padding:0;cursor:pointer;background:0 0;border:0}.modal-open{overflow:hidden}.modal{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;display:none;overflow:hidden;-webkit-overflow-scrolling:touch;outline:0}.modal.fade .modal-dialog{-webkit-transition:-webkit-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out;-webkit-transform:translate(0,-25%);-ms-transform:translate(0,-25%);-o-transform:translate(0,-25%);transform:translate(0,-25%)}.modal.in .modal-dialog{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0);transform:translate(0,0)}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal-dialog{position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:6px;outline:0;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5)}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000}.modal-backdrop.fade{filter:alpha(opacity=0);opacity:0}.modal-backdrop.in{filter:alpha(opacity=50);opacity:.5}.modal-header{min-height:16.43px;padding:15px;border-bottom:1px solid #e5e5e5}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:15px}.modal-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}.modal-footer .btn+.btn{margin-bottom:0;margin-left:5px}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px rgba(0,0,0,.5)}.modal-sm{width:300px}}@media (min-width:992px){.modal-lg{width:900px}}.tooltip{position:absolute;z-index:1070;display:block;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:12px;font-style:normal;font-weight:400;line-height:1.42857143;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;word-wrap:normal;white-space:normal;filter:alpha(opacity=0);opacity:0;line-break:auto}.tooltip.in{filter:alpha(opacity=90);opacity:.9}.tooltip.top{padding:5px 0;margin-top:-3px}.tooltip.right{padding:0 5px;margin-left:3px}.tooltip.bottom{padding:5px 0;margin-top:3px}.tooltip.left{padding:0 5px;margin-left:-3px}.tooltip-inner{max-width:200px;padding:3px 8px;color:#fff;text-align:center;background-color:#000;border-radius:4px}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-left .tooltip-arrow{right:5px;bottom:0;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-right .tooltip-arrow{bottom:0;left:5px;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-width:5px 5px 5px 0;border-right-color:#000}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-width:5px 0 5px 5px;border-left-color:#000}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-left .tooltip-arrow{top:0;right:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-right .tooltip-arrow{top:0;left:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000}.popover{position:absolute;top:0;left:0;z-index:1060;display:none;max-width:276px;padding:1px;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:14px;font-style:normal;font-weight:400;line-height:1.42857143;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;word-wrap:normal;white-space:normal;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #ccc;border:1px solid rgba(0,0,0,.2);border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,.2);box-shadow:0 5px 10px rgba(0,0,0,.2);line-break:auto}.popover.top{margin-top:-10px}.popover.right{margin-left:10px}.popover.bottom{margin-top:10px}.popover.left{margin-left:-10px}.popover-title{padding:8px 14px;margin:0;font-size:14px;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-radius:5px 5px 0 0}.popover-content{padding:9px 14px}.popover>.arrow,.popover>.arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.popover>.arrow{border-width:11px}.popover>.arrow:after{content:\"\";border-width:10px}.popover.top>.arrow{bottom:-11px;left:50%;margin-left:-11px;border-top-color:#999;border-top-color:rgba(0,0,0,.25);border-bottom-width:0}.popover.top>.arrow:after{bottom:1px;margin-left:-10px;content:\" \";border-top-color:#fff;border-bottom-width:0}.popover.right>.arrow{top:50%;left:-11px;margin-top:-11px;border-right-color:#999;border-right-color:rgba(0,0,0,.25);border-left-width:0}.popover.right>.arrow:after{bottom:-10px;left:1px;content:\" \";border-right-color:#fff;border-left-width:0}.popover.bottom>.arrow{top:-11px;left:50%;margin-left:-11px;border-top-width:0;border-bottom-color:#999;border-bottom-color:rgba(0,0,0,.25)}.popover.bottom>.arrow:after{top:1px;margin-left:-10px;content:\" \";border-top-width:0;border-bottom-color:#fff}.popover.left>.arrow{top:50%;right:-11px;margin-top:-11px;border-right-width:0;border-left-color:#999;border-left-color:rgba(0,0,0,.25)}.popover.left>.arrow:after{right:1px;bottom:-10px;content:\" \";border-right-width:0;border-left-color:#fff}.carousel{position:relative}.carousel-inner{position:relative;width:100%;overflow:hidden}.carousel-inner>.item{position:relative;display:none;-webkit-transition:.6s ease-in-out left;-o-transition:.6s ease-in-out left;transition:.6s ease-in-out left}.carousel-inner>.item>a>img,.carousel-inner>.item>img{line-height:1}@media all and (transform-3d),(-webkit-transform-3d){.carousel-inner>.item{-webkit-transition:-webkit-transform .6s ease-in-out;-o-transition:-o-transform .6s ease-in-out;transition:transform .6s ease-in-out;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000px;perspective:1000px}.carousel-inner>.item.active.right,.carousel-inner>.item.next{left:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.carousel-inner>.item.active.left,.carousel-inner>.item.prev{left:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.carousel-inner>.item.active,.carousel-inner>.item.next.left,.carousel-inner>.item.prev.right{left:0;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.carousel-inner>.active,.carousel-inner>.next,.carousel-inner>.prev{display:block}.carousel-inner>.active{left:0}.carousel-inner>.next,.carousel-inner>.prev{position:absolute;top:0;width:100%}.carousel-inner>.next{left:100%}.carousel-inner>.prev{left:-100%}.carousel-inner>.next.left,.carousel-inner>.prev.right{left:0}.carousel-inner>.active.left{left:-100%}.carousel-inner>.active.right{left:100%}.carousel-control{position:absolute;top:0;bottom:0;left:0;width:15%;font-size:20px;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.6);filter:alpha(opacity=50);opacity:.5}.carousel-control.left{background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-image:-o-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,.0001)));background-image:linear-gradient(to right,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);background-repeat:repeat-x}.carousel-control.right{right:0;left:auto;background-image:-webkit-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-image:-o-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.0001)),to(rgba(0,0,0,.5)));background-image:linear-gradient(to right,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);background-repeat:repeat-x}.carousel-control:focus,.carousel-control:hover{color:#fff;text-decoration:none;filter:alpha(opacity=90);outline:0;opacity:.9}.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next,.carousel-control .icon-prev{position:absolute;top:50%;z-index:5;display:inline-block;margin-top:-10px}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{left:50%;margin-left:-10px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{right:50%;margin-right:-10px}.carousel-control .icon-next,.carousel-control .icon-prev{width:20px;height:20px;font-family:serif;line-height:1}.carousel-control .icon-prev:before{content:'\\2039'}.carousel-control .icon-next:before{content:'\\203A'}.carousel-indicators{position:absolute;bottom:10px;left:50%;z-index:15;width:60%;padding-left:0;margin-left:-30%;text-align:center;list-style:none}.carousel-indicators li{display:inline-block;width:10px;height:10px;margin:1px;text-indent:-999px;cursor:pointer;background-color:#000\\9;background-color:rgba(0,0,0,0);border:1px solid #fff;border-radius:10px}.carousel-indicators .active{width:12px;height:12px;margin:0;background-color:#fff}.carousel-caption{position:absolute;right:15%;bottom:20px;left:15%;z-index:10;padding-top:20px;padding-bottom:20px;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.6)}.carousel-caption .btn{text-shadow:none}@media screen and (min-width:768px){.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next,.carousel-control .icon-prev{width:30px;height:30px;margin-top:-15px;font-size:30px}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{margin-left:-15px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{margin-right:-15px}.carousel-caption{right:20%;left:20%;padding-bottom:30px}.carousel-indicators{bottom:20px}}.btn-group-vertical>.btn-group:after,.btn-group-vertical>.btn-group:before,.btn-toolbar:after,.btn-toolbar:before,.clearfix:after,.clearfix:before,.container-fluid:after,.container-fluid:before,.container:after,.container:before,.dl-horizontal dd:after,.dl-horizontal dd:before,.form-horizontal .form-group:after,.form-horizontal .form-group:before,.modal-footer:after,.modal-footer:before,.nav:after,.nav:before,.navbar-collapse:after,.navbar-collapse:before,.navbar-header:after,.navbar-header:before,.navbar:after,.navbar:before,.pager:after,.pager:before,.panel-body:after,.panel-body:before,.row:after,.row:before{display:table;content:\" \"}.btn-group-vertical>.btn-group:after,.btn-toolbar:after,.clearfix:after,.container-fluid:after,.container:after,.dl-horizontal dd:after,.form-horizontal .form-group:after,.modal-footer:after,.nav:after,.navbar-collapse:after,.navbar-header:after,.navbar:after,.pager:after,.panel-body:after,.row:after{clear:both}.center-block{display:block;margin-right:auto;margin-left:auto}.pull-right{float:right!important}.pull-left{float:left!important}.hide{display:none!important}.show{display:block!important}.invisible{visibility:hidden}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.hidden{display:none!important}.affix{position:fixed}@-ms-viewport{width:device-width}.visible-lg,.visible-md,.visible-sm,.visible-xs{display:none!important}.visible-lg-block,.visible-lg-inline,.visible-lg-inline-block,.visible-md-block,.visible-md-inline,.visible-md-inline-block,.visible-sm-block,.visible-sm-inline,.visible-sm-inline-block,.visible-xs-block,.visible-xs-inline,.visible-xs-inline-block{display:none!important}@media (max-width:767px){.visible-xs{display:block!important}table.visible-xs{display:table!important}tr.visible-xs{display:table-row!important}td.visible-xs,th.visible-xs{display:table-cell!important}}@media (max-width:767px){.visible-xs-block{display:block!important}}@media (max-width:767px){.visible-xs-inline{display:inline!important}}@media (max-width:767px){.visible-xs-inline-block{display:inline-block!important}}@media (min-width:768px) and (max-width:991px){.visible-sm{display:block!important}table.visible-sm{display:table!important}tr.visible-sm{display:table-row!important}td.visible-sm,th.visible-sm{display:table-cell!important}}@media (min-width:768px) and (max-width:991px){.visible-sm-block{display:block!important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline{display:inline!important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline-block{display:inline-block!important}}@media (min-width:992px) and (max-width:1199px){.visible-md{display:block!important}table.visible-md{display:table!important}tr.visible-md{display:table-row!important}td.visible-md,th.visible-md{display:table-cell!important}}@media (min-width:992px) and (max-width:1199px){.visible-md-block{display:block!important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline{display:inline!important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline-block{display:inline-block!important}}@media (min-width:1200px){.visible-lg{display:block!important}table.visible-lg{display:table!important}tr.visible-lg{display:table-row!important}td.visible-lg,th.visible-lg{display:table-cell!important}}@media (min-width:1200px){.visible-lg-block{display:block!important}}@media (min-width:1200px){.visible-lg-inline{display:inline!important}}@media (min-width:1200px){.visible-lg-inline-block{display:inline-block!important}}@media (max-width:767px){.hidden-xs{display:none!important}}@media (min-width:768px) and (max-width:991px){.hidden-sm{display:none!important}}@media (min-width:992px) and (max-width:1199px){.hidden-md{display:none!important}}@media (min-width:1200px){.hidden-lg{display:none!important}}.visible-print{display:none!important}@media print{.visible-print{display:block!important}table.visible-print{display:table!important}tr.visible-print{display:table-row!important}td.visible-print,th.visible-print{display:table-cell!important}}.visible-print-block{display:none!important}@media print{.visible-print-block{display:block!important}}.visible-print-inline{display:none!important}@media print{.visible-print-inline{display:inline!important}}.visible-print-inline-block{display:none!important}@media print{.visible-print-inline-block{display:inline-block!important}}@media print{.hidden-print{display:none!important}}", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "39add9c7a1f4a4518e3df09c8cea5a7d.eot"

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "4a60bf8b16b98b3ecc9717ef2781956a.woff2"

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "aab920e04211577da140c01f1f39adff.woff"

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "afd3ac5cff6ee0703c801e0834b5ed9e.ttf"

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3035cbed1bbfca80f8dec341a0132928.svg"

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./index.less", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./index.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "#main {\n  width: 512px;\n  height: 512px;\n}\n.side-bar {\n  margin-top: 80px;\n}\n", ""]);

	// exports


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(17)(__webpack_require__(18))

/***/ },
/* 17 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript === "function")
			execScript(src);
		else
			eval.call(null, src);
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "/*! jQuery v2.1.3 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */\n\"use strict\";\n\n!(function (a, b) {\n  \"object\" == typeof module && \"object\" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {\n    if (!a.document) throw new Error(\"jQuery requires a window with a document\");return b(a);\n  } : b(a);\n})(\"undefined\" != typeof window ? window : undefined, function (a, b) {\n  var c = [],\n      d = c.slice,\n      e = c.concat,\n      f = c.push,\n      g = c.indexOf,\n      h = {},\n      i = h.toString,\n      j = h.hasOwnProperty,\n      k = {},\n      l = a.document,\n      m = \"2.1.3\",\n      n = (function (_n) {\n    var _nWrapper = function n(_x, _x2) {\n      return _n.apply(this, arguments);\n    };\n\n    _nWrapper.toString = function () {\n      return _n.toString();\n    };\n\n    return _nWrapper;\n  })(function (a, b) {\n    return new n.fn.init(a, b);\n  }),\n      o = /^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g,\n      p = /^-ms-/,\n      q = /-([\\da-z])/gi,\n      r = function r(a, b) {\n    return b.toUpperCase();\n  };n.fn = n.prototype = { jquery: m, constructor: n, selector: \"\", length: 0, toArray: function toArray() {\n      return d.call(this);\n    }, get: function get(a) {\n      return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this);\n    }, pushStack: function pushStack(a) {\n      var b = n.merge(this.constructor(), a);return (b.prevObject = this, b.context = this.context, b);\n    }, each: function each(a, b) {\n      return n.each(this, a, b);\n    }, map: function map(a) {\n      return this.pushStack(n.map(this, function (b, c) {\n        return a.call(b, c, b);\n      }));\n    }, slice: function slice() {\n      return this.pushStack(d.apply(this, arguments));\n    }, first: function first() {\n      return this.eq(0);\n    }, last: function last() {\n      return this.eq(-1);\n    }, eq: function eq(a) {\n      var b = this.length,\n          c = +a + (0 > a ? b : 0);return this.pushStack(c >= 0 && b > c ? [this[c]] : []);\n    }, end: function end() {\n      return this.prevObject || this.constructor(null);\n    }, push: f, sort: c.sort, splice: c.splice }, n.extend = n.fn.extend = function () {\n    var a,\n        b,\n        c,\n        d,\n        e,\n        f,\n        g = arguments[0] || {},\n        h = 1,\n        i = arguments.length,\n        j = !1;for (\"boolean\" == typeof g && (j = g, g = arguments[h] || {}, h++), \"object\" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) if (null != (a = arguments[h])) for (b in a) c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));return g;\n  }, n.extend({ expando: \"jQuery\" + (m + Math.random()).replace(/\\D/g, \"\"), isReady: !0, error: function error(a) {\n      throw new Error(a);\n    }, noop: function noop() {}, isFunction: function isFunction(a) {\n      return \"function\" === n.type(a);\n    }, isArray: Array.isArray, isWindow: function isWindow(a) {\n      return null != a && a === a.window;\n    }, isNumeric: function isNumeric(a) {\n      return !n.isArray(a) && a - parseFloat(a) + 1 >= 0;\n    }, isPlainObject: function isPlainObject(a) {\n      return \"object\" !== n.type(a) || a.nodeType || n.isWindow(a) ? !1 : a.constructor && !j.call(a.constructor.prototype, \"isPrototypeOf\") ? !1 : !0;\n    }, isEmptyObject: function isEmptyObject(a) {\n      var b;for (b in a) return !1;return !0;\n    }, type: function type(a) {\n      return null == a ? a + \"\" : \"object\" == typeof a || \"function\" == typeof a ? h[i.call(a)] || \"object\" : typeof a;\n    }, globalEval: function globalEval(a) {\n      var b,\n          c = eval;a = n.trim(a), a && (1 === a.indexOf(\"use strict\") ? (b = l.createElement(\"script\"), b.text = a, l.head.appendChild(b).parentNode.removeChild(b)) : c(a));\n    }, camelCase: function camelCase(a) {\n      return a.replace(p, \"ms-\").replace(q, r);\n    }, nodeName: function nodeName(a, b) {\n      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();\n    }, each: function each(a, b, c) {\n      var d,\n          e = 0,\n          f = a.length,\n          g = s(a);if (c) {\n        if (g) {\n          for (; f > e; e++) if ((d = b.apply(a[e], c), d === !1)) break;\n        } else for (e in a) if ((d = b.apply(a[e], c), d === !1)) break;\n      } else if (g) {\n        for (; f > e; e++) if ((d = b.call(a[e], e, a[e]), d === !1)) break;\n      } else for (e in a) if ((d = b.call(a[e], e, a[e]), d === !1)) break;return a;\n    }, trim: function trim(a) {\n      return null == a ? \"\" : (a + \"\").replace(o, \"\");\n    }, makeArray: function makeArray(a, b) {\n      var c = b || [];return (null != a && (s(Object(a)) ? n.merge(c, \"string\" == typeof a ? [a] : a) : f.call(c, a)), c);\n    }, inArray: function inArray(a, b, c) {\n      return null == b ? -1 : g.call(b, a, c);\n    }, merge: function merge(a, b) {\n      for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];return (a.length = e, a);\n    }, grep: function grep(a, b, c) {\n      for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);return e;\n    }, map: function map(a, b, c) {\n      var d,\n          f = 0,\n          g = a.length,\n          h = s(a),\n          i = [];if (h) for (; g > f; f++) d = b(a[f], f, c), null != d && i.push(d);else for (f in a) d = b(a[f], f, c), null != d && i.push(d);return e.apply([], i);\n    }, guid: 1, proxy: function proxy(a, b) {\n      var c, e, f;return (\"string\" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (e = d.call(arguments, 2), f = function () {\n        return a.apply(b || this, e.concat(d.call(arguments)));\n      }, f.guid = a.guid = a.guid || n.guid++, f) : void 0);\n    }, now: Date.now, support: k }), n.each(\"Boolean Number String Function Array Date RegExp Object Error\".split(\" \"), function (a, b) {\n    h[\"[object \" + b + \"]\"] = b.toLowerCase();\n  });function s(a) {\n    var b = a.length,\n        c = n.type(a);return \"function\" === c || n.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : \"array\" === c || 0 === b || \"number\" == typeof b && b > 0 && b - 1 in a;\n  }var t = (function (a) {\n    var b,\n        c,\n        d,\n        e,\n        f,\n        g,\n        h,\n        i,\n        j,\n        k,\n        l,\n        m,\n        n,\n        o,\n        p,\n        q,\n        r,\n        s,\n        t,\n        u = \"sizzle\" + 1 * new Date(),\n        v = a.document,\n        w = 0,\n        x = 0,\n        y = hb(),\n        z = hb(),\n        A = hb(),\n        B = function B(a, b) {\n      return (a === b && (l = !0), 0);\n    },\n        C = 1 << 31,\n        D = ({}).hasOwnProperty,\n        E = [],\n        F = E.pop,\n        G = E.push,\n        H = E.push,\n        I = E.slice,\n        J = function J(a, b) {\n      for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) {\n        return c;\n      }return -1;\n    },\n        K = \"checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped\",\n        L = \"[\\\\x20\\\\t\\\\r\\\\n\\\\f]\",\n        M = \"(?:\\\\\\\\.|[\\\\w-]|[^\\\\x00-\\\\xa0])+\",\n        N = M.replace(\"w\", \"w#\"),\n        O = \"\\\\[\" + L + \"*(\" + M + \")(?:\" + L + \"*([*^$|!~]?=)\" + L + \"*(?:'((?:\\\\\\\\.|[^\\\\\\\\'])*)'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\"|(\" + N + \"))|)\" + L + \"*\\\\]\",\n        P = \":(\" + M + \")(?:\\\\((('((?:\\\\\\\\.|[^\\\\\\\\'])*)'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\")|((?:\\\\\\\\.|[^\\\\\\\\()[\\\\]]|\" + O + \")*)|.*)\\\\)|)\",\n        Q = new RegExp(L + \"+\", \"g\"),\n        R = new RegExp(\"^\" + L + \"+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)\" + L + \"+$\", \"g\"),\n        S = new RegExp(\"^\" + L + \"*,\" + L + \"*\"),\n        T = new RegExp(\"^\" + L + \"*([>+~]|\" + L + \")\" + L + \"*\"),\n        U = new RegExp(\"=\" + L + \"*([^\\\\]'\\\"]*?)\" + L + \"*\\\\]\", \"g\"),\n        V = new RegExp(P),\n        W = new RegExp(\"^\" + N + \"$\"),\n        X = { ID: new RegExp(\"^#(\" + M + \")\"), CLASS: new RegExp(\"^\\\\.(\" + M + \")\"), TAG: new RegExp(\"^(\" + M.replace(\"w\", \"w*\") + \")\"), ATTR: new RegExp(\"^\" + O), PSEUDO: new RegExp(\"^\" + P), CHILD: new RegExp(\"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\\\(\" + L + \"*(even|odd|(([+-]|)(\\\\d*)n|)\" + L + \"*(?:([+-]|)\" + L + \"*(\\\\d+)|))\" + L + \"*\\\\)|)\", \"i\"), bool: new RegExp(\"^(?:\" + K + \")$\", \"i\"), needsContext: new RegExp(\"^\" + L + \"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\\\(\" + L + \"*((?:-\\\\d)?\\\\d*)\" + L + \"*\\\\)|)(?=[^-]|$)\", \"i\") },\n        Y = /^(?:input|select|textarea|button)$/i,\n        Z = /^h\\d$/i,\n        $ = /^[^{]+\\{\\s*\\[native \\w/,\n        _ = /^(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+))$/,\n        ab = /[+~]/,\n        bb = /'|\\\\/g,\n        cb = new RegExp(\"\\\\\\\\([\\\\da-f]{1,6}\" + L + \"?|(\" + L + \")|.)\", \"ig\"),\n        db = function db(a, b, c) {\n      var d = \"0x\" + b - 65536;return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);\n    },\n        eb = function eb() {\n      m();\n    };try {\n      H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType;\n    } catch (fb) {\n      H = { apply: E.length ? function (a, b) {\n          G.apply(a, I.call(b));\n        } : function (a, b) {\n          var c = a.length,\n              d = 0;while (a[c++] = b[d++]);a.length = c - 1;\n        } };\n    }function gb(a, b, d, e) {\n      var f, h, j, k, l, o, r, s, w, x;if (((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, \"string\" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k)) {\n        return d;\n      }if (!e && p) {\n        if (11 !== k && (f = _.exec(a))) if (j = f[1]) {\n          if (9 === k) {\n            if ((h = b.getElementById(j), !h || !h.parentNode)) {\n              return d;\n            }if (h.id === j) {\n              return (d.push(h), d);\n            }\n          } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) {\n            return (d.push(h), d);\n          }\n        } else {\n          if (f[2]) {\n            return (H.apply(d, b.getElementsByTagName(a)), d);\n          }if ((j = f[3]) && c.getElementsByClassName) {\n            return (H.apply(d, b.getElementsByClassName(j)), d);\n          }\n        }if (c.qsa && (!q || !q.test(a))) {\n          if ((s = r = u, w = b, x = 1 !== k && a, 1 === k && \"object\" !== b.nodeName.toLowerCase())) {\n            o = g(a), (r = b.getAttribute(\"id\")) ? s = r.replace(bb, \"\\\\$&\") : b.setAttribute(\"id\", s), s = \"[id='\" + s + \"'] \", l = o.length;while (l--) o[l] = s + rb(o[l]);w = ab.test(a) && pb(b.parentNode) || b, x = o.join(\",\");\n          }if (x) try {\n            return (H.apply(d, w.querySelectorAll(x)), d);\n          } catch (y) {} finally {\n            r || b.removeAttribute(\"id\");\n          }\n        }\n      }return i(a.replace(R, \"$1\"), b, d, e);\n    }function hb() {\n      var a = [];function b(c, e) {\n        return (a.push(c + \" \") > d.cacheLength && delete b[a.shift()], b[c + \" \"] = e);\n      }return b;\n    }function ib(a) {\n      return (a[u] = !0, a);\n    }function jb(a) {\n      var b = n.createElement(\"div\");try {\n        return !!a(b);\n      } catch (c) {\n        return !1;\n      } finally {\n        b.parentNode && b.parentNode.removeChild(b), b = null;\n      }\n    }function kb(a, b) {\n      var c = a.split(\"|\"),\n          e = a.length;while (e--) d.attrHandle[c[e]] = b;\n    }function lb(a, b) {\n      var c = b && a,\n          d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);if (d) {\n        return d;\n      }if (c) while (c = c.nextSibling) if (c === b) {\n        return -1;\n      }return a ? 1 : -1;\n    }function mb(a) {\n      return function (b) {\n        var c = b.nodeName.toLowerCase();return \"input\" === c && b.type === a;\n      };\n    }function nb(a) {\n      return function (b) {\n        var c = b.nodeName.toLowerCase();return (\"input\" === c || \"button\" === c) && b.type === a;\n      };\n    }function ob(a) {\n      return ib(function (b) {\n        return (b = +b, ib(function (c, d) {\n          var e,\n              f = a([], c.length, b),\n              g = f.length;while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]));\n        }));\n      });\n    }function pb(a) {\n      return a && \"undefined\" != typeof a.getElementsByTagName && a;\n    }c = gb.support = {}, f = gb.isXML = function (a) {\n      var b = a && (a.ownerDocument || a).documentElement;return b ? \"HTML\" !== b.nodeName : !1;\n    }, m = gb.setDocument = function (a) {\n      var b,\n          e,\n          g = a ? a.ownerDocument || a : v;return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener(\"unload\", eb, !1) : e.attachEvent && e.attachEvent(\"onunload\", eb)), p = !f(g), c.attributes = jb(function (a) {\n        return (a.className = \"i\", !a.getAttribute(\"className\"));\n      }), c.getElementsByTagName = jb(function (a) {\n        return (a.appendChild(g.createComment(\"\")), !a.getElementsByTagName(\"*\").length);\n      }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = jb(function (a) {\n        return (o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length);\n      }), c.getById ? (d.find.ID = function (a, b) {\n        if (\"undefined\" != typeof b.getElementById && p) {\n          var c = b.getElementById(a);return c && c.parentNode ? [c] : [];\n        }\n      }, d.filter.ID = function (a) {\n        var b = a.replace(cb, db);return function (a) {\n          return a.getAttribute(\"id\") === b;\n        };\n      }) : (delete d.find.ID, d.filter.ID = function (a) {\n        var b = a.replace(cb, db);return function (a) {\n          var c = \"undefined\" != typeof a.getAttributeNode && a.getAttributeNode(\"id\");return c && c.value === b;\n        };\n      }), d.find.TAG = c.getElementsByTagName ? function (a, b) {\n        return \"undefined\" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;\n      } : function (a, b) {\n        var c,\n            d = [],\n            e = 0,\n            f = b.getElementsByTagName(a);if (\"*\" === a) {\n          while (c = f[e++]) 1 === c.nodeType && d.push(c);return d;\n        }return f;\n      }, d.find.CLASS = c.getElementsByClassName && function (a, b) {\n        return p ? b.getElementsByClassName(a) : void 0;\n      }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (jb(function (a) {\n        o.appendChild(a).innerHTML = \"<a id='\" + u + \"'></a><select id='\" + u + \"-\\f]' msallowcapture=''><option selected=''></option></select>\", a.querySelectorAll(\"[msallowcapture^='']\").length && q.push(\"[*^$]=\" + L + \"*(?:''|\\\"\\\")\"), a.querySelectorAll(\"[selected]\").length || q.push(\"\\\\[\" + L + \"*(?:value|\" + K + \")\"), a.querySelectorAll(\"[id~=\" + u + \"-]\").length || q.push(\"~=\"), a.querySelectorAll(\":checked\").length || q.push(\":checked\"), a.querySelectorAll(\"a#\" + u + \"+*\").length || q.push(\".#.+[+~]\");\n      }), jb(function (a) {\n        var b = g.createElement(\"input\");b.setAttribute(\"type\", \"hidden\"), a.appendChild(b).setAttribute(\"name\", \"D\"), a.querySelectorAll(\"[name=d]\").length && q.push(\"name\" + L + \"*[*^$|!~]?=\"), a.querySelectorAll(\":enabled\").length || q.push(\":enabled\", \":disabled\"), a.querySelectorAll(\"*,:x\"), q.push(\",.*:\");\n      })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && jb(function (a) {\n        c.disconnectedMatch = s.call(a, \"div\"), s.call(a, \"[s!='']:x\"), r.push(\"!=\", P);\n      }), q = q.length && new RegExp(q.join(\"|\")), r = r.length && new RegExp(r.join(\"|\")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function (a, b) {\n        var c = 9 === a.nodeType ? a.documentElement : a,\n            d = b && b.parentNode;return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));\n      } : function (a, b) {\n        if (b) while (b = b.parentNode) if (b === a) return !0;return !1;\n      }, B = b ? function (a, b) {\n        if (a === b) return (l = !0, 0);var d = !a.compareDocumentPosition - !b.compareDocumentPosition;return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1);\n      } : function (a, b) {\n        if (a === b) return (l = !0, 0);var c,\n            d = 0,\n            e = a.parentNode,\n            f = b.parentNode,\n            h = [a],\n            i = [b];if (!e || !f) return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;if (e === f) return lb(a, b);c = a;while (c = c.parentNode) h.unshift(c);c = b;while (c = c.parentNode) i.unshift(c);while (h[d] === i[d]) d++;return d ? lb(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0;\n      }, g) : n;\n    }, gb.matches = function (a, b) {\n      return gb(a, null, null, b);\n    }, gb.matchesSelector = function (a, b) {\n      if (((a.ownerDocument || a) !== n && m(a), b = b.replace(U, \"='$1']\"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b)))) try {\n        var d = s.call(a, b);if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;\n      } catch (e) {}return gb(b, n, null, [a]).length > 0;\n    }, gb.contains = function (a, b) {\n      return ((a.ownerDocument || a) !== n && m(a), t(a, b));\n    }, gb.attr = function (a, b) {\n      (a.ownerDocument || a) !== n && m(a);var e = d.attrHandle[b.toLowerCase()],\n          f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;\n    }, gb.error = function (a) {\n      throw new Error(\"Syntax error, unrecognized expression: \" + a);\n    }, gb.uniqueSort = function (a) {\n      var b,\n          d = [],\n          e = 0,\n          f = 0;if ((l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l)) {\n        while (b = a[f++]) b === a[f] && (e = d.push(f));while (e--) a.splice(d[e], 1);\n      }return (k = null, a);\n    }, e = gb.getText = function (a) {\n      var b,\n          c = \"\",\n          d = 0,\n          f = a.nodeType;if (f) {\n        if (1 === f || 9 === f || 11 === f) {\n          if (\"string\" == typeof a.textContent) return a.textContent;for (a = a.firstChild; a; a = a.nextSibling) c += e(a);\n        } else if (3 === f || 4 === f) return a.nodeValue;\n      } else while (b = a[d++]) c += e(b);return c;\n    }, d = gb.selectors = { cacheLength: 50, createPseudo: ib, match: X, attrHandle: {}, find: {}, relative: { \">\": { dir: \"parentNode\", first: !0 }, \" \": { dir: \"parentNode\" }, \"+\": { dir: \"previousSibling\", first: !0 }, \"~\": { dir: \"previousSibling\" } }, preFilter: { ATTR: function ATTR(a) {\n          return (a[1] = a[1].replace(cb, db), a[3] = (a[3] || a[4] || a[5] || \"\").replace(cb, db), \"~=\" === a[2] && (a[3] = \" \" + a[3] + \" \"), a.slice(0, 4));\n        }, CHILD: function CHILD(a) {\n          return (a[1] = a[1].toLowerCase(), \"nth\" === a[1].slice(0, 3) ? (a[3] || gb.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * (\"even\" === a[3] || \"odd\" === a[3])), a[5] = +(a[7] + a[8] || \"odd\" === a[3])) : a[3] && gb.error(a[0]), a);\n        }, PSEUDO: function PSEUDO(a) {\n          var b,\n              c = !a[6] && a[2];return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || \"\" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(\")\", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));\n        } }, filter: { TAG: function TAG(a) {\n          var b = a.replace(cb, db).toLowerCase();return \"*\" === a ? function () {\n            return !0;\n          } : function (a) {\n            return a.nodeName && a.nodeName.toLowerCase() === b;\n          };\n        }, CLASS: function CLASS(a) {\n          var b = y[a + \" \"];return b || (b = new RegExp(\"(^|\" + L + \")\" + a + \"(\" + L + \"|$)\")) && y(a, function (a) {\n            return b.test(\"string\" == typeof a.className && a.className || \"undefined\" != typeof a.getAttribute && a.getAttribute(\"class\") || \"\");\n          });\n        }, ATTR: function ATTR(a, b, c) {\n          return function (d) {\n            var e = gb.attr(d, a);return null == e ? \"!=\" === b : b ? (e += \"\", \"=\" === b ? e === c : \"!=\" === b ? e !== c : \"^=\" === b ? c && 0 === e.indexOf(c) : \"*=\" === b ? c && e.indexOf(c) > -1 : \"$=\" === b ? c && e.slice(-c.length) === c : \"~=\" === b ? (\" \" + e.replace(Q, \" \") + \" \").indexOf(c) > -1 : \"|=\" === b ? e === c || e.slice(0, c.length + 1) === c + \"-\" : !1) : !0;\n          };\n        }, CHILD: function CHILD(a, b, c, d, e) {\n          var f = \"nth\" !== a.slice(0, 3),\n              g = \"last\" !== a.slice(-4),\n              h = \"of-type\" === b;return 1 === d && 0 === e ? function (a) {\n            return !!a.parentNode;\n          } : function (b, c, i) {\n            var j,\n                k,\n                l,\n                m,\n                n,\n                o,\n                p = f !== g ? \"nextSibling\" : \"previousSibling\",\n                q = b.parentNode,\n                r = h && b.nodeName.toLowerCase(),\n                s = !i && !h;if (q) {\n              if (f) {\n                while (p) {\n                  l = b;while (l = l[p]) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;o = p = \"only\" === a && !o && \"nextSibling\";\n                }return !0;\n              }if ((o = [g ? q.firstChild : q.lastChild], g && s)) {\n                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if (1 === l.nodeType && ++m && l === b) {\n                  k[a] = [w, n, m];break;\n                }\n              } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];else while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break;return (m -= e, m === d || m % d === 0 && m / d >= 0);\n            }\n          };\n        }, PSEUDO: function PSEUDO(a, b) {\n          var c,\n              e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || gb.error(\"unsupported pseudo: \" + a);return e[u] ? e(b) : e.length > 1 ? (c = [a, a, \"\", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ib(function (a, c) {\n            var d,\n                f = e(a, b),\n                g = f.length;while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g]);\n          }) : function (a) {\n            return e(a, 0, c);\n          }) : e;\n        } }, pseudos: { not: ib(function (a) {\n          var b = [],\n              c = [],\n              d = h(a.replace(R, \"$1\"));return d[u] ? ib(function (a, b, c, e) {\n            var f,\n                g = d(a, null, e, []),\n                h = a.length;while (h--) (f = g[h]) && (a[h] = !(b[h] = f));\n          }) : function (a, e, f) {\n            return (b[0] = a, d(b, null, f, c), b[0] = null, !c.pop());\n          };\n        }), has: ib(function (a) {\n          return function (b) {\n            return gb(a, b).length > 0;\n          };\n        }), contains: ib(function (a) {\n          return (a = a.replace(cb, db), function (b) {\n            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;\n          });\n        }), lang: ib(function (a) {\n          return (W.test(a || \"\") || gb.error(\"unsupported lang: \" + a), a = a.replace(cb, db).toLowerCase(), function (b) {\n            var c;do if (c = p ? b.lang : b.getAttribute(\"xml:lang\") || b.getAttribute(\"lang\")) return (c = c.toLowerCase(), c === a || 0 === c.indexOf(a + \"-\")); while ((b = b.parentNode) && 1 === b.nodeType);return !1;\n          });\n        }), target: function target(b) {\n          var c = a.location && a.location.hash;return c && c.slice(1) === b.id;\n        }, root: function root(a) {\n          return a === o;\n        }, focus: function focus(a) {\n          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);\n        }, enabled: function enabled(a) {\n          return a.disabled === !1;\n        }, disabled: function disabled(a) {\n          return a.disabled === !0;\n        }, checked: function checked(a) {\n          var b = a.nodeName.toLowerCase();return \"input\" === b && !!a.checked || \"option\" === b && !!a.selected;\n        }, selected: function selected(a) {\n          return (a.parentNode && a.parentNode.selectedIndex, a.selected === !0);\n        }, empty: function empty(a) {\n          for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) {\n            return !1;\n          }return !0;\n        }, parent: function parent(a) {\n          return !d.pseudos.empty(a);\n        }, header: function header(a) {\n          return Z.test(a.nodeName);\n        }, input: function input(a) {\n          return Y.test(a.nodeName);\n        }, button: function button(a) {\n          var b = a.nodeName.toLowerCase();return \"input\" === b && \"button\" === a.type || \"button\" === b;\n        }, text: function text(a) {\n          var b;return \"input\" === a.nodeName.toLowerCase() && \"text\" === a.type && (null == (b = a.getAttribute(\"type\")) || \"text\" === b.toLowerCase());\n        }, first: ob(function () {\n          return [0];\n        }), last: ob(function (a, b) {\n          return [b - 1];\n        }), eq: ob(function (a, b, c) {\n          return [0 > c ? c + b : c];\n        }), even: ob(function (a, b) {\n          for (var c = 0; b > c; c += 2) a.push(c);return a;\n        }), odd: ob(function (a, b) {\n          for (var c = 1; b > c; c += 2) a.push(c);return a;\n        }), lt: ob(function (a, b, c) {\n          for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);return a;\n        }), gt: ob(function (a, b, c) {\n          for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);return a;\n        }) } }, d.pseudos.nth = d.pseudos.eq;for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) d.pseudos[b] = mb(b);for (b in { submit: !0, reset: !0 }) d.pseudos[b] = nb(b);function qb() {}qb.prototype = d.filters = d.pseudos, d.setFilters = new qb(), g = gb.tokenize = function (a, b) {\n      var c,\n          e,\n          f,\n          g,\n          h,\n          i,\n          j,\n          k = z[a + \" \"];if (k) return b ? 0 : k.slice(0);h = a, i = [], j = d.preFilter;while (h) {\n        (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(R, \" \") }), h = h.slice(c.length));for (g in d.filter) !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length));if (!c) break;\n      }return b ? h.length : h ? gb.error(a) : z(a, i).slice(0);\n    };function rb(a) {\n      for (var b = 0, c = a.length, d = \"\"; c > b; b++) d += a[b].value;return d;\n    }function sb(a, b, c) {\n      var d = b.dir,\n          e = c && \"parentNode\" === d,\n          f = x++;return b.first ? function (b, c, f) {\n        while (b = b[d]) if (1 === b.nodeType || e) return a(b, c, f);\n      } : function (b, c, g) {\n        var h,\n            i,\n            j = [w, f];if (g) {\n          while (b = b[d]) if ((1 === b.nodeType || e) && a(b, c, g)) return !0;\n        } else while (b = b[d]) if (1 === b.nodeType || e) {\n          if ((i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f)) return j[2] = h[2];if ((i[d] = j, j[2] = a(b, c, g))) return !0;\n        }\n      };\n    }function tb(a) {\n      return a.length > 1 ? function (b, c, d) {\n        var e = a.length;while (e--) if (!a[e](b, c, d)) return !1;return !0;\n      } : a[0];\n    }function ub(a, b, c) {\n      for (var d = 0, e = b.length; e > d; d++) gb(a, b[d], c);return c;\n    }function vb(a, b, c, d, e) {\n      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));return g;\n    }function wb(a, b, c, d, e, f) {\n      return (d && !d[u] && (d = wb(d)), e && !e[u] && (e = wb(e, f)), ib(function (f, g, h, i) {\n        var j,\n            k,\n            l,\n            m = [],\n            n = [],\n            o = g.length,\n            p = f || ub(b || \"*\", h.nodeType ? [h] : h, []),\n            q = !a || !f && b ? p : vb(p, m, a, h, i),\n            r = c ? e || (f ? a : o || d) ? [] : g : q;if ((c && c(q, r, h, i), d)) {\n          j = vb(r, n), d(j, [], h, i), k = j.length;while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));\n        }if (f) {\n          if (e || a) {\n            if (e) {\n              j = [], k = r.length;while (k--) (l = r[k]) && j.push(q[k] = l);e(null, r = [], j, i);\n            }k = r.length;while (k--) (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));\n          }\n        } else r = vb(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r);\n      }));\n    }function xb(a) {\n      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[\" \"], i = g ? 1 : 0, k = sb(function (a) {\n        return a === b;\n      }, h, !0), l = sb(function (a) {\n        return J(b, a) > -1;\n      }, h, !0), m = [function (a, c, d) {\n        var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));return (b = null, e);\n      }]; f > i; i++) if (c = d.relative[a[i].type]) m = [sb(tb(m), c)];else {\n        if ((c = d.filter[a[i].type].apply(null, a[i].matches), c[u])) {\n          for (e = ++i; f > e; e++) if (d.relative[a[e].type]) break;return wb(i > 1 && tb(m), i > 1 && rb(a.slice(0, i - 1).concat({ value: \" \" === a[i - 2].type ? \"*\" : \"\" })).replace(R, \"$1\"), c, e > i && xb(a.slice(i, e)), f > e && xb(a = a.slice(e)), f > e && rb(a));\n        }m.push(c);\n      }return tb(m);\n    }function yb(a, b) {\n      var c = b.length > 0,\n          e = a.length > 0,\n          f = (function (_f) {\n        var _fWrapper = function f(_x, _x2, _x3, _x4, _x5) {\n          return _f.apply(this, arguments);\n        };\n\n        _fWrapper.toString = function () {\n          return _f.toString();\n        };\n\n        return _fWrapper;\n      })(function (f, g, h, i, k) {\n        var l,\n            m,\n            o,\n            p = 0,\n            q = \"0\",\n            r = f && [],\n            s = [],\n            t = j,\n            u = f || e && d.find.TAG(\"*\", k),\n            v = w += null == t ? 1 : Math.random() || 0.1,\n            x = u.length;for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {\n          if (e && l) {\n            m = 0;while (o = a[m++]) if (o(l, g, h)) {\n              i.push(l);break;\n            }k && (w = v);\n          }c && ((l = !o && l) && p--, f && r.push(l));\n        }if ((p += q, c && q !== p)) {\n          m = 0;while (o = b[m++]) o(r, s, g, h);if (f) {\n            if (p > 0) while (q--) r[q] || s[q] || (s[q] = F.call(i));s = vb(s);\n          }H.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && gb.uniqueSort(i);\n        }return (k && (w = v, j = t), r);\n      });return c ? ib(f) : f;\n    }return (h = gb.compile = function (a, b) {\n      var c,\n          d = [],\n          e = [],\n          f = A[a + \" \"];if (!f) {\n        b || (b = g(a)), c = b.length;while (c--) f = xb(b[c]), f[u] ? d.push(f) : e.push(f);f = A(a, yb(e, d)), f.selector = a;\n      }return f;\n    }, i = gb.select = function (a, b, e, f) {\n      var i,\n          j,\n          k,\n          l,\n          m,\n          n = \"function\" == typeof a && a,\n          o = !f && g(a = n.selector || a);if ((e = e || [], 1 === o.length)) {\n        if ((j = o[0] = o[0].slice(0), j.length > 2 && \"ID\" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type])) {\n          if ((b = (d.find.ID(k.matches[0].replace(cb, db), b) || [])[0], !b)) return e;n && (b = b.parentNode), a = a.slice(j.shift().value.length);\n        }i = X.needsContext.test(a) ? 0 : j.length;while (i--) {\n          if ((k = j[i], d.relative[l = k.type])) break;if ((m = d.find[l]) && (f = m(k.matches[0].replace(cb, db), ab.test(j[0].type) && pb(b.parentNode) || b))) {\n            if ((j.splice(i, 1), a = f.length && rb(j), !a)) return (H.apply(e, f), e);break;\n          }\n        }\n      }return ((n || h(a, o))(f, b, !p, e, ab.test(a) && pb(b.parentNode) || b), e);\n    }, c.sortStable = u.split(\"\").sort(B).join(\"\") === u, c.detectDuplicates = !!l, m(), c.sortDetached = jb(function (a) {\n      return 1 & a.compareDocumentPosition(n.createElement(\"div\"));\n    }), jb(function (a) {\n      return (a.innerHTML = \"<a href='#'></a>\", \"#\" === a.firstChild.getAttribute(\"href\"));\n    }) || kb(\"type|href|height|width\", function (a, b, c) {\n      return c ? void 0 : a.getAttribute(b, \"type\" === b.toLowerCase() ? 1 : 2);\n    }), c.attributes && jb(function (a) {\n      return (a.innerHTML = \"<input/>\", a.firstChild.setAttribute(\"value\", \"\"), \"\" === a.firstChild.getAttribute(\"value\"));\n    }) || kb(\"value\", function (a, b, c) {\n      return c || \"input\" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;\n    }), jb(function (a) {\n      return null == a.getAttribute(\"disabled\");\n    }) || kb(K, function (a, b, c) {\n      var d;return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;\n    }), gb);\n  })(a);n.find = t, n.expr = t.selectors, n.expr[\":\"] = n.expr.pseudos, n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;var u = n.expr.match.needsContext,\n      v = /^<(\\w+)\\s*\\/?>(?:<\\/\\1>|)$/,\n      w = /^.[^:#\\[\\.,]*$/;function x(a, b, c) {\n    if (n.isFunction(b)) {\n      return n.grep(a, function (a, d) {\n        return !!b.call(a, d, a) !== c;\n      });\n    }if (b.nodeType) {\n      return n.grep(a, function (a) {\n        return a === b !== c;\n      });\n    }if (\"string\" == typeof b) {\n      if (w.test(b)) {\n        return n.filter(b, a, c);\n      }b = n.filter(b, a);\n    }return n.grep(a, function (a) {\n      return g.call(b, a) >= 0 !== c;\n    });\n  }n.filter = function (a, b, c) {\n    var d = b[0];return (c && (a = \":not(\" + a + \")\"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function (a) {\n      return 1 === a.nodeType;\n    })));\n  }, n.fn.extend({ find: function find(a) {\n      var b,\n          c = this.length,\n          d = [],\n          e = this;if (\"string\" != typeof a) {\n        return this.pushStack(n(a).filter(function () {\n          for (b = 0; c > b; b++) if (n.contains(e[b], this)) return !0;\n        }));\n      }for (b = 0; c > b; b++) n.find(a, e[b], d);return (d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + \" \" + a : a, d);\n    }, filter: function filter(a) {\n      return this.pushStack(x(this, a || [], !1));\n    }, not: function not(a) {\n      return this.pushStack(x(this, a || [], !0));\n    }, is: function is(a) {\n      return !!x(this, \"string\" == typeof a && u.test(a) ? n(a) : a || [], !1).length;\n    } });var y,\n      z = /^(?:\\s*(<[\\w\\W]+>)[^>]*|#([\\w-]*))$/,\n      A = n.fn.init = function (a, b) {\n    var c, d;if (!a) return this;if (\"string\" == typeof a) {\n      if ((c = \"<\" === a[0] && \">\" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b)) return !b || b.jquery ? (b || y).find(a) : this.constructor(b).find(a);if (c[1]) {\n        if ((b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : l, !0)), v.test(c[1]) && n.isPlainObject(b))) for (c in b) n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);return this;\n      }return (d = l.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = l, this.selector = a, this);\n    }return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? \"undefined\" != typeof y.ready ? y.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this));\n  };A.prototype = n.fn, y = n(l);var B = /^(?:parents|prev(?:Until|All))/,\n      C = { children: !0, contents: !0, next: !0, prev: !0 };n.extend({ dir: function dir(a, b, c) {\n      var d = [],\n          e = void 0 !== c;while ((a = a[b]) && 9 !== a.nodeType) if (1 === a.nodeType) {\n        if (e && n(a).is(c)) break;d.push(a);\n      }return d;\n    }, sibling: function sibling(a, b) {\n      for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);return c;\n    } }), n.fn.extend({ has: function has(a) {\n      var b = n(a, this),\n          c = b.length;return this.filter(function () {\n        for (var a = 0; c > a; a++) if (n.contains(this, b[a])) return !0;\n      });\n    }, closest: function closest(a, b) {\n      for (var c, d = 0, e = this.length, f = [], g = u.test(a) || \"string\" != typeof a ? n(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {\n        f.push(c);break;\n      }return this.pushStack(f.length > 1 ? n.unique(f) : f);\n    }, index: function index(a) {\n      return a ? \"string\" == typeof a ? g.call(n(a), this[0]) : g.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;\n    }, add: function add(a, b) {\n      return this.pushStack(n.unique(n.merge(this.get(), n(a, b))));\n    }, addBack: function addBack(a) {\n      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));\n    } });function D(a, b) {\n    while ((a = a[b]) && 1 !== a.nodeType);return a;\n  }n.each({ parent: function parent(a) {\n      var b = a.parentNode;return b && 11 !== b.nodeType ? b : null;\n    }, parents: function parents(a) {\n      return n.dir(a, \"parentNode\");\n    }, parentsUntil: function parentsUntil(a, b, c) {\n      return n.dir(a, \"parentNode\", c);\n    }, next: function next(a) {\n      return D(a, \"nextSibling\");\n    }, prev: function prev(a) {\n      return D(a, \"previousSibling\");\n    }, nextAll: function nextAll(a) {\n      return n.dir(a, \"nextSibling\");\n    }, prevAll: function prevAll(a) {\n      return n.dir(a, \"previousSibling\");\n    }, nextUntil: function nextUntil(a, b, c) {\n      return n.dir(a, \"nextSibling\", c);\n    }, prevUntil: function prevUntil(a, b, c) {\n      return n.dir(a, \"previousSibling\", c);\n    }, siblings: function siblings(a) {\n      return n.sibling((a.parentNode || {}).firstChild, a);\n    }, children: function children(a) {\n      return n.sibling(a.firstChild);\n    }, contents: function contents(a) {\n      return a.contentDocument || n.merge([], a.childNodes);\n    } }, function (a, b) {\n    n.fn[a] = function (c, d) {\n      var e = n.map(this, b, c);return (\"Until\" !== a.slice(-5) && (d = c), d && \"string\" == typeof d && (e = n.filter(d, e)), this.length > 1 && (C[a] || n.unique(e), B.test(a) && e.reverse()), this.pushStack(e));\n    };\n  });var E = /\\S+/g,\n      F = {};function G(a) {\n    var b = F[a] = {};return (n.each(a.match(E) || [], function (a, c) {\n      b[c] = !0;\n    }), b);\n  }n.Callbacks = function (a) {\n    a = \"string\" == typeof a ? F[a] || G(a) : n.extend({}, a);var b,\n        c,\n        d,\n        e,\n        f,\n        g,\n        h = [],\n        i = !a.once && [],\n        j = (function (_j) {\n      var _jWrapper = function j(_x) {\n        return _j.apply(this, arguments);\n      };\n\n      _jWrapper.toString = function () {\n        return _j.toString();\n      };\n\n      return _jWrapper;\n    })(function (l) {\n      for (b = a.memory && l, c = !0, g = e || 0, e = 0, f = h.length, d = !0; h && f > g; g++) if (h[g].apply(l[0], l[1]) === !1 && a.stopOnFalse) {\n        b = !1;break;\n      }d = !1, h && (i ? i.length && j(i.shift()) : b ? h = [] : k.disable());\n    }),\n        k = { add: function add() {\n        if (h) {\n          var c = h.length;!(function g(b) {\n            n.each(b, function (b, c) {\n              var d = n.type(c);\"function\" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && \"string\" !== d && g(c);\n            });\n          })(arguments), d ? f = h.length : b && (e = c, j(b));\n        }return this;\n      }, remove: function remove() {\n        return (h && n.each(arguments, function (a, b) {\n          var c;while ((c = n.inArray(b, h, c)) > -1) h.splice(c, 1), d && (f >= c && f--, g >= c && g--);\n        }), this);\n      }, has: function has(a) {\n        return a ? n.inArray(a, h) > -1 : !(!h || !h.length);\n      }, empty: function empty() {\n        return (h = [], f = 0, this);\n      }, disable: function disable() {\n        return (h = i = b = void 0, this);\n      }, disabled: function disabled() {\n        return !h;\n      }, lock: function lock() {\n        return (i = void 0, b || k.disable(), this);\n      }, locked: function locked() {\n        return !i;\n      }, fireWith: function fireWith(a, b) {\n        return (!h || c && !i || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? i.push(b) : j(b)), this);\n      }, fire: function fire() {\n        return (k.fireWith(this, arguments), this);\n      }, fired: function fired() {\n        return !!c;\n      } };return k;\n  }, n.extend({ Deferred: function Deferred(a) {\n      var b = [[\"resolve\", \"done\", n.Callbacks(\"once memory\"), \"resolved\"], [\"reject\", \"fail\", n.Callbacks(\"once memory\"), \"rejected\"], [\"notify\", \"progress\", n.Callbacks(\"memory\")]],\n          c = \"pending\",\n          d = { state: function state() {\n          return c;\n        }, always: function always() {\n          return (e.done(arguments).fail(arguments), this);\n        }, then: function then() {\n          var a = arguments;return n.Deferred(function (c) {\n            n.each(b, function (b, f) {\n              var g = n.isFunction(a[b]) && a[b];e[f[1]](function () {\n                var a = g && g.apply(this, arguments);a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + \"With\"](this === d ? c.promise() : this, g ? [a] : arguments);\n              });\n            }), a = null;\n          }).promise();\n        }, promise: function promise(a) {\n          return null != a ? n.extend(a, d) : d;\n        } },\n          e = {};return (d.pipe = d.then, n.each(b, function (a, f) {\n        var g = f[2],\n            h = f[3];d[f[1]] = g.add, h && g.add(function () {\n          c = h;\n        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {\n          return (e[f[0] + \"With\"](this === e ? d : this, arguments), this);\n        }, e[f[0] + \"With\"] = g.fireWith;\n      }), d.promise(e), a && a.call(e, e), e);\n    }, when: function when(a) {\n      var b = 0,\n          c = d.call(arguments),\n          e = c.length,\n          f = 1 !== e || a && n.isFunction(a.promise) ? e : 0,\n          g = 1 === f ? a : n.Deferred(),\n          h = function h(a, b, c) {\n        return function (e) {\n          b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);\n        };\n      },\n          i,\n          j,\n          k;if (e > 1) for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;return (f || g.resolveWith(k, c), g.promise());\n    } });var H;n.fn.ready = function (a) {\n    return (n.ready.promise().done(a), this);\n  }, n.extend({ isReady: !1, readyWait: 1, holdReady: function holdReady(a) {\n      a ? n.readyWait++ : n.ready(!0);\n    }, ready: function ready(a) {\n      (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (H.resolveWith(l, [n]), n.fn.triggerHandler && (n(l).triggerHandler(\"ready\"), n(l).off(\"ready\"))));\n    } });function I() {\n    l.removeEventListener(\"DOMContentLoaded\", I, !1), a.removeEventListener(\"load\", I, !1), n.ready();\n  }n.ready.promise = function (b) {\n    return (H || (H = n.Deferred(), \"complete\" === l.readyState ? setTimeout(n.ready) : (l.addEventListener(\"DOMContentLoaded\", I, !1), a.addEventListener(\"load\", I, !1))), H.promise(b));\n  }, n.ready.promise();var J = n.access = function (a, b, c, d, e, f, g) {\n    var h = 0,\n        i = a.length,\n        j = null == c;if (\"object\" === n.type(c)) {\n      e = !0;for (h in c) n.access(a, b, h, c[h], !0, f, g);\n    } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {\n      return j.call(n(a), c);\n    })), b)) for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;\n  };n.acceptData = function (a) {\n    return 1 === a.nodeType || 9 === a.nodeType || ! +a.nodeType;\n  };function K() {\n    Object.defineProperty(this.cache = {}, 0, { get: function get() {\n        return {};\n      } }), this.expando = n.expando + K.uid++;\n  }K.uid = 1, K.accepts = n.acceptData, K.prototype = { key: function key(a) {\n      if (!K.accepts(a)) {\n        return 0;\n      }var b = {},\n          c = a[this.expando];if (!c) {\n        c = K.uid++;try {\n          b[this.expando] = { value: c }, Object.defineProperties(a, b);\n        } catch (d) {\n          b[this.expando] = c, n.extend(a, b);\n        }\n      }return (this.cache[c] || (this.cache[c] = {}), c);\n    }, set: function set(a, b, c) {\n      var d,\n          e = this.key(a),\n          f = this.cache[e];if (\"string\" == typeof b) f[b] = c;else if (n.isEmptyObject(f)) n.extend(this.cache[e], b);else for (d in b) f[d] = b[d];return f;\n    }, get: function get(a, b) {\n      var c = this.cache[this.key(a)];return void 0 === b ? c : c[b];\n    }, access: function access(a, b, c) {\n      var d;return void 0 === b || b && \"string\" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b);\n    }, remove: function remove(a, b) {\n      var c,\n          d,\n          e,\n          f = this.key(a),\n          g = this.cache[f];if (void 0 === b) this.cache[f] = {};else {\n        n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(E) || [])), c = d.length;while (c--) delete g[d[c]];\n      }\n    }, hasData: function hasData(a) {\n      return !n.isEmptyObject(this.cache[a[this.expando]] || {});\n    }, discard: function discard(a) {\n      a[this.expando] && delete this.cache[a[this.expando]];\n    } };var L = new K(),\n      M = new K(),\n      N = /^(?:\\{[\\w\\W]*\\}|\\[[\\w\\W]*\\])$/,\n      O = /([A-Z])/g;function P(a, b, c) {\n    var d;if (void 0 === c && 1 === a.nodeType) if ((d = \"data-\" + b.replace(O, \"-$1\").toLowerCase(), c = a.getAttribute(d), \"string\" == typeof c)) {\n      try {\n        c = \"true\" === c ? !0 : \"false\" === c ? !1 : \"null\" === c ? null : +c + \"\" === c ? +c : N.test(c) ? n.parseJSON(c) : c;\n      } catch (e) {}M.set(a, b, c);\n    } else c = void 0;return c;\n  }n.extend({ hasData: function hasData(a) {\n      return M.hasData(a) || L.hasData(a);\n    }, data: function data(a, b, c) {\n      return M.access(a, b, c);\n    }, removeData: function removeData(a, b) {\n      M.remove(a, b);\n    }, _data: function _data(a, b, c) {\n      return L.access(a, b, c);\n    }, _removeData: function _removeData(a, b) {\n      L.remove(a, b);\n    } }), n.fn.extend({ data: function data(a, b) {\n      var c,\n          d,\n          e,\n          f = this[0],\n          g = f && f.attributes;if (void 0 === a) {\n        if (this.length && (e = M.get(f), 1 === f.nodeType && !L.get(f, \"hasDataAttrs\"))) {\n          c = g.length;while (c--) g[c] && (d = g[c].name, 0 === d.indexOf(\"data-\") && (d = n.camelCase(d.slice(5)), P(f, d, e[d])));L.set(f, \"hasDataAttrs\", !0);\n        }return e;\n      }return \"object\" == typeof a ? this.each(function () {\n        M.set(this, a);\n      }) : J(this, function (b) {\n        var c,\n            d = n.camelCase(a);if (f && void 0 === b) {\n          if ((c = M.get(f, a), void 0 !== c)) return c;if ((c = M.get(f, d), void 0 !== c)) return c;if ((c = P(f, d, void 0), void 0 !== c)) return c;\n        } else this.each(function () {\n          var c = M.get(this, d);M.set(this, d, b), -1 !== a.indexOf(\"-\") && void 0 !== c && M.set(this, a, b);\n        });\n      }, null, b, arguments.length > 1, null, !0);\n    }, removeData: function removeData(a) {\n      return this.each(function () {\n        M.remove(this, a);\n      });\n    } }), n.extend({ queue: function queue(a, b, c) {\n      var d;return a ? (b = (b || \"fx\") + \"queue\", d = L.get(a, b), c && (!d || n.isArray(c) ? d = L.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0;\n    }, dequeue: function dequeue(a, b) {\n      b = b || \"fx\";var c = n.queue(a, b),\n          d = c.length,\n          e = c.shift(),\n          f = n._queueHooks(a, b),\n          g = function g() {\n        n.dequeue(a, b);\n      };\"inprogress\" === e && (e = c.shift(), d--), e && (\"fx\" === b && c.unshift(\"inprogress\"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();\n    }, _queueHooks: function _queueHooks(a, b) {\n      var c = b + \"queueHooks\";return L.get(a, c) || L.access(a, c, { empty: n.Callbacks(\"once memory\").add(function () {\n          L.remove(a, [b + \"queue\", c]);\n        }) });\n    } }), n.fn.extend({ queue: function queue(a, b) {\n      var c = 2;return (\"string\" != typeof a && (b = a, a = \"fx\", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function () {\n        var c = n.queue(this, a, b);n._queueHooks(this, a), \"fx\" === a && \"inprogress\" !== c[0] && n.dequeue(this, a);\n      }));\n    }, dequeue: function dequeue(a) {\n      return this.each(function () {\n        n.dequeue(this, a);\n      });\n    }, clearQueue: function clearQueue(a) {\n      return this.queue(a || \"fx\", []);\n    }, promise: function promise(a, b) {\n      var c,\n          d = 1,\n          e = n.Deferred(),\n          f = this,\n          g = this.length,\n          h = function h() {\n        --d || e.resolveWith(f, [f]);\n      };\"string\" != typeof a && (b = a, a = void 0), a = a || \"fx\";while (g--) c = L.get(f[g], a + \"queueHooks\"), c && c.empty && (d++, c.empty.add(h));return (h(), e.promise(b));\n    } });var Q = /[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)/.source,\n      R = [\"Top\", \"Right\", \"Bottom\", \"Left\"],\n      S = function S(a, b) {\n    return (a = b || a, \"none\" === n.css(a, \"display\") || !n.contains(a.ownerDocument, a));\n  },\n      T = /^(?:checkbox|radio)$/i;!(function () {\n    var a = l.createDocumentFragment(),\n        b = a.appendChild(l.createElement(\"div\")),\n        c = l.createElement(\"input\");c.setAttribute(\"type\", \"radio\"), c.setAttribute(\"checked\", \"checked\"), c.setAttribute(\"name\", \"t\"), b.appendChild(c), k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = \"<textarea>x</textarea>\", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;\n  })();var U = \"undefined\";k.focusinBubbles = \"onfocusin\" in a;var V = /^key/,\n      W = /^(?:mouse|pointer|contextmenu)|click/,\n      X = /^(?:focusinfocus|focusoutblur)$/,\n      Y = /^([^.]*)(?:\\.(.+)|)$/;function Z() {\n    return !0;\n  }function $() {\n    return !1;\n  }function _() {\n    try {\n      return l.activeElement;\n    } catch (a) {}\n  }n.event = { global: {}, add: function add(a, b, c, d, e) {\n      var f,\n          g,\n          h,\n          i,\n          j,\n          k,\n          l,\n          m,\n          o,\n          p,\n          q,\n          r = L.get(a);if (r) {\n        c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function (b) {\n          return typeof n !== U && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0;\n        }), b = (b || \"\").match(E) || [\"\"], j = b.length;while (j--) h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || \"\").split(\".\").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({ type: o, origType: q, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && n.expr.match.needsContext.test(e), namespace: p.join(\".\") }, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0);\n      }\n    }, remove: function remove(a, b, c, d, e) {\n      var f,\n          g,\n          h,\n          i,\n          j,\n          k,\n          l,\n          m,\n          o,\n          p,\n          q,\n          r = L.hasData(a) && L.get(a);if (r && (i = r.events)) {\n        b = (b || \"\").match(E) || [\"\"], j = b.length;while (j--) if ((h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || \"\").split(\".\").sort(), o)) {\n          l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp(\"(^|\\\\.)\" + p.join(\"\\\\.(?:.*\\\\.|)\") + \"(\\\\.|$)\"), g = f = m.length;while (f--) k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && (\"**\" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o]);\n        } else for (o in i) n.event.remove(a, o + b[j], c, d, !0);n.isEmptyObject(i) && (delete r.handle, L.remove(a, \"events\"));\n      }\n    }, trigger: function trigger(b, c, d, e) {\n      var f,\n          g,\n          h,\n          i,\n          k,\n          m,\n          o,\n          p = [d || l],\n          q = j.call(b, \"type\") ? b.type : b,\n          r = j.call(b, \"namespace\") ? b.namespace.split(\".\") : [];if ((g = h = d = d || l, 3 !== d.nodeType && 8 !== d.nodeType && !X.test(q + n.event.triggered) && (q.indexOf(\".\") >= 0 && (r = q.split(\".\"), q = r.shift(), r.sort()), k = q.indexOf(\":\") < 0 && \"on\" + q, b = b[n.expando] ? b : new n.Event(q, \"object\" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = r.join(\".\"), b.namespace_re = b.namespace ? new RegExp(\"(^|\\\\.)\" + r.join(\"\\\\.(?:.*\\\\.|)\") + \"(\\\\.|$)\") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, e || !o.trigger || o.trigger.apply(d, c) !== !1))) {\n        if (!e && !o.noBubble && !n.isWindow(d)) {\n          for (i = o.delegateType || q, X.test(i + q) || (g = g.parentNode); g; g = g.parentNode) p.push(g), h = g;h === (d.ownerDocument || l) && p.push(h.defaultView || h.parentWindow || a);\n        }f = 0;while ((g = p[f++]) && !b.isPropagationStopped()) b.type = f > 1 ? i : o.bindType || q, m = (L.get(g, \"events\") || {})[b.type] && L.get(g, \"handle\"), m && m.apply(g, c), m = k && g[k], m && m.apply && n.acceptData(g) && (b.result = m.apply(g, c), b.result === !1 && b.preventDefault());return (b.type = q, e || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !n.acceptData(d) || k && n.isFunction(d[q]) && !n.isWindow(d) && (h = d[k], h && (d[k] = null), n.event.triggered = q, d[q](), n.event.triggered = void 0, h && (d[k] = h)), b.result);\n      }\n    }, dispatch: function dispatch(a) {\n      a = n.event.fix(a);var b,\n          c,\n          e,\n          f,\n          g,\n          h = [],\n          i = d.call(arguments),\n          j = (L.get(this, \"events\") || {})[a.type] || [],\n          k = n.event.special[a.type] || {};if ((i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1)) {\n        h = n.event.handlers.call(this, a, j), b = 0;while ((f = h[b++]) && !a.isPropagationStopped()) {\n          a.currentTarget = f.elem, c = 0;while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped()) (!a.namespace_re || a.namespace_re.test(g.namespace)) && (a.handleObj = g, a.data = g.data, e = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (a.result = e) === !1 && (a.preventDefault(), a.stopPropagation()));\n        }return (k.postDispatch && k.postDispatch.call(this, a), a.result);\n      }\n    }, handlers: function handlers(a, b) {\n      var c,\n          d,\n          e,\n          f,\n          g = [],\n          h = b.delegateCount,\n          i = a.target;if (h && i.nodeType && (!a.button || \"click\" !== a.type)) for (; i !== this; i = i.parentNode || this) if (i.disabled !== !0 || \"click\" !== a.type) {\n        for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + \" \", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) >= 0 : n.find(e, this, null, [i]).length), d[e] && d.push(f);d.length && g.push({ elem: i, handlers: d });\n      }return (h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g);\n    }, props: \"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which\".split(\" \"), fixHooks: {}, keyHooks: { props: \"char charCode key keyCode\".split(\" \"), filter: function filter(a, b) {\n        return (null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a);\n      } }, mouseHooks: { props: \"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement\".split(\" \"), filter: function filter(a, b) {\n        var c,\n            d,\n            e,\n            f = b.button;return (null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || l, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a);\n      } }, fix: function fix(a) {\n      if (a[n.expando]) {\n        return a;\n      }var b,\n          c,\n          d,\n          e = a.type,\n          f = a,\n          g = this.fixHooks[e];g || (this.fixHooks[e] = g = W.test(e) ? this.mouseHooks : V.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new n.Event(f), b = d.length;while (b--) c = d[b], a[c] = f[c];return (a.target || (a.target = l), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a);\n    }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {\n          return this !== _() && this.focus ? (this.focus(), !1) : void 0;\n        }, delegateType: \"focusin\" }, blur: { trigger: function trigger() {\n          return this === _() && this.blur ? (this.blur(), !1) : void 0;\n        }, delegateType: \"focusout\" }, click: { trigger: function trigger() {\n          return \"checkbox\" === this.type && this.click && n.nodeName(this, \"input\") ? (this.click(), !1) : void 0;\n        }, _default: function _default(a) {\n          return n.nodeName(a.target, \"a\");\n        } }, beforeunload: { postDispatch: function postDispatch(a) {\n          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);\n        } } }, simulate: function simulate(a, b, c, d) {\n      var e = n.extend(new n.Event(), c, { type: a, isSimulated: !0, originalEvent: {} });d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();\n    } }, n.removeEvent = function (a, b, c) {\n    a.removeEventListener && a.removeEventListener(b, c, !1);\n  }, n.Event = function (a, b) {\n    return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? Z : $) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(a, b);\n  }, n.Event.prototype = { isDefaultPrevented: $, isPropagationStopped: $, isImmediatePropagationStopped: $, preventDefault: function preventDefault() {\n      var a = this.originalEvent;this.isDefaultPrevented = Z, a && a.preventDefault && a.preventDefault();\n    }, stopPropagation: function stopPropagation() {\n      var a = this.originalEvent;this.isPropagationStopped = Z, a && a.stopPropagation && a.stopPropagation();\n    }, stopImmediatePropagation: function stopImmediatePropagation() {\n      var a = this.originalEvent;this.isImmediatePropagationStopped = Z, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation();\n    } }, n.each({ mouseenter: \"mouseover\", mouseleave: \"mouseout\", pointerenter: \"pointerover\", pointerleave: \"pointerout\" }, function (a, b) {\n    n.event.special[a] = { delegateType: b, bindType: b, handle: function handle(a) {\n        var c,\n            d = this,\n            e = a.relatedTarget,\n            f = a.handleObj;return ((!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c);\n      } };\n  }), k.focusinBubbles || n.each({ focus: \"focusin\", blur: \"focusout\" }, function (a, b) {\n    var c = function c(a) {\n      n.event.simulate(b, a.target, n.event.fix(a), !0);\n    };n.event.special[b] = { setup: function setup() {\n        var d = this.ownerDocument || this,\n            e = L.access(d, b);e || d.addEventListener(a, c, !0), L.access(d, b, (e || 0) + 1);\n      }, teardown: function teardown() {\n        var d = this.ownerDocument || this,\n            e = L.access(d, b) - 1;e ? L.access(d, b, e) : (d.removeEventListener(a, c, !0), L.remove(d, b));\n      } };\n  }), n.fn.extend({ on: function on(a, b, c, d, e) {\n      var f, g;if (\"object\" == typeof a) {\n        \"string\" != typeof b && (c = c || b, b = void 0);for (g in a) this.on(g, b, c, a[g], e);return this;\n      }if ((null == c && null == d ? (d = b, c = b = void 0) : null == d && (\"string\" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)) d = $;else if (!d) {\n        return this;\n      }return (1 === e && (f = d, d = function (a) {\n        return (n().off(a), f.apply(this, arguments));\n      }, d.guid = f.guid || (f.guid = n.guid++)), this.each(function () {\n        n.event.add(this, a, d, c, b);\n      }));\n    }, one: function one(a, b, c, d) {\n      return this.on(a, b, c, d, 1);\n    }, off: function off(a, b, c) {\n      var d, e;if (a && a.preventDefault && a.handleObj) {\n        return (d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + \".\" + d.namespace : d.origType, d.selector, d.handler), this);\n      }if (\"object\" == typeof a) {\n        for (e in a) this.off(e, b, a[e]);return this;\n      }return ((b === !1 || \"function\" == typeof b) && (c = b, b = void 0), c === !1 && (c = $), this.each(function () {\n        n.event.remove(this, a, c, b);\n      }));\n    }, trigger: function trigger(a, b) {\n      return this.each(function () {\n        n.event.trigger(a, b, this);\n      });\n    }, triggerHandler: function triggerHandler(a, b) {\n      var c = this[0];return c ? n.event.trigger(a, b, c, !0) : void 0;\n    } });var ab = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\w:]+)[^>]*)\\/>/gi,\n      bb = /<([\\w:]+)/,\n      cb = /<|&#?\\w+;/,\n      db = /<(?:script|style|link)/i,\n      eb = /checked\\s*(?:[^=]|=\\s*.checked.)/i,\n      fb = /^$|\\/(?:java|ecma)script/i,\n      gb = /^true\\/(.*)/,\n      hb = /^\\s*<!(?:\\[CDATA\\[|--)|(?:\\]\\]|--)>\\s*$/g,\n      ib = { option: [1, \"<select multiple='multiple'>\", \"</select>\"], thead: [1, \"<table>\", \"</table>\"], col: [2, \"<table><colgroup>\", \"</colgroup></table>\"], tr: [2, \"<table><tbody>\", \"</tbody></table>\"], td: [3, \"<table><tbody><tr>\", \"</tr></tbody></table>\"], _default: [0, \"\", \"\"] };ib.optgroup = ib.option, ib.tbody = ib.tfoot = ib.colgroup = ib.caption = ib.thead, ib.th = ib.td;function jb(a, b) {\n    return n.nodeName(a, \"table\") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, \"tr\") ? a.getElementsByTagName(\"tbody\")[0] || a.appendChild(a.ownerDocument.createElement(\"tbody\")) : a;\n  }function kb(a) {\n    return (a.type = (null !== a.getAttribute(\"type\")) + \"/\" + a.type, a);\n  }function lb(a) {\n    var b = gb.exec(a.type);return (b ? a.type = b[1] : a.removeAttribute(\"type\"), a);\n  }function mb(a, b) {\n    for (var c = 0, d = a.length; d > c; c++) L.set(a[c], \"globalEval\", !b || L.get(b[c], \"globalEval\"));\n  }function nb(a, b) {\n    var c, d, e, f, g, h, i, j;if (1 === b.nodeType) {\n      if (L.hasData(a) && (f = L.access(a), g = L.set(b, f), j = f.events)) {\n        delete g.handle, g.events = {};for (e in j) for (c = 0, d = j[e].length; d > c; c++) n.event.add(b, e, j[e][c]);\n      }M.hasData(a) && (h = M.access(a), i = n.extend({}, h), M.set(b, i));\n    }\n  }function ob(a, b) {\n    var c = a.getElementsByTagName ? a.getElementsByTagName(b || \"*\") : a.querySelectorAll ? a.querySelectorAll(b || \"*\") : [];return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c;\n  }function pb(a, b) {\n    var c = b.nodeName.toLowerCase();\"input\" === c && T.test(a.type) ? b.checked = a.checked : (\"input\" === c || \"textarea\" === c) && (b.defaultValue = a.defaultValue);\n  }n.extend({ clone: function clone(a, b, c) {\n      var d,\n          e,\n          f,\n          g,\n          h = a.cloneNode(!0),\n          i = n.contains(a.ownerDocument, a);if (!(k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a))) for (g = ob(h), f = ob(a), d = 0, e = f.length; e > d; d++) pb(f[d], g[d]);if (b) if (c) for (f = f || ob(a), g = g || ob(h), d = 0, e = f.length; e > d; d++) nb(f[d], g[d]);else nb(a, h);return (g = ob(h, \"script\"), g.length > 0 && mb(g, !i && ob(a, \"script\")), h);\n    }, buildFragment: function buildFragment(a, b, c, d) {\n      for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, o = a.length; o > m; m++) if ((e = a[m], e || 0 === e)) if (\"object\" === n.type(e)) n.merge(l, e.nodeType ? [e] : e);else if (cb.test(e)) {\n        f = f || k.appendChild(b.createElement(\"div\")), g = (bb.exec(e) || [\"\", \"\"])[1].toLowerCase(), h = ib[g] || ib._default, f.innerHTML = h[1] + e.replace(ab, \"<$1></$2>\") + h[2], j = h[0];while (j--) f = f.lastChild;n.merge(l, f.childNodes), f = k.firstChild, f.textContent = \"\";\n      } else l.push(b.createTextNode(e));k.textContent = \"\", m = 0;while (e = l[m++]) if ((!d || -1 === n.inArray(e, d)) && (i = n.contains(e.ownerDocument, e), f = ob(k.appendChild(e), \"script\"), i && mb(f), c)) {\n        j = 0;while (e = f[j++]) fb.test(e.type || \"\") && c.push(e);\n      }return k;\n    }, cleanData: function cleanData(a) {\n      for (var b, c, d, e, f = n.event.special, g = 0; void 0 !== (c = a[g]); g++) {\n        if (n.acceptData(c) && (e = c[L.expando], e && (b = L.cache[e]))) {\n          if (b.events) for (d in b.events) f[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);L.cache[e] && delete L.cache[e];\n        }delete M.cache[c[M.expando]];\n      }\n    } }), n.fn.extend({ text: function text(a) {\n      return J(this, function (a) {\n        return void 0 === a ? n.text(this) : this.empty().each(function () {\n          (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a);\n        });\n      }, null, a, arguments.length);\n    }, append: function append() {\n      return this.domManip(arguments, function (a) {\n        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {\n          var b = jb(this, a);b.appendChild(a);\n        }\n      });\n    }, prepend: function prepend() {\n      return this.domManip(arguments, function (a) {\n        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {\n          var b = jb(this, a);b.insertBefore(a, b.firstChild);\n        }\n      });\n    }, before: function before() {\n      return this.domManip(arguments, function (a) {\n        this.parentNode && this.parentNode.insertBefore(a, this);\n      });\n    }, after: function after() {\n      return this.domManip(arguments, function (a) {\n        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);\n      });\n    }, remove: function remove(a, b) {\n      for (var c, d = a ? n.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || n.cleanData(ob(c)), c.parentNode && (b && n.contains(c.ownerDocument, c) && mb(ob(c, \"script\")), c.parentNode.removeChild(c));return this;\n    }, empty: function empty() {\n      for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (n.cleanData(ob(a, !1)), a.textContent = \"\");return this;\n    }, clone: function clone(a, b) {\n      return (a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {\n        return n.clone(this, a, b);\n      }));\n    }, html: function html(a) {\n      return J(this, function (a) {\n        var b = this[0] || {},\n            c = 0,\n            d = this.length;if (void 0 === a && 1 === b.nodeType) return b.innerHTML;if (\"string\" == typeof a && !db.test(a) && !ib[(bb.exec(a) || [\"\", \"\"])[1].toLowerCase()]) {\n          a = a.replace(ab, \"<$1></$2>\");try {\n            for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(ob(b, !1)), b.innerHTML = a);b = 0;\n          } catch (e) {}\n        }b && this.empty().append(a);\n      }, null, a, arguments.length);\n    }, replaceWith: function replaceWith() {\n      var a = arguments[0];return (this.domManip(arguments, function (b) {\n        a = this.parentNode, n.cleanData(ob(this)), a && a.replaceChild(b, this);\n      }), a && (a.length || a.nodeType) ? this : this.remove());\n    }, detach: function detach(a) {\n      return this.remove(a, !0);\n    }, domManip: function domManip(a, b) {\n      a = e.apply([], a);var c,\n          d,\n          f,\n          g,\n          h,\n          i,\n          j = 0,\n          l = this.length,\n          m = this,\n          o = l - 1,\n          p = a[0],\n          q = n.isFunction(p);if (q || l > 1 && \"string\" == typeof p && !k.checkClone && eb.test(p)) {\n        return this.each(function (c) {\n          var d = m.eq(c);q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b);\n        });\n      }if (l && (c = n.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {\n        for (f = n.map(ob(c, \"script\"), kb), g = f.length; l > j; j++) h = c, j !== o && (h = n.clone(h, !0, !0), g && n.merge(f, ob(h, \"script\"))), b.call(this[j], h, j);if (g) for (i = f[f.length - 1].ownerDocument, n.map(f, lb), j = 0; g > j; j++) h = f[j], fb.test(h.type || \"\") && !L.access(h, \"globalEval\") && n.contains(i, h) && (h.src ? n._evalUrl && n._evalUrl(h.src) : n.globalEval(h.textContent.replace(hb, \"\")));\n      }return this;\n    } }), n.each({ appendTo: \"append\", prependTo: \"prepend\", insertBefore: \"before\", insertAfter: \"after\", replaceAll: \"replaceWith\" }, function (a, b) {\n    n.fn[a] = function (a) {\n      for (var c, d = [], e = n(a), g = e.length - 1, h = 0; g >= h; h++) c = h === g ? this : this.clone(!0), n(e[h])[b](c), f.apply(d, c.get());return this.pushStack(d);\n    };\n  });var qb,\n      rb = {};function sb(b, c) {\n    var d,\n        e = n(c.createElement(b)).appendTo(c.body),\n        f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : n.css(e[0], \"display\");return (e.detach(), f);\n  }function tb(a) {\n    var b = l,\n        c = rb[a];return (c || (c = sb(a, b), \"none\" !== c && c || (qb = (qb || n(\"<iframe frameborder='0' width='0' height='0'/>\")).appendTo(b.documentElement), b = qb[0].contentDocument, b.write(), b.close(), c = sb(a, b), qb.detach()), rb[a] = c), c);\n  }var ub = /^margin/,\n      vb = new RegExp(\"^(\" + Q + \")(?!px)[a-z%]+$\", \"i\"),\n      wb = function wb(b) {\n    return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null);\n  };function xb(a, b, c) {\n    var d,\n        e,\n        f,\n        g,\n        h = a.style;return (c = c || wb(a), c && (g = c.getPropertyValue(b) || c[b]), c && (\"\" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), vb.test(g) && ub.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + \"\" : g);\n  }function yb(a, b) {\n    return { get: function get() {\n        return a() ? void delete this.get : (this.get = b).apply(this, arguments);\n      } };\n  }!(function () {\n    var b,\n        c,\n        d = l.documentElement,\n        e = l.createElement(\"div\"),\n        f = l.createElement(\"div\");if (f.style) {\n      (function () {\n        var g = function () {\n          f.style.cssText = \"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute\", f.innerHTML = \"\", d.appendChild(e);var g = a.getComputedStyle(f, null);b = \"1%\" !== g.top, c = \"4px\" === g.width, d.removeChild(e);\n        };\n\n        f.style.backgroundClip = \"content-box\", f.cloneNode(!0).style.backgroundClip = \"\", k.clearCloneStyle = \"content-box\" === f.style.backgroundClip, e.style.cssText = \"border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute\", e.appendChild(f);a.getComputedStyle && n.extend(k, { pixelPosition: function pixelPosition() {\n            return (g(), b);\n          }, boxSizingReliable: function boxSizingReliable() {\n            return (null == c && g(), c);\n          }, reliableMarginRight: function reliableMarginRight() {\n            var b,\n                c = f.appendChild(l.createElement(\"div\"));return (c.style.cssText = f.style.cssText = \"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0\", c.style.marginRight = c.style.width = \"0\", f.style.width = \"1px\", d.appendChild(e), b = !parseFloat(a.getComputedStyle(c, null).marginRight), d.removeChild(e), f.removeChild(c), b);\n          } });\n      })();\n    }\n  })(), n.swap = function (a, b, c, d) {\n    var e,\n        f,\n        g = {};for (f in b) g[f] = a.style[f], a.style[f] = b[f];e = c.apply(a, d || []);for (f in b) a.style[f] = g[f];return e;\n  };var zb = /^(none|table(?!-c[ea]).+)/,\n      Ab = new RegExp(\"^(\" + Q + \")(.*)$\", \"i\"),\n      Bb = new RegExp(\"^([+-])=(\" + Q + \")\", \"i\"),\n      Cb = { position: \"absolute\", visibility: \"hidden\", display: \"block\" },\n      Db = { letterSpacing: \"0\", fontWeight: \"400\" },\n      Eb = [\"Webkit\", \"O\", \"Moz\", \"ms\"];function Fb(a, b) {\n    if (b in a) {\n      return b;\n    }var c = b[0].toUpperCase() + b.slice(1),\n        d = b,\n        e = Eb.length;while (e--) if ((b = Eb[e] + c, b in a)) {\n      return b;\n    }return d;\n  }function Gb(a, b, c) {\n    var d = Ab.exec(b);return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || \"px\") : b;\n  }function Hb(a, b, c, d, e) {\n    for (var f = c === (d ? \"border\" : \"content\") ? 4 : \"width\" === b ? 1 : 0, g = 0; 4 > f; f += 2) \"margin\" === c && (g += n.css(a, c + R[f], !0, e)), d ? (\"content\" === c && (g -= n.css(a, \"padding\" + R[f], !0, e)), \"margin\" !== c && (g -= n.css(a, \"border\" + R[f] + \"Width\", !0, e))) : (g += n.css(a, \"padding\" + R[f], !0, e), \"padding\" !== c && (g += n.css(a, \"border\" + R[f] + \"Width\", !0, e)));return g;\n  }function Ib(a, b, c) {\n    var d = !0,\n        e = \"width\" === b ? a.offsetWidth : a.offsetHeight,\n        f = wb(a),\n        g = \"border-box\" === n.css(a, \"boxSizing\", !1, f);if (0 >= e || null == e) {\n      if ((e = xb(a, b, f), (0 > e || null == e) && (e = a.style[b]), vb.test(e))) {\n        return e;\n      }d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;\n    }return e + Hb(a, b, c || (g ? \"border\" : \"content\"), d, f) + \"px\";\n  }function Jb(a, b) {\n    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = L.get(d, \"olddisplay\"), c = d.style.display, b ? (f[g] || \"none\" !== c || (d.style.display = \"\"), \"\" === d.style.display && S(d) && (f[g] = L.access(d, \"olddisplay\", tb(d.nodeName)))) : (e = S(d), \"none\" === c && e || L.set(d, \"olddisplay\", e ? c : n.css(d, \"display\"))));for (g = 0; h > g; g++) d = a[g], d.style && (b && \"none\" !== d.style.display && \"\" !== d.style.display || (d.style.display = b ? f[g] || \"\" : \"none\"));return a;\n  }n.extend({ cssHooks: { opacity: { get: function get(a, b) {\n          if (b) {\n            var c = xb(a, \"opacity\");return \"\" === c ? \"1\" : c;\n          }\n        } } }, cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { float: \"cssFloat\" }, style: function style(a, b, c, d) {\n      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {\n        var e,\n            f,\n            g,\n            h = n.camelCase(b),\n            i = a.style;return (b = n.cssProps[h] || (n.cssProps[h] = Fb(i, h)), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && \"get\" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, \"string\" === f && (e = Bb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), f = \"number\"), null != c && c === c && (\"number\" !== f || n.cssNumber[h] || (c += \"px\"), k.clearCloneStyle || \"\" !== c || 0 !== b.indexOf(\"background\") || (i[b] = \"inherit\"), g && \"set\" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0));\n      }\n    }, css: function css(a, b, c, d) {\n      var e,\n          f,\n          g,\n          h = n.camelCase(b);return (b = n.cssProps[h] || (n.cssProps[h] = Fb(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], g && \"get\" in g && (e = g.get(a, !0, c)), void 0 === e && (e = xb(a, b, d)), \"normal\" === e && b in Db && (e = Db[b]), \"\" === c || c ? (f = parseFloat(e), c === !0 || n.isNumeric(f) ? f || 0 : e) : e);\n    } }), n.each([\"height\", \"width\"], function (a, b) {\n    n.cssHooks[b] = { get: function get(a, c, d) {\n        return c ? zb.test(n.css(a, \"display\")) && 0 === a.offsetWidth ? n.swap(a, Cb, function () {\n          return Ib(a, b, d);\n        }) : Ib(a, b, d) : void 0;\n      }, set: function set(a, c, d) {\n        var e = d && wb(a);return Gb(a, c, d ? Hb(a, b, d, \"border-box\" === n.css(a, \"boxSizing\", !1, e), e) : 0);\n      } };\n  }), n.cssHooks.marginRight = yb(k.reliableMarginRight, function (a, b) {\n    return b ? n.swap(a, { display: \"inline-block\" }, xb, [a, \"marginRight\"]) : void 0;\n  }), n.each({ margin: \"\", padding: \"\", border: \"Width\" }, function (a, b) {\n    n.cssHooks[a + b] = { expand: function expand(c) {\n        for (var d = 0, e = {}, f = \"string\" == typeof c ? c.split(\" \") : [c]; 4 > d; d++) e[a + R[d] + b] = f[d] || f[d - 2] || f[0];return e;\n      } }, ub.test(a) || (n.cssHooks[a + b].set = Gb);\n  }), n.fn.extend({ css: function css(a, b) {\n      return J(this, function (a, b, c) {\n        var d,\n            e,\n            f = {},\n            g = 0;if (n.isArray(b)) {\n          for (d = wb(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);return f;\n        }return void 0 !== c ? n.style(a, b, c) : n.css(a, b);\n      }, a, b, arguments.length > 1);\n    }, show: function show() {\n      return Jb(this, !0);\n    }, hide: function hide() {\n      return Jb(this);\n    }, toggle: function toggle(a) {\n      return \"boolean\" == typeof a ? a ? this.show() : this.hide() : this.each(function () {\n        S(this) ? n(this).show() : n(this).hide();\n      });\n    } });function Kb(a, b, c, d, e) {\n    return new Kb.prototype.init(a, b, c, d, e);\n  }n.Tween = Kb, Kb.prototype = { constructor: Kb, init: function init(a, b, c, d, e, f) {\n      this.elem = a, this.prop = c, this.easing = e || \"swing\", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? \"\" : \"px\");\n    }, cur: function cur() {\n      var a = Kb.propHooks[this.prop];return a && a.get ? a.get(this) : Kb.propHooks._default.get(this);\n    }, run: function run(a) {\n      var b,\n          c = Kb.propHooks[this.prop];return (this.pos = b = this.options.duration ? n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Kb.propHooks._default.set(this), this);\n    } }, Kb.prototype.init.prototype = Kb.prototype, Kb.propHooks = { _default: { get: function get(a) {\n        var b;return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = n.css(a.elem, a.prop, \"\"), b && \"auto\" !== b ? b : 0) : a.elem[a.prop];\n      }, set: function set(a) {\n        n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;\n      } } }, Kb.propHooks.scrollTop = Kb.propHooks.scrollLeft = { set: function set(a) {\n      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);\n    } }, n.easing = { linear: function linear(a) {\n      return a;\n    }, swing: function swing(a) {\n      return 0.5 - Math.cos(a * Math.PI) / 2;\n    } }, n.fx = Kb.prototype.init, n.fx.step = {};var Lb,\n      Mb,\n      Nb = /^(?:toggle|show|hide)$/,\n      Ob = new RegExp(\"^(?:([+-])=|)(\" + Q + \")([a-z%]*)$\", \"i\"),\n      Pb = /queueHooks$/,\n      Qb = [Vb],\n      Rb = { \"*\": [function (a, b) {\n      var c = this.createTween(a, b),\n          d = c.cur(),\n          e = Ob.exec(b),\n          f = e && e[3] || (n.cssNumber[a] ? \"\" : \"px\"),\n          g = (n.cssNumber[a] || \"px\" !== f && +d) && Ob.exec(n.css(c.elem, a)),\n          h = 1,\n          i = 20;if (g && g[3] !== f) {\n        f = f || g[3], e = e || [], g = +d || 1;do h = h || \".5\", g /= h, n.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i);\n      }return (e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c);\n    }] };function Sb() {\n    return (setTimeout(function () {\n      Lb = void 0;\n    }), Lb = n.now());\n  }function Tb(a, b) {\n    var c,\n        d = 0,\n        e = { height: a };for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = R[d], e[\"margin\" + c] = e[\"padding\" + c] = a;return (b && (e.opacity = e.width = a), e);\n  }function Ub(a, b, c) {\n    for (var d, e = (Rb[b] || []).concat(Rb[\"*\"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) {\n      return d;\n    }\n  }function Vb(a, b, c) {\n    var d,\n        e,\n        f,\n        g,\n        h,\n        i,\n        j,\n        k,\n        l = this,\n        m = {},\n        o = a.style,\n        p = a.nodeType && S(a),\n        q = L.get(a, \"fxshow\");c.queue || (h = n._queueHooks(a, \"fx\"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {\n      h.unqueued || i();\n    }), h.unqueued++, l.always(function () {\n      l.always(function () {\n        h.unqueued--, n.queue(a, \"fx\").length || h.empty.fire();\n      });\n    })), 1 === a.nodeType && (\"height\" in b || \"width\" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, \"display\"), k = \"none\" === j ? L.get(a, \"olddisplay\") || tb(a.nodeName) : j, \"inline\" === k && \"none\" === n.css(a, \"float\") && (o.display = \"inline-block\")), c.overflow && (o.overflow = \"hidden\", l.always(function () {\n      o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2];\n    }));for (d in b) if ((e = b[d], Nb.exec(e))) {\n      if ((delete b[d], f = f || \"toggle\" === e, e === (p ? \"hide\" : \"show\"))) {\n        if (\"show\" !== e || !q || void 0 === q[d]) continue;p = !0;\n      }m[d] = q && q[d] || n.style(a, d);\n    } else j = void 0;if (n.isEmptyObject(m)) \"inline\" === (\"none\" === j ? tb(a.nodeName) : j) && (o.display = j);else {\n      q ? \"hidden\" in q && (p = q.hidden) : q = L.access(a, \"fxshow\", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function () {\n        n(a).hide();\n      }), l.done(function () {\n        var b;L.remove(a, \"fxshow\");for (b in m) n.style(a, b, m[b]);\n      });for (d in m) g = Ub(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = \"width\" === d || \"height\" === d ? 1 : 0));\n    }\n  }function Wb(a, b) {\n    var c, d, e, f, g;for (c in a) if ((d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && \"expand\" in g)) {\n      f = g.expand(f), delete a[d];for (c in f) c in a || (a[c] = f[c], b[c] = e);\n    } else b[d] = e;\n  }function Xb(a, b, c) {\n    var d,\n        e,\n        f = 0,\n        g = Qb.length,\n        h = n.Deferred().always(function () {\n      delete i.elem;\n    }),\n        i = (function (_i) {\n      var _iWrapper = function i() {\n        return _i.apply(this, arguments);\n      };\n\n      _iWrapper.toString = function () {\n        return _i.toString();\n      };\n\n      return _iWrapper;\n    })(function () {\n      if (e) return !1;for (var b = Lb || Sb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);return (h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1));\n    }),\n        j = h.promise({ elem: a, props: n.extend({}, b), opts: n.extend(!0, { specialEasing: {} }, c), originalProperties: b, originalOptions: c, startTime: Lb || Sb(), duration: c.duration, tweens: [], createTween: function createTween(b, c) {\n        var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);return (j.tweens.push(d), d);\n      }, stop: function stop(b) {\n        var c = 0,\n            d = b ? j.tweens.length : 0;if (e) {\n          return this;\n        }for (e = !0; d > c; c++) j.tweens[c].run(1);return (b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this);\n      } }),\n        k = j.props;for (Wb(k, j.opts.specialEasing); g > f; f++) if (d = Qb[f].call(j, a, k, j.opts)) {\n      return d;\n    }return (n.map(k, Ub, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always));\n  }n.Animation = n.extend(Xb, { tweener: function tweener(a, b) {\n      n.isFunction(a) ? (b = a, a = [\"*\"]) : a = a.split(\" \");for (var c, d = 0, e = a.length; e > d; d++) c = a[d], Rb[c] = Rb[c] || [], Rb[c].unshift(b);\n    }, prefilter: function prefilter(a, b) {\n      b ? Qb.unshift(a) : Qb.push(a);\n    } }), n.speed = function (a, b, c) {\n    var d = a && \"object\" == typeof a ? n.extend({}, a) : { complete: c || !c && b || n.isFunction(a) && a, duration: a, easing: c && b || b && !n.isFunction(b) && b };return (d.duration = n.fx.off ? 0 : \"number\" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = \"fx\"), d.old = d.complete, d.complete = function () {\n      n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue);\n    }, d);\n  }, n.fn.extend({ fadeTo: function fadeTo(a, b, c, d) {\n      return this.filter(S).css(\"opacity\", 0).show().end().animate({ opacity: b }, a, c, d);\n    }, animate: function animate(a, b, c, d) {\n      var e = n.isEmptyObject(a),\n          f = n.speed(b, c, d),\n          g = function g() {\n        var b = Xb(this, n.extend({}, a), f);(e || L.get(this, \"finish\")) && b.stop(!0);\n      };return (g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g));\n    }, stop: function stop(a, b, c) {\n      var d = function d(a) {\n        var b = a.stop;delete a.stop, b(c);\n      };return (\"string\" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || \"fx\", []), this.each(function () {\n        var b = !0,\n            e = null != a && a + \"queueHooks\",\n            f = n.timers,\n            g = L.get(this);if (e) g[e] && g[e].stop && d(g[e]);else for (e in g) g[e] && g[e].stop && Pb.test(e) && d(g[e]);for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));(b || !c) && n.dequeue(this, a);\n      }));\n    }, finish: function finish(a) {\n      return (a !== !1 && (a = a || \"fx\"), this.each(function () {\n        var b,\n            c = L.get(this),\n            d = c[a + \"queue\"],\n            e = c[a + \"queueHooks\"],\n            f = n.timers,\n            g = d ? d.length : 0;for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);delete c.finish;\n      }));\n    } }), n.each([\"toggle\", \"show\", \"hide\"], function (a, b) {\n    var c = n.fn[b];n.fn[b] = function (a, d, e) {\n      return null == a || \"boolean\" == typeof a ? c.apply(this, arguments) : this.animate(Tb(b, !0), a, d, e);\n    };\n  }), n.each({ slideDown: Tb(\"show\"), slideUp: Tb(\"hide\"), slideToggle: Tb(\"toggle\"), fadeIn: { opacity: \"show\" }, fadeOut: { opacity: \"hide\" }, fadeToggle: { opacity: \"toggle\" } }, function (a, b) {\n    n.fn[a] = function (a, c, d) {\n      return this.animate(b, a, c, d);\n    };\n  }), n.timers = [], n.fx.tick = function () {\n    var a,\n        b = 0,\n        c = n.timers;for (Lb = n.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);c.length || n.fx.stop(), Lb = void 0;\n  }, n.fx.timer = function (a) {\n    n.timers.push(a), a() ? n.fx.start() : n.timers.pop();\n  }, n.fx.interval = 13, n.fx.start = function () {\n    Mb || (Mb = setInterval(n.fx.tick, n.fx.interval));\n  }, n.fx.stop = function () {\n    clearInterval(Mb), Mb = null;\n  }, n.fx.speeds = { slow: 600, fast: 200, _default: 400 }, n.fn.delay = function (a, b) {\n    return (a = n.fx ? n.fx.speeds[a] || a : a, b = b || \"fx\", this.queue(b, function (b, c) {\n      var d = setTimeout(b, a);c.stop = function () {\n        clearTimeout(d);\n      };\n    }));\n  }, (function () {\n    var a = l.createElement(\"input\"),\n        b = l.createElement(\"select\"),\n        c = b.appendChild(l.createElement(\"option\"));a.type = \"checkbox\", k.checkOn = \"\" !== a.value, k.optSelected = c.selected, b.disabled = !0, k.optDisabled = !c.disabled, a = l.createElement(\"input\"), a.value = \"t\", a.type = \"radio\", k.radioValue = \"t\" === a.value;\n  })();var Yb,\n      Zb,\n      $b = n.expr.attrHandle;n.fn.extend({ attr: function attr(a, b) {\n      return J(this, n.attr, a, b, arguments.length > 1);\n    }, removeAttr: function removeAttr(a) {\n      return this.each(function () {\n        n.removeAttr(this, a);\n      });\n    } }), n.extend({ attr: function attr(a, b, c) {\n      var d,\n          e,\n          f = a.nodeType;if (a && 3 !== f && 8 !== f && 2 !== f) {\n        return typeof a.getAttribute === U ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? Zb : Yb)), void 0 === c ? d && \"get\" in d && null !== (e = d.get(a, b)) ? e : (e = n.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && \"set\" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + \"\"), c) : void n.removeAttr(a, b));\n      }\n    }, removeAttr: function removeAttr(a, b) {\n      var c,\n          d,\n          e = 0,\n          f = b && b.match(E);if (f && 1 === a.nodeType) while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c);\n    }, attrHooks: { type: { set: function set(a, b) {\n          if (!k.radioValue && \"radio\" === b && n.nodeName(a, \"input\")) {\n            var c = a.value;return (a.setAttribute(\"type\", b), c && (a.value = c), b);\n          }\n        } } } }), Zb = { set: function set(a, b, c) {\n      return (b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c);\n    } }, n.each(n.expr.match.bool.source.match(/\\w+/g), function (a, b) {\n    var c = $b[b] || n.find.attr;$b[b] = function (a, b, d) {\n      var e, f;return (d || (f = $b[b], $b[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, $b[b] = f), e);\n    };\n  });var _b = /^(?:input|select|textarea|button)$/i;n.fn.extend({ prop: function prop(a, b) {\n      return J(this, n.prop, a, b, arguments.length > 1);\n    }, removeProp: function removeProp(a) {\n      return this.each(function () {\n        delete this[n.propFix[a] || a];\n      });\n    } }), n.extend({ propFix: { \"for\": \"htmlFor\", \"class\": \"className\" }, prop: function prop(a, b, c) {\n      var d,\n          e,\n          f,\n          g = a.nodeType;if (a && 3 !== g && 8 !== g && 2 !== g) {\n        return (f = 1 !== g || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && \"set\" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && \"get\" in e && null !== (d = e.get(a, b)) ? d : a[b]);\n      }\n    }, propHooks: { tabIndex: { get: function get(a) {\n          return a.hasAttribute(\"tabindex\") || _b.test(a.nodeName) || a.href ? a.tabIndex : -1;\n        } } } }), k.optSelected || (n.propHooks.selected = { get: function get(a) {\n      var b = a.parentNode;return (b && b.parentNode && b.parentNode.selectedIndex, null);\n    } }), n.each([\"tabIndex\", \"readOnly\", \"maxLength\", \"cellSpacing\", \"cellPadding\", \"rowSpan\", \"colSpan\", \"useMap\", \"frameBorder\", \"contentEditable\"], function () {\n    n.propFix[this.toLowerCase()] = this;\n  });var ac = /[\\t\\r\\n\\f]/g;n.fn.extend({ addClass: function addClass(a) {\n      var b,\n          c,\n          d,\n          e,\n          f,\n          g,\n          h = \"string\" == typeof a && a,\n          i = 0,\n          j = this.length;if (n.isFunction(a)) {\n        return this.each(function (b) {\n          n(this).addClass(a.call(this, b, this.className));\n        });\n      }if (h) for (b = (a || \"\").match(E) || []; j > i; i++) if ((c = this[i], d = 1 === c.nodeType && (c.className ? (\" \" + c.className + \" \").replace(ac, \" \") : \" \"))) {\n        f = 0;while (e = b[f++]) d.indexOf(\" \" + e + \" \") < 0 && (d += e + \" \");g = n.trim(d), c.className !== g && (c.className = g);\n      }return this;\n    }, removeClass: function removeClass(a) {\n      var b,\n          c,\n          d,\n          e,\n          f,\n          g,\n          h = 0 === arguments.length || \"string\" == typeof a && a,\n          i = 0,\n          j = this.length;if (n.isFunction(a)) {\n        return this.each(function (b) {\n          n(this).removeClass(a.call(this, b, this.className));\n        });\n      }if (h) for (b = (a || \"\").match(E) || []; j > i; i++) if ((c = this[i], d = 1 === c.nodeType && (c.className ? (\" \" + c.className + \" \").replace(ac, \" \") : \"\"))) {\n        f = 0;while (e = b[f++]) while (d.indexOf(\" \" + e + \" \") >= 0) d = d.replace(\" \" + e + \" \", \" \");g = a ? n.trim(d) : \"\", c.className !== g && (c.className = g);\n      }return this;\n    }, toggleClass: function toggleClass(a, b) {\n      var c = typeof a;return \"boolean\" == typeof b && \"string\" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(n.isFunction(a) ? function (c) {\n        n(this).toggleClass(a.call(this, c, this.className, b), b);\n      } : function () {\n        if (\"string\" === c) {\n          var b,\n              d = 0,\n              e = n(this),\n              f = a.match(E) || [];while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);\n        } else (c === U || \"boolean\" === c) && (this.className && L.set(this, \"__className__\", this.className), this.className = this.className || a === !1 ? \"\" : L.get(this, \"__className__\") || \"\");\n      });\n    }, hasClass: function hasClass(a) {\n      for (var b = \" \" + a + \" \", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (\" \" + this[c].className + \" \").replace(ac, \" \").indexOf(b) >= 0) {\n        return !0;\n      }return !1;\n    } });var bc = /\\r/g;n.fn.extend({ val: function val(a) {\n      var b,\n          c,\n          d,\n          e = this[0];{\n        if (arguments.length) {\n          return (d = n.isFunction(a), this.each(function (c) {\n            var e;1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = \"\" : \"number\" == typeof e ? e += \"\" : n.isArray(e) && (e = n.map(e, function (a) {\n              return null == a ? \"\" : a + \"\";\n            })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && \"set\" in b && void 0 !== b.set(this, e, \"value\") || (this.value = e));\n          }));\n        }if (e) {\n          return (b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && \"get\" in b && void 0 !== (c = b.get(e, \"value\")) ? c : (c = e.value, \"string\" == typeof c ? c.replace(bc, \"\") : null == c ? \"\" : c));\n        }\n      }\n    } }), n.extend({ valHooks: { option: { get: function get(a) {\n          var b = n.find.attr(a, \"value\");return null != b ? b : n.trim(n.text(a));\n        } }, select: { get: function get(a) {\n          for (var b, c, d = a.options, e = a.selectedIndex, f = \"select-one\" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if ((c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute(\"disabled\")) || c.parentNode.disabled && n.nodeName(c.parentNode, \"optgroup\")))) {\n            if ((b = n(c).val(), f)) {\n              return b;\n            }g.push(b);\n          }return g;\n        }, set: function set(a, b) {\n          var c,\n              d,\n              e = a.options,\n              f = n.makeArray(b),\n              g = e.length;while (g--) d = e[g], (d.selected = n.inArray(d.value, f) >= 0) && (c = !0);return (c || (a.selectedIndex = -1), f);\n        } } } }), n.each([\"radio\", \"checkbox\"], function () {\n    n.valHooks[this] = { set: function set(a, b) {\n        return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) >= 0 : void 0;\n      } }, k.checkOn || (n.valHooks[this].get = function (a) {\n      return null === a.getAttribute(\"value\") ? \"on\" : a.value;\n    });\n  }), n.each(\"blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu\".split(\" \"), function (a, b) {\n    n.fn[b] = function (a, c) {\n      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);\n    };\n  }), n.fn.extend({ hover: function hover(a, b) {\n      return this.mouseenter(a).mouseleave(b || a);\n    }, bind: function bind(a, b, c) {\n      return this.on(a, null, b, c);\n    }, unbind: function unbind(a, b) {\n      return this.off(a, null, b);\n    }, delegate: function delegate(a, b, c, d) {\n      return this.on(b, a, c, d);\n    }, undelegate: function undelegate(a, b, c) {\n      return 1 === arguments.length ? this.off(a, \"**\") : this.off(b, a || \"**\", c);\n    } });var cc = n.now(),\n      dc = /\\?/;n.parseJSON = function (a) {\n    return JSON.parse(a + \"\");\n  }, n.parseXML = function (a) {\n    var b, c;if (!a || \"string\" != typeof a) return null;try {\n      c = new DOMParser(), b = c.parseFromString(a, \"text/xml\");\n    } catch (d) {\n      b = void 0;\n    }return ((!b || b.getElementsByTagName(\"parsererror\").length) && n.error(\"Invalid XML: \" + a), b);\n  };var ec = /#.*$/,\n      fc = /([?&])_=[^&]*/,\n      gc = /^(.*?):[ \\t]*([^\\r\\n]*)$/gm,\n      hc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,\n      ic = /^(?:GET|HEAD)$/,\n      jc = /^\\/\\//,\n      kc = /^([\\w.+-]+:)(?:\\/\\/(?:[^\\/?#]*@|)([^\\/?#:]*)(?::(\\d+)|)|)/,\n      lc = {},\n      mc = {},\n      nc = \"*/\".concat(\"*\"),\n      oc = a.location.href,\n      pc = kc.exec(oc.toLowerCase()) || [];function qc(a) {\n    return function (b, c) {\n      \"string\" != typeof b && (c = b, b = \"*\");var d,\n          e = 0,\n          f = b.toLowerCase().match(E) || [];if (n.isFunction(c)) while (d = f[e++]) \"+\" === d[0] ? (d = d.slice(1) || \"*\", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);\n    };\n  }function rc(a, b, c, d) {\n    var e = {},\n        f = a === mc;function g(h) {\n      var i;return (e[h] = !0, n.each(a[h] || [], function (a, h) {\n        var j = h(b, c, d);return \"string\" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);\n      }), i);\n    }return g(b.dataTypes[0]) || !e[\"*\"] && g(\"*\");\n  }function sc(a, b) {\n    var c,\n        d,\n        e = n.ajaxSettings.flatOptions || {};for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);return (d && n.extend(!0, a, d), a);\n  }function tc(a, b, c) {\n    var d,\n        e,\n        f,\n        g,\n        h = a.contents,\n        i = a.dataTypes;while (\"*\" === i[0]) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader(\"Content-Type\"));if (d) for (e in h) if (h[e] && h[e].test(d)) {\n      i.unshift(e);break;\n    }if (i[0] in c) f = i[0];else {\n      for (e in c) {\n        if (!i[0] || a.converters[e + \" \" + i[0]]) {\n          f = e;break;\n        }g || (g = e);\n      }f = f || g;\n    }return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;\n  }function uc(a, b, c, d) {\n    var e,\n        f,\n        g,\n        h,\n        i,\n        j = {},\n        k = a.dataTypes.slice();if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];f = k.shift();while (f) if ((a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())) if (\"*\" === f) f = i;else if (\"*\" !== i && i !== f) {\n      if ((g = j[i + \" \" + f] || j[\"* \" + f], !g)) for (e in j) if ((h = e.split(\" \"), h[1] === f && (g = j[i + \" \" + h[0]] || j[\"* \" + h[0]]))) {\n        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));break;\n      }if (g !== !0) if (g && a.throws) b = g(b);else try {\n        b = g(b);\n      } catch (l) {\n        return { state: \"parsererror\", error: g ? l : \"No conversion from \" + i + \" to \" + f };\n      }\n    }return { state: \"success\", data: b };\n  }n.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: oc, type: \"GET\", isLocal: hc.test(pc[1]), global: !0, processData: !0, async: !0, contentType: \"application/x-www-form-urlencoded; charset=UTF-8\", accepts: { \"*\": nc, text: \"text/plain\", html: \"text/html\", xml: \"application/xml, text/xml\", json: \"application/json, text/javascript\" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: \"responseXML\", text: \"responseText\", json: \"responseJSON\" }, converters: { \"* text\": String, \"text html\": !0, \"text json\": n.parseJSON, \"text xml\": n.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(a, b) {\n      return b ? sc(sc(a, n.ajaxSettings), b) : sc(n.ajaxSettings, a);\n    }, ajaxPrefilter: qc(lc), ajaxTransport: qc(mc), ajax: function ajax(a, b) {\n      \"object\" == typeof a && (b = a, a = void 0), b = b || {};var c,\n          d,\n          e,\n          f,\n          g,\n          h,\n          i,\n          j,\n          k = n.ajaxSetup({}, b),\n          l = k.context || k,\n          m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event,\n          o = n.Deferred(),\n          p = n.Callbacks(\"once memory\"),\n          q = k.statusCode || {},\n          r = {},\n          s = {},\n          t = 0,\n          u = \"canceled\",\n          v = { readyState: 0, getResponseHeader: function getResponseHeader(a) {\n          var b;if (2 === t) {\n            if (!f) {\n              f = {};while (b = gc.exec(e)) f[b[1].toLowerCase()] = b[2];\n            }b = f[a.toLowerCase()];\n          }return null == b ? null : b;\n        }, getAllResponseHeaders: function getAllResponseHeaders() {\n          return 2 === t ? e : null;\n        }, setRequestHeader: function setRequestHeader(a, b) {\n          var c = a.toLowerCase();return (t || (a = s[c] = s[c] || a, r[a] = b), this);\n        }, overrideMimeType: function overrideMimeType(a) {\n          return (t || (k.mimeType = a), this);\n        }, statusCode: function statusCode(a) {\n          var b;if (a) if (2 > t) for (b in a) q[b] = [q[b], a[b]];else v.always(a[v.status]);return this;\n        }, abort: function abort(a) {\n          var b = a || u;return (c && c.abort(b), x(0, b), this);\n        } };if ((o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || oc) + \"\").replace(ec, \"\").replace(jc, pc[1] + \"//\"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = n.trim(k.dataType || \"*\").toLowerCase().match(E) || [\"\"], null == k.crossDomain && (h = kc.exec(k.url.toLowerCase()), k.crossDomain = !(!h || h[1] === pc[1] && h[2] === pc[2] && (h[3] || (\"http:\" === h[1] ? \"80\" : \"443\")) === (pc[3] || (\"http:\" === pc[1] ? \"80\" : \"443\")))), k.data && k.processData && \"string\" != typeof k.data && (k.data = n.param(k.data, k.traditional)), rc(lc, k, b, v), 2 === t)) {\n        return v;\n      }i = n.event && k.global, i && 0 === n.active++ && n.event.trigger(\"ajaxStart\"), k.type = k.type.toUpperCase(), k.hasContent = !ic.test(k.type), d = k.url, k.hasContent || (k.data && (d = k.url += (dc.test(d) ? \"&\" : \"?\") + k.data, delete k.data), k.cache === !1 && (k.url = fc.test(d) ? d.replace(fc, \"$1_=\" + cc++) : d + (dc.test(d) ? \"&\" : \"?\") + \"_=\" + cc++)), k.ifModified && (n.lastModified[d] && v.setRequestHeader(\"If-Modified-Since\", n.lastModified[d]), n.etag[d] && v.setRequestHeader(\"If-None-Match\", n.etag[d])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader(\"Content-Type\", k.contentType), v.setRequestHeader(\"Accept\", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + (\"*\" !== k.dataTypes[0] ? \", \" + nc + \"; q=0.01\" : \"\") : k.accepts[\"*\"]);for (j in k.headers) v.setRequestHeader(j, k.headers[j]);if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) {\n        return v.abort();\n      }u = \"abort\";for (j in { success: 1, error: 1, complete: 1 }) v[j](k[j]);if (c = rc(mc, k, b, v)) {\n        v.readyState = 1, i && m.trigger(\"ajaxSend\", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function () {\n          v.abort(\"timeout\");\n        }, k.timeout));try {\n          t = 1, c.send(r, x);\n        } catch (w) {\n          if (!(2 > t)) throw w;x(-1, w);\n        }\n      } else x(-1, \"No Transport\");function x(a, b, f, h) {\n        var j,\n            r,\n            s,\n            u,\n            w,\n            x = b;2 !== t && (t = 2, g && clearTimeout(g), c = void 0, e = h || \"\", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, f && (u = tc(k, v, f)), u = uc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader(\"Last-Modified\"), w && (n.lastModified[d] = w), w = v.getResponseHeader(\"etag\"), w && (n.etag[d] = w)), 204 === a || \"HEAD\" === k.type ? x = \"nocontent\" : 304 === a ? x = \"notmodified\" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = \"error\", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + \"\", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, i && m.trigger(j ? \"ajaxSuccess\" : \"ajaxError\", [v, k, j ? r : s]), p.fireWith(l, [v, x]), i && (m.trigger(\"ajaxComplete\", [v, k]), --n.active || n.event.trigger(\"ajaxStop\")));\n      }return v;\n    }, getJSON: function getJSON(a, b, c) {\n      return n.get(a, b, c, \"json\");\n    }, getScript: function getScript(a, b) {\n      return n.get(a, void 0, b, \"script\");\n    } }), n.each([\"get\", \"post\"], function (a, b) {\n    n[b] = function (a, c, d, e) {\n      return (n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax({ url: a, type: b, dataType: e, data: c, success: d }));\n    };\n  }), n._evalUrl = function (a) {\n    return n.ajax({ url: a, type: \"GET\", dataType: \"script\", async: !1, global: !1, throws: !0 });\n  }, n.fn.extend({ wrapAll: function wrapAll(a) {\n      var b;return n.isFunction(a) ? this.each(function (b) {\n        n(this).wrapAll(a.call(this, b));\n      }) : (this[0] && (b = n(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {\n        var a = this;while (a.firstElementChild) a = a.firstElementChild;return a;\n      }).append(this)), this);\n    }, wrapInner: function wrapInner(a) {\n      return this.each(n.isFunction(a) ? function (b) {\n        n(this).wrapInner(a.call(this, b));\n      } : function () {\n        var b = n(this),\n            c = b.contents();c.length ? c.wrapAll(a) : b.append(a);\n      });\n    }, wrap: function wrap(a) {\n      var b = n.isFunction(a);return this.each(function (c) {\n        n(this).wrapAll(b ? a.call(this, c) : a);\n      });\n    }, unwrap: function unwrap() {\n      return this.parent().each(function () {\n        n.nodeName(this, \"body\") || n(this).replaceWith(this.childNodes);\n      }).end();\n    } }), n.expr.filters.hidden = function (a) {\n    return a.offsetWidth <= 0 && a.offsetHeight <= 0;\n  }, n.expr.filters.visible = function (a) {\n    return !n.expr.filters.hidden(a);\n  };var vc = /%20/g,\n      wc = /\\[\\]$/,\n      xc = /\\r?\\n/g,\n      yc = /^(?:submit|button|image|reset|file)$/i,\n      zc = /^(?:input|select|textarea|keygen)/i;function Ac(a, b, c, d) {\n    var e;if (n.isArray(b)) n.each(b, function (b, e) {\n      c || wc.test(a) ? d(a, e) : Ac(a + \"[\" + (\"object\" == typeof e ? b : \"\") + \"]\", e, c, d);\n    });else if (c || \"object\" !== n.type(b)) d(a, b);else for (e in b) Ac(a + \"[\" + e + \"]\", b[e], c, d);\n  }n.param = function (a, b) {\n    var c,\n        d = [],\n        e = function e(a, b) {\n      b = n.isFunction(b) ? b() : null == b ? \"\" : b, d[d.length] = encodeURIComponent(a) + \"=\" + encodeURIComponent(b);\n    };if ((void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a))) n.each(a, function () {\n      e(this.name, this.value);\n    });else for (c in a) Ac(c, a[c], b, e);return d.join(\"&\").replace(vc, \"+\");\n  }, n.fn.extend({ serialize: function serialize() {\n      return n.param(this.serializeArray());\n    }, serializeArray: function serializeArray() {\n      return this.map(function () {\n        var a = n.prop(this, \"elements\");return a ? n.makeArray(a) : this;\n      }).filter(function () {\n        var a = this.type;return this.name && !n(this).is(\":disabled\") && zc.test(this.nodeName) && !yc.test(a) && (this.checked || !T.test(a));\n      }).map(function (a, b) {\n        var c = n(this).val();return null == c ? null : n.isArray(c) ? n.map(c, function (a) {\n          return { name: b.name, value: a.replace(xc, \"\\r\\n\") };\n        }) : { name: b.name, value: c.replace(xc, \"\\r\\n\") };\n      }).get();\n    } }), n.ajaxSettings.xhr = function () {\n    try {\n      return new XMLHttpRequest();\n    } catch (a) {}\n  };var Bc = 0,\n      Cc = {},\n      Dc = { 0: 200, 1223: 204 },\n      Ec = n.ajaxSettings.xhr();a.attachEvent && a.attachEvent(\"onunload\", function () {\n    for (var a in Cc) Cc[a]();\n  }), k.cors = !!Ec && \"withCredentials\" in Ec, k.ajax = Ec = !!Ec, n.ajaxTransport(function (a) {\n    var b;return k.cors || Ec && !a.crossDomain ? { send: function send(c, d) {\n        var e,\n            f = a.xhr(),\n            g = ++Bc;if ((f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)) for (e in a.xhrFields) f[e] = a.xhrFields[e];a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c[\"X-Requested-With\"] || (c[\"X-Requested-With\"] = \"XMLHttpRequest\");for (e in c) f.setRequestHeader(e, c[e]);b = function (a) {\n          return function () {\n            b && (delete Cc[g], b = f.onload = f.onerror = null, \"abort\" === a ? f.abort() : \"error\" === a ? d(f.status, f.statusText) : d(Dc[f.status] || f.status, f.statusText, \"string\" == typeof f.responseText ? { text: f.responseText } : void 0, f.getAllResponseHeaders()));\n          };\n        }, f.onload = b(), f.onerror = b(\"error\"), b = Cc[g] = b(\"abort\");try {\n          f.send(a.hasContent && a.data || null);\n        } catch (h) {\n          if (b) throw h;\n        }\n      }, abort: function abort() {\n        b && b();\n      } } : void 0;\n  }), n.ajaxSetup({ accepts: { script: \"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript\" }, contents: { script: /(?:java|ecma)script/ }, converters: { \"text script\": function textScript(a) {\n        return (n.globalEval(a), a);\n      } } }), n.ajaxPrefilter(\"script\", function (a) {\n    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = \"GET\");\n  }), n.ajaxTransport(\"script\", function (a) {\n    if (a.crossDomain) {\n      var b, c;return { send: function send(d, e) {\n          b = n(\"<script>\").prop({ async: !0, charset: a.scriptCharset, src: a.url }).on(\"load error\", c = function (a) {\n            b.remove(), c = null, a && e(\"error\" === a.type ? 404 : 200, a.type);\n          }), l.head.appendChild(b[0]);\n        }, abort: function abort() {\n          c && c();\n        } };\n    }\n  });var Fc = [],\n      Gc = /(=)\\?(?=&|$)|\\?\\?/;n.ajaxSetup({ jsonp: \"callback\", jsonpCallback: function jsonpCallback() {\n      var a = Fc.pop() || n.expando + \"_\" + cc++;return (this[a] = !0, a);\n    } }), n.ajaxPrefilter(\"json jsonp\", function (b, c, d) {\n    var e,\n        f,\n        g,\n        h = b.jsonp !== !1 && (Gc.test(b.url) ? \"url\" : \"string\" == typeof b.data && !(b.contentType || \"\").indexOf(\"application/x-www-form-urlencoded\") && Gc.test(b.data) && \"data\");return h || \"jsonp\" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Gc, \"$1\" + e) : b.jsonp !== !1 && (b.url += (dc.test(b.url) ? \"&\" : \"?\") + b.jsonp + \"=\" + e), b.converters[\"script json\"] = function () {\n      return (g || n.error(e + \" was not called\"), g[0]);\n    }, b.dataTypes[0] = \"json\", f = a[e], a[e] = function () {\n      g = arguments;\n    }, d.always(function () {\n      a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Fc.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0;\n    }), \"script\") : void 0;\n  }), n.parseHTML = function (a, b, c) {\n    if (!a || \"string\" != typeof a) return null;\"boolean\" == typeof b && (c = b, b = !1), b = b || l;var d = v.exec(a),\n        e = !c && [];return d ? [b.createElement(d[1])] : (d = n.buildFragment([a], b, e), e && e.length && n(e).remove(), n.merge([], d.childNodes));\n  };var Hc = n.fn.load;n.fn.load = function (a, b, c) {\n    if (\"string\" != typeof a && Hc) return Hc.apply(this, arguments);var d,\n        e,\n        f,\n        g = this,\n        h = a.indexOf(\" \");return (h >= 0 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && \"object\" == typeof b && (e = \"POST\"), g.length > 0 && n.ajax({ url: a, type: e, dataType: \"html\", data: b }).done(function (a) {\n      f = arguments, g.html(d ? n(\"<div>\").append(n.parseHTML(a)).find(d) : a);\n    }).complete(c && function (a, b) {\n      g.each(c, f || [a.responseText, b, a]);\n    }), this);\n  }, n.each([\"ajaxStart\", \"ajaxStop\", \"ajaxComplete\", \"ajaxError\", \"ajaxSuccess\", \"ajaxSend\"], function (a, b) {\n    n.fn[b] = function (a) {\n      return this.on(b, a);\n    };\n  }), n.expr.filters.animated = function (a) {\n    return n.grep(n.timers, function (b) {\n      return a === b.elem;\n    }).length;\n  };var Ic = a.document.documentElement;function Jc(a) {\n    return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;\n  }n.offset = { setOffset: function setOffset(a, b, c) {\n      var d,\n          e,\n          f,\n          g,\n          h,\n          i,\n          j,\n          k = n.css(a, \"position\"),\n          l = n(a),\n          m = {};\"static\" === k && (a.style.position = \"relative\"), h = l.offset(), f = n.css(a, \"top\"), i = n.css(a, \"left\"), j = (\"absolute\" === k || \"fixed\" === k) && (f + i).indexOf(\"auto\") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), \"using\" in b ? b.using.call(a, m) : l.css(m);\n    } }, n.fn.extend({ offset: function offset(a) {\n      if (arguments.length) {\n        return void 0 === a ? this : this.each(function (b) {\n          n.offset.setOffset(this, a, b);\n        });\n      }var b,\n          c,\n          d = this[0],\n          e = { top: 0, left: 0 },\n          f = d && d.ownerDocument;if (f) {\n        return (b = f.documentElement, n.contains(b, d) ? (typeof d.getBoundingClientRect !== U && (e = d.getBoundingClientRect()), c = Jc(f), { top: e.top + c.pageYOffset - b.clientTop, left: e.left + c.pageXOffset - b.clientLeft }) : e);\n      }\n    }, position: function position() {\n      if (this[0]) {\n        var a,\n            b,\n            c = this[0],\n            d = { top: 0, left: 0 };return (\"fixed\" === n.css(c, \"position\") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], \"html\") || (d = a.offset()), d.top += n.css(a[0], \"borderTopWidth\", !0), d.left += n.css(a[0], \"borderLeftWidth\", !0)), { top: b.top - d.top - n.css(c, \"marginTop\", !0), left: b.left - d.left - n.css(c, \"marginLeft\", !0) });\n      }\n    }, offsetParent: function offsetParent() {\n      return this.map(function () {\n        var a = this.offsetParent || Ic;while (a && !n.nodeName(a, \"html\") && \"static\" === n.css(a, \"position\")) a = a.offsetParent;return a || Ic;\n      });\n    } }), n.each({ scrollLeft: \"pageXOffset\", scrollTop: \"pageYOffset\" }, function (b, c) {\n    var d = \"pageYOffset\" === c;n.fn[b] = function (e) {\n      return J(this, function (b, e, f) {\n        var g = Jc(b);return void 0 === f ? g ? g[c] : b[e] : void (g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f);\n      }, b, e, arguments.length, null);\n    };\n  }), n.each([\"top\", \"left\"], function (a, b) {\n    n.cssHooks[b] = yb(k.pixelPosition, function (a, c) {\n      return c ? (c = xb(a, b), vb.test(c) ? n(a).position()[b] + \"px\" : c) : void 0;\n    });\n  }), n.each({ Height: \"height\", Width: \"width\" }, function (a, b) {\n    n.each({ padding: \"inner\" + a, content: b, \"\": \"outer\" + a }, function (c, d) {\n      n.fn[d] = function (d, e) {\n        var f = arguments.length && (c || \"boolean\" != typeof d),\n            g = c || (d === !0 || e === !0 ? \"margin\" : \"border\");return J(this, function (b, c, d) {\n          var e;return n.isWindow(b) ? b.document.documentElement[\"client\" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body[\"scroll\" + a], e[\"scroll\" + a], b.body[\"offset\" + a], e[\"offset\" + a], e[\"client\" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g);\n        }, b, f ? d : void 0, f, null);\n      };\n    });\n  }), n.fn.size = function () {\n    return this.length;\n  }, n.fn.andSelf = n.fn.addBack, \"function\" == typeof define && define.amd && define(\"jquery\", [], function () {\n    return n;\n  });var Kc = a.jQuery,\n      Lc = a.$;return (n.noConflict = function (b) {\n    return (a.$ === n && (a.$ = Lc), b && a.jQuery === n && (a.jQuery = Kc), n);\n  }, typeof b === U && (a.jQuery = a.$ = n), n);\n});\n//# sourceMappingURL=jquery.min.map"

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(17)(__webpack_require__(20))

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "/*!\n * Bootstrap v3.3.5 (http://getbootstrap.com)\n * Copyright 2011-2015 Twitter, Inc.\n * Licensed under the MIT license\n */\n\"use strict\";\n\nif (\"undefined\" == typeof jQuery) throw new Error(\"Bootstrap's JavaScript requires jQuery\");+(function (a) {\n  \"use strict\";var b = a.fn.jquery.split(\" \")[0].split(\".\");if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error(\"Bootstrap's JavaScript requires jQuery version 1.9.1 or higher\");\n})(jQuery), +(function (a) {\n  \"use strict\";function b() {\n    var a = document.createElement(\"bootstrap\"),\n        b = { WebkitTransition: \"webkitTransitionEnd\", MozTransition: \"transitionend\", OTransition: \"oTransitionEnd otransitionend\", transition: \"transitionend\" };for (var c in b) if (void 0 !== a.style[c]) {\n      return { end: b[c] };\n    }return !1;\n  }a.fn.emulateTransitionEnd = function (b) {\n    var c = !1,\n        d = this;a(this).one(\"bsTransitionEnd\", function () {\n      c = !0;\n    });var e = function e() {\n      c || a(d).trigger(a.support.transition.end);\n    };return (setTimeout(e, b), this);\n  }, a(function () {\n    a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = { bindType: a.support.transition.end, delegateType: a.support.transition.end, handle: function handle(b) {\n        return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0;\n      } });\n  });\n})(jQuery), +(function (a) {\n  \"use strict\";function b(b) {\n    return this.each(function () {\n      var c = a(this),\n          e = c.data(\"bs.alert\");e || c.data(\"bs.alert\", e = new d(this)), \"string\" == typeof b && e[b].call(c);\n    });\n  }var c = \"[data-dismiss=\\\"alert\\\"]\",\n      d = function d(b) {\n    a(b).on(\"click\", c, this.close);\n  };d.VERSION = \"3.3.5\", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {\n    function c() {\n      g.detach().trigger(\"closed.bs.alert\").remove();\n    }var e = a(this),\n        f = e.attr(\"data-target\");f || (f = e.attr(\"href\"), f = f && f.replace(/.*(?=#[^\\s]*$)/, \"\"));var g = a(f);b && b.preventDefault(), g.length || (g = e.closest(\".alert\")), g.trigger(b = a.Event(\"close.bs.alert\")), b.isDefaultPrevented() || (g.removeClass(\"in\"), a.support.transition && g.hasClass(\"fade\") ? g.one(\"bsTransitionEnd\", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());\n  };var e = a.fn.alert;a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {\n    return (a.fn.alert = e, this);\n  }, a(document).on(\"click.bs.alert.data-api\", c, d.prototype.close);\n})(jQuery), +(function (a) {\n  \"use strict\";function b(b) {\n    return this.each(function () {\n      var d = a(this),\n          e = d.data(\"bs.button\"),\n          f = \"object\" == typeof b && b;e || d.data(\"bs.button\", e = new c(this, f)), \"toggle\" == b ? e.toggle() : b && e.setState(b);\n    });\n  }var c = (function (_c) {\n    var _cWrapper = function c(_x, _x2) {\n      return _c.apply(this, arguments);\n    };\n\n    _cWrapper.toString = function () {\n      return _c.toString();\n    };\n\n    return _cWrapper;\n  })(function (b, d) {\n    this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;\n  });c.VERSION = \"3.3.5\", c.DEFAULTS = { loadingText: \"loading...\" }, c.prototype.setState = function (b) {\n    var c = \"disabled\",\n        d = this.$element,\n        e = d.is(\"input\") ? \"val\" : \"html\",\n        f = d.data();b += \"Text\", null == f.resetText && d.data(\"resetText\", d[e]()), setTimeout(a.proxy(function () {\n      d[e](null == f[b] ? this.options[b] : f[b]), \"loadingText\" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c));\n    }, this), 0);\n  }, c.prototype.toggle = function () {\n    var a = !0,\n        b = this.$element.closest(\"[data-toggle=\\\"buttons\\\"]\");if (b.length) {\n      var c = this.$element.find(\"input\");\"radio\" == c.prop(\"type\") ? (c.prop(\"checked\") && (a = !1), b.find(\".active\").removeClass(\"active\"), this.$element.addClass(\"active\")) : \"checkbox\" == c.prop(\"type\") && (c.prop(\"checked\") !== this.$element.hasClass(\"active\") && (a = !1), this.$element.toggleClass(\"active\")), c.prop(\"checked\", this.$element.hasClass(\"active\")), a && c.trigger(\"change\");\n    } else this.$element.attr(\"aria-pressed\", !this.$element.hasClass(\"active\")), this.$element.toggleClass(\"active\");\n  };var d = a.fn.button;a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {\n    return (a.fn.button = d, this);\n  }, a(document).on(\"click.bs.button.data-api\", \"[data-toggle^=\\\"button\\\"]\", function (c) {\n    var d = a(c.target);d.hasClass(\"btn\") || (d = d.closest(\".btn\")), b.call(d, \"toggle\"), a(c.target).is(\"input[type=\\\"radio\\\"]\") || a(c.target).is(\"input[type=\\\"checkbox\\\"]\") || c.preventDefault();\n  }).on(\"focus.bs.button.data-api blur.bs.button.data-api\", \"[data-toggle^=\\\"button\\\"]\", function (b) {\n    a(b.target).closest(\".btn\").toggleClass(\"focus\", /^focus(in)?$/.test(b.type));\n  });\n})(jQuery), +(function (a) {\n  \"use strict\";function b(b) {\n    return this.each(function () {\n      var d = a(this),\n          e = d.data(\"bs.carousel\"),\n          f = a.extend({}, c.DEFAULTS, d.data(), \"object\" == typeof b && b),\n          g = \"string\" == typeof b ? b : f.slide;e || d.data(\"bs.carousel\", e = new c(this, f)), \"number\" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();\n    });\n  }var c = (function (_c) {\n    var _cWrapper = function c(_x, _x2) {\n      return _c.apply(this, arguments);\n    };\n\n    _cWrapper.toString = function () {\n      return _c.toString();\n    };\n\n    return _cWrapper;\n  })(function (b, c) {\n    this.$element = a(b), this.$indicators = this.$element.find(\".carousel-indicators\"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on(\"keydown.bs.carousel\", a.proxy(this.keydown, this)), \"hover\" == this.options.pause && !(\"ontouchstart\" in document.documentElement) && this.$element.on(\"mouseenter.bs.carousel\", a.proxy(this.pause, this)).on(\"mouseleave.bs.carousel\", a.proxy(this.cycle, this));\n  });c.VERSION = \"3.3.5\", c.TRANSITION_DURATION = 600, c.DEFAULTS = { interval: 5000, pause: \"hover\", wrap: !0, keyboard: !0 }, c.prototype.keydown = function (a) {\n    if (!/input|textarea/i.test(a.target.tagName)) {\n      switch (a.which) {case 37:\n          this.prev();break;case 39:\n          this.next();break;default:\n          return;}a.preventDefault();\n    }\n  }, c.prototype.cycle = function (b) {\n    return (b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this);\n  }, c.prototype.getItemIndex = function (a) {\n    return (this.$items = a.parent().children(\".item\"), this.$items.index(a || this.$active));\n  }, c.prototype.getItemForDirection = function (a, b) {\n    var c = this.getItemIndex(b),\n        d = \"prev\" == a && 0 === c || \"next\" == a && c == this.$items.length - 1;if (d && !this.options.wrap) return b;var e = \"prev\" == a ? -1 : 1,\n        f = (c + e) % this.$items.length;return this.$items.eq(f);\n  }, c.prototype.to = function (a) {\n    var b = this,\n        c = this.getItemIndex(this.$active = this.$element.find(\".item.active\"));return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one(\"slid.bs.carousel\", function () {\n      b.to(a);\n    }) : c == a ? this.pause().cycle() : this.slide(a > c ? \"next\" : \"prev\", this.$items.eq(a));\n  }, c.prototype.pause = function (b) {\n    return (b || (this.paused = !0), this.$element.find(\".next, .prev\").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this);\n  }, c.prototype.next = function () {\n    return this.sliding ? void 0 : this.slide(\"next\");\n  }, c.prototype.prev = function () {\n    return this.sliding ? void 0 : this.slide(\"prev\");\n  }, c.prototype.slide = function (b, d) {\n    var e = this.$element.find(\".item.active\"),\n        f = d || this.getItemForDirection(b, e),\n        g = this.interval,\n        h = \"next\" == b ? \"left\" : \"right\",\n        i = this;if (f.hasClass(\"active\")) return this.sliding = !1;var j = f[0],\n        k = a.Event(\"slide.bs.carousel\", { relatedTarget: j, direction: h });if ((this.$element.trigger(k), !k.isDefaultPrevented())) {\n      if ((this.sliding = !0, g && this.pause(), this.$indicators.length)) {\n        this.$indicators.find(\".active\").removeClass(\"active\");var l = a(this.$indicators.children()[this.getItemIndex(f)]);l && l.addClass(\"active\");\n      }var m = a.Event(\"slid.bs.carousel\", { relatedTarget: j, direction: h });return (a.support.transition && this.$element.hasClass(\"slide\") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one(\"bsTransitionEnd\", function () {\n        f.removeClass([b, h].join(\" \")).addClass(\"active\"), e.removeClass([\"active\", h].join(\" \")), i.sliding = !1, setTimeout(function () {\n          i.$element.trigger(m);\n        }, 0);\n      }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass(\"active\"), f.addClass(\"active\"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this);\n    }\n  };var d = a.fn.carousel;a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {\n    return (a.fn.carousel = d, this);\n  };var e = (function (_e) {\n    var _eWrapper = function e(_x) {\n      return _e.apply(this, arguments);\n    };\n\n    _eWrapper.toString = function () {\n      return _e.toString();\n    };\n\n    return _eWrapper;\n  })(function (c) {\n    var d,\n        e = a(this),\n        f = a(e.attr(\"data-target\") || (d = e.attr(\"href\")) && d.replace(/.*(?=#[^\\s]+$)/, \"\"));if (f.hasClass(\"carousel\")) {\n      var g = a.extend({}, f.data(), e.data()),\n          h = e.attr(\"data-slide-to\");h && (g.interval = !1), b.call(f, g), h && f.data(\"bs.carousel\").to(h), c.preventDefault();\n    }\n  });a(document).on(\"click.bs.carousel.data-api\", \"[data-slide]\", e).on(\"click.bs.carousel.data-api\", \"[data-slide-to]\", e), a(window).on(\"load\", function () {\n    a(\"[data-ride=\\\"carousel\\\"]\").each(function () {\n      var c = a(this);b.call(c, c.data());\n    });\n  });\n})(jQuery), +(function (a) {\n  \"use strict\";function b(b) {\n    var c,\n        d = b.attr(\"data-target\") || (c = b.attr(\"href\")) && c.replace(/.*(?=#[^\\s]+$)/, \"\");return a(d);\n  }function c(b) {\n    return this.each(function () {\n      var c = a(this),\n          e = c.data(\"bs.collapse\"),\n          f = a.extend({}, d.DEFAULTS, c.data(), \"object\" == typeof b && b);!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data(\"bs.collapse\", e = new d(this, f)), \"string\" == typeof b && e[b]();\n    });\n  }var d = (function (_d) {\n    var _dWrapper = function d(_x, _x2) {\n      return _d.apply(this, arguments);\n    };\n\n    _dWrapper.toString = function () {\n      return _d.toString();\n    };\n\n    return _dWrapper;\n  })(function (b, c) {\n    this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a(\"[data-toggle=\\\"collapse\\\"][href=\\\"#\" + b.id + \"\\\"],[data-toggle=\\\"collapse\\\"][data-target=\\\"#\" + b.id + \"\\\"]\"), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle();\n  });d.VERSION = \"3.3.5\", d.TRANSITION_DURATION = 350, d.DEFAULTS = { toggle: !0 }, d.prototype.dimension = function () {\n    var a = this.$element.hasClass(\"width\");return a ? \"width\" : \"height\";\n  }, d.prototype.show = function () {\n    if (!this.transitioning && !this.$element.hasClass(\"in\")) {\n      var b,\n          e = this.$parent && this.$parent.children(\".panel\").children(\".in, .collapsing\");if (!(e && e.length && (b = e.data(\"bs.collapse\"), b && b.transitioning))) {\n        var f = a.Event(\"show.bs.collapse\");if ((this.$element.trigger(f), !f.isDefaultPrevented())) {\n          e && e.length && (c.call(e, \"hide\"), b || e.data(\"bs.collapse\", null));var g = this.dimension();this.$element.removeClass(\"collapse\").addClass(\"collapsing\")[g](0).attr(\"aria-expanded\", !0), this.$trigger.removeClass(\"collapsed\").attr(\"aria-expanded\", !0), this.transitioning = 1;var h = function h() {\n            this.$element.removeClass(\"collapsing\").addClass(\"collapse in\")[g](\"\"), this.transitioning = 0, this.$element.trigger(\"shown.bs.collapse\");\n          };if (!a.support.transition) return h.call(this);var i = a.camelCase([\"scroll\", g].join(\"-\"));this.$element.one(\"bsTransitionEnd\", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);\n        }\n      }\n    }\n  }, d.prototype.hide = function () {\n    if (!this.transitioning && this.$element.hasClass(\"in\")) {\n      var b = a.Event(\"hide.bs.collapse\");if ((this.$element.trigger(b), !b.isDefaultPrevented())) {\n        var c = this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass(\"collapsing\").removeClass(\"collapse in\").attr(\"aria-expanded\", !1), this.$trigger.addClass(\"collapsed\").attr(\"aria-expanded\", !1), this.transitioning = 1;var e = function e() {\n          this.transitioning = 0, this.$element.removeClass(\"collapsing\").addClass(\"collapse\").trigger(\"hidden.bs.collapse\");\n        };return a.support.transition ? void this.$element[c](0).one(\"bsTransitionEnd\", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);\n      }\n    }\n  }, d.prototype.toggle = function () {\n    this[this.$element.hasClass(\"in\") ? \"hide\" : \"show\"]();\n  }, d.prototype.getParent = function () {\n    return a(this.options.parent).find(\"[data-toggle=\\\"collapse\\\"][data-parent=\\\"\" + this.options.parent + \"\\\"]\").each(a.proxy(function (c, d) {\n      var e = a(d);this.addAriaAndCollapsedClass(b(e), e);\n    }, this)).end();\n  }, d.prototype.addAriaAndCollapsedClass = function (a, b) {\n    var c = a.hasClass(\"in\");a.attr(\"aria-expanded\", c), b.toggleClass(\"collapsed\", !c).attr(\"aria-expanded\", c);\n  };var e = a.fn.collapse;a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {\n    return (a.fn.collapse = e, this);\n  }, a(document).on(\"click.bs.collapse.data-api\", \"[data-toggle=\\\"collapse\\\"]\", function (d) {\n    var e = a(this);e.attr(\"data-target\") || d.preventDefault();var f = b(e),\n        g = f.data(\"bs.collapse\"),\n        h = g ? \"toggle\" : e.data();c.call(f, h);\n  });\n})(jQuery), +(function (a) {\n  \"use strict\";function b(b) {\n    var c = b.attr(\"data-target\");c || (c = b.attr(\"href\"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\\s]*$)/, \"\"));var d = c && a(c);return d && d.length ? d : b.parent();\n  }function c(c) {\n    c && 3 === c.which || (a(e).remove(), a(f).each(function () {\n      var d = a(this),\n          e = b(d),\n          f = { relatedTarget: this };e.hasClass(\"open\") && (c && \"click\" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event(\"hide.bs.dropdown\", f)), c.isDefaultPrevented() || (d.attr(\"aria-expanded\", \"false\"), e.removeClass(\"open\").trigger(\"hidden.bs.dropdown\", f))));\n    }));\n  }function d(b) {\n    return this.each(function () {\n      var c = a(this),\n          d = c.data(\"bs.dropdown\");d || c.data(\"bs.dropdown\", d = new g(this)), \"string\" == typeof b && d[b].call(c);\n    });\n  }var e = \".dropdown-backdrop\",\n      f = \"[data-toggle=\\\"dropdown\\\"]\",\n      g = function g(b) {\n    a(b).on(\"click.bs.dropdown\", this.toggle);\n  };g.VERSION = \"3.3.5\", g.prototype.toggle = function (d) {\n    var e = a(this);if (!e.is(\".disabled, :disabled\")) {\n      var f = b(e),\n          g = f.hasClass(\"open\");if ((c(), !g)) {\n        \"ontouchstart\" in document.documentElement && !f.closest(\".navbar-nav\").length && a(document.createElement(\"div\")).addClass(\"dropdown-backdrop\").insertAfter(a(this)).on(\"click\", c);var h = { relatedTarget: this };if ((f.trigger(d = a.Event(\"show.bs.dropdown\", h)), d.isDefaultPrevented())) return;e.trigger(\"focus\").attr(\"aria-expanded\", \"true\"), f.toggleClass(\"open\").trigger(\"shown.bs.dropdown\", h);\n      }return !1;\n    }\n  }, g.prototype.keydown = function (c) {\n    if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {\n      var d = a(this);if ((c.preventDefault(), c.stopPropagation(), !d.is(\".disabled, :disabled\"))) {\n        var e = b(d),\n            g = e.hasClass(\"open\");if (!g && 27 != c.which || g && 27 == c.which) return (27 == c.which && e.find(f).trigger(\"focus\"), d.trigger(\"click\"));var h = \" li:not(.disabled):visible a\",\n            i = e.find(\".dropdown-menu\" + h);if (i.length) {\n          var j = i.index(c.target);38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger(\"focus\");\n        }\n      }\n    }\n  };var h = a.fn.dropdown;a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {\n    return (a.fn.dropdown = h, this);\n  }, a(document).on(\"click.bs.dropdown.data-api\", c).on(\"click.bs.dropdown.data-api\", \".dropdown form\", function (a) {\n    a.stopPropagation();\n  }).on(\"click.bs.dropdown.data-api\", f, g.prototype.toggle).on(\"keydown.bs.dropdown.data-api\", f, g.prototype.keydown).on(\"keydown.bs.dropdown.data-api\", \".dropdown-menu\", g.prototype.keydown);\n})(jQuery), +(function (a) {\n  \"use strict\";function b(b, d) {\n    return this.each(function () {\n      var e = a(this),\n          f = e.data(\"bs.modal\"),\n          g = a.extend({}, c.DEFAULTS, e.data(), \"object\" == typeof b && b);f || e.data(\"bs.modal\", f = new c(this, g)), \"string\" == typeof b ? f[b](d) : g.show && f.show(d);\n    });\n  }var c = (function (_c) {\n    var _cWrapper = function c(_x, _x2) {\n      return _c.apply(this, arguments);\n    };\n\n    _cWrapper.toString = function () {\n      return _c.toString();\n    };\n\n    return _cWrapper;\n  })(function (b, c) {\n    this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(\".modal-dialog\"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(\".modal-content\").load(this.options.remote, a.proxy(function () {\n      this.$element.trigger(\"loaded.bs.modal\");\n    }, this));\n  });c.VERSION = \"3.3.5\", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, c.prototype.toggle = function (a) {\n    return this.isShown ? this.hide() : this.show(a);\n  }, c.prototype.show = function (b) {\n    var d = this,\n        e = a.Event(\"show.bs.modal\", { relatedTarget: b });this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass(\"modal-open\"), this.escape(), this.resize(), this.$element.on(\"click.dismiss.bs.modal\", \"[data-dismiss=\\\"modal\\\"]\", a.proxy(this.hide, this)), this.$dialog.on(\"mousedown.dismiss.bs.modal\", function () {\n      d.$element.one(\"mouseup.dismiss.bs.modal\", function (b) {\n        a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);\n      });\n    }), this.backdrop(function () {\n      var e = a.support.transition && d.$element.hasClass(\"fade\");d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass(\"in\"), d.enforceFocus();var f = a.Event(\"shown.bs.modal\", { relatedTarget: b });e ? d.$dialog.one(\"bsTransitionEnd\", function () {\n        d.$element.trigger(\"focus\").trigger(f);\n      }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger(\"focus\").trigger(f);\n    }));\n  }, c.prototype.hide = function (b) {\n    b && b.preventDefault(), b = a.Event(\"hide.bs.modal\"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off(\"focusin.bs.modal\"), this.$element.removeClass(\"in\").off(\"click.dismiss.bs.modal\").off(\"mouseup.dismiss.bs.modal\"), this.$dialog.off(\"mousedown.dismiss.bs.modal\"), a.support.transition && this.$element.hasClass(\"fade\") ? this.$element.one(\"bsTransitionEnd\", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());\n  }, c.prototype.enforceFocus = function () {\n    a(document).off(\"focusin.bs.modal\").on(\"focusin.bs.modal\", a.proxy(function (a) {\n      this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger(\"focus\");\n    }, this));\n  }, c.prototype.escape = function () {\n    this.isShown && this.options.keyboard ? this.$element.on(\"keydown.dismiss.bs.modal\", a.proxy(function (a) {\n      27 == a.which && this.hide();\n    }, this)) : this.isShown || this.$element.off(\"keydown.dismiss.bs.modal\");\n  }, c.prototype.resize = function () {\n    this.isShown ? a(window).on(\"resize.bs.modal\", a.proxy(this.handleUpdate, this)) : a(window).off(\"resize.bs.modal\");\n  }, c.prototype.hideModal = function () {\n    var a = this;this.$element.hide(), this.backdrop(function () {\n      a.$body.removeClass(\"modal-open\"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger(\"hidden.bs.modal\");\n    });\n  }, c.prototype.removeBackdrop = function () {\n    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;\n  }, c.prototype.backdrop = function (b) {\n    var d = this,\n        e = this.$element.hasClass(\"fade\") ? \"fade\" : \"\";if (this.isShown && this.options.backdrop) {\n      var f = a.support.transition && e;if ((this.$backdrop = a(document.createElement(\"div\")).addClass(\"modal-backdrop \" + e).appendTo(this.$body), this.$element.on(\"click.dismiss.bs.modal\", a.proxy(function (a) {\n        return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && (\"static\" == this.options.backdrop ? this.$element[0].focus() : this.hide()));\n      }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass(\"in\"), !b)) return;f ? this.$backdrop.one(\"bsTransitionEnd\", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();\n    } else if (!this.isShown && this.$backdrop) {\n      this.$backdrop.removeClass(\"in\");var g = function g() {\n        d.removeBackdrop(), b && b();\n      };a.support.transition && this.$element.hasClass(\"fade\") ? this.$backdrop.one(\"bsTransitionEnd\", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();\n    } else b && b();\n  }, c.prototype.handleUpdate = function () {\n    this.adjustDialog();\n  }, c.prototype.adjustDialog = function () {\n    var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;this.$element.css({ paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : \"\", paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : \"\" });\n  }, c.prototype.resetAdjustments = function () {\n    this.$element.css({ paddingLeft: \"\", paddingRight: \"\" });\n  }, c.prototype.checkScrollbar = function () {\n    var a = window.innerWidth;if (!a) {\n      var b = document.documentElement.getBoundingClientRect();a = b.right - Math.abs(b.left);\n    }this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();\n  }, c.prototype.setScrollbar = function () {\n    var a = parseInt(this.$body.css(\"padding-right\") || 0, 10);this.originalBodyPad = document.body.style.paddingRight || \"\", this.bodyIsOverflowing && this.$body.css(\"padding-right\", a + this.scrollbarWidth);\n  }, c.prototype.resetScrollbar = function () {\n    this.$body.css(\"padding-right\", this.originalBodyPad);\n  }, c.prototype.measureScrollbar = function () {\n    var a = document.createElement(\"div\");a.className = \"modal-scrollbar-measure\", this.$body.append(a);var b = a.offsetWidth - a.clientWidth;return (this.$body[0].removeChild(a), b);\n  };var d = a.fn.modal;a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {\n    return (a.fn.modal = d, this);\n  }, a(document).on(\"click.bs.modal.data-api\", \"[data-toggle=\\\"modal\\\"]\", function (c) {\n    var d = a(this),\n        e = d.attr(\"href\"),\n        f = a(d.attr(\"data-target\") || e && e.replace(/.*(?=#[^\\s]+$)/, \"\")),\n        g = f.data(\"bs.modal\") ? \"toggle\" : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());d.is(\"a\") && c.preventDefault(), f.one(\"show.bs.modal\", function (a) {\n      a.isDefaultPrevented() || f.one(\"hidden.bs.modal\", function () {\n        d.is(\":visible\") && d.trigger(\"focus\");\n      });\n    }), b.call(f, g, this);\n  });\n})(jQuery), +(function (a) {\n  \"use strict\";function b(b) {\n    return this.each(function () {\n      var d = a(this),\n          e = d.data(\"bs.tooltip\"),\n          f = \"object\" == typeof b && b;(e || !/destroy|hide/.test(b)) && (e || d.data(\"bs.tooltip\", e = new c(this, f)), \"string\" == typeof b && e[b]());\n    });\n  }var c = function c(a, b) {\n    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init(\"tooltip\", a, b);\n  };c.VERSION = \"3.3.5\", c.TRANSITION_DURATION = 150, c.DEFAULTS = { animation: !0, placement: \"top\", selector: !1, template: \"<div class=\\\"tooltip\\\" role=\\\"tooltip\\\"><div class=\\\"tooltip-arrow\\\"></div><div class=\\\"tooltip-inner\\\"></div></div>\", trigger: \"hover focus\", title: \"\", delay: 0, html: !1, container: !1, viewport: { selector: \"body\", padding: 0 } }, c.prototype.init = function (b, c, d) {\n    if ((this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = { click: !1, hover: !1, focus: !1 }, this.$element[0] instanceof document.constructor && !this.options.selector)) throw new Error(\"`selector` option must be specified when initializing \" + this.type + \" on the window.document object!\");for (var e = this.options.trigger.split(\" \"), f = e.length; f--;) {\n      var g = e[f];if (\"click\" == g) this.$element.on(\"click.\" + this.type, this.options.selector, a.proxy(this.toggle, this));else if (\"manual\" != g) {\n        var h = \"hover\" == g ? \"mouseenter\" : \"focusin\",\n            i = \"hover\" == g ? \"mouseleave\" : \"focusout\";this.$element.on(h + \".\" + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + \".\" + this.type, this.options.selector, a.proxy(this.leave, this));\n      }\n    }this.options.selector ? this._options = a.extend({}, this.options, { trigger: \"manual\", selector: \"\" }) : this.fixTitle();\n  }, c.prototype.getDefaults = function () {\n    return c.DEFAULTS;\n  }, c.prototype.getOptions = function (b) {\n    return (b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && \"number\" == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }), b);\n  }, c.prototype.getDelegateOptions = function () {\n    var b = {},\n        c = this.getDefaults();return (this._options && a.each(this._options, function (a, d) {\n      c[a] != d && (b[a] = d);\n    }), b);\n  }, c.prototype.enter = function (b) {\n    var c = b instanceof this.constructor ? b : a(b.currentTarget).data(\"bs.\" + this.type);return (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data(\"bs.\" + this.type, c)), b instanceof a.Event && (c.inState[\"focusin\" == b.type ? \"focus\" : \"hover\"] = !0), c.tip().hasClass(\"in\") || \"in\" == c.hoverState ? void (c.hoverState = \"in\") : (clearTimeout(c.timeout), c.hoverState = \"in\", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {\n      \"in\" == c.hoverState && c.show();\n    }, c.options.delay.show)) : c.show()));\n  }, c.prototype.isInStateTrue = function () {\n    for (var a in this.inState) if (this.inState[a]) return !0;return !1;\n  }, c.prototype.leave = function (b) {\n    var c = b instanceof this.constructor ? b : a(b.currentTarget).data(\"bs.\" + this.type);return (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data(\"bs.\" + this.type, c)), b instanceof a.Event && (c.inState[\"focusout\" == b.type ? \"focus\" : \"hover\"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = \"out\", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {\n      \"out\" == c.hoverState && c.hide();\n    }, c.options.delay.hide)) : c.hide()));\n  }, c.prototype.show = function () {\n    var b = a.Event(\"show.bs.\" + this.type);if (this.hasContent() && this.enabled) {\n      this.$element.trigger(b);var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);if (b.isDefaultPrevented() || !d) return;var e = this,\n          f = this.tip(),\n          g = this.getUID(this.type);this.setContent(), f.attr(\"id\", g), this.$element.attr(\"aria-describedby\", g), this.options.animation && f.addClass(\"fade\");var h = \"function\" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,\n          i = /\\s?auto?\\s?/i,\n          j = i.test(h);j && (h = h.replace(i, \"\") || \"top\"), f.detach().css({ top: 0, left: 0, display: \"block\" }).addClass(h).data(\"bs.\" + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger(\"inserted.bs.\" + this.type);var k = this.getPosition(),\n          l = f[0].offsetWidth,\n          m = f[0].offsetHeight;if (j) {\n        var n = h,\n            o = this.getPosition(this.$viewport);h = \"bottom\" == h && k.bottom + m > o.bottom ? \"top\" : \"top\" == h && k.top - m < o.top ? \"bottom\" : \"right\" == h && k.right + l > o.width ? \"left\" : \"left\" == h && k.left - l < o.left ? \"right\" : h, f.removeClass(n).addClass(h);\n      }var p = this.getCalculatedOffset(h, k, l, m);this.applyPlacement(p, h);var q = function q() {\n        var a = e.hoverState;e.$element.trigger(\"shown.bs.\" + e.type), e.hoverState = null, \"out\" == a && e.leave(e);\n      };a.support.transition && this.$tip.hasClass(\"fade\") ? f.one(\"bsTransitionEnd\", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q();\n    }\n  }, c.prototype.applyPlacement = function (b, c) {\n    var d = this.tip(),\n        e = d[0].offsetWidth,\n        f = d[0].offsetHeight,\n        g = parseInt(d.css(\"margin-top\"), 10),\n        h = parseInt(d.css(\"margin-left\"), 10);isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({ using: function using(a) {\n        d.css({ top: Math.round(a.top), left: Math.round(a.left) });\n      } }, b), 0), d.addClass(\"in\");var i = d[0].offsetWidth,\n        j = d[0].offsetHeight;\"top\" == c && j != f && (b.top = b.top + f - j);var k = this.getViewportAdjustedDelta(c, b, i, j);k.left ? b.left += k.left : b.top += k.top;var l = /top|bottom/.test(c),\n        m = l ? 2 * k.left - e + i : 2 * k.top - f + j,\n        n = l ? \"offsetWidth\" : \"offsetHeight\";d.offset(b), this.replaceArrow(m, d[0][n], l);\n  }, c.prototype.replaceArrow = function (a, b, c) {\n    this.arrow().css(c ? \"left\" : \"top\", 50 * (1 - a / b) + \"%\").css(c ? \"top\" : \"left\", \"\");\n  }, c.prototype.setContent = function () {\n    var a = this.tip(),\n        b = this.getTitle();a.find(\".tooltip-inner\")[this.options.html ? \"html\" : \"text\"](b), a.removeClass(\"fade in top bottom left right\");\n  }, c.prototype.hide = function (b) {\n    function d() {\n      \"in\" != e.hoverState && f.detach(), e.$element.removeAttr(\"aria-describedby\").trigger(\"hidden.bs.\" + e.type), b && b();\n    }var e = this,\n        f = a(this.$tip),\n        g = a.Event(\"hide.bs.\" + this.type);return (this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass(\"in\"), a.support.transition && f.hasClass(\"fade\") ? f.one(\"bsTransitionEnd\", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this));\n  }, c.prototype.fixTitle = function () {\n    var a = this.$element;(a.attr(\"title\") || \"string\" != typeof a.attr(\"data-original-title\")) && a.attr(\"data-original-title\", a.attr(\"title\") || \"\").attr(\"title\", \"\");\n  }, c.prototype.hasContent = function () {\n    return this.getTitle();\n  }, c.prototype.getPosition = function (b) {\n    b = b || this.$element;var c = b[0],\n        d = \"BODY\" == c.tagName,\n        e = c.getBoundingClientRect();null == e.width && (e = a.extend({}, e, { width: e.right - e.left, height: e.bottom - e.top }));var f = d ? { top: 0, left: 0 } : b.offset(),\n        g = { scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop() },\n        h = d ? { width: a(window).width(), height: a(window).height() } : null;return a.extend({}, e, g, h, f);\n  }, c.prototype.getCalculatedOffset = function (a, b, c, d) {\n    return \"bottom\" == a ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 } : \"top\" == a ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 } : \"left\" == a ? { top: b.top + b.height / 2 - d / 2, left: b.left - c } : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };\n  }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {\n    var e = { top: 0, left: 0 };if (!this.$viewport) return e;var f = this.options.viewport && this.options.viewport.padding || 0,\n        g = this.getPosition(this.$viewport);if (/right|left/.test(a)) {\n      var h = b.top - f - g.scroll,\n          i = b.top + f - g.scroll + d;h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);\n    } else {\n      var j = b.left - f,\n          k = b.left + f + c;j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k);\n    }return e;\n  }, c.prototype.getTitle = function () {\n    var a,\n        b = this.$element,\n        c = this.options;return a = b.attr(\"data-original-title\") || (\"function\" == typeof c.title ? c.title.call(b[0]) : c.title);\n  }, c.prototype.getUID = function (a) {\n    do a += ~ ~(1000000 * Math.random()); while (document.getElementById(a));return a;\n  }, c.prototype.tip = function () {\n    if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + \" `template` option must consist of exactly 1 top-level element!\");return this.$tip;\n  }, c.prototype.arrow = function () {\n    return this.$arrow = this.$arrow || this.tip().find(\".tooltip-arrow\");\n  }, c.prototype.enable = function () {\n    this.enabled = !0;\n  }, c.prototype.disable = function () {\n    this.enabled = !1;\n  }, c.prototype.toggleEnabled = function () {\n    this.enabled = !this.enabled;\n  }, c.prototype.toggle = function (b) {\n    var c = this;b && (c = a(b.currentTarget).data(\"bs.\" + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data(\"bs.\" + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass(\"in\") ? c.leave(c) : c.enter(c);\n  }, c.prototype.destroy = function () {\n    var a = this;clearTimeout(this.timeout), this.hide(function () {\n      a.$element.off(\".\" + a.type).removeData(\"bs.\" + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null;\n    });\n  };var d = a.fn.tooltip;a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {\n    return (a.fn.tooltip = d, this);\n  };\n})(jQuery), +(function (a) {\n  \"use strict\";function b(b) {\n    return this.each(function () {\n      var d = a(this),\n          e = d.data(\"bs.popover\"),\n          f = \"object\" == typeof b && b;(e || !/destroy|hide/.test(b)) && (e || d.data(\"bs.popover\", e = new c(this, f)), \"string\" == typeof b && e[b]());\n    });\n  }var c = function c(a, b) {\n    this.init(\"popover\", a, b);\n  };if (!a.fn.tooltip) throw new Error(\"Popover requires tooltip.js\");c.VERSION = \"3.3.5\", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, { placement: \"right\", trigger: \"click\", content: \"\", template: \"<div class=\\\"popover\\\" role=\\\"tooltip\\\"><div class=\\\"arrow\\\"></div><h3 class=\\\"popover-title\\\"></h3><div class=\\\"popover-content\\\"></div></div>\" }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {\n    return c.DEFAULTS;\n  }, c.prototype.setContent = function () {\n    var a = this.tip(),\n        b = this.getTitle(),\n        c = this.getContent();a.find(\".popover-title\")[this.options.html ? \"html\" : \"text\"](b), a.find(\".popover-content\").children().detach().end()[this.options.html ? \"string\" == typeof c ? \"html\" : \"append\" : \"text\"](c), a.removeClass(\"fade top bottom left right in\"), a.find(\".popover-title\").html() || a.find(\".popover-title\").hide();\n  }, c.prototype.hasContent = function () {\n    return this.getTitle() || this.getContent();\n  }, c.prototype.getContent = function () {\n    var a = this.$element,\n        b = this.options;return a.attr(\"data-content\") || (\"function\" == typeof b.content ? b.content.call(a[0]) : b.content);\n  }, c.prototype.arrow = function () {\n    return this.$arrow = this.$arrow || this.tip().find(\".arrow\");\n  };var d = a.fn.popover;a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {\n    return (a.fn.popover = d, this);\n  };\n})(jQuery), +(function (a) {\n  \"use strict\";function b(c, d) {\n    this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || \"\") + \" .nav li > a\", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on(\"scroll.bs.scrollspy\", a.proxy(this.process, this)), this.refresh(), this.process();\n  }function c(c) {\n    return this.each(function () {\n      var d = a(this),\n          e = d.data(\"bs.scrollspy\"),\n          f = \"object\" == typeof c && c;e || d.data(\"bs.scrollspy\", e = new b(this, f)), \"string\" == typeof c && e[c]();\n    });\n  }b.VERSION = \"3.3.5\", b.DEFAULTS = { offset: 10 }, b.prototype.getScrollHeight = function () {\n    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);\n  }, b.prototype.refresh = function () {\n    var b = this,\n        c = \"offset\",\n        d = 0;this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = \"position\", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {\n      var b = a(this),\n          e = b.data(\"target\") || b.attr(\"href\"),\n          f = /^#./.test(e) && a(e);return f && f.length && f.is(\":visible\") && [[f[c]().top + d, e]] || null;\n    }).sort(function (a, b) {\n      return a[0] - b[0];\n    }).each(function () {\n      b.offsets.push(this[0]), b.targets.push(this[1]);\n    });\n  }, b.prototype.process = function () {\n    var a,\n        b = this.$scrollElement.scrollTop() + this.options.offset,\n        c = this.getScrollHeight(),\n        d = this.options.offset + c - this.$scrollElement.height(),\n        e = this.offsets,\n        f = this.targets,\n        g = this.activeTarget;if ((this.scrollHeight != c && this.refresh(), b >= d)) return g != (a = f[f.length - 1]) && this.activate(a);if (g && b < e[0]) return (this.activeTarget = null, this.clear());for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);\n  }, b.prototype.activate = function (b) {\n    this.activeTarget = b, this.clear();var c = this.selector + \"[data-target=\\\"\" + b + \"\\\"],\" + this.selector + \"[href=\\\"\" + b + \"\\\"]\",\n        d = a(c).parents(\"li\").addClass(\"active\");d.parent(\".dropdown-menu\").length && (d = d.closest(\"li.dropdown\").addClass(\"active\")), d.trigger(\"activate.bs.scrollspy\");\n  }, b.prototype.clear = function () {\n    a(this.selector).parentsUntil(this.options.target, \".active\").removeClass(\"active\");\n  };var d = a.fn.scrollspy;a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {\n    return (a.fn.scrollspy = d, this);\n  }, a(window).on(\"load.bs.scrollspy.data-api\", function () {\n    a(\"[data-spy=\\\"scroll\\\"]\").each(function () {\n      var b = a(this);c.call(b, b.data());\n    });\n  });\n})(jQuery), +(function (a) {\n  \"use strict\";function b(b) {\n    return this.each(function () {\n      var d = a(this),\n          e = d.data(\"bs.tab\");e || d.data(\"bs.tab\", e = new c(this)), \"string\" == typeof b && e[b]();\n    });\n  }var c = function c(b) {\n    this.element = a(b);\n  };c.VERSION = \"3.3.5\", c.TRANSITION_DURATION = 150, c.prototype.show = function () {\n    var b = this.element,\n        c = b.closest(\"ul:not(.dropdown-menu)\"),\n        d = b.data(\"target\");if ((d || (d = b.attr(\"href\"), d = d && d.replace(/.*(?=#[^\\s]*$)/, \"\")), !b.parent(\"li\").hasClass(\"active\"))) {\n      var e = c.find(\".active:last a\"),\n          f = a.Event(\"hide.bs.tab\", { relatedTarget: b[0] }),\n          g = a.Event(\"show.bs.tab\", { relatedTarget: e[0] });if ((e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented())) {\n        var h = a(d);this.activate(b.closest(\"li\"), c), this.activate(h, h.parent(), function () {\n          e.trigger({ type: \"hidden.bs.tab\", relatedTarget: b[0] }), b.trigger({ type: \"shown.bs.tab\", relatedTarget: e[0] });\n        });\n      }\n    }\n  }, c.prototype.activate = function (b, d, e) {\n    function f() {\n      g.removeClass(\"active\").find(\"> .dropdown-menu > .active\").removeClass(\"active\").end().find(\"[data-toggle=\\\"tab\\\"]\").attr(\"aria-expanded\", !1), b.addClass(\"active\").find(\"[data-toggle=\\\"tab\\\"]\").attr(\"aria-expanded\", !0), h ? (b[0].offsetWidth, b.addClass(\"in\")) : b.removeClass(\"fade\"), b.parent(\".dropdown-menu\").length && b.closest(\"li.dropdown\").addClass(\"active\").end().find(\"[data-toggle=\\\"tab\\\"]\").attr(\"aria-expanded\", !0), e && e();\n    }var g = d.find(\"> .active\"),\n        h = e && a.support.transition && (g.length && g.hasClass(\"fade\") || !!d.find(\"> .fade\").length);g.length && h ? g.one(\"bsTransitionEnd\", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass(\"in\");\n  };var d = a.fn.tab;a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {\n    return (a.fn.tab = d, this);\n  };var e = function e(c) {\n    c.preventDefault(), b.call(a(this), \"show\");\n  };a(document).on(\"click.bs.tab.data-api\", \"[data-toggle=\\\"tab\\\"]\", e).on(\"click.bs.tab.data-api\", \"[data-toggle=\\\"pill\\\"]\", e);\n})(jQuery), +(function (a) {\n  \"use strict\";function b(b) {\n    return this.each(function () {\n      var d = a(this),\n          e = d.data(\"bs.affix\"),\n          f = \"object\" == typeof b && b;e || d.data(\"bs.affix\", e = new c(this, f)), \"string\" == typeof b && e[b]();\n    });\n  }var c = (function (_c) {\n    var _cWrapper = function c(_x, _x2) {\n      return _c.apply(this, arguments);\n    };\n\n    _cWrapper.toString = function () {\n      return _c.toString();\n    };\n\n    return _cWrapper;\n  })(function (b, d) {\n    this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on(\"scroll.bs.affix.data-api\", a.proxy(this.checkPosition, this)).on(\"click.bs.affix.data-api\", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition();\n  });c.VERSION = \"3.3.5\", c.RESET = \"affix affix-top affix-bottom\", c.DEFAULTS = { offset: 0, target: window }, c.prototype.getState = function (a, b, c, d) {\n    var e = this.$target.scrollTop(),\n        f = this.$element.offset(),\n        g = this.$target.height();if (null != c && \"top\" == this.affixed) return c > e ? \"top\" : !1;if (\"bottom\" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : \"bottom\" : a - d >= e + g ? !1 : \"bottom\";var h = null == this.affixed,\n        i = h ? e : f.top,\n        j = h ? g : b;return null != c && c >= e ? \"top\" : null != d && i + j >= a - d ? \"bottom\" : !1;\n  }, c.prototype.getPinnedOffset = function () {\n    if (this.pinnedOffset) return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass(\"affix\");var a = this.$target.scrollTop(),\n        b = this.$element.offset();return this.pinnedOffset = b.top - a;\n  }, c.prototype.checkPositionWithEventLoop = function () {\n    setTimeout(a.proxy(this.checkPosition, this), 1);\n  }, c.prototype.checkPosition = function () {\n    if (this.$element.is(\":visible\")) {\n      var b = this.$element.height(),\n          d = this.options.offset,\n          e = d.top,\n          f = d.bottom,\n          g = Math.max(a(document).height(), a(document.body).height());\"object\" != typeof d && (f = e = d), \"function\" == typeof e && (e = d.top(this.$element)), \"function\" == typeof f && (f = d.bottom(this.$element));var h = this.getState(g, b, e, f);if (this.affixed != h) {\n        null != this.unpin && this.$element.css(\"top\", \"\");var i = \"affix\" + (h ? \"-\" + h : \"\"),\n            j = a.Event(i + \".bs.affix\");if ((this.$element.trigger(j), j.isDefaultPrevented())) return;this.affixed = h, this.unpin = \"bottom\" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace(\"affix\", \"affixed\") + \".bs.affix\");\n      }\"bottom\" == h && this.$element.offset({ top: g - b - f });\n    }\n  };var d = a.fn.affix;a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {\n    return (a.fn.affix = d, this);\n  }, a(window).on(\"load\", function () {\n    a(\"[data-spy=\\\"affix\\\"]\").each(function () {\n      var c = a(this),\n          d = c.data();d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);\n    });\n  });\n})(jQuery);"

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var makeGameShell = __webpack_require__(22)
	var webglew = __webpack_require__(37)

	function createGLShell(options) {
	  options = options || {}
	  
	  var extensions = options.extensions || []

	  //First create shell
	  var shell = makeGameShell(options)
	  var scale = shell.scale || 1
	  var contextOptions = options.glOptions

	  shell.on("init", function initGLNow() {
	  
	    //Create canvas
	    var canvas = document.createElement("canvas")
	    
	    //Try initializing WebGL
	    var gl = canvas.getContext("webgl", contextOptions) || 
	             canvas.getContext("experimental-webgl", contextOptions)
	    if(!gl) {
	      shell.emit("gl-error", new Error("Unable to initialize WebGL"))
	      return
	    }
	    
	    //Check extensions
	    var ext = webglew(gl)
	    for(var i=0; i<extensions.length; ++i) {
	      if(!(extensions[i] in ext)) {
	        shell.emit("gl-error", new Error("Missing extension: " + extensions[i]))
	        return
	      }
	    }

	    //Set canvas style
	    canvas.style.position = "absolute"
	    canvas.style.left = "0px"
	    canvas.style.top = "0px"
	    shell.element.appendChild(canvas)

	    //Add variables to game-shell
	    shell.canvas = canvas
	    shell.gl = gl

	    //Load width/height
	    resize()

	    //Load default parameters
	    shell.clearFlags = options.clearFlags === undefined ? (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT) : options.clearFlags
	    shell.clearColor = options.clearColor || [0,0,0,0]
	    shell.clearDepth = options.clearDepth || 1.0
	    shell.clearStencil = options.clearStencil || 0

	    shell.on("resize", resize)

	    //Hook render event
	    shell.on("render", function renderGLNow(t) {
	    
	      //Bind default framebuffer
	      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
	      
	      //Set viewport
	      gl.viewport(0, 0, (shell._width / scale)|0, (shell._height / scale)|0)

	      //Clear buffers
	      if(shell.clearFlags & gl.STENCIL_BUFFER_BIT) {
	        gl.clearStencil(shell.clearStencil)
	      }
	      if(shell.clearFlags & gl.COLOR_BUFFER_BIT) {
	        gl.clearColor(shell.clearColor[0], shell.clearColor[1], shell.clearColor[2], shell.clearColor[3])
	      }
	      if(shell.clearFlags & gl.DEPTH_BUFFER_BIT) {
	        gl.clearDepth(shell.clearDepth)
	      }
	      if(shell.clearFlags) {
	        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT)
	      }
	    
	      //Render frame
	      shell.emit("gl-render", t)
	    })
	    
	    //WebGL initialized
	    shell.emit("gl-init")
	  })

	  function resize() {
	    var nw = (shell._width/scale)|0
	    var nh = (shell._height/scale)|0
	    shell.canvas.width = nw
	    shell.canvas.height = nh
	    shell.canvas.style.width = shell._width + 'px'
	    shell.canvas.style.height = shell._height + 'px'
	    shell.emit("gl-resize", nw, nh)
	  }

	  Object.defineProperty(shell, 'scale', {
	    get: function() {
	      return scale
	    },
	    set: function(_scale) {
	      _scale = +_scale
	      if((_scale <= 0) || isNaN(_scale) || (scale === _scale)) {
	        return scale
	      }
	      scale = _scale
	      resize()
	      return scale
	    }
	  })

	  Object.defineProperty(shell, "width", {
	    get: function() {
	      return (shell._width / scale)|0
	    }
	  })

	  Object.defineProperty(shell, "height", {
	    get: function() {
	      return (shell._height / scale)|0
	    }
	  })

	  Object.defineProperty(shell, "mouse", {
	    get: function() {
	      return [shell.mouseX/scale, shell.mouseY/scale]
	    }
	  })

	  Object.defineProperty(shell, "prevMouse", {
	    get: function() {
	      return [shell.prevMouseX/scale, shell.prevMouseY/scale]
	    }
	  })

	  return shell
	}

	module.exports = createGLShell

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var EventEmitter = __webpack_require__(23).EventEmitter
	  , util         = __webpack_require__(24)
	  , domready     = __webpack_require__(28)
	  , vkey         = __webpack_require__(29)
	  , invert       = __webpack_require__(30)
	  , uniq         = __webpack_require__(31)
	  , bsearch      = __webpack_require__(32)
	  , iota         = __webpack_require__(33)
	  , min          = Math.min

	//Browser compatibility hacks
	__webpack_require__(34)
	var addMouseWheel = __webpack_require__(35)
	var hrtime = __webpack_require__(36)

	//Remove angle braces and other useless crap
	var filtered_vkey = (function() {
	  var result = new Array(256)
	    , i, j, k
	  for(i=0; i<256; ++i) {
	    result[i] = "UNK"
	  }
	  for(i in vkey) {
	    k = vkey[i]
	    if(k.charAt(0) === '<' && k.charAt(k.length-1) === '>') {
	      k = k.substring(1, k.length-1)
	    }
	    k = k.replace(/\s/g, "-")
	    result[parseInt(i)] = k
	  }
	  return result
	})()

	//Compute minimal common set of keyboard functions
	var keyNames = uniq(Object.keys(invert(filtered_vkey)))

	//Translates a virtual keycode to a normalized keycode
	function virtualKeyCode(key) {
	  return bsearch.eq(keyNames, key)
	}

	//Maps a physical keycode to a normalized keycode
	function physicalKeyCode(key) {
	  return virtualKeyCode(filtered_vkey[key])
	}

	//Game shell
	function GameShell() {
	  EventEmitter.call(this)
	  this._curKeyState  = new Array(keyNames.length)
	  this._pressCount   = new Array(keyNames.length)
	  this._releaseCount = new Array(keyNames.length)
	  
	  this._tickInterval = null
	  this._rafHandle = null
	  this._tickRate = 0
	  this._lastTick = hrtime()
	  this._frameTime = 0.0
	  this._paused = true
	  this._width = 0
	  this._height = 0
	  
	  this._wantFullscreen = false
	  this._wantPointerLock = false
	  this._fullscreenActive = false
	  this._pointerLockActive = false
	  
	  this._render = render.bind(undefined, this)

	  this.preventDefaults = true
	  this.stopPropagation = false
	  
	  for(var i=0; i<keyNames.length; ++i) {
	    this._curKeyState[i] = false
	    this._pressCount[i] = this._releaseCount[i] = 0
	  }
	  
	  //Public members
	  this.element = null
	  this.bindings = {}
	  this.frameSkip = 100.0
	  this.tickCount = 0
	  this.frameCount = 0
	  this.startTime = hrtime()
	  this.tickTime = this._tickRate
	  this.frameTime = 10.0
	  this.stickyFullscreen = false
	  this.stickyPointLock = false
	  
	  //Scroll stuff
	  this.scroll = [0,0,0]
	    
	  //Mouse state
	  this.mouseX = 0
	  this.mouseY = 0
	  this.prevMouseX = 0
	  this.prevMouseY = 0
	}

	util.inherits(GameShell, EventEmitter)

	var proto = GameShell.prototype

	//Bind keynames
	proto.keyNames = keyNames

	//Binds a virtual keyboard event to a physical key
	proto.bind = function(virtual_key) {
	  //Look up previous key bindings
	  var arr
	  if(virtual_key in this.bindings) {
	    arr = this.bindings[virtual_key]
	  } else {
	    arr = []
	  }
	  //Add keys to list
	  var physical_key
	  for(var i=1, n=arguments.length; i<n; ++i) {
	    physical_key = arguments[i]
	    if(virtualKeyCode(physical_key) >= 0) {
	      arr.push(physical_key)
	    } else if(physical_key in this.bindings) {
	      var keybinds = this.bindings[physical_key]
	      for(var j=0; j<keybinds.length; ++j) {
	        arr.push(keybinds[j])
	      }
	    }
	  }
	  //Remove any duplicate keys
	  arr = uniq(arr)
	  if(arr.length > 0) {
	    this.bindings[virtual_key] = arr
	  }
	  this.emit('bind', virtual_key, arr)
	}

	//Unbinds a virtual keyboard event
	proto.unbind = function(virtual_key) {
	  if(virtual_key in this.bindings) {
	    delete this.bindings[virtual_key]
	  }
	  this.emit('unbind', virtual_key)
	}

	//Checks if a key is set in a given state
	function lookupKey(state, bindings, key) {
	  if(key in bindings) {
	    var arr = bindings[key]
	    for(var i=0, n=arr.length; i<n; ++i) {
	      if(state[virtualKeyCode(arr[i])]) {
	        return true
	      }
	    }
	    return false
	  }
	  var kc = virtualKeyCode(key)
	  if(kc >= 0) {
	    return state[kc]
	  }
	  return false
	}

	//Checks if a key is set in a given state
	function lookupCount(state, bindings, key) {
	  if(key in bindings) {
	    var arr = bindings[key], r = 0
	    for(var i=0, n=arr.length; i<n; ++i) {
	      r += state[virtualKeyCode(arr[i])]
	    }
	    return r
	  }
	  var kc = virtualKeyCode(key)
	  if(kc >= 0) {
	    return state[kc]
	  }
	  return 0
	}

	//Checks if a key (either physical or virtual) is currently held down
	proto.down = function(key) {
	  return lookupKey(this._curKeyState, this.bindings, key)
	}

	//Checks if a key was ever down
	proto.wasDown = function(key) {
	  return this.down(key) || !!this.press(key)
	}

	//Opposite of down
	proto.up = function(key) {
	  return !this.down(key)
	}

	//Checks if a key was released during previous frame
	proto.wasUp = function(key) {
	  return this.up(key) || !!this.release(key)
	}

	//Returns the number of times a key was pressed since last tick
	proto.press = function(key) {
	  return lookupCount(this._pressCount, this.bindings, key)
	}

	//Returns the number of times a key was released since last tick
	proto.release = function(key) {
	  return lookupCount(this._releaseCount, this.bindings, key)
	}

	//Pause/unpause the game loop
	Object.defineProperty(proto, "paused", {
	  get: function() {
	    return this._paused
	  },
	  set: function(state) {
	    var ns = !!state
	    if(ns !== this._paused) {
	      if(!this._paused) {
	        this._paused = true
	        this._frameTime = min(1.0, (hrtime() - this._lastTick) / this._tickRate)
	        clearInterval(this._tickInterval)
	        //cancelAnimationFrame(this._rafHandle)
	      } else {
	        this._paused = false
	        this._lastTick = hrtime() - Math.floor(this._frameTime * this._tickRate)
	        this._tickInterval = setInterval(tick, this._tickRate, this)
	        this._rafHandle = requestAnimationFrame(this._render)
	      }
	    }
	  }
	})

	//Fullscreen state toggle

	function tryFullscreen(shell) {
	  //Request full screen
	  var elem = shell.element
	  
	  if(shell._wantFullscreen && !shell._fullscreenActive) {
	    var fs = elem.requestFullscreen ||
	             elem.requestFullScreen ||
	             elem.webkitRequestFullscreen ||
	             elem.webkitRequestFullScreen ||
	             elem.mozRequestFullscreen ||
	             elem.mozRequestFullScreen ||
	             function() {}
	    fs.call(elem)
	  }
	  if(shell._wantPointerLock && !shell._pointerLockActive) {
	    var pl =  elem.requestPointerLock ||
	              elem.webkitRequestPointerLock ||
	              elem.mozRequestPointerLock ||
	              elem.msRequestPointerLock ||
	              elem.oRequestPointerLock ||
	              function() {}
	    pl.call(elem)
	  }
	}

	var cancelFullscreen = document.exitFullscreen ||
	                       document.cancelFullscreen ||  //Why can no one agree on this?
	                       document.cancelFullScreen ||
	                       document.webkitCancelFullscreen ||
	                       document.webkitCancelFullScreen ||
	                       document.mozCancelFullscreen ||
	                       document.mozCancelFullScreen ||
	                       function(){}

	Object.defineProperty(proto, "fullscreen", {
	  get: function() {
	    return this._fullscreenActive
	  },
	  set: function(state) {
	    var ns = !!state
	    if(!ns) {
	      this._wantFullscreen = false
	      cancelFullscreen.call(document)
	    } else {
	      this._wantFullscreen = true
	      tryFullscreen(this)
	    }
	    return this._fullscreenActive
	  }
	})

	function handleFullscreen(shell) {
	  shell._fullscreenActive = document.fullscreen ||
	                            document.mozFullScreen ||
	                            document.webkitIsFullScreen ||
	                            false
	  if(!shell.stickyFullscreen && shell._fullscreenActive) {
	    shell._wantFullscreen = false
	  }
	}

	//Pointer lock state toggle
	var exitPointerLock = document.exitPointerLock ||
	                      document.webkitExitPointerLock ||
	                      document.mozExitPointerLock ||
	                      function() {}

	Object.defineProperty(proto, "pointerLock", {
	  get: function() {
	    return this._pointerLockActive
	  },
	  set: function(state) {
	    var ns = !!state
	    if(!ns) {
	      this._wantPointerLock = false
	      exitPointerLock.call(document)
	    } else {
	      this._wantPointerLock = true
	      tryFullscreen(this)
	    }
	    return this._pointerLockActive
	  }
	})

	function handlePointerLockChange(shell, event) {
	  shell._pointerLockActive = shell.element === (
	      document.pointerLockElement ||
	      document.mozPointerLockElement ||
	      document.webkitPointerLockElement ||
	      null)
	  if(!shell.stickyPointerLock && shell._pointerLockActive) {
	    shell._wantPointerLock = false
	  }
	}

	//Width and height
	Object.defineProperty(proto, "width", {
	  get: function() {
	    return this.element.clientWidth
	  }
	})
	Object.defineProperty(proto, "height", {
	  get: function() {
	    return this.element.clientHeight
	  }
	})

	//Set key state
	function setKeyState(shell, key, state) {
	  var ps = shell._curKeyState[key]
	  if(ps !== state) {
	    if(state) {
	      shell._pressCount[key]++
	    } else {
	      shell._releaseCount[key]++
	    }
	    shell._curKeyState[key] = state
	  }
	}

	//Ticks the game state one update
	function tick(shell) {
	  var skip = hrtime() + shell.frameSkip
	    , pCount = shell._pressCount
	    , rCount = shell._releaseCount
	    , i, s, t
	    , tr = shell._tickRate
	    , n = keyNames.length
	  while(!shell._paused &&
	        hrtime() >= shell._lastTick + tr) {
	    
	    //Skip frames if we are over budget
	    if(hrtime() > skip) {
	      shell._lastTick = hrtime() + tr
	      return
	    }
	    
	    //Tick the game
	    s = hrtime()
	    shell.emit("tick")
	    t = hrtime()
	    shell.tickTime = t - s
	    
	    //Update counters and time
	    ++shell.tickCount
	    shell._lastTick += tr
	    
	    //Shift input state
	    for(i=0; i<n; ++i) {
	      pCount[i] = rCount[i] = 0
	    }
	    if(shell._pointerLockActive) {
	      shell.prevMouseX = shell.mouseX = shell.width>>1
	      shell.prevMouseY = shell.mouseY = shell.height>>1
	    } else {
	      shell.prevMouseX = shell.mouseX
	      shell.prevMouseY = shell.mouseY
	    }
	    shell.scroll[0] = shell.scroll[1] = shell.scroll[2] = 0
	  }
	}

	//Render stuff
	function render(shell) {

	  //Request next frame
	  shell._rafHandle = requestAnimationFrame(shell._render)

	  //Tick the shell
	  tick(shell)
	  
	  //Compute frame time
	  var dt
	  if(shell._paused) {
	    dt = shell._frameTime
	  } else {
	    dt = min(1.0, (hrtime() - shell._lastTick) / shell._tickRate)
	  }
	  
	  //Draw a frame
	  ++shell.frameCount
	  var s = hrtime()
	  shell.emit("render", dt)
	  var t = hrtime()
	  shell.frameTime = t - s
	  
	}

	function isFocused(shell) {
	  return (document.activeElement === document.body) ||
	         (document.activeElement === shell.element)
	}

	function handleEvent(shell, ev) {
	  if(shell.preventDefaults) {
	    ev.preventDefault()
	  }
	  if(shell.stopPropagation) {
	    ev.stopPropagation()
	  }
	}

	//Set key up
	function handleKeyUp(shell, ev) {
	  handleEvent(shell, ev)
	  var kc = physicalKeyCode(ev.keyCode || ev.char || ev.which || ev.charCode)
	  if(kc >= 0) {
	    setKeyState(shell, kc, false)
	  }
	}

	//Set key down
	function handleKeyDown(shell, ev) {
	  if(!isFocused(shell)) {
	    return
	  }
	  handleEvent(shell, ev)
	  if(ev.metaKey) {
	    //Hack: Clear key state when meta gets pressed to prevent keys sticking
	    handleBlur(shell, ev)
	  } else {
	    var kc = physicalKeyCode(ev.keyCode || ev.char || ev.which || ev.charCode)
	    if(kc >= 0) {
	      setKeyState(shell, kc, true)
	    }
	  }
	}

	//Mouse events are really annoying
	var mouseCodes = iota(32).map(function(n) {
	  return virtualKeyCode("mouse-" + (n+1))
	})

	function setMouseButtons(shell, buttons) {
	  for(var i=0; i<32; ++i) {
	    setKeyState(shell, mouseCodes[i], !!(buttons & (1<<i)))
	  }
	}

	function handleMouseMove(shell, ev) {
	  handleEvent(shell, ev)
	  if(shell._pointerLockActive) {
	    var movementX = ev.movementX       ||
	                    ev.mozMovementX    ||
	                    ev.webkitMovementX ||
	                    0,
	        movementY = ev.movementY       ||
	                    ev.mozMovementY    ||
	                    ev.webkitMovementY ||
	                    0
	    shell.mouseX += movementX
	    shell.mouseY += movementY
	  } else {
	    shell.mouseX = ev.clientX - shell.element.offsetLeft
	    shell.mouseY = ev.clientY - shell.element.offsetTop
	  }
	  return false
	}

	function handleMouseDown(shell, ev) {
	  handleEvent(shell, ev)
	  setKeyState(shell, mouseCodes[ev.button], true)
	  return false
	}

	function handleMouseUp(shell, ev) {
	  handleEvent(shell, ev)
	  setKeyState(shell, mouseCodes[ev.button], false)
	  return false
	}

	function handleMouseEnter(shell, ev) {
	  handleEvent(shell, ev)
	  if(shell._pointerLockActive) {
	    shell.prevMouseX = shell.mouseX = shell.width>>1
	    shell.prevMouseY = shell.mouseY = shell.height>>1
	  } else {
	    shell.prevMouseX = shell.mouseX = ev.clientX - shell.element.offsetLeft
	    shell.prevMouseY = shell.mouseY = ev.clientY - shell.element.offsetTop
	  }
	  return false
	}

	function handleMouseLeave(shell, ev) {
	  handleEvent(shell, ev)
	  setMouseButtons(shell, 0)
	  return false
	}

	//Handle mouse wheel events
	function handleMouseWheel(shell, ev) {
	  handleEvent(shell, ev)
	  var scale = 1
	  switch(ev.deltaMode) {
	    case 0: //Pixel
	      scale = 1
	    break
	    case 1: //Line
	      scale = 12
	    break
	    case 2: //Page
	       scale = shell.height
	    break
	  }
	  //Add scroll
	  shell.scroll[0] +=  ev.deltaX * scale
	  shell.scroll[1] +=  ev.deltaY * scale
	  shell.scroll[2] += (ev.deltaZ * scale)||0.0
	  return false
	}

	function handleContexMenu(shell, ev) {
	  handleEvent(shell, ev)
	  return false
	}

	function handleBlur(shell, ev) {
	  var n = keyNames.length
	    , c = shell._curKeyState
	    , r = shell._releaseCount
	    , i
	  for(i=0; i<n; ++i) {
	    if(c[i]) {
	      ++r[i]
	    }
	    c[i] = false
	  }
	  return false
	}

	function handleResizeElement(shell, ev) {
	  var w = shell.element.clientWidth|0
	  var h = shell.element.clientHeight|0
	  if((w !== shell._width) || (h !== shell._height)) {
	    shell._width = w
	    shell._height = h
	    shell.emit("resize", w, h)
	  }
	}

	function makeDefaultContainer() {
	  var container = document.createElement("div")
	  container.tabindex = 1
	  container.style.position = "absolute"
	  container.style.left = "0px"
	  container.style.right = "0px"
	  container.style.top = "0px"
	  container.style.bottom = "0px"
	  container.style.height = "100%"
	  container.style.overflow = "hidden"
	  document.body.appendChild(container)
	  document.body.style.overflow = "hidden" //Prevent bounce
	  document.body.style.height = "100%"
	  return container
	}

	function createShell(options) {
	  options = options || {}
	  
	  //Check fullscreen and pointer lock flags
	  var useFullscreen = !!options.fullscreen
	  var usePointerLock = useFullscreen
	  if(typeof options.pointerLock !== undefined) {
	    usePointerLock = !!options.pointerLock
	  }
	  
	  //Create initial shell
	  var shell = new GameShell()
	  shell._tickRate = options.tickRate || 30
	  shell.frameSkip = options.frameSkip || (shell._tickRate+5) * 5
	  shell.stickyFullscreen = !!options.stickyFullscreen || !!options.sticky
	  shell.stickyPointerLock = !!options.stickPointerLock || !options.sticky
	  
	  //Set bindings
	  if(options.bindings) {
	    shell.bindings = options.bindings
	  }
	  
	  //Wait for dom to intiailize
	  setTimeout(function() { domready(function initGameShell() {
	    
	    //Retrieve element
	    var element = options.element
	    if(typeof element === "string") {
	      var e = document.querySelector(element)
	      if(!e) {
	        e = document.getElementById(element)
	      }
	      if(!e) {
	        e = document.getElementByClass(element)[0]
	      }
	      if(!e) {
	        e = makeDefaultContainer()
	      }
	      shell.element = e
	    } else if(typeof element === "object" && !!element) {
	      shell.element = element
	    } else if(typeof element === "function") {
	      shell.element = element()
	    } else {
	      shell.element = makeDefaultContainer()
	    }
	    
	    //Disable user-select
	    if(shell.element.style) {
	      shell.element.style["-webkit-touch-callout"] = "none"
	      shell.element.style["-webkit-user-select"] = "none"
	      shell.element.style["-khtml-user-select"] = "none"
	      shell.element.style["-moz-user-select"] = "none"
	      shell.element.style["-ms-user-select"] = "none"
	      shell.element.style["user-select"] = "none"
	    }
	    
	    //Hook resize handler
	    shell._width = shell.element.clientWidth
	    shell._height = shell.element.clientHeight
	    var handleResize = handleResizeElement.bind(undefined, shell)
	    if(typeof MutationObserver !== "undefined") {
	      var observer = new MutationObserver(handleResize)
	      observer.observe(shell.element, {
	        attributes: true,
	        subtree: true
	      })
	    } else {
	      shell.element.addEventListener("DOMSubtreeModified", handleResize, false)
	    }
	    window.addEventListener("resize", handleResize, false)
	    
	    //Hook keyboard listener
	    window.addEventListener("keydown", handleKeyDown.bind(undefined, shell), false)
	    window.addEventListener("keyup", handleKeyUp.bind(undefined, shell), false)
	    
	    //Disable right click
	    shell.element.oncontextmenu = handleContexMenu.bind(undefined, shell)
	    
	    //Hook mouse listeners
	    shell.element.addEventListener("mousedown", handleMouseDown.bind(undefined, shell), false)
	    shell.element.addEventListener("mouseup", handleMouseUp.bind(undefined, shell), false)
	    shell.element.addEventListener("mousemove", handleMouseMove.bind(undefined, shell), false)
	    shell.element.addEventListener("mouseenter", handleMouseEnter.bind(undefined, shell), false)
	    
	    //Mouse leave
	    var leave = handleMouseLeave.bind(undefined, shell)
	    shell.element.addEventListener("mouseleave", leave, false)
	    shell.element.addEventListener("mouseout", leave, false)
	    window.addEventListener("mouseleave", leave, false)
	    window.addEventListener("mouseout", leave, false)
	    
	    //Blur event 
	    var blur = handleBlur.bind(undefined, shell)
	    shell.element.addEventListener("blur", blur, false)
	    shell.element.addEventListener("focusout", blur, false)
	    shell.element.addEventListener("focus", blur, false)
	    window.addEventListener("blur", blur, false)
	    window.addEventListener("focusout", blur, false)
	    window.addEventListener("focus", blur, false)

	    //Mouse wheel handler
	    addMouseWheel(shell.element, handleMouseWheel.bind(undefined, shell), false)

	    //Fullscreen handler
	    var fullscreenChange = handleFullscreen.bind(undefined, shell)
	    document.addEventListener("fullscreenchange", fullscreenChange, false)
	    document.addEventListener("mozfullscreenchange", fullscreenChange, false)
	    document.addEventListener("webkitfullscreenchange", fullscreenChange, false)

	    //Stupid fullscreen hack
	    shell.element.addEventListener("click", tryFullscreen.bind(undefined, shell), false)

	    //Pointer lock change handler
	    var pointerLockChange = handlePointerLockChange.bind(undefined, shell)
	    document.addEventListener("pointerlockchange", pointerLockChange, false)
	    document.addEventListener("mozpointerlockchange", pointerLockChange, false)
	    document.addEventListener("webkitpointerlockchange", pointerLockChange, false)
	    document.addEventListener("pointerlocklost", pointerLockChange, false)
	    document.addEventListener("webkitpointerlocklost", pointerLockChange, false)
	    document.addEventListener("mozpointerlocklost", pointerLockChange, false)
	    
	    //Update flags
	    shell.fullscreen = useFullscreen
	    shell.pointerLock = usePointerLock
	  
	    //Default mouse button aliases
	    shell.bind("mouse-left",   "mouse-1")
	    shell.bind("mouse-right",  "mouse-3")
	    shell.bind("mouse-middle", "mouse-2")
	    
	    //Initialize tick counter
	    shell._lastTick = hrtime()
	    shell.startTime = hrtime()

	    //Unpause shell
	    shell.paused = false
	    
	    //Emit initialize event
	    shell.emit("init")
	  })}, 0)
	  
	  return shell
	}

	module.exports = createShell


/***/ },
/* 23 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(26);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(27);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(25)))

/***/ },
/* 25 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2014 - License MIT
	  */
	!function (name, definition) {

	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()

	}('domready', function () {

	  var fns = [], listener
	    , doc = document
	    , hack = doc.documentElement.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


	  if (!loaded)
	  doc.addEventListener(domContentLoaded, listener = function () {
	    doc.removeEventListener(domContentLoaded, listener)
	    loaded = 1
	    while (listener = fns.shift()) listener()
	  })

	  return function (fn) {
	    loaded ? setTimeout(fn, 0) : fns.push(fn)
	  }

	});


/***/ },
/* 29 */
/***/ function(module, exports) {

	var ua = typeof window !== 'undefined' ? window.navigator.userAgent : ''
	  , isOSX = /OS X/.test(ua)
	  , isOpera = /Opera/.test(ua)
	  , maybeFirefox = !/like Gecko/.test(ua) && !isOpera

	var i, output = module.exports = {
	  0:  isOSX ? '<menu>' : '<UNK>'
	, 1:  '<mouse 1>'
	, 2:  '<mouse 2>'
	, 3:  '<break>'
	, 4:  '<mouse 3>'
	, 5:  '<mouse 4>'
	, 6:  '<mouse 5>'
	, 8:  '<backspace>'
	, 9:  '<tab>'
	, 12: '<clear>'
	, 13: '<enter>'
	, 16: '<shift>'
	, 17: '<control>'
	, 18: '<alt>'
	, 19: '<pause>'
	, 20: '<caps-lock>'
	, 21: '<ime-hangul>'
	, 23: '<ime-junja>'
	, 24: '<ime-final>'
	, 25: '<ime-kanji>'
	, 27: '<escape>'
	, 28: '<ime-convert>'
	, 29: '<ime-nonconvert>'
	, 30: '<ime-accept>'
	, 31: '<ime-mode-change>'
	, 27: '<escape>'
	, 32: '<space>'
	, 33: '<page-up>'
	, 34: '<page-down>'
	, 35: '<end>'
	, 36: '<home>'
	, 37: '<left>'
	, 38: '<up>'
	, 39: '<right>'
	, 40: '<down>'
	, 41: '<select>'
	, 42: '<print>'
	, 43: '<execute>'
	, 44: '<snapshot>'
	, 45: '<insert>'
	, 46: '<delete>'
	, 47: '<help>'
	, 91: '<meta>'  // meta-left -- no one handles left and right properly, so we coerce into one.
	, 92: '<meta>'  // meta-right
	, 93: isOSX ? '<meta>' : '<menu>'      // chrome,opera,safari all report this for meta-right (osx mbp).
	, 95: '<sleep>'
	, 106: '<num-*>'
	, 107: '<num-+>'
	, 108: '<num-enter>'
	, 109: '<num-->'
	, 110: '<num-.>'
	, 111: '<num-/>'
	, 144: '<num-lock>'
	, 145: '<scroll-lock>'
	, 160: '<shift-left>'
	, 161: '<shift-right>'
	, 162: '<control-left>'
	, 163: '<control-right>'
	, 164: '<alt-left>'
	, 165: '<alt-right>'
	, 166: '<browser-back>'
	, 167: '<browser-forward>'
	, 168: '<browser-refresh>'
	, 169: '<browser-stop>'
	, 170: '<browser-search>'
	, 171: '<browser-favorites>'
	, 172: '<browser-home>'

	  // ff/osx reports '<volume-mute>' for '-'
	, 173: isOSX && maybeFirefox ? '-' : '<volume-mute>'
	, 174: '<volume-down>'
	, 175: '<volume-up>'
	, 176: '<next-track>'
	, 177: '<prev-track>'
	, 178: '<stop>'
	, 179: '<play-pause>'
	, 180: '<launch-mail>'
	, 181: '<launch-media-select>'
	, 182: '<launch-app 1>'
	, 183: '<launch-app 2>'
	, 186: ';'
	, 187: '='
	, 188: ','
	, 189: '-'
	, 190: '.'
	, 191: '/'
	, 192: '`'
	, 219: '['
	, 220: '\\'
	, 221: ']'
	, 222: "'"
	, 223: '<meta>'
	, 224: '<meta>'       // firefox reports meta here.
	, 226: '<alt-gr>'
	, 229: '<ime-process>'
	, 231: isOpera ? '`' : '<unicode>'
	, 246: '<attention>'
	, 247: '<crsel>'
	, 248: '<exsel>'
	, 249: '<erase-eof>'
	, 250: '<play>'
	, 251: '<zoom>'
	, 252: '<no-name>'
	, 253: '<pa-1>'
	, 254: '<clear>'
	}

	for(i = 58; i < 65; ++i) {
	  output[i] = String.fromCharCode(i)
	}

	// 0-9
	for(i = 48; i < 58; ++i) {
	  output[i] = (i - 48)+''
	}

	// A-Z
	for(i = 65; i < 91; ++i) {
	  output[i] = String.fromCharCode(i)
	}

	// num0-9
	for(i = 96; i < 106; ++i) {
	  output[i] = '<num-'+(i - 96)+'>'
	}

	// F1-F24
	for(i = 112; i < 136; ++i) {
	  output[i] = 'F'+(i-111)
	}


/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict"

	function invert(hash) {
	  var result = {}
	  for(var i in hash) {
	    if(hash.hasOwnProperty(i)) {
	      result[hash[i]] = i
	    }
	  }
	  return result
	}

	module.exports = invert

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict"

	function unique_pred(list, compare) {
	  var ptr = 1
	    , len = list.length
	    , a=list[0], b=list[0]
	  for(var i=1; i<len; ++i) {
	    b = a
	    a = list[i]
	    if(compare(a, b)) {
	      if(i === ptr) {
	        ptr++
	        continue
	      }
	      list[ptr++] = a
	    }
	  }
	  list.length = ptr
	  return list
	}

	function unique_eq(list) {
	  var ptr = 1
	    , len = list.length
	    , a=list[0], b = list[0]
	  for(var i=1; i<len; ++i, b=a) {
	    b = a
	    a = list[i]
	    if(a !== b) {
	      if(i === ptr) {
	        ptr++
	        continue
	      }
	      list[ptr++] = a
	    }
	  }
	  list.length = ptr
	  return list
	}

	function unique(list, compare, sorted) {
	  if(list.length === 0) {
	    return list
	  }
	  if(compare) {
	    if(!sorted) {
	      list.sort(compare)
	    }
	    return unique_pred(list, compare)
	  }
	  if(!sorted) {
	    list.sort()
	  }
	  return unique_eq(list)
	}

	module.exports = unique


/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict"

	function compileSearch(funcName, predicate, reversed, extraArgs, useNdarray, earlyOut) {
	  var code = [
	    "function ", funcName, "(a,l,h,", extraArgs.join(","),  "){",
	earlyOut ? "" : "var i=", (reversed ? "l-1" : "h+1"),
	";while(l<=h){\
	var m=(l+h)>>>1,x=a", useNdarray ? ".get(m)" : "[m]"]
	  if(earlyOut) {
	    if(predicate.indexOf("c") < 0) {
	      code.push(";if(x===y){return m}else if(x<=y){")
	    } else {
	      code.push(";var p=c(x,y);if(p===0){return m}else if(p<=0){")
	    }
	  } else {
	    code.push(";if(", predicate, "){i=m;")
	  }
	  if(reversed) {
	    code.push("l=m+1}else{h=m-1}")
	  } else {
	    code.push("h=m-1}else{l=m+1}")
	  }
	  code.push("}")
	  if(earlyOut) {
	    code.push("return -1};")
	  } else {
	    code.push("return i};")
	  }
	  return code.join("")
	}

	function compileBoundsSearch(predicate, reversed, suffix, earlyOut) {
	  var result = new Function([
	  compileSearch("A", "x" + predicate + "y", reversed, ["y"], false, earlyOut),
	  compileSearch("B", "x" + predicate + "y", reversed, ["y"], true, earlyOut),
	  compileSearch("P", "c(x,y)" + predicate + "0", reversed, ["y", "c"], false, earlyOut),
	  compileSearch("Q", "c(x,y)" + predicate + "0", reversed, ["y", "c"], true, earlyOut),
	"function dispatchBsearch", suffix, "(a,y,c,l,h){\
	if(a.shape){\
	if(typeof(c)==='function'){\
	return Q(a,(l===undefined)?0:l|0,(h===undefined)?a.shape[0]-1:h|0,y,c)\
	}else{\
	return B(a,(c===undefined)?0:c|0,(l===undefined)?a.shape[0]-1:l|0,y)\
	}}else{\
	if(typeof(c)==='function'){\
	return P(a,(l===undefined)?0:l|0,(h===undefined)?a.length-1:h|0,y,c)\
	}else{\
	return A(a,(c===undefined)?0:c|0,(l===undefined)?a.length-1:l|0,y)\
	}}}\
	return dispatchBsearch", suffix].join(""))
	  return result()
	}

	module.exports = {
	  ge: compileBoundsSearch(">=", false, "GE"),
	  gt: compileBoundsSearch(">", false, "GT"),
	  lt: compileBoundsSearch("<", true, "LT"),
	  le: compileBoundsSearch("<=", true, "LE"),
	  eq: compileBoundsSearch("-", true, "EQ", true)
	}


/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict"

	function iota(n) {
	  var result = new Array(n)
	  for(var i=0; i<n; ++i) {
	    result[i] = i
	  }
	  return result
	}

	module.exports = iota

/***/ },
/* 34 */
/***/ function(module, exports) {

	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	 
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	 
	// MIT license
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                               || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
	    window.requestAnimationFrame = function(callback, element) {
	        var currTime = new Date().getTime();
	        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	          timeToCall);
	        lastTime = currTime + timeToCall;
	        return id;
	    };

	if (!window.cancelAnimationFrame)
	    window.cancelAnimationFrame = function(id) {
	        clearTimeout(id);
	    };


/***/ },
/* 35 */
/***/ function(module, exports) {

	//Adapted from here: https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel?redirectlocale=en-US&redirectslug=DOM%2FMozilla_event_reference%2Fwheel

	var prefix = "", _addEventListener, onwheel, support;

	// detect event model
	if ( window.addEventListener ) {
	  _addEventListener = "addEventListener";
	} else {
	  _addEventListener = "attachEvent";
	  prefix = "on";
	}

	// detect available wheel event
	support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
	          document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
	          "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

	function _addWheelListener( elem, eventName, callback, useCapture ) {
	  elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
	    !originalEvent && ( originalEvent = window.event );

	    // create a normalized event object
	    var event = {
	      // keep a ref to the original event object
	      originalEvent: originalEvent,
	      target: originalEvent.target || originalEvent.srcElement,
	      type: "wheel",
	      deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
	      deltaX: 0,
	      delatZ: 0,
	      preventDefault: function() {
	        originalEvent.preventDefault ?
	          originalEvent.preventDefault() :
	          originalEvent.returnValue = false;
	      }
	    };
	    
	    // calculate deltaY (and deltaX) according to the event
	    if ( support == "mousewheel" ) {
	      event.deltaY = - 1/40 * originalEvent.wheelDelta;
	      // Webkit also support wheelDeltaX
	      originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
	    } else {
	      event.deltaY = originalEvent.detail;
	    }

	    // it's time to fire the callback
	    return callback( event );
	  }, useCapture || false );
	}

	module.exports = function( elem, callback, useCapture ) {
	  _addWheelListener( elem, support, callback, useCapture );

	  // handle MozMousePixelScroll in older Firefox
	  if( support == "DOMMouseScroll" ) {
	    _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
	  }
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	if(typeof window.performance === "object") {
	  if(window.performance.now) {
	    module.exports = function() { return window.performance.now() }
	  } else if(window.performance.webkitNow) {
	    module.exports = function() { return window.performance.webkitNow() }
	  }
	} else if(Date.now) {
	  module.exports = Date.now
	} else {
	  module.exports = function() { return (new Date()).getTime() }
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var weakMap = typeof WeakMap === 'undefined' ? __webpack_require__(38) : WeakMap

	var WebGLEWStruct = new weakMap()

	function baseName(ext_name) {
	  return ext_name.replace(/^[A-Z]+_/, '')
	}

	function initWebGLEW(gl) {
	  var struct = WebGLEWStruct.get(gl)
	  if(struct) {
	    return struct
	  }
	  var extensions = {}
	  var supported = gl.getSupportedExtensions()
	  for(var i=0; i<supported.length; ++i) {
	    var extName = supported[i]

	    //Skip MOZ_ extensions
	    if(extName.indexOf('MOZ_') === 0) {
	      continue
	    }
	    var ext = gl.getExtension(supported[i])
	    if(!ext) {
	      continue
	    }
	    while(true) {
	      extensions[extName] = ext
	      var base = baseName(extName)
	      if(base === extName) {
	        break
	      }
	      extName = base
	    }
	  }
	  WebGLEWStruct.set(gl, extensions)
	  return extensions
	}
	module.exports = initWebGLEW

/***/ },
/* 38 */
/***/ function(module, exports) {

	// Copyright (C) 2011 Google Inc.
	//
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	//
	// http://www.apache.org/licenses/LICENSE-2.0
	//
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.

	/**
	 * @fileoverview Install a leaky WeakMap emulation on platforms that
	 * don't provide a built-in one.
	 *
	 * <p>Assumes that an ES5 platform where, if {@code WeakMap} is
	 * already present, then it conforms to the anticipated ES6
	 * specification. To run this file on an ES5 or almost ES5
	 * implementation where the {@code WeakMap} specification does not
	 * quite conform, run <code>repairES5.js</code> first.
	 *
	 * <p>Even though WeakMapModule is not global, the linter thinks it
	 * is, which is why it is in the overrides list below.
	 *
	 * <p>NOTE: Before using this WeakMap emulation in a non-SES
	 * environment, see the note below about hiddenRecord.
	 *
	 * @author Mark S. Miller
	 * @requires crypto, ArrayBuffer, Uint8Array, navigator, console
	 * @overrides WeakMap, ses, Proxy
	 * @overrides WeakMapModule
	 */

	/**
	 * This {@code WeakMap} emulation is observably equivalent to the
	 * ES-Harmony WeakMap, but with leakier garbage collection properties.
	 *
	 * <p>As with true WeakMaps, in this emulation, a key does not
	 * retain maps indexed by that key and (crucially) a map does not
	 * retain the keys it indexes. A map by itself also does not retain
	 * the values associated with that map.
	 *
	 * <p>However, the values associated with a key in some map are
	 * retained so long as that key is retained and those associations are
	 * not overridden. For example, when used to support membranes, all
	 * values exported from a given membrane will live for the lifetime
	 * they would have had in the absence of an interposed membrane. Even
	 * when the membrane is revoked, all objects that would have been
	 * reachable in the absence of revocation will still be reachable, as
	 * far as the GC can tell, even though they will no longer be relevant
	 * to ongoing computation.
	 *
	 * <p>The API implemented here is approximately the API as implemented
	 * in FF6.0a1 and agreed to by MarkM, Andreas Gal, and Dave Herman,
	 * rather than the offially approved proposal page. TODO(erights):
	 * upgrade the ecmascript WeakMap proposal page to explain this API
	 * change and present to EcmaScript committee for their approval.
	 *
	 * <p>The first difference between the emulation here and that in
	 * FF6.0a1 is the presence of non enumerable {@code get___, has___,
	 * set___, and delete___} methods on WeakMap instances to represent
	 * what would be the hidden internal properties of a primitive
	 * implementation. Whereas the FF6.0a1 WeakMap.prototype methods
	 * require their {@code this} to be a genuine WeakMap instance (i.e.,
	 * an object of {@code [[Class]]} "WeakMap}), since there is nothing
	 * unforgeable about the pseudo-internal method names used here,
	 * nothing prevents these emulated prototype methods from being
	 * applied to non-WeakMaps with pseudo-internal methods of the same
	 * names.
	 *
	 * <p>Another difference is that our emulated {@code
	 * WeakMap.prototype} is not itself a WeakMap. A problem with the
	 * current FF6.0a1 API is that WeakMap.prototype is itself a WeakMap
	 * providing ambient mutability and an ambient communications
	 * channel. Thus, if a WeakMap is already present and has this
	 * problem, repairES5.js wraps it in a safe wrappper in order to
	 * prevent access to this channel. (See
	 * PATCH_MUTABLE_FROZEN_WEAKMAP_PROTO in repairES5.js).
	 */

	/**
	 * If this is a full <a href=
	 * "http://code.google.com/p/es-lab/wiki/SecureableES5"
	 * >secureable ES5</a> platform and the ES-Harmony {@code WeakMap} is
	 * absent, install an approximate emulation.
	 *
	 * <p>If WeakMap is present but cannot store some objects, use our approximate
	 * emulation as a wrapper.
	 *
	 * <p>If this is almost a secureable ES5 platform, then WeakMap.js
	 * should be run after repairES5.js.
	 *
	 * <p>See {@code WeakMap} for documentation of the garbage collection
	 * properties of this WeakMap emulation.
	 */
	(function WeakMapModule() {
	  "use strict";

	  if (typeof ses !== 'undefined' && ses.ok && !ses.ok()) {
	    // already too broken, so give up
	    return;
	  }

	  /**
	   * In some cases (current Firefox), we must make a choice betweeen a
	   * WeakMap which is capable of using all varieties of host objects as
	   * keys and one which is capable of safely using proxies as keys. See
	   * comments below about HostWeakMap and DoubleWeakMap for details.
	   *
	   * This function (which is a global, not exposed to guests) marks a
	   * WeakMap as permitted to do what is necessary to index all host
	   * objects, at the cost of making it unsafe for proxies.
	   *
	   * Do not apply this function to anything which is not a genuine
	   * fresh WeakMap.
	   */
	  function weakMapPermitHostObjects(map) {
	    // identity of function used as a secret -- good enough and cheap
	    if (map.permitHostObjects___) {
	      map.permitHostObjects___(weakMapPermitHostObjects);
	    }
	  }
	  if (typeof ses !== 'undefined') {
	    ses.weakMapPermitHostObjects = weakMapPermitHostObjects;
	  }

	  // IE 11 has no Proxy but has a broken WeakMap such that we need to patch
	  // it using DoubleWeakMap; this flag tells DoubleWeakMap so.
	  var doubleWeakMapCheckSilentFailure = false;

	  // Check if there is already a good-enough WeakMap implementation, and if so
	  // exit without replacing it.
	  if (typeof WeakMap === 'function') {
	    var HostWeakMap = WeakMap;
	    // There is a WeakMap -- is it good enough?
	    if (typeof navigator !== 'undefined' &&
	        /Firefox/.test(navigator.userAgent)) {
	      // We're now *assuming not*, because as of this writing (2013-05-06)
	      // Firefox's WeakMaps have a miscellany of objects they won't accept, and
	      // we don't want to make an exhaustive list, and testing for just one
	      // will be a problem if that one is fixed alone (as they did for Event).

	      // If there is a platform that we *can* reliably test on, here's how to
	      // do it:
	      //  var problematic = ... ;
	      //  var testHostMap = new HostWeakMap();
	      //  try {
	      //    testHostMap.set(problematic, 1);  // Firefox 20 will throw here
	      //    if (testHostMap.get(problematic) === 1) {
	      //      return;
	      //    }
	      //  } catch (e) {}

	    } else {
	      // IE 11 bug: WeakMaps silently fail to store frozen objects.
	      var testMap = new HostWeakMap();
	      var testObject = Object.freeze({});
	      testMap.set(testObject, 1);
	      if (testMap.get(testObject) !== 1) {
	        doubleWeakMapCheckSilentFailure = true;
	        // Fall through to installing our WeakMap.
	      } else {
	        module.exports = WeakMap;
	        return;
	      }
	    }
	  }

	  var hop = Object.prototype.hasOwnProperty;
	  var gopn = Object.getOwnPropertyNames;
	  var defProp = Object.defineProperty;
	  var isExtensible = Object.isExtensible;

	  /**
	   * Security depends on HIDDEN_NAME being both <i>unguessable</i> and
	   * <i>undiscoverable</i> by untrusted code.
	   *
	   * <p>Given the known weaknesses of Math.random() on existing
	   * browsers, it does not generate unguessability we can be confident
	   * of.
	   *
	   * <p>It is the monkey patching logic in this file that is intended
	   * to ensure undiscoverability. The basic idea is that there are
	   * three fundamental means of discovering properties of an object:
	   * The for/in loop, Object.keys(), and Object.getOwnPropertyNames(),
	   * as well as some proposed ES6 extensions that appear on our
	   * whitelist. The first two only discover enumerable properties, and
	   * we only use HIDDEN_NAME to name a non-enumerable property, so the
	   * only remaining threat should be getOwnPropertyNames and some
	   * proposed ES6 extensions that appear on our whitelist. We monkey
	   * patch them to remove HIDDEN_NAME from the list of properties they
	   * returns.
	   *
	   * <p>TODO(erights): On a platform with built-in Proxies, proxies
	   * could be used to trap and thereby discover the HIDDEN_NAME, so we
	   * need to monkey patch Proxy.create, Proxy.createFunction, etc, in
	   * order to wrap the provided handler with the real handler which
	   * filters out all traps using HIDDEN_NAME.
	   *
	   * <p>TODO(erights): Revisit Mike Stay's suggestion that we use an
	   * encapsulated function at a not-necessarily-secret name, which
	   * uses the Stiegler shared-state rights amplification pattern to
	   * reveal the associated value only to the WeakMap in which this key
	   * is associated with that value. Since only the key retains the
	   * function, the function can also remember the key without causing
	   * leakage of the key, so this doesn't violate our general gc
	   * goals. In addition, because the name need not be a guarded
	   * secret, we could efficiently handle cross-frame frozen keys.
	   */
	  var HIDDEN_NAME_PREFIX = 'weakmap:';
	  var HIDDEN_NAME = HIDDEN_NAME_PREFIX + 'ident:' + Math.random() + '___';

	  if (typeof crypto !== 'undefined' &&
	      typeof crypto.getRandomValues === 'function' &&
	      typeof ArrayBuffer === 'function' &&
	      typeof Uint8Array === 'function') {
	    var ab = new ArrayBuffer(25);
	    var u8s = new Uint8Array(ab);
	    crypto.getRandomValues(u8s);
	    HIDDEN_NAME = HIDDEN_NAME_PREFIX + 'rand:' +
	      Array.prototype.map.call(u8s, function(u8) {
	        return (u8 % 36).toString(36);
	      }).join('') + '___';
	  }

	  function isNotHiddenName(name) {
	    return !(
	        name.substr(0, HIDDEN_NAME_PREFIX.length) == HIDDEN_NAME_PREFIX &&
	        name.substr(name.length - 3) === '___');
	  }

	  /**
	   * Monkey patch getOwnPropertyNames to avoid revealing the
	   * HIDDEN_NAME.
	   *
	   * <p>The ES5.1 spec requires each name to appear only once, but as
	   * of this writing, this requirement is controversial for ES6, so we
	   * made this code robust against this case. If the resulting extra
	   * search turns out to be expensive, we can probably relax this once
	   * ES6 is adequately supported on all major browsers, iff no browser
	   * versions we support at that time have relaxed this constraint
	   * without providing built-in ES6 WeakMaps.
	   */
	  defProp(Object, 'getOwnPropertyNames', {
	    value: function fakeGetOwnPropertyNames(obj) {
	      return gopn(obj).filter(isNotHiddenName);
	    }
	  });

	  /**
	   * getPropertyNames is not in ES5 but it is proposed for ES6 and
	   * does appear in our whitelist, so we need to clean it too.
	   */
	  if ('getPropertyNames' in Object) {
	    var originalGetPropertyNames = Object.getPropertyNames;
	    defProp(Object, 'getPropertyNames', {
	      value: function fakeGetPropertyNames(obj) {
	        return originalGetPropertyNames(obj).filter(isNotHiddenName);
	      }
	    });
	  }

	  /**
	   * <p>To treat objects as identity-keys with reasonable efficiency
	   * on ES5 by itself (i.e., without any object-keyed collections), we
	   * need to add a hidden property to such key objects when we
	   * can. This raises several issues:
	   * <ul>
	   * <li>Arranging to add this property to objects before we lose the
	   *     chance, and
	   * <li>Hiding the existence of this new property from most
	   *     JavaScript code.
	   * <li>Preventing <i>certification theft</i>, where one object is
	   *     created falsely claiming to be the key of an association
	   *     actually keyed by another object.
	   * <li>Preventing <i>value theft</i>, where untrusted code with
	   *     access to a key object but not a weak map nevertheless
	   *     obtains access to the value associated with that key in that
	   *     weak map.
	   * </ul>
	   * We do so by
	   * <ul>
	   * <li>Making the name of the hidden property unguessable, so "[]"
	   *     indexing, which we cannot intercept, cannot be used to access
	   *     a property without knowing the name.
	   * <li>Making the hidden property non-enumerable, so we need not
	   *     worry about for-in loops or {@code Object.keys},
	   * <li>monkey patching those reflective methods that would
	   *     prevent extensions, to add this hidden property first,
	   * <li>monkey patching those methods that would reveal this
	   *     hidden property.
	   * </ul>
	   * Unfortunately, because of same-origin iframes, we cannot reliably
	   * add this hidden property before an object becomes
	   * non-extensible. Instead, if we encounter a non-extensible object
	   * without a hidden record that we can detect (whether or not it has
	   * a hidden record stored under a name secret to us), then we just
	   * use the key object itself to represent its identity in a brute
	   * force leaky map stored in the weak map, losing all the advantages
	   * of weakness for these.
	   */
	  function getHiddenRecord(key) {
	    if (key !== Object(key)) {
	      throw new TypeError('Not an object: ' + key);
	    }
	    var hiddenRecord = key[HIDDEN_NAME];
	    if (hiddenRecord && hiddenRecord.key === key) { return hiddenRecord; }
	    if (!isExtensible(key)) {
	      // Weak map must brute force, as explained in doc-comment above.
	      return void 0;
	    }

	    // The hiddenRecord and the key point directly at each other, via
	    // the "key" and HIDDEN_NAME properties respectively. The key
	    // field is for quickly verifying that this hidden record is an
	    // own property, not a hidden record from up the prototype chain.
	    //
	    // NOTE: Because this WeakMap emulation is meant only for systems like
	    // SES where Object.prototype is frozen without any numeric
	    // properties, it is ok to use an object literal for the hiddenRecord.
	    // This has two advantages:
	    // * It is much faster in a performance critical place
	    // * It avoids relying on Object.create(null), which had been
	    //   problematic on Chrome 28.0.1480.0. See
	    //   https://code.google.com/p/google-caja/issues/detail?id=1687
	    hiddenRecord = { key: key };

	    // When using this WeakMap emulation on platforms where
	    // Object.prototype might not be frozen and Object.create(null) is
	    // reliable, use the following two commented out lines instead.
	    // hiddenRecord = Object.create(null);
	    // hiddenRecord.key = key;

	    // Please contact us if you need this to work on platforms where
	    // Object.prototype might not be frozen and
	    // Object.create(null) might not be reliable.

	    try {
	      defProp(key, HIDDEN_NAME, {
	        value: hiddenRecord,
	        writable: false,
	        enumerable: false,
	        configurable: false
	      });
	      return hiddenRecord;
	    } catch (error) {
	      // Under some circumstances, isExtensible seems to misreport whether
	      // the HIDDEN_NAME can be defined.
	      // The circumstances have not been isolated, but at least affect
	      // Node.js v0.10.26 on TravisCI / Linux, but not the same version of
	      // Node.js on OS X.
	      return void 0;
	    }
	  }

	  /**
	   * Monkey patch operations that would make their argument
	   * non-extensible.
	   *
	   * <p>The monkey patched versions throw a TypeError if their
	   * argument is not an object, so it should only be done to functions
	   * that should throw a TypeError anyway if their argument is not an
	   * object.
	   */
	  (function(){
	    var oldFreeze = Object.freeze;
	    defProp(Object, 'freeze', {
	      value: function identifyingFreeze(obj) {
	        getHiddenRecord(obj);
	        return oldFreeze(obj);
	      }
	    });
	    var oldSeal = Object.seal;
	    defProp(Object, 'seal', {
	      value: function identifyingSeal(obj) {
	        getHiddenRecord(obj);
	        return oldSeal(obj);
	      }
	    });
	    var oldPreventExtensions = Object.preventExtensions;
	    defProp(Object, 'preventExtensions', {
	      value: function identifyingPreventExtensions(obj) {
	        getHiddenRecord(obj);
	        return oldPreventExtensions(obj);
	      }
	    });
	  })();

	  function constFunc(func) {
	    func.prototype = null;
	    return Object.freeze(func);
	  }

	  var calledAsFunctionWarningDone = false;
	  function calledAsFunctionWarning() {
	    // Future ES6 WeakMap is currently (2013-09-10) expected to reject WeakMap()
	    // but we used to permit it and do it ourselves, so warn only.
	    if (!calledAsFunctionWarningDone && typeof console !== 'undefined') {
	      calledAsFunctionWarningDone = true;
	      console.warn('WeakMap should be invoked as new WeakMap(), not ' +
	          'WeakMap(). This will be an error in the future.');
	    }
	  }

	  var nextId = 0;

	  var OurWeakMap = function() {
	    if (!(this instanceof OurWeakMap)) {  // approximate test for new ...()
	      calledAsFunctionWarning();
	    }

	    // We are currently (12/25/2012) never encountering any prematurely
	    // non-extensible keys.
	    var keys = []; // brute force for prematurely non-extensible keys.
	    var values = []; // brute force for corresponding values.
	    var id = nextId++;

	    function get___(key, opt_default) {
	      var index;
	      var hiddenRecord = getHiddenRecord(key);
	      if (hiddenRecord) {
	        return id in hiddenRecord ? hiddenRecord[id] : opt_default;
	      } else {
	        index = keys.indexOf(key);
	        return index >= 0 ? values[index] : opt_default;
	      }
	    }

	    function has___(key) {
	      var hiddenRecord = getHiddenRecord(key);
	      if (hiddenRecord) {
	        return id in hiddenRecord;
	      } else {
	        return keys.indexOf(key) >= 0;
	      }
	    }

	    function set___(key, value) {
	      var index;
	      var hiddenRecord = getHiddenRecord(key);
	      if (hiddenRecord) {
	        hiddenRecord[id] = value;
	      } else {
	        index = keys.indexOf(key);
	        if (index >= 0) {
	          values[index] = value;
	        } else {
	          // Since some browsers preemptively terminate slow turns but
	          // then continue computing with presumably corrupted heap
	          // state, we here defensively get keys.length first and then
	          // use it to update both the values and keys arrays, keeping
	          // them in sync.
	          index = keys.length;
	          values[index] = value;
	          // If we crash here, values will be one longer than keys.
	          keys[index] = key;
	        }
	      }
	      return this;
	    }

	    function delete___(key) {
	      var hiddenRecord = getHiddenRecord(key);
	      var index, lastIndex;
	      if (hiddenRecord) {
	        return id in hiddenRecord && delete hiddenRecord[id];
	      } else {
	        index = keys.indexOf(key);
	        if (index < 0) {
	          return false;
	        }
	        // Since some browsers preemptively terminate slow turns but
	        // then continue computing with potentially corrupted heap
	        // state, we here defensively get keys.length first and then use
	        // it to update both the keys and the values array, keeping
	        // them in sync. We update the two with an order of assignments,
	        // such that any prefix of these assignments will preserve the
	        // key/value correspondence, either before or after the delete.
	        // Note that this needs to work correctly when index === lastIndex.
	        lastIndex = keys.length - 1;
	        keys[index] = void 0;
	        // If we crash here, there's a void 0 in the keys array, but
	        // no operation will cause a "keys.indexOf(void 0)", since
	        // getHiddenRecord(void 0) will always throw an error first.
	        values[index] = values[lastIndex];
	        // If we crash here, values[index] cannot be found here,
	        // because keys[index] is void 0.
	        keys[index] = keys[lastIndex];
	        // If index === lastIndex and we crash here, then keys[index]
	        // is still void 0, since the aliasing killed the previous key.
	        keys.length = lastIndex;
	        // If we crash here, keys will be one shorter than values.
	        values.length = lastIndex;
	        return true;
	      }
	    }

	    return Object.create(OurWeakMap.prototype, {
	      get___:    { value: constFunc(get___) },
	      has___:    { value: constFunc(has___) },
	      set___:    { value: constFunc(set___) },
	      delete___: { value: constFunc(delete___) }
	    });
	  };

	  OurWeakMap.prototype = Object.create(Object.prototype, {
	    get: {
	      /**
	       * Return the value most recently associated with key, or
	       * opt_default if none.
	       */
	      value: function get(key, opt_default) {
	        return this.get___(key, opt_default);
	      },
	      writable: true,
	      configurable: true
	    },

	    has: {
	      /**
	       * Is there a value associated with key in this WeakMap?
	       */
	      value: function has(key) {
	        return this.has___(key);
	      },
	      writable: true,
	      configurable: true
	    },

	    set: {
	      /**
	       * Associate value with key in this WeakMap, overwriting any
	       * previous association if present.
	       */
	      value: function set(key, value) {
	        return this.set___(key, value);
	      },
	      writable: true,
	      configurable: true
	    },

	    'delete': {
	      /**
	       * Remove any association for key in this WeakMap, returning
	       * whether there was one.
	       *
	       * <p>Note that the boolean return here does not work like the
	       * {@code delete} operator. The {@code delete} operator returns
	       * whether the deletion succeeds at bringing about a state in
	       * which the deleted property is absent. The {@code delete}
	       * operator therefore returns true if the property was already
	       * absent, whereas this {@code delete} method returns false if
	       * the association was already absent.
	       */
	      value: function remove(key) {
	        return this.delete___(key);
	      },
	      writable: true,
	      configurable: true
	    }
	  });

	  if (typeof HostWeakMap === 'function') {
	    (function() {
	      // If we got here, then the platform has a WeakMap but we are concerned
	      // that it may refuse to store some key types. Therefore, make a map
	      // implementation which makes use of both as possible.

	      // In this mode we are always using double maps, so we are not proxy-safe.
	      // This combination does not occur in any known browser, but we had best
	      // be safe.
	      if (doubleWeakMapCheckSilentFailure && typeof Proxy !== 'undefined') {
	        Proxy = undefined;
	      }

	      function DoubleWeakMap() {
	        if (!(this instanceof OurWeakMap)) {  // approximate test for new ...()
	          calledAsFunctionWarning();
	        }

	        // Preferable, truly weak map.
	        var hmap = new HostWeakMap();

	        // Our hidden-property-based pseudo-weak-map. Lazily initialized in the
	        // 'set' implementation; thus we can avoid performing extra lookups if
	        // we know all entries actually stored are entered in 'hmap'.
	        var omap = undefined;

	        // Hidden-property maps are not compatible with proxies because proxies
	        // can observe the hidden name and either accidentally expose it or fail
	        // to allow the hidden property to be set. Therefore, we do not allow
	        // arbitrary WeakMaps to switch to using hidden properties, but only
	        // those which need the ability, and unprivileged code is not allowed
	        // to set the flag.
	        //
	        // (Except in doubleWeakMapCheckSilentFailure mode in which case we
	        // disable proxies.)
	        var enableSwitching = false;

	        function dget(key, opt_default) {
	          if (omap) {
	            return hmap.has(key) ? hmap.get(key)
	                : omap.get___(key, opt_default);
	          } else {
	            return hmap.get(key, opt_default);
	          }
	        }

	        function dhas(key) {
	          return hmap.has(key) || (omap ? omap.has___(key) : false);
	        }

	        var dset;
	        if (doubleWeakMapCheckSilentFailure) {
	          dset = function(key, value) {
	            hmap.set(key, value);
	            if (!hmap.has(key)) {
	              if (!omap) { omap = new OurWeakMap(); }
	              omap.set(key, value);
	            }
	            return this;
	          };
	        } else {
	          dset = function(key, value) {
	            if (enableSwitching) {
	              try {
	                hmap.set(key, value);
	              } catch (e) {
	                if (!omap) { omap = new OurWeakMap(); }
	                omap.set___(key, value);
	              }
	            } else {
	              hmap.set(key, value);
	            }
	            return this;
	          };
	        }

	        function ddelete(key) {
	          var result = !!hmap['delete'](key);
	          if (omap) { return omap.delete___(key) || result; }
	          return result;
	        }

	        return Object.create(OurWeakMap.prototype, {
	          get___:    { value: constFunc(dget) },
	          has___:    { value: constFunc(dhas) },
	          set___:    { value: constFunc(dset) },
	          delete___: { value: constFunc(ddelete) },
	          permitHostObjects___: { value: constFunc(function(token) {
	            if (token === weakMapPermitHostObjects) {
	              enableSwitching = true;
	            } else {
	              throw new Error('bogus call to permitHostObjects___');
	            }
	          })}
	        });
	      }
	      DoubleWeakMap.prototype = OurWeakMap.prototype;
	      module.exports = DoubleWeakMap;

	      // define .constructor to hide OurWeakMap ctor
	      Object.defineProperty(WeakMap.prototype, 'constructor', {
	        value: WeakMap,
	        enumerable: false,  // as default .constructor is
	        configurable: true,
	        writable: true
	      });
	    })();
	  } else {
	    // There is no host WeakMap, so we must use the emulation.

	    // Emulated WeakMaps are incompatible with native proxies (because proxies
	    // can observe the hidden name), so we must disable Proxy usage (in
	    // ArrayLike and Domado, currently).
	    if (typeof Proxy !== 'undefined') {
	      Proxy = undefined;
	    }

	    module.exports = OurWeakMap;
	  }
	})();


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var createUniformWrapper   = __webpack_require__(40)
	var createAttributeWrapper = __webpack_require__(42)
	var makeReflect            = __webpack_require__(41)
	var shaderCache            = __webpack_require__(43)
	var runtime                = __webpack_require__(47)

	//Shader object
	function Shader(gl) {
	  this.gl         = gl

	  //Default initialize these to null
	  this._vref      = 
	  this._fref      = 
	  this._relink    =
	  this.vertShader =
	  this.fragShader =
	  this.program    =
	  this.attributes =
	  this.uniforms   =
	  this.types      = null
	}

	var proto = Shader.prototype

	proto.bind = function() {
	  if(!this.program) {
	    this._relink()
	  }
	  this.gl.useProgram(this.program)
	}

	proto.dispose = function() {
	  if(this._fref) {
	    this._fref.dispose()
	  }
	  if(this._vref) {
	    this._vref.dispose()
	  }
	  this.attributes =
	  this.types      =
	  this.vertShader =
	  this.fragShader =
	  this.program    = 
	  this._relink    = 
	  this._fref      = 
	  this._vref      = null
	}

	function compareAttributes(a, b) {
	  if(a.name < b.name) {
	    return -1
	  }
	  return 1
	}

	//Update export hook for glslify-live
	proto.update = function(
	    vertSource
	  , fragSource
	  , uniforms
	  , attributes) {

	  //If only one object passed, assume glslify style output
	  if(!fragSource || arguments.length === 1) {
	    var obj = vertSource
	    vertSource = obj.vertex
	    fragSource = obj.fragment
	    uniforms   = obj.uniforms
	    attributes = obj.attributes
	  }

	  var wrapper = this
	  var gl      = wrapper.gl

	  //Compile vertex and fragment shaders
	  var pvref = wrapper._vref
	  wrapper._vref = shaderCache.shader(gl, gl.VERTEX_SHADER, vertSource)
	  if(pvref) {
	    pvref.dispose()
	  }
	  wrapper.vertShader = wrapper._vref.shader
	  var pfref = this._fref
	  wrapper._fref = shaderCache.shader(gl, gl.FRAGMENT_SHADER, fragSource)
	  if(pfref) {
	    pfref.dispose()
	  }
	  wrapper.fragShader = wrapper._fref.shader
	  
	  //If uniforms/attributes is not specified, use RT reflection
	  if(!uniforms || !attributes) {

	    //Create initial test program
	    var testProgram = gl.createProgram()
	    gl.attachShader(testProgram, wrapper.fragShader)
	    gl.attachShader(testProgram, wrapper.vertShader)
	    gl.linkProgram(testProgram)
	    if(!gl.getProgramParameter(testProgram, gl.LINK_STATUS)) {
	      var errLog = gl.getProgramInfoLog(testProgram)
	      console.error('gl-shader: Error linking program:', errLog)
	      throw new Error('gl-shader: Error linking program:' + errLog)
	    }
	    
	    //Load data from runtime
	    uniforms   = uniforms   || runtime.uniforms(gl, testProgram)
	    attributes = attributes || runtime.attributes(gl, testProgram)

	    //Release test program
	    gl.deleteProgram(testProgram)
	  }

	  //Sort attributes lexicographically
	  // overrides undefined WebGL behavior for attribute locations
	  attributes = attributes.slice()
	  attributes.sort(compareAttributes)

	  //Convert attribute types, read out locations
	  var attributeUnpacked  = []
	  var attributeNames     = []
	  var attributeLocations = []
	  for(var i=0; i<attributes.length; ++i) {
	    var attr = attributes[i]
	    if(attr.type.indexOf('mat') >= 0) {
	      var size = attr.type.charAt(attr.type.length-1)|0
	      var locVector = new Array(size)
	      for(var j=0; j<size; ++j) {
	        locVector[j] = attributeLocations.length
	        attributeNames.push(attr.name + '[' + j + ']')
	        if(typeof attr.location === 'number') {
	          attributeLocations.push(attr.location + j)
	        } else if(Array.isArray(attr.location) && 
	                  attr.location.length === size &&
	                  typeof attr.location[j] === 'number') {
	          attributeLocations.push(attr.location[j]|0)
	        } else {
	          attributeLocations.push(-1)
	        }
	      }
	      attributeUnpacked.push({
	        name: attr.name,
	        type: attr.type,
	        locations: locVector
	      })
	    } else {
	      attributeUnpacked.push({
	        name: attr.name,
	        type: attr.type,
	        locations: [ attributeLocations.length ]
	      })
	      attributeNames.push(attr.name)
	      if(typeof attr.location === 'number') {
	        attributeLocations.push(attr.location|0)
	      } else {
	        attributeLocations.push(-1)
	      }
	    }
	  }

	  //For all unspecified attributes, assign them lexicographically min attribute
	  var curLocation = 0
	  for(var i=0; i<attributeLocations.length; ++i) {
	    if(attributeLocations[i] < 0) {
	      while(attributeLocations.indexOf(curLocation) >= 0) {
	        curLocation += 1
	      }
	      attributeLocations[i] = curLocation
	    }
	  }

	  //Rebuild program and recompute all uniform locations
	  var uniformLocations = new Array(uniforms.length)
	  function relink() {
	    wrapper.program = shaderCache.program(
	        gl
	      , wrapper._vref
	      , wrapper._fref
	      , attributeNames
	      , attributeLocations)

	    for(var i=0; i<uniforms.length; ++i) {
	      uniformLocations[i] = gl.getUniformLocation(
	          wrapper.program
	        , uniforms[i].name)
	    }
	  }

	  //Perform initial linking, reuse program used for reflection
	  relink()

	  //Save relinking procedure, defer until runtime
	  wrapper._relink = relink

	  //Generate type info
	  wrapper.types = {
	    uniforms:   makeReflect(uniforms),
	    attributes: makeReflect(attributes)
	  }

	  //Generate attribute wrappers
	  wrapper.attributes = createAttributeWrapper(
	      gl
	    , wrapper
	    , attributeUnpacked
	    , attributeLocations)

	  //Generate uniform wrappers
	  Object.defineProperty(wrapper, 'uniforms', createUniformWrapper(
	      gl
	    , wrapper
	    , uniforms
	    , uniformLocations))
	}

	//Compiles and links a shader program with the given attribute and vertex list
	function createShader(
	    gl
	  , vertSource
	  , fragSource
	  , uniforms
	  , attributes) {

	  var shader = new Shader(gl)

	  shader.update(
	      vertSource
	    , fragSource
	    , uniforms
	    , attributes)

	  return shader
	}

	module.exports = createShader

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var coallesceUniforms = __webpack_require__(41)

	module.exports = createUniformWrapper

	//Binds a function and returns a value
	function identity(x) {
	  var c = new Function('y', 'return function(){return y}')
	  return c(x)
	}

	function makeVector(length, fill) {
	  var result = new Array(length)
	  for(var i=0; i<length; ++i) {
	    result[i] = fill
	  }
	  return result
	}

	//Create shims for uniforms
	function createUniformWrapper(gl, wrapper, uniforms, locations) {

	  function makeGetter(index) {
	    var proc = new Function(
	        'gl'
	      , 'wrapper'
	      , 'locations'
	      , 'return function(){return gl.getUniform(wrapper.program,locations[' + index + '])}') 
	    return proc(gl, wrapper, locations)
	  }

	  function makePropSetter(path, index, type) {
	    switch(type) {
	      case 'bool':
	      case 'int':
	      case 'sampler2D':
	      case 'samplerCube':
	        return 'gl.uniform1i(locations[' + index + '],obj' + path + ')'
	      case 'float':
	        return 'gl.uniform1f(locations[' + index + '],obj' + path + ')'
	      default:
	        var vidx = type.indexOf('vec')
	        if(0 <= vidx && vidx <= 1 && type.length === 4 + vidx) {
	          var d = type.charCodeAt(type.length-1) - 48
	          if(d < 2 || d > 4) {
	            throw new Error('gl-shader: Invalid data type')
	          }
	          switch(type.charAt(0)) {
	            case 'b':
	            case 'i':
	              return 'gl.uniform' + d + 'iv(locations[' + index + '],obj' + path + ')'
	            case 'v':
	              return 'gl.uniform' + d + 'fv(locations[' + index + '],obj' + path + ')'
	            default:
	              throw new Error('gl-shader: Unrecognized data type for vector ' + name + ': ' + type)
	          }
	        } else if(type.indexOf('mat') === 0 && type.length === 4) {
	          var d = type.charCodeAt(type.length-1) - 48
	          if(d < 2 || d > 4) {
	            throw new Error('gl-shader: Invalid uniform dimension type for matrix ' + name + ': ' + type)
	          }
	          return 'gl.uniformMatrix' + d + 'fv(locations[' + index + '],false,obj' + path + ')'
	        } else {
	          throw new Error('gl-shader: Unknown uniform data type for ' + name + ': ' + type)
	        }
	      break
	    }
	  }

	  function enumerateIndices(prefix, type) {
	    if(typeof type !== 'object') {
	      return [ [prefix, type] ]
	    }
	    var indices = []
	    for(var id in type) {
	      var prop = type[id]
	      var tprefix = prefix
	      if(parseInt(id) + '' === id) {
	        tprefix += '[' + id + ']'
	      } else {
	        tprefix += '.' + id
	      }
	      if(typeof prop === 'object') {
	        indices.push.apply(indices, enumerateIndices(tprefix, prop))
	      } else {
	        indices.push([tprefix, prop])
	      }
	    }
	    return indices
	  }

	  function makeSetter(type) {
	    var code = [ 'return function updateProperty(obj){' ]
	    var indices = enumerateIndices('', type)
	    for(var i=0; i<indices.length; ++i) {
	      var item = indices[i]
	      var path = item[0]
	      var idx  = item[1]
	      if(locations[idx]) {
	        code.push(makePropSetter(path, idx, uniforms[idx].type))
	      }
	    }
	    code.push('return obj}')
	    var proc = new Function('gl', 'locations', code.join('\n'))
	    return proc(gl, locations)
	  }

	  function defaultValue(type) {
	    switch(type) {
	      case 'bool':
	        return false
	      case 'int':
	      case 'sampler2D':
	      case 'samplerCube':
	        return 0
	      case 'float':
	        return 0.0
	      default:
	        var vidx = type.indexOf('vec')
	        if(0 <= vidx && vidx <= 1 && type.length === 4 + vidx) {
	          var d = type.charCodeAt(type.length-1) - 48
	          if(d < 2 || d > 4) {
	            throw new Error('gl-shader: Invalid data type')
	          }
	          if(type.charAt(0) === 'b') {
	            return makeVector(d, false)
	          }
	          return makeVector(d, 0)
	        } else if(type.indexOf('mat') === 0 && type.length === 4) {
	          var d = type.charCodeAt(type.length-1) - 48
	          if(d < 2 || d > 4) {
	            throw new Error('gl-shader: Invalid uniform dimension type for matrix ' + name + ': ' + type)
	          }
	          return makeVector(d*d, 0)
	        } else {
	          throw new Error('gl-shader: Unknown uniform data type for ' + name + ': ' + type)
	        }
	      break
	    }
	  }

	  function storeProperty(obj, prop, type) {
	    if(typeof type === 'object') {
	      var child = processObject(type)
	      Object.defineProperty(obj, prop, {
	        get: identity(child),
	        set: makeSetter(type),
	        enumerable: true,
	        configurable: false
	      })
	    } else {
	      if(locations[type]) {
	        Object.defineProperty(obj, prop, {
	          get: makeGetter(type),
	          set: makeSetter(type),
	          enumerable: true,
	          configurable: false
	        })
	      } else {
	        obj[prop] = defaultValue(uniforms[type].type)
	      }
	    }
	  }

	  function processObject(obj) {
	    var result
	    if(Array.isArray(obj)) {
	      result = new Array(obj.length)
	      for(var i=0; i<obj.length; ++i) {
	        storeProperty(result, i, obj[i])
	      }
	    } else {
	      result = {}
	      for(var id in obj) {
	        storeProperty(result, id, obj[id])
	      }
	    }
	    return result
	  }

	  //Return data
	  var coallesced = coallesceUniforms(uniforms, true)
	  return {
	    get: identity(processObject(coallesced)),
	    set: makeSetter(coallesced),
	    enumerable: true,
	    configurable: true
	  }
	}


/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict'

	module.exports = makeReflectTypes

	//Construct type info for reflection.
	//
	// This iterates over the flattened list of uniform type values and smashes them into a JSON object.
	//
	// The leaves of the resulting object are either indices or type strings representing primitive glslify types
	function makeReflectTypes(uniforms, useIndex) {
	  var obj = {}
	  for(var i=0; i<uniforms.length; ++i) {
	    var n = uniforms[i].name
	    var parts = n.split(".")
	    var o = obj
	    for(var j=0; j<parts.length; ++j) {
	      var x = parts[j].split("[")
	      if(x.length > 1) {
	        if(!(x[0] in o)) {
	          o[x[0]] = []
	        }
	        o = o[x[0]]
	        for(var k=1; k<x.length; ++k) {
	          var y = parseInt(x[k])
	          if(k<x.length-1 || j<parts.length-1) {
	            if(!(y in o)) {
	              if(k < x.length-1) {
	                o[y] = []
	              } else {
	                o[y] = {}
	              }
	            }
	            o = o[y]
	          } else {
	            if(useIndex) {
	              o[y] = i
	            } else {
	              o[y] = uniforms[i].type
	            }
	          }
	        }
	      } else if(j < parts.length-1) {
	        if(!(x[0] in o)) {
	          o[x[0]] = {}
	        }
	        o = o[x[0]]
	      } else {
	        if(useIndex) {
	          o[x[0]] = i
	        } else {
	          o[x[0]] = uniforms[i].type
	        }
	      }
	    }
	  }
	  return obj
	}

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict'

	module.exports = createAttributeWrapper

	function ShaderAttribute(
	    gl
	  , wrapper
	  , index
	  , locations
	  , dimension
	  , constFunc) {
	  this._gl        = gl
	  this._wrapper   = wrapper
	  this._index     = index
	  this._locations = locations
	  this._dimension = dimension
	  this._constFunc = constFunc
	}

	var proto = ShaderAttribute.prototype

	proto.pointer = function setAttribPointer(
	    type
	  , normalized
	  , stride
	  , offset) {

	  var self      = this
	  var gl        = self._gl
	  var location  = self._locations[self._index]

	  gl.vertexAttribPointer(
	      location
	    , self._dimension
	    , type || gl.FLOAT
	    , !!normalized
	    , stride || 0
	    , offset || 0)
	  gl.enableVertexAttribArray(location)
	}

	proto.set = function(x0, x1, x2, x3) {
	  return this._constFunc(this._locations[this._index], x0, x1, x2, x3)
	}

	Object.defineProperty(proto, 'location', {
	  get: function() {
	    return this._locations[this._index]
	  }
	  , set: function(v) {
	    if(v !== this._locations[this._index]) {
	      this._locations[this._index] = v|0
	      this._wrapper.program = null
	    }
	    return v|0
	  }
	})

	//Adds a vector attribute to obj
	function addVectorAttribute(
	    gl
	  , wrapper
	  , index
	  , locations
	  , dimension
	  , obj
	  , name) {

	  //Construct constant function
	  var constFuncArgs = [ 'gl', 'v' ]
	  var varNames = []
	  for(var i=0; i<dimension; ++i) {
	    constFuncArgs.push('x'+i)
	    varNames.push('x'+i)
	  }
	  constFuncArgs.push(
	    'if(x0.length===void 0){return gl.vertexAttrib' +
	    dimension + 'f(v,' +
	    varNames.join() +
	    ')}else{return gl.vertexAttrib' +
	    dimension +
	    'fv(v,x0)}')
	  var constFunc = Function.apply(null, constFuncArgs)

	  //Create attribute wrapper
	  var attr = new ShaderAttribute(
	      gl
	    , wrapper
	    , index
	    , locations
	    , dimension
	    , constFunc)

	  //Create accessor
	  Object.defineProperty(obj, name, {
	    set: function(x) {
	      gl.disableVertexAttribArray(locations[index])
	      constFunc(gl, locations[index], x)
	      return x
	    }
	    , get: function() {
	      return attr
	    }
	    , enumerable: true
	  })
	}

	function addMatrixAttribute(
	    gl
	  , wrapper
	  , index
	  , locations
	  , dimension
	  , obj
	  , name) {

	  var parts = new Array(dimension)
	  var attrs = new Array(dimension)
	  for(var i=0; i<dimension; ++i) {
	    addVectorAttribute(
	        gl
	      , wrapper
	      , index[i]
	      , locations
	      , dimension
	      , parts
	      , i)
	    attrs[i] = parts[i]
	  }

	  Object.defineProperty(parts, 'location', {
	    set: function(v) {
	      if(Array.isArray) {
	        for(var i=0; i<dimension; ++i) {
	          attrs[i].location = v[i]
	        }
	      } else {
	        for(var i=0; i<dimension; ++i) {
	          result[i] = attrs[i].location = v + i
	        }
	      }
	      return v
	    }
	    , get: function() {
	      var result = new Array(dimension)
	      for(var i=0; i<dimension; ++i) {
	        result[i] = locations[index[i]]
	      }
	      return result
	    }
	    , enumerable: true
	  })

	  parts.pointer = function(type, normalized, stride, offset) {
	    type       = type || gl.FLOAT
	    normalized = !!normalized
	    stride     = stride || (dimension * dimension)
	    offset     = offset || 0
	    for(var i=0; i<dimension; ++i) {
	      var location = locations[index[i]]
	      gl.vertexAttribPointer(
	            location
	          , dimension
	          , type
	          , normalized
	          , stride
	          , offset + i * dimension)
	      gl.enableVertexAttribArray(location)
	    }
	  }

	  var scratch = new Array(dimension)
	  var vertexAttrib = gl['vertexAttrib' + dimension + 'fv']

	  Object.defineProperty(obj, name, {
	    set: function(x) {
	      for(var i=0; i<dimension; ++i) {
	        var loc = locations[index[i]]
	        gl.disableVertexAttribArray(loc)
	        if(Array.isArray(x[0])) {
	          vertexAttrib.call(gl, loc, x[i])
	        } else {
	          for(var j=0; j<dimension; ++j) {
	            scratch[j] = x[dimension*i + j]
	          }
	          vertexAttrib.call(gl, loc, scratch)
	        }
	      }
	      return x
	    }
	    , get: function() {
	      return parts
	    }
	    , enumerable: true
	  })
	}

	//Create shims for attributes
	function createAttributeWrapper(
	    gl
	  , wrapper
	  , attributes
	  , locations) {

	  var obj = {}
	  for(var i=0, n=attributes.length; i<n; ++i) {

	    var a = attributes[i]
	    var name = a.name
	    var type = a.type
	    var locs = a.locations

	    switch(type) {
	      case 'bool':
	      case 'int':
	      case 'float':
	        addVectorAttribute(
	            gl
	          , wrapper
	          , locs[0]
	          , locations
	          , 1
	          , obj
	          , name)
	      break
	      
	      default:
	        if(type.indexOf('vec') >= 0) {
	          var d = type.charCodeAt(type.length-1) - 48
	          if(d < 2 || d > 4) {
	            throw new Error('gl-shader: Invalid data type for attribute ' + name + ': ' + type)
	          }
	          addVectorAttribute(
	              gl
	            , wrapper
	            , locs[0]
	            , locations
	            , d
	            , obj
	            , name)
	        } else if(type.indexOf('mat') >= 0) {
	          var d = type.charCodeAt(type.length-1) - 48
	          if(d < 2 || d > 4) {
	            throw new Error('gl-shader: Invalid data type for attribute ' + name + ': ' + type)
	          }
	          addMatrixAttribute(
	              gl
	            , wrapper
	            , locs
	            , locations
	            , d
	            , obj
	            , name)
	        } else {
	          throw new Error('gl-shader: Unknown data type for attribute ' + name + ': ' + type)
	        }
	      break
	    }
	  }
	  return obj
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	exports.shader   = getShaderReference
	exports.program  = createProgram

	var weakMap = typeof WeakMap === 'undefined' ? __webpack_require__(44) : WeakMap
	var CACHE = new weakMap()

	var SHADER_COUNTER = 0

	function ShaderReference(id, src, type, shader, programs, count, cache) {
	  this.id       = id
	  this.src      = src
	  this.type     = type
	  this.shader   = shader
	  this.count    = count
	  this.programs = []
	  this.cache    = cache
	}

	ShaderReference.prototype.dispose = function() {
	  if(--this.count === 0) {
	    var cache    = this.cache
	    var gl       = cache.gl

	    //Remove program references
	    var programs = this.programs
	    for(var i=0, n=programs.length; i<n; ++i) {
	      var p = cache.programs[programs[i]]
	      if(p) {
	        delete cache.programs[i]
	        gl.deleteProgram(p)
	      }
	    }

	    //Remove shader reference
	    gl.deleteShader(this.shader)
	    delete cache.shaders[(this.type === gl.FRAGMENT_SHADER)|0][this.src]
	  }
	}

	function ContextCache(gl) {
	  this.gl       = gl
	  this.shaders  = [{}, {}]
	  this.programs = {}
	}

	var proto = ContextCache.prototype

	function compileShader(gl, type, src) {
	  var shader = gl.createShader(type)
	  gl.shaderSource(shader, src)
	  gl.compileShader(shader)
	  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	    var errLog = gl.getShaderInfoLog(shader)
	    console.error('gl-shader: Error compiling shader:', errLog)
	    throw new Error('gl-shader: Error compiling shader:' + errLog)
	  }
	  return shader
	}

	proto.getShaderReference = function(type, src) {
	  var gl      = this.gl
	  var shaders = this.shaders[(type === gl.FRAGMENT_SHADER)|0]
	  var shader  = shaders[src]
	  if(!shader || !gl.isShader(shader.shader)) {
	    var shaderObj = compileShader(gl, type, src)
	    shader = shaders[src] = new ShaderReference(
	      SHADER_COUNTER++,
	      src,
	      type,
	      shaderObj,
	      [],
	      1,
	      this)
	  } else {
	    shader.count += 1
	  }
	  return shader
	}

	function linkProgram(gl, vshader, fshader, attribs, locations) {
	  var program = gl.createProgram()
	  gl.attachShader(program, vshader)
	  gl.attachShader(program, fshader)
	  for(var i=0; i<attribs.length; ++i) {
	    gl.bindAttribLocation(program, locations[i], attribs[i])
	  }
	  gl.linkProgram(program)
	  if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	    var errLog = gl.getProgramInfoLog(program)
	    console.error('gl-shader: Error linking program:', errLog)
	    throw new Error('gl-shader: Error linking program:' + errLog)
	  }
	  return program
	}

	proto.getProgram = function(vref, fref, attribs, locations) {
	  var token = [vref.id, fref.id, attribs.join(':'), locations.join(':')].join('@')
	  var prog  = this.programs[token]
	  if(!prog || !this.gl.isProgram(prog)) {
	    this.programs[token] = prog = linkProgram(
	      this.gl,
	      vref.shader,
	      fref.shader,
	      attribs,
	      locations)
	    vref.programs.push(token)
	    fref.programs.push(token)
	  }
	  return prog
	}

	function getCache(gl) {
	  var ctxCache = CACHE.get(gl)
	  if(!ctxCache) {
	    ctxCache = new ContextCache(gl)
	    CACHE.set(gl, ctxCache)
	  }
	  return ctxCache
	}

	function getShaderReference(gl, type, src) {
	  return getCache(gl).getShaderReference(type, src)
	}

	function createProgram(gl, vref, fref, attribs, locations) {
	  return getCache(gl).getProgram(vref, fref, attribs, locations)
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// Original - @Gozola. 
	// https://gist.github.com/Gozala/1269991
	// This is a reimplemented version (with a few bug fixes).

	var createStore = __webpack_require__(45);

	module.exports = weakMap;

	function weakMap() {
	    var privates = createStore();

	    return {
	        'get': function (key, fallback) {
	            var store = privates(key)
	            return store.hasOwnProperty('value') ?
	                store.value : fallback
	        },
	        'set': function (key, value) {
	            privates(key).value = value;
	        },
	        'has': function(key) {
	            return 'value' in privates(key);
	        },
	        'delete': function (key) {
	            return delete privates(key).value;
	        }
	    }
	}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var hiddenStore = __webpack_require__(46);

	module.exports = createStore;

	function createStore() {
	    var key = {};

	    return function (obj) {
	        if ((typeof obj !== 'object' || obj === null) &&
	            typeof obj !== 'function'
	        ) {
	            throw new Error('Weakmap-shim: Key must be object')
	        }

	        var store = obj.valueOf(key);
	        return store && store.identity === key ?
	            store : hiddenStore(obj, key);
	    };
	}


/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = hiddenStore;

	function hiddenStore(obj, key) {
	    var store = { identity: key };
	    var valueOf = obj.valueOf;

	    Object.defineProperty(obj, "valueOf", {
	        value: function (value) {
	            return value !== key ?
	                valueOf.apply(this, arguments) : store;
	        },
	        writable: true
	    });

	    return store;
	}


/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict'

	exports.uniforms    = runtimeUniforms
	exports.attributes  = runtimeAttributes

	var GL_TO_GLSL_TYPES = {
	  'FLOAT':       'float',
	  'FLOAT_VEC2':  'vec2',
	  'FLOAT_VEC3':  'vec3',
	  'FLOAT_VEC4':  'vec4',
	  'INT':         'int',
	  'INT_VEC2':    'ivec2',
	  'INT_VEC3':    'ivec3',
	  'INT_VEC4':    'ivec4',
	  'BOOL':        'bool',
	  'BOOL_VEC2':   'bvec2',
	  'BOOL_VEC3':   'bvec3',
	  'BOOL_VEC4':   'bvec4',
	  'FLOAT_MAT2':  'mat2',
	  'FLOAT_MAT3':  'mat3',
	  'FLOAT_MAT4':  'mat4',
	  'SAMPLER_2D':  'sampler2D',
	  'SAMPLER_CUBE':'samplerCube'
	}

	var GL_TABLE = null

	function getType(gl, type) {
	  if(!GL_TABLE) {
	    var typeNames = Object.keys(GL_TO_GLSL_TYPES)
	    GL_TABLE = {}
	    for(var i=0; i<typeNames.length; ++i) {
	      var tn = typeNames[i]
	      GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn]
	    }
	  }
	  return GL_TABLE[type]
	}

	function runtimeUniforms(gl, program) {
	  var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
	  var result = []
	  for(var i=0; i<numUniforms; ++i) {
	    var info = gl.getActiveUniform(program, i)
	    if(info) {
	      var type = getType(gl, info.type)
	      if(info.size > 1) {
	        for(var j=0; j<info.size; ++j) {
	          result.push({
	            name: info.name.replace('[0]', '[' + j + ']'),
	            type: type
	          })
	        }
	      } else {
	        result.push({
	          name: info.name,
	          type: type
	        })
	      }
	    }
	  }
	  return result
	}

	function runtimeAttributes(gl, program) {
	  var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES)
	  var result = []
	  for(var i=0; i<numAttributes; ++i) {
	    var info = gl.getActiveAttrib(program, i)
	    if(info) {
	      result.push({
	        name: info.name,
	        type: getType(gl, info.type)
	      })
	    }
	  }
	  return result
	}


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var pool = __webpack_require__(49)
	var ops = __webpack_require__(56)
	var ndarray = __webpack_require__(61)

	var SUPPORTED_TYPES = [
	  "uint8",
	  "uint8_clamped",
	  "uint16",
	  "uint32",
	  "int8",
	  "int16",
	  "int32",
	  "float32" ]

	function GLBuffer(gl, type, handle, length, usage) {
	  this.gl = gl
	  this.type = type
	  this.handle = handle
	  this.length = length
	  this.usage = usage
	}

	var proto = GLBuffer.prototype

	proto.bind = function() {
	  this.gl.bindBuffer(this.type, this.handle)
	}

	proto.unbind = function() {
	  this.gl.bindBuffer(this.type, null)
	}

	proto.dispose = function() {
	  this.gl.deleteBuffer(this.handle)
	}

	function updateTypeArray(gl, type, len, usage, data, offset) {
	  var dataLen = data.length * data.BYTES_PER_ELEMENT
	  if(offset < 0) {
	    gl.bufferData(type, data, usage)
	    return dataLen
	  }
	  if(dataLen + offset > len) {
	    throw new Error("gl-buffer: If resizing buffer, must not specify offset")
	  }
	  gl.bufferSubData(type, offset, data)
	  return len
	}

	function makeScratchTypeArray(array, dtype) {
	  var res = pool.malloc(array.length, dtype)
	  var n = array.length
	  for(var i=0; i<n; ++i) {
	    res[i] = array[i]
	  }
	  return res
	}

	function isPacked(shape, stride) {
	  var n = 1
	  for(var i=stride.length-1; i>=0; --i) {
	    if(stride[i] !== n) {
	      return false
	    }
	    n *= shape[i]
	  }
	  return true
	}

	proto.update = function(array, offset) {
	  if(typeof offset !== "number") {
	    offset = -1
	  }
	  this.bind()
	  if(typeof array === "object" && typeof array.shape !== "undefined") { //ndarray
	    var dtype = array.dtype
	    if(SUPPORTED_TYPES.indexOf(dtype) < 0) {
	      dtype = "float32"
	    }
	    if(this.type === this.gl.ELEMENT_ARRAY_BUFFER) {
	      var ext = gl.getExtension('OES_element_index_uint')
	      if(ext && dtype !== "uint16") {
	        dtype = "uint32"
	      } else {
	        dtype = "uint16"
	      }
	    }
	    if(dtype === array.dtype && isPacked(array.shape, array.stride)) {
	      if(array.offset === 0 && array.data.length === array.shape[0]) {
	        this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, array.data, offset)
	      } else {
	        this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, array.data.subarray(array.offset, array.shape[0]), offset)
	      }
	    } else {
	      var tmp = pool.malloc(array.size, dtype)
	      var ndt = ndarray(tmp, array.shape)
	      ops.assign(ndt, array)
	      if(offset < 0) {
	        this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, tmp, offset)
	      } else {
	        this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, tmp.subarray(0, array.size), offset)
	      }
	      pool.free(tmp)
	    }
	  } else if(Array.isArray(array)) { //Vanilla array
	    var t
	    if(this.type === this.gl.ELEMENT_ARRAY_BUFFER) {
	      t = makeScratchTypeArray(array, "uint16")
	    } else {
	      t = makeScratchTypeArray(array, "float32")
	    }
	    if(offset < 0) {
	      this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, t, offset)
	    } else {
	      this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, t.subarray(0, array.length), offset)
	    }
	    pool.free(t)
	  } else if(typeof array === "object" && typeof array.length === "number") { //Typed array
	    this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, array, offset)
	  } else if(typeof array === "number" || array === undefined) { //Number/default
	    if(offset >= 0) {
	      throw new Error("gl-buffer: Cannot specify offset when resizing buffer")
	    }
	    array = array | 0
	    if(array <= 0) {
	      array = 1
	    }
	    this.gl.bufferData(this.type, array|0, this.usage)
	    this.length = array
	  } else { //Error, case should not happen
	    throw new Error("gl-buffer: Invalid data type")
	  }
	}

	function createBuffer(gl, data, type, usage) {
	  type = type || gl.ARRAY_BUFFER
	  usage = usage || gl.DYNAMIC_DRAW
	  if(type !== gl.ARRAY_BUFFER && type !== gl.ELEMENT_ARRAY_BUFFER) {
	    throw new Error("gl-buffer: Invalid type for webgl buffer, must be either gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER")
	  }
	  if(usage !== gl.DYNAMIC_DRAW && usage !== gl.STATIC_DRAW && usage !== gl.STREAM_DRAW) {
	    throw new Error("gl-buffer: Invalid usage for buffer, must be either gl.DYNAMIC_DRAW, gl.STATIC_DRAW or gl.STREAM_DRAW")
	  }
	  var handle = gl.createBuffer()
	  var result = new GLBuffer(gl, type, handle, 0, usage)
	  result.update(data)
	  return result
	}

	module.exports = createBuffer


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {'use strict'

	var bits = __webpack_require__(54)
	var dup = __webpack_require__(55)

	//Legacy pool support
	if(!global.__TYPEDARRAY_POOL) {
	  global.__TYPEDARRAY_POOL = {
	      UINT8   : dup([32, 0])
	    , UINT16  : dup([32, 0])
	    , UINT32  : dup([32, 0])
	    , INT8    : dup([32, 0])
	    , INT16   : dup([32, 0])
	    , INT32   : dup([32, 0])
	    , FLOAT   : dup([32, 0])
	    , DOUBLE  : dup([32, 0])
	    , DATA    : dup([32, 0])
	    , UINT8C  : dup([32, 0])
	    , BUFFER  : dup([32, 0])
	  }
	}

	var hasUint8C = (typeof Uint8ClampedArray) !== 'undefined'
	var POOL = global.__TYPEDARRAY_POOL

	//Upgrade pool
	if(!POOL.UINT8C) {
	  POOL.UINT8C = dup([32, 0])
	}
	if(!POOL.BUFFER) {
	  POOL.BUFFER = dup([32, 0])
	}

	//New technique: Only allocate from ArrayBufferView and Buffer
	var DATA    = POOL.DATA
	  , BUFFER  = POOL.BUFFER

	exports.free = function free(array) {
	  if(Buffer.isBuffer(array)) {
	    BUFFER[bits.log2(array.length)].push(array)
	  } else {
	    if(Object.prototype.toString.call(array) !== '[object ArrayBuffer]') {
	      array = array.buffer
	    }
	    if(!array) {
	      return
	    }
	    var n = array.length || array.byteLength
	    var log_n = bits.log2(n)|0
	    DATA[log_n].push(array)
	  }
	}

	function freeArrayBuffer(buffer) {
	  if(!buffer) {
	    return
	  }
	  var n = buffer.length || buffer.byteLength
	  var log_n = bits.log2(n)
	  DATA[log_n].push(buffer)
	}

	function freeTypedArray(array) {
	  freeArrayBuffer(array.buffer)
	}

	exports.freeUint8 =
	exports.freeUint16 =
	exports.freeUint32 =
	exports.freeInt8 =
	exports.freeInt16 =
	exports.freeInt32 =
	exports.freeFloat32 = 
	exports.freeFloat =
	exports.freeFloat64 = 
	exports.freeDouble = 
	exports.freeUint8Clamped = 
	exports.freeDataView = freeTypedArray

	exports.freeArrayBuffer = freeArrayBuffer

	exports.freeBuffer = function freeBuffer(array) {
	  BUFFER[bits.log2(array.length)].push(array)
	}

	exports.malloc = function malloc(n, dtype) {
	  if(dtype === undefined || dtype === 'arraybuffer') {
	    return mallocArrayBuffer(n)
	  } else {
	    switch(dtype) {
	      case 'uint8':
	        return mallocUint8(n)
	      case 'uint16':
	        return mallocUint16(n)
	      case 'uint32':
	        return mallocUint32(n)
	      case 'int8':
	        return mallocInt8(n)
	      case 'int16':
	        return mallocInt16(n)
	      case 'int32':
	        return mallocInt32(n)
	      case 'float':
	      case 'float32':
	        return mallocFloat(n)
	      case 'double':
	      case 'float64':
	        return mallocDouble(n)
	      case 'uint8_clamped':
	        return mallocUint8Clamped(n)
	      case 'buffer':
	        return mallocBuffer(n)
	      case 'data':
	      case 'dataview':
	        return mallocDataView(n)

	      default:
	        return null
	    }
	  }
	  return null
	}

	function mallocArrayBuffer(n) {
	  var n = bits.nextPow2(n)
	  var log_n = bits.log2(n)
	  var d = DATA[log_n]
	  if(d.length > 0) {
	    return d.pop()
	  }
	  return new ArrayBuffer(n)
	}
	exports.mallocArrayBuffer = mallocArrayBuffer

	function mallocUint8(n) {
	  return new Uint8Array(mallocArrayBuffer(n), 0, n)
	}
	exports.mallocUint8 = mallocUint8

	function mallocUint16(n) {
	  return new Uint16Array(mallocArrayBuffer(2*n), 0, n)
	}
	exports.mallocUint16 = mallocUint16

	function mallocUint32(n) {
	  return new Uint32Array(mallocArrayBuffer(4*n), 0, n)
	}
	exports.mallocUint32 = mallocUint32

	function mallocInt8(n) {
	  return new Int8Array(mallocArrayBuffer(n), 0, n)
	}
	exports.mallocInt8 = mallocInt8

	function mallocInt16(n) {
	  return new Int16Array(mallocArrayBuffer(2*n), 0, n)
	}
	exports.mallocInt16 = mallocInt16

	function mallocInt32(n) {
	  return new Int32Array(mallocArrayBuffer(4*n), 0, n)
	}
	exports.mallocInt32 = mallocInt32

	function mallocFloat(n) {
	  return new Float32Array(mallocArrayBuffer(4*n), 0, n)
	}
	exports.mallocFloat32 = exports.mallocFloat = mallocFloat

	function mallocDouble(n) {
	  return new Float64Array(mallocArrayBuffer(8*n), 0, n)
	}
	exports.mallocFloat64 = exports.mallocDouble = mallocDouble

	function mallocUint8Clamped(n) {
	  if(hasUint8C) {
	    return new Uint8ClampedArray(mallocArrayBuffer(n), 0, n)
	  } else {
	    return mallocUint8(n)
	  }
	}
	exports.mallocUint8Clamped = mallocUint8Clamped

	function mallocDataView(n) {
	  return new DataView(mallocArrayBuffer(n), 0, n)
	}
	exports.mallocDataView = mallocDataView

	function mallocBuffer(n) {
	  n = bits.nextPow2(n)
	  var log_n = bits.log2(n)
	  var cache = BUFFER[log_n]
	  if(cache.length > 0) {
	    return cache.pop()
	  }
	  return new Buffer(n)
	}
	exports.mallocBuffer = mallocBuffer

	exports.clearCache = function clearCache() {
	  for(var i=0; i<32; ++i) {
	    POOL.UINT8[i].length = 0
	    POOL.UINT16[i].length = 0
	    POOL.UINT32[i].length = 0
	    POOL.INT8[i].length = 0
	    POOL.INT16[i].length = 0
	    POOL.INT32[i].length = 0
	    POOL.FLOAT[i].length = 0
	    POOL.DOUBLE[i].length = 0
	    POOL.UINT8C[i].length = 0
	    DATA[i].length = 0
	    BUFFER[i].length = 0
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(50).Buffer))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var base64 = __webpack_require__(51)
	var ieee754 = __webpack_require__(52)
	var isArray = __webpack_require__(53)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  function Foo () {}
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    arr.constructor = Foo
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Foo && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && object.buffer instanceof ArrayBuffer) {
	    return fromTypedArray(that, object)
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }

	  return res + decodeUtf8Char(tmp)
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start

	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	  var i = 0

	  for (; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (leadSurrogate) {
	        // 2 leads in a row
	        if (codePoint < 0xDC00) {
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          leadSurrogate = codePoint
	          continue
	        } else {
	          // valid surrogate pair
	          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	          leadSurrogate = null
	        }
	      } else {
	        // no lead yet

	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else {
	          // valid lead
	          leadSurrogate = codePoint
	          continue
	        }
	      }
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	      leadSurrogate = null
	    }

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x200000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50).Buffer))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(false ? (this.base64js = {}) : exports))


/***/ },
/* 52 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 53 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * Bit twiddling hacks for JavaScript.
	 *
	 * Author: Mikola Lysenko
	 *
	 * Ported from Stanford bit twiddling hack library:
	 *    http://graphics.stanford.edu/~seander/bithacks.html
	 */

	"use strict"; "use restrict";

	//Number of bits in an integer
	var INT_BITS = 32;

	//Constants
	exports.INT_BITS  = INT_BITS;
	exports.INT_MAX   =  0x7fffffff;
	exports.INT_MIN   = -1<<(INT_BITS-1);

	//Returns -1, 0, +1 depending on sign of x
	exports.sign = function(v) {
	  return (v > 0) - (v < 0);
	}

	//Computes absolute value of integer
	exports.abs = function(v) {
	  var mask = v >> (INT_BITS-1);
	  return (v ^ mask) - mask;
	}

	//Computes minimum of integers x and y
	exports.min = function(x, y) {
	  return y ^ ((x ^ y) & -(x < y));
	}

	//Computes maximum of integers x and y
	exports.max = function(x, y) {
	  return x ^ ((x ^ y) & -(x < y));
	}

	//Checks if a number is a power of two
	exports.isPow2 = function(v) {
	  return !(v & (v-1)) && (!!v);
	}

	//Computes log base 2 of v
	exports.log2 = function(v) {
	  var r, shift;
	  r =     (v > 0xFFFF) << 4; v >>>= r;
	  shift = (v > 0xFF  ) << 3; v >>>= shift; r |= shift;
	  shift = (v > 0xF   ) << 2; v >>>= shift; r |= shift;
	  shift = (v > 0x3   ) << 1; v >>>= shift; r |= shift;
	  return r | (v >> 1);
	}

	//Computes log base 10 of v
	exports.log10 = function(v) {
	  return  (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 :
	          (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 :
	          (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0;
	}

	//Counts number of bits
	exports.popCount = function(v) {
	  v = v - ((v >>> 1) & 0x55555555);
	  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
	  return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
	}

	//Counts number of trailing zeros
	function countTrailingZeros(v) {
	  var c = 32;
	  v &= -v;
	  if (v) c--;
	  if (v & 0x0000FFFF) c -= 16;
	  if (v & 0x00FF00FF) c -= 8;
	  if (v & 0x0F0F0F0F) c -= 4;
	  if (v & 0x33333333) c -= 2;
	  if (v & 0x55555555) c -= 1;
	  return c;
	}
	exports.countTrailingZeros = countTrailingZeros;

	//Rounds to next power of 2
	exports.nextPow2 = function(v) {
	  v += v === 0;
	  --v;
	  v |= v >>> 1;
	  v |= v >>> 2;
	  v |= v >>> 4;
	  v |= v >>> 8;
	  v |= v >>> 16;
	  return v + 1;
	}

	//Rounds down to previous power of 2
	exports.prevPow2 = function(v) {
	  v |= v >>> 1;
	  v |= v >>> 2;
	  v |= v >>> 4;
	  v |= v >>> 8;
	  v |= v >>> 16;
	  return v - (v>>>1);
	}

	//Computes parity of word
	exports.parity = function(v) {
	  v ^= v >>> 16;
	  v ^= v >>> 8;
	  v ^= v >>> 4;
	  v &= 0xf;
	  return (0x6996 >>> v) & 1;
	}

	var REVERSE_TABLE = new Array(256);

	(function(tab) {
	  for(var i=0; i<256; ++i) {
	    var v = i, r = i, s = 7;
	    for (v >>>= 1; v; v >>>= 1) {
	      r <<= 1;
	      r |= v & 1;
	      --s;
	    }
	    tab[i] = (r << s) & 0xff;
	  }
	})(REVERSE_TABLE);

	//Reverse bits in a 32 bit word
	exports.reverse = function(v) {
	  return  (REVERSE_TABLE[ v         & 0xff] << 24) |
	          (REVERSE_TABLE[(v >>> 8)  & 0xff] << 16) |
	          (REVERSE_TABLE[(v >>> 16) & 0xff] << 8)  |
	           REVERSE_TABLE[(v >>> 24) & 0xff];
	}

	//Interleave bits of 2 coordinates with 16 bits.  Useful for fast quadtree codes
	exports.interleave2 = function(x, y) {
	  x &= 0xFFFF;
	  x = (x | (x << 8)) & 0x00FF00FF;
	  x = (x | (x << 4)) & 0x0F0F0F0F;
	  x = (x | (x << 2)) & 0x33333333;
	  x = (x | (x << 1)) & 0x55555555;

	  y &= 0xFFFF;
	  y = (y | (y << 8)) & 0x00FF00FF;
	  y = (y | (y << 4)) & 0x0F0F0F0F;
	  y = (y | (y << 2)) & 0x33333333;
	  y = (y | (y << 1)) & 0x55555555;

	  return x | (y << 1);
	}

	//Extracts the nth interleaved component
	exports.deinterleave2 = function(v, n) {
	  v = (v >>> n) & 0x55555555;
	  v = (v | (v >>> 1))  & 0x33333333;
	  v = (v | (v >>> 2))  & 0x0F0F0F0F;
	  v = (v | (v >>> 4))  & 0x00FF00FF;
	  v = (v | (v >>> 16)) & 0x000FFFF;
	  return (v << 16) >> 16;
	}


	//Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes
	exports.interleave3 = function(x, y, z) {
	  x &= 0x3FF;
	  x  = (x | (x<<16)) & 4278190335;
	  x  = (x | (x<<8))  & 251719695;
	  x  = (x | (x<<4))  & 3272356035;
	  x  = (x | (x<<2))  & 1227133513;

	  y &= 0x3FF;
	  y  = (y | (y<<16)) & 4278190335;
	  y  = (y | (y<<8))  & 251719695;
	  y  = (y | (y<<4))  & 3272356035;
	  y  = (y | (y<<2))  & 1227133513;
	  x |= (y << 1);
	  
	  z &= 0x3FF;
	  z  = (z | (z<<16)) & 4278190335;
	  z  = (z | (z<<8))  & 251719695;
	  z  = (z | (z<<4))  & 3272356035;
	  z  = (z | (z<<2))  & 1227133513;
	  
	  return x | (z << 2);
	}

	//Extracts nth interleaved component of a 3-tuple
	exports.deinterleave3 = function(v, n) {
	  v = (v >>> n)       & 1227133513;
	  v = (v | (v>>>2))   & 3272356035;
	  v = (v | (v>>>4))   & 251719695;
	  v = (v | (v>>>8))   & 4278190335;
	  v = (v | (v>>>16))  & 0x3FF;
	  return (v<<22)>>22;
	}

	//Computes next combination in colexicographic order (this is mistakenly called nextPermutation on the bit twiddling hacks page)
	exports.nextCombination = function(v) {
	  var t = v | (v - 1);
	  return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros(v) + 1));
	}



/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict"

	function dupe_array(count, value, i) {
	  var c = count[i]|0
	  if(c <= 0) {
	    return []
	  }
	  var result = new Array(c), j
	  if(i === count.length-1) {
	    for(j=0; j<c; ++j) {
	      result[j] = value
	    }
	  } else {
	    for(j=0; j<c; ++j) {
	      result[j] = dupe_array(count, value, i+1)
	    }
	  }
	  return result
	}

	function dupe_number(count, value) {
	  var result, i
	  result = new Array(count)
	  for(i=0; i<count; ++i) {
	    result[i] = value
	  }
	  return result
	}

	function dupe(count, value) {
	  if(typeof value === "undefined") {
	    value = 0
	  }
	  switch(typeof count) {
	    case "number":
	      if(count > 0) {
	        return dupe_number(count|0, value)
	      }
	    break
	    case "object":
	      if(typeof (count.length) === "number") {
	        return dupe_array(count, value, 0)
	      }
	    break
	  }
	  return []
	}

	module.exports = dupe

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var compile = __webpack_require__(57)

	var EmptyProc = {
	  body: "",
	  args: [],
	  thisVars: [],
	  localVars: []
	}

	function fixup(x) {
	  if(!x) {
	    return EmptyProc
	  }
	  for(var i=0; i<x.args.length; ++i) {
	    var a = x.args[i]
	    if(i === 0) {
	      x.args[i] = {name: a, lvalue:true, rvalue: !!x.rvalue, count:x.count||1 }
	    } else {
	      x.args[i] = {name: a, lvalue:false, rvalue:true, count: 1}
	    }
	  }
	  if(!x.thisVars) {
	    x.thisVars = []
	  }
	  if(!x.localVars) {
	    x.localVars = []
	  }
	  return x
	}

	function pcompile(user_args) {
	  return compile({
	    args:     user_args.args,
	    pre:      fixup(user_args.pre),
	    body:     fixup(user_args.body),
	    post:     fixup(user_args.proc),
	    funcName: user_args.funcName
	  })
	}

	function makeOp(user_args) {
	  var args = []
	  for(var i=0; i<user_args.args.length; ++i) {
	    args.push("a"+i)
	  }
	  var wrapper = new Function("P", [
	    "return function ", user_args.funcName, "_ndarrayops(", args.join(","), ") {P(", args.join(","), ");return a0}"
	  ].join(""))
	  return wrapper(pcompile(user_args))
	}

	var assign_ops = {
	  add:  "+",
	  sub:  "-",
	  mul:  "*",
	  div:  "/",
	  mod:  "%",
	  band: "&",
	  bor:  "|",
	  bxor: "^",
	  lshift: "<<",
	  rshift: ">>",
	  rrshift: ">>>"
	}
	;(function(){
	  for(var id in assign_ops) {
	    var op = assign_ops[id]
	    exports[id] = makeOp({
	      args: ["array","array","array"],
	      body: {args:["a","b","c"],
	             body: "a=b"+op+"c"},
	      funcName: id
	    })
	    exports[id+"eq"] = makeOp({
	      args: ["array","array"],
	      body: {args:["a","b"],
	             body:"a"+op+"=b"},
	      rvalue: true,
	      funcName: id+"eq"
	    })
	    exports[id+"s"] = makeOp({
	      args: ["array", "array", "scalar"],
	      body: {args:["a","b","s"],
	             body:"a=b"+op+"s"},
	      funcName: id+"s"
	    })
	    exports[id+"seq"] = makeOp({
	      args: ["array","scalar"],
	      body: {args:["a","s"],
	             body:"a"+op+"=s"},
	      rvalue: true,
	      funcName: id+"seq"
	    })
	  }
	})();

	var unary_ops = {
	  not: "!",
	  bnot: "~",
	  neg: "-",
	  recip: "1.0/"
	}
	;(function(){
	  for(var id in unary_ops) {
	    var op = unary_ops[id]
	    exports[id] = makeOp({
	      args: ["array", "array"],
	      body: {args:["a","b"],
	             body:"a="+op+"b"},
	      funcName: id
	    })
	    exports[id+"eq"] = makeOp({
	      args: ["array"],
	      body: {args:["a"],
	             body:"a="+op+"a"},
	      rvalue: true,
	      count: 2,
	      funcName: id+"eq"
	    })
	  }
	})();

	var binary_ops = {
	  and: "&&",
	  or: "||",
	  eq: "===",
	  neq: "!==",
	  lt: "<",
	  gt: ">",
	  leq: "<=",
	  geq: ">="
	}
	;(function() {
	  for(var id in binary_ops) {
	    var op = binary_ops[id]
	    exports[id] = makeOp({
	      args: ["array","array","array"],
	      body: {args:["a", "b", "c"],
	             body:"a=b"+op+"c"},
	      funcName: id
	    })
	    exports[id+"s"] = makeOp({
	      args: ["array","array","scalar"],
	      body: {args:["a", "b", "s"],
	             body:"a=b"+op+"s"},
	      funcName: id+"s"
	    })
	    exports[id+"eq"] = makeOp({
	      args: ["array", "array"],
	      body: {args:["a", "b"],
	             body:"a=a"+op+"b"},
	      rvalue:true,
	      count:2,
	      funcName: id+"eq"
	    })
	    exports[id+"seq"] = makeOp({
	      args: ["array", "scalar"],
	      body: {args:["a","s"],
	             body:"a=a"+op+"s"},
	      rvalue:true,
	      count:2,
	      funcName: id+"seq"
	    })
	  }
	})();

	var math_unary = [
	  "abs",
	  "acos",
	  "asin",
	  "atan",
	  "ceil",
	  "cos",
	  "exp",
	  "floor",
	  "log",
	  "round",
	  "sin",
	  "sqrt",
	  "tan"
	]
	;(function() {
	  for(var i=0; i<math_unary.length; ++i) {
	    var f = math_unary[i]
	    exports[f] = makeOp({
	                    args: ["array", "array"],
	                    pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
	                    body: {args:["a","b"], body:"a=this_f(b)", thisVars:["this_f"]},
	                    funcName: f
	                  })
	    exports[f+"eq"] = makeOp({
	                      args: ["array"],
	                      pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
	                      body: {args: ["a"], body:"a=this_f(a)", thisVars:["this_f"]},
	                      rvalue: true,
	                      count: 2,
	                      funcName: f+"eq"
	                    })
	  }
	})();

	var math_comm = [
	  "max",
	  "min",
	  "atan2",
	  "pow"
	]
	;(function(){
	  for(var i=0; i<math_comm.length; ++i) {
	    var f= math_comm[i]
	    exports[f] = makeOp({
	                  args:["array", "array", "array"],
	                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
	                  body: {args:["a","b","c"], body:"a=this_f(b,c)", thisVars:["this_f"]},
	                  funcName: f
	                })
	    exports[f+"s"] = makeOp({
	                  args:["array", "array", "scalar"],
	                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
	                  body: {args:["a","b","c"], body:"a=this_f(b,c)", thisVars:["this_f"]},
	                  funcName: f+"s"
	                  })
	    exports[f+"eq"] = makeOp({ args:["array", "array"],
	                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
	                  body: {args:["a","b"], body:"a=this_f(a,b)", thisVars:["this_f"]},
	                  rvalue: true,
	                  count: 2,
	                  funcName: f+"eq"
	                  })
	    exports[f+"seq"] = makeOp({ args:["array", "scalar"],
	                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
	                  body: {args:["a","b"], body:"a=this_f(a,b)", thisVars:["this_f"]},
	                  rvalue:true,
	                  count:2,
	                  funcName: f+"seq"
	                  })
	  }
	})();

	var math_noncomm = [
	  "atan2",
	  "pow"
	]
	;(function(){
	  for(var i=0; i<math_noncomm.length; ++i) {
	    var f= math_noncomm[i]
	    exports[f+"op"] = makeOp({
	                  args:["array", "array", "array"],
	                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
	                  body: {args:["a","b","c"], body:"a=this_f(c,b)", thisVars:["this_f"]},
	                  funcName: f+"op"
	                })
	    exports[f+"ops"] = makeOp({
	                  args:["array", "array", "scalar"],
	                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
	                  body: {args:["a","b","c"], body:"a=this_f(c,b)", thisVars:["this_f"]},
	                  funcName: f+"ops"
	                  })
	    exports[f+"opeq"] = makeOp({ args:["array", "array"],
	                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
	                  body: {args:["a","b"], body:"a=this_f(b,a)", thisVars:["this_f"]},
	                  rvalue: true,
	                  count: 2,
	                  funcName: f+"opeq"
	                  })
	    exports[f+"opseq"] = makeOp({ args:["array", "scalar"],
	                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
	                  body: {args:["a","b"], body:"a=this_f(b,a)", thisVars:["this_f"]},
	                  rvalue:true,
	                  count:2,
	                  funcName: f+"opseq"
	                  })
	  }
	})();

	exports.any = compile({
	  args:["array"],
	  pre: EmptyProc,
	  body: {args:[{name:"a", lvalue:false, rvalue:true, count:1}], body: "if(a){return true}", localVars: [], thisVars: []},
	  post: {args:[], localVars:[], thisVars:[], body:"return false"},
	  funcName: "any"
	})

	exports.all = compile({
	  args:["array"],
	  pre: EmptyProc,
	  body: {args:[{name:"x", lvalue:false, rvalue:true, count:1}], body: "if(!x){return false}", localVars: [], thisVars: []},
	  post: {args:[], localVars:[], thisVars:[], body:"return true"},
	  funcName: "all"
	})

	exports.sum = compile({
	  args:["array"],
	  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
	  body: {args:[{name:"a", lvalue:false, rvalue:true, count:1}], body: "this_s+=a", localVars: [], thisVars: ["this_s"]},
	  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
	  funcName: "sum"
	})

	exports.prod = compile({
	  args:["array"],
	  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=1"},
	  body: {args:[{name:"a", lvalue:false, rvalue:true, count:1}], body: "this_s*=a", localVars: [], thisVars: ["this_s"]},
	  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
	  funcName: "prod"
	})

	exports.norm2squared = compile({
	  args:["array"],
	  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
	  body: {args:[{name:"a", lvalue:false, rvalue:true, count:2}], body: "this_s+=a*a", localVars: [], thisVars: ["this_s"]},
	  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
	  funcName: "norm2squared"
	})
	  
	exports.norm2 = compile({
	  args:["array"],
	  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
	  body: {args:[{name:"a", lvalue:false, rvalue:true, count:2}], body: "this_s+=a*a", localVars: [], thisVars: ["this_s"]},
	  post: {args:[], localVars:[], thisVars:["this_s"], body:"return Math.sqrt(this_s)"},
	  funcName: "norm2"
	})
	  

	exports.norminf = compile({
	  args:["array"],
	  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
	  body: {args:[{name:"a", lvalue:false, rvalue:true, count:4}], body:"if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}", localVars: [], thisVars: ["this_s"]},
	  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
	  funcName: "norminf"
	})

	exports.norm1 = compile({
	  args:["array"],
	  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
	  body: {args:[{name:"a", lvalue:false, rvalue:true, count:3}], body: "this_s+=a<0?-a:a", localVars: [], thisVars: ["this_s"]},
	  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
	  funcName: "norm1"
	})

	exports.sup = compile({
	  args: [ "array" ],
	  pre:
	   { body: "this_h=-Infinity",
	     args: [],
	     thisVars: [ "this_h" ],
	     localVars: [] },
	  body:
	   { body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
	     args: [{"name":"_inline_1_arg0_","lvalue":false,"rvalue":true,"count":2} ],
	     thisVars: [ "this_h" ],
	     localVars: [] },
	  post:
	   { body: "return this_h",
	     args: [],
	     thisVars: [ "this_h" ],
	     localVars: [] }
	 })

	exports.inf = compile({
	  args: [ "array" ],
	  pre:
	   { body: "this_h=Infinity",
	     args: [],
	     thisVars: [ "this_h" ],
	     localVars: [] },
	  body:
	   { body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
	     args: [{"name":"_inline_1_arg0_","lvalue":false,"rvalue":true,"count":2} ],
	     thisVars: [ "this_h" ],
	     localVars: [] },
	  post:
	   { body: "return this_h",
	     args: [],
	     thisVars: [ "this_h" ],
	     localVars: [] }
	 })

	exports.argmin = compile({
	  args:["index","array","shape"],
	  pre:{
	    body:"{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
	    args:[
	      {name:"_inline_0_arg0_",lvalue:false,rvalue:false,count:0},
	      {name:"_inline_0_arg1_",lvalue:false,rvalue:false,count:0},
	      {name:"_inline_0_arg2_",lvalue:false,rvalue:true,count:1}
	      ],
	    thisVars:["this_i","this_v"],
	    localVars:[]},
	  body:{
	    body:"{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
	    args:[
	      {name:"_inline_1_arg0_",lvalue:false,rvalue:true,count:2},
	      {name:"_inline_1_arg1_",lvalue:false,rvalue:true,count:2}],
	    thisVars:["this_i","this_v"],
	    localVars:["_inline_1_k"]},
	  post:{
	    body:"{return this_i}",
	    args:[],
	    thisVars:["this_i"],
	    localVars:[]}
	})

	exports.argmax = compile({
	  args:["index","array","shape"],
	  pre:{
	    body:"{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
	    args:[
	      {name:"_inline_0_arg0_",lvalue:false,rvalue:false,count:0},
	      {name:"_inline_0_arg1_",lvalue:false,rvalue:false,count:0},
	      {name:"_inline_0_arg2_",lvalue:false,rvalue:true,count:1}
	      ],
	    thisVars:["this_i","this_v"],
	    localVars:[]},
	  body:{
	    body:"{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
	    args:[
	      {name:"_inline_1_arg0_",lvalue:false,rvalue:true,count:2},
	      {name:"_inline_1_arg1_",lvalue:false,rvalue:true,count:2}],
	    thisVars:["this_i","this_v"],
	    localVars:["_inline_1_k"]},
	  post:{
	    body:"{return this_i}",
	    args:[],
	    thisVars:["this_i"],
	    localVars:[]}
	})  

	exports.random = makeOp({
	  args: ["array"],
	  pre: {args:[], body:"this_f=Math.random", thisVars:["this_f"]},
	  body: {args: ["a"], body:"a=this_f()", thisVars:["this_f"]},
	  funcName: "random"
	})

	exports.assign = makeOp({
	  args:["array", "array"],
	  body: {args:["a", "b"], body:"a=b"},
	  funcName: "assign" })

	exports.assigns = makeOp({
	  args:["array", "scalar"],
	  body: {args:["a", "b"], body:"a=b"},
	  funcName: "assigns" })


	exports.equals = compile({
	  args:["array", "array"],
	  pre: EmptyProc,
	  body: {args:[{name:"x", lvalue:false, rvalue:true, count:1},
	               {name:"y", lvalue:false, rvalue:true, count:1}], 
	        body: "if(x!==y){return false}", 
	        localVars: [], 
	        thisVars: []},
	  post: {args:[], localVars:[], thisVars:[], body:"return true"},
	  funcName: "equals"
	})




/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var createThunk = __webpack_require__(58)

	function Procedure() {
	  this.argTypes = []
	  this.shimArgs = []
	  this.arrayArgs = []
	  this.arrayBlockIndices = []
	  this.scalarArgs = []
	  this.offsetArgs = []
	  this.offsetArgIndex = []
	  this.indexArgs = []
	  this.shapeArgs = []
	  this.funcName = ""
	  this.pre = null
	  this.body = null
	  this.post = null
	  this.debug = false
	}

	function compileCwise(user_args) {
	  //Create procedure
	  var proc = new Procedure()
	  
	  //Parse blocks
	  proc.pre    = user_args.pre
	  proc.body   = user_args.body
	  proc.post   = user_args.post

	  //Parse arguments
	  var proc_args = user_args.args.slice(0)
	  proc.argTypes = proc_args
	  for(var i=0; i<proc_args.length; ++i) {
	    var arg_type = proc_args[i]
	    if(arg_type === "array" || (typeof arg_type === "object" && arg_type.blockIndices)) {
	      proc.argTypes[i] = "array"
	      proc.arrayArgs.push(i)
	      proc.arrayBlockIndices.push(arg_type.blockIndices ? arg_type.blockIndices : 0)
	      proc.shimArgs.push("array" + i)
	      if(i < proc.pre.args.length && proc.pre.args[i].count>0) {
	        throw new Error("cwise: pre() block may not reference array args")
	      }
	      if(i < proc.post.args.length && proc.post.args[i].count>0) {
	        throw new Error("cwise: post() block may not reference array args")
	      }
	    } else if(arg_type === "scalar") {
	      proc.scalarArgs.push(i)
	      proc.shimArgs.push("scalar" + i)
	    } else if(arg_type === "index") {
	      proc.indexArgs.push(i)
	      if(i < proc.pre.args.length && proc.pre.args[i].count > 0) {
	        throw new Error("cwise: pre() block may not reference array index")
	      }
	      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
	        throw new Error("cwise: body() block may not write to array index")
	      }
	      if(i < proc.post.args.length && proc.post.args[i].count > 0) {
	        throw new Error("cwise: post() block may not reference array index")
	      }
	    } else if(arg_type === "shape") {
	      proc.shapeArgs.push(i)
	      if(i < proc.pre.args.length && proc.pre.args[i].lvalue) {
	        throw new Error("cwise: pre() block may not write to array shape")
	      }
	      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
	        throw new Error("cwise: body() block may not write to array shape")
	      }
	      if(i < proc.post.args.length && proc.post.args[i].lvalue) {
	        throw new Error("cwise: post() block may not write to array shape")
	      }
	    } else if(typeof arg_type === "object" && arg_type.offset) {
	      proc.argTypes[i] = "offset"
	      proc.offsetArgs.push({ array: arg_type.array, offset:arg_type.offset })
	      proc.offsetArgIndex.push(i)
	    } else {
	      throw new Error("cwise: Unknown argument type " + proc_args[i])
	    }
	  }
	  
	  //Make sure at least one array argument was specified
	  if(proc.arrayArgs.length <= 0) {
	    throw new Error("cwise: No array arguments specified")
	  }
	  
	  //Make sure arguments are correct
	  if(proc.pre.args.length > proc_args.length) {
	    throw new Error("cwise: Too many arguments in pre() block")
	  }
	  if(proc.body.args.length > proc_args.length) {
	    throw new Error("cwise: Too many arguments in body() block")
	  }
	  if(proc.post.args.length > proc_args.length) {
	    throw new Error("cwise: Too many arguments in post() block")
	  }

	  //Check debug flag
	  proc.debug = !!user_args.printCode || !!user_args.debug
	  
	  //Retrieve name
	  proc.funcName = user_args.funcName || "cwise"
	  
	  //Read in block size
	  proc.blockSize = user_args.blockSize || 64

	  return createThunk(proc)
	}

	module.exports = compileCwise


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	// The function below is called when constructing a cwise function object, and does the following:
	// A function object is constructed which accepts as argument a compilation function and returns another function.
	// It is this other function that is eventually returned by createThunk, and this function is the one that actually
	// checks whether a certain pattern of arguments has already been used before and compiles new loops as needed.
	// The compilation passed to the first function object is used for compiling new functions.
	// Once this function object is created, it is called with compile as argument, where the first argument of compile
	// is bound to "proc" (essentially containing a preprocessed version of the user arguments to cwise).
	// So createThunk roughly works like this:
	// function createThunk(proc) {
	//   var thunk = function(compileBound) {
	//     var CACHED = {}
	//     return function(arrays and scalars) {
	//       if (dtype and order of arrays in CACHED) {
	//         var func = CACHED[dtype and order of arrays]
	//       } else {
	//         var func = CACHED[dtype and order of arrays] = compileBound(dtype and order of arrays)
	//       }
	//       return func(arrays and scalars)
	//     }
	//   }
	//   return thunk(compile.bind1(proc))
	// }

	var compile = __webpack_require__(59)

	function createThunk(proc) {
	  var code = ["'use strict'", "var CACHED={}"]
	  var vars = []
	  var thunkName = proc.funcName + "_cwise_thunk"
	  
	  //Build thunk
	  code.push(["return function ", thunkName, "(", proc.shimArgs.join(","), "){"].join(""))
	  var typesig = []
	  var string_typesig = []
	  var proc_args = [["array",proc.arrayArgs[0],".shape.slice(", // Slice shape so that we only retain the shape over which we iterate (which gets passed to the cwise operator as SS).
	                    Math.max(0,proc.arrayBlockIndices[0]),proc.arrayBlockIndices[0]<0?(","+proc.arrayBlockIndices[0]+")"):")"].join("")]
	  var shapeLengthConditions = [], shapeConditions = []
	  // Process array arguments
	  for(var i=0; i<proc.arrayArgs.length; ++i) {
	    var j = proc.arrayArgs[i]
	    vars.push(["t", j, "=array", j, ".dtype,",
	               "r", j, "=array", j, ".order"].join(""))
	    typesig.push("t" + j)
	    typesig.push("r" + j)
	    string_typesig.push("t"+j)
	    string_typesig.push("r"+j+".join()")
	    proc_args.push("array" + j + ".data")
	    proc_args.push("array" + j + ".stride")
	    proc_args.push("array" + j + ".offset|0")
	    if (i>0) { // Gather conditions to check for shape equality (ignoring block indices)
	      shapeLengthConditions.push("array" + proc.arrayArgs[0] + ".shape.length===array" + j + ".shape.length+" + (Math.abs(proc.arrayBlockIndices[0])-Math.abs(proc.arrayBlockIndices[i])))
	      shapeConditions.push("array" + proc.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0,proc.arrayBlockIndices[0]) + "]===array" + j + ".shape[shapeIndex+" + Math.max(0,proc.arrayBlockIndices[i]) + "]")
	    }
	  }
	  // Check for shape equality
	  if (proc.arrayArgs.length > 1) {
	    code.push("if (!(" + shapeLengthConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')")
	    code.push("for(var shapeIndex=array" + proc.arrayArgs[0] + ".shape.length-" + Math.abs(proc.arrayBlockIndices[0]) + "; shapeIndex-->0;) {")
	    code.push("if (!(" + shapeConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')")
	    code.push("}")
	  }
	  // Process scalar arguments
	  for(var i=0; i<proc.scalarArgs.length; ++i) {
	    proc_args.push("scalar" + proc.scalarArgs[i])
	  }
	  // Check for cached function (and if not present, generate it)
	  vars.push(["type=[", string_typesig.join(","), "].join()"].join(""))
	  vars.push("proc=CACHED[type]")
	  code.push("var " + vars.join(","))
	  
	  code.push(["if(!proc){",
	             "CACHED[type]=proc=compile([", typesig.join(","), "])}",
	             "return proc(", proc_args.join(","), ")}"].join(""))

	  if(proc.debug) {
	    console.log("-----Generated thunk:\n" + code.join("\n") + "\n----------")
	  }
	  
	  //Compile thunk
	  var thunk = new Function("compile", code.join("\n"))
	  return thunk(compile.bind(undefined, proc))
	}

	module.exports = createThunk


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var uniq = __webpack_require__(60)

	// This function generates very simple loops analogous to how you typically traverse arrays (the outermost loop corresponds to the slowest changing index, the innermost loop to the fastest changing index)
	// TODO: If two arrays have the same strides (and offsets) there is potential for decreasing the number of "pointers" and related variables. The drawback is that the type signature would become more specific and that there would thus be less potential for caching, but it might still be worth it, especially when dealing with large numbers of arguments.
	function innerFill(order, proc, body) {
	  var dimension = order.length
	    , nargs = proc.arrayArgs.length
	    , has_index = proc.indexArgs.length>0
	    , code = []
	    , vars = []
	    , idx=0, pidx=0, i, j
	  for(i=0; i<dimension; ++i) { // Iteration variables
	    vars.push(["i",i,"=0"].join(""))
	  }
	  //Compute scan deltas
	  for(j=0; j<nargs; ++j) {
	    for(i=0; i<dimension; ++i) {
	      pidx = idx
	      idx = order[i]
	      if(i === 0) { // The innermost/fastest dimension's delta is simply its stride
	        vars.push(["d",j,"s",i,"=t",j,"p",idx].join(""))
	      } else { // For other dimensions the delta is basically the stride minus something which essentially "rewinds" the previous (more inner) dimension
	        vars.push(["d",j,"s",i,"=(t",j,"p",idx,"-s",pidx,"*t",j,"p",pidx,")"].join(""))
	      }
	    }
	  }
	  code.push("var " + vars.join(","))
	  //Scan loop
	  for(i=dimension-1; i>=0; --i) { // Start at largest stride and work your way inwards
	    idx = order[i]
	    code.push(["for(i",i,"=0;i",i,"<s",idx,";++i",i,"){"].join(""))
	  }
	  //Push body of inner loop
	  code.push(body)
	  //Advance scan pointers
	  for(i=0; i<dimension; ++i) {
	    pidx = idx
	    idx = order[i]
	    for(j=0; j<nargs; ++j) {
	      code.push(["p",j,"+=d",j,"s",i].join(""))
	    }
	    if(has_index) {
	      if(i > 0) {
	        code.push(["index[",pidx,"]-=s",pidx].join(""))
	      }
	      code.push(["++index[",idx,"]"].join(""))
	    }
	    code.push("}")
	  }
	  return code.join("\n")
	}

	// Generate "outer" loops that loop over blocks of data, applying "inner" loops to the blocks by manipulating the local variables in such a way that the inner loop only "sees" the current block.
	// TODO: If this is used, then the previous declaration (done by generateCwiseOp) of s* is essentially unnecessary.
	//       I believe the s* are not used elsewhere (in particular, I don't think they're used in the pre/post parts and "shape" is defined independently), so it would be possible to make defining the s* dependent on what loop method is being used.
	function outerFill(matched, order, proc, body) {
	  var dimension = order.length
	    , nargs = proc.arrayArgs.length
	    , blockSize = proc.blockSize
	    , has_index = proc.indexArgs.length > 0
	    , code = []
	  for(var i=0; i<nargs; ++i) {
	    code.push(["var offset",i,"=p",i].join(""))
	  }
	  //Generate loops for unmatched dimensions
	  // The order in which these dimensions are traversed is fairly arbitrary (from small stride to large stride, for the first argument)
	  // TODO: It would be nice if the order in which these loops are placed would also be somehow "optimal" (at the very least we should check that it really doesn't hurt us if they're not).
	  for(var i=matched; i<dimension; ++i) {
	    code.push(["for(var j"+i+"=SS[", order[i], "]|0;j", i, ">0;){"].join("")) // Iterate back to front
	    code.push(["if(j",i,"<",blockSize,"){"].join("")) // Either decrease j by blockSize (s = blockSize), or set it to zero (after setting s = j).
	    code.push(["s",order[i],"=j",i].join(""))
	    code.push(["j",i,"=0"].join(""))
	    code.push(["}else{s",order[i],"=",blockSize].join(""))
	    code.push(["j",i,"-=",blockSize,"}"].join(""))
	    if(has_index) {
	      code.push(["index[",order[i],"]=j",i].join(""))
	    }
	  }
	  for(var i=0; i<nargs; ++i) {
	    var indexStr = ["offset"+i]
	    for(var j=matched; j<dimension; ++j) {
	      indexStr.push(["j",j,"*t",i,"p",order[j]].join(""))
	    }
	    code.push(["p",i,"=(",indexStr.join("+"),")"].join(""))
	  }
	  code.push(innerFill(order, proc, body))
	  for(var i=matched; i<dimension; ++i) {
	    code.push("}")
	  }
	  return code.join("\n")
	}

	//Count the number of compatible inner orders
	// This is the length of the longest common prefix of the arrays in orders.
	// Each array in orders lists the dimensions of the correspond ndarray in order of increasing stride.
	// This is thus the maximum number of dimensions that can be efficiently traversed by simple nested loops for all arrays.
	function countMatches(orders) {
	  var matched = 0, dimension = orders[0].length
	  while(matched < dimension) {
	    for(var j=1; j<orders.length; ++j) {
	      if(orders[j][matched] !== orders[0][matched]) {
	        return matched
	      }
	    }
	    ++matched
	  }
	  return matched
	}

	//Processes a block according to the given data types
	// Replaces variable names by different ones, either "local" ones (that are then ferried in and out of the given array) or ones matching the arguments that the function performing the ultimate loop will accept.
	function processBlock(block, proc, dtypes) {
	  var code = block.body
	  var pre = []
	  var post = []
	  for(var i=0; i<block.args.length; ++i) {
	    var carg = block.args[i]
	    if(carg.count <= 0) {
	      continue
	    }
	    var re = new RegExp(carg.name, "g")
	    var ptrStr = ""
	    var arrNum = proc.arrayArgs.indexOf(i)
	    switch(proc.argTypes[i]) {
	      case "offset":
	        var offArgIndex = proc.offsetArgIndex.indexOf(i)
	        var offArg = proc.offsetArgs[offArgIndex]
	        arrNum = offArg.array
	        ptrStr = "+q" + offArgIndex // Adds offset to the "pointer" in the array
	      case "array":
	        ptrStr = "p" + arrNum + ptrStr
	        var localStr = "l" + i
	        var arrStr = "a" + arrNum
	        if (proc.arrayBlockIndices[arrNum] === 0) { // Argument to body is just a single value from this array
	          if(carg.count === 1) { // Argument/array used only once(?)
	            if(dtypes[arrNum] === "generic") {
	              if(carg.lvalue) {
	                pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)
	                code = code.replace(re, localStr)
	                post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
	              } else {
	                code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
	              }
	            } else {
	              code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""))
	            }
	          } else if(dtypes[arrNum] === "generic") {
	            pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // TODO: Could we optimize by checking for carg.rvalue?
	            code = code.replace(re, localStr)
	            if(carg.lvalue) {
	              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
	            }
	          } else {
	            pre.push(["var ", localStr, "=", arrStr, "[", ptrStr, "]"].join("")) // TODO: Could we optimize by checking for carg.rvalue?
	            code = code.replace(re, localStr)
	            if(carg.lvalue) {
	              post.push([arrStr, "[", ptrStr, "]=", localStr].join(""))
	            }
	          }
	        } else { // Argument to body is a "block"
	          var reStrArr = [carg.name], ptrStrArr = [ptrStr]
	          for(var j=0; j<Math.abs(proc.arrayBlockIndices[arrNum]); j++) {
	            reStrArr.push("\\s*\\[([^\\]]+)\\]")
	            ptrStrArr.push("$" + (j+1) + "*t" + arrNum + "b" + j) // Matched index times stride
	          }
	          re = new RegExp(reStrArr.join(""), "g")
	          ptrStr = ptrStrArr.join("+")
	          if(dtypes[arrNum] === "generic") {
	            /*if(carg.lvalue) {
	              pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)
	              code = code.replace(re, localStr)
	              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
	            } else {
	              code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
	            }*/
	            throw new Error("cwise: Generic arrays not supported in combination with blocks!")
	          } else {
	            // This does not produce any local variables, even if variables are used multiple times. It would be possible to do so, but it would complicate things quite a bit.
	            code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""))
	          }
	        }
	      break
	      case "scalar":
	        code = code.replace(re, "Y" + proc.scalarArgs.indexOf(i))
	      break
	      case "index":
	        code = code.replace(re, "index")
	      break
	      case "shape":
	        code = code.replace(re, "shape")
	      break
	    }
	  }
	  return [pre.join("\n"), code, post.join("\n")].join("\n").trim()
	}

	function typeSummary(dtypes) {
	  var summary = new Array(dtypes.length)
	  var allEqual = true
	  for(var i=0; i<dtypes.length; ++i) {
	    var t = dtypes[i]
	    var digits = t.match(/\d+/)
	    if(!digits) {
	      digits = ""
	    } else {
	      digits = digits[0]
	    }
	    if(t.charAt(0) === 0) {
	      summary[i] = "u" + t.charAt(1) + digits
	    } else {
	      summary[i] = t.charAt(0) + digits
	    }
	    if(i > 0) {
	      allEqual = allEqual && summary[i] === summary[i-1]
	    }
	  }
	  if(allEqual) {
	    return summary[0]
	  }
	  return summary.join("")
	}

	//Generates a cwise operator
	function generateCWiseOp(proc, typesig) {

	  //Compute dimension
	  // Arrays get put first in typesig, and there are two entries per array (dtype and order), so this gets the number of dimensions in the first array arg.
	  var dimension = (typesig[1].length - Math.abs(proc.arrayBlockIndices[0]))|0
	  var orders = new Array(proc.arrayArgs.length)
	  var dtypes = new Array(proc.arrayArgs.length)
	  for(var i=0; i<proc.arrayArgs.length; ++i) {
	    dtypes[i] = typesig[2*i]
	    orders[i] = typesig[2*i+1]
	  }
	  
	  //Determine where block and loop indices start and end
	  var blockBegin = [], blockEnd = [] // These indices are exposed as blocks
	  var loopBegin = [], loopEnd = [] // These indices are iterated over
	  var loopOrders = [] // orders restricted to the loop indices
	  for(var i=0; i<proc.arrayArgs.length; ++i) {
	    if (proc.arrayBlockIndices[i]<0) {
	      loopBegin.push(0)
	      loopEnd.push(dimension)
	      blockBegin.push(dimension)
	      blockEnd.push(dimension+proc.arrayBlockIndices[i])
	    } else {
	      loopBegin.push(proc.arrayBlockIndices[i]) // Non-negative
	      loopEnd.push(proc.arrayBlockIndices[i]+dimension)
	      blockBegin.push(0)
	      blockEnd.push(proc.arrayBlockIndices[i])
	    }
	    var newOrder = []
	    for(var j=0; j<orders[i].length; j++) {
	      if (loopBegin[i]<=orders[i][j] && orders[i][j]<loopEnd[i]) {
	        newOrder.push(orders[i][j]-loopBegin[i]) // If this is a loop index, put it in newOrder, subtracting loopBegin, to make sure that all loopOrders are using a common set of indices.
	      }
	    }
	    loopOrders.push(newOrder)
	  }

	  //First create arguments for procedure
	  var arglist = ["SS"] // SS is the overall shape over which we iterate
	  var code = ["'use strict'"]
	  var vars = []
	  
	  for(var j=0; j<dimension; ++j) {
	    vars.push(["s", j, "=SS[", j, "]"].join("")) // The limits for each dimension.
	  }
	  for(var i=0; i<proc.arrayArgs.length; ++i) {
	    arglist.push("a"+i) // Actual data array
	    arglist.push("t"+i) // Strides
	    arglist.push("p"+i) // Offset in the array at which the data starts (also used for iterating over the data)
	    
	    for(var j=0; j<dimension; ++j) { // Unpack the strides into vars for looping
	      vars.push(["t",i,"p",j,"=t",i,"[",loopBegin[i]+j,"]"].join(""))
	    }
	    
	    for(var j=0; j<Math.abs(proc.arrayBlockIndices[i]); ++j) { // Unpack the strides into vars for block iteration
	      vars.push(["t",i,"b",j,"=t",i,"[",blockBegin[i]+j,"]"].join(""))
	    }
	  }
	  for(var i=0; i<proc.scalarArgs.length; ++i) {
	    arglist.push("Y" + i)
	  }
	  if(proc.shapeArgs.length > 0) {
	    vars.push("shape=SS.slice(0)") // Makes the shape over which we iterate available to the user defined functions (so you can use width/height for example)
	  }
	  if(proc.indexArgs.length > 0) {
	    // Prepare an array to keep track of the (logical) indices, initialized to dimension zeroes.
	    var zeros = new Array(dimension)
	    for(var i=0; i<dimension; ++i) {
	      zeros[i] = "0"
	    }
	    vars.push(["index=[", zeros.join(","), "]"].join(""))
	  }
	  for(var i=0; i<proc.offsetArgs.length; ++i) { // Offset arguments used for stencil operations
	    var off_arg = proc.offsetArgs[i]
	    var init_string = []
	    for(var j=0; j<off_arg.offset.length; ++j) {
	      if(off_arg.offset[j] === 0) {
	        continue
	      } else if(off_arg.offset[j] === 1) {
	        init_string.push(["t", off_arg.array, "p", j].join(""))      
	      } else {
	        init_string.push([off_arg.offset[j], "*t", off_arg.array, "p", j].join(""))
	      }
	    }
	    if(init_string.length === 0) {
	      vars.push("q" + i + "=0")
	    } else {
	      vars.push(["q", i, "=", init_string.join("+")].join(""))
	    }
	  }

	  //Prepare this variables
	  var thisVars = uniq([].concat(proc.pre.thisVars)
	                      .concat(proc.body.thisVars)
	                      .concat(proc.post.thisVars))
	  vars = vars.concat(thisVars)
	  code.push("var " + vars.join(","))
	  for(var i=0; i<proc.arrayArgs.length; ++i) {
	    code.push("p"+i+"|=0")
	  }
	  
	  //Inline prelude
	  if(proc.pre.body.length > 3) {
	    code.push(processBlock(proc.pre, proc, dtypes))
	  }

	  //Process body
	  var body = processBlock(proc.body, proc, dtypes)
	  var matched = countMatches(loopOrders)
	  if(matched < dimension) {
	    code.push(outerFill(matched, loopOrders[0], proc, body)) // TODO: Rather than passing loopOrders[0], it might be interesting to look at passing an order that represents the majority of the arguments for example.
	  } else {
	    code.push(innerFill(loopOrders[0], proc, body))
	  }

	  //Inline epilog
	  if(proc.post.body.length > 3) {
	    code.push(processBlock(proc.post, proc, dtypes))
	  }
	  
	  if(proc.debug) {
	    console.log("-----Generated cwise routine for ", typesig, ":\n" + code.join("\n") + "\n----------")
	  }
	  
	  var loopName = [(proc.funcName||"unnamed"), "_cwise_loop_", orders[0].join("s"),"m",matched,typeSummary(dtypes)].join("")
	  var f = new Function(["function ",loopName,"(", arglist.join(","),"){", code.join("\n"),"} return ", loopName].join(""))
	  return f()
	}
	module.exports = generateCWiseOp


/***/ },
/* 60 */
/***/ function(module, exports) {

	"use strict"

	function unique_pred(list, compare) {
	  var ptr = 1
	    , len = list.length
	    , a=list[0], b=list[0]
	  for(var i=1; i<len; ++i) {
	    b = a
	    a = list[i]
	    if(compare(a, b)) {
	      if(i === ptr) {
	        ptr++
	        continue
	      }
	      list[ptr++] = a
	    }
	  }
	  list.length = ptr
	  return list
	}

	function unique_eq(list) {
	  var ptr = 1
	    , len = list.length
	    , a=list[0], b = list[0]
	  for(var i=1; i<len; ++i, b=a) {
	    b = a
	    a = list[i]
	    if(a !== b) {
	      if(i === ptr) {
	        ptr++
	        continue
	      }
	      list[ptr++] = a
	    }
	  }
	  list.length = ptr
	  return list
	}

	function unique(list, compare, sorted) {
	  if(list.length === 0) {
	    return list
	  }
	  if(compare) {
	    if(!sorted) {
	      list.sort(compare)
	    }
	    return unique_pred(list, compare)
	  }
	  if(!sorted) {
	    list.sort()
	  }
	  return unique_eq(list)
	}

	module.exports = unique


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var iota = __webpack_require__(62)
	var isBuffer = __webpack_require__(63)

	var hasTypedArrays  = ((typeof Float64Array) !== "undefined")

	function compare1st(a, b) {
	  return a[0] - b[0]
	}

	function order() {
	  var stride = this.stride
	  var terms = new Array(stride.length)
	  var i
	  for(i=0; i<terms.length; ++i) {
	    terms[i] = [Math.abs(stride[i]), i]
	  }
	  terms.sort(compare1st)
	  var result = new Array(terms.length)
	  for(i=0; i<result.length; ++i) {
	    result[i] = terms[i][1]
	  }
	  return result
	}

	function compileConstructor(dtype, dimension) {
	  var className = ["View", dimension, "d", dtype].join("")
	  if(dimension < 0) {
	    className = "View_Nil" + dtype
	  }
	  var useGetters = (dtype === "generic")

	  if(dimension === -1) {
	    //Special case for trivial arrays
	    var code =
	      "function "+className+"(a){this.data=a;};\
	var proto="+className+".prototype;\
	proto.dtype='"+dtype+"';\
	proto.index=function(){return -1};\
	proto.size=0;\
	proto.dimension=-1;\
	proto.shape=proto.stride=proto.order=[];\
	proto.lo=proto.hi=proto.transpose=proto.step=\
	function(){return new "+className+"(this.data);};\
	proto.get=proto.set=function(){};\
	proto.pick=function(){return null};\
	return function construct_"+className+"(a){return new "+className+"(a);}"
	    var procedure = new Function(code)
	    return procedure()
	  } else if(dimension === 0) {
	    //Special case for 0d arrays
	    var code =
	      "function "+className+"(a,d) {\
	this.data = a;\
	this.offset = d\
	};\
	var proto="+className+".prototype;\
	proto.dtype='"+dtype+"';\
	proto.index=function(){return this.offset};\
	proto.dimension=0;\
	proto.size=1;\
	proto.shape=\
	proto.stride=\
	proto.order=[];\
	proto.lo=\
	proto.hi=\
	proto.transpose=\
	proto.step=function "+className+"_copy() {\
	return new "+className+"(this.data,this.offset)\
	};\
	proto.pick=function "+className+"_pick(){\
	return TrivialArray(this.data);\
	};\
	proto.valueOf=proto.get=function "+className+"_get(){\
	return "+(useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]")+
	"};\
	proto.set=function "+className+"_set(v){\
	return "+(useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v")+"\
	};\
	return function construct_"+className+"(a,b,c,d){return new "+className+"(a,d)}"
	    var procedure = new Function("TrivialArray", code)
	    return procedure(CACHED_CONSTRUCTORS[dtype][0])
	  }

	  var code = ["'use strict'"]

	  //Create constructor for view
	  var indices = iota(dimension)
	  var args = indices.map(function(i) { return "i"+i })
	  var index_str = "this.offset+" + indices.map(function(i) {
	        return "this.stride[" + i + "]*i" + i
	      }).join("+")
	  var shapeArg = indices.map(function(i) {
	      return "b"+i
	    }).join(",")
	  var strideArg = indices.map(function(i) {
	      return "c"+i
	    }).join(",")
	  code.push(
	    "function "+className+"(a," + shapeArg + "," + strideArg + ",d){this.data=a",
	      "this.shape=[" + shapeArg + "]",
	      "this.stride=[" + strideArg + "]",
	      "this.offset=d|0}",
	    "var proto="+className+".prototype",
	    "proto.dtype='"+dtype+"'",
	    "proto.dimension="+dimension)

	  //view.size:
	  code.push("Object.defineProperty(proto,'size',{get:function "+className+"_size(){\
	return "+indices.map(function(i) { return "this.shape["+i+"]" }).join("*"),
	"}})")

	  //view.order:
	  if(dimension === 1) {
	    code.push("proto.order=[0]")
	  } else {
	    code.push("Object.defineProperty(proto,'order',{get:")
	    if(dimension < 4) {
	      code.push("function "+className+"_order(){")
	      if(dimension === 2) {
	        code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})")
	      } else if(dimension === 3) {
	        code.push(
	"var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
	if(s0>s1){\
	if(s1>s2){\
	return [2,1,0];\
	}else if(s0>s2){\
	return [1,2,0];\
	}else{\
	return [1,0,2];\
	}\
	}else if(s0>s2){\
	return [2,0,1];\
	}else if(s2>s1){\
	return [0,1,2];\
	}else{\
	return [0,2,1];\
	}}})")
	      }
	    } else {
	      code.push("ORDER})")
	    }
	  }

	  //view.set(i0, ..., v):
	  code.push(
	"proto.set=function "+className+"_set("+args.join(",")+",v){")
	  if(useGetters) {
	    code.push("return this.data.set("+index_str+",v)}")
	  } else {
	    code.push("return this.data["+index_str+"]=v}")
	  }

	  //view.get(i0, ...):
	  code.push("proto.get=function "+className+"_get("+args.join(",")+"){")
	  if(useGetters) {
	    code.push("return this.data.get("+index_str+")}")
	  } else {
	    code.push("return this.data["+index_str+"]}")
	  }

	  //view.index:
	  code.push(
	    "proto.index=function "+className+"_index(", args.join(), "){return "+index_str+"}")

	  //view.hi():
	  code.push("proto.hi=function "+className+"_hi("+args.join(",")+"){return new "+className+"(this.data,"+
	    indices.map(function(i) {
	      return ["(typeof i",i,"!=='number'||i",i,"<0)?this.shape[", i, "]:i", i,"|0"].join("")
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "this.stride["+i + "]"
	    }).join(",")+",this.offset)}")

	  //view.lo():
	  var a_vars = indices.map(function(i) { return "a"+i+"=this.shape["+i+"]" })
	  var c_vars = indices.map(function(i) { return "c"+i+"=this.stride["+i+"]" })
	  code.push("proto.lo=function "+className+"_lo("+args.join(",")+"){var b=this.offset,d=0,"+a_vars.join(",")+","+c_vars.join(","))
	  for(var i=0; i<dimension; ++i) {
	    code.push(
	"if(typeof i"+i+"==='number'&&i"+i+">=0){\
	d=i"+i+"|0;\
	b+=c"+i+"*d;\
	a"+i+"-=d}")
	  }
	  code.push("return new "+className+"(this.data,"+
	    indices.map(function(i) {
	      return "a"+i
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "c"+i
	    }).join(",")+",b)}")

	  //view.step():
	  code.push("proto.step=function "+className+"_step("+args.join(",")+"){var "+
	    indices.map(function(i) {
	      return "a"+i+"=this.shape["+i+"]"
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "b"+i+"=this.stride["+i+"]"
	    }).join(",")+",c=this.offset,d=0,ceil=Math.ceil")
	  for(var i=0; i<dimension; ++i) {
	    code.push(
	"if(typeof i"+i+"==='number'){\
	d=i"+i+"|0;\
	if(d<0){\
	c+=b"+i+"*(a"+i+"-1);\
	a"+i+"=ceil(-a"+i+"/d)\
	}else{\
	a"+i+"=ceil(a"+i+"/d)\
	}\
	b"+i+"*=d\
	}")
	  }
	  code.push("return new "+className+"(this.data,"+
	    indices.map(function(i) {
	      return "a" + i
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "b" + i
	    }).join(",")+",c)}")

	  //view.transpose():
	  var tShape = new Array(dimension)
	  var tStride = new Array(dimension)
	  for(var i=0; i<dimension; ++i) {
	    tShape[i] = "a[i"+i+"]"
	    tStride[i] = "b[i"+i+"]"
	  }
	  code.push("proto.transpose=function "+className+"_transpose("+args+"){"+
	    args.map(function(n,idx) { return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)"}).join(";"),
	    "var a=this.shape,b=this.stride;return new "+className+"(this.data,"+tShape.join(",")+","+tStride.join(",")+",this.offset)}")

	  //view.pick():
	  code.push("proto.pick=function "+className+"_pick("+args+"){var a=[],b=[],c=this.offset")
	  for(var i=0; i<dimension; ++i) {
	    code.push("if(typeof i"+i+"==='number'&&i"+i+">=0){c=(c+this.stride["+i+"]*i"+i+")|0}else{a.push(this.shape["+i+"]);b.push(this.stride["+i+"])}")
	  }
	  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}")

	  //Add return statement
	  code.push("return function construct_"+className+"(data,shape,stride,offset){return new "+className+"(data,"+
	    indices.map(function(i) {
	      return "shape["+i+"]"
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "stride["+i+"]"
	    }).join(",")+",offset)}")

	  //Compile procedure
	  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"))
	  return procedure(CACHED_CONSTRUCTORS[dtype], order)
	}

	function arrayDType(data) {
	  if(isBuffer(data)) {
	    return "buffer"
	  }
	  if(hasTypedArrays) {
	    switch(Object.prototype.toString.call(data)) {
	      case "[object Float64Array]":
	        return "float64"
	      case "[object Float32Array]":
	        return "float32"
	      case "[object Int8Array]":
	        return "int8"
	      case "[object Int16Array]":
	        return "int16"
	      case "[object Int32Array]":
	        return "int32"
	      case "[object Uint8Array]":
	        return "uint8"
	      case "[object Uint16Array]":
	        return "uint16"
	      case "[object Uint32Array]":
	        return "uint32"
	      case "[object Uint8ClampedArray]":
	        return "uint8_clamped"
	    }
	  }
	  if(Array.isArray(data)) {
	    return "array"
	  }
	  return "generic"
	}

	var CACHED_CONSTRUCTORS = {
	  "float32":[],
	  "float64":[],
	  "int8":[],
	  "int16":[],
	  "int32":[],
	  "uint8":[],
	  "uint16":[],
	  "uint32":[],
	  "array":[],
	  "uint8_clamped":[],
	  "buffer":[],
	  "generic":[]
	}

	;(function() {
	  for(var id in CACHED_CONSTRUCTORS) {
	    CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1))
	  }
	});

	function wrappedNDArrayCtor(data, shape, stride, offset) {
	  if(data === undefined) {
	    var ctor = CACHED_CONSTRUCTORS.array[0]
	    return ctor([])
	  } else if(typeof data === "number") {
	    data = [data]
	  }
	  if(shape === undefined) {
	    shape = [ data.length ]
	  }
	  var d = shape.length
	  if(stride === undefined) {
	    stride = new Array(d)
	    for(var i=d-1, sz=1; i>=0; --i) {
	      stride[i] = sz
	      sz *= shape[i]
	    }
	  }
	  if(offset === undefined) {
	    offset = 0
	    for(var i=0; i<d; ++i) {
	      if(stride[i] < 0) {
	        offset -= (shape[i]-1)*stride[i]
	      }
	    }
	  }
	  var dtype = arrayDType(data)
	  var ctor_list = CACHED_CONSTRUCTORS[dtype]
	  while(ctor_list.length <= d+1) {
	    ctor_list.push(compileConstructor(dtype, ctor_list.length-1))
	  }
	  var ctor = ctor_list[d+1]
	  return ctor(data, shape, stride, offset)
	}

	module.exports = wrappedNDArrayCtor


/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict"

	function iota(n) {
	  var result = new Array(n)
	  for(var i=0; i<n; ++i) {
	    result[i] = i
	  }
	  return result
	}

	module.exports = iota

/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * Determine if an object is Buffer
	 *
	 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * License:  MIT
	 *
	 * `npm install is-buffer`
	 */

	module.exports = function (obj) {
	  return !!(
	    obj != null &&
	    obj.constructor &&
	    typeof obj.constructor.isBuffer === 'function' &&
	    obj.constructor.isBuffer(obj)
	  )
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var createVAONative = __webpack_require__(65)
	var createVAOEmulated = __webpack_require__(67)

	function createVAO(gl, attributes, elements, elementsType) {
	  var ext = gl.getExtension('OES_vertex_array_object')
	  var vao
	  if(ext) {
	    vao = createVAONative(gl, ext)
	  } else {
	    vao = createVAOEmulated(gl)
	  }
	  vao.update(attributes, elements, elementsType)
	  return vao
	}

	module.exports = createVAO


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var bindAttribs = __webpack_require__(66)

	function VertexAttribute(location, dimension, a, b, c, d) {
	  this.location = location
	  this.dimension = dimension
	  this.a = a
	  this.b = b
	  this.c = c
	  this.d = d
	}

	VertexAttribute.prototype.bind = function(gl) {
	  switch(this.dimension) {
	    case 1:
	      gl.vertexAttrib1f(this.location, this.a)
	    break
	    case 2:
	      gl.vertexAttrib2f(this.location, this.a, this.b)
	    break
	    case 3:
	      gl.vertexAttrib3f(this.location, this.a, this.b, this.c)
	    break
	    case 4:
	      gl.vertexAttrib4f(this.location, this.a, this.b, this.c, this.d)
	    break
	  }
	}

	function VAONative(gl, ext, handle) {
	  this.gl = gl
	  this._ext = ext
	  this.handle = handle
	  this._attribs = []
	  this._useElements = false
	  this._elementsType = gl.UNSIGNED_SHORT
	}

	VAONative.prototype.bind = function() {
	  this._ext.bindVertexArrayOES(this.handle)
	  for(var i=0; i<this._attribs.length; ++i) {
	    this._attribs[i].bind(this.gl)
	  }
	}

	VAONative.prototype.unbind = function() {
	  this._ext.bindVertexArrayOES(null)
	}

	VAONative.prototype.dispose = function() {
	  this._ext.deleteVertexArrayOES(this.handle)
	}

	VAONative.prototype.update = function(attributes, elements, elementsType) {
	  this.bind()
	  bindAttribs(this.gl, elements, attributes)
	  this.unbind()
	  this._attribs.length = 0
	  if(attributes)
	  for(var i=0; i<attributes.length; ++i) {
	    var a = attributes[i]
	    if(typeof a === "number") {
	      this._attribs.push(new VertexAttribute(i, 1, a))
	    } else if(Array.isArray(a)) {
	      this._attribs.push(new VertexAttribute(i, a.length, a[0], a[1], a[2], a[3]))
	    }
	  }
	  this._useElements = !!elements
	  this._elementsType = elementsType || this.gl.UNSIGNED_SHORT
	}

	VAONative.prototype.draw = function(mode, count, offset) {
	  offset = offset || 0
	  var gl = this.gl
	  if(this._useElements) {
	    gl.drawElements(mode, count, this._elementsType, offset)
	  } else {
	    gl.drawArrays(mode, offset, count)
	  }
	}

	function createVAONative(gl, ext) {
	  return new VAONative(gl, ext, ext.createVertexArrayOES())
	}

	module.exports = createVAONative

/***/ },
/* 66 */
/***/ function(module, exports) {

	"use strict"

	function doBind(gl, elements, attributes) {
	  if(elements) {
	    elements.bind()
	  } else {
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
	  }
	  var nattribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS)|0
	  if(attributes) {
	    if(attributes.length > nattribs) {
	      throw new Error("gl-vao: Too many vertex attributes")
	    }
	    for(var i=0; i<attributes.length; ++i) {
	      var attrib = attributes[i]
	      if(attrib.buffer) {
	        var buffer = attrib.buffer
	        var size = attrib.size || 4
	        var type = attrib.type || gl.FLOAT
	        var normalized = !!attrib.normalized
	        var stride = attrib.stride || 0
	        var offset = attrib.offset || 0
	        buffer.bind()
	        gl.enableVertexAttribArray(i)
	        gl.vertexAttribPointer(i, size, type, normalized, stride, offset)
	      } else {
	        if(typeof attrib === "number") {
	          gl.vertexAttrib1f(i, attrib)
	        } else if(attrib.length === 1) {
	          gl.vertexAttrib1f(i, attrib[0])
	        } else if(attrib.length === 2) {
	          gl.vertexAttrib2f(i, attrib[0], attrib[1])
	        } else if(attrib.length === 3) {
	          gl.vertexAttrib3f(i, attrib[0], attrib[1], attrib[2])
	        } else if(attrib.length === 4) {
	          gl.vertexAttrib4f(i, attrib[0], attrib[1], attrib[2], attrib[3])
	        } else {
	          throw new Error("gl-vao: Invalid vertex attribute")
	        }
	        gl.disableVertexAttribArray(i)
	      }
	    }
	    for(; i<nattribs; ++i) {
	      gl.disableVertexAttribArray(i)
	    }
	  } else {
	    gl.bindBuffer(gl.ARRAY_BUFFER, null)
	    for(var i=0; i<nattribs; ++i) {
	      gl.disableVertexAttribArray(i)
	    }
	  }
	}

	module.exports = doBind

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var bindAttribs = __webpack_require__(66)

	function VAOEmulated(gl) {
	  this.gl = gl
	  this._elements = null
	  this._attributes = null
	  this._elementsType = gl.UNSIGNED_SHORT
	}

	VAOEmulated.prototype.bind = function() {
	  bindAttribs(this.gl, this._elements, this._attributes)
	}

	VAOEmulated.prototype.update = function(attributes, elements, elementsType) {
	  this._elements = elements
	  this._attributes = attributes
	  this._elementsType = elementsType || this.gl.UNSIGNED_SHORT
	}

	VAOEmulated.prototype.dispose = function() { }
	VAOEmulated.prototype.unbind = function() { }

	VAOEmulated.prototype.draw = function(mode, count, offset) {
	  offset = offset || 0
	  var gl = this.gl
	  if(this._elements) {
	    gl.drawElements(mode, count, this._elementsType, offset)
	  } else {
	    gl.drawArrays(mode, offset, count)
	  }
	}

	function createVAOEmulated(gl) {
	  return new VAOEmulated(gl)
	}

	module.exports = createVAOEmulated

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var vec2 = __webpack_require__(69);

	function triangle(a, b, c) {
	  var ret = [];
	  [a, b, c].forEach(function (v) {
	    ret.push(v[0]);
	    ret.push(v[1]);
	  });
	  return ret;
	}

	function divideTriangle(a, b, c, count, gasket) {

	  //console.log('divideTriangle', a, b, c, count);

	  // check for end of recursion
	  if (count === 0) {
	    return triangle(a, b, c);
	  } else {
	    //bisect the sides
	    var ab = vec2.create(),
	        ac = vec2.create(),
	        bc = vec2.create();
	    vec2.lerp(ab, a, b, 0.5);
	    vec2.lerp(ac, a, c, 0.5);
	    vec2.lerp(bc, b, c, 0.5);

	    --count;

	    var centerTriangle = gasket ? [] : divideTriangle(ac, bc, ab, count, gasket);

	    // three new triangles
	    return centerTriangle.concat(divideTriangle(a, ab, ac, count, gasket), divideTriangle(c, ac, bc, count, gasket), divideTriangle(b, bc, ab, count, gasket));
	  }
	}

	module.exports = divideTriangle;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  create: __webpack_require__(71)
	  , clone: __webpack_require__(72)
	  , fromValues: __webpack_require__(73)
	  , copy: __webpack_require__(74)
	  , set: __webpack_require__(75)
	  , add: __webpack_require__(76)
	  , subtract: __webpack_require__(77)
	  , multiply: __webpack_require__(78)
	  , divide: __webpack_require__(79)
	  , min: __webpack_require__(80)
	  , max: __webpack_require__(81)
	  , scale: __webpack_require__(82)
	  , scaleAndAdd: __webpack_require__(83)
	  , distance: __webpack_require__(84)
	  , squaredDistance: __webpack_require__(70)
	  , length: __webpack_require__(85)
	  , squaredLength: __webpack_require__(86)
	  , negate: __webpack_require__(87)
	  , normalize: __webpack_require__(88)
	  , dot: __webpack_require__(89)
	  , cross: __webpack_require__(90)
	  , lerp: __webpack_require__(91)
	  , random: __webpack_require__(92)
	  , transformMat2: __webpack_require__(93)
	  , transformMat2d: __webpack_require__(94)
	  , transformMat3: __webpack_require__(95)
	  , transformMat4: __webpack_require__(96)
	  , forEach: __webpack_require__(97)
	}

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = squaredDistance

	/**
	 * Calculates the squared euclidian distance between two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	function squaredDistance(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1]
	    return x*x + y*y
	}

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = create

	/**
	 * Creates a new, empty vec2
	 *
	 * @returns {vec2} a new 2D vector
	 */
	function create() {
	    var out = new Float32Array(2)
	    out[0] = 0
	    out[1] = 0
	    return out
	}

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = clone

	/**
	 * Creates a new vec2 initialized with values from an existing vector
	 *
	 * @param {vec2} a vector to clone
	 * @returns {vec2} a new 2D vector
	 */
	function clone(a) {
	    var out = new Float32Array(2)
	    out[0] = a[0]
	    out[1] = a[1]
	    return out
	}

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = fromValues

	/**
	 * Creates a new vec2 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} a new 2D vector
	 */
	function fromValues(x, y) {
	    var out = new Float32Array(2)
	    out[0] = x
	    out[1] = y
	    return out
	}

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = copy

	/**
	 * Copy the values from one vec2 to another
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the source vector
	 * @returns {vec2} out
	 */
	function copy(out, a) {
	    out[0] = a[0]
	    out[1] = a[1]
	    return out
	}

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = set

	/**
	 * Set the components of a vec2 to the given values
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} out
	 */
	function set(out, x, y) {
	    out[0] = x
	    out[1] = y
	    return out
	}

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = add

	/**
	 * Adds two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	function add(out, a, b) {
	    out[0] = a[0] + b[0]
	    out[1] = a[1] + b[1]
	    return out
	}

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = subtract

	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	function subtract(out, a, b) {
	    out[0] = a[0] - b[0]
	    out[1] = a[1] - b[1]
	    return out
	}

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = multiply

	/**
	 * Multiplies two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	function multiply(out, a, b) {
	    out[0] = a[0] * b[0]
	    out[1] = a[1] * b[1]
	    return out
	}

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = divide

	/**
	 * Divides two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	function divide(out, a, b) {
	    out[0] = a[0] / b[0]
	    out[1] = a[1] / b[1]
	    return out
	}

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = min

	/**
	 * Returns the minimum of two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	function min(out, a, b) {
	    out[0] = Math.min(a[0], b[0])
	    out[1] = Math.min(a[1], b[1])
	    return out
	}

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = max

	/**
	 * Returns the maximum of two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	function max(out, a, b) {
	    out[0] = Math.max(a[0], b[0])
	    out[1] = Math.max(a[1], b[1])
	    return out
	}

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = scale

	/**
	 * Scales a vec2 by a scalar number
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec2} out
	 */
	function scale(out, a, b) {
	    out[0] = a[0] * b
	    out[1] = a[1] * b
	    return out
	}

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = scaleAndAdd

	/**
	 * Adds two vec2's after scaling the second operand by a scalar value
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec2} out
	 */
	function scaleAndAdd(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale)
	    out[1] = a[1] + (b[1] * scale)
	    return out
	}

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = distance

	/**
	 * Calculates the euclidian distance between two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} distance between a and b
	 */
	function distance(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1]
	    return Math.sqrt(x*x + y*y)
	}

/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = length

	/**
	 * Calculates the length of a vec2
	 *
	 * @param {vec2} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	function length(a) {
	    var x = a[0],
	        y = a[1]
	    return Math.sqrt(x*x + y*y)
	}

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = squaredLength

	/**
	 * Calculates the squared length of a vec2
	 *
	 * @param {vec2} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	function squaredLength(a) {
	    var x = a[0],
	        y = a[1]
	    return x*x + y*y
	}

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = negate

	/**
	 * Negates the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to negate
	 * @returns {vec2} out
	 */
	function negate(out, a) {
	    out[0] = -a[0]
	    out[1] = -a[1]
	    return out
	}

/***/ },
/* 88 */
/***/ function(module, exports) {

	module.exports = normalize

	/**
	 * Normalize a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to normalize
	 * @returns {vec2} out
	 */
	function normalize(out, a) {
	    var x = a[0],
	        y = a[1]
	    var len = x*x + y*y
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len)
	        out[0] = a[0] * len
	        out[1] = a[1] * len
	    }
	    return out
	}

/***/ },
/* 89 */
/***/ function(module, exports) {

	module.exports = dot

	/**
	 * Calculates the dot product of two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	function dot(a, b) {
	    return a[0] * b[0] + a[1] * b[1]
	}

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = cross

	/**
	 * Computes the cross product of two vec2's
	 * Note that the cross product must by definition produce a 3D vector
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec3} out
	 */
	function cross(out, a, b) {
	    var z = a[0] * b[1] - a[1] * b[0]
	    out[0] = out[1] = 0
	    out[2] = z
	    return out
	}

/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = lerp

	/**
	 * Performs a linear interpolation between two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec2} out
	 */
	function lerp(out, a, b, t) {
	    var ax = a[0],
	        ay = a[1]
	    out[0] = ax + t * (b[0] - ax)
	    out[1] = ay + t * (b[1] - ay)
	    return out
	}

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = random

	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec2} out
	 */
	function random(out, scale) {
	    scale = scale || 1.0
	    var r = Math.random() * 2.0 * Math.PI
	    out[0] = Math.cos(r) * scale
	    out[1] = Math.sin(r) * scale
	    return out
	}

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = transformMat2

	/**
	 * Transforms the vec2 with a mat2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2} m matrix to transform with
	 * @returns {vec2} out
	 */
	function transformMat2(out, a, m) {
	    var x = a[0],
	        y = a[1]
	    out[0] = m[0] * x + m[2] * y
	    out[1] = m[1] * x + m[3] * y
	    return out
	}

/***/ },
/* 94 */
/***/ function(module, exports) {

	module.exports = transformMat2d

	/**
	 * Transforms the vec2 with a mat2d
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2d} m matrix to transform with
	 * @returns {vec2} out
	 */
	function transformMat2d(out, a, m) {
	    var x = a[0],
	        y = a[1]
	    out[0] = m[0] * x + m[2] * y + m[4]
	    out[1] = m[1] * x + m[3] * y + m[5]
	    return out
	}

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = transformMat3

	/**
	 * Transforms the vec2 with a mat3
	 * 3rd vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat3} m matrix to transform with
	 * @returns {vec2} out
	 */
	function transformMat3(out, a, m) {
	    var x = a[0],
	        y = a[1]
	    out[0] = m[0] * x + m[3] * y + m[6]
	    out[1] = m[1] * x + m[4] * y + m[7]
	    return out
	}

/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = transformMat4

	/**
	 * Transforms the vec2 with a mat4
	 * 3rd vector component is implicitly '0'
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec2} out
	 */
	function transformMat4(out, a, m) {
	    var x = a[0], 
	        y = a[1]
	    out[0] = m[0] * x + m[4] * y + m[12]
	    out[1] = m[1] * x + m[5] * y + m[13]
	    return out
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = forEach

	var vec = __webpack_require__(71)()

	/**
	 * Perform some operation over an array of vec2s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	function forEach(a, stride, offset, count, fn, arg) {
	    var i, l
	    if(!stride) {
	        stride = 2
	    }

	    if(!offset) {
	        offset = 0
	    }
	    
	    if(count) {
	        l = Math.min((count * stride) + offset, a.length)
	    } else {
	        l = a.length
	    }

	    for(i = offset; i < l; i += stride) {
	        vec[0] = a[i]
	        vec[1] = a[i+1]
	        fn(vec, vec, arg)
	        a[i] = vec[0]
	        a[i+1] = vec[1]
	    }
	    
	    return a
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = drawTriangles;
	var vec2 = __webpack_require__(69);

	var glNow = __webpack_require__(21);
	var createShader = __webpack_require__(39);
	var createBuffer = __webpack_require__(48);
	var createVAO = __webpack_require__(64);
	var divideTriangle = __webpack_require__(68);

	function drawTriangles(domId, config) {

	  var shader, vao;

	  var triangles = divideTriangle(vec2.fromValues(-0.5, 0), vec2.fromValues(0, -0.5), vec2.fromValues(0.5, 0.5), config.level, config.gasket);

	  var shell = config.lastShell ? config.lastShell : glNow({
	    element: "main"
	  });

	  if (config.lastShell) {
	    init();
	  }

	  config.lastShell = shell;

	  function init() {
	    var gl = shell.gl;

	    //Create shader
	    shader = createShader(gl, __webpack_require__(99), __webpack_require__(100));

	    shader.attributes.position.location = 0;

	    //Create vertex array object
	    vao = createVAO(gl, [{ buffer: createBuffer(gl, triangles),
	      type: gl.FLOAT,
	      size: 2
	    }]);
	  }

	  shell.on("gl-init", init);

	  shell.on("gl-render", function (t) {
	    var gl = shell.gl;

	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
	    gl.clearColor(0, 0, 0, 0);
	    gl.clearDepth(1);
	    gl.clearStencil(0);

	    //Bind shader
	    shader.bind();

	    //Bind vertex array object and draw it
	    vao.bind();

	    if (config.wireframe) {
	      for (var i = 0; i < triangles.length; i += 3) {
	        vao.draw(gl.LINE_LOOP, 3, i);
	      }
	    } else {
	      vao.draw(gl.TRIANGLES, triangles.length / 2);
	    }

	    //Set uniforms
	    if (config.animation) {
	      shader.uniforms.t += 0.01;
	    } else {
	      shader.uniforms.t = 0;
	    }
	    shader.uniforms.theta = config.degrees / 360 * 3.141592653;
	    shader.uniforms.omega = 3.141592653 / 9;

	    //Unbind vertex array when fini
	    vao.unbind();
	  });
	}

/***/ },
/* 99 */
/***/ function(module, exports) {

	module.exports = "precision highp float;\nattribute vec3 position;\nuniform float theta;\nuniform float omega;\nuniform float t;\nvarying vec2 uv;\nvoid main() {\n  vec4 pos = vec4(position, 1.0);\n  float x = pos.x;\n  float y = pos.y;\n  float d = sqrt(pow(x, 2.0) + pow(y, 2.0));\n  float angle = (theta + omega * t) * d;\n  pos.x = x * cos(angle) - y * sin(angle);\n  pos.y = x * sin(angle) + y * cos(angle);\n  gl_Position = pos;\n  uv = position.xy;\n}\n"

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = "precision highp float;\nuniform float t;\nvarying vec2 uv;\nvoid main() {\n  gl_FragColor = vec4(0.5*(uv+1.0), 0.5*(cos(t)+1.0), 1.0);\n}\n"

/***/ }
/******/ ]);