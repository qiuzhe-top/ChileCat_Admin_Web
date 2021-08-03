/*
 * @Author: 邹洋
 * @Date: 2021-07-22 20:30:49
 * @LastEditTime: 2021-08-03 16:53:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ChileCat_Admin_Web\src\utils\request.js
 */
import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // baseURL: 'http://127.0.0.1:8000/',
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    config.headers['Token'] = getToken()
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const res = error.response.data
    Message({
      message: res.message,
      type: 'error',
      duration: 5 * 1000
    })
    // if res.code 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    return Promise.reject(error)
  }
)

export default service
