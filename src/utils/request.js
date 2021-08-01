/*
 * @Author: 邹洋
 * @Date: 2021-07-22 20:30:49
 * @LastEditTime: 2021-08-01 21:08:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ChileCat_Admin_Web\src\utils\request.js
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: 'http://47.102.215.230:8000/api/',//process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'http://127.0.0.1:8000/',
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Token'] = getToken()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    const res = error.response.data
    Message({
      message: res.message,
      type: 'error',
      duration: 5 * 1000
    })
    // // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //   MessageBox.confirm(
    //     'You have been logged out, you can cancel to stay on this page, or log in again',
    //     'Confirm logout',
    //     {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }
    //   ).then(() => {
    //     store.dispatch('user/resetToken').then(() => {
    //       location.reload()
    //     })
    //   })
    // }
    return Promise.reject(error)
  }
)

export default service
