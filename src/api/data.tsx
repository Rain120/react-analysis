/*
 * @Author: Rain120 
 * @Date: 2018-09-06 13:20:01 
 * @Last Modified by: Rain120
 * @Last Modified time: 2018-09-07 10:43:47
 */

import axios from 'axios';
let url = "http://192.168.1.204:23456/anomalyOfflineDetect"

export function getDetect (algorithm) {
  return axios.post(`${url}/detect`, algorithm).then(res => {
    return Promise.resolve(res)
  })
}

export function getLists () {
  return axios.get(`${url}/list`).then(res => {
    return Promise.resolve(res)
  })
}
