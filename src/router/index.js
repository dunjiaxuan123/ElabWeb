import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Time from '@/components/Time'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Time',
          component: Time
        },
      ]
    },
  ]
})
