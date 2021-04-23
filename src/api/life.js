import request from '@/utils/request'

// 验证码
export function idcode(params, method = 'GET') {
  return request({
    url: 'activity/idcode',
    method,
    params
  })
}
// 销假
export function studentleak(data) {
  return request({
    url: '/activity/studentleak',
    method: 'put',
    data
  })
}
// 任务状态控制
export function switchknowing(data) {
  return request({
    url: '/activity/switchknowing',
    method: 'post',
    data
  })
}
// 重置任务
export function put_switchknowing(data) {
  return request({
    url: '/activity/switchknowing',
    method: 'put',
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
// 导出Excel
export function exportexcel(data) {
  return request({
    url: '/activity/exportexcel',
    method: 'get',
    data
  })
}
// 今日缺勤列表
export function recordsearch(data) {
  return request({
    url: '/attendance/recordsearch',
    method: 'get',
    data
  })
}
// 我的考勤活动
export function my_active(data) {
  return request({
    url: '/activity/myactive',
    method: 'get',
    params: data
  })
}
// 保存班表
export function save_roster(data) {
  return request({
    url: '/activity/saveroster',
    method: 'post',
    data
  })
}

export default {
  idcode
}
