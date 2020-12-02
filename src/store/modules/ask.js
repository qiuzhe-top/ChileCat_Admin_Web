import * as api from '@/api/ask'
import { Message } from 'element-ui'

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
  },
  PUT_ASKLIST: (state, index) => {
    console.log(index)
    state.askList[index] = null
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
        commit('SET_ASKLIST', [])
        reject(error)
      })
    })
  },
  history_ask({ commit }, request) {
    return new Promise((resolve, reject) => {
      api.history_ask(request).then(response => {
        const { data } = response
        console.log(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  putAsk({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.putAsk(data.request).then(response => {
        commit('PUT_ASKLIST', data.index)
        Message({
          message: '审核成功',
          type: 'success',
          duration: 5 * 1000
        })
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

