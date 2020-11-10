

import * as Url from "../common/Url.js";
import * as Util from "../common/Util.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Markdown from "../components/Markdown.js";
import * as Belt_List from "bs-platform/lib/es6/belt_List.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as ApiMarkdown from "../components/ApiMarkdown.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Router from "next/router";
import * as SidebarLayout from "./SidebarLayout.js";
import * as VersionSelect from "../components/VersionSelect.js";

var allApiVersions = [
  "latest",
  "v8.0.0"
];

var latestVersionLabel = "v8.2.0";

function ApiLayout$OldDocsWarning(Props) {
  var version = Props.version;
  var route = Props.route;
  var url = Url.parse(route);
  var latestUrl = "/" + (url.base.join("/") + ("/latest/" + url.pagepath.join("/")));
  return React.createElement("div", {
              className: "mb-10"
            }, React.createElement(Markdown.Info.make, {
                  children: React.createElement(Markdown.P.make, {
                        children: null
                      }, Util.ReactStuff.s("You are currently looking at the " + (version + " docs (Reason v3.6 syntax edition). You can find the latest API docs ")), React.createElement(Markdown.A.make, {
                            href: latestUrl,
                            children: Util.ReactStuff.s("here")
                          }), Util.ReactStuff.s("."))
                }));
}

var OldDocsWarning = {
  make: ApiLayout$OldDocsWarning
};

function makeBreadcrumbs(prefix, route) {
  var url = Url.parse(route);
  var match = Belt_Array.reduce(url.pagepath.slice(1), [
        prefix.href,
        []
      ], (function (acc, path) {
          var ret = acc[1];
          var href = acc[0] + ("/" + path);
          ret.push({
                name: Url.prettyString(path),
                href: href
              });
          return [
                  href,
                  ret
                ];
        }));
  return Belt_List.fromArray(Belt_Array.concat([prefix], match[1]));
}

function ApiLayout(Props) {
  var breadcrumbs = Props.breadcrumbs;
  var categories = Props.categories;
  var titleOpt = Props.title;
  var version = Props.version;
  var activeToc = Props.activeToc;
  var componentsOpt = Props.components;
  var children = Props.children;
  var title = titleOpt !== undefined ? titleOpt : "";
  var components = componentsOpt !== undefined ? Caml_option.valFromOption(componentsOpt) : ApiMarkdown.$$default;
  var router = Router.useRouter();
  var route = router.route;
  var match = React.useState(function () {
        return false;
      });
  var setSidebarOpen = match[1];
  var isSidebarOpen = match[0];
  var toggleSidebar = function (param) {
    return Curry._1(setSidebarOpen, (function (prev) {
                  return !prev;
                }));
  };
  React.useEffect((function () {
          var events = router.events;
          var onChangeComplete = function (_url) {
            return Curry._1(setSidebarOpen, (function (param) {
                          return false;
                        }));
          };
          events.on("routeChangeComplete", onChangeComplete);
          events.on("hashChangeComplete", onChangeComplete);
          return (function (param) {
                    events.off("routeChangeComplete", onChangeComplete);
                    events.off("hashChangeComplete", onChangeComplete);
                    
                  });
        }), []);
  var tmp;
  if (version !== undefined) {
    var onChange = function (evt) {
      evt.preventDefault();
      var version = evt.target.value;
      var url = Url.parse(route);
      var targetUrl = "/" + (url.base.join("/") + ("/" + (version + ("/" + url.pagepath.join("/")))));
      router.push(targetUrl);
      
    };
    tmp = React.createElement(VersionSelect.make, {
          onChange: onChange,
          version: version,
          latestVersionLabel: latestVersionLabel,
          availableVersions: allApiVersions
        });
  } else {
    tmp = null;
  }
  var preludeSection = React.createElement("div", {
        className: "flex justify-between text-primary font-medium items-baseline"
      }, Util.ReactStuff.s(title), tmp);
  var tmp$1 = {
    categories: categories,
    route: route,
    preludeSection: preludeSection,
    isOpen: isSidebarOpen,
    toggle: toggleSidebar
  };
  if (activeToc !== undefined) {
    tmp$1.activeToc = Caml_option.valFromOption(activeToc);
  }
  var sidebar = React.createElement(SidebarLayout.Sidebar.make, tmp$1);
  var pageTitle;
  if (breadcrumbs !== undefined && breadcrumbs) {
    var match$1 = breadcrumbs.tl;
    if (match$1) {
      var match$2 = match$1.tl;
      var module_ = match$1.hd;
      pageTitle = match$2 ? (
          match$2.tl ? "API" : module_.name + ("." + match$2.hd.name)
        ) : module_.name;
    } else {
      pageTitle = "API";
    }
  } else {
    pageTitle = "API";
  }
  var tmp$2 = {
    metaTitle: pageTitle + " | ReScript API",
    theme: "Reason",
    components: components,
    sidebarState: [
      isSidebarOpen,
      setSidebarOpen
    ],
    sidebar: sidebar,
    children: children
  };
  if (breadcrumbs !== undefined) {
    tmp$2.breadcrumbs = Caml_option.valFromOption(breadcrumbs);
  }
  return React.createElement(SidebarLayout.make, tmp$2);
}

var Link;

var Sidebar;

var Toc;

var make = ApiLayout;

export {
  Link ,
  allApiVersions ,
  latestVersionLabel ,
  Sidebar ,
  Toc ,
  OldDocsWarning ,
  makeBreadcrumbs ,
  make ,
  
}
/* react Not a pure module */
