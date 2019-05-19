<template>
    <!--    注册界面-->
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="bread">注册</span>
        </nav-bread>
        <div class="register_container">
            <Form ref="formCustom" :model="form" :rules="formRule">
                <FormItem label="用户名" prop="userName">
                    <Input type="text" v-model="form.userName"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input type="password" v-model="form.password"></Input>
                </FormItem>
                <FormItem label="重复密码" prop="rePassword">
                    <Input type="password" v-model="form.rePassword"></Input>
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input type="text" v-model="form.phone"></Input>
                </FormItem>
            </Form>
            <div style="width:200px; margin:0 auto; margin-top: 50px;">
                <Button type="primary" size="large" @click="register">确认注册</Button>
                <router-link to="/" style="color: #fff;"><Button type="success" size="large">返回首页</Button></router-link>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import './../../assets/css/login.css'
    import './../../assets/css/base.css'
    import './../../assets/css/checkout.css'
    import './../../assets/css/product.css'
    import NavFooter from "../../components/NavFooter";
    import NavHeader from "../../components/NavHeader";
    import Form from "iview/src/components/form/form";
    import {register} from '../../../api/login'
    import NavBread from "../../components/NavBread";


    export default {
        name: "Register",
        data() {
            const validateUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('用户名不能为空'));
                } else {
                    callback()
                }
            };
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else {
                    if (this.rePassword !== '') {
                        this.$refs.formCustom.validateField("rePassword")
                    }
                    callback()
                }
            };
            const validateRePassword = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('密码不能为空'));
                } else {
                    if (value !== this.form.password) {
                        callback(new Error('两次密码不一致，请重新输入'));
                    }
                    callback()
                }
            };
            const validatePhone = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('手机号不能为空'));
                } else {
                    callback()
                }
            };
            return {
                form: {
                    userName: '',
                    password: '',
                    phone: '',
                    rePassword: ''
                },
                formRule: {
                    password: [
                        {required: true, validator: validatePassword, trigger: 'blur'}
                    ],
                    userName: [
                        {required: true, validator: validateUserName, trigger: 'blur'}
                    ],
                    rePassword: [
                        {required: true, validator: validateRePassword, trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, validator: validatePhone, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            register() {
                register(this.form).then(res => {
                    let data = res.data
                    if (data.status === 0){
                        this.$Message.success("注册成功")
                    }else {
                        this.$Message.error(data.msg)
                    }
                })
            }
        },
        components: {NavBread, Form, NavHeader, NavFooter}
    }
</script>

<style scoped>
    .register_container {
        width: 500px;
        margin: 0 auto;
        height: auto;
        background-color: #fff;
        padding: 50px 15px;
    }
    @media (max-width: 500px) {
        .register_container{
            width: 100%;
        }
    }
</style>
