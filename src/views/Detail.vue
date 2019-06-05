<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="bread">商品详情</span>
        </nav-bread>
        <div style="width: 100%; height: 35px;"></div>
        <div class="main_container">
            <Row :gutter="16" style="position: relative;">
                <Col span="12" style="position: relative;">
                    <div class="img_container" id="img_container">
                        <pic-zoom :url="getImagePath(goodsInfo.productImage)" :scroll="true" :scale="2"></pic-zoom>
                    </div>
                    <!--                        <div style="width: 100%;">-->
                    <!--                            <Row :gutter="16">-->
                    <!--                                <Col span="6">-->
                    <!--                                    <img width="100%" :src="getImagePath(goodsInfo.productImage)" alt="">-->
                    <!--                                </Col>-->
                    <!--                            </Row>-->
                    <!--                        </div>-->

                </Col>
                <Col span="12" style="position: relative;">
                    <div class="content_container">
                        <div class="content_title">
                            <h2>{{goodsInfo.productName}}</h2>
                        </div>

                        <div class="content_price">
                            <span style="font-size: 25px; color: crimson;">{{goodsInfo.salePrice | currency('￥')}}</span>
                            <p style="float: right; font-size: 20px;">商品类型：{{goodsInfo.productTypeName}}</p>
                        </div>
                        <div style="width: 100%; height: 30px;"></div>
                        <div class="content_introduce">
                            <div class="content_item_container">
                                <div class="content_item_text">服务支持</div>
                                <div class="content_item">
                                    <div>七日无理由退货</div>
                                </div>
                            </div>
                            <div style="width: 100%; height: 15px;"></div>
                            <div class="content_item_container">
                                <div class="content_item_text">选择版本</div>
                                <div class="content_item">
                                    <div>默认版本</div>
                                </div>
                            </div>
                            <div style="width: 100%; height: 15px;"></div>
                            <div class="content_item_container">
                                <div class="content_item_text">分   期</div>
                                <div class="content_item">
                                    <div>暂不支持分期</div>
                                </div>
                            </div>
                        </div>
                        <div class="content_cart">
                            商品描述：{{goodsInfo.productDescription}}
                        </div>
                        <a class="btn btn--m" href="javascript:;" >加入到购物车</a>
                    </div>
                </Col>
            </Row>
        </div>
        <nav-footer></nav-footer>
    </div>

</template>

<script>
    import './../assets/css/base.css'
    import './../assets/css/checkout.css'
    import './../assets/css/product.css'
    import {getGoodsInfo} from "../../api/goods";
    import NavHeader from '../components/NavHeader'
    import NavBread from "../components/NavBread"
    import NavFooter from "../components/NavFooter"
    import PicZoom from 'vue-piczoom'

    export default {
        name: "Detail",
        components: {
            NavBread,
            NavHeader,
            NavFooter,
            PicZoom
        },
        data() {
            return {
                goodsInfo: {}
            }
        },
        methods: {
            init() {
                this.getGoodsInfo()
            },
            getGoodsInfo() {
                getGoodsInfo({_id: this.$route.query._id}).then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        this.goodsInfo = data.result.list[0]
                    } else {
                        console.log(data.msg)
                    }
                })
            },
            getImagePath(src) {
                return '/static/upload/' + src
            }
        },
        mounted() {
            this.init()
        }
    }
</script>


<style scoped>
    .main_container {
        background-color: #f9f9f9;
        position: relative;
        width: 1000px;
        margin: 0 auto;
    }

    @media (max-width: 1100px) {
        .main_container {
            width: 100%;
        }
    }

    .img_container {
        width: 100%;
        padding: 15px 15px;
        height: 100%;
    }

    /*.img_container {*/
    /*    width: 462px;*/
    /*    padding: 15px 15px;*/
    /*    height: 462px;*/
    /*    position: relative;*/
    /*}*/

    .content_container {
        padding: 15px 15px;
        position: relative;
    }

    .content_title {
        margin-bottom: 15px;
        position: relative;
    }

    .content_introduce {
        padding: 15px 0;
        position: relative;
        font-size: 14px;
    }

    .content_cart {
        width: 100%;
        line-height: 26px;
        min-height: 60px;
    }

    .content_item_container {
        width: 100%;
        color: #666;
        height: 32px;
        font-size: 13px;
    }

    .content_item {
        float: left;
        margin-left: 7px;
        line-height: 32px;
        margin-bottom: 4px;
    }

    .content_item div {
        border: 1px solid #e3393c;
        color: #666666;
        padding: 0 13px;
        line-height: 32px;
    }

    .content_item_text {
        float: left;
        width: 60px;
        text-align: justify;
        line-height: 32px;
    }
</style>
