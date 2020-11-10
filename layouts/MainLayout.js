

import * as React from "react";
import * as Markdown from "../components/Markdown.js";
import * as Navigation from "../components/Navigation.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as React$1 from "@mdx-js/react";

function MainLayout(Props) {
  var children = Props.children;
  var componentsOpt = Props.components;
  var components = componentsOpt !== undefined ? Caml_option.valFromOption(componentsOpt) : Markdown.$$default;
  var overlayState = React.useState(function () {
        return false;
      });
  return React.createElement(React.Fragment, undefined, React.createElement("div", {
                  className: "mb-32 mt-4 xs:mt-16"
                }, React.createElement("div", {
                      className: "text-night text-lg"
                    }, React.createElement(Navigation.make, {
                          overlayState: overlayState
                        }), React.createElement("div", {
                          className: "flex xs:justify-center overflow-hidden"
                        }, React.createElement("main", {
                              className: "mt-32 min-w-320 lg:align-center w-full px-4 md:px-8 max-w-1280 "
                            }, React.createElement(React$1.MDXProvider, {
                                  components: components,
                                  children: children
                                }))))));
}

var Link;

var make = MainLayout;

export {
  Link ,
  make ,
  
}
/* react Not a pure module */
