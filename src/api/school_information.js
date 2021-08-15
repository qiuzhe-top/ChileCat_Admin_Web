/*
 * @Author: 邹洋
 * @Date: 2021-08-04 14:50:10
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2021-08-15 09:53:27
 * @Description:
 */
import request from '@/utils/request'
export default {
  // TpiStart
/**
 * 考勤 获取用户基本信息
 * @param  [username, 用户名, Char, 是, , , max_length:25]
 * @returns {} {"grade":"Grade","name":"Name","tel":"Tel","id":"ID","username":"用户名"}
*/
  student_information(data) {
    return request({
      url: '/api/school_information/student/information',
      method: 'post',
      data
    })
  },
  college_query(data) {
    return request({
      url: '/api/school_information/college/query',
      method: 'get',
      data
    })
  }
// TpiEnd
}
