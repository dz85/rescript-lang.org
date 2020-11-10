

import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Belt_Int from "bs-platform/lib/es6/belt_Int.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Caml_exceptions from "bs-platform/lib/es6/caml_exceptions.js";
import * as Caml_js_exceptions from "bs-platform/lib/es6/caml_js_exceptions.js";

var numeric = [
  [
    1,
    "Suspicious-looking start-of-comment mark."
  ],
  [
    2,
    "Suspicious-looking end-of-comment mark."
  ],
  [
    3,
    "Deprecated feature."
  ],
  [
    4,
    "Fragile pattern matching: matching that will remain complete even if additional constructors are added to one of the variant types matched."
  ],
  [
    5,
    "Partially applied function: expression whose result has function type and is ignored."
  ],
  [
    6,
    "Label omitted in function application."
  ],
  [
    7,
    "Method overridden."
  ],
  [
    8,
    "Partial match: missing cases in pattern-matching."
  ],
  [
    9,
    "Missing fields in a record pattern."
  ],
  [
    10,
    "Expression on the left-hand side of a sequence that doesn't have type \"unit\" (and that is not a function, see warning number 5)."
  ],
  [
    11,
    "Redundant case in a pattern matching (unused match case)."
  ],
  [
    12,
    "Redundant sub-pattern in a pattern-matching."
  ],
  [
    13,
    "Instance variable overridden."
  ],
  [
    14,
    "Illegal backslash escape in a string constant."
  ],
  [
    15,
    "Private method made public implicitly."
  ],
  [
    16,
    "Unerasable optional argument."
  ],
  [
    17,
    "Undeclared virtual method."
  ],
  [
    18,
    "Non-principal type."
  ],
  [
    19,
    "Type without principality."
  ],
  [
    20,
    "Unused function argument."
  ],
  [
    21,
    "Non-returning statement."
  ],
  [
    22,
    "Preprocessor warning."
  ],
  [
    23,
    "Useless record \"with\" clause."
  ],
  [
    24,
    "Bad module name: the source file name is not a valid OCaml module name."
  ],
  [
    25,
    "Deprecated: now part of warning 8."
  ],
  [
    26,
    "Suspicious unused variable: unused variable that is bound with \"let\" or \"as\", and doesn't start with an underscore (\"_\") character."
  ],
  [
    27,
    "Innocuous unused variable: unused variable that is not bound with \"let\" nor \"as\", and doesn't start with an underscore (\"_\") character."
  ],
  [
    28,
    "Wildcard pattern given as argument to a constant constructor."
  ],
  [
    29,
    "Unescaped end-of-line in a string constant (non-portable code)."
  ],
  [
    30,
    "Two labels or constructors of the same name are defined in two mutually recursive types."
  ],
  [
    31,
    "A module is linked twice in the same executable."
  ],
  [
    32,
    "Unused value declaration."
  ],
  [
    33,
    "Unused open statement."
  ],
  [
    34,
    "Unused type declaration."
  ],
  [
    35,
    "Unused for-loop index."
  ],
  [
    36,
    "Unused ancestor variable."
  ],
  [
    37,
    "Unused constructor."
  ],
  [
    38,
    "Unused extension constructor."
  ],
  [
    39,
    "Unused rec flag."
  ],
  [
    40,
    "Constructor or label name used out of scope."
  ],
  [
    41,
    "Ambiguous constructor or label name."
  ],
  [
    42,
    "Disambiguated constructor or label name (compatibility warning)."
  ],
  [
    43,
    "Nonoptional label applied as optional."
  ],
  [
    44,
    "Open statement shadows an already defined identifier."
  ],
  [
    45,
    "Open statement shadows an already defined label or constructor."
  ],
  [
    46,
    "Error in environment variable."
  ],
  [
    47,
    "Illegal attribute payload."
  ],
  [
    48,
    "Implicit elimination of optional arguments."
  ],
  [
    49,
    "Absent cmi file when looking up module alias."
  ],
  [
    50,
    "Unexpected documentation comment."
  ],
  [
    51,
    "Warning on non-tail calls if @tailcall present."
  ],
  [
    52,
    "Fragile constant pattern."
  ],
  [
    53,
    "Attribute cannot appear in this context"
  ],
  [
    54,
    "Attribute used more than once on an expression"
  ],
  [
    55,
    "Inlining impossible"
  ],
  [
    56,
    "Unreachable case in a pattern-matching (based on type information)."
  ],
  [
    57,
    "Ambiguous or-pattern variables under guard"
  ],
  [
    58,
    "Missing cmx file"
  ],
  [
    59,
    "Assignment to non-mutable value"
  ],
  [
    60,
    "Unused module declaration"
  ],
  [
    61,
    "Unboxable type in primitive declaration"
  ],
  [
    62,
    "Type constraint on GADT type declaration"
  ],
  [
    101,
    "BuckleScript warning: Unused bs attributes"
  ],
  [
    102,
    "BuckleScript warning: polymorphic comparison introduced (maybe unsafe)"
  ],
  [
    103,
    "BuckleScript warning: about fragile FFI definitions"
  ],
  [
    104,
    "BuckleScript warning: bs.deriving warning with customized message "
  ],
  [
    105,
    "BuckleScript warning: the external name is inferred from val name is unsafe from refactoring when changing value name"
  ],
  [
    106,
    "BuckleScript warning: Unimplemented primitive used:"
  ],
  [
    107,
    "BuckleScript warning: Integer literal exceeds the range of representable integers of type int"
  ],
  [
    108,
    "BuckleScript warning: Uninterpreted delimiters (for unicode)"
  ]
];

var ret = [];

for(var i = 1; i <= 108; ++i){
  ret.push(i);
}

function letter(l) {
  switch (l) {
    case "a" :
        return ret;
    case "c" :
        return [
                1,
                2
              ];
    case "d" :
        return [3];
    case "e" :
        return [4];
    case "f" :
        return [5];
    case "k" :
        return [
                32,
                33,
                34,
                35,
                36,
                37,
                38,
                39
              ];
    case "l" :
        return [6];
    case "m" :
        return [7];
    case "p" :
        return [8];
    case "r" :
        return [9];
    case "s" :
        return [10];
    case "u" :
        return [
                11,
                12
              ];
    case "v" :
        return [13];
    case "x" :
        return [
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                30
              ];
    case "y" :
        return [26];
    case "z" :
        return [27];
    default:
      return [];
  }
}

var letterDescriptions = [[
    "a",
    "All flags"
  ]];

function getDescription(num) {
  return Belt_Option.map(Caml_option.undefined_to_opt(numeric.find(function (param) {
                      return num === param[0];
                    })), (function (param) {
                return param[1];
              }));
}

function lookupAll(param) {
  var nums = Belt_Array.map(numeric, (function (param) {
          return [
                  String(param[0]),
                  param[1]
                ];
        }));
  return Belt_Array.concat(letterDescriptions, nums);
}

function lookup(str) {
  var num = Belt_Int.fromString(str);
  if (num !== undefined) {
    var description = getDescription(num);
    if (description !== undefined) {
      return [[
                str,
                description
              ]];
    } else {
      return [];
    }
  }
  var search = str.toLowerCase();
  return Belt_Array.keep(letterDescriptions, (function (param) {
                return param[0] === search;
              }));
}

function fuzzyLookup(str) {
  var letters = Belt_Array.keep(letterDescriptions, (function (param) {
          return param[0].startsWith(str);
        }));
  var numbers = Belt_Array.map(Belt_Array.keep(numeric, (function (param) {
              return String(param[0]).startsWith(str);
            })), (function (param) {
          return [
                  String(param[0]),
                  param[1]
                ];
        }));
  return Belt_Array.concat(letters, numbers);
}

var InvalidInput = Caml_exceptions.create("WarningFlagDescription.Parser.InvalidInput");

function isModifier(str) {
  if (str === "+") {
    return true;
  } else {
    return str === "-";
  }
}

function parseExn(input) {
  var ret = [];
  var pos = 0;
  var state = /* ParseModifier */0;
  var last = input.length - 1 | 0;
  while(pos <= last) {
    var cur = input[pos];
    var match = state;
    var newState;
    if (match) {
      var acc = match.acc;
      var modifier = match.modifier;
      var next = (pos + 1 | 0) < last ? input[pos + 1 | 0] : cur;
      if (isModifier(cur)) {
        throw {
              RE_EXN_ID: InvalidInput,
              _1: "'+' and '-' not allowed in flag name on pos " + String(pos),
              Error: new Error()
            };
      }
      if (next === "+" || next === "-" || pos >= last) {
        var token_enabled = modifier === "+";
        var token_flag = acc + cur;
        var token = {
          enabled: token_enabled,
          flag: token_flag
        };
        ret.push(token);
        newState = /* ParseModifier */0;
      } else {
        newState = {
          modifier: modifier,
          acc: acc + cur,
          [Symbol.for("name")]: "ParseFlag"
        };
      }
    } else if (cur === "+" || cur === "-") {
      newState = {
        modifier: cur,
        acc: "",
        [Symbol.for("name")]: "ParseFlag"
      };
    } else {
      throw {
            RE_EXN_ID: InvalidInput,
            _1: "Expected '+' or '-' on pos " + String(pos),
            Error: new Error()
          };
    }
    state = newState;
    pos = pos + 1 | 0;
  };
  var match$1 = state;
  if (match$1 && match$1.acc === "") {
    throw {
          RE_EXN_ID: InvalidInput,
          _1: "Expected flag name after '" + (match$1.modifier + ("' on pos " + String(pos))),
          Error: new Error()
        };
  }
  return ret;
}

function parse(input) {
  try {
    return {
            TAG: 0,
            _0: parseExn(input),
            [Symbol.for("name")]: "Ok"
          };
  }
  catch (raw_str){
    var str = Caml_js_exceptions.internalToOCamlException(raw_str);
    if (str.RE_EXN_ID === InvalidInput) {
      return {
              TAG: 1,
              _0: str._1,
              [Symbol.for("name")]: "Error"
            };
    }
    throw str;
  }
}

function merge(base, other) {
  var dict = Js_dict.fromArray(Belt_Array.map(base.slice(), (function (token) {
              return [
                      token.flag,
                      token
                    ];
            })));
  Belt_Array.forEach(other, (function (token) {
          dict[token.flag] = token;
          
        }));
  return Js_dict.values(dict).sort(function (t1, t2) {
              var f1 = t1.flag;
              var f2 = t2.flag;
              var match = isNaN(Number(f1));
              var match$1 = isNaN(Number(f2));
              if (match) {
                if (match$1) {
                  return f1.localeCompare(f2) | 0;
                } else {
                  return -1;
                }
              } else if (match$1) {
                return 1;
              } else {
                return f1.localeCompare(f2) | 0;
              }
            });
}

function tokensToString(tokens) {
  return Belt_Array.reduce(tokens, "", (function (acc, token) {
                var modifier = token.enabled ? "+" : "-";
                return acc + (modifier + token.flag);
              }));
}

var Parser = {
  InvalidInput: InvalidInput,
  isModifier: isModifier,
  parseExn: parseExn,
  parse: parse,
  merge: merge,
  tokensToString: tokensToString
};

var lastWarningNumber = 108;

var letterAll = ret;

export {
  numeric ,
  lastWarningNumber ,
  letterAll ,
  letter ,
  letterDescriptions ,
  getDescription ,
  lookupAll ,
  lookup ,
  fuzzyLookup ,
  Parser ,
  
}
/*  Not a pure module */
