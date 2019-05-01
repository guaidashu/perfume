import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/GoodsList')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login')
    }
  ]
})
