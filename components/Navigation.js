

import * as Url from "../common/Url.js";
import * as Icon from "./Icon.js";
import * as Util from "../common/Util.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as DocSearch from "./DocSearch.js";
import Link from "next/link";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Router from "next/router";

var link = "no-underline block text-inherit hover:cursor-pointer hover:text-white text-white-80 mb-px";

var activeLink = "text-inherit font-normal border-b border-fire";

function linkOrActiveLink(target, route) {
  if (target === route) {
    return activeLink;
  } else {
    return link;
  }
}

function linkOrActiveLinkSubroute(target, route) {
  if (route.startsWith(target)) {
    return activeLink;
  } else {
    return link;
  }
}

function linkOrActiveApiSubroute(route) {
  var url = Url.parse(route);
  var match = Belt_Array.get(url.pagepath, 0);
  if (match === "api") {
    return activeLink;
  } else {
    return link;
  }
}

function linkOrActiveDocsSubroute(route) {
  var url = Url.parse(route);
  var match = url.base;
  var len = match.length;
  if (len >= 3) {
    return link;
  }
  switch (len) {
    case 0 :
        return link;
    case 1 :
        var match$1 = match[0];
        if (match$1 !== "docs") {
          return link;
        }
        break;
    case 2 :
        var match$2 = match[0];
        if (match$2 !== "docs") {
          return link;
        }
        var match$3 = match[1];
        switch (match$3) {
          case "gentype" :
          case "manual" :
              break;
          default:
            return link;
        }
        break;
    
  }
  var match$4 = Belt_Array.get(url.pagepath, 0);
  if (match$4 === "api") {
    return link;
  } else {
    return activeLink;
  }
}

var githubHref = "https://github.com/reason-association/rescript-lang.org#rescript-langorg";

var discourseHref = "https://forum.rescript-lang.org";

var useOutsideClick = ((outerRef, trigger) => {
      function handleClickOutside(event) {
        if (outerRef.current && !outerRef.current.contains(event.target)) {
          trigger();
        }
      }

      React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      });

    });

var useWindowWidth = (() => {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = React.useState(getSize);

  React.useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  if(windowSize) {
    return windowSize.width;
  }
  return null;
  });

function Navigation$MobileNav(Props) {
  var route = Props.route;
  var base = "font-light mx-4 py-5 text-white-80 border-b border-night";
  var extLink = "block hover:cursor-pointer hover:text-white text-night-light";
  return React.createElement("div", {
              className: "border-night border-t"
            }, React.createElement("ul", undefined, React.createElement("li", {
                      className: base
                    }, React.createElement(DocSearch.Textbox.make, {
                          id: "docsearch-mobile"
                        })), React.createElement("li", {
                      className: base
                    }, React.createElement(Link, {
                          href: "/try",
                          children: React.createElement("a", {
                                className: linkOrActiveLink("/try", route)
                              }, Util.ReactStuff.s("Playground"))
                        })), React.createElement("li", {
                      className: base
                    }, React.createElement(Link, {
                          href: "/blog",
                          children: React.createElement("a", {
                                className: linkOrActiveLinkSubroute("/blog", route)
                              }, Util.ReactStuff.s("Blog"))
                        })), React.createElement("li", {
                      className: base
                    }, React.createElement("a", {
                          className: extLink,
                          href: "https://twitter.com/rescriptlang",
                          rel: "noopener noreferrer",
                          target: "_blank"
                        }, Util.ReactStuff.s("Twitter"))), React.createElement("li", {
                      className: base
                    }, React.createElement("a", {
                          className: extLink,
                          href: githubHref,
                          rel: "noopener noreferrer",
                          target: "_blank"
                        }, Util.ReactStuff.s("Github"))), React.createElement("li", {
                      className: base
                    }, React.createElement("a", {
                          className: extLink,
                          href: discourseHref,
                          rel: "noopener noreferrer",
                          target: "_blank"
                        }, Util.ReactStuff.s("Forum")))));
}

function Navigation(Props) {
  var fixedOpt = Props.fixed;
  var overlayState = Props.overlayState;
  var fixed = fixedOpt !== undefined ? fixedOpt : true;
  var minWidth = "20rem";
  var router = Router.useRouter();
  var route = router.route;
  var match = React.useState(function () {
        return [];
      });
  var setOverlayOpen = overlayState[1];
  var isOverlayOpen = overlayState[0];
  var setCollapsibles = match[1];
  var resetCollapsibles = function (param) {
    return Curry._1(setCollapsibles, (function (prev) {
                  return Belt_Array.map(prev, (function (c) {
                                return {
                                        title: c.title,
                                        children: c.children,
                                        href: c.href,
                                        state: /* Closed */2
                                      };
                              }));
                }));
  };
  var outerRef = React.useRef(null);
  useOutsideClick(outerRef, resetCollapsibles);
  Curry._1(useWindowWidth, undefined);
  var nonCollapsibleOnMouseEnter = function (evt) {
    evt.preventDefault();
    return resetCollapsibles(undefined);
  };
  React.useEffect((function () {
          var events = router.events;
          var onChangeComplete = function (_url) {
            resetCollapsibles(undefined);
            return Curry._1(setOverlayOpen, (function (param) {
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
  var fixedNav = fixed ? "fixed z-30 top-0" : "";
  return React.createElement("nav", {
              ref: outerRef,
              className: fixedNav + " flex xs:justify-center w-full h-18 bg-gray-95 shadow text-white-80 text-base",
              id: "header",
              style: {
                minWidth: minWidth
              }
            }, React.createElement("div", {
                  className: "flex justify-between mx-4 md:mx-8 items-center h-full w-full max-w-1280"
                }, React.createElement("div", {
                      className: "h-8 w-8"
                    }, React.createElement("a", {
                          className: "block hover:cursor-pointer w-full h-full flex justify-center items-center font-bold",
                          href: "/"
                        }, React.createElement("img", {
                              src: "/static/nav-logo@2x.png"
                            }))), React.createElement("div", {
                      className: "flex items-center xs:justify-end w-full bg-gray-95 sm:h-auto sm:relative"
                    }, React.createElement("div", {
                          className: "flex ml-10 w-full max-w-320",
                          style: {
                            maxWidth: "26rem"
                          }
                        }, React.createElement(Link, {
                              href: "/docs/latest",
                              children: React.createElement("a", {
                                    className: "mr-5 " + linkOrActiveDocsSubroute(route),
                                    onMouseEnter: nonCollapsibleOnMouseEnter
                                  }, Util.ReactStuff.s("Docs"))
                            }), React.createElement(Link, {
                              href: "/docs/manual/latest/api",
                              children: React.createElement("a", {
                                    className: "mr-5 " + linkOrActiveApiSubroute(route),
                                    onMouseEnter: nonCollapsibleOnMouseEnter
                                  }, Util.ReactStuff.s("API"))
                            }), React.createElement(Link, {
                              href: "/try",
                              children: React.createElement("a", {
                                    className: "hidden xs:block mr-5 " + linkOrActiveLink("/try", route),
                                    onMouseEnter: nonCollapsibleOnMouseEnter
                                  }, Util.ReactStuff.s("Playground"))
                            }), React.createElement(Link, {
                              href: "/blog",
                              children: React.createElement("a", {
                                    className: "hidden xs:block mr-5 " + linkOrActiveLinkSubroute("/blog", route),
                                    onMouseEnter: nonCollapsibleOnMouseEnter
                                  }, Util.ReactStuff.s("Blog"))
                            }), React.createElement(Link, {
                              href: "/community",
                              children: React.createElement("a", {
                                    className: "hidden xs:block " + linkOrActiveLink("/community", route),
                                    onMouseEnter: nonCollapsibleOnMouseEnter
                                  }, Util.ReactStuff.s("Community"))
                            })), React.createElement("div", {
                          className: "hidden sm:flex items-center"
                        }, React.createElement("a", {
                              className: "mr-5 no-underline block text-inherit hover:cursor-pointer hover:text-white text-white-80 mb-px",
                              href: githubHref,
                              rel: "noopener noreferrer",
                              target: "_blank",
                              onMouseEnter: nonCollapsibleOnMouseEnter
                            }, React.createElement(Icon.Github.make, {
                                  className: "w-6 h-6 opacity-50 hover:opacity-100"
                                })), React.createElement("a", {
                              className: "mr-5 no-underline block text-inherit hover:cursor-pointer hover:text-white text-white-80 mb-px",
                              href: "https://twitter.com/rescriptlang",
                              rel: "noopener noreferrer",
                              target: "_blank",
                              onMouseEnter: nonCollapsibleOnMouseEnter
                            }, React.createElement(Icon.Twitter.make, {
                                  className: "w-6 h-6 opacity-50 hover:opacity-100"
                                })), React.createElement("a", {
                              className: link,
                              href: discourseHref,
                              rel: "noopener noreferrer",
                              target: "_blank",
                              onMouseEnter: nonCollapsibleOnMouseEnter
                            }, React.createElement(Icon.Discourse.make, {
                                  className: "w-6 h-6 opacity-50 hover:opacity-100"
                                }))), React.createElement("div", {
                          className: "hidden sm:block ml-8"
                        }, React.createElement(DocSearch.make, {})))), React.createElement("button", {
                  className: "h-full px-4 xs:hidden flex items-center hover:text-white",
                  onClick: (function (evt) {
                      evt.preventDefault();
                      resetCollapsibles(undefined);
                      return Curry._1(setOverlayOpen, (function (prev) {
                                    return !prev;
                                  }));
                    })
                }, React.createElement(Icon.DrawerDots.make, {
                      className: "h-1 w-auto block " + (
                        isOverlayOpen ? "text-fire" : ""
                      )
                    })), React.createElement("div", {
                  className: (
                    isOverlayOpen ? "flex" : "hidden"
                  ) + " sm:hidden flex-col fixed top-0 left-0 h-full w-full z-30 sm:w-9/12 bg-gray-100 sm:h-auto sm:flex sm:relative sm:flex-row sm:justify-between",
                  style: {
                    minWidth: minWidth,
                    top: "4.5rem"
                  }
                }, React.createElement(Navigation$MobileNav, {
                      route: route
                    })));
}

var make = Navigation;

export {
  make ,
  
}
/* Icon Not a pure module */
