/* eslint-disable no-unused-vars */
import api from '@/api/school_attendance'
import { MessageBox, Message } from 'element-ui'

const getDefaultState = () => {
  return {
    task: null
  }
}

const state = getDefaultState()

const mutations = {
  SET_TASK: (state, task) => {
    state.task = task
  }

}
const actions = {
  // TpiStart
  // 获取任务
  task_obtain({ commit }, request) {
    const { type } = request
    return new Promise((resolve, reject) => {
      api.task_obtain(request)
        .then(response => {
          const { is_open, name, id } = response.data
          commit('SET_TASK', response.data[0])
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 开启/关闭任务
  task_switch({ commit }, request) {
    const { task_id } = request

    return new Promise((resolve, reject) => {
      api.task_switch(request)
        .then(response => {
          const { is_open } = response.data

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 重置查寝任务状态
  task_rest_knowing({ commit }, request) {
    const { task_id } = request

    return new Promise((resolve, reject) => {
      api
        .task_rest_knowing(request)
        .then(response => {
          Message({
            message: '重置成功',
            type: 'success'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 重置晚自习任务状态
  task_rest_late({ commit }, request) {
    const { task_id } = request

    return new Promise((resolve, reject) => {
      api
        .task_rest_late(request)
        .then(response => {
          Message({
            message: '重置成功',
            type: 'success'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 重置卫生检查任务状态
  task_rest_health({ commit }, request) {
    const { task_id } = request

    return new Promise((resolve, reject) => {
      api
        .task_rest_health(request)
        .then(response => {
          Message({
            message: '重置成功',
            type: 'success'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取班表
  scheduling({ commit }, request) {
    const { task_id } = request

    return new Promise((resolve, reject) => {
      api
        .scheduling(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 修改查寝班表
  scheduling_update_knowing({ commit }, request) {
    const { task_id, roster } = request

    return new Promise((resolve, reject) => {
      api
        .scheduling_update_knowing(request)
        .then(response => {
          Message({
            message: '保存成功',
            type: 'success'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 修改晚自习班表
  scheduling_update_late({ commit }, request) {
    const { task_id, roster } = request

    return new Promise((resolve, reject) => {
      api
        .scheduling_update_late(request)
        .then(response => {
          Message({
            message: '保存成功',
            type: 'success'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 考勤学生记录情况
  condition({ commit }, request) {
    const { task_id } = request

    return new Promise((resolve, reject) => {
      api
        .condition(request)
        .then(response => {
          const {
            student_approved,
            student_approved_number,
            score,
            star_time,
            rule_str,
            id,
            worker,
            room_str
          } = response.data

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 销假(必须为任务管理员)
  undo_record({ commit }, request) {
    const { record_id, task_id } = request

    return new Promise((resolve, reject) => {
      api
        .undo_record(request)
        .then(response => {
          Message({
            message: '销假成功',
            type: 'success'
          })

          resolve(response)
        })
        .catch(error => {
          Message({
            type: 'info',
            message: '失败'
          })
          reject(error)
        })
    })
  },
  // 销假(任意任务)
  undo_record_admin({ commit }, request) {
    const { task_id, record_id } = request

    return new Promise((resolve, reject) => {
      api
        .undo_record_admin(request)
        .then(response => {
          Message({
            type: 'success',
            message: '销假成功'
          })
          resolve(response)
        })
        .catch(error => {
          Message({
            type: 'info',
            message: '失败'
          })
          reject(error)
        })
    })
  },
  // 导入早签数据
  in_zaoqian_excel({ commit }, request) {
    const { file } = request

    return new Promise((resolve, reject) => {
      api
        .in_zaoqian_excel(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 工作者获取任务
  task_executor({ commit }, request) {
    return new Promise((resolve, reject) => {
      api
        .task_executor(request)
        .then(response => {
          const { is_finish, id, title, type } = response.data

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 查寝当天数据导出
  knowing_excel_out({ commit }, request) {
    const { task_id, token } = request

    return new Promise((resolve, reject) => {
      api
        .knowing_excel_out(request)
        .then(response => {
          const {
            created_time,
            room_name,
            student_name,
            reason,
            classname,
            student
          } = response.data

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 导出今日记录情况
  out_data({ commit }, request) {
    const { username, start_date, end_date } = request

    return new Promise((resolve, reject) => {
      api
        .out_data(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取规则
  rule({ commit }, request) {
    const { codename } = request

    return new Promise((resolve, reject) => {
      api
        .rule(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 考勤提交
  submit({ commit }, request) {
    const { task_id, type, data } = request

    return new Promise((resolve, reject) => {
      api
        .submit(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 晚查寝-楼工作数据
  knowing_storey_info({ commit }, request) {
    const { task_id } = request

    return new Promise((resolve, reject) => {
      api
        .knowing_storey_info(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 晚查寝-层工作数据
  knowing_room_info({ commit }, request) {
    const { task_id, floor_id } = request

    return new Promise((resolve, reject) => {
      api
        .knowing_room_info(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 学生查看公告
  student_disciplinary({ commit }, request) {
    return new Promise((resolve, reject) => {
      api
        .student_disciplinary(request)
        .then(response => {
          const {
            room_name,
            student_name,
            reason,
            created_time,
            classname,
            student
          } = response.data
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 晚查寝-房间工作数据
  knowing_student_room_info({ commit }, request) {
    const { task_id, room_id } = request
    return new Promise((resolve, reject) => {
      api
        .knowing_student_room_info(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 导入早签数据
  inzaoqian_excel({ commit }, request) {
    const { file } = request
    return new Promise((resolve, reject) => {
      api
        .inzaoqian_excel(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 晚自修数据
  late_class({ commit }, request) {
    const { task_id, rule_id, class_id, type } = request
    return new Promise((resolve, reject) => {
      api
        .late_class(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 晚自习考勤提交
  submit_late({ commit }, request) {
    const { task_id, flg, rule_id, user_list } = request
    return new Promise((resolve, reject) => {
      api
        .submit_late(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 考勤查询
  record_query({ commit }, request) {
    const { username, start_date, end_date } = request
    return new Promise((resolve, reject) => {
      api
        .record_query(request)
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
