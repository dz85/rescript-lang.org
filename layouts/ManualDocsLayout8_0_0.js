

import * as Url from "../common/Url.js";
import * as Util from "../common/Util.js";
import * as React from "react";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Markdown from "../components/Markdown.js";
import * as Belt_List from "bs-platform/lib/es6/belt_List.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as DocsLayout from "./DocsLayout.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Router from "next/router";
import * as ManualDocsLayout from "./ManualDocsLayout.js";

var tocData = (require('../index_data/manual_v800_toc.json'));

var overviewNavs = [
  {
    name: "Introduction",
    href: "/docs/manual/v8.0.0/introduction"
  },
  {
    name: "Migrate to New Syntax",
    href: "/docs/manual/v8.0.0/migrate-from-bucklescript-reason"
  },
  {
    name: "Installation",
    href: "/docs/manual/v8.0.0/installation"
  },
  {
    name: "Try",
    href: "/docs/manual/v8.0.0/try"
  },
  {
    name: "Editor Plugins",
    href: "/docs/manual/v8.0.0/editor-plugins"
  }
];

var basicNavs = [
  {
    name: "Overview",
    href: "/docs/manual/v8.0.0/overview"
  },
  {
    name: "Let Binding",
    href: "/docs/manual/v8.0.0/let-binding"
  },
  {
    name: "Type",
    href: "/docs/manual/v8.0.0/type"
  },
  {
    name: "Primitive Types",
    href: "/docs/manual/v8.0.0/primitive-types"
  },
  {
    name: "Tuple",
    href: "/docs/manual/v8.0.0/tuple"
  },
  {
    name: "Record",
    href: "/docs/manual/v8.0.0/record"
  },
  {
    name: "Object",
    href: "/docs/manual/v8.0.0/object"
  },
  {
    name: "Variant",
    href: "/docs/manual/v8.0.0/variant"
  },
  {
    name: "Null, Undefined & Option",
    href: "/docs/manual/v8.0.0/null-undefined-option"
  },
  {
    name: "Array & List",
    href: "/docs/manual/v8.0.0/array-and-list"
  },
  {
    name: "Function",
    href: "/docs/manual/v8.0.0/function"
  },
  {
    name: "Control Flow",
    href: "/docs/manual/v8.0.0/control-flow"
  },
  {
    name: "Pipe",
    href: "/docs/manual/v8.0.0/pipe"
  },
  {
    name: "Pattern Matching/Destructuring",
    href: "/docs/manual/v8.0.0/pattern-matching-destructuring"
  },
  {
    name: "Mutation",
    href: "/docs/manual/v8.0.0/mutation"
  },
  {
    name: "JSX",
    href: "/docs/manual/v8.0.0/jsx"
  },
  {
    name: "Exception",
    href: "/docs/manual/v8.0.0/exception"
  },
  {
    name: "Lazy Values",
    href: "/docs/manual/v8.0.0/lazy-values"
  },
  {
    name: "Promise",
    href: "/docs/manual/v8.0.0/promise"
  },
  {
    name: "Module",
    href: "/docs/manual/v8.0.0/module"
  },
  {
    name: "Import & Export",
    href: "/docs/manual/v8.0.0/import-export"
  },
  {
    name: "Reserved Keywords",
    href: "/docs/manual/v8.0.0/reserved-keywords"
  }
];

var buildsystemNavs = [
  {
    name: "Overview",
    href: "/docs/manual/v8.0.0/build-overview"
  },
  {
    name: "Configuration",
    href: "/docs/manual/v8.0.0/build-configuration"
  },
  {
    name: "Interop with JS Build System",
    href: "/docs/manual/v8.0.0/interop-with-js-build-systems"
  },
  {
    name: "Performance",
    href: "/docs/manual/v8.0.0/build-performance"
  }
];

var jsInteropNavs = [
  {
    name: "Embed Raw JavaScript",
    href: "/docs/manual/v8.0.0/embed-raw-javascript"
  },
  {
    name: "Shared Data Types",
    href: "/docs/manual/v8.0.0/shared-data-types"
  },
  {
    name: "External (Bind to Any JS Library)",
    href: "/docs/manual/v8.0.0/external"
  },
  {
    name: "Bind to JS Object",
    href: "/docs/manual/v8.0.0/bind-to-js-object"
  },
  {
    name: "Bind to JS Function",
    href: "/docs/manual/v8.0.0/bind-to-js-function"
  },
  {
    name: "Import from/Export to JS",
    href: "/docs/manual/v8.0.0/import-from-export-to-js"
  },
  {
    name: "Bind to Global JS Values",
    href: "/docs/manual/v8.0.0/bind-to-global-js-values"
  },
  {
    name: "JSON",
    href: "/docs/manual/v8.0.0/json"
  },
  {
    name: "Use Illegal Identifier Names",
    href: "/docs/manual/v8.0.0/use-illegal-identifier-names"
  },
  {
    name: "Browser Support & Polyfills",
    href: "/docs/manual/v8.0.0/browser-support-polyfills"
  },
  {
    name: "Interop Cheatsheet",
    href: "/docs/manual/v8.0.0/interop-cheatsheet"
  }
];

var guidesNavs = [
  {
    name: "Converting from JavaScript",
    href: "/docs/manual/v8.0.0/converting-from-js"
  },
  {
    name: "Libraries",
    href: "/docs/manual/v8.0.0/libraries"
  }
];

var extraNavs = [
  {
    name: "Newcomer Examples",
    href: "/docs/manual/v8.0.0/newcomer-examples"
  },
  {
    name: "Project Structure",
    href: "/docs/manual/v8.0.0/project-structure"
  },
  {
    name: "FAQ",
    href: "/docs/manual/v8.0.0/faq"
  }
];

var categories = [
  {
    name: "Overview",
    items: overviewNavs
  },
  {
    name: "Language Features",
    items: basicNavs
  },
  {
    name: "JavaScript Interop",
    items: jsInteropNavs
  },
  {
    name: "Build System",
    items: buildsystemNavs
  },
  {
    name: "Guides",
    items: guidesNavs
  },
  {
    name: "Extra",
    items: extraNavs
  }
];

function ManualDocsLayout8_0_0$Docs(Props) {
  var frontmatter = Props.frontmatter;
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
      name: "Language Manual",
      href: "/docs/manual/" + (version$1 + "/introduction")
    },
    tl: /* [] */0
  };
  var prefix = {
    hd: prefix_0,
    tl: prefix_1
  };
  var breadcrumbs = Belt_List.concat(prefix, DocsLayout.makeBreadcrumbs("/docs/manual/" + version$1, route));
  var version$2 = "v8.0.0";
  var url$1 = Url.parse(route);
  var latestUrl = "/" + (url$1.base.join("/") + ("/latest/" + url$1.pagepath.join("/")));
  var warnBanner = React.createElement("div", {
        className: "mb-10"
      }, React.createElement(Markdown.Info.make, {
            children: React.createElement(Markdown.P.make, {
                  children: null
                }, Util.ReactStuff.s("You are currently looking at the v8.0.0 docs (Reason v3.6 syntax edition). You can find the latest manual page "), React.createElement(Markdown.A.make, {
                      href: latestUrl,
                      children: Util.ReactStuff.s("here")
                    }), Util.ReactStuff.s("."))
          }));
  var tmp = {
    breadcrumbs: breadcrumbs,
    title: "Language Manual",
    metaTitleCategory: "ReScript Language Manual",
    version: version$2,
    availableVersions: ManualDocsLayout.allManualVersions,
    latestVersionLabel: ManualDocsLayout.latestVersionLabel,
    categories: categories,
    components: components,
    theme: "Reason",
    children: null
  };
  if (frontmatter !== undefined) {
    tmp.frontmatter = Caml_option.valFromOption(frontmatter);
  }
  if (activeToc !== undefined) {
    tmp.activeToc = Caml_option.valFromOption(activeToc);
  }
  return React.createElement(DocsLayout.make, tmp, warnBanner, children);
}

var Docs = {
  make: ManualDocsLayout8_0_0$Docs
};

function ManualDocsLayout8_0_0$Prose(Props) {
  var frontmatter = Props.frontmatter;
  var children = Props.children;
  var tmp = {
    components: Markdown.$$default,
    children: children
  };
  if (frontmatter !== undefined) {
    tmp.frontmatter = Caml_option.valFromOption(frontmatter);
  }
  return React.createElement(ManualDocsLayout8_0_0$Docs, tmp);
}

var Prose = {
  make: ManualDocsLayout8_0_0$Prose
};

var Link;

var NavItem;

var Category;

var Toc;

export {
  Link ,
  tocData ,
  NavItem ,
  Category ,
  Toc ,
  overviewNavs ,
  basicNavs ,
  buildsystemNavs ,
  jsInteropNavs ,
  guidesNavs ,
  extraNavs ,
  categories ,
  Docs ,
  Prose ,
  
}
/* tocData Not a pure module */
