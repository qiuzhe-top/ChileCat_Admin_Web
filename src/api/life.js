import request from '@/utils/request'

// 验证码
export function idcode(params, method = 'GET') {
  return request({
    url: 'life/idcode',
    method,
    params
  })
}
// 销假
export function studentleak(data) {
  return request({
    url: '/life/studentleak',
    method: 'put',
    data
  })
}
// 完成任务
export function switchknowing(data) {
  return request({
    url: '/life/switchknowing',
    method: 'post',
    data
  })
}
// 重置任务
export function put_switchknowing(data) {
  return request({
    url: '/life/switchknowing',
    method: 'put',
    data
  })
}
// 查看任务
export function get_switchknowing(data) {
  return request({
    url: '/life/switchknowing',
    method: 'get',
    data
  })
}
// 导出Excel
export function exportexcel(data) {
  return request({
    url: '/life/exportexcel',
    method: 'get',
    data
  })
}
// 今日缺勤列表
export function recordsearch(data) {
  return request({
    url: '/life/recordsearch',
    method: 'get',
    data
  })
}

export default {
  idcode
}
