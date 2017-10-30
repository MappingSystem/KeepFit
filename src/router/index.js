import Vue from 'vue'
import Router from 'vue-router'
import Weight from '@/components/Weight'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Weight',
      component: Weight
    }
  ]
})
