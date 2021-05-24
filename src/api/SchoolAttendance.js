import request from '@/utils/request'

const api_url = '/school_attendance'

// 获取任务
export function task_get(data) {
  return request({
    url: api_url + '/task',
    method: 'get',
    params:data
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
    url: api_url + '/task_switch',
    method: 'put',
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
    params:data
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
    params:data
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
// 导出今日记录情况
export function out_data_get(data) {
  return request({
    url: api_url + '/out_data',
    method: 'out_data',
    data
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

// 查看任务
export function get_switchknowing(data) {
  return request({
    url: '/activity/switchknowing',
    method: 'get',
    data
  })
}

export default {
  task_get,
  get_switchknowing,
  scheduling_post,
  scheduling_get,
}
