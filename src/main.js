import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Trend from 'vuetrend'

Vue.use(Trend)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
