<template>
    <div>
        <!-- 商品列表页 -->
        <nav-header></nav-header>
        <nav-bread>
            <span slot="bread">商品</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">排列顺序：</span>
                    <a href="javascript:void(0)" class="default cur">默认</a>
                    <a href="javascript:void(0)" class="price" @click="sortPrice">价格
                        <svg class="icon icon-arrow-short" :class="{'sort-up': sort===1}">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short"></use>
                        </svg>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd><a href="javascript:void(0)" @click="setPriceFilter('all')"
                                   :class="{'cur': priceChecked=='all'}">All</a></dd>
                            <dd v-for="(item, index) in priceFilter" :key="index">
                                <a href="javascript:void(0)" @click="setPriceFilter(index)"
                                   :class="{'cur': priceChecked==index}">{{item.startPrice}}
                                    - {{item.endPrice}}</a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="(item, index) in goodsList" :key="index">
                                    <div class="pic">
                                        <a href="#">
                                            <!--<img v-lazy="getImagePath(item.productImage)" alt="">-->
                                            <img :src="getImagePath(item.productImage)"
                                                 v-lazy="getImagePath(item.productImage)" alt="">
                                        </a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.salePrice}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                            <div v-infinite-scroll="loadMore" class="load-more" infinite-scroll-disabled="busy"
                                 infinite-scroll-distance="30" style="text-align: center;">
                                <!--<span v-text="loadingText"></span>-->
                                <img src="./../../static/loading-svg/loading-bubbles.svg" v-if="loadingImage"/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
        <nav-footer></nav-footer>
        <modal :md-show="mdShow" @close="closeModal">
            <p slot="message">请先登录，否则无法加入到购物车中！</p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
            </div>
        </modal>
        <modal :md-show="mdShowCart" @close="closeModal">
            <p slot="message">
                <svg class="icon-status-ok">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                </svg>
                <span>加入购物车成功</span>
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
                <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
            </div>
        </modal>

    </div>
</template>

<script>
    import './../assets/css/base.css'
    import './../assets/css/checkout.css'
    import './../assets/css/product.css'
    import NavHeader from '../components/NavHeader'
    import NavFooter from './../components/NavFooter'
    import NavBread from './../components/NavBread'
    import {addCart, getGoodsList} from "../../api/goods";
    import Modal from "../components/Modal";

    export default {
        name: "GoodsList",
        components: {
            Modal,
            NavBread,
            NavFooter,
            NavHeader
        },
        data() {
            return {
                goodsList: [],
                priceFilter: [
                    {
                        startPrice: '0',
                        endPrice: '500'
                    },
                    {
                        startPrice: '500',
                        endPrice: '1000'
                    },
                    {
                        startPrice: '1000',
                        endPrice: '2000'
                    }
                ],
                priceChecked: 'all',
                filterBy: false,
                overLayFlag: false,
                sort: 1,
                pageSize: 8,
                loadingImage: true,
                mdShow: false,
                mdShowCart: false,
                busy: true,
                page: 1
            }
        },
        methods: {
            init() {
                this.getGoodsList(false)
            },
            getGoodsList(flag) {
                getGoodsList({
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sort,
                    priceLevel: this.priceChecked
                }).then(res => {

                    if (flag) {
                        this.goodsList = this.goodsList.concat(res.data.result.list)
                        if (res.data.result.count === 0) {
                            this.loadingImage = false
                            this.busy = true
                        } else {
                            this.busy = false
                        }
                    } else {
                        this.goodsList = res.data.result.list
                        this.busy = false
                        this.loadingImage = true
                    }
                })
            },
            showFilterPop() {
                this.filterBy = true
                this.overLayFlag = true
            },
            closePop() {
                this.filterBy = false
                this.overLayFlag = false
            },
            setPriceFilter(index) {
                this.priceChecked = index
                this.page = 1
                this.closePop()
            },
            sortPrice() {
                this.busy = true
                this.page = 1
                this.sort === -1 ? this.sort = 1 : this.sort = -1
            },
            getImagePath(src) {
                return "/static/" + src
            },
            // 加载更多，
            loadMore() {
                this.busy = true

                setTimeout(() => {
                    this.page++
                    this.getGoodsList(true)
                }, 1000)
            },
            // 添加商品到购物车
            addCart(productId) {
                addCart({
                    productId: productId
                }).then(res => {
                    if (res.data.status === 0) {
                        // this.$Message.success('添加成功')
                        this.mdShowCart = true
                    } else {
                        this.mdShow = true
                    }
                })
            },
            closeModal() {
                this.mdShow = false
                this.mdShowCart = false
            }
        },
        watch: {
            'sort': 'init',
            'priceChecked': 'init'
        },
        mounted() {
            this.init()
        }
    }
</script>
