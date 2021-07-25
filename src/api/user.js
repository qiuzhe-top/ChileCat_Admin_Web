import request from '@/utils/request'
// TpiStart
/**
 * 登录
 * @param  [username, 用户名, Char, 是, , , max_length:25]
 * @param  [password, 密码, Char, 是, , , ]
 * @returns {} {"token":"Token"}
*/
export function login(data) {
  return request({
    url: ' /api/user/login',
    method: 'post',
    data
  })
}
/**
 * 退出登录
 * @returns {} null
*/
export function logout(data) {
  return request({
    url: ' /api/user/logout',
    method: 'post',
    data
  })
}
/**
 * 注册
 * @param  [username, 用户名, Char, 是, , , max_length:25]
 * @param  [password, 密码, Char, 是, , , ]
 * @param  [password_repaet, 重复密码, Char, 是, , , ]
 * @returns {} {"token":"Token"}
*/
export function register(data) {
  return request({
    url: ' /api/user/register',
    method: 'post',
    data
  })
}
/**
 * 修改个人信息
 * @returns {} null
*/
export function edit(data) {
  return request({
    url: ' /api/user/edit',
    method: 'post',
    data
  })
}
/**
 * 修改密码
 * @param  [password_old, 旧密码, Char, 是, , , max_length:30]
 * @param  [password_new, 新密码, Char, 是, , , max_length:30]
 * @param  [password_new_repaet, 重复新密码, Char, 是, , , max_length:30]
 * @returns {} {"token":"Token"}
*/
export function edit_password(data) {
  return request({
    url: ' /api/user/edit/password',
    method: 'post',
    data
  })
}
/**
 * 获取个人信息
 * @returns {} {"is_superuser":"超级用户状态","is_staff":"工作人员状态","permissions":"Permissions","roles":"Roles","grade":"Grade","avatar":"Avatar","username":"用户名"}
*/
export function information(data) {
  return request({
    url: ' /api/user/information',
    method: 'post',
    data
  })
}
/**
 * 绑定班级
 * @returns {} null
*/
export function bind_grade(data) {
  return request({
    url: ' /api/user/bind/grade',
    method: 'post',
    data
  })
}
/**
 * 绑定微信
 * @returns {} null
*/
export function bindwechat(data) {
  return request({
    url: ' /api/user/bindwechat',
    method: 'post',
    data
  })
}
// TpiEnd