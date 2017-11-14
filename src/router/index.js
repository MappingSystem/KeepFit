import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/views/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', name: 'Dashboard', component: Dashboard }
  ]
})
