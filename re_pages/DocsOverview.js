

import * as Url from "../common/Url.js";
import * as Meta from "../components/Meta.js";
import * as Util from "../common/Util.js";
import * as React from "react";
import * as Markdown from "../components/Markdown.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Router from "next/router";
import * as VersionSelect from "../components/VersionSelect.js";
import * as ManualDocsLayout from "../layouts/ManualDocsLayout.js";

function DocsOverview$Card(Props) {
  var title = Props.title;
  var hrefs = Props.hrefs;
  var style = {
    maxWidth: "21rem"
  };
  return React.createElement("div", {
              className: "border border-snow-dark bg-snow-light px-5 py-8 rounded-lg",
              style: style
            }, React.createElement("h2", {
                  className: "font-bold text-21 mb-4"
                }, Util.ReactStuff.s(title)), React.createElement("ul", undefined, Util.ReactStuff.ate(Belt_Array.map(hrefs, (function (param) {
                            var text = param[0];
                            return React.createElement("li", {
                                        key: text,
                                        className: "text-16 mb-1 last:mb-0"
                                      }, React.createElement(Markdown.A.make, {
                                            href: param[1],
                                            children: Util.ReactStuff.s(text)
                                          }));
                          })))));
}

var Card = {
  make: DocsOverview$Card
};

function DocsOverview$default(Props) {
  var showVersionSelectOpt = Props.showVersionSelect;
  var showVersionSelect = showVersionSelectOpt !== undefined ? showVersionSelectOpt : true;
  var router = Router.useRouter();
  var url = Url.parse(router.route);
  var version = url.version;
  var version$1 = typeof version === "number" ? "latest" : version._0;
  var languageManual = [
    [
      "Overview",
      " /docs/manual/" + version$1 + "/introduction"
    ],
    [
      "Language Features",
      "/docs/manual/" + version$1 + "/overview"
    ],
    [
      "JS Interop",
      "/docs/manual/" + version$1 + "/embed-raw-javascript"
    ],
    [
      "Build System",
      "/docs/manual/" + version$1 + "/build-overview"
    ]
  ];
  var ecosystem = [
    [
      "GenType",
      "/docs/gentype/latest/introduction"
    ],
    [
      "ReasonReact",
      "https://reasonml.github.io/reason-react"
    ],
    [
      "Reanalyze",
      "https://github.com/reason-association/reanalyze"
    ]
  ];
  var versionSelect;
  if (showVersionSelect) {
    var onChange = function (evt) {
      evt.preventDefault();
      var version = evt.target.value;
      var url = Url.parse(router.route);
      var targetUrl = "/" + (url.base.join("/") + ("/" + (version + ("/" + url.pagepath.join("/")))));
      router.push(targetUrl);
      
    };
    versionSelect = React.createElement("div", {
          className: "text-fire"
        }, React.createElement(VersionSelect.make, {
              onChange: onChange,
              version: version$1,
              latestVersionLabel: ManualDocsLayout.latestVersionLabel,
              availableVersions: ManualDocsLayout.allManualVersions
            }));
  } else {
    versionSelect = null;
  }
  return React.createElement(React.Fragment, undefined, React.createElement(Meta.make, {
                  title: "Overview | ReScript Documentation"
                }), React.createElement("div", undefined, versionSelect, React.createElement("div", {
                      className: "mb-6"
                    }), React.createElement(Markdown.H1.make, {
                      children: Util.ReactStuff.s("Docs")
                    })), React.createElement("div", {
                  className: "grid grid-cols-1 xs:grid-cols-2 gap-8"
                }, React.createElement(DocsOverview$Card, {
                      title: "Language Manual",
                      hrefs: languageManual
                    }), React.createElement(DocsOverview$Card, {
                      title: "Ecosystem",
                      hrefs: ecosystem
                    })));
}

var Link;

var $$default = DocsOverview$default;

export {
  Link ,
  Card ,
  $$default ,
  $$default as default,
  
}
/* Meta Not a pure module */
