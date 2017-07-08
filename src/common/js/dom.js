export function getData(ele, attr, val) {
  const prefix = "data-"
  if (val) {
    return ele.setAttribute(prefix + attr, val);
  } else {
    return ele.getAttribute(prefix + attr);
  }
}

let elementStyle = document.createElement("div").style;

let vender = (() => {
  let transformNames = {
    "webkit" : "webkitTransform",
    "Moz" : "MozTransform",
    "O" : "OTransform",
    "ms" : "msTransform",
    "standard" : "transform"
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  return false;
})();

export function prefixStyle(style) {
  if (vender === false) {
    return false;
  }
  if (vender === "standard") {
    return style;
  }

  return vender + style.charAt(0).toUpperCase() + style.substring(1);
}