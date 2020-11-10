

import * as Url from "../common/Url.js";
import * as React from "react";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Markdown from "../components/Markdown.js";
import * as Belt_List from "bs-platform/lib/es6/belt_List.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as DocsLayout from "./DocsLayout.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Router from "next/router";

var tocData = (require('../index_data/reason_compiler_toc.json'));

var interopNavs = [
  {
    name: "Overview",
    href: "/docs/reason-compiler/latest/interop-overview"
  },
  {
    name: "Better Data Structures Printing (Debug Mode)",
    href: "/docs/reason-compiler/latest/better-data-structures-printing-debug-mode"
  },
  {
    name: "Miscellaneous",
    href: "/docs/reason-compiler/latest/interop-misc"
  },
  {
    name: "Decorators",
    href: "/docs/reason-compiler/latest/decorators"
  }
];

var advancedNavs = [
  {
    name: "Conditional Compilation",
    href: "/docs/reason-compiler/latest/conditional-compilation"
  },
  {
    name: "Extended Compiler Options",
    href: "/docs/reason-compiler/latest/extended-compiler-options"
  },
  {
    name: "Compiler Architecture & Principles",
    href: "/docs/reason-compiler/latest/compiler-architecture-principles"
  },
  {
    name: "Comparison to Js_of_ocaml",
    href: "/docs/reason-compiler/latest/comparison-to-jsoo"
  }
];

var categories = [
  {
    name: "Interop",
    items: interopNavs
  },
  {
    name: "Advanced",
    items: advancedNavs
  }
];

function ReasonCompilerDocsLayout(Props) {
  var componentsOpt = Props.components;
  var children = Props.children;
  var components = componentsOpt !== undefined ? Caml_option.valFromOption(componentsOpt) : Markdown.$$default;
  var router = Router.useRouter();
  var route = router.route;
  var activeToc = Belt_Option.map(Js_dict.get(tocData, route), (function (data) {
          var title = data.title;
          var entries = Belt_Array.map(data.headers, (function (header) {
                  return {
                          header: header.name,
                          href: "#" + header.href
                        };
                }));
          return {
                  title: title,
                  entries: entries
                };
        }));
  var url = Url.parse(route);
  var version = url.version;
  var version$1 = typeof version === "number" ? "latest" : version._0;
  var prefix_0 = {
    name: "Docs",
    href: "/docs/" + version$1
  };
  var prefix_1 = {
    hd: {
      name: "Old Docs",
      href: "/docs/reason-compiler/" + (version$1 + "/interop-overview")
    },
    tl: /* [] */0
  };
  var prefix = {
    hd: prefix_0,
    tl: prefix_1
  };
  var breadcrumbs = Belt_List.concat(prefix, DocsLayout.makeBreadcrumbs("/docs/manual/" + version$1, route));
  var tmp = {
    breadcrumbs: breadcrumbs,
    title: "Old Docs",
    version: "BS@8.2.0",
    categories: categories,
    components: components,
    theme: "Js",
    children: null
  };
  if (activeToc !== undefined) {
    tmp.activeToc = Caml_option.valFromOption(activeToc);
  }
  return React.createElement(DocsLayout.make, tmp, React.createElement(Markdown.Warn.make, {
                  children: null
                }, React.createElement("div", {
                      className: "font-bold"
                    }, "IMPORTANT!"), "This section is still\n        about ReasonML & BuckleScript.\nIt will be rewritten to ReScript very soon."), children);
}

var Link;

var NavItem;

var Category;

var Toc;

var make = ReasonCompilerDocsLayout;

export {
  Link ,
  tocData ,
  NavItem ,
  Category ,
  Toc ,
  interopNavs ,
  advancedNavs ,
  categories ,
  make ,
  
}
/* tocData Not a pure module */
