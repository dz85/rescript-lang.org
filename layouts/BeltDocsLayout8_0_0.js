

import * as Url from "../common/Url.js";
import * as React from "react";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as ApiLayout from "./ApiLayout.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as ApiMarkdown from "../components/ApiMarkdown.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Router from "next/router";

var indexData = (require('../index_data/v800_belt_api_index.json'));

var $$package = (require('../package.json'));

var overviewNavs = [{
    name: "Introduction",
    href: "/docs/manual/v8.0.0/api/belt"
  }];

var setNavs = [
  {
    name: "HashSet",
    href: "/docs/manual/v8.0.0/api/belt/hash-set"
  },
  {
    name: "HashSetInt",
    href: "/docs/manual/v8.0.0/api/belt/hash-set-int"
  },
  {
    name: "HashSetString",
    href: "/docs/manual/v8.0.0/api/belt/hash-set-string"
  },
  {
    name: "Set",
    href: "/docs/manual/v8.0.0/api/belt/set"
  },
  {
    name: "SetDict",
    href: "/docs/manual/v8.0.0/api/belt/set-dict"
  },
  {
    name: "SetInt",
    href: "/docs/manual/v8.0.0/api/belt/set-int"
  },
  {
    name: "SetString",
    href: "/docs/manual/v8.0.0/api/belt/set-string"
  }
];

var mapNavs = [
  {
    name: "HashMap",
    href: "/docs/manual/v8.0.0/api/belt/hash-map"
  },
  {
    name: "HashMapInt",
    href: "/docs/manual/v8.0.0/api/belt/hash-map-int"
  },
  {
    name: "HashMapString",
    href: "/docs/manual/v8.0.0/api/belt/hash-map-string"
  },
  {
    name: "Map",
    href: "/docs/manual/v8.0.0/api/belt/map"
  },
  {
    name: "MapDict",
    href: "/docs/manual/v8.0.0/api/belt/map-dict"
  },
  {
    name: "MapInt",
    href: "/docs/manual/v8.0.0/api/belt/map-int"
  },
  {
    name: "MapString",
    href: "/docs/manual/v8.0.0/api/belt/map-string"
  }
];

var mutableCollectionsNavs = [
  {
    name: "MutableMap",
    href: "/docs/manual/v8.0.0/api/belt/mutable-map"
  },
  {
    name: "MutableMapInt",
    href: "/docs/manual/v8.0.0/api/belt/mutable-map-int"
  },
  {
    name: "MutableMapString",
    href: "/docs/manual/v8.0.0/api/belt/mutable-map-string"
  },
  {
    name: "MutableQueue",
    href: "/docs/manual/v8.0.0/api/belt/mutable-queue"
  },
  {
    name: "MutableSet",
    href: "/docs/manual/v8.0.0/api/belt/mutable-set"
  },
  {
    name: "MutableSetInt",
    href: "/docs/manual/v8.0.0/api/belt/mutable-set-int"
  },
  {
    name: "MutableSetString",
    href: "/docs/manual/v8.0.0/api/belt/mutable-set-string"
  },
  {
    name: "MutableStack",
    href: "/docs/manual/v8.0.0/api/belt/mutable-stack"
  }
];

var basicNavs = [
  {
    name: "Array",
    href: "/docs/manual/v8.0.0/api/belt/array"
  },
  {
    name: "List",
    href: "/docs/manual/v8.0.0/api/belt/list"
  },
  {
    name: "Float",
    href: "/docs/manual/v8.0.0/api/belt/float"
  },
  {
    name: "Int",
    href: "/docs/manual/v8.0.0/api/belt/int"
  },
  {
    name: "Range",
    href: "/docs/manual/v8.0.0/api/belt/range"
  },
  {
    name: "Id",
    href: "/docs/manual/v8.0.0/api/belt/id"
  },
  {
    name: "Option",
    href: "/docs/manual/v8.0.0/api/belt/option"
  },
  {
    name: "Result",
    href: "/docs/manual/v8.0.0/api/belt/result"
  }
];

var sortNavs = [
  {
    name: "SortArray",
    href: "/docs/manual/v8.0.0/api/belt/sort-array"
  },
  {
    name: "SortArrayInt",
    href: "/docs/manual/v8.0.0/api/belt/sort-array-int"
  },
  {
    name: "SortArrayString",
    href: "/docs/manual/v8.0.0/api/belt/sort-array-string"
  }
];

var utilityNavs = [{
    name: "Debug",
    href: "/docs/manual/v8.0.0/api/belt/debug"
  }];

var categories = [
  {
    name: "Overview",
    items: overviewNavs
  },
  {
    name: "Basics",
    items: basicNavs
  },
  {
    name: "Set",
    items: setNavs
  },
  {
    name: "Map",
    items: mapNavs
  },
  {
    name: "Mutable Collections",
    items: mutableCollectionsNavs
  },
  {
    name: "Sort Collections",
    items: sortNavs
  },
  {
    name: "Utilities",
    items: utilityNavs
  }
];

function BeltDocsLayout8_0_0$Docs(Props) {
  var componentsOpt = Props.components;
  var children = Props.children;
  var components = componentsOpt !== undefined ? Caml_option.valFromOption(componentsOpt) : ApiMarkdown.$$default;
  var router = Router.useRouter();
  var route = router.route;
  var headers = Belt_Option.getWithDefault(Belt_Option.map(Js_dict.get(indexData, route), (function (data) {
              return Belt_Array.map(data.headers, (function (header) {
                            return [
                                    header.name,
                                    "#" + header.href
                                  ];
                          }));
            })), []);
  var moduleName = Belt_Option.getWithDefault(Belt_Option.map(Js_dict.get(indexData, route), (function (data) {
              return data.moduleName;
            })), "?");
  var url = Url.parse(route);
  var version = url.version;
  var version$1 = typeof version === "number" ? "latest" : version._0;
  var prefix_href = "/docs/manual/" + (version$1 + "/api");
  var prefix = {
    name: "API",
    href: prefix_href
  };
  var breadcrumbs = ApiLayout.makeBreadcrumbs(prefix, route);
  var activeToc_entries = Belt_Array.map(headers, (function (param) {
          return {
                  header: param[0],
                  href: param[1]
                };
        }));
  var activeToc = {
    title: moduleName,
    entries: activeToc_entries
  };
  var version$2 = "v8.0.0";
  var warnBanner = React.createElement(ApiLayout.OldDocsWarning.make, {
        version: version$2,
        route: route
      });
  return React.createElement(ApiLayout.make, {
              breadcrumbs: breadcrumbs,
              categories: categories,
              title: "Belt Stdlib",
              version: version$2,
              activeToc: activeToc,
              components: components,
              children: null
            }, warnBanner, children);
}

var Docs = {
  make: BeltDocsLayout8_0_0$Docs
};

function BeltDocsLayout8_0_0$Prose(Props) {
  var children = Props.children;
  return React.createElement(BeltDocsLayout8_0_0$Docs, {
              components: ApiMarkdown.$$default,
              children: children
            });
}

var Prose = {
  make: BeltDocsLayout8_0_0$Prose
};

var Link;

var Category;

var NavItem;

export {
  Link ,
  indexData ,
  $$package ,
  Category ,
  NavItem ,
  overviewNavs ,
  setNavs ,
  mapNavs ,
  mutableCollectionsNavs ,
  basicNavs ,
  sortNavs ,
  utilityNavs ,
  categories ,
  Docs ,
  Prose ,
  
}
/* indexData Not a pure module */
