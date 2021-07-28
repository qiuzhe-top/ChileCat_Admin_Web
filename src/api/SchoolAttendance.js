import request from '@/utils/request'


// export const in_zaoqian_excel_url = process.env.VUE_APP_BASE_API + api_url + '/in_zaoqian_excel'

// 获取任务
export function task_get(data) {
  return request({
    url: api_url + '/task/obtain',
    method: 'get',
    params: data
  })
}

// 创建任务
export function task_post(data) {
  return request({
    url: api_url + '/task',
    method: 'post',
    data
  })
}
// 获取任务管理员
export function task_admin_get(data) {
  return request({
    url: api_url + '/task_admin',
    method: 'get',
    data
  })
}
// 添加管理员
export function task_admin_post(data) {
  return request({
    url: api_url + '/task_admin',
    method: 'post',
    data
  })
}

// 删除管理员
export function task_admin_delete(data) {
  return request({
    url: api_url + '/task_admin',
    method: 'delete',
    data
  })
}
// 修改任务状态
export function task_switch_put(data) {
  return request({
    url: api_url + '/task/switch',
    method: 'post',
    data
  })
}

// 清除任务状态
export function task_switch_delete(data) {
  return request({
    url: api_url + '/task_switch',
    method: 'delete',
    data
  })
}
// 获取班表
export function scheduling_get(data) {
  return request({
    url: api_url + '/scheduling',
    method: 'get',
    params: data
  })
}
// 更改班表
export function scheduling_post(data) {
  return request({
    url: api_url + '/scheduling',
    method: 'post',
    data
  })
}
// 查看当天考勤工作情况
export function condition_get(data) {
  return request({
    url: api_url + '/condition',
    method: 'get',
    params: data
  })
}
// 销假
export function undo_record_delete(data) {
  return request({
    url: api_url + '/undo_record',
    method: 'delete',
    data
  })
}
// 销假
export function undo_record_admin(data) {
  return request({
    url: api_url + '/undo_record_admin',
    method: 'delete',
    data
  })
}
// 导出今日记录情况
export function out_data_get(data) {
  return request({
    url: api_url + '/out_data',
    method: 'out_data',
    data
  })
}

// 搜索用户信息
export function searchUser(data) {
  return request({
    url: 'school_information/student_information',
    method: 'get',
    params: data
  })
}

// 搜索考勤记录
export function record(data) {
  return request({
    url: api_url + '/record',
    method: 'get',
    params: data
  })
}


// 查看任务
export function get_switchknowing(data) {
  return request({
    url: '/activity/switchknowing',
    method: 'get',
    data
  })
}

// 导出数据
export function out_data(data) {
  return request({
    url: api_url + '/out_data',
    method: 'get',
    responseType: 'blob',
    params: data
  })
}

// XXXXX
export function XXXX_post(data) {
  return request({
    url: api_url + '/XXXX',
    method: 'XXXX',
    data
  })
}


export default {
  task_get,
  get_switchknowing,
  scheduling_post,
  undo_record_delete,
  undo_record_admin,
  task_switch_delete,
  scheduling_get,
  record,
  searchUser,
  out_data,
}
