

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

var allManualVersions = [
  "latest",
  "v8.0.0"
];

var latestVersionLabel = "v8.2.0";

var tocData = (require('../index_data/manual_toc.json'));

var overviewNavs = [
  {
    name: "Introduction",
    href: "/docs/manual/latest/introduction"
  },
  {
    name: "Migrate from BuckleScript/Reason",
    href: "/docs/manual/latest/migrate-from-bucklescript-reason"
  },
  {
    name: "Installation",
    href: "/docs/manual/latest/installation"
  },
  {
    name: "Try",
    href: "/docs/manual/latest/try"
  },
  {
    name: "Editor Plugins",
    href: "/docs/manual/latest/editor-plugins"
  }
];

var basicNavs = [
  {
    name: "Overview",
    href: "/docs/manual/latest/overview"
  },
  {
    name: "Let Binding",
    href: "/docs/manual/latest/let-binding"
  },
  {
    name: "Type",
    href: "/docs/manual/latest/type"
  },
  {
    name: "Primitive Types",
    href: "/docs/manual/latest/primitive-types"
  },
  {
    name: "Tuple",
    href: "/docs/manual/latest/tuple"
  },
  {
    name: "Record",
    href: "/docs/manual/latest/record"
  },
  {
    name: "Object",
    href: "/docs/manual/latest/object"
  },
  {
    name: "Variant",
    href: "/docs/manual/latest/variant"
  },
  {
    name: "Null, Undefined & Option",
    href: "/docs/manual/latest/null-undefined-option"
  },
  {
    name: "Array & List",
    href: "/docs/manual/latest/array-and-list"
  },
  {
    name: "Function",
    href: "/docs/manual/latest/function"
  },
  {
    name: "Control Flow",
    href: "/docs/manual/latest/control-flow"
  },
  {
    name: "Pipe",
    href: "/docs/manual/latest/pipe"
  },
  {
    name: "Pattern Matching/Destructuring",
    href: "/docs/manual/latest/pattern-matching-destructuring"
  },
  {
    name: "Mutation",
    href: "/docs/manual/latest/mutation"
  },
  {
    name: "JSX",
    href: "/docs/manual/latest/jsx"
  },
  {
    name: "Exception",
    href: "/docs/manual/latest/exception"
  },
  {
    name: "Lazy Value",
    href: "/docs/manual/latest/lazy-values"
  },
  {
    name: "Async & Promise",
    href: "/docs/manual/latest/promise"
  },
  {
    name: "Module",
    href: "/docs/manual/latest/module"
  },
  {
    name: "Import & Export",
    href: "/docs/manual/latest/import-export"
  },
  {
    name: "Attribute (Decorator)",
    href: "/docs/manual/latest/attribute"
  },
  {
    name: "Unboxed",
    href: "/docs/manual/latest/unboxed"
  },
  {
    name: "Reserved Keywords",
    href: "/docs/manual/latest/reserved-keywords"
  }
];

var buildsystemNavs = [
  {
    name: "Overview",
    href: "/docs/manual/latest/build-overview"
  },
  {
    name: "Configuration",
    href: "/docs/manual/latest/build-configuration"
  },
  {
    name: "Configuration Schema",
    href: "/docs/manual/latest/build-configuration-schema"
  },
  {
    name: "Interop with JS Build System",
    href: "/docs/manual/latest/interop-with-js-build-systems"
  },
  {
    name: "Performance",
    href: "/docs/manual/latest/build-performance"
  }
];

var jsInteropNavs = [
  {
    name: "Embed Raw JavaScript",
    href: "/docs/manual/latest/embed-raw-javascript"
  },
  {
    name: "Shared Data Types",
    href: "/docs/manual/latest/shared-data-types"
  },
  {
    name: "External (Bind to Any JS Library)",
    href: "/docs/manual/latest/external"
  },
  {
    name: "Bind to JS Object",
    href: "/docs/manual/latest/bind-to-js-object"
  },
  {
    name: "Bind to JS Function",
    href: "/docs/manual/latest/bind-to-js-function"
  },
  {
    name: "Import from/Export to JS",
    href: "/docs/manual/latest/import-from-export-to-js"
  },
  {
    name: "Bind to Global JS Values",
    href: "/docs/manual/latest/bind-to-global-js-values"
  },
  {
    name: "JSON",
    href: "/docs/manual/latest/json"
  },
  {
    name: "Inlining Constants",
    href: "/docs/manual/latest/inlining-constants"
  },
  {
    name: "Use Illegal Identifier Names",
    href: "/docs/manual/latest/use-illegal-identifier-names"
  },
  {
    name: "Browser Support & Polyfills",
    href: "/docs/manual/latest/browser-support-polyfills"
  },
  {
    name: "Interop Cheatsheet",
    href: "/docs/manual/latest/interop-cheatsheet"
  }
];

var guidesNavs = [
  {
    name: "Converting from JavaScript",
    href: "/docs/manual/latest/converting-from-js"
  },
  {
    name: "Libraries",
    href: "/docs/manual/latest/libraries"
  }
];

var extraNavs = [
  {
    name: "Newcomer Examples",
    href: "/docs/manual/latest/newcomer-examples"
  },
  {
    name: "Project Structure",
    href: "/docs/manual/latest/project-structure"
  },
  {
    name: "FAQ",
    href: "/docs/manual/latest/faq"
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

function ManualDocsLayout$Docs(Props) {
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
  var tmp = {
    breadcrumbs: breadcrumbs,
    title: "Language Manual",
    metaTitleCategory: "ReScript Language Manual",
    version: "latest",
    availableVersions: allManualVersions,
    latestVersionLabel: latestVersionLabel,
    categories: categories,
    components: components,
    theme: "Reason",
    children: children
  };
  if (frontmatter !== undefined) {
    tmp.frontmatter = Caml_option.valFromOption(frontmatter);
  }
  if (activeToc !== undefined) {
    tmp.activeToc = Caml_option.valFromOption(activeToc);
  }
  return React.createElement(DocsLayout.make, tmp);
}

var Docs = {
  make: ManualDocsLayout$Docs
};

function ManualDocsLayout$Prose(Props) {
  var frontmatter = Props.frontmatter;
  var children = Props.children;
  var tmp = {
    components: Markdown.$$default,
    children: children
  };
  if (frontmatter !== undefined) {
    tmp.frontmatter = Caml_option.valFromOption(frontmatter);
  }
  return React.createElement(ManualDocsLayout$Docs, tmp);
}

var Prose = {
  make: ManualDocsLayout$Prose
};

var Link;

var NavItem;

var Category;

var Toc;

export {
  Link ,
  allManualVersions ,
  latestVersionLabel ,
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
