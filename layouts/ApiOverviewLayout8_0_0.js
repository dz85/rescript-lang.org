

import * as React from "react";
import * as Markdown from "../components/Markdown.js";
import * as ApiLayout from "./ApiLayout.js";
import * as ApiMarkdown from "../components/ApiMarkdown.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Router from "next/router";

var categories = [
  {
    name: "Introduction",
    items: [{
        name: "Overview",
        href: "/docs/manual/v8.0.0/api"
      }]
  },
  {
    name: "Modules",
    items: [
      {
        name: "Js Module",
        href: "/docs/manual/v8.0.0/api/js"
      },
      {
        name: "Belt Stdlib",
        href: "/docs/manual/v8.0.0/api/belt"
      },
      {
        name: "Dom Module",
        href: "/docs/manual/v8.0.0/api/dom"
      }
    ]
  }
];

function ApiOverviewLayout8_0_0$Docs(Props) {
  var componentsOpt = Props.components;
  var children = Props.children;
  var components = componentsOpt !== undefined ? Caml_option.valFromOption(componentsOpt) : ApiMarkdown.$$default;
  var router = Router.useRouter();
  var route = router.route;
  var version = "v8.0.0";
  var warnBanner = React.createElement(ApiLayout.OldDocsWarning.make, {
        version: version,
        route: route
      });
  return React.createElement(ApiLayout.make, {
              categories: categories,
              title: "API",
              version: version,
              components: components,
              children: null
            }, warnBanner, children);
}

var Docs = {
  make: ApiOverviewLayout8_0_0$Docs
};

function ApiOverviewLayout8_0_0$Prose(Props) {
  var children = Props.children;
  return React.createElement(ApiOverviewLayout8_0_0$Docs, {
              components: Markdown.$$default,
              children: children
            });
}

var Prose = {
  make: ApiOverviewLayout8_0_0$Prose
};

var Link;

var Sidebar;

export {
  Link ,
  Sidebar ,
  categories ,
  Docs ,
  Prose ,
  
}
/* react Not a pure module */
