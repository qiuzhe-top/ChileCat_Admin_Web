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
  // 获取我管理的考勤活动
  my_active ({ commit }, request) {
    return new Promise((resolve, reject) => {
      api.my_active(request).then(reponse => {
        // const { data } = reponse
        resolve(reponse)
      }).catch(error => {
        reject(error)
      })
    })
  },
  recordsearch({ commit }, request) {
    return new Promise((resolve, reject) => {
      api.recordsearch(request).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  studentleak({ commit }, request) {
    return new Promise((resolve, reject) => {
      api.studentleak(request).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  switchknowing({ commit }, request) {
    return new Promise((resolve, reject) => {
      api.switchknowing(request).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  get_switchknowing({ commit }, request) {
    return new Promise((resolve, reject) => {
      console.log(request)
      api.get_switchknowing(request).then(response => {
        resolve(response)
      }).catch(error => {
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

