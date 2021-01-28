// store/permission.js
// 本来是已 permission 类直接导出 后修改如下
import { asyncRouterMap, constantRoutes } from '../../router/index'
import router from '@/router'

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    var jiao = roles.filter((val) => new Set(route.meta.role).has(val))
    return roles.some(role => jiao.length > 0)
  } else {
    return true
  }
}

// const permission = {
const state = {
  routers: constantRoutes,
  addRouters: []
}
const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRoutes.concat(routers)
  },
  RESET_ROUTERS: (state) => {
    state.addRouters = []
    state.routers = []
  }
}
const actions = {
  GenerateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { roles } = data
      console.log('加载路由')
      const accessedRouters = asyncRouterMap.filter(v => {
        // console.log(roles.indexOf('admin') >= 0)
        // if (roles.indexOf('admin') >= 0) return true
        // console.log('加载路由:', hasPermission(roles, v))
        if (hasPermission(roles, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              if (hasPermission(roles, child)) {
                return child
              }
              return false
            })
            return v
          } else {
            return v
          }
        }
        // return false
      })
      commit('SET_ROUTERS', accessedRouters)
      resolve(accessedRouters)
    })
  }
}
// }

// export default permission

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
