import request from '@/utils/request'
export default {

  // TpiStart
  /**
   * 考勤 获取用户基本信息
   * @returns {} {"grade":"Grade","name":"Name","tel":"Tel","id":"ID","username":"用户名"}
  */
  student_information(data) {
    return request({
      url: '/api/school_information/student/information',
      method: 'post',
      data
    })
  },
  // TpiEnd
}