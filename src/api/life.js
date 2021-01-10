import request from '@/utils/request'

// 刷新验证码
export function getIdcode(params) {
  return request({
    url: 'life/idcode',
    method: 'GET',
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
export function login2(data) {
  return request({
    url: '/life/auth',
    method: 'post',
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
