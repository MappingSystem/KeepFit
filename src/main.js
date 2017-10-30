import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import router from './router'
import store from './store'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
