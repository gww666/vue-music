import jsonp from "../common/js/jsonp";
import {commonParams, commonOptions} from "./config";
import axios from "axios";

export function getBanner() {
    const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";

    let params = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    });
    return jsonp(url, params, commonOptions);
}

export function getSongList() {
    // const url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
    const url = "/api/getsonglist";
    let params = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json',
    });
    // let options = Object.assign({}, commonOptions, {
    //     param : "getPlaylist"
    // });
    return axios.get(url, {
        params
    }).then(response => new Promise((resolve, reject) => {
        console.log(response);
        resolve(response.data);
    }))
    // return jsonp(url, params, options);
}