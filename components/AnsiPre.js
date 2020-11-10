

import * as Ansi from "../common/Ansi.js";
import * as Util from "../common/Util.js";
import * as React from "react";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

function mapColor(target, c) {
  if (target) {
    switch (c) {
      case /* Black */0 :
          return "bg-black";
      case /* Red */1 :
          return "bg-fire";
      case /* Green */2 :
          return "bg-dark-code-3";
      case /* Yellow */3 :
          return "bg-dark-code-1";
      case /* Magenta */5 :
          return "bg-berry";
      case /* Blue */4 :
      case /* Cyan */6 :
          return "bg-dark-code-2";
      case /* White */7 :
          return "bg-snow-dark";
      
    }
  } else {
    switch (c) {
      case /* Black */0 :
          return "text-black";
      case /* Red */1 :
          return "text-fire";
      case /* Green */2 :
          return "text-dark-code-3";
      case /* Yellow */3 :
          return "text-dark-code-1";
      case /* Magenta */5 :
          return "text-berry";
      case /* Blue */4 :
      case /* Cyan */6 :
          return "text-dark-code-2";
      case /* White */7 :
          return "text-snow-dark";
      
    }
  }
}

function renderSgrString(key, sgrStr) {
  var className = Belt_Array.reduce(sgrStr.params, "", (function (acc, p) {
          if (typeof p === "number") {
            return acc + " bold";
          }
          switch (p.TAG | 0) {
            case /* Fg */0 :
                return acc + (" " + mapColor(/* Fg */0, p._0));
            case /* Bg */1 :
                return acc + (" " + mapColor(/* Bg */1, p._0));
            case /* Unknown */2 :
                return acc;
            
          }
        }));
  return React.createElement("span", {
              key: key,
              className: className
            }, Util.ReactStuff.s(sgrStr.content));
}

function AnsiPre(Props) {
  var className = Props.className;
  var children = Props.children;
  var spans = Belt_Array.mapWithIndex(Ansi.SgrString.fromTokens(Ansi.parse(children)), (function (i, str) {
          var key = String(i);
          return renderSgrString(key, str);
        }));
  var tmp = {};
  if (className !== undefined) {
    tmp.className = Caml_option.valFromOption(className);
  }
  return React.createElement("pre", tmp, Util.ReactStuff.ate(spans));
}

var make = AnsiPre;

export {
  mapColor ,
  renderSgrString ,
  make ,
  
}
/* react Not a pure module */
