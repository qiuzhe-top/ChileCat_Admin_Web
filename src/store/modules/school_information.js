/*
 * @Author: 邹洋
 * @Date: 2021-08-04 14:50:10
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2021-09-24 14:46:56
 * @Description:
 */

import api from '@/api/school_information'

const getDefaultState = () => {
  return {
    sorting_value: 1

  }
}

const state = getDefaultState()

const mutations = {
  SET_SORTING_VALUE: (state, sorting_value) => {
    state.sorting_value = sorting_value
  }
}
const actions = {
  // TpiStart

  // 考勤 获取用户基本信息
  student_information({ commit }, request) {
    return new Promise((resolve, reject) => {
      api
        .student_information(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  //   加载分院
  college_query({ commit }, request) {
    return new Promise((resolve, reject) => {
      api
        .college_query(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  //   寝室入住 软删除
  stu_in_room_delete({ commit }, request) {
    return new Promise((resolve, reject) => {
      api
        .stu_in_room_delete(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  //   寝室入住 恢复
  stu_in_room_recover({ commit }, request) {
    return new Promise((resolve, reject) => {
      api
        .stu_in_room_recover(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // TpiEnd
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
