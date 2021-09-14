/*
 * @Author: 邹洋
 * @Date: 2021-05-19 23:35:22
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2021-09-10 19:38:22
 * @Description:
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// import { constantRoutes } from '@/router/index'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name // TODO 如果获取用户正常但是没有返回对应name岂不是要无限循环
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/information')
          const roles = store.getters.roles
          const is_admin = store.getters.is_admin
          if (!is_admin) {
            Message.error('登录失败')
            setTimeout(function(){
              store.dispatch('user/logout')
            }, 2000)
            // next(`/login?redirect=${to.path}`)
            // store.dispatch('user/logout')
          } else {
            store.dispatch('permission/GenerateRoutes', { roles }).then((res) => { // 生成可访问的路由表
              router.addRoutes(res) // 动态添加可访问路由表
              router.options.routes.push(...res)
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              //   next({ path: '/' })
              NProgress.done()
            })
          }
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
