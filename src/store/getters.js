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

  askList: state => state.ask.askList,
  historyList: state => state.ask.historyList,

  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}
export default getters
