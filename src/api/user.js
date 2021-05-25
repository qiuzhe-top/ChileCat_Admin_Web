import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/auth',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/information',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/auth',
    method: 'delete'
  })
}

export function getClass() {
  return request({
    url: '/user/class',
    method: 'get'
  })
}
