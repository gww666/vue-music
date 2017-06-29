export function getData(ele, attr, val) {
  const prefix = "data-"
  if (val) {
    return ele.setAttribute(prefix + attr, val);
  } else {
    return ele.getAttribute(prefix + attr);
  }
}