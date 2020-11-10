

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as $$Promise from "reason-promise/src/js/promise.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Caml_array from "bs-platform/lib/es6/caml_array.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as SimpleRequest from "./SimpleRequest.js";
import * as LoadScript from "../ffi/loadScript";
import LoadScript$1 from "../ffi/loadScript";
import * as RescriptCompilerApi from "../bindings/RescriptCompilerApi.js";

function loadScript(prim, prim$1, prim$2) {
  return LoadScript$1(prim, prim$1, prim$2);
}

function removeScript(prim) {
  LoadScript.removeScript(prim);
  
}

function loadScriptPromise(url) {
  var match = $$Promise.pending(undefined);
  var resolve = match[1];
  LoadScript$1(url, (function (param) {
          return Curry._1(resolve, {
                      TAG: 0,
                      _0: undefined,
                      [Symbol.for("name")]: "Ok"
                    });
        }), (function (_err) {
          return Curry._1(resolve, {
                      TAG: 1,
                      _0: "Could not load script: " + url,
                      [Symbol.for("name")]: "Error"
                    });
        }));
  return match[0];
}

var LoadScript$2 = {
  loadScript: loadScript,
  removeScript: removeScript,
  loadScriptPromise: loadScriptPromise
};

function parseVersions(versions) {
  return versions.split("\n").filter(function (v) {
              return v !== "";
            });
}

function getCompilerUrl(version) {
  return "https://cdn.jsdelivr.net/gh/ryyppy/bs-platform-js-releases@master/" + version + "/compiler.js";
}

function getLibraryCmijUrl(version, libraryName) {
  return "https://cdn.jsdelivr.net/gh/ryyppy/bs-platform-js-releases@master/" + version + "/" + libraryName + "/cmij.js";
}

var CdnMeta = {
  parseVersions: parseVersions,
  getCompilerUrl: getCompilerUrl,
  getLibraryCmijUrl: getLibraryCmijUrl
};

var FinalResult = {};

function attachCompilerAndLibraries(version, libraries, param) {
  var compilerUrl = getCompilerUrl(version);
  return $$Promise.map($$Promise.flatMap($$Promise.map($$Promise.mapError(loadScriptPromise(compilerUrl), (function (_msg) {
                            return "Could not load compiler from url " + compilerUrl;
                          })), (function (r) {
                        if (r.TAG) {
                          return [$$Promise.resolved({
                                        TAG: 1,
                                        _0: r._0,
                                        [Symbol.for("name")]: "Error"
                                      })];
                        } else {
                          return Belt_Array.map(libraries, (function (lib) {
                                        var cmijUrl = getLibraryCmijUrl(version, lib);
                                        return $$Promise.mapError(loadScriptPromise(cmijUrl), (function (_msg) {
                                                      return "Could not load cmij from url " + cmijUrl;
                                                    }));
                                      }));
                        }
                      })), $$Promise.allArray), (function (all) {
                var errors = Belt_Array.reduce(all, [], (function (acc, r) {
                        if (r.TAG) {
                          return acc.concat([r._0]);
                        } else {
                          return acc;
                        }
                      }));
                if (errors.length !== 0) {
                  return {
                          TAG: 1,
                          _0: errors,
                          [Symbol.for("name")]: "Error"
                        };
                } else {
                  return {
                          TAG: 0,
                          _0: undefined,
                          [Symbol.for("name")]: "Ok"
                        };
                }
              }));
}

function useCompilerManager(initialLangOpt, onAction, param) {
  var initialLang = initialLangOpt !== undefined ? initialLangOpt : /* Res */2;
  var match = React.useState(function () {
        return /* Init */0;
      });
  var setState = match[1];
  var state = match[0];
  var dispatch = function (action) {
    Belt_Option.forEach(onAction, (function (cb) {
            return Curry._1(cb, action);
          }));
    switch (action.TAG | 0) {
      case /* SwitchToCompiler */0 :
          var libraries = action.libraries;
          var id = action.id;
          if (typeof state === "number") {
            return ;
          }
          if (state.TAG !== /* Ready */2) {
            return ;
          }
          var ready = state._0;
          if (ready.selected.id !== id) {
            return Curry._1(setState, (function (param) {
                          return {
                                  TAG: 1,
                                  _0: ready,
                                  _1: id,
                                  _2: libraries,
                                  [Symbol.for("name")]: "SwitchingCompiler"
                                };
                        }));
          } else {
            return ;
          }
      case /* SwitchLanguage */1 :
          var code = action.code;
          var lang = action.lang;
          if (typeof state === "number") {
            return ;
          }
          if (state.TAG !== /* Ready */2) {
            return ;
          }
          var ready$1 = state._0;
          var instance = ready$1.selected.instance;
          var availableTargetLangs = RescriptCompilerApi.Version.availableLanguages(ready$1.selected.apiVersion);
          var currentLang = ready$1.targetLang;
          return Belt_Option.forEach(Caml_option.undefined_to_opt(availableTargetLangs.find(function (l) {
                              return l === lang;
                            })), (function (lang) {
                        var match = ready$1.selected.apiVersion;
                        var match$1;
                        if (match) {
                          match$1 = [
                            /* Nothing */0,
                            lang
                          ];
                        } else {
                          var convResult;
                          switch (currentLang) {
                            case /* Reason */0 :
                                convResult = lang >= 2 ? RescriptCompilerApi.Compiler.convertSyntax(instance, /* Reason */0, /* Res */2, code) : undefined;
                                break;
                            case /* OCaml */1 :
                                convResult = undefined;
                                break;
                            case /* Res */2 :
                                convResult = lang !== 0 ? undefined : RescriptCompilerApi.Compiler.convertSyntax(instance, /* Res */2, /* Reason */0, code);
                                break;
                            
                          }
                          if (convResult !== undefined) {
                            if (convResult.TAG) {
                              var secondTry = RescriptCompilerApi.Compiler.convertSyntax(instance, lang, lang, code);
                              match$1 = [
                                {
                                  TAG: 0,
                                  _0: secondTry,
                                  [Symbol.for("name")]: "Conv"
                                },
                                lang
                              ];
                            } else {
                              match$1 = [
                                {
                                  TAG: 0,
                                  _0: convResult,
                                  [Symbol.for("name")]: "Conv"
                                },
                                lang
                              ];
                            }
                          } else {
                            match$1 = [
                              /* Nothing */0,
                              lang
                            ];
                          }
                        }
                        var targetLang = match$1[1];
                        var result = match$1[0];
                        return Curry._1(setState, (function (param) {
                                      return {
                                              TAG: 2,
                                              _0: {
                                                versions: ready$1.versions,
                                                selected: ready$1.selected,
                                                targetLang: targetLang,
                                                errors: [],
                                                result: result
                                              },
                                              [Symbol.for("name")]: "Ready"
                                            };
                                    }));
                      }));
      case /* Format */2 :
          var code$1 = action._0;
          if (typeof state === "number") {
            return ;
          }
          if (state.TAG !== /* Ready */2) {
            return ;
          }
          var ready$2 = state._0;
          var instance$1 = ready$2.selected.instance;
          var match = ready$2.targetLang;
          var convResult;
          switch (match) {
            case /* Reason */0 :
                convResult = RescriptCompilerApi.Compiler.reasonFormat(instance$1, code$1);
                break;
            case /* OCaml */1 :
                convResult = undefined;
                break;
            case /* Res */2 :
                convResult = RescriptCompilerApi.Compiler.resFormat(instance$1, code$1);
                break;
            
          }
          var result = convResult !== undefined && (convResult.TAG || code$1 !== convResult._0.code) ? ({
                TAG: 0,
                _0: convResult,
                [Symbol.for("name")]: "Conv"
              }) : ready$2.result;
          return Curry._1(setState, (function (param) {
                        return {
                                TAG: 2,
                                _0: {
                                  versions: ready$2.versions,
                                  selected: ready$2.selected,
                                  targetLang: ready$2.targetLang,
                                  errors: [],
                                  result: result
                                },
                                [Symbol.for("name")]: "Ready"
                              };
                      }));
      case /* CompileCode */3 :
          var code$2 = action._1;
          var lang$1 = action._0;
          if (typeof state === "number") {
            return ;
          }
          if (state.TAG !== /* Ready */2) {
            return ;
          }
          var ready$3 = state._0;
          return Curry._1(setState, (function (param) {
                        return {
                                TAG: 3,
                                _0: ready$3,
                                _1: [
                                  lang$1,
                                  code$2
                                ],
                                [Symbol.for("name")]: "Compiling"
                              };
                      }));
      case /* UpdateConfig */4 :
          var config = action._0;
          if (typeof state === "number") {
            return ;
          }
          if (state.TAG !== /* Ready */2) {
            return ;
          }
          var ready$4 = state._0;
          RescriptCompilerApi.Compiler.setConfig(ready$4.selected.instance, config);
          return Curry._1(setState, (function (param) {
                        var init = ready$4.selected;
                        var selected_id = init.id;
                        var selected_apiVersion = init.apiVersion;
                        var selected_compilerVersion = init.compilerVersion;
                        var selected_ocamlVersion = init.ocamlVersion;
                        var selected_reasonVersion = init.reasonVersion;
                        var selected_libraries = init.libraries;
                        var selected_instance = init.instance;
                        var selected = {
                          id: selected_id,
                          apiVersion: selected_apiVersion,
                          compilerVersion: selected_compilerVersion,
                          ocamlVersion: selected_ocamlVersion,
                          reasonVersion: selected_reasonVersion,
                          libraries: selected_libraries,
                          config: config,
                          instance: selected_instance
                        };
                        return {
                                TAG: 2,
                                _0: {
                                  versions: ready$4.versions,
                                  selected: selected,
                                  targetLang: ready$4.targetLang,
                                  errors: ready$4.errors,
                                  result: ready$4.result
                                },
                                [Symbol.for("name")]: "Ready"
                              };
                      }));
      
    }
  };
  var dispatchError = function (err) {
    return Curry._1(setState, (function (prev) {
                  var msg = err._0;
                  if (typeof prev === "number") {
                    return {
                            TAG: 0,
                            _0: msg,
                            [Symbol.for("name")]: "SetupFailed"
                          };
                  }
                  if (prev.TAG !== /* Ready */2) {
                    return {
                            TAG: 0,
                            _0: msg,
                            [Symbol.for("name")]: "SetupFailed"
                          };
                  }
                  var ready = prev._0;
                  return {
                          TAG: 2,
                          _0: {
                            versions: ready.versions,
                            selected: ready.selected,
                            targetLang: ready.targetLang,
                            errors: ready.errors.concat([msg]),
                            result: ready.result
                          },
                          [Symbol.for("name")]: "Ready"
                        };
                }));
  };
  React.useEffect((function () {
          if (typeof state === "number") {
            var libraries = ["reason-react"];
            var completed = function (res) {
              if (res.TAG) {
                var match = res._0;
                dispatchError({
                      TAG: 0,
                      _0: "Error occurred: " + match.text + " (status-code: " + match.status + ")",
                      [Symbol.for("name")]: "SetupError"
                    });
              } else {
                var versions = parseVersions(res._0.text);
                if (versions.length !== 0) {
                  var latest = Caml_array.get(versions, 0);
                  $$Promise.get(attachCompilerAndLibraries(latest, libraries, undefined), (function (result) {
                          if (result.TAG) {
                            var msg = result._0.join("; ");
                            return dispatchError({
                                        TAG: 1,
                                        _0: msg,
                                        [Symbol.for("name")]: "CompilerLoadingError"
                                      });
                          }
                          var instance = rescript_compiler.make();
                          var apiVersion = RescriptCompilerApi.Version.fromString(rescript_compiler.api_version);
                          var config = instance.getConfig();
                          var selected_compilerVersion = instance.version;
                          var selected_ocamlVersion = instance.ocaml.version;
                          var selected_reasonVersion = instance.reason.version;
                          var selected = {
                            id: latest,
                            apiVersion: apiVersion,
                            compilerVersion: selected_compilerVersion,
                            ocamlVersion: selected_ocamlVersion,
                            reasonVersion: selected_reasonVersion,
                            libraries: libraries,
                            config: config,
                            instance: instance
                          };
                          var targetLang = Belt_Option.getWithDefault(Caml_option.undefined_to_opt(RescriptCompilerApi.Version.availableLanguages(apiVersion).find(function (l) {
                                        return l === initialLang;
                                      })), RescriptCompilerApi.Version.defaultTargetLang(apiVersion));
                          return Curry._1(setState, (function (param) {
                                        return {
                                                TAG: 2,
                                                _0: {
                                                  versions: versions,
                                                  selected: selected,
                                                  targetLang: targetLang,
                                                  errors: [],
                                                  result: /* Nothing */0
                                                },
                                                [Symbol.for("name")]: "Ready"
                                              };
                                      }));
                        }));
                } else {
                  dispatchError({
                        TAG: 0,
                        _0: "No compiler versions found",
                        [Symbol.for("name")]: "SetupError"
                      });
                }
              }
              
            };
            SimpleRequest.send(SimpleRequest.make(completed, undefined, /* Plain */1, "https://cdn.jsdelivr.net/gh/ryyppy/bs-platform-js-releases@latest/VERSIONS"));
          } else {
            switch (state.TAG | 0) {
              case /* SwitchingCompiler */1 :
                  var libraries$1 = state._2;
                  var version = state._1;
                  var ready = state._0;
                  $$Promise.get(attachCompilerAndLibraries(version, libraries$1, undefined), (function (result) {
                          if (result.TAG) {
                            var msg = result._0.join("; ");
                            return dispatchError({
                                        TAG: 1,
                                        _0: msg,
                                        [Symbol.for("name")]: "CompilerLoadingError"
                                      });
                          }
                          var prim = getCompilerUrl(ready.selected.id);
                          LoadScript.removeScript(prim);
                          Belt_Array.forEach(ready.selected.libraries, (function (lib) {
                                  var prim = getLibraryCmijUrl(ready.selected.id, lib);
                                  LoadScript.removeScript(prim);
                                  
                                }));
                          var instance = rescript_compiler.make();
                          var apiVersion = RescriptCompilerApi.Version.fromString(rescript_compiler.api_version);
                          var config = instance.getConfig();
                          var selected_compilerVersion = instance.version;
                          var selected_ocamlVersion = instance.ocaml.version;
                          var selected_reasonVersion = instance.reason.version;
                          var selected = {
                            id: version,
                            apiVersion: apiVersion,
                            compilerVersion: selected_compilerVersion,
                            ocamlVersion: selected_ocamlVersion,
                            reasonVersion: selected_reasonVersion,
                            libraries: libraries$1,
                            config: config,
                            instance: instance
                          };
                          return Curry._1(setState, (function (param) {
                                        return {
                                                TAG: 2,
                                                _0: {
                                                  versions: ready.versions,
                                                  selected: selected,
                                                  targetLang: RescriptCompilerApi.Version.defaultTargetLang(apiVersion),
                                                  errors: [],
                                                  result: /* Nothing */0
                                                },
                                                [Symbol.for("name")]: "Ready"
                                              };
                                      }));
                        }));
                  break;
              case /* SetupFailed */0 :
              case /* Ready */2 :
                  break;
              case /* Compiling */3 :
                  var match = state._1;
                  var code = match[1];
                  var ready$1 = state._0;
                  var apiVersion = ready$1.selected.apiVersion;
                  var instance = ready$1.selected.instance;
                  var compResult;
                  if (apiVersion) {
                    compResult = {
                      TAG: 2,
                      _0: "Can\'t handle result of compiler API version \"" + apiVersion._0 + "\"",
                      [Symbol.for("name")]: "UnexpectedError"
                    };
                  } else {
                    switch (match[0]) {
                      case /* Reason */0 :
                          compResult = RescriptCompilerApi.Compiler.reasonCompile(instance, code);
                          break;
                      case /* OCaml */1 :
                          compResult = RescriptCompilerApi.Compiler.ocamlCompile(instance, code);
                          break;
                      case /* Res */2 :
                          compResult = RescriptCompilerApi.Compiler.resCompile(instance, code);
                          break;
                      
                    }
                  }
                  Curry._1(setState, (function (param) {
                          return {
                                  TAG: 2,
                                  _0: {
                                    versions: ready$1.versions,
                                    selected: ready$1.selected,
                                    targetLang: ready$1.targetLang,
                                    errors: ready$1.errors,
                                    result: {
                                      TAG: 1,
                                      _0: compResult,
                                      [Symbol.for("name")]: "Comp"
                                    }
                                  },
                                  [Symbol.for("name")]: "Ready"
                                };
                        }));
                  break;
              
            }
          }
          
        }), [state]);
  return [
          state,
          dispatch
        ];
}

export {
  LoadScript$2 as LoadScript,
  CdnMeta ,
  FinalResult ,
  attachCompilerAndLibraries ,
  useCompilerManager ,
  
}
/* react Not a pure module */
