

import * as Js_null from "bs-platform/lib/es6/js_null.js";
import * as Json_decode from "@glennsl/bs-json/src/Json_decode.js";
import * as Caml_js_exceptions from "bs-platform/lib/es6/caml_js_exceptions.js";

function decode(json) {
  try {
    return {
            TAG: 0,
            _0: {
              title: Json_decode.field("title", Json_decode.string, json),
              description: Js_null.fromOption(Json_decode.optional((function (param) {
                          return Json_decode.field("description", Json_decode.string, param);
                        }), json)),
              canonical: Js_null.fromOption(Json_decode.optional((function (param) {
                          return Json_decode.field("canonical", Json_decode.string, param);
                        }), json))
            },
            [Symbol.for("name")]: "Ok"
          };
  }
  catch (raw_errMsg){
    var errMsg = Caml_js_exceptions.internalToOCamlException(raw_errMsg);
    if (errMsg.RE_EXN_ID === Json_decode.DecodeError) {
      return {
              TAG: 1,
              _0: errMsg._1,
              [Symbol.for("name")]: "Error"
            };
    }
    throw errMsg;
  }
}

export {
  decode ,
  
}
/* No side effect */
