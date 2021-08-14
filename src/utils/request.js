/*
 * @Author: 邹洋
 * @Date: 2021-05-19 23:35:22
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2021-08-14 18:23:43
 * @Description:
 */
import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // baseURL: 'http://127.0.0.1:8000/',
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000
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
