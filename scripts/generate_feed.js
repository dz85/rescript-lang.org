

import * as BlogApi from "../common/BlogApi.js";

var content = BlogApi.RssFeed.toXmlString(undefined, undefined, BlogApi.RssFeed.getLatest(undefined, undefined, undefined));

console.log(content);

export {
  content ,
  
}
/* content Not a pure module */
