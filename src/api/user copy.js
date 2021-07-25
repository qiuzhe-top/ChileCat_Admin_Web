import request from '@/utils/request'

// TpiStart

/**
 * 晚查寝-房间工作数据
 * @param   [room_id, 房间ID, Char, 是, , , ]
 * @param  room_id    房间ID    Char    是
 * @returns {} {a:"1"}
*/
export function knowing_student_room_info(data) {
  return request({
    url: '/api/school_attendance/knowing/student/room/info',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/**
 * 21312
 * @param {*} token
 * @returns '{
 * a:1
 * }'
 */

export function getInfo(token) {
  return request({
    url: '/user/information',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getClass() {
  return request({
    url: '/user/class',
    method: 'get'
  })
}
// TpiEnd
