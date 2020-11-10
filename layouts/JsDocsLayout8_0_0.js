

import * as Url from "../common/Url.js";
import * as React from "react";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as ApiLayout from "./ApiLayout.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as ApiMarkdown from "../components/ApiMarkdown.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Router from "next/router";

var indexData = (require('../index_data/v800_js_api_index.json'));

var $$package = (require('../package.json'));

var overviewNavs = [{
    name: "JS",
    href: "/docs/manual/v8.0.0/api/js"
  }];

var apiNavs = [
  {
    name: "Array2",
    href: "/docs/manual/v8.0.0/api/js/array-2"
  },
  {
    name: "Array",
    href: "/docs/manual/v8.0.0/api/js/array"
  },
  {
    name: "Console",
    href: "/docs/manual/v8.0.0/api/js/console"
  },
  {
    name: "Date",
    href: "/docs/manual/v8.0.0/api/js/date"
  },
  {
    name: "Dict",
    href: "/docs/manual/v8.0.0/api/js/dict"
  },
  {
    name: "Exn",
    href: "/docs/manual/v8.0.0/api/js/exn"
  },
  {
    name: "Float",
    href: "/docs/manual/v8.0.0/api/js/float"
  },
  {
    name: "Global",
    href: "/docs/manual/v8.0.0/api/js/global"
  },
  {
    name: "Int",
    href: "/docs/manual/v8.0.0/api/js/int"
  },
  {
    name: "Json",
    href: "/docs/manual/v8.0.0/api/js/json"
  },
  {
    name: "List",
    href: "/docs/manual/v8.0.0/api/js/list"
  },
  {
    name: "Math",
    href: "/docs/manual/v8.0.0/api/js/math"
  },
  {
    name: "NullUndefined",
    href: "/docs/manual/v8.0.0/api/js/null-undefined"
  },
  {
    name: "Null",
    href: "/docs/manual/v8.0.0/api/js/null"
  },
  {
    name: "Nullable",
    href: "/docs/manual/v8.0.0/api/js/nullable"
  },
  {
    name: "Obj",
    href: "/docs/manual/v8.0.0/api/js/obj"
  },
  {
    name: "Option",
    href: "/docs/manual/v8.0.0/api/js/option"
  },
  {
    name: "Promise",
    href: "/docs/manual/v8.0.0/api/js/promise"
  },
  {
    name: "Re",
    href: "/docs/manual/v8.0.0/api/js/re"
  },
  {
    name: "Result",
    href: "/docs/manual/v8.0.0/api/js/result"
  },
  {
    name: "String2",
    href: "/docs/manual/v8.0.0/api/js/string-2"
  },
  {
    name: "String",
    href: "/docs/manual/v8.0.0/api/js/string"
  },
  {
    name: "TypedArrayArrayBuffer",
    href: "/docs/manual/v8.0.0/api/js/typed-array_array-buffer"
  },
  {
    name: "TypedArrayDataView",
    href: "/docs/manual/v8.0.0/api/js/typed-array_data-view"
  },
  {
    name: "TypedArrayFloat32Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array_float-32-array"
  },
  {
    name: "TypedArrayFloat64Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array_float-64-array"
  },
  {
    name: "TypedArrayInt8Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array_int-8-array"
  },
  {
    name: "TypedArrayInt16Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array_int-16-array"
  },
  {
    name: "TypedArrayInt32Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array_int-32-array"
  },
  {
    name: "TypedArrayTypeS",
    href: "/docs/manual/v8.0.0/api/js/typed-array_type-s"
  },
  {
    name: "TypedArrayUint8Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array_uint-8-array"
  },
  {
    name: "TypedArrayUint8ClampedArray",
    href: "/docs/manual/v8.0.0/api/js/typed-array_uint-8-clamped-array"
  },
  {
    name: "TypedArrayUint16Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array_uint-16-array"
  },
  {
    name: "TypedArrayUint32Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array_uint-32-array"
  },
  {
    name: "TypedArray2ArrayBuffer",
    href: "/docs/manual/v8.0.0/api/js/typed-array-2_array-buffer"
  },
  {
    name: "TypedArray2DataView",
    href: "/docs/manual/v8.0.0/api/js/typed-array-2_data-view"
  },
  {
    name: "TypedArray2Float32Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array-2_float-32-array"
  },
  {
    name: "TypedArray2Float64Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array-2_float-64-array"
  },
  {
    name: "TypedArray2Int8Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array-2_int-8-array"
  },
  {
    name: "TypedArray2Int16Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array-2_int-16-array"
  },
  {
    name: "TypedArray2Int32Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array-2_int-32-array"
  },
  {
    name: "TypedArray2Uint8Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array-2_uint-8-array"
  },
  {
    name: "TypedArray2Uint8ClampedArray",
    href: "/docs/manual/v8.0.0/api/js/typed-array-2_uint-8-clamped-array"
  },
  {
    name: "TypedArray2Uint16Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array-2_uint-16-array"
  },
  {
    name: "TypedArray2Uint32Array",
    href: "/docs/manual/v8.0.0/api/js/typed-array-2_uint-32-array"
  },
  {
    name: "TypedArray2",
    href: "/docs/manual/v8.0.0/api/js/typed-array-2"
  },
  {
    name: "TypedArray",
    href: "/docs/manual/v8.0.0/api/js/typed-array"
  },
  {
    name: "Types",
    href: "/docs/manual/v8.0.0/api/js/types"
  },
  {
    name: "Undefined",
    href: "/docs/manual/v8.0.0/api/js/undefined"
  },
  {
    name: "Vector",
    href: "/docs/manual/v8.0.0/api/js/vector"
  }
];

var categories = [
  {
    name: "Overview",
    items: overviewNavs
  },
  {
    name: "Submodules",
    items: apiNavs
  }
];

function JsDocsLayout8_0_0$Docs(Props) {
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
              title: "JS Module",
              version: version$2,
              activeToc: activeToc,
              components: components,
              children: null
            }, warnBanner, children);
}

var Docs = {
  make: JsDocsLayout8_0_0$Docs
};

function JsDocsLayout8_0_0$Prose(Props) {
  var children = Props.children;
  return React.createElement(JsDocsLayout8_0_0$Docs, {
              components: ApiMarkdown.$$default,
              children: children
            });
}

var Prose = {
  make: JsDocsLayout8_0_0$Prose
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
  apiNavs ,
  categories ,
  Docs ,
  Prose ,
  
}
/* indexData Not a pure module */
