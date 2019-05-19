<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="bread">商品详情</span>
        </nav-bread>
        <div style="width: 100%; height: 35px;"></div>
        <div class="main_container">
            <Row :gutter="16">
                <Col span="12">
                    <div class="img_container">
                        <img style="margin-bottom: 15px;" width="100%" :src="getImagePath(goodsInfo.productImage)"
                             alt="">
                        <!--                        <div style="width: 100%;">-->
                        <!--                            <Row :gutter="16">-->
                        <!--                                <Col span="6">-->
                        <!--                                    <img width="100%" :src="getImagePath(goodsInfo.productImage)" alt="">-->
                        <!--                                </Col>-->
                        <!--                            </Row>-->
                        <!--                        </div>-->
                    </div>
                </Col>
                <Col span="12">
                    <div class="content_container">
                        <div class="content_title">
                            <h2>{{goodsInfo.productName}}</h2>
                        </div>
                        <div class="content_price">
                            <span style="font-size: 25px; color: red;">{{goodsInfo.salePrice | currency('￥')}}</span>
                            <p style="float: right; font-size: 25px;">商品类型：{{goodsInfo.productTypeName}}</p>
                        </div>
                        <div class="content_introduce">
                            {{goodsInfo.productDescription}}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    import './../assets/css/base.css'
    import './../assets/css/checkout.css'
    import './../assets/css/product.css'
    import {getGoodsInfo} from "../../api/goods";
    import NavHeader from '../components/NavHeader';
    import NavBread from "../components/NavBread";

    export default {
        name: "Detail",
        components: {
            NavBread,
            NavHeader
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

    .content_container {
        padding: 15px 15px;
        position: relative;
    }

    .content_title {
        margin-bottom: 15px;
    }

    .content_introduce {
        padding: 15px 0;
        font-size: 20px;
    }
</style>
