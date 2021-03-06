// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueResource from 'vue-resource'
import VueLazy from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'
import $ from 'jquery'

Vue.config.productionTip = false
Vue.filter("currency", currency)

Vue.use(VueResource)
//懒加载
Vue.use(VueLazy, {
    loading: "/static/loading-svg/loading-bars.svg"
})
Vue.use(infiniteScroll)
//iview引入
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
