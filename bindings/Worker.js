


function Make(Config) {
  var App = {};
  var $$Worker = {};
  return {
          make: Config.make,
          App: App,
          $$Worker: $$Worker
        };
}

export {
  Make ,
  
}
/* No side effect */
