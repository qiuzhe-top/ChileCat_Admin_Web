import * as api from '@/api/ask'

const getDefaultState = () => {
  return {
    askList: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_ASKLIST: (state, askList) => {
    state.askList = askList
  }
}

const actions = {
  // 获取请假条进行审核
  getAsk({ commit }, request) {
    console.log('actions 取请假条进行审核', request)
    return new Promise((resolve, reject) => {
      api.getAsk(request).then(response => {
        const { data } = response
        commit('SET_ASKLIST', data.list)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  putAsk({ commit }, data) {
    return new Promise((resolve, reject) => {
      console.log(data.index)
      api.putAsk(data.request).then(response => {
        resolve()
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

