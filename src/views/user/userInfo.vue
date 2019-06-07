<template>
    <div>
        <Form :model="formItem" :label-width="80">
            <FormItem label="昵称">
                <Input v-model="formItem.userName" :disabled="changeInfo" placeholder="输入昵称..."></Input>
            </FormItem>
            <FormItem label="电话号码">
                <Input v-model="formItem.userPhone" :disabled="changeInfo" placeholder="输入手机号..."></Input>
            </FormItem>
            <FormItem label="出生日期">
                <Row>
                    <Col span="11">
<!--                        DatePicker：iview 的 一个组件-->
                        <DatePicker type="date" :disabled="changeInfo" placeholder="选择日期"
                                    v-model="formItem.birthday"></DatePicker>
                    </Col>
                </Row>
            </FormItem>

            <FormItem label="性别">
<!--                RadioGroup：iview的一个组件-->
                <RadioGroup v-model="formItem.sex" :disabled="changeInfo">
                    <Radio label="男">男</Radio>
                    <Radio label="女">女</Radio>
                </RadioGroup>
            </FormItem>

            <FormItem label="个人签名">
                <Input :disabled="changeInfo" v-model="formItem.personal_sign" type="textarea"
                       :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="请输入你的个性签名..."></Input>
            </FormItem>
            <FormItem v-if="changeInfo">
                <Button type="primary" @click="changeInfoStatus(1)">修改信息</Button>
            </FormItem>
            <FormItem v-else>
                <Button type="primary">修改</Button>
                <Button style="margin-left: 8px" @click="changeInfoStatus(0)">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {getUserInfo} from "../../../api/user";

    export default {
        name: "userInfo",
        data() {
            return {
                formItem: {
                    userPhone: null,
                    userName: '',
                    sex: '男',
                    birthday: '',
                    personal_sign: ''
                },
                changeInfo: true
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
                        this.formItem = data.result
                    } else {
                        this.$Message.error(data.msg)
                    }
                })
            },
            changeUserInfo() {
            },
            changeInfoStatus(flag) {
                flag ? this.changeInfo = false : this.changeInfo = true
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>

</style>
