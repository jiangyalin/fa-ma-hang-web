import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'
import VueCookie from 'vue-cookie'
import locales from './i18n'
import VeLine from 'v-charts/lib/line'
import VePie from 'v-charts/lib/pie'
import config from './config'
import publicFunction from './public'
import moment from 'moment'
import fullCalendar from 'vue-fullcalendar'

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './style/app/app.scss'
import App from './App.vue'

Vue.use(VueI18n)
Vue.component('full-calendar', fullCalendar)
Vue.use(VueCookie)
Vue.use(ElementUI)
Object.defineProperty(Vue.prototype, '$moment', { value: moment })

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
window.moment = moment

window.config = config

window.publicFunction = publicFunction

Vue.config.lang = 'zh-cn'

Vue.component(VeLine.name, VeLine)
Vue.component(VePie.name, VePie)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})