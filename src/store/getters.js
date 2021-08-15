/*
 * @Author: 邹洋
 * @Date: 2021-05-19 23:35:22
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2021-08-15 09:44:59
 * @Description:
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  classList: state => state.user.classList,
  name: state => state.user.name,
  is_admin: state => state.user.is_admin,
  is_superuser: state => state.user.is_superuser,
  // 考勤任务
  task: state => state.school_attendance.task,
  //   学校信息
  sorting_value: state => state.school_information.sorting_value,

  askList: state => state.ask.askList,
  historyList: state => state.ask.historyList,

  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}
export default getters
