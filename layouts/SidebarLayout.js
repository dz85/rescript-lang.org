

import * as Icon from "../components/Icon.js";
import * as List from "bs-platform/lib/es6/list.js";
import * as Meta from "../components/Meta.js";
import * as Util from "../common/Util.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Belt_List from "bs-platform/lib/es6/belt_List.js";
import Link from "next/link";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as ColorTheme from "../common/ColorTheme.js";
import * as Navigation from "../components/Navigation.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Router from "next/router";
import * as React$1 from "@mdx-js/react";

function SidebarLayout$Toc(Props) {
  var entries = Props.entries;
  return React.createElement("ul", {
              className: "mt-2 py-1 mb-4 border-l border-primary"
            }, Util.ReactStuff.ate(Belt_Array.map(entries, (function (param) {
                        var header = param.header;
                        return React.createElement("li", {
                                    key: header,
                                    className: "pl-2 mt-3 first:mt-1"
                                  }, React.createElement(Link, {
                                        href: param.href,
                                        children: React.createElement("a", {
                                              className: "font-medium block text-sm text-night-light leading-tight tracking-tight hover:text-primary"
                                            }, Util.ReactStuff.s(header))
                                      }));
                      }))));
}

var Toc = {
  make: SidebarLayout$Toc
};

function SidebarLayout$Sidebar$Title(Props) {
  var children = Props.children;
  return React.createElement("div", {
              className: "font-sans font-black text-night-light tracking-wide text-xs uppercase mt-5"
            }, children);
}

var Title = {
  make: SidebarLayout$Sidebar$Title
};

function SidebarLayout$Sidebar$NavItem(Props) {
  var getActiveToc = Props.getActiveToc;
  var isItemActiveOpt = Props.isItemActive;
  var isHiddenOpt = Props.isHidden;
  var items = Props.items;
  var isItemActive = isItemActiveOpt !== undefined ? isItemActiveOpt : (function (_nav) {
        return false;
      });
  var isHidden = isHiddenOpt !== undefined ? isHiddenOpt : false;
  return React.createElement("ul", {
              className: "mt-2 text-sm font-medium"
            }, Util.ReactStuff.ate(Belt_Array.map(items, (function (m) {
                        var hidden = isHidden ? "hidden" : "block";
                        var active = Curry._1(isItemActive, m) ? " bg-fire-15 text-fire leading-5 -ml-2 pl-2 font-semibold block hover:bg-fire-15 " : "";
                        var activeToc = getActiveToc !== undefined ? Curry._1(getActiveToc, m) : undefined;
                        var tmp;
                        if (activeToc !== undefined) {
                          var entries = activeToc.entries;
                          tmp = entries.length === 0 ? null : React.createElement(SidebarLayout$Toc, {
                                  entries: entries
                                });
                        } else {
                          tmp = null;
                        }
                        return React.createElement("li", {
                                    key: m.name,
                                    className: hidden + " mt-1 leading-4"
                                  }, React.createElement(Link, {
                                        href: m.href,
                                        children: React.createElement("a", {
                                              className: "truncate block py-1 md:h-auto tracking-tight text-night-darker rounded-sm  hover:bg-gray-5 hover:-ml-2 hover:py-1 hover:pl-2 " + active
                                            }, Util.ReactStuff.s(m.name))
                                      }), tmp);
                      }))));
}

var NavItem = {
  make: SidebarLayout$Sidebar$NavItem
};

function SidebarLayout$Sidebar$Category(Props) {
  var getActiveToc = Props.getActiveToc;
  var isItemActive = Props.isItemActive;
  var category = Props.category;
  var tmp = {
    items: category.items
  };
  if (getActiveToc !== undefined) {
    tmp.getActiveToc = Caml_option.valFromOption(getActiveToc);
  }
  if (isItemActive !== undefined) {
    tmp.isItemActive = Caml_option.valFromOption(isItemActive);
  }
  return React.createElement("div", {
              key: category.name,
              className: "my-12"
            }, React.createElement(SidebarLayout$Sidebar$Title, {
                  children: Util.ReactStuff.s(category.name)
                }), React.createElement(SidebarLayout$Sidebar$NavItem, tmp));
}

var Category = {
  make: SidebarLayout$Sidebar$Category
};

function SidebarLayout$Sidebar(Props) {
  var categories = Props.categories;
  var route = Props.route;
  var toplevelNavOpt = Props.toplevelNav;
  var preludeSectionOpt = Props.preludeSection;
  var activeToc = Props.activeToc;
  var isOpen = Props.isOpen;
  var toggle = Props.toggle;
  var toplevelNav = toplevelNavOpt !== undefined ? Caml_option.valFromOption(toplevelNavOpt) : null;
  var preludeSection = preludeSectionOpt !== undefined ? Caml_option.valFromOption(preludeSectionOpt) : null;
  var isItemActive = function (navItem) {
    return navItem.href === route;
  };
  var getActiveToc = function (navItem) {
    if (navItem.href === route) {
      return activeToc;
    }
    
  };
  return React.createElement(React.Fragment, undefined, React.createElement("div", {
                  className: (
                    isOpen ? "fixed w-full left-0 h-full z-20 min-w-320" : "hidden "
                  ) + " md:block md:w-48 md:-ml-4 lg:w-1/4 md:h-auto md:relative overflow-y-visible bg-white md:relative",
                  id: "sidebar",
                  style: {
                    minWidth: "12.9375rem"
                  }
                }, React.createElement("aside", {
                      className: "relative top-0 px-4 w-full block md:top-18 md:pt-24 md:sticky border-r border-snow-dark overflow-y-auto scrolling-touch pb-24",
                      id: "sidebar-content",
                      style: {
                        height: "calc(100vh - 4.5rem"
                      }
                    }, React.createElement("div", {
                          className: "flex justify-between"
                        }, React.createElement("div", {
                              className: "w-3/4 md:w-full"
                            }, toplevelNav), React.createElement("button", {
                              className: "md:hidden h-16",
                              onClick: (function (evt) {
                                  evt.preventDefault();
                                  return Curry._1(toggle, undefined);
                                })
                            }, React.createElement(Icon.Close.make, {}))), preludeSection, React.createElement("div", {
                          className: "mb-56"
                        }, Util.ReactStuff.ate(Belt_Array.map(categories, (function (category) {
                                    return React.createElement("div", {
                                                key: category.name
                                              }, React.createElement(SidebarLayout$Sidebar$Category, {
                                                    getActiveToc: getActiveToc,
                                                    isItemActive: isItemActive,
                                                    category: category
                                                  }));
                                  })))))));
}

var Sidebar = {
  Title: Title,
  NavItem: NavItem,
  Category: Category,
  make: SidebarLayout$Sidebar
};

function SidebarLayout$BreadCrumbs(Props) {
  var crumbs = Props.crumbs;
  return React.createElement("div", {
              className: "w-full font-medium tracking-tight overflow-x-auto text-14 text-night"
            }, Util.ReactStuff.ate(Belt_List.toArray(Belt_List.mapWithIndex(crumbs, (function (i, crumb) {
                            var item = i === (Belt_List.length(crumbs) - 1 | 0) ? React.createElement("span", {
                                    key: String(i)
                                  }, Util.ReactStuff.s(crumb.name)) : React.createElement(Link, {
                                    href: crumb.href,
                                    children: React.createElement("a", undefined, Util.ReactStuff.s(crumb.name)),
                                    key: String(i)
                                  });
                            if (i > 0) {
                              return React.createElement("span", {
                                          key: String(i)
                                        }, Util.ReactStuff.s(" / "), item);
                            } else {
                              return item;
                            }
                          })))));
}

var BreadCrumbs = {
  make: SidebarLayout$BreadCrumbs
};

function SidebarLayout$MobileDrawerButton(Props) {
  var hidden = Props.hidden;
  var onClick = Props.onClick;
  return React.createElement("button", {
              className: (
                hidden ? "hidden" : ""
              ) + " md:hidden mr-3",
              onMouseDown: onClick
            }, React.createElement("img", {
                  className: "h-4",
                  src: "/static/ic_sidebar_drawer.svg"
                }));
}

var MobileDrawerButton = {
  make: SidebarLayout$MobileDrawerButton
};

function SidebarLayout(Props) {
  var metaTitle = Props.metaTitle;
  var theme = Props.theme;
  var components = Props.components;
  var sidebarState = Props.sidebarState;
  var sidebar = Props.sidebar;
  var breadcrumbs = Props.breadcrumbs;
  var children = Props.children;
  var match = React.useState(function () {
        return false;
      });
  var isNavOpen = match[0];
  var router = Router.useRouter();
  var theme$1 = ColorTheme.toCN(theme);
  var hasBreadcrumbs = breadcrumbs !== undefined ? List.length(breadcrumbs) > 0 : false;
  var breadcrumbs$1 = Belt_Option.mapWithDefault(breadcrumbs, null, (function (crumbs) {
          return React.createElement(SidebarLayout$BreadCrumbs, {
                      crumbs: crumbs
                    });
        }));
  var setSidebarOpen = sidebarState[1];
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
  return React.createElement(React.Fragment, undefined, React.createElement(Meta.make, {
                  title: metaTitle
                }), React.createElement("div", {
                  className: "mt-16 min-w-320 " + theme$1
                }, React.createElement("div", {
                      className: "w-full text-night font-base"
                    }, React.createElement(Navigation.make, {
                          overlayState: [
                            isNavOpen,
                            match[1]
                          ]
                        }), React.createElement("div", {
                          className: "flex justify-center"
                        }, React.createElement("div", {
                              className: "w-full max-w-1280 md:mx-8"
                            }, React.createElement("div", {
                                  className: "flex"
                                }, sidebar, React.createElement("main", {
                                      className: "px-6 w-full md:ml-12 md:mx-8 pt-16 md:mt-2 md:pt-24 mb-32 text-lg max-w-705"
                                    }, React.createElement("div", {
                                          className: "z-10 fixed border-b shadow top-18 left-0 pl-4 bg-white w-full py-4 md:relative md:border-none md:shadow-none md:p-0 md:top-auto flex items-center"
                                        }, React.createElement(SidebarLayout$MobileDrawerButton, {
                                              hidden: isNavOpen,
                                              onClick: (function (evt) {
                                                  evt.preventDefault();
                                                  return Curry._1(setSidebarOpen, (function (prev) {
                                                                return !prev;
                                                              }));
                                                })
                                            }), React.createElement("div", {
                                              className: "truncate overflow-x-auto touch-scroll"
                                            }, breadcrumbs$1)), React.createElement("div", {
                                          className: hasBreadcrumbs ? "mt-10" : "-mt-4"
                                        }, React.createElement(React$1.MDXProvider, {
                                              components: components,
                                              children: children
                                            })))))))));
}

var Link$1;

var make = SidebarLayout;

export {
  Link$1 as Link,
  Toc ,
  Sidebar ,
  BreadCrumbs ,
  MobileDrawerButton ,
  make ,
  
}
/* Icon Not a pure module */
