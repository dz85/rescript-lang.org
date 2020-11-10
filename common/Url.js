

import * as Util from "./Util.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

function isVersion(str) {
  return Belt_Option.isSome(Caml_option.null_to_opt(str.match(/latest|v\d+(\.\d+)?(\.\d+)?/)));
}

function prettyString(str) {
  return Util.$$String.capitalize(Util.$$String.camelCase(str));
}

function parse(route) {
  var fullpath = Belt_Array.keep(route.split("/"), (function (s) {
          return s !== "";
        }));
  var match = Belt_Array.reduce(fullpath, [
        [],
        /* NoVersion */1,
        []
      ], (function (acc, next) {
          var pagepath = acc[2];
          var version = acc[1];
          var base = acc[0];
          if (version === /* NoVersion */1) {
            if (isVersion(next)) {
              var version$1 = next === "latest" ? /* Latest */0 : ({
                    _0: next,
                    [Symbol.for("name")]: "Version"
                  });
              return [
                      base,
                      version$1,
                      pagepath
                    ];
            }
            var base$1 = Belt_Array.concat(base, [next]);
            return [
                    base$1,
                    version,
                    pagepath
                  ];
          }
          var pagepath$1 = Belt_Array.concat(pagepath, [next]);
          return [
                  base,
                  version,
                  pagepath$1
                ];
        }));
  return {
          fullpath: fullpath,
          base: match[0],
          version: match[1],
          pagepath: match[2]
        };
}

export {
  isVersion ,
  prettyString ,
  parse ,
  
}
/* No side effect */
