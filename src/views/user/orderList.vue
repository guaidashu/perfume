<template>
    <div>
        <Table :data="userInfo.orderList" :columns="orderListColumns">
            <template slot-scope="{row, index}" slot="orderTotal">
                <span style="color:#ed4014;">{{row.orderTotal | currency('￥')}}</span>
            </template>
            <template slot-scope="{row, index}" slot="action">
                <Button type="error" size="small" @click="moneyBack(row)">退款</Button>
            </template>
        </Table>
    </div>
</template>

<script>
    import {getUserInfo} from "../../../api/user";

    export default {
        name: "orderList",
        data() {
            return {
                userInfo: {},
                orderListColumns: [
                    {
                        title: '订单号',
                        key: "orderId"
                    },
                    {
                        title: '创建日期',
                        key: 'createDate'
                    },
                    {
                        title: "总价",
                        slot: "orderTotal"
                    },
                    {
                        title: "操作",
                        slot: "action"
                    }
                ]
            }
        },
        methods: {
            init() {
                this.getUserInfo()
            },
            getUserInfo() {
                getUserInfo().then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        this.userInfo = data.result
                    } else {
                        this.$Message.error(data.msg)
                    }
                })
            },
            //跳转到退款页面
            moneyBack(row) {
                this.$router.push({
                    path: '/moneyBack',
                    query: {
                        orderId: row.orderId
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
