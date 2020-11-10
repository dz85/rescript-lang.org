

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Int from "bs-platform/lib/es6/belt_Int.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Codemirror from "codemirror";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

import "codemirror/lib/codemirror.css";
import "../styles/cm.css";

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  require("codemirror/mode/javascript/javascript");
  require("codemirror/addon/scroll/simplescrollbars");
  require("../plugins/cm-reason-mode");
}
;

var useWindowWidth = (() => {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0
    };
  }

  const [windowSize, setWindowSize] = React.useState(getSize);

  let throttled = false;
  React.useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      if(!throttled) {
        setWindowSize(getSize());

        throttled = true;
        setTimeout(() => { throttled = false }, 300);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  if(windowSize) {
    return windowSize.width;
  }
  return null;
  });

var errorGutterId = "errors";

var Options = {};

var TextMarker = {};

var $$Attr = {};

var MarkTextOption = {
  $$Attr: $$Attr
};

var CM = {
  errorGutterId: errorGutterId,
  Options: Options,
  TextMarker: TextMarker,
  MarkTextOption: MarkTextOption
};

var $$Event = {};

var DomUtil = {
  $$Event: $$Event
};

var $$Error = {};

function make(rowCol, kind, wrapper, param) {
  var marker = document.createElement("div");
  var colorClass = kind === "Error" ? "text-fire bg-fire-15" : "text-gold bg-gold-15";
  marker.id = "gutter-marker_" + rowCol[0] + "-" + rowCol[1];
  marker.className = "flex items-center justify-center text-14 text-center ml-1 h-6 font-bold hover:cursor-pointer " + colorClass;
  marker.innerHTML = "!";
  return marker;
}

var GutterMarker = {
  make: make
};

function clearMarks(state) {
  Belt_Array.forEach(state.marked, (function (mark) {
          mark.clear();
          
        }));
  state.marked = [];
  
}

function extractRowColFromId(id) {
  var match = id.split("_");
  if (match.length !== 2) {
    return ;
  }
  var rowColStr = match[1];
  var match$1 = rowColStr.split("-");
  if (match$1.length !== 2) {
    return ;
  }
  var rowStr = match$1[0];
  var colStr = match$1[1];
  var row = Belt_Int.fromString(rowStr);
  var col = Belt_Int.fromString(colStr);
  if (row !== undefined && col !== undefined) {
    return [
            row,
            col
          ];
  }
  
}

function updateErrors(state, onMarkerFocus, onMarkerFocusLeave, cm, errors) {
  Belt_Array.forEach(state.marked, (function (mark) {
          mark.clear();
          
        }));
  state.marked = [];
  cm.clearGutter(errorGutterId);
  var wrapper = cm.getWrapperElement();
  Belt_Array.forEachWithIndex(errors, (function (_idx, e) {
          var marker = make([
                e.row,
                e.column
              ], e.kind, wrapper, undefined);
          wrapper.appendChild(marker);
          var row = e.row - 1 | 0;
          var endRow = e.endRow - 1 | 0;
          cm.setGutterMarker(row, errorGutterId, marker);
          var from_ch = e.column;
          var from = {
            line: row,
            ch: from_ch
          };
          var to__ch = e.endColumn;
          var to_ = {
            line: endRow,
            ch: to__ch
          };
          var match = e.kind;
          var markTextColor = match === "Error" ? "border-fire" : "border-gold";
          var __x = cm.markText(from, to_, {
                className: "border-b border-dotted hover:cursor-pointer " + markTextColor,
                attributes: {
                  id: "text-marker_" + (String(e.row) + ("-" + (String(e.column) + "")))
                }
              });
          state.marked.push(__x);
          
        }));
  var isMarkerId = function (id) {
    if (id.startsWith("gutter-marker")) {
      return true;
    } else {
      return id.startsWith("text-marker");
    }
  };
  wrapper.onmouseover = (function (evt) {
      var target = evt.target;
      var id = target.id;
      if (!isMarkerId(id)) {
        return ;
      }
      var rowCol = extractRowColFromId(id);
      if (rowCol !== undefined) {
        return Belt_Option.forEach(onMarkerFocus, (function (cb) {
                      return Curry._1(cb, rowCol);
                    }));
      }
      
    });
  wrapper.onmouseout = (function (evt) {
      var target = evt.target;
      var id = target.id;
      if (!isMarkerId(id)) {
        return ;
      }
      var rowCol = extractRowColFromId(id);
      if (rowCol !== undefined) {
        return Belt_Option.forEach(onMarkerFocusLeave, (function (cb) {
                      return Curry._1(cb, rowCol);
                    }));
      }
      
    });
  
}

function CodeMirror(Props) {
  var errorsOpt = Props.errors;
  var minHeight = Props.minHeight;
  var maxHeight = Props.maxHeight;
  var className = Props.className;
  var style = Props.style;
  var onChange = Props.onChange;
  var onMarkerFocus = Props.onMarkerFocus;
  var onMarkerFocusLeave = Props.onMarkerFocusLeave;
  var value = Props.value;
  var mode = Props.mode;
  var readOnlyOpt = Props.readOnly;
  var lineNumbersOpt = Props.lineNumbers;
  var scrollbarStyleOpt = Props.scrollbarStyle;
  var lineWrappingOpt = Props.lineWrapping;
  var errors = errorsOpt !== undefined ? errorsOpt : [];
  var readOnly = readOnlyOpt !== undefined ? readOnlyOpt : false;
  var lineNumbers = lineNumbersOpt !== undefined ? lineNumbersOpt : true;
  var scrollbarStyle = scrollbarStyleOpt !== undefined ? scrollbarStyleOpt : "overlay";
  var lineWrapping = lineWrappingOpt !== undefined ? lineWrappingOpt : false;
  var inputElement = React.useRef(null);
  var cmRef = React.useRef(undefined);
  var cmStateRef = React.useRef({
        marked: []
      });
  var windowWidth = Curry._1(useWindowWidth, undefined);
  React.useEffect((function () {
          var input = inputElement.current;
          if (input == null) {
            return ;
          }
          var options = {
            theme: "material",
            gutters: [
              errorGutterId,
              "CodeMirror-linenumbers"
            ],
            mode: mode,
            lineNumbers: lineNumbers,
            readOnly: readOnly,
            lineWrapping: lineWrapping,
            fixedGutter: false,
            scrollbarStyle: scrollbarStyle
          };
          var cm = Codemirror.fromTextArea(input, options);
          Belt_Option.forEach(minHeight, (function (minHeight) {
                  cm.getScrollerElement().style.minHeight = minHeight;
                  
                }));
          Belt_Option.forEach(maxHeight, (function (maxHeight) {
                  cm.getScrollerElement().style.maxHeight = maxHeight;
                  
                }));
          Belt_Option.forEach(onChange, (function (onValueChange) {
                  cm.on("change", (function (instance) {
                          return Curry._1(onValueChange, instance.getValue());
                        }));
                  
                }));
          cm.setValue(value);
          cmRef.current = Caml_option.some(cm);
          return (function (param) {
                    cm.toTextArea();
                    cmRef.current = undefined;
                    
                  });
        }), []);
  var cm = cmRef.current;
  if (cm !== undefined) {
    var cm$1 = Caml_option.valFromOption(cm);
    if (cm$1.getValue() !== value) {
      var state = cmStateRef.current;
      cm$1.operation(function () {
            return updateErrors(state, onMarkerFocus, onMarkerFocusLeave, cm$1, errors);
          });
      cm$1.setValue(value);
    }
    
  }
  var errorsFingerprint = Belt_Array.map(errors, (function (e) {
            return "" + e.row + "-" + e.column;
          })).join(";");
  React.useEffect((function () {
          var state = cmStateRef.current;
          var cm = cmRef.current;
          if (cm !== undefined) {
            var cm$1 = Caml_option.valFromOption(cm);
            cm$1.operation(function () {
                  return updateErrors(state, onMarkerFocus, onMarkerFocusLeave, cm$1, errors);
                });
          }
          
        }), [errorsFingerprint]);
  React.useEffect((function () {
          var cm = cmRef.current;
          if (cm !== undefined) {
            Caml_option.valFromOption(cm).refresh();
          }
          
        }), [
        className,
        windowWidth
      ]);
  var tmp = {};
  if (className !== undefined) {
    tmp.className = Caml_option.valFromOption(className);
  }
  if (style !== undefined) {
    tmp.style = Caml_option.valFromOption(style);
  }
  return React.createElement("div", tmp, React.createElement("textarea", {
                  ref: inputElement,
                  className: "hidden"
                }));
}

var make$1 = CodeMirror;

export {
  useWindowWidth ,
  CM ,
  DomUtil ,
  $$Error ,
  GutterMarker ,
  clearMarks ,
  extractRowColFromId ,
  updateErrors ,
  make$1 as make,
  
}
/*  Not a pure module */
