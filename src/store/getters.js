const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  classList: state => state.user.classList,
  askList: state => state.ask.askList,
  name: state => state.user.name
}
export default getters
