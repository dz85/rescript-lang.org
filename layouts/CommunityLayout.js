

import * as Url from "../common/Url.js";
import * as React from "react";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Markdown from "../components/Markdown.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as DocsLayout from "./DocsLayout.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Router from "next/router";

var tocData = (require('../index_data/community_toc.json'));

var overviewNavs = [
  {
    name: "Overview",
    href: "/community"
  },
  {
    name: "Code of Conduct",
    href: "/community/code-of-conduct"
  }
];

var categories = [{
    name: "Resources",
    items: overviewNavs
  }];

function CommunityLayout(Props) {
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
  var breadcrumbs = route === "/community" ? ({
        hd: {
          name: "Community",
          href: "/community"
        },
        tl: {
          hd: {
            name: "Overview",
            href: ""
          },
          tl: /* [] */0
        }
      }) : DocsLayout.makeBreadcrumbsFromPaths("", url.base);
  var tmp = {
    breadcrumbs: breadcrumbs,
    title: "Community",
    metaTitleCategory: "ReScript Documentation",
    categories: categories,
    components: components,
    theme: "Reason",
    children: children
  };
  if (activeToc !== undefined) {
    tmp.activeToc = Caml_option.valFromOption(activeToc);
  }
  return React.createElement(DocsLayout.make, tmp);
}

var Link;

var NavItem;

var Category;

var Toc;

var make = CommunityLayout;

export {
  Link ,
  tocData ,
  NavItem ,
  Category ,
  Toc ,
  overviewNavs ,
  categories ,
  make ,
  
}
/* tocData Not a pure module */
