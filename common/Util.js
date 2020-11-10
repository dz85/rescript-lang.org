

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as IntlDateTimeFormat from "../bindings/IntlDateTimeFormat.js";

function debounce(wait, fn) {
  var timeout = {
    contents: undefined
  };
  return function (param) {
    var unset = function (param) {
      timeout.contents = undefined;
      
    };
    var id = timeout.contents;
    if (id !== undefined) {
      clearTimeout(Caml_option.valFromOption(id));
    } else {
      Curry._1(fn, undefined);
    }
    timeout.contents = Caml_option.some(setTimeout(unset, wait));
    
  };
}

function debounce3(wait, immediateOpt, fn) {
  var immediate = immediateOpt !== undefined ? immediateOpt : false;
  var timeout = {
    contents: undefined
  };
  return function (a1, a2, a3) {
    var unset = function (param) {
      timeout.contents = undefined;
      if (immediate) {
        return Curry._3(fn, a1, a2, a3);
      }
      
    };
    var id = timeout.contents;
    if (id !== undefined) {
      clearTimeout(Caml_option.valFromOption(id));
    } else {
      Curry._3(fn, a1, a2, a3);
    }
    timeout.contents = Caml_option.some(setTimeout(unset, wait));
    if (immediate && timeout.contents === undefined) {
      return Curry._3(fn, a1, a2, a3);
    }
    
  };
}

var Debounce = {
  debounce: debounce,
  debounce3: debounce3
};

function s(prim) {
  return prim;
}

function ate(prim) {
  return prim;
}

var Unsafe = {};

var Suspense = {};

var ReactStuff = {
  s: s,
  ate: ate,
  Unsafe: Unsafe,
  Style: undefined,
  Suspense: Suspense
};

var camelCase = (str => {
     return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    });

var capitalize = (str => {
      return str && str.charAt(0).toUpperCase() + str.substring(1);
    });

var $$String = {
  camelCase: camelCase,
  capitalize: capitalize
};

var Json = {};

var isAbsolute = (function(str) {
      var r = new RegExp('^(?:[a-z]+:)?//', 'i');
      if (r.test(str))
      {
        return true
      }
      return false;
    });

var Url = {
  isAbsolute: isAbsolute
};

function toDayMonthYear(date) {
  return IntlDateTimeFormat.$$Date.make("US", {
              year: Curry._1(IntlDateTimeFormat.$$Date.Year.make, "numeric"),
              day: Curry._1(IntlDateTimeFormat.$$Date.Day.make, "numeric"),
              month: Curry._1(IntlDateTimeFormat.$$Date.Month.make, "short")
            }, date);
}

var $$Date = {
  toDayMonthYear: toDayMonthYear
};

export {
  Debounce ,
  ReactStuff ,
  $$String ,
  Json ,
  Url ,
  $$Date ,
  
}
/* No side effect */
