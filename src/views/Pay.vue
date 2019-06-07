<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="bread">付款</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page" style="background-color: #ffffff;">
            <div class="container">
                <div class="checkout-addr">
                    <div class="page-title-normal">
                        <h2 class="page-title-h2"><span>付 款</span></h2>
                    </div>
                    <!-- process step -->
                    <div class="check-step">
                        <ul>
                            <li><span>确认</span> 地址</li>
                            <li><span>查看</span> 订单</li>
                            <li class="cur"><span>付</span> 款</li>
                            <li><span>订单</span> 确认</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>付 款</span></h2>
            </div>


            <div class="order-create">
                <div class="order-create-pic"><img style="height: 300px; width: 300px;" src="../../resource/img/pay.jpg" alt="">
                </div>
                <div class="order-create-main">
                    <h3>打开手机支付宝<br>扫一扫进行付款</h3>
                    <p>
                        <span>订单总计：<span  style="color:rgb(209, 67, 74)">{{orderInfo.orderTotal | currency('￥')}}</span></span>
                        <br>
                        <Button type="primary" size="large" @click="success"
                                style="background-color: #d1434a; border-color: #d1434a; color: #fff; margin-top: 15px;">
                            确认已付款
                        </Button>
                    </p>
                    <div class="order-create-btn-wrap">
                        <!--                        <div class="btn-l-wrap">-->
                        <!--                            <a class="btn btn&#45;&#45;m">购物车清单</a>-->
                        <!--                        </div>-->
                        <!--                        <div class="btn-r-wrap">-->
                        <!--                            <a class="btn btn&#45;&#45;m">商品清单</a>-->
                        <!--                        </div>-->
                        <!--                    </div>-->
                    </div>
                </div>

            </div>
        </div>
        <nav-footer></nav-footer>
    </div>


</template>

<script>
    import './../assets/css/base.css'
    import './../assets/css/checkout.css'
    import './../assets/css/product.css'
    import NavHeader from "../components/NavHeader";
    import NavFooter from "../components/NavFooter";
    import NavBread from "../components/NavBread";
    import Modal from "../components/Modal";
    import {getOrderInfo} from "../../api/goods";

    export default {
        name: "Pay",
        components: {
            Modal,
            NavBread,
            NavFooter,
            NavHeader
        },
        data() {
            return {
                orderInfo: {}
            }
        },
        methods: {
            init() {
                this.getOrderInfo()
            },
            //获取列表信息显示价格
            getOrderInfo() {
                getOrderInfo({orderId: this.$route.query.orderId}).then(res=>{
                    let data = res.data
                    if (data.status === 0){
                        this.orderInfo = data.result
                    }
                })
            },
            //跳转到付款成功页面
            success() {
                this.$router.push({
                    path: '/orderSuccess',
                    query: {
                        orderId: this.$route.query.orderId
                    }
                })
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>
    .order-create-pic{
        width: 300px;
        height: 300px;
    }
</style>
