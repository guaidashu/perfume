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
                            <dt>选择分类:</dt>
                            <dd><a href="javascript:void(0)" @click="setTypeFilter('all')"
                                   :class="{'cur': typeChecked=='all'}">All</a></dd>
                            <dd v-for="(item, index) in types" :key="index">
                                <a href="javascript:void(0)" @click="setTypeFilter(item._id)"
                                   :class="{'cur': typeChecked==item._id}">{{item.name}}</a>
                            </dd>
                        </dl>

                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd>
                                <Poptip trigger="focus">
                                    <Input v-model="priceGt" placeholder="请输入起始价格" style="width: 120px"/>
                                    <div slot="content">{{ formatNumber }}</div>
                                </Poptip>
                            </dd>
                            <dd>
                                <Poptip trigger="focus">
                                    <Input v-model="priceLte" placeholder="请输入最高价格" style="width: 120px"/>
                                    <div slot="content">{{ formatNumber_2 }}</div>
                                </Poptip>
                            </dd>
                            <dd>
                                <Button type="primary" size="large" @click="init">搜索</Button>
                            </dd>
                            <!--                            <dd><a href="javascript:void(0)" @click="setPriceFilter('all')"-->
                            <!--                                   :class="{'cur': priceChecked=='all'}">All</a></dd>-->
                            <!--                            <dd v-for="(item, index) in priceFilter" :key="index">-->
                            <!--                                <a href="javascript:void(0)" @click="setPriceFilter(index)"-->
                            <!--                                   :class="{'cur': priceChecked==index}">{{item.startPrice}}-->
                            <!--                                    - {{item.endPrice}}</a>-->
                            <!--                            </dd>-->
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
                                        <div class="price">{{item.salePrice | currency('￥')}}</div>
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
    import {addCart, getGoodsList, getTypeData} from "../../api/goods";
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
                types: [],
                priceGt: 0,
                priceLte: 0,
                searchTitle: '',
                typeChecked: 'all',
                page: 1,
            }
        },
        methods: {
            init() {
                this.page = 1
                this.getGoodsList(false)
                this.closePop()
            },
            getGoodsList(flag) {
                let tmp
                tmp = this.$route.query.title
                if (tmp) {
                    this.searchTitle = tmp
                }
                tmp = this.$route.query.category
                if (tmp) {
                    this.typeChecked = tmp
                }
                getGoodsList({
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sort,
                    priceGt: this.priceGt,
                    priceLte: this.priceLte,
                    productType: this.typeChecked,
                    productName: this.searchTitle
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
            setTypeFilter(index) {
                let tmp = this.$route.query.category
                if (tmp) {
                    this.$router.push({
                        path: '/search'
                    })
                }
                this.typeChecked = index
                this.page = 1
                this.closePop()
            },
            sortPrice() {
                this.busy = true
                this.page = 1
                this.sort === -1 ? this.sort = 1 : this.sort = -1
            },
            getImagePath(src) {
                return "/static/upload/" + src
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
            },
            getTypeData() {
                getTypeData({page: this.page}).then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        this.types = data.result
                    }
                })
            }
        },
        computed: {
            formatNumber() {
                if (this.priceGt === 0) return '请输入最低价格';

                function parseNumber(str) {
                    const re = /(?=(?!)(d{3})+$)/g;
                    return str.replace(re, ',');
                }

                return parseNumber(this.priceGt);
            },
            formatNumber_2() {
                if (this.priceLte === 0) return '请输入最高价格';

                function parseNumber(str) {
                    const re = /(?=(?!)(d{3})+$)/g;
                    return str.replace(re, ',');
                }

                return parseNumber(this.priceLte);
            }
        },
        watch: {
            'sort': 'init',
            'typeChecked': 'init',
            'searchTitle': 'init'
        },
        mounted() {
            this.init()
            this.getTypeData()
        }
    }
</script>
