

import * as Mdx from "../common/Mdx.js";
import * as Icon from "./Icon.js";
import * as Util from "../common/Util.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Belt_List from "bs-platform/lib/es6/belt_List.js";
import Link from "next/link";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as CodeExample from "./CodeExample.js";
import * as ParseNumericRangeJs from "../ffi/parse-numeric-range.js";

function Markdown$P(Props) {
  var children = Props.children;
  return React.createElement("p", {
              className: "md-p leading-5"
            }, children);
}

var P = {
  make: Markdown$P
};

function Markdown$Intro(Props) {
  var children = Props.children;
  return React.createElement("div", {
              className: "text-xl mt-8 mb-4"
            }, children);
}

var Intro = {
  make: Markdown$Intro
};

function Markdown$Cite(Props) {
  var author = Props.author;
  var children = Props.children;
  return React.createElement("div", {
              className: "my-10 border-l-2 border-fire font-normal pl-10 py-1 text-fire",
              style: {
                maxWidth: "30rem"
              }
            }, React.createElement("blockquote", {
                  className: "text-3xl italic mb-2"
                }, children), Belt_Option.mapWithDefault(author, null, (function (author) {
                    return React.createElement("figcaption", {
                                className: "font-semibold text-sm"
                              }, Util.ReactStuff.s(author));
                  })));
}

var Cite = {
  make: Markdown$Cite
};

function Markdown$Info(Props) {
  var children = Props.children;
  return React.createElement("div", {
              className: "border-l-2 border-sky my-5 py-6 pl-8 pr-10 bg-sky-10"
            }, children);
}

var Info = {
  make: Markdown$Info
};

function Markdown$Warn(Props) {
  var children = Props.children;
  return React.createElement("div", {
              className: "border-l-2 border-gold my-6 py-6 pl-8 pr-10 bg-gold-10"
            }, children);
}

var Warn = {
  make: Markdown$Warn
};

var imgEl = React.createElement("img", {
      className: "mr-2 inline-block",
      src: "/static/hyperlink.svg"
    });

function Markdown$UrlBox(Props) {
  var text = Props.text;
  var href = Props.href;
  var children = Props.children;
  var str = Mdx.MdxChildren.classify(children);
  var content;
  switch (str.TAG | 0) {
    case /* String */0 :
        content = React.createElement("p", undefined, imgEl, Util.ReactStuff.s(str._0));
        break;
    case /* Element */1 :
        var subChildren = Mdx.MdxChildren.getMdxChildren(str._0);
        content = React.createElement("p", undefined, imgEl, Curry._1(Mdx.MdxChildren.toReactElement, subChildren));
        break;
    case /* Array */2 :
        var arr = str._0;
        var length = arr.length;
        if (length >= 1) {
          var head = Belt_Array.getExn(arr, 0);
          var headChildren = Mdx.MdxChildren.getMdxChildren(head);
          content = React.createElement(React.Fragment, undefined, React.createElement(Markdown$P, {
                    children: null
                  }, imgEl, Curry._1(Mdx.MdxChildren.toReactElement, headChildren)), length > 1 ? arr.slice(1, length) : null);
        } else {
          content = null;
        }
        break;
    case /* Unknown */3 :
        console.log("Received unknown", str._0);
        content = null;
        break;
    
  }
  var link = Util.Url.isAbsolute(href) ? React.createElement("a", {
          className: "flex items-center",
          href: href,
          rel: "noopener noreferrer"
        }, Util.ReactStuff.s(text), React.createElement(Icon.ArrowRight.make, {
              className: "ml-1"
            })) : React.createElement(Link, {
          href: href,
          children: React.createElement("a", {
                className: "flex items-center"
              }, Util.ReactStuff.s(text), React.createElement(Icon.ArrowRight.make, {
                    className: "ml-1"
                  }))
        });
  return React.createElement("div", {
              className: "md-url-box text-base border-l-2 border-night-light my-6 py-6 pl-8 pr-10 bg-snow"
            }, content, React.createElement("div", {
                  className: "mt-4 text-sky hover:text-sky-80"
                }, link));
}

var UrlBox = {
  imgEl: imgEl,
  make: Markdown$UrlBox
};

function idFormat(id) {
  return id;
}

function Markdown$Anchor(Props) {
  var id = Props.id;
  var style = {
    position: "absolute",
    top: "-7rem"
  };
  return React.createElement("span", {
              className: "inline group relative"
            }, React.createElement("a", {
                  className: "invisible text-night-light opacity-50 text-inherit hover:opacity-100 hover:text-night-light hover:cursor-pointer group-hover:visible",
                  href: "#" + id
                }, React.createElement(Icon.Hyperlink.make, {
                      className: "inline-block align-middle text-snow-darker"
                    })), React.createElement("a", {
                  id: id,
                  style: style
                }));
}

var Anchor = {
  idFormat: idFormat,
  make: Markdown$Anchor
};

function Markdown$H1(Props) {
  var children = Props.children;
  return React.createElement("h1", {
              className: "text-6xl leading-1 mb-5 font-sans font-semibold text-night-dark"
            }, children);
}

var H1 = {
  make: Markdown$H1
};

function Markdown$H2(Props) {
  var id = Props.id;
  var children = Props.children;
  return React.createElement(React.Fragment, undefined, React.createElement("h2", {
                  className: "group mt-12 mb-3 text-28 leading-1 font-sans font-medium text-onyx"
                }, children, React.createElement("span", {
                      className: "ml-2"
                    }, React.createElement(Markdown$Anchor, {
                          id: id
                        }))));
}

var H2 = {
  make: Markdown$H2
};

function Markdown$H3(Props) {
  var id = Props.id;
  var children = Props.children;
  return React.createElement("h3", {
              className: "group text-xl mt-12 mb-3 leading-3 font-sans font-semibold text-onyx"
            }, children, React.createElement("span", {
                  className: "ml-2"
                }, React.createElement(Markdown$Anchor, {
                      id: id
                    })));
}

var H3 = {
  make: Markdown$H3
};

function Markdown$H4(Props) {
  var id = Props.id;
  var children = Props.children;
  return React.createElement("h4", {
              className: "group text-lg mt-12 mb-3 leading-2 font-sans font-semibold text-onyx"
            }, React.createElement("span", {
                  className: "pr-2",
                  style: {
                    marginLeft: "-1.45rem"
                  }
                }, React.createElement(Markdown$Anchor, {
                      id: id
                    })), children, React.createElement("span", {
                  className: "ml-2"
                }, React.createElement(Markdown$Anchor, {
                      id: id
                    })));
}

var H4 = {
  make: Markdown$H4
};

function Markdown$H5(Props) {
  var id = Props.id;
  var children = Props.children;
  return React.createElement("h5", {
              className: "group mt-12 mb-3 text-xs leading-2 font-sans font-semibold uppercase tracking-wide text-onyx"
            }, children, React.createElement("span", {
                  className: "ml-2"
                }, React.createElement(Markdown$Anchor, {
                      id: id
                    })));
}

var H5 = {
  make: Markdown$H5
};

function Markdown$Pre(Props) {
  var children = Props.children;
  return React.createElement("pre", {
              className: "mt-2 mb-4 -mx-6 xs:mx-0 block"
            }, children);
}

var Pre = {
  make: Markdown$Pre
};

function Markdown$InlineCode(Props) {
  var children = Props.children;
  return React.createElement("code", {
              className: "md-inline-code px-1 text-smaller-1 rounded-sm font-mono bg-snow"
            }, children);
}

var InlineCode = {
  make: Markdown$InlineCode
};

function Markdown$Table(Props) {
  var children = Props.children;
  return React.createElement("div", {
              className: "overflow-x-auto mt-10 mb-16"
            }, React.createElement("table", {
                  className: "md-table"
                }, children));
}

var Table = {
  make: Markdown$Table
};

function Markdown$Thead(Props) {
  var children = Props.children;
  return React.createElement("thead", undefined, children);
}

var Thead = {
  make: Markdown$Thead
};

function Markdown$Th(Props) {
  var children = Props.children;
  return React.createElement("th", {
              className: "py-2 pr-8 text-sm uppercase font-medium tracking-wide text-left border-b-2 border-snow-darker"
            }, children);
}

var Th = {
  make: Markdown$Th
};

function Markdown$Td(Props) {
  var children = Props.children;
  return React.createElement("td", {
              className: "border-b border-snow-darker py-3 pr-8"
            }, children);
}

var Td = {
  make: Markdown$Td
};

function parseNumericRange(prim) {
  return ParseNumericRangeJs.parsePart(prim);
}

var typeOf = (thing => { return typeof thing; });

var isArray = (thing => { return thing instanceof Array; });

var isObject = (thing => { return thing instanceof Object; });

var isString = (thing => { return thing instanceof String; });

function parseNumericRangeMeta(metastring) {
  return Belt_Option.getWithDefault(Belt_Option.map(Caml_option.undefined_to_opt(metastring.split(" ").find(function (s) {
                          if (s.startsWith("{")) {
                            return s.endsWith("}");
                          } else {
                            return false;
                          }
                        })), (function (str) {
                    return ParseNumericRangeJs.parsePart(str.replace(/[\{\}]/g, ""));
                  })), []);
}

function makeCodeElement(code, metastring, lang) {
  var codeElement;
  if (metastring !== undefined) {
    var metaSplits = Belt_List.fromArray(metastring.split(" "));
    var highlightedLines = parseNumericRangeMeta(metastring);
    codeElement = Belt_List.has(metaSplits, "example", (function (prim, prim$1) {
            return prim === prim$1;
          })) ? React.createElement(CodeExample.make, {
            code: code,
            lang: lang
          }) : (
        Belt_List.has(metaSplits, "sig", (function (prim, prim$1) {
                return prim === prim$1;
              })) ? React.createElement(CodeExample.make, {
                code: code,
                showLabel: false,
                lang: lang
              }) : React.createElement(CodeExample.make, {
                highlightedLines: highlightedLines,
                code: code,
                lang: lang
              })
      );
  } else {
    codeElement = React.createElement(CodeExample.make, {
          code: code,
          lang: lang
        });
  }
  return React.createElement("div", {
              className: "md-code font-mono w-full block  mt-4 mb-10"
            }, codeElement);
}

function Markdown$Code(Props) {
  var className = Props.className;
  var metastring = Props.metastring;
  var children = Props.children;
  var lang;
  if (className !== undefined) {
    var match = className.split("-");
    if (match.length !== 2) {
      lang = "text";
    } else {
      var match$1 = match[0];
      if (match$1 === "language") {
        var lang$1 = match[1];
        lang = lang$1 === "" ? "text" : lang$1;
      } else {
        lang = "text";
      }
    }
  } else {
    lang = "text";
  }
  if (!isArray(children)) {
    if (isObject(children)) {
      return children;
    } else {
      return makeCodeElement(children, metastring, lang);
    }
  }
  var code = children.join("");
  return React.createElement(Markdown$InlineCode, {
              children: Util.ReactStuff.s(code)
            });
}

var Code = {
  parseNumericRange: parseNumericRange,
  typeOf: typeOf,
  isArray: isArray,
  isObject: isObject,
  isString: isString,
  parseNumericRangeMeta: parseNumericRangeMeta,
  makeCodeElement: makeCodeElement,
  make: Markdown$Code
};

var getMdxMetastring = (element => {
      if(element == null || element.props == null) {
        return;
      }
      return element.props.metastring;
    });

function Markdown$CodeTab(Props) {
  var children = Props.children;
  var labelsOpt = Props.labels;
  var labels = labelsOpt !== undefined ? labelsOpt : [];
  var mdxElements = Mdx.MdxChildren.classify(children);
  var mdxElements$1;
  switch (mdxElements.TAG | 0) {
    case /* Element */1 :
        mdxElements$1 = [mdxElements._0];
        break;
    case /* Array */2 :
        mdxElements$1 = mdxElements._0;
        break;
    case /* String */0 :
    case /* Unknown */3 :
        mdxElements$1 = [];
        break;
    
  }
  var tabs = Belt_Array.reduceWithIndex(mdxElements$1, [], (function (acc, mdxElement, i) {
          var child = Mdx.MdxChildren.classify(Mdx.MdxChildren.getMdxChildren(mdxElement));
          if (child.TAG === /* Element */1) {
            var codeEl = child._0;
            var match = Mdx.getMdxType(codeEl);
            if (match === "code") {
              var className = Belt_Option.getWithDefault(Mdx.getMdxClassName(codeEl), "");
              var metastring = Belt_Option.getWithDefault(getMdxMetastring(codeEl), "");
              var match$1 = className.split("-");
              var lang;
              if (match$1.length !== 2) {
                lang = undefined;
              } else {
                var match$2 = match$1[0];
                lang = match$2 === "language" ? match$1[1] : undefined;
              }
              var code = Mdx.MdxChildren.flatten(codeEl).join("");
              var label = Belt_Array.get(labels, i);
              var tab_highlightedLines = parseNumericRangeMeta(metastring);
              var tab = {
                highlightedLines: tab_highlightedLines,
                label: label,
                lang: lang,
                code: code
              };
              acc.push(tab);
            }
            
          }
          return acc;
        }));
  return React.createElement("div", {
              className: "mt-4 mb-10 -mx-6 xs:mx-0"
            }, React.createElement(CodeExample.Toggle.make, {
                  tabs: tabs
                }));
}

var CodeTab = {
  getMdxMetastring: getMdxMetastring,
  make: Markdown$CodeTab
};

function Markdown$Blockquote(Props) {
  var children = Props.children;
  return React.createElement("blockquote", {
              className: "md-blockquote"
            }, React.createElement(Markdown$Info, {
                  children: children
                }));
}

var Blockquote = {
  make: Markdown$Blockquote
};

function Markdown$Hr(Props) {
  return React.createElement("hr", {
              className: "my-4"
            });
}

var Hr = {
  make: Markdown$Hr
};

function Markdown$A(Props) {
  var href = Props.href;
  var target = Props.target;
  var children = Props.children;
  if (Util.Url.isAbsolute(href)) {
    var tmp = {
      className: "no-underline text-fire hover:underline",
      href: href,
      rel: "noopener noreferrer"
    };
    if (target !== undefined) {
      tmp.target = Caml_option.valFromOption(target);
    }
    return React.createElement("a", tmp, children);
  }
  var regex = /\.md(x)?|\.html$/;
  var match = href.split("#");
  var len = match.length;
  var href$1;
  if (len >= 3) {
    href$1 = href;
  } else {
    switch (len) {
      case 0 :
          href$1 = href;
          break;
      case 1 :
          var pathname = match[0];
          href$1 = pathname.replace(regex, "");
          break;
      case 2 :
          var pathname$1 = match[0];
          var anchor = match[1];
          href$1 = pathname$1.replace(regex, "") + ("#" + anchor);
          break;
      
    }
  }
  var tmp$1 = {
    className: "no-underline text-fire hover:underline",
    rel: "noopener noreferrer"
  };
  if (target !== undefined) {
    tmp$1.target = Caml_option.valFromOption(target);
  }
  return React.createElement(Link, {
              href: href$1,
              children: React.createElement("a", tmp$1, children)
            });
}

var A = {
  make: Markdown$A
};

function Markdown$Ul(Props) {
  var children = Props.children;
  return React.createElement("ul", {
              className: "md-ul"
            }, children);
}

var Ul = {
  make: Markdown$Ul
};

function Markdown$Ol(Props) {
  var children = Props.children;
  return React.createElement("ol", {
              className: "md-ol ml-2"
            }, children);
}

var Ol = {
  make: Markdown$Ol
};

var typeOf$1 = (thing => { return typeof thing; });

var isArray$1 = (thing => { return thing instanceof Array; });

function Markdown$Li(Props) {
  var children = Props.children;
  var elements;
  if (isArray$1(children)) {
    var last = Belt_Array.getExn(children, children.length - 1 | 0);
    var head = children.slice(0, children.length - 1 | 0);
    var first = Belt_Array.getExn(head, 0);
    var match = Mdx.getMdxType(last);
    var exit = 0;
    switch (match) {
      case "li" :
      case "pre" :
      case "ul" :
          exit = 1;
          break;
      default:
        elements = React.createElement("p", undefined, children);
    }
    if (exit === 1) {
      var match$1 = Mdx.getMdxType(first);
      elements = match$1 === "p" ? React.createElement(React.Fragment, undefined, Util.ReactStuff.ate(head), last) : React.createElement(React.Fragment, undefined, React.createElement("p", undefined, Util.ReactStuff.ate(head)), last);
    }
    
  } else if (typeOf$1(children) === "string") {
    elements = React.createElement("p", undefined, children);
  } else {
    var match$2 = Mdx.getMdxType(children);
    switch (match$2) {
      case "p" :
      case "pre" :
          elements = children;
          break;
      default:
        elements = React.createElement("p", undefined, children);
    }
  }
  return React.createElement("li", {
              className: "md-li mt-3 leading-4 ml-4 text-lg"
            }, elements);
}

var Li = {
  typeOf: typeOf$1,
  isArray: isArray$1,
  make: Markdown$Li
};

function Markdown$Strong(Props) {
  var children = Props.children;
  return React.createElement("strong", {
              className: "font-semibold"
            }, children);
}

var Strong = {
  make: Markdown$Strong
};

var $$default = {
  Cite: Markdown$Cite,
  Info: Markdown$Info,
  Warn: Markdown$Warn,
  Intro: Markdown$Intro,
  UrlBox: Markdown$UrlBox,
  CodeTab: Markdown$CodeTab,
  p: Markdown$P,
  li: Markdown$Li,
  h1: Markdown$H1,
  h2: Markdown$H2,
  h3: Markdown$H3,
  h4: Markdown$H4,
  h5: Markdown$H5,
  ul: Markdown$Ul,
  ol: Markdown$Ol,
  table: Markdown$Table,
  thead: Markdown$Thead,
  th: Markdown$Th,
  td: Markdown$Td,
  blockquote: Markdown$Blockquote,
  inlineCode: Markdown$InlineCode,
  strong: Markdown$Strong,
  hr: Markdown$Hr,
  code: Markdown$Code,
  pre: Markdown$Pre,
  a: Markdown$A
};

export {
  P ,
  Intro ,
  Cite ,
  Info ,
  Warn ,
  UrlBox ,
  Anchor ,
  H1 ,
  H2 ,
  H3 ,
  H4 ,
  H5 ,
  Pre ,
  InlineCode ,
  Table ,
  Thead ,
  Th ,
  Td ,
  Code ,
  CodeTab ,
  Blockquote ,
  Hr ,
  A ,
  Ul ,
  Ol ,
  Li ,
  Strong ,
  $$default ,
  $$default as default,
  
}
/* imgEl Not a pure module */
