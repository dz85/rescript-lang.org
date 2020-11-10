


var _map = {"Reason":"theme-reason","Js":"theme-js"};

var _revMap = {"theme-reason":"Reason","theme-js":"Js"};

function tToJs(param) {
  return _map[param];
}

function tFromJs(param) {
  return _revMap[param];
}

var toCN = tToJs;

export {
  tToJs ,
  tFromJs ,
  toCN ,
  
}
/* No side effect */
