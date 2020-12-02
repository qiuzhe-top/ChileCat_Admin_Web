import request from '@/utils/request'

export function getAsk(params) {
  return request({
    url: '/ask/draft',
    method: 'get',
    params
  })
}
export function putAsk(data) {
  return request({
    url: '/ask/audit',
    method: 'put',
    data
  })
}
export function history_ask(data) {
  return request({
    url: '/ask/history',
    method: 'get',
    data
  })
}
