import * as api from '@/api/life'
// import { Message } from 'element-ui'

const getDefaultState = () => {
  return {
    idcode: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_IDCODE: (state, idcode) => {
    state.idcode = idcode
    console.log(state.idcode)
  }
}

const actions = {
  // 刷新验证码
  getIdcode({ commit }, request) {
    return new Promise((resolve, reject) => {
      console.log(request)
      api.idcode(request, 'PUT').then(response => {
        const { data } = response
        commit('SET_IDCODE', data)
        resolve(response)
      }).catch(error => {
        commit('SET_IDCODE', '获取失败')
        reject(error)
      })
    })
  },
  // 获取缺勤名单
  recordsearch({ commit }, request) {
    return new Promise((resolve, reject) => {
      console.log(request)
      api.recordsearch(request).then(response => {
        // const { data } = response
        // commit('SET_IDCODE', data)
        resolve(response)
      }).catch(error => {
        commit('SET_IDCODE', '获取失败')
        reject(error)
      })
    })
  },
  // 获取缺勤名单
  studentleak({ commit }, request) {
    return new Promise((resolve, reject) => {
      console.log(request)
      api.studentleak(request).then(response => {
        // const { data } = response
        // commit('SET_IDCODE', data)
        resolve(response)
      }).catch(error => {
        commit('SET_IDCODE', '获取失败')
        reject(error)
      })
    })
  },
  // 获取缺勤名单
  switchknowing({ commit }, request) {
    return new Promise((resolve, reject) => {
      console.log(request)
      api.switchknowing(request).then(response => {
        // const { data } = response
        // commit('SET_IDCODE', data)
        resolve(response)
      }).catch(error => {
        commit('SET_IDCODE', '获取失败')
        reject(error)
      })
    })
  },
  // 获取缺勤名单
  get_switchknowing({ commit }, request) {
    return new Promise((resolve, reject) => {
      console.log(request)
      api.get_switchknowing(request).then(response => {
        // const { data } = response
        // commit('SET_IDCODE', data)
        resolve(response)
      }).catch(error => {
        commit('SET_IDCODE', '获取失败')
        reject(error)
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

