import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import ask from './modules/ask'
import school_attendance from './modules/school_attendance'
import school_information from './modules/school_information'
import permission from './modules/permission'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    ask,
    school_information,
    school_attendance,
    permission
  },
  getters
})

export default store
