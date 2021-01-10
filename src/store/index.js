import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import ask from './modules/ask'
import life from './modules/life'
import permission from './modules/permission'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    ask,
    life,
    permission
  },
  getters
})

export default store
