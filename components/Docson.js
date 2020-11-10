

import * as React from "react";
import Docson from "docson";
import * as Docson$1 from "docson";
import BuildSchemaJson from "../index_data/build-schema.json";

import "../styles/docson.css";
;

var schema = BuildSchemaJson;

function Docson$2(Props) {
  var element = React.useRef(null);
  React.useEffect((function () {
          var _el = element.current;
          if (!(_el == null)) {
            Docson.templateBaseUrl = "/static/docson";
            Docson$1.default.doc("docson-root", schema, undefined, "https://raw.githubusercontent.com/rescript-lang/rescript-compiler/master/docs/docson/build-schema.json");
          }
          
        }), []);
  return React.createElement("div", {
              ref: element,
              id: "docson-root"
            });
}

var make = Docson$2;

export {
  schema ,
  make ,
  
}
/*  Not a pure module */
