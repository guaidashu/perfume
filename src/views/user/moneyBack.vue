<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="bread">退款申请</span>
        </nav-bread>
        <div class="form_container">
            <Form ref="formCustom" :model="form">
                <FormItem label="寄件人姓名" prop="send_name">
                    <Input type="text" v-model="form.send_name"></Input>
                </FormItem>
                <FormItem label="收件人姓名" prop="receipt_name">
                    <Input type="text" v-model="form.receipt_name"></Input>
                </FormItem>
                <FormItem label="收件人手机号" prop="phone">
                    <Input type="text" v-model="form.phone"></Input>
                </FormItem>
                <FormItem label="收件人地址" prop="address">
                    <Input type="text" v-model="form.address"></Input>
                </FormItem>
            </Form>
            <div class="form_btn_container">
                <Button type="primary" size="large" @click="moneyBack">确认提交</Button>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import './../../assets/css/base.css'
    import './../../assets/css/checkout.css'
    import './../../assets/css/product.css'
    import NavHeader from "../../components/NavHeader";
    import NavFooter from "../../components/NavFooter";
    import NavBread from "../../components/NavBread";
    import Modal from "../../components/Modal";
    import {getOrderInfo} from "../../../api/goods";

    export default {
        name: "moneyBack",
        components: {
            Modal,
            NavBread,
            NavFooter,
            NavHeader
        },
        data() {
            return {
                orderInfo: {},
                form: {
                    address: '',
                    phone: '',
                    receipt_name: '',
                    send_name: ''
                }
            }
        },
        methods: {
            init() {
                this.getOrderInfo()
            },
            getOrderInfo() {
                getOrderInfo({orderId: this.$route.query.orderId}).then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        this.orderInfo = data.result
                    }
                })
            },
            moneyBack() {
                this.$router.push({
                    path: '/moneyBackSuccess',
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
    .form_container {
        width: 500px;
        margin: 50px auto;
    }

    .form_btn_container {
        width: 88px;
        margin: 0 auto;
    }
</style>
