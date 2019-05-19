import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('../views/Index'),
            meta: {
                title: "主页"
            }
        },
        {
            path: '/search',
            name: 'search',
            meta: {
                title: "商品搜索"
            },
            component: () => import('../views/GoodsList')
        },
        // {
        //     path: '/login',
        //     name: 'login',
        //     meta: {
        //         title: '登录'
        //     },
        //     component: () => import('../views/login/login')
        // },
        {
            path: '/cart',
            name: 'cart',
            meta: {
                title: '购物车'
            },
            component: () => import('../views/Cart')
        },
        {
            path: '/address',
            name: 'address',
            meta: {
                title: '确认地址'
            },
            component: () => import('../views/Address')
        },
        {
            path: '/orderConfirm',
            name: 'orderConfirm',
            meta: {
                title: '订单确认'
            },
            component: () => import('../views/OrderConfirm')
        },
        {
            path: '/register',
            name: 'register',
            meta: {
                title: '注册账号'
            },
            component: () => import('../views/login/Register')
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登录'
            },
            component: () => import("../views/login/login")
        }
    ]
})

// 设置页面标题读取
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next()
});

export default router;
