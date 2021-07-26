import api from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import store from '../../store'

// import { reject } from 'core-js/fn/promise'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    is_admin: false,
    is_superuser: false,
    roles: [],
    classList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    console.log(state.token)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_CLASSLIST: (state, classList) => {
    state.classList = classList
  },
  SET_ROLE: (state, roles) => {
    state.roles = roles
  },
  SET_IS_ADMIN: (state, is_admin) => {
    state.is_admin = is_admin
  },
  SET_IS_SUPERUSER: (state, is_superuser) => {
    state.is_superuser = is_superuser
  }
}

const actions = {
  // TpiStart
  // 登录
  login({ commit }, request) {
    // const { username, password } = request
    console.log(request)
    return new Promise((resolve, reject) => {
      api.login(request).then(response => {
        const { token } = response.data
        commit('SET_TOKEN', token)
        setToken(token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 退出登录
  logout({ commit }, request) {
    return new Promise((resolve, reject) => {
      api.logout(request).then(response => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        store.commit('ask/SET_ASKLIST')
        store.commit('permission/RESET_ROUTERS')
        // 问题：路由缓存退出后无法清除 使用reload缓解
        location.reload()
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 注册
  register({ commit }, request) {
    const { username, password, password_repaet } = request

    return new Promise((resolve, reject) => {
      api.register(request).then(response => {
        const { token } = response.data

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改个人信息
  edit({ commit }, request) {
    return new Promise((resolve, reject) => {
      api.edit(request).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改密码
  edit_password({ commit }, request) {
    const { password_old, password_new, password_new_repaet } = request

    return new Promise((resolve, reject) => {
      api.edit_password(request).then(response => {
        const { token } = response.data

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取个人信息
  information({ commit }, request) {
    return new Promise((resolve, reject) => {
      api.information(request).then(response => {
        const { is_superuser, is_staff, permissions, roles, grade, avatar, username } = response.data
        if (!response.data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLE', roles)
        commit('SET_IS_ADMIN', is_staff)
        commit('SET_IS_SUPERUSER', is_superuser)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 绑定班级
  bind_grade({ commit }, request) {
    return new Promise((resolve, reject) => {
      api.bind_grade(request).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 绑定微信
  bindwechat({ commit }, request) {
    return new Promise((resolve, reject) => {
      api.bindwechat(request).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // 获取用户对应班级
  getClass({ commit }) {
    return new Promise((resolve, reject) => {
      api.getClass().then(res => {
        const { data } = res
        console.log(data)
        commit('SET_CLASSLIST', data)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

