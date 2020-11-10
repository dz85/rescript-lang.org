

import * as Icon from "./Icon.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

function DocSearch(Props) {
  React.useEffect((function () {
          var init = window.docsearch;
          if (init !== undefined) {
            Curry._1(init, {
                  apiKey: "d3d9d7cebf13a7b665e47cb85dc9c582",
                  indexName: "rescript-lang",
                  inputSelector: "#docsearch"
                });
          }
          
        }), []);
  var inputRef = React.useRef(null);
  var match = React.useState(function () {
        return /* Inactive */1;
      });
  var setState = match[1];
  var clearInput = function (param) {
    return Belt_Option.forEach(Caml_option.nullable_to_opt(inputRef.current), (function (el) {
                  el.value = "";
                  
                }));
  };
  var onClick = function (evt) {
    Curry._1(setState, (function (param) {
            return /* Active */0;
          }));
    clearInput(undefined);
    return Belt_Option.forEach(Caml_option.nullable_to_opt(inputRef.current), (function (el) {
                  el.focus();
                  
                }));
  };
  var onBlur = function (evt) {
    clearInput(undefined);
    return Curry._1(setState, (function (param) {
                  return /* Inactive */1;
                }));
  };
  var onKeyDown = function (evt) {
    var key = evt.key;
    if (key === "Escape") {
      return Belt_Option.forEach(Caml_option.nullable_to_opt(inputRef.current), (function (el) {
                    el.blur();
                    
                  }));
    }
    
  };
  var isActive = match[0] ? false : true;
  var activeClass = isActive ? "text-white border border-white-80" : "";
  var activeInput = isActive ? "w-32 mr-3" : "w-0";
  return React.createElement("div", {
              className: activeClass + " bg-night hover:text-white hover:cursor-pointer flex justify-center p-2 px-3 rounded",
              onClick: onClick
            }, React.createElement("input", {
                  ref: inputRef,
                  className: "transition-all ease-in-out duration-150 text-white bg-night border-none focus:outline-none " + activeInput,
                  id: "docsearch",
                  type: "text",
                  onKeyDown: onKeyDown,
                  onBlur: onBlur
                }), React.createElement(Icon.MagnifierGlass.make, {
                  className: "w-5 h-5"
                }));
}

function DocSearch$Textbox(Props) {
  var id = Props.id;
  React.useEffect((function () {
          var init = window.docsearch;
          if (init !== undefined) {
            Curry._1(init, {
                  apiKey: "d3d9d7cebf13a7b665e47cb85dc9c582",
                  indexName: "rescript-lang",
                  inputSelector: "#" + id
                });
          }
          
        }), []);
  var inputRef = React.useRef(null);
  var match = React.useState(function () {
        return /* Inactive */1;
      });
  var setState = match[1];
  var onClick = function (evt) {
    Curry._1(setState, (function (param) {
            return /* Active */0;
          }));
    return Belt_Option.forEach(Caml_option.nullable_to_opt(inputRef.current), (function (el) {
                  el.focus();
                  
                }));
  };
  var onBlur = function (evt) {
    return Curry._1(setState, (function (param) {
                  return /* Inactive */1;
                }));
  };
  var onKeyDown = function (evt) {
    var key = evt.key;
    if (key === "Escape") {
      return Belt_Option.forEach(Caml_option.nullable_to_opt(inputRef.current), (function (el) {
                    el.blur();
                    
                  }));
    }
    
  };
  var isActive = match[0] ? false : true;
  var activeClass = isActive ? "text-white border border-white-80" : "opacity-75";
  var activeInput = "";
  return React.createElement("div", {
              className: activeClass + " hover:text-white hover:cursor-pointer bg-night flex items-center p-2 px-3 rounded",
              onClick: onClick
            }, React.createElement(Icon.MagnifierGlass.make, {
                  className: "w-5 h-5 mr-3"
                }), React.createElement("input", {
                  ref: inputRef,
                  className: "w-32 bg-night focus:outline-none " + activeInput,
                  id: id,
                  type: "text",
                  onKeyDown: onKeyDown,
                  onBlur: onBlur
                }));
}

var Textbox = {
  make: DocSearch$Textbox
};

var make = DocSearch;

export {
  make ,
  Textbox ,
  
}
/* Icon Not a pure module */
