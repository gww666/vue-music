import originJsonp from "jsonp";

export default function jsonp(url, params, opt) {
  url += (url.indexOf("?") === -1 ? "?" : "&") + param(params);
  return new Promise((resolve, reject) => {
    originJsonp(url, opt, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    })
  });
}

//处理url
export function param(params) {
  let url = "";
  for (let key in params) {
    let value = params[key] !== undefined ? params[key] : "";
    url += `&${key}=${encodeURIComponent(value)}`;
  }
  //返回时去掉第一个&符
  return url ? url.slice(1) : "";
}