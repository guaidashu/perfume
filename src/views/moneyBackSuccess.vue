<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="bread">退款申请提交成功</span>
        </nav-bread>
<!--        <div class="accessory-result-page accessory-page" style="background-color: #ffffff;">-->
<!--            <div class="container">-->
<!--                <div class="checkout-addr">-->
<!--                    <div class="page-title-normal">-->
<!--                        <h2 class="page-title-h2"><span>订单 确认</span></h2>-->
<!--                    </div>-->
<!--                    &lt;!&ndash; process step &ndash;&gt;-->
<!--                    <div class="check-step">-->
<!--                        <ul>-->
<!--                            <li><span>确认</span> 地址</li>-->
<!--                            <li><span>查看</span> 订单</li>-->
<!--                            &lt;!&ndash;                            <li><span>付</span> 款</li>&ndash;&gt;-->
<!--                            <li class="cur"><span>订单</span> 确认</li>-->
<!--                        </ul>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <div class="container">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>申请提交完成</span></h2>
            </div>


            <div class="order-create">
                <div class="order-create-pic"><img src="/static/images/back.png" alt=""></div>
                <div class="order-create-main">
                    <h3>申请提交成功！<br>您的退款申请正在处理中！</h3>
                    <p>
                        <span>订单编号：{{orderInfo.orderId}}</span>
                        <span>订单总计：{{orderInfo.orderTotal | currency('￥')}}</span>
                    </p>
<!--                    <div class="order-create-btn-wrap">-->
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
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import './../assets/css/checkout.css'
    import './../assets/css/base.css'
    import './../assets/css/product.css'
    import './../assets/css/login.css'
    import NavFooter from "../components/NavFooter";
    import NavBread from "../components/NavBread";
    import NavHeader from "../components/NavHeader";
    import {getOrderInfo} from "../../api/goods";
    export default {
        name: "Success",
        components: {NavBread, NavFooter, NavHeader},
        data() {
            return {
                orderInfo: {}
            }
        },
        methods: {
            init() {
                this.getOrderInfo()
            },
            getOrderInfo() {
                getOrderInfo({orderId: this.$route.query.orderId}).then(res=>{
                    let data = res.data
                    if (data.status === 0){
                        this.orderInfo = data.result
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

</style>
