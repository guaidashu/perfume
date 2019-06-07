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
        },
        {
            path: '/detail',
            name: 'detail',
            meta: {
                title: '商品详情'
            },
            component: () => import("../views/Detail")
        },
        {
            path: '/orderSuccess',
            name: 'orderSuccess',
            meta: {
                title: '下单成功'
            },
            component: () => import("../views/Success")
        },
        {
            path: '/user',
            name: 'user',
            meta: {
                title: '用户信息'
            },
            redirect: '/user/userInfo',
            component: () => import("../views/user/User"),
            children: [
                {
                    path: 'userInfo',
                    name: 'userInfo',
                    meta: {
                        title: '查看信息'
                    },
                    component: () => import("../views/user/userInfo")
                },
                {
                    path: 'changePassword',
                    name: 'changePassword',
                    meta: {
                        title: '修改密码'
                    },
                    component: () => import("../views/user/changePassword")
                },
                {
                    path: 'orderList',
                    name: 'orderList',
                    meta: {
                        title: '订单列表'
                    },
                    component: () => import("../views/user/orderList")
                },
            ]
        },
        {
            path: '/moneyBack',
            name: 'moneyBack',
            meta: {
                title: '退款申请'
            },
            component: () => import("../views/user/moneyBack")
        },
        {
            path: '/moneyBackSuccess',
            name: 'moneyBackSuccess',
            meta: {
                title: '退款申请提交成功'
            },
            component: () => import("../views/moneyBackSuccess")
        },
        {
            path: '/pay',
            name: 'pay',
            meta: {
                title: '付款'
            },
            component: () => import("../views/Pay")
        }
    ]
})

// 设置页面标题读取
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next()
});

export default router;
