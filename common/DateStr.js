


function fromDate(date) {
  return date.toString();
}

function toDate(dateStr) {
  return new Date(dateStr.replace(/-/g, "/"));
}

export {
  fromDate ,
  toDate ,
  
}
/* No side effect */
