import request from '@/utils/request'

export function getAsk(params) {
  return request({
    url: '/ask/draft',
    method: 'get',
    params
  })
}
export function putAsk(params) {
  return request({
    url: '/ask/draft',
    method: 'put',
    params
  })
}
