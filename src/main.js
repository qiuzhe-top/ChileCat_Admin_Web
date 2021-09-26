/*
 * @Author: 邹洋
 * @Date: 2021-05-19 23:35:22
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2021-09-24 19:47:10
 * @Description:
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import api from '@/api/index'
Vue.prototype.$api = api
// import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
