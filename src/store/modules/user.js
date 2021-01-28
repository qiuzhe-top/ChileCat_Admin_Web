import * as userApi from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import store from '../../store'

// import { reject } from 'core-js/fn/promise'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    classList: ''
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
  }
}

const actions = {
  // user login
  login({ commit, store }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      userApi.login({ username: username.trim(), password: password, type: 'admin' }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        // console.log(store.getters)
        setToken(data.token)
        // console.log(store.getters)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      userApi.getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar, roles } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLE', roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      userApi.logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        store.commit('ask/SET_ASKLIST')
        store.commit('permission/RESET_ROUTERS')
        // 问题：路由缓存退出后无法清除 使用reload缓解
        location.reload()
        resolve()
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
      userApi.getClass().then(res => {
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

