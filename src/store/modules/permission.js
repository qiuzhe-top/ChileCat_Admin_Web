// store/permission.js
// 本来是以 permission 类直接导出 后修改如下
import { asyncRouterMap, constantRoutes } from '../../router/index'
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
        if (roles.filter((val) => new Set(['root']).has(val))) return true
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
        return false
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
