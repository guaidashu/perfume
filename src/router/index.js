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
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('../views/Cart')
        },
        {
            path: '/address',
            name: 'address',
            component: () => import('../views/Address')
        },
        {
            path: '/orderConfirm',
            name: 'orderConfirm',
            component: () => import('../views/OrderConfirm')
        }
    ]
})
