`
<template>
    <div>
        <div class="log_container">
            <div class="log_form">
                <!-- 登录提示 -->
                <div class="log_remind">
                    登录
                </div>
                <!-- 用户名 -->
                <div class="log_user_container">
                    <label id="log_user_label" for="log_user">
                    </label>
                    <input type="text" v-model="form.userName" name="name" id="log_user" placeholder="账号/手机号"/>
                </div>
                <!-- 密码 -->
                <div class="log_password_container">
                    <label id="log_password_label" for="log_password">
                    </label>
                    <input v-model="form.userPwd" type="password" name="password" id="log_password"
                           placeholder="密码/三次输入错误则会有验证码"/>
                </div>
                <!-- 登录按钮 -->
                <div class="log_btn cursor_pointer" @click="login">
                    &nbsp;登录
                </div>
                <!-- 其他方式登录 -->
<!--                <div class="log_other">-->
<!--                    <p style="float:left;">-->
<!--                        第三方登录：-->
<!--                    </p>-->
<!--                    <p style="float:left;">-->
<!--                        <a href="#" class="cursor_pointer log_qq" title="qq登录"></a>-->
<!--                    </p>-->
<!--                    <p style="float:left;">-->
<!--                        <a href="#" class="cursor_pointer log_weixin" title="微信登录"></a>-->
<!--                    </p>-->
<!--                    <p style="float:left;">-->
<!--                        <a href="#" class="cursor_pointer log_weibo" title="新浪微博"></a>-->
<!--                    </p>-->
<!--                </div>-->
                <!-- 底部各种 -->
                <div class="log_bottom">
                    <p>
                        <router-link to="/">返回首页</router-link>
                    </p>
                    <p>
                        <a href="">忘记密码</a>
                    </p>
                    <p class="log_login">
                        <a href="/register">注册账号</a>
                    </p>
                </div>
            </div>
        </div>
        <div class="log_body">
        </div>
    </div>
</template>

<script>
    import '../../../static/css/body.css'
    import '../../../static/css/yy.css'
    import '../../../static/css/login.css'
    import {login} from '../../../api/login'

    export default {
        name: "login",
        data() {
            return {
                form: {
                    userName: '',
                    userPwd: ''
                }
            }
        },
        methods: {
            login() {
                if (!this.form.userName || !this.form.userPwd) {
                    this.$Message.error("请输入用户名和密码")
                    return
                }
                login(this.form).then(res => {
                    let data = res.data
                    if (data.status === 0) {
                        console.log("登录成功")
                        this.$router.push({
                            name: "index"
                        })
                    } else {
                        this.$Message.error("用户名或密码错误")
                    }
                })
            }
        },
        mounted: function () {

        }
    }
</script>
`
