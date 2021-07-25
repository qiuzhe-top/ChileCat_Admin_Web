/* eslint-disable no-unused-vars */
import api from '@/api/user'

const getDefaultState = () => {
  return {

  }
}

const state = getDefaultState()

const mutations = {

}
const actions = {
  // TpiStart
  // 登录
  login({ commit }, request) {
    const { username, password } = request

    return new Promise((resolve, reject) => {
      api.login(request).then(response => {
        const { token } = response.data

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

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

