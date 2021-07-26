import request from '@/utils/request'
export default {

  // TpiStart
  /**
   * 获取任务
   * @param  [type, 任务类型, Char, 是, , 0晚查寝 1查卫生 2晚自修, max_length:1]
   * @returns {} {"is_open":"是否开启","name":"Name","id":"ID"}
  */
  task_obtain(data) {
    return request({
      url: '/api/school_attendance/task/obtain',
      method: 'post',
      data
    })
  },
  /**
   * 开启/关闭任务
   * @param  [task_id, 任务id, Char, 是, , , max_length:8]
   * @returns {} {"is_open":"是否开启"}
  */
  task_switch(data) {
    return request({
      url: '/api/school_attendance/task/switch',
      method: 'post',
      data
    })
  },
  /**
   * 重置查寝任务状态
   * @param  [task_id, 任务id, Char, 是, , , max_length:8]
   * @returns {} null
  */
  task_rest_knowing(data) {
    return request({
      url: '/api/school_attendance/task/rest/knowing',
      method: 'post',
      data
    })
  },
  /**
   * 重置晚自习任务状态
   * @param  [task_id, 任务id, Char, 是, , , max_length:8]
   * @returns {} null
  */
  task_rest_late(data) {
    return request({
      url: '/api/school_attendance/task/rest/late',
      method: 'post',
      data
    })
  },
  /**
   * 获取班表
   * @param  [task_id, 任务id, Char, 是, , , max_length:8]
   * @returns {} null
  */
  scheduling(data) {
    return request({
      url: '/api/school_attendance/scheduling',
      method: 'post',
      data
    })
  },
  /**
   * 修改查寝班表
   * @param  [task_id, 任务id, Char, 是, , , max_length:8]
   * @param  [roster, 班表, Char, 是, , , max_length:8]
   * @returns {} null
  */
  scheduling_update_knowing(data) {
    return request({
      url: '/api/school_attendance/scheduling/update/knowing',
      method: 'post',
      data
    })
  },
  /**
   * 修改晚自习班表
   * @param  [task_id, 任务id, Char, 是, , , max_length:8]
   * @param  [roster, 班表, Char, 是, , , max_length:8]
   * @returns {} null
  */
  scheduling_update_late(data) {
    return request({
      url: '/api/school_attendance/scheduling/update/late',
      method: 'post',
      data
    })
  },
  /**
   * 考勤学生记录情况
   * @param  [task_id, 任务id, Char, 是, , , max_length:8]
   * @returns {} {"student_approved":"Student approved","student_approved_number":"Student approved number","score":"分值","star_time":"创建日期","rule_str":"原因","id":"ID","worker":"Worker","room_str":"寝室"}
  */
  condition(data) {
    return request({
      url: '/api/school_attendance/condition',
      method: 'post',
      data
    })
  },
  /**
   * 销假(必须为任务管理员)
   * @param  [record_id, 考勤记录ID, Char, 是, , , max_length:8]
   * @param  [task_id, 任务id, Char, 是, , , max_length:8]
   * @returns {} null
  */
  undo_record(data) {
    return request({
      url: '/api/school_attendance/undo/record',
      method: 'post',
      data
    })
  },
  /**
   * 销假(任意任务)
   * @param  [task_id, 任务id, Char, 是, , , max_length:8]
   * @param  [record_id, 考勤记录ID, Char, 是, , , max_length:8]
   * @returns {} null
  */
  undo_record_admin(data) {
    return request({
      url: '/api/school_attendance/undo/record/admin',
      method: 'post',
      data
    })
  },
  /**
   * 导入早签数据
   * @param  [file, Excel文件, File, 是, , , ]
   * @returns {} null
  */
  in_zaoqian_excel(data) {
    return request({
      url: '/api/school_attendance/in/zaoqian/excel',
      method: 'post',
      data
    })
  },
  /**
   * 工作者获取任务
   * @returns {} {"builder_name":"Builder name","is_finish":"是否完成","id":"Id","title":"Title","type":"Type"}
  */
  task_executor(data) {
    return request({
      url: '/api/school_attendance/task/executor',
      method: 'post',
      data
    })
  },
  /**
   * 查寝当天数据导出
   * @param  [task_id, 任务id, Char, 是, , , max_length:8]
   * @returns {} {"created_time":"Created time","room_name":"Room name","student_name":"Student name","reason":"Reason","classname":"Classname","student":"Student"}
  */
  knowing_excel_out(data) {
    return request({
      url: '/api/school_attendance/knowing/excel/out',
      method: 'post',
      data
    })
  },
  /**
   * 导出今日记录情况
   * @param  [username, 用户名, Char, 否, None, , ]
   * @param  [start_date, 开始日期, Date, 否, None, , ]
   * @param  [end_date, 结束日期, Date, 否, None, , ]
   * @returns {} null
  */
  out_data(data) {
    return request({
      url: '/api/school_attendance/out/data',
      method: 'post',
      data
    })
  },
  /**
   * 获取规则
   * @param  [codename, 规则编号, Char, 是, , , ]
   * @returns {} null
  */
  rule(data) {
    return request({
      url: '/api/school_attendance/rule',
      method: 'post',
      data
    })
  },
  /**
   * 考勤提交
   * @param  [task_id, 任务ID, Char, 是, , , ]
   * @param  [type, 提交类型 0=> 考勤提交 1=>执行人确认任务完成, Char, 是, , , ]
   * @param  [data, 任务ID, Char, 是, , , ]
   * @returns {} null
  */
  submit(data) {
    return request({
      url: '/api/school_attendance/submit',
      method: 'post',
      data
    })
  },
  /**
   * 晚查寝-楼工作数据
   * @param  [task_id, 任务id, Char, 是, , , max_length:8]
   * @returns {} null
  */
  knowing_storey_info(data) {
    return request({
      url: '/api/school_attendance/knowing/storey/info',
      method: 'post',
      data
    })
  },
  /**
   * 晚查寝-层工作数据
   * @param  [task_id, 任务ID, Char, 是, , , ]
   * @param  [floor_id, 楼层ID, Char, 是, , , ]
   * @returns {} null
  */
  knowing_room_info(data) {
    return request({
      url: '/api/school_attendance/knowing/room/info',
      method: 'post',
      data
    })
  },
  /**
   * 晚查寝-房间工作数据
   * @param  [task_id, 任务ID, Char, 是, , , ]
   * @param  [room_id, 房间ID, Char, 是, , , ]
   * @returns {} null
  */
  knowing_student_room_info(data) {
    return request({
      url: '/api/school_attendance/knowing/student/room/info',
      method: 'post',
      data
    })
  },
  /**
   * 学生查看公告
   * @returns {} {"room_name":"Room name","student_name":"Student name","reason":"Reason","created_time":"Created time","classname":"Classname","student":"Student"}
  */
  student_disciplinary(data) {
    return request({
      url: '/api/school_attendance/student/disciplinary',
      method: 'post',
      data
    })
  },
  /**
   * 晚自修数据
   * @param  [task_id, 任务ID, Char, 是, , , ]
   * @param  [rule_id, 规则ID, Char, 是, , , ]
   * @param  [class_id, 班级ID, Char, 是, , , ]
   * @param  [type, 0 # 获取任务绑定的班级 1 # 获取班级名单附带学生多次点名情况, Char, 是, , , ]
   * @returns {} null
  */
  late_class(data) {
    return request({
      url: '/api/school_attendance/late/class',
      method: 'post',
      data
    })
  },
  // TpiEnd
}