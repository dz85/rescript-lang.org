

import * as Util from "../common/Util.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as HighlightJs from "../common/HighlightJs.js";

function langShortname(lang) {
  switch (lang) {
    case "bash" :
        return "sh";
    case "ocaml" :
        return "ml";
    case "reason" :
    case "reasonml" :
        return "re";
    case "text" :
        return "";
    default:
      return lang;
  }
}

function CodeExample(Props) {
  var highlightedLinesOpt = Props.highlightedLines;
  var code = Props.code;
  var showLabelOpt = Props.showLabel;
  var langOpt = Props.lang;
  var highlightedLines = highlightedLinesOpt !== undefined ? highlightedLinesOpt : [];
  var showLabel = showLabelOpt !== undefined ? showLabelOpt : true;
  var lang = langOpt !== undefined ? langOpt : "text";
  var children = HighlightJs.renderHLJS(highlightedLines, undefined, code, lang, undefined);
  var label;
  if (showLabel) {
    var label$1 = langShortname(lang);
    label = React.createElement("div", {
          className: "flex self-end font-sans mb-4 text-sm font-bold text-night-light px-4"
        }, Util.ReactStuff.s(label$1.toUpperCase()));
  } else {
    label = React.createElement("div", {
          className: "mt-4"
        });
  }
  return React.createElement("div", {
              className: "flex w-full flex-col rounded-none xs:rounded border-t border-b xs:border border-snow-dark bg-snow-light py-2 text-night-dark"
            }, label, React.createElement("div", {
                  className: "px-4 text-base pb-2 overflow-x-auto -mt-2"
                }, children));
}

function CodeExample$Toggle(Props) {
  var tabs = Props.tabs;
  var match = React.useState(function () {
        return 0;
      });
  var setSelected = match[1];
  var selected = match[0];
  if (tabs.length !== 1) {
    var numberOfItems = tabs.length;
    var tabElements = Belt_Array.mapWithIndex(tabs, (function (i, tab) {
            var label = tab.label;
            var label$1;
            if (label !== undefined) {
              label$1 = label;
            } else {
              var lang = tab.lang;
              label$1 = lang !== undefined ? langShortname(lang).toUpperCase() : String(i);
            }
            var activeClass = selected === i ? "font-bold text-gray-100 bg-snow-light border border-b-0 border-snow-dark border-gray-20" : "border-gray-20 border-b hover:cursor-pointer";
            var onClick = function (evt) {
              evt.preventDefault();
              return Curry._1(setSelected, (function (param) {
                            return i;
                          }));
            };
            var key = label$1 + ("-" + String(i));
            var paddingX = numberOfItems >= 3 ? (
                numberOfItems >= 4 ? "" : "lg:px-8"
              ) : (
                numberOfItems > 0 ? "sm:px-16" : ""
              );
            return React.createElement("span", {
                        key: key,
                        className: paddingX + (" flex-none px-4 inline-block p-2 bg-gray-10 rounded-tl rounded-tr " + activeClass),
                        onClick: onClick
                      }, Util.ReactStuff.s(label$1));
          }));
    var children = Belt_Option.getWithDefault(Belt_Option.map(Belt_Array.get(tabs, selected), (function (tab) {
                var lang = Belt_Option.getWithDefault(tab.lang, "text");
                return HighlightJs.renderHLJS(tab.highlightedLines, undefined, tab.code, lang, undefined);
              })), null);
    return React.createElement("div", {
                className: "flex w-full flex-col rounded-none text-night-dark"
              }, React.createElement("div", {
                    className: "flex w-full overflow-auto scrolling-touch font-sans bg-transparent text-sm text-gray-60-tr"
                  }, React.createElement("div", {
                        className: "flex"
                      }, Util.ReactStuff.ate(tabElements)), React.createElement("div", {
                        className: "flex-1 border-b border-gray-20"
                      }, Util.ReactStuff.s("\u00A0"))), React.createElement("div", {
                    className: "px-4 text-base pb-4 pt-4 overflow-x-auto bg-snow-light border-snow-dark xs:rounded-b border border-t-0"
                  }, React.createElement("pre", undefined, children)));
  }
  var tab = tabs[0];
  return CodeExample({
              highlightedLines: tab.highlightedLines,
              code: tab.code,
              lang: tab.lang,
              showLabel: true
            });
}

var Toggle = {
  make: CodeExample$Toggle
};

var make = CodeExample;

export {
  langShortname ,
  make ,
  Toggle ,
  
}
/* react Not a pure module */
