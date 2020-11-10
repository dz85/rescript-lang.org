

import * as Icon from "../components/Icon.js";
import * as Meta from "../components/Meta.js";
import * as $$Text from "../components/Text.js";
import * as Util from "../common/Util.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as AnsiPre from "../components/AnsiPre.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Markdown from "../components/Markdown.js";
import * as LzString from "lz-string";
import Head from "next/head";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as CodeMirror from "../components/CodeMirror.js";
import * as Navigation from "../components/Navigation.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Belt_Result from "bs-platform/lib/es6/belt_Result.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as HighlightJs from "../common/HighlightJs.js";
import * as Router from "next/router";
import * as CompilerManagerHook from "../common/CompilerManagerHook.js";
import * as RescriptCompilerApi from "../bindings/RescriptCompilerApi.js";
import * as WarningFlagDescription from "../common/WarningFlagDescription.js";

require('../styles/main.css')
;

var LzString$1 = {};

function Playground$DropdownSelect(Props) {
  var onChange = Props.onChange;
  var name = Props.name;
  var value = Props.value;
  var disabledOpt = Props.disabled;
  var children = Props.children;
  var disabled = disabledOpt !== undefined ? disabledOpt : false;
  var opacity = disabled ? " opacity-50" : "";
  return React.createElement("select", {
              className: "text-14 bg-transparent border border-night-light inline-block rounded px-4 py-1 font-semibold" + opacity,
              disabled: disabled,
              name: name,
              value: value,
              onChange: onChange
            }, children);
}

var DropdownSelect = {
  make: Playground$DropdownSelect
};

function Playground$ToggleSelection(Props) {
  var onChange = Props.onChange;
  var values = Props.values;
  var toLabel = Props.toLabel;
  var selected = Props.selected;
  var disabledOpt = Props.disabled;
  var disabled = disabledOpt !== undefined ? disabledOpt : false;
  var values$1 = values.length === 0 ? [selected] : values;
  var i = Belt_Array.getIndexBy(values$1, (function (lang) {
          return lang === selected;
        }));
  var selectedIndex = i !== undefined ? i : 0;
  var elements = Belt_Array.mapWithIndex(values$1, (function (i, value) {
          var active = i === selectedIndex ? "bg-fire text-white font-bold" : "bg-gray-80 opacity-50";
          var label = Curry._1(toLabel, value);
          var onMouseDown = function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (i === selectedIndex) {
              return ;
            }
            var value = Belt_Array.get(values$1, i);
            if (value !== undefined) {
              return Curry._1(onChange, Caml_option.valFromOption(value));
            }
            
          };
          var onClick = function (param) {
            
          };
          return React.createElement("button", {
                      key: label,
                      className: "mr-1 px-2 py-1 rounded inline-block  " + active,
                      disabled: disabled,
                      onClick: onClick,
                      onMouseDown: onMouseDown
                    }, Util.ReactStuff.s(label));
        }));
  return React.createElement("div", {
              className: (
                disabled ? "opacity-25" : ""
              ) + "flex w-full"
            }, Util.ReactStuff.ate(elements));
}

var ToggleSelection = {
  make: Playground$ToggleSelection
};

function defaultMakeTabClass(active) {
  var rest = active ? "text-fire font-medium bg-gray-100 hover:cursor-default" : "hover:cursor-pointer";
  return "flex items-center h-12 px-4 pr-24 " + rest;
}

function Playground$Pane(Props) {
  var disabledOpt = Props.disabled;
  var tabs = Props.tabs;
  var makeTabClassOpt = Props.makeTabClass;
  var selectedOpt = Props.selected;
  var disabled = disabledOpt !== undefined ? disabledOpt : false;
  var makeTabClass = makeTabClassOpt !== undefined ? makeTabClassOpt : defaultMakeTabClass;
  var selected = selectedOpt !== undefined ? selectedOpt : 0;
  var match = React.useState(function () {
        if (selected < 0 || selected >= tabs.length) {
          return 0;
        } else {
          return selected;
        }
      });
  var setCurrent = match[1];
  var current = match[0];
  React.useEffect((function () {
          Curry._1(setCurrent, (function (param) {
                  return selected;
                }));
          
        }), [selected]);
  var headers = Belt_Array.mapWithIndex(tabs, (function (i, tab) {
          var title = tab.title;
          var onMouseDown = function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            return Curry._1(setCurrent, (function (param) {
                          return i;
                        }));
          };
          var active = current === i;
          var onClick = function (param) {
            
          };
          var className = Curry._1(makeTabClass, active);
          return React.createElement("button", {
                      key: String(i) + ("-" + title),
                      className: className,
                      disabled: disabled,
                      onClick: onClick,
                      onMouseDown: onMouseDown
                    }, Util.ReactStuff.s(title));
        }));
  var tab = Belt_Array.get(tabs, current);
  if (tab !== undefined) {
    tab.content;
  }
  var body = Belt_Array.mapWithIndex(tabs, (function (i, tab) {
          var className = current === i ? "block h-full" : "hidden";
          return React.createElement("div", {
                      key: String(i),
                      className: className
                    }, tab.content);
        }));
  return React.createElement("div", undefined, React.createElement("div", undefined, React.createElement("div", {
                      className: "flex bg-night-10 w-full " + (
                        disabled ? "opacity-50" : ""
                      )
                    }, Util.ReactStuff.ate(headers)), React.createElement("div", undefined, Util.ReactStuff.ate(body))));
}

var Pane = {
  defaultMakeTabClass: defaultMakeTabClass,
  make: Playground$Pane
};

function Playground$SingleTabPane(Props) {
  var title = Props.title;
  var makeTabClass = Props.makeTabClass;
  var children = Props.children;
  var tabs = [{
      title: title,
      content: children
    }];
  var tmp = {
    tabs: tabs
  };
  if (makeTabClass !== undefined) {
    tmp.makeTabClass = Caml_option.valFromOption(makeTabClass);
  }
  return React.createElement(Playground$Pane, tmp);
}

var SingleTabPane = {
  make: Playground$SingleTabPane
};

function renderTitle(targetLang, result) {
  var errClass = "text-white-80";
  var warnClass = "text-white font-bold";
  var okClass = "text-white-80";
  var match;
  if (typeof result === "number") {
    match = [
      okClass,
      "Ready"
    ];
  } else if (result.TAG) {
    var result$1 = result._0;
    switch (result$1.TAG | 0) {
      case /* Fail */0 :
          switch (result$1._0.TAG | 0) {
            case /* SyntaxErr */0 :
                match = [
                  errClass,
                  "Syntax Errors (" + (RescriptCompilerApi.Lang.toString(targetLang) + ")")
                ];
                break;
            case /* TypecheckErr */1 :
                match = [
                  errClass,
                  "Type Errors"
                ];
                break;
            case /* WarningErr */2 :
                match = [
                  warnClass,
                  "Warning Errors"
                ];
                break;
            case /* WarningFlagErr */3 :
                match = [
                  errClass,
                  "Config Error"
                ];
                break;
            case /* OtherErr */4 :
                match = [
                  errClass,
                  "Errors"
                ];
                break;
            
          }
          break;
      case /* Success */1 :
          var warningNum = result$1._0.warnings.length;
          match = warningNum === 0 ? [
              okClass,
              "Compiled successfully"
            ] : [
              warnClass,
              "Compiled with " + (String(warningNum) + " Warning(s)")
            ];
          break;
      case /* UnexpectedError */2 :
          match = [
            errClass,
            "Unexpected Error"
          ];
          break;
      case /* Unknown */3 :
          match = [
            errClass,
            "Unknown Result"
          ];
          break;
      
    }
  } else {
    switch (result._0.TAG | 0) {
      case /* Success */0 :
          match = [
            okClass,
            "Format Successful"
          ];
          break;
      case /* Fail */1 :
          match = [
            errClass,
            "Syntax Errors"
          ];
          break;
      case /* UnexpectedError */2 :
          match = [
            errClass,
            "Unexpected Error"
          ];
          break;
      case /* Unknown */3 :
          match = [
            errClass,
            "Unknown Result"
          ];
          break;
      
    }
  }
  return React.createElement("span", {
              className: match[0]
            }, Util.ReactStuff.s(match[1]));
}

function Playground$Statusbar(Props) {
  var actionIndicatorKey = Props.actionIndicatorKey;
  var state = Props.state;
  if (typeof state === "number") {
    return null;
  }
  switch (state.TAG | 0) {
    case /* Ready */2 :
    case /* Compiling */3 :
        break;
    default:
      return null;
  }
  var ready = state._0;
  var result = ready.result;
  var activityIndicatorColor;
  if (typeof result === "number") {
    activityIndicatorColor = "bg-dark-code-3";
  } else if (result.TAG) {
    var match = result._0;
    activityIndicatorColor = match.TAG === /* Success */1 ? (
        match._0.warnings.length === 0 ? "bg-dark-code-3" : "bg-code-5"
      ) : "bg-fire-80";
  } else {
    activityIndicatorColor = result._0.TAG ? "bg-fire-80" : "bg-dark-code-3";
  }
  return React.createElement("div", {
              className: "py-2 pb-3 flex items-center text-white " + activityIndicatorColor
            }, React.createElement("div", {
                  className: "flex items-center font-medium px-4"
                }, React.createElement("div", {
                      key: actionIndicatorKey,
                      className: "pr-4 animate-pulse"
                    }, renderTitle(ready.targetLang, result))));
}

var Statusbar = {
  renderTitle: renderTitle,
  make: Playground$Statusbar
};

function Playground$ResultPane$PreWrap(Props) {
  var classNameOpt = Props.className;
  var children = Props.children;
  var className = classNameOpt !== undefined ? classNameOpt : "";
  return React.createElement("pre", {
              className: "whitespace-pre-wrap " + className
            }, children);
}

var PreWrap = {
  make: Playground$ResultPane$PreWrap
};

function compactErrorLine(highlightOpt, prefix, locMsg) {
  var highlight = highlightOpt !== undefined ? highlightOpt : false;
  var prefixColor = prefix === "W" ? "text-code-5" : "text-fire";
  var prefixText = prefix === "W" ? "[W]" : "[E]";
  var highlightClass = highlight ? (
      prefix === "W" ? "bg-gold-15" : "bg-fire-15 rounded"
    ) : "";
  return React.createElement("div", {
              className: "font-mono mb-4 pb-6 last:mb-0 last:pb-0 last:border-0 border-b border-night-light "
            }, React.createElement("div", {
                  className: "p-2 " + highlightClass
                }, React.createElement("span", {
                      className: prefixColor
                    }, Util.ReactStuff.s(prefixText)), React.createElement("span", {
                      className: "font-medium text-night-light"
                    }, Util.ReactStuff.s(" Line " + locMsg.row + ", column " + locMsg.column + ":")), React.createElement(AnsiPre.make, {
                      className: "whitespace-pre-wrap ",
                      children: locMsg.shortMsg
                    })));
}

function isHighlighted(focusedRowCol, locMsg) {
  if (focusedRowCol !== undefined && focusedRowCol[0] === locMsg.row) {
    return focusedRowCol[1] === locMsg.column;
  } else {
    return false;
  }
}

function filterHighlightedLocMsgs(focusedRowCol, locMsgs) {
  if (focusedRowCol === undefined) {
    return locMsgs;
  }
  var fCol = focusedRowCol[1];
  var fRow = focusedRowCol[0];
  var filtered = Belt_Array.keep(locMsgs, (function (locMsg) {
          if (fRow === locMsg.row) {
            return fCol === locMsg.column;
          } else {
            return false;
          }
        }));
  if (filtered.length === 0) {
    return locMsgs;
  } else {
    return filtered;
  }
}

function filterHighlightedLocWarnings(focusedRowCol, warnings) {
  if (focusedRowCol === undefined) {
    return warnings;
  }
  var fCol = focusedRowCol[1];
  var fRow = focusedRowCol[0];
  var filtered = Belt_Array.keep(warnings, (function (warning) {
          var details = warning.details;
          if (fRow === details.row) {
            return fCol === details.column;
          } else {
            return false;
          }
        }));
  if (filtered.length === 0) {
    return warnings;
  } else {
    return filtered;
  }
}

function renderResult(focusedRowCol, targetLang, compilerVersion, result) {
  var msg;
  var json;
  if (typeof result === "number") {
    var syntax = RescriptCompilerApi.Lang.toString(targetLang);
    return React.createElement(Playground$ResultPane$PreWrap, {
                children: Util.ReactStuff.s("This playground is now running on compiler version " + compilerVersion + " with " + syntax + " syntax")
              });
  }
  if (result.TAG) {
    var result$1 = result._0;
    switch (result$1.TAG | 0) {
      case /* Fail */0 :
          var result$2 = result$1._0;
          switch (result$2.TAG | 0) {
            case /* WarningErr */2 :
                return Util.ReactStuff.ate(Belt_Array.mapWithIndex(filterHighlightedLocWarnings(focusedRowCol, result$2._0), (function (i, warning) {
                                  var match;
                                  match = warning.TAG ? [
                                      "E",
                                      warning.details
                                    ] : [
                                      "W",
                                      warning.details
                                    ];
                                  var details = match[1];
                                  return React.createElement("div", {
                                              key: String(i)
                                            }, compactErrorLine(isHighlighted(focusedRowCol, details), match[0], details));
                                })));
            case /* WarningFlagErr */3 :
                return React.createElement("div", undefined, Util.ReactStuff.s("There are some issues with your compiler flag configuration:"), Util.ReactStuff.s(result$2._0.msg));
            default:
              return Util.ReactStuff.ate(Belt_Array.mapWithIndex(filterHighlightedLocMsgs(focusedRowCol, result$2._0), (function (i, locMsg) {
                                return React.createElement("div", {
                                            key: String(i)
                                          }, compactErrorLine(isHighlighted(focusedRowCol, locMsg), "E", locMsg));
                              })));
          }
      case /* Success */1 :
          var warnings = result$1._0.warnings;
          if (warnings.length === 0) {
            return React.createElement(Playground$ResultPane$PreWrap, {
                        children: Util.ReactStuff.s("0 Errors, 0 Warnings")
                      });
          } else {
            return Util.ReactStuff.ate(Belt_Array.mapWithIndex(filterHighlightedLocWarnings(focusedRowCol, warnings), (function (i, warning) {
                              var match;
                              match = warning.TAG ? [
                                  "E",
                                  warning.details
                                ] : [
                                  "W",
                                  warning.details
                                ];
                              var details = match[1];
                              return React.createElement("div", {
                                          key: String(i)
                                        }, compactErrorLine(isHighlighted(focusedRowCol, details), match[0], details));
                            })));
          }
      case /* UnexpectedError */2 :
          return Util.ReactStuff.s(result$1._0);
      case /* Unknown */3 :
          msg = result$1._0;
          json = result$1._1;
          break;
      
    }
  } else {
    var msg$1 = result._0;
    switch (msg$1.TAG | 0) {
      case /* Success */0 :
          var match = msg$1._0;
          var toLang = match.toLang;
          var msg$2;
          if (match.fromLang === toLang) {
            msg$2 = "Formatting completed with 0 errors";
          } else {
            var toStr = RescriptCompilerApi.Lang.toString(toLang);
            msg$2 = "Switched to " + toStr + " with 0 errors";
          }
          return React.createElement(Playground$ResultPane$PreWrap, {
                      children: Util.ReactStuff.s(msg$2)
                    });
      case /* Fail */1 :
          var toLang$1 = msg$1.toLang;
          var fromLang = msg$1.fromLang;
          var errs = Util.ReactStuff.ate(Belt_Array.mapWithIndex(filterHighlightedLocMsgs(focusedRowCol, msg$1.details), (function (i, locMsg) {
                      return React.createElement("div", {
                                  key: String(i)
                                }, compactErrorLine(isHighlighted(focusedRowCol, locMsg), "E", locMsg));
                    })));
          var msg$3;
          if (fromLang === toLang$1) {
            var langStr = RescriptCompilerApi.Lang.toString(toLang$1);
            msg$3 = "The code is not valid " + langStr + " syntax.";
          } else {
            var fromStr = RescriptCompilerApi.Lang.toString(fromLang);
            var toStr$1 = RescriptCompilerApi.Lang.toString(toLang$1);
            msg$3 = "Could not convert from \"" + fromStr + "\" to \"" + toStr$1 + "\" due to malformed syntax:";
          }
          return React.createElement("div", undefined, React.createElement(Playground$ResultPane$PreWrap, {
                          className: "text-16 mb-4",
                          children: Util.ReactStuff.s(msg$3)
                        }), errs);
      case /* UnexpectedError */2 :
          return Util.ReactStuff.s(msg$1._0);
      case /* Unknown */3 :
          msg = msg$1._0;
          json = msg$1._1;
          break;
      
    }
  }
  var subheader = "font-bold text-night-light text-16";
  return React.createElement("div", undefined, React.createElement(Playground$ResultPane$PreWrap, {
                  children: null
                }, Util.ReactStuff.s("The compiler bundle API returned a result that couldn't be interpreted. Please open an issue on our "), React.createElement(Markdown.A.make, {
                      href: "https://github.com/reason-association/rescript-lang.org/issues",
                      target: "_blank",
                      children: Util.ReactStuff.s("issue tracker")
                    }), Util.ReactStuff.s(".")), React.createElement("div", {
                  className: "mt-4"
                }, React.createElement(Playground$ResultPane$PreWrap, {
                      children: null
                    }, React.createElement("div", {
                          className: subheader
                        }, Util.ReactStuff.s("Message: ")), Util.ReactStuff.s(msg))), React.createElement("div", {
                  className: "mt-4"
                }, React.createElement(Playground$ResultPane$PreWrap, {
                      children: null
                    }, React.createElement("span", {
                          className: subheader
                        }, Util.ReactStuff.s("Received JSON payload:")), React.createElement("div", undefined, Util.ReactStuff.s(JSON.stringify(json, null, 4))))));
}

function renderTitle$1(result) {
  var errClass = "text-fire";
  var warnClass = "text-code-5";
  var okClass = "text-dark-code-3";
  var match;
  if (typeof result === "number") {
    match = [
      okClass,
      "Ready"
    ];
  } else if (result.TAG) {
    var result$1 = result._0;
    switch (result$1.TAG | 0) {
      case /* Fail */0 :
          switch (result$1._0.TAG | 0) {
            case /* SyntaxErr */0 :
                match = [
                  errClass,
                  "Syntax Errors"
                ];
                break;
            case /* TypecheckErr */1 :
                match = [
                  errClass,
                  "Type Errors"
                ];
                break;
            case /* WarningErr */2 :
                match = [
                  warnClass,
                  "Warning Errors"
                ];
                break;
            case /* WarningFlagErr */3 :
                match = [
                  errClass,
                  "Config Error"
                ];
                break;
            case /* OtherErr */4 :
                match = [
                  errClass,
                  "Errors"
                ];
                break;
            
          }
          break;
      case /* Success */1 :
          var warningNum = result$1._0.warnings.length;
          match = warningNum === 0 ? [
              okClass,
              "Compiled successfully"
            ] : [
              warnClass,
              "Compiled with " + (String(warningNum) + " Warning(s)")
            ];
          break;
      case /* UnexpectedError */2 :
          match = [
            errClass,
            "Unexpected Error"
          ];
          break;
      case /* Unknown */3 :
          match = [
            errClass,
            "Unknown Result"
          ];
          break;
      
    }
  } else {
    switch (result._0.TAG | 0) {
      case /* Success */0 :
          match = [
            okClass,
            "Format Successful"
          ];
          break;
      case /* Fail */1 :
          match = [
            errClass,
            "Syntax Errors"
          ];
          break;
      case /* UnexpectedError */2 :
          match = [
            errClass,
            "Unexpected Error"
          ];
          break;
      case /* Unknown */3 :
          match = [
            errClass,
            "Unknown Result"
          ];
          break;
      
    }
  }
  return React.createElement("span", {
              className: match[0]
            }, Util.ReactStuff.s(match[1]));
}

function Playground$ResultPane(Props) {
  var targetLang = Props.targetLang;
  var compilerVersion = Props.compilerVersion;
  var focusedRowCol = Props.focusedRowCol;
  var result = Props.result;
  return React.createElement("div", {
              className: "pt-4 bg-night-dark overflow-y-auto hide-scrollbar"
            }, React.createElement("div", {
                  className: "flex items-center text-16 font-medium px-4"
                }, React.createElement("div", {
                      className: "pr-4"
                    }, renderTitle$1(result))), React.createElement("div", {
                  className: ""
                }, React.createElement("div", {
                      className: "bg-night-dark text-snow-darker px-4 py-4"
                    }, renderResult(focusedRowCol, targetLang, compilerVersion, result))));
}

var ResultPane = {
  PreWrap: PreWrap,
  compactErrorLine: compactErrorLine,
  isHighlighted: isHighlighted,
  filterHighlightedLocMsgs: filterHighlightedLocMsgs,
  filterHighlightedLocWarnings: filterHighlightedLocWarnings,
  renderResult: renderResult,
  renderTitle: renderTitle$1,
  make: Playground$ResultPane
};

function scrollToElement(parent, element) {
  if (parent.scrollHeight <= parent.clientHeight) {
    return ;
  }
  var scrollBottom = parent.clientHeight + parent.scrollTop | 0;
  var elementBottom = element.offsetTop + element.offsetHeight | 0;
  if (elementBottom > scrollBottom) {
    parent.scrollTop = elementBottom - parent.clientHeight | 0;
    return ;
  } else if ((element.offsetTop - element.offsetHeight | 0) < parent.scrollTop) {
    parent.scrollTop = element.offsetTop - element.offsetHeight | 0;
    return ;
  } else {
    return ;
  }
}

function hide(prev) {
  switch (prev.TAG | 0) {
    case /* HideSuggestion */0 :
        return prev;
    case /* ShowTokenHint */1 :
        var match = prev.lastState;
        switch (match.TAG | 0) {
          case /* HideSuggestion */0 :
          case /* ShowTokenHint */1 :
              return {
                      TAG: 0,
                      input: "",
                      [Symbol.for("name")]: "HideSuggestion"
                    };
          case /* Typing */2 :
              return {
                      TAG: 0,
                      input: match.input,
                      [Symbol.for("name")]: "HideSuggestion"
                    };
          
        }
    case /* Typing */2 :
        return {
                TAG: 0,
                input: prev.input,
                [Symbol.for("name")]: "HideSuggestion"
              };
    
  }
}

function updateInput(prev, input) {
  var suggestion;
  if (input === "") {
    suggestion = /* NoSuggestion */0;
  } else {
    var last = input.length - 1 | 0;
    var match = input[last];
    var exit = 0;
    switch (match) {
      case "+" :
      case "-" :
          exit = 1;
          break;
      default:
        var results = WarningFlagDescription.Parser.parse(input);
        if (results.TAG) {
          var exit$1 = 0;
          switch (input) {
            case "+" :
            case "-" :
                exit$1 = 2;
                break;
            default:
              suggestion = {
                TAG: 1,
                _0: results._0,
                [Symbol.for("name")]: "ErrorSuggestion"
              };
          }
          if (exit$1 === 2) {
            var results$1 = WarningFlagDescription.lookupAll(undefined);
            suggestion = {
              TAG: 0,
              modifier: input,
              precedingTokens: [],
              results: results$1,
              selected: 0,
              [Symbol.for("name")]: "FuzzySuggestions"
            };
          }
          
        } else {
          var tokens = results._0;
          var last$1 = Belt_Array.get(tokens, tokens.length - 1 | 0);
          if (last$1 !== undefined) {
            var results$2 = WarningFlagDescription.fuzzyLookup(last$1.flag);
            if (results$2.length === 0) {
              suggestion = {
                TAG: 1,
                _0: "No results",
                [Symbol.for("name")]: "ErrorSuggestion"
              };
            } else {
              var precedingTokens = Belt_Array.slice(tokens, 0, tokens.length - 1 | 0);
              var modifier = last$1.enabled ? "+" : "-";
              suggestion = {
                TAG: 0,
                modifier: modifier,
                precedingTokens: precedingTokens,
                results: results$2,
                selected: 0,
                [Symbol.for("name")]: "FuzzySuggestions"
              };
            }
          } else {
            suggestion = /* NoSuggestion */0;
          }
        }
    }
    if (exit === 1) {
      var results$3 = WarningFlagDescription.lookupAll(undefined);
      var partial = input.substring(0, last);
      var tokens$1 = WarningFlagDescription.Parser.parse(partial);
      var precedingTokens$1;
      precedingTokens$1 = tokens$1.TAG ? [] : tokens$1._0;
      suggestion = {
        TAG: 0,
        modifier: match,
        precedingTokens: precedingTokens$1,
        results: results$3,
        selected: 0,
        [Symbol.for("name")]: "FuzzySuggestions"
      };
    }
    
  }
  switch (prev.TAG | 0) {
    case /* HideSuggestion */0 :
    case /* ShowTokenHint */1 :
    case /* Typing */2 :
        return {
                TAG: 2,
                suggestion: suggestion,
                input: input,
                [Symbol.for("name")]: "Typing"
              };
    
  }
}

function selectPrevious(prev) {
  switch (prev.TAG | 0) {
    case /* HideSuggestion */0 :
    case /* ShowTokenHint */1 :
        return prev;
    case /* Typing */2 :
        var suggestion = prev.suggestion;
        if (typeof suggestion === "number") {
          return prev;
        }
        if (suggestion.TAG) {
          return prev;
        }
        var selected = suggestion.selected;
        var nextIdx = selected > 0 ? selected - 1 | 0 : suggestion.results.length - 1 | 0;
        return {
                TAG: 2,
                suggestion: {
                  TAG: 0,
                  modifier: suggestion.modifier,
                  precedingTokens: suggestion.precedingTokens,
                  results: suggestion.results,
                  selected: nextIdx,
                  [Symbol.for("name")]: "FuzzySuggestions"
                },
                input: prev.input,
                [Symbol.for("name")]: "Typing"
              };
    
  }
}

function selectNext(prev) {
  switch (prev.TAG | 0) {
    case /* HideSuggestion */0 :
    case /* ShowTokenHint */1 :
        return prev;
    case /* Typing */2 :
        var suggestion = prev.suggestion;
        if (typeof suggestion === "number") {
          return prev;
        }
        if (suggestion.TAG) {
          return prev;
        }
        var selected = suggestion.selected;
        var nextIdx = selected < (suggestion.results.length - 1 | 0) ? selected + 1 | 0 : 0;
        return {
                TAG: 2,
                suggestion: {
                  TAG: 0,
                  modifier: suggestion.modifier,
                  precedingTokens: suggestion.precedingTokens,
                  results: suggestion.results,
                  selected: nextIdx,
                  [Symbol.for("name")]: "FuzzySuggestions"
                },
                input: prev.input,
                [Symbol.for("name")]: "Typing"
              };
    
  }
}

function Playground$WarningFlagsWidget(Props) {
  var onUpdate = Props.onUpdate;
  var flags = Props.flags;
  var match = React.useState(function () {
        return {
                TAG: 0,
                input: "",
                [Symbol.for("name")]: "HideSuggestion"
              };
      });
  var setState = match[1];
  var state = match[0];
  var listboxRef = React.useRef(null);
  var inputRef = React.useRef(null);
  var chips = Util.ReactStuff.ate(Belt_Array.mapWithIndex(flags, (function (i, token) {
              var flag = token.flag;
              var enabled = token.enabled;
              var isActive;
              switch (state.TAG | 0) {
                case /* ShowTokenHint */1 :
                    isActive = state.token.flag === flag;
                    break;
                case /* HideSuggestion */0 :
                case /* Typing */2 :
                    isActive = false;
                    break;
                
              }
              var full = (
                enabled ? "+" : "-"
              ) + flag;
              var color = enabled ? (
                  isActive ? "bg-night-light text-dark-code-3" : "text-dark-code-3"
                ) : (
                  isActive ? "bg-night-light text-fire" : "text-fire"
                );
              var hoverEnabled;
              switch (state.TAG | 0) {
                case /* HideSuggestion */0 :
                    hoverEnabled = false;
                    break;
                case /* ShowTokenHint */1 :
                case /* Typing */2 :
                    hoverEnabled = true;
                    break;
                
              }
              var match;
              if (hoverEnabled) {
                var enter = function (evt) {
                  evt.preventDefault();
                  evt.stopPropagation();
                  return Curry._1(setState, (function (prev) {
                                return {
                                        TAG: 1,
                                        lastState: prev,
                                        token: token,
                                        [Symbol.for("name")]: "ShowTokenHint"
                                      };
                              }));
                };
                var leave = function (evt) {
                  evt.preventDefault();
                  evt.stopPropagation();
                  return Curry._1(setState, (function (prev) {
                                switch (prev.TAG | 0) {
                                  case /* ShowTokenHint */1 :
                                      return prev.lastState;
                                  case /* HideSuggestion */0 :
                                  case /* Typing */2 :
                                      return prev;
                                  
                                }
                              }));
                };
                match = [
                  enter,
                  leave
                ];
              } else {
                match = [
                  undefined,
                  undefined
                ];
              }
              var onClick = function (evt) {
                evt.preventDefault();
                return Curry._1(onUpdate, Belt_Array.keep(flags, (function (t) {
                                  return t.flag !== flag;
                                })));
              };
              var tmp = {
                key: String(i) + flag,
                className: color + " hover:cursor-default text-16 inline-block border border-night-light rounded-full px-2 mr-1",
                onClick: onClick
              };
              var tmp$1 = match[0];
              if (tmp$1 !== undefined) {
                tmp.onMouseEnter = Caml_option.valFromOption(tmp$1);
              }
              var tmp$2 = match[1];
              if (tmp$2 !== undefined) {
                tmp.onMouseLeave = Caml_option.valFromOption(tmp$2);
              }
              return React.createElement("span", tmp, Util.ReactStuff.s(full));
            })));
  var onKeyDown = function (evt) {
    var key = evt.key;
    var ctrlKey = evt.ctrlKey;
    var full = (
      ctrlKey ? "CTRL+" : ""
    ) + key;
    var exit = 0;
    switch (full) {
      case "ArrowLeft" :
      case "ArrowRight" :
          return ;
      case "ArrowDown" :
      case "CTRL+n" :
          exit = 1;
          break;
      case "ArrowUp" :
      case "CTRL+p" :
          exit = 2;
          break;
      case "Enter" :
          switch (state.TAG | 0) {
            case /* HideSuggestion */0 :
            case /* ShowTokenHint */1 :
                break;
            case /* Typing */2 :
                var match = state.suggestion;
                if (typeof match !== "number" && !match.TAG) {
                  var match$1 = Belt_Array.get(match.results, match.selected);
                  if (match$1 !== undefined) {
                    var token_enabled = match.modifier === "+";
                    var token_flag = match$1[0];
                    var token = {
                      enabled: token_enabled,
                      flag: token_flag
                    };
                    var newTokens = Belt_Array.concat(match.precedingTokens, [token]);
                    var all = WarningFlagDescription.Parser.merge(flags, newTokens);
                    Curry._1(onUpdate, all);
                    Curry._1(setState, (function (prev) {
                            return updateInput(prev, "");
                          }));
                  }
                  
                }
                break;
            
          }
          evt.preventDefault();
          return ;
      case "Escape" :
          return Belt_Option.forEach(Caml_option.nullable_to_opt(inputRef.current), (function (el) {
                        el.blur();
                        
                      }));
      case "Tab" :
          switch (state.TAG | 0) {
            case /* HideSuggestion */0 :
            case /* ShowTokenHint */1 :
                return ;
            case /* Typing */2 :
                var match$2 = state.suggestion;
                if (typeof match$2 === "number") {
                  return ;
                }
                if (match$2.TAG) {
                  return ;
                }
                var match$3 = Belt_Array.get(match$2.results, match$2.selected);
                if (match$3 !== undefined) {
                  var flag = match$2.modifier + match$3[0];
                  var completed = WarningFlagDescription.Parser.tokensToString(match$2.precedingTokens) + flag;
                  Curry._1(setState, (function (prev) {
                          return updateInput(prev, completed);
                        }));
                }
                evt.preventDefault();
                return ;
            
          }
      default:
        switch (state.TAG | 0) {
          case /* HideSuggestion */0 :
          case /* ShowTokenHint */1 :
              console.log(full);
              return ;
          case /* Typing */2 :
              var tmp = state.suggestion;
              if (typeof tmp === "number") {
                console.log(full);
                return ;
              }
              if (tmp.TAG) {
                if (full !== "Backspace") {
                  evt.preventDefault();
                  return ;
                } else {
                  return ;
                }
              }
              console.log(full);
              return ;
          
        }
    }
    switch (exit) {
      case 1 :
          Curry._1(setState, selectNext);
          evt.preventDefault();
          return ;
      case 2 :
          Curry._1(setState, selectPrevious);
          evt.preventDefault();
          return ;
      
    }
  };
  var suggestions;
  switch (state.TAG | 0) {
    case /* HideSuggestion */0 :
        suggestions = undefined;
        break;
    case /* ShowTokenHint */1 :
        var token = state.token;
        suggestions = Caml_option.some(Util.ReactStuff.ate(Belt_Array.map(WarningFlagDescription.lookup(token.flag), (function (param) {
                        var match = token.enabled ? [
                            "(Enabled) ",
                            "text-dark-code-3"
                          ] : [
                            "(Disabled) ",
                            "text-fire"
                          ];
                        return React.createElement("div", {
                                    key: param[0]
                                  }, React.createElement("span", {
                                        className: match[1]
                                      }, Util.ReactStuff.s(match[0])), Util.ReactStuff.s(param[1]));
                      }))));
        break;
    case /* Typing */2 :
        var msg = state.suggestion;
        var tmp;
        if (typeof msg === "number") {
          tmp = Util.ReactStuff.s("Type + / - followed by a number or letter (e.g. +a+1)");
        } else if (msg.TAG) {
          tmp = Util.ReactStuff.s(msg._0);
        } else {
          var selected = msg.selected;
          var precedingTokens = msg.precedingTokens;
          var modifier = msg.modifier;
          tmp = Util.ReactStuff.ate(Belt_Array.mapWithIndex(msg.results, (function (i, param) {
                      var flag = param[0];
                      var activeClass = selected === i ? "bg-night-light" : "";
                      var ref = selected === i ? Caml_option.some(function (dom) {
                              var parent = listboxRef.current;
                              if (!(parent == null) && !(dom == null)) {
                                return scrollToElement(parent, dom);
                              }
                              
                            }) : undefined;
                      var onMouseEnter = function (evt) {
                        evt.preventDefault();
                        return Curry._1(setState, (function (prev) {
                                      switch (prev.TAG | 0) {
                                        case /* HideSuggestion */0 :
                                        case /* ShowTokenHint */1 :
                                            return prev;
                                        case /* Typing */2 :
                                            var fuzzySuggestion = prev.suggestion;
                                            if (typeof fuzzySuggestion === "number" || fuzzySuggestion.TAG) {
                                              return prev;
                                            } else {
                                              return {
                                                      TAG: 2,
                                                      suggestion: {
                                                        TAG: 0,
                                                        modifier: fuzzySuggestion.modifier,
                                                        precedingTokens: fuzzySuggestion.precedingTokens,
                                                        results: fuzzySuggestion.results,
                                                        selected: i,
                                                        [Symbol.for("name")]: "FuzzySuggestions"
                                                      },
                                                      input: state.input,
                                                      [Symbol.for("name")]: "Typing"
                                                    };
                                            }
                                        
                                      }
                                    }));
                      };
                      var onClick = function (evt) {
                        evt.preventDefault();
                        return Curry._1(setState, (function (prev) {
                                      switch (prev.TAG | 0) {
                                        case /* HideSuggestion */0 :
                                        case /* ShowTokenHint */1 :
                                            return prev;
                                        case /* Typing */2 :
                                            var full = modifier + flag;
                                            var completed = WarningFlagDescription.Parser.tokensToString(precedingTokens) + full;
                                            return updateInput(prev, completed);
                                        
                                      }
                                    }));
                      };
                      var tmp = {
                        key: flag,
                        className: activeClass,
                        onMouseDown: onClick,
                        onMouseEnter: onMouseEnter
                      };
                      if (ref !== undefined) {
                        tmp.ref = Caml_option.valFromOption(ref);
                      }
                      return React.createElement("div", tmp, Util.ReactStuff.s(modifier + (flag + (": " + param[1]))));
                    })));
        }
        suggestions = Caml_option.some(tmp);
        break;
    
  }
  var suggestionBox = Belt_Option.getWithDefault(Belt_Option.map(suggestions, (function (elements) {
              return React.createElement("div", {
                          ref: listboxRef,
                          className: "p-2 absolute overflow-auto z-50 border-b rounded border-l border-r block w-full bg-gray-100",
                          style: {
                            maxHeight: "15rem"
                          }
                        }, elements);
            })), null);
  var onChange = function (evt) {
    evt.preventDefault();
    var input = evt.target.value;
    return Curry._1(setState, (function (prev) {
                  return updateInput(prev, input);
                }));
  };
  var onBlur = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    return Curry._1(setState, hide);
  };
  var onFocus = function (evt) {
    var input = evt.target.value;
    return Curry._1(setState, (function (prev) {
                  return updateInput(prev, input);
                }));
  };
  var isActive;
  switch (state.TAG | 0) {
    case /* HideSuggestion */0 :
        isActive = false;
        break;
    case /* ShowTokenHint */1 :
    case /* Typing */2 :
        isActive = true;
        break;
    
  }
  var deleteButton;
  var exit = 0;
  var len = flags.length;
  if (len !== 1) {
    if (len !== 0) {
      exit = 1;
    } else {
      deleteButton = null;
    }
  } else {
    var match$1 = flags[0];
    if (match$1.enabled || match$1.flag !== "a") {
      exit = 1;
    } else {
      deleteButton = null;
    }
  }
  if (exit === 1) {
    var onMouseDown = function (evt) {
      evt.preventDefault();
      return Curry._1(onUpdate, [{
                    enabled: false,
                    flag: "a"
                  }]);
    };
    var onClick = function (param) {
      
    };
    var onFocus$1 = function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      
    };
    deleteButton = React.createElement("button", {
          className: "focus:outline-none self-start focus:shadow-outline hover:cursor-pointer hover:bg-night-light p-2 rounded-full",
          tabIndex: 0,
          onFocus: onFocus$1,
          onClick: onClick,
          onMouseDown: onMouseDown
        }, React.createElement(Icon.Close.make, {}));
  }
  var activeClass = isActive ? "border-white" : "border-night-light";
  var areaOnFocus = function (evt) {
    if (!isActive) {
      return Belt_Option.forEach(Caml_option.nullable_to_opt(inputRef.current), (function (el) {
                    el.focus();
                    
                  }));
    }
    
  };
  var inputValue;
  switch (state.TAG | 0) {
    case /* HideSuggestion */0 :
        inputValue = state.input;
        break;
    case /* ShowTokenHint */1 :
        var match$2 = state.lastState;
        switch (match$2.TAG | 0) {
          case /* HideSuggestion */0 :
          case /* ShowTokenHint */1 :
              inputValue = "";
              break;
          case /* Typing */2 :
              inputValue = match$2.input;
              break;
          
        }
        break;
    case /* Typing */2 :
        inputValue = state.input;
        break;
    
  }
  return React.createElement("div", {
              className: "relative",
              tabIndex: -1,
              onKeyDown: onKeyDown,
              onFocus: areaOnFocus
            }, React.createElement("div", {
                  className: "flex justify-between border p-2 " + activeClass
                }, React.createElement("div", undefined, chips, React.createElement("input", {
                          ref: inputRef,
                          className: "outline-none bg-night-dark placeholder-snow-darker placeholder-opacity-50",
                          tabIndex: 0,
                          placeholder: "Flags",
                          type: "text",
                          value: inputValue,
                          onFocus: onFocus,
                          onBlur: onBlur,
                          onChange: onChange
                        })), deleteButton), suggestionBox);
}

var WarningFlagsWidget = {
  scrollToElement: scrollToElement,
  hide: hide,
  updateInput: updateInput,
  selectPrevious: selectPrevious,
  selectNext: selectNext,
  make: Playground$WarningFlagsWidget
};

function Playground$ConsolePane(Props) {
  return React.createElement("div", {
              className: "p-4 pt-8"
            }, React.createElement(AnsiPre.make, {
                  children: "> console not implemented yet (coming soon)"
                }));
}

var ConsolePane = {
  make: Playground$ConsolePane
};

function Playground$Settings(Props) {
  var readyState = Props.readyState;
  var dispatch = Props.dispatch;
  var setConfig = Props.setConfig;
  var editorCode = Props.editorCode;
  var config = Props.config;
  var match = readyState.targetLang;
  switch (match) {
    case /* Reason */0 :
        break;
    case /* OCaml */1 :
        break;
    case /* Res */2 :
        break;
    
  }
  var availableTargetLangs = RescriptCompilerApi.Version.availableLanguages(readyState.selected.apiVersion);
  var onTargetLangSelect = function (lang) {
    return Curry._1(dispatch, {
                TAG: 1,
                lang: lang,
                code: editorCode.current,
                [Symbol.for("name")]: "SwitchLanguage"
              });
  };
  var onWarningFlagsUpdate = function (flags) {
    var normalizeEmptyFlags = function (flags) {
      if (flags.length !== 0) {
        return flags;
      } else {
        return [{
                  enabled: false,
                  flag: "a"
                }];
      }
    };
    return Curry._1(setConfig, {
                module_system: config.module_system,
                warn_flags: WarningFlagDescription.Parser.tokensToString(normalizeEmptyFlags(flags))
              });
  };
  var onModuleSystemUpdate = function (module_system) {
    return Curry._1(setConfig, {
                module_system: module_system,
                warn_flags: config.warn_flags
              });
  };
  var warnFlagTokens = Belt_Result.getWithDefault(WarningFlagDescription.Parser.parse(config.warn_flags), []);
  var onResetClick = function (evt) {
    evt.preventDefault();
    return Curry._1(setConfig, {
                module_system: "nodejs",
                warn_flags: "+a-4-9-20-40-41-42-50-61-102"
              });
  };
  var titleClass = "text-18 font-bold mb-2";
  return React.createElement("div", {
              className: "p-4 pt-8 bg-night-dark text-snow-darker"
            }, React.createElement("div", undefined, React.createElement("div", {
                      className: titleClass
                    }, Util.ReactStuff.s("ReScript Version")), React.createElement(Playground$DropdownSelect, {
                      onChange: (function (evt) {
                          evt.preventDefault();
                          var id = evt.target.value;
                          return Curry._1(dispatch, {
                                      TAG: 0,
                                      id: id,
                                      libraries: readyState.selected.libraries,
                                      [Symbol.for("name")]: "SwitchToCompiler"
                                    });
                        }),
                      name: "compilerVersions",
                      value: readyState.selected.id,
                      children: Util.ReactStuff.ate(Belt_Array.map(readyState.versions, (function (version) {
                                  return React.createElement("option", {
                                              key: version,
                                              className: "py-4",
                                              value: version
                                            }, Util.ReactStuff.s(version));
                                })))
                    })), React.createElement("div", {
                  className: "mt-6"
                }, React.createElement("div", {
                      className: titleClass
                    }, Util.ReactStuff.s("Syntax")), React.createElement(Playground$ToggleSelection, {
                      onChange: onTargetLangSelect,
                      values: availableTargetLangs,
                      toLabel: (function (lang) {
                          return RescriptCompilerApi.Lang.toExt(lang).toUpperCase();
                        }),
                      selected: readyState.targetLang
                    })), React.createElement("div", {
                  className: "mt-6"
                }, React.createElement("div", {
                      className: titleClass
                    }, Util.ReactStuff.s("Module-System")), React.createElement(Playground$ToggleSelection, {
                      onChange: onModuleSystemUpdate,
                      values: [
                        "nodejs",
                        "es6"
                      ],
                      toLabel: (function (value) {
                          return value;
                        }),
                      selected: config.module_system
                    }), React.createElement("div", {
                      className: "mt-8"
                    }, React.createElement("div", {
                          className: titleClass
                        }, Util.ReactStuff.s("Warning Flags"), React.createElement("button", {
                              className: "ml-6 text-14 " + $$Text.Link.standalone,
                              onMouseDown: onResetClick
                            }, Util.ReactStuff.s("[reset]"))), React.createElement("div", {
                          className: "flex justify-end"
                        }), React.createElement("div", {
                          style: {
                            maxWidth: "40rem"
                          }
                        }, React.createElement(Playground$WarningFlagsWidget, {
                              onUpdate: onWarningFlagsUpdate,
                              flags: warnFlagTokens
                            })))));
}

var Settings = {
  make: Playground$Settings
};

function Playground$ControlPanel$Button(Props) {
  var children = Props.children;
  var onClick = Props.onClick;
  var tmp = {
    className: "inline-block text-sky hover:cursor-pointer hover:bg-sky hover:text-white-80 rounded border active:bg-sky-80 border-sky-80 px-2 py-1 "
  };
  if (onClick !== undefined) {
    tmp.onClick = Caml_option.valFromOption(onClick);
  }
  return React.createElement("button", tmp, children);
}

var Button = {
  make: Playground$ControlPanel$Button
};

var copyToClipboard = (function(str) {
      try {
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
      return true;
      } catch(e) {
        return false;
      }
    });

function Playground$ControlPanel$ShareButton(Props) {
  var createShareLink = Props.createShareLink;
  var actionIndicatorKey = Props.actionIndicatorKey;
  var match = React.useState(function () {
        return /* Init */0;
      });
  var setState = match[1];
  React.useEffect((function () {
          Curry._1(setState, (function (param) {
                  return /* Init */0;
                }));
          
        }), [actionIndicatorKey]);
  var onClick = function (evt) {
    evt.preventDefault();
    var url = Curry._1(createShareLink, undefined);
    var ret = copyToClipboard(url);
    if (ret) {
      return Curry._1(setState, (function (param) {
                    return /* CopySuccess */1;
                  }));
    }
    
  };
  var match$1;
  switch (match[0]) {
    case /* Init */0 :
        match$1 = [
          "Copy Share Link",
          " bg-sky active:bg-sky-80 border-sky-80"
        ];
        break;
    case /* CopySuccess */1 :
        match$1 = [
          "Copied to clipboard!",
          "bg-dark-code-3 border-dark-code-3"
        ];
        break;
    case /* CopyFailed */2 :
        match$1 = [
          "Copy failed...",
          ""
        ];
        break;
    
  }
  return React.createElement(React.Fragment, undefined, React.createElement("button", {
                  className: match$1[1] + " w-40 transition-all duration-500 ease-in-out inline-block hover:cursor-pointer hover:text-white-80 text-white rounded border px-2 py-1 ",
                  onClick: onClick
                }, Util.ReactStuff.s(match$1[0])));
}

var ShareButton = {
  copyToClipboard: copyToClipboard,
  make: Playground$ControlPanel$ShareButton
};

function Playground$ControlPanel(Props) {
  var actionIndicatorKey = Props.actionIndicatorKey;
  var state = Props.state;
  var dispatch = Props.dispatch;
  var editorCode = Props.editorCode;
  var router = Router.useRouter();
  var children;
  var exit = 0;
  if (typeof state === "number") {
    children = Util.ReactStuff.s("Initializing...");
  } else {
    switch (state.TAG | 0) {
      case /* SetupFailed */0 :
          children = null;
          break;
      case /* SwitchingCompiler */1 :
          children = Util.ReactStuff.s("Switching Compiler...");
          break;
      case /* Ready */2 :
      case /* Compiling */3 :
          exit = 1;
          break;
      
    }
  }
  if (exit === 1) {
    var ready = state._0;
    var onFormatClick = function (evt) {
      evt.preventDefault();
      return Curry._1(dispatch, {
                  TAG: 2,
                  _0: editorCode.current,
                  [Symbol.for("name")]: "Format"
                });
    };
    var createShareLink = function (param) {
      var lang = ready.targetLang;
      var params = lang >= 2 ? [] : [[
            "ext",
            RescriptCompilerApi.Lang.toExt(lang)
          ]];
      params.push([
            "code",
            LzString.compressToEncodedURIComponent(editorCode.current)
          ]);
      var querystring = Belt_Array.reduce(params, "", (function (acc, next) {
              var value = next[1];
              var key = next[0];
              if (acc === "") {
                return "?" + (key + ("=" + value));
              } else {
                return acc + ("&" + (key + ("=" + value)));
              }
            }));
      return window.location.origin + (router.route + querystring);
    };
    children = React.createElement(React.Fragment, undefined, React.createElement("div", {
              className: "mr-2"
            }, React.createElement(Playground$ControlPanel$Button, {
                  children: Util.ReactStuff.s("Format"),
                  onClick: onFormatClick
                })), React.createElement(Playground$ControlPanel$ShareButton, {
              createShareLink: createShareLink,
              actionIndicatorKey: actionIndicatorKey
            }));
  }
  return React.createElement("div", {
              className: "flex justify-end items-center h-12 bg-night-10 px-4"
            }, children);
}

var ControlPanel = {
  Button: Button,
  ShareButton: ShareButton,
  make: Playground$ControlPanel
};

function locMsgToCmError(kind, locMsg) {
  return {
          row: locMsg.row,
          column: locMsg.column,
          endRow: locMsg.endRow,
          endColumn: locMsg.endColumn,
          text: locMsg.shortMsg,
          kind: kind
        };
}

function codeFromResult(result) {
  if (typeof result === "number") {
    return "/* No JS code generated */";
  }
  if (!result.TAG) {
    return "/* No JS code generated */";
  }
  var comp = result._0;
  if (comp.TAG === /* Success */1) {
    return comp._0.js_code;
  } else {
    return "/* No JS code generated */";
  }
}

function Playground$OutputPanel(Props) {
  var compilerDispatch = Props.compilerDispatch;
  var compilerState = Props.compilerState;
  var editorCode = Props.editorCode;
  var prevState = React.useRef(undefined);
  var prev = prevState.current;
  var cmCode;
  if (prev !== undefined) {
    var exit = 0;
    var exit$1 = 0;
    if (typeof compilerState === "number") {
      cmCode = undefined;
    } else {
      switch (compilerState.TAG | 0) {
        case /* Ready */2 :
            if (typeof compilerState._0.result === "number") {
              cmCode = undefined;
            } else {
              exit$1 = 2;
            }
            break;
        case /* Compiling */3 :
            exit$1 = 2;
            break;
        default:
          cmCode = undefined;
      }
    }
    if (exit$1 === 2) {
      if (typeof prev === "number" || prev.TAG !== /* Ready */2) {
        exit = 1;
      } else {
        var result = prev._0.result;
        if (typeof compilerState !== "number") {
          if (compilerState.TAG === /* Ready */2) {
            var ready = compilerState._0;
            var match = ready.result;
            cmCode = typeof match === "number" || !(match.TAG && match._0.TAG === /* Success */1) ? undefined : codeFromResult(ready.result);
          } else {
            cmCode = typeof result === "number" || !(result.TAG && result._0.TAG === /* Success */1) ? undefined : codeFromResult(result);
          }
        }
        
      }
    }
    if (exit === 1 && typeof compilerState !== "number") {
      if (compilerState.TAG === /* Ready */2) {
        var result$1 = compilerState._0.result;
        if (typeof result$1 !== "number") {
          cmCode = result$1.TAG && result$1._0.TAG === /* Success */1 ? codeFromResult(result$1) : undefined;
        }
        
      } else {
        cmCode = undefined;
      }
    }
    
  } else {
    cmCode = typeof compilerState === "number" || compilerState.TAG !== /* Ready */2 ? undefined : codeFromResult(compilerState._0.result);
  }
  prevState.current = compilerState;
  var resultPane;
  var exit$2 = 0;
  if (typeof compilerState === "number") {
    resultPane = null;
  } else {
    switch (compilerState.TAG | 0) {
      case /* Ready */2 :
      case /* Compiling */3 :
          exit$2 = 1;
          break;
      default:
        resultPane = null;
    }
  }
  if (exit$2 === 1) {
    var ready$1 = compilerState._0;
    var match$1 = ready$1.result;
    var exit$3 = 0;
    if (typeof match$1 === "number") {
      exit$3 = 2;
    } else if (match$1.TAG) {
      if (match$1._0.TAG === /* Success */1) {
        resultPane = null;
      } else {
        exit$3 = 2;
      }
    } else if (match$1._0.TAG) {
      exit$3 = 2;
    } else {
      resultPane = null;
    }
    if (exit$3 === 2) {
      resultPane = React.createElement(Playground$ResultPane, {
            targetLang: ready$1.targetLang,
            compilerVersion: ready$1.selected.compilerVersion,
            result: ready$1.result
          });
    }
    
  }
  var match$2 = cmCode !== undefined ? [
      cmCode,
      true
    ] : [
      "",
      false
    ];
  var codeElement = React.createElement("pre", {
        className: "whitespace-pre-wrap overflow-y-auto p-4 " + (
          match$2[1] ? "block" : "hidden"
        ),
        style: {
          height: "calc(100vh - 11.5rem)"
        }
      }, HighlightJs.renderHLJS(undefined, true, match$2[0], "js", undefined));
  var output = React.createElement("div", {
        className: "relative w-full bg-night-dark text-snow-darker",
        style: {
          height: "calc(100vh - 9rem)"
        }
      }, resultPane, codeElement);
  var errorPane;
  if (typeof compilerState === "number") {
    errorPane = React.createElement("div", undefined, Util.ReactStuff.s("Initalizing Playground..."));
  } else if (compilerState.TAG) {
    var ready$2 = compilerState._0;
    errorPane = React.createElement(Playground$ResultPane, {
          targetLang: ready$2.targetLang,
          compilerVersion: ready$2.selected.compilerVersion,
          result: ready$2.result
        });
  } else {
    errorPane = React.createElement("div", undefined, Util.ReactStuff.s("Setup failed: " + compilerState._0));
  }
  var settingsPane;
  if (typeof compilerState === "number") {
    settingsPane = React.createElement("div", undefined, Util.ReactStuff.s("Initalizing Playground..."));
  } else if (compilerState.TAG) {
    var ready$3 = compilerState._0;
    var config = ready$3.selected.config;
    var setConfig = function (config) {
      return Curry._1(compilerDispatch, {
                  TAG: 4,
                  _0: config,
                  [Symbol.for("name")]: "UpdateConfig"
                });
    };
    settingsPane = React.createElement(Playground$Settings, {
          readyState: ready$3,
          dispatch: compilerDispatch,
          setConfig: setConfig,
          editorCode: editorCode,
          config: config
        });
  } else {
    settingsPane = React.createElement("div", undefined, Util.ReactStuff.s("Setup failed: " + compilerState._0));
  }
  var prevSelected = React.useRef(0);
  var selected;
  if (typeof compilerState === "number") {
    selected = 0;
  } else {
    switch (compilerState.TAG | 0) {
      case /* Ready */2 :
          var match$3 = compilerState._0.result;
          selected = typeof match$3 === "number" ? 1 : (
              match$3.TAG ? (
                  match$3._0.TAG === /* Success */1 ? 0 : 1
                ) : (
                  match$3._0.TAG ? 1 : 0
                )
            );
          break;
      case /* Compiling */3 :
          selected = prevSelected.current;
          break;
      default:
        selected = 0;
    }
  }
  prevSelected.current = selected;
  var tabs = [
    {
      title: "JavaScript",
      content: output
    },
    {
      title: "Problems",
      content: React.createElement("div", {
            style: {
              height: "50%"
            }
          }, errorPane)
    },
    {
      title: "Settings",
      content: React.createElement("div", {
            style: {
              height: "50%"
            }
          }, settingsPane)
    }
  ];
  var makeTabClass = function (active) {
    var activeClass = active ? "text-fire font-medium bg-night-dark hover:cursor-default" : "";
    return "flex items-center h-12 px-4 pr-16 " + activeClass;
  };
  return React.createElement("div", {
              className: "h-full bg-night-dark"
            }, React.createElement(Playground$Pane, {
                  tabs: tabs,
                  makeTabClass: makeTabClass
                }));
}

var OutputPanel = {
  codeFromResult: codeFromResult,
  make: Playground$OutputPanel
};

var initialResContent = "// Please note:\n// ---\n// The Playground is still a work in progress\n// ReScript / old Reason syntax should parse just\n// fine (go to the \"Settings\" panel for toggling syntax).\n//\n// Feel free to play around and compile some\n// ReScript code!\n\nmodule Button = {\n  @react.component\n  let make = (~count: int) => {\n    let times = switch count {\n    | 1 => \"once\"\n    | 2 => \"twice\"\n    | n => Belt.Int.toString(n) ++ \" times\"\n    }\n    let msg = \"Click me \" ++ times\n\n    <button> {msg->React.string} </button>\n  }\n}\n";

var initialReContent = "Js.log(\"Hello Reason 3.6!\");";

function Playground$default(Props) {
  var router = Router.useRouter();
  var match = Js_dict.get(router.query, "ext");
  var initialLang = match === "re" ? /* Reason */0 : /* Res */2;
  var match$1 = Js_dict.get(router.query, "code");
  var initialContent;
  if (match$1 !== undefined) {
    initialContent = LzString.decompressFromEncodedURIComponent(match$1);
  } else {
    switch (initialLang) {
      case /* Reason */0 :
          initialContent = initialReContent;
          break;
      case /* OCaml */1 :
      case /* Res */2 :
          initialContent = initialResContent;
          break;
      
    }
  }
  React.useEffect((function () {
          if (router.asPath !== "/try") {
            router.replace("/try");
          }
          
        }), [router.route]);
  var match$2 = React.useState(function () {
        return 0;
      });
  var setActionCount = match$2[1];
  var actionCount = match$2[0];
  var onAction = function (param) {
    return Curry._1(setActionCount, (function (prev) {
                  if (prev > 1000000) {
                    return 0;
                  } else {
                    return prev + 1 | 0;
                  }
                }));
  };
  var match$3 = CompilerManagerHook.useCompilerManager(initialLang, onAction, undefined);
  var compilerDispatch = match$3[1];
  var compilerState = match$3[0];
  var overlayState = React.useState(function () {
        return false;
      });
  var windowWidth = CodeMirror.useWindowWidth(undefined);
  var match$4 = React.useState(function () {
        
      });
  var setFocusedRowCol = match$4[1];
  var editorCode = React.useRef(initialContent);
  if (typeof compilerState !== "number" && compilerState.TAG === /* Ready */2) {
    var ready = compilerState._0;
    var match$5 = ready.result;
    if (typeof match$5 === "number") {
      Curry._1(compilerDispatch, {
            TAG: 3,
            _0: ready.targetLang,
            _1: editorCode.current,
            [Symbol.for("name")]: "CompileCode"
          });
    } else if (!match$5.TAG) {
      var match$6 = match$5._0;
      if (!match$6.TAG) {
        editorCode.current = match$6._0.code;
      }
      
    }
    
  }
  var typingTimer = React.useRef(undefined);
  var timeoutCompile = React.useRef(function (param) {
        
      });
  React.useEffect((function () {
          timeoutCompile.current = (function (param) {
              if (typeof compilerState === "number" || compilerState.TAG !== /* Ready */2) {
                return ;
              } else {
                return Curry._1(compilerDispatch, {
                            TAG: 3,
                            _0: compilerState._0.targetLang,
                            _1: editorCode.current,
                            [Symbol.for("name")]: "CompileCode"
                          });
              }
            });
          
        }), [compilerState]);
  var cmErrors;
  if (typeof compilerState === "number") {
    cmErrors = [];
  } else if (compilerState.TAG === /* Ready */2) {
    var result = compilerState._0.result;
    if (typeof result === "number") {
      cmErrors = [];
    } else if (result.TAG) {
      var result$1 = result._0;
      switch (result$1.TAG | 0) {
        case /* Fail */0 :
            var result$2 = result$1._0;
            switch (result$2.TAG | 0) {
              case /* WarningErr */2 :
                  cmErrors = Belt_Array.reduce(result$2._0, [], (function (acc, next) {
                          var warn = locMsgToCmError("Warning", next.details);
                          acc.push(warn);
                          return acc;
                        }));
                  break;
              case /* WarningFlagErr */3 :
                  cmErrors = [];
                  break;
              default:
                cmErrors = Belt_Array.map(result$2._0, (function (param) {
                        return locMsgToCmError("Error", param);
                      }));
            }
            break;
        case /* Success */1 :
            cmErrors = Belt_Array.reduce(result$1._0.warnings, [], (function (acc, next) {
                    var warn = locMsgToCmError("Warning", next.details);
                    acc.push(warn);
                    return acc;
                  }));
            break;
        case /* UnexpectedError */2 :
        case /* Unknown */3 :
            cmErrors = [];
            break;
        
      }
    } else {
      var match$7 = result._0;
      cmErrors = match$7.TAG === /* Fail */1 ? Belt_Array.map(match$7.details, (function (param) {
                return locMsgToCmError("Error", param);
              })) : [];
    }
  } else {
    cmErrors = [];
  }
  var tmp = {
    className: "w-full lg:border-r-4 pl-2 border-night"
  };
  var tmp$1 = windowWidth > 1024 ? ({
        maxWidth: "65%"
      }) : undefined;
  if (tmp$1 !== undefined) {
    tmp.style = Caml_option.valFromOption(tmp$1);
  }
  return React.createElement(React.Fragment, undefined, React.createElement(Meta.make, {
                  description: "Try ReScript in the browser",
                  title: "ReScript Playground"
                }), React.createElement(Head, {
                  children: React.createElement("style", undefined, Util.ReactStuff.s("body { background-color: #010427; } "))
                }), React.createElement("div", {
                  className: "text-16 bg-gray-100"
                }, React.createElement("div", {
                      className: "text-night text-14"
                    }, React.createElement(Navigation.make, {
                          fixed: false,
                          overlayState: overlayState
                        }), React.createElement("main", {
                          className: "bg-gray-100 lg:overflow-hidden lg:h-screen",
                          style: {
                            maxHeight: "calc(100vh - 4.5rem)"
                          }
                        }, React.createElement("div", {
                              className: "w-full h-full flex flex-col lg:flex-row border-t-4 border-night"
                            }, React.createElement("div", tmp, React.createElement("div", {
                                      className: "bg-gray-100 text-snow-darker"
                                    }, React.createElement(Playground$ControlPanel, {
                                          actionIndicatorKey: String(actionCount),
                                          state: compilerState,
                                          dispatch: compilerDispatch,
                                          editorCode: editorCode
                                        }), React.createElement(CodeMirror.make, {
                                          errors: cmErrors,
                                          minHeight: "calc(100vh - 10rem)",
                                          maxHeight: "calc(100vh - 10rem)",
                                          className: "w-full py-4",
                                          onChange: (function (value) {
                                              editorCode.current = value;
                                              var timer = typingTimer.current;
                                              if (timer !== undefined) {
                                                clearTimeout(Caml_option.valFromOption(timer));
                                              }
                                              var timer$1 = setTimeout((function (param) {
                                                      Curry._1(timeoutCompile.current, undefined);
                                                      typingTimer.current = undefined;
                                                      
                                                    }), 100);
                                              typingTimer.current = Caml_option.some(timer$1);
                                              
                                            }),
                                          onMarkerFocus: (function (rowCol) {
                                              return Curry._1(setFocusedRowCol, (function (prev) {
                                                            return rowCol;
                                                          }));
                                            }),
                                          onMarkerFocusLeave: (function (param) {
                                              return Curry._1(setFocusedRowCol, (function (param) {
                                                            
                                                          }));
                                            }),
                                          value: editorCode.current,
                                          mode: "reason"
                                        }))), React.createElement("div", {
                                  className: "relative w-full overflow-x-hidden h-screen lg:h-auto lg:w-1/2",
                                  style: {
                                    maxWidth: windowWidth > 1024 ? "56rem" : "100%"
                                  }
                                }, React.createElement(Playground$OutputPanel, {
                                      actionIndicatorKey: String(actionCount),
                                      compilerDispatch: compilerDispatch,
                                      compilerState: compilerState,
                                      editorCode: editorCode
                                    }), React.createElement("div", {
                                      className: "absolute bottom-0 w-full"
                                    }, React.createElement(Playground$Statusbar, {
                                          actionIndicatorKey: String(actionCount),
                                          state: compilerState
                                        }))))))));
}

var Api;

var $$default = Playground$default;

export {
  Api ,
  LzString$1 as LzString,
  DropdownSelect ,
  ToggleSelection ,
  Pane ,
  SingleTabPane ,
  Statusbar ,
  ResultPane ,
  WarningFlagsWidget ,
  ConsolePane ,
  Settings ,
  ControlPanel ,
  locMsgToCmError ,
  OutputPanel ,
  initialResContent ,
  initialReContent ,
  $$default ,
  $$default as default,
  
}
/*  Not a pure module */
