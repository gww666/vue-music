import {commonParams} from './config'
import axios from 'axios'

export default function getLyric(id) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: id,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}