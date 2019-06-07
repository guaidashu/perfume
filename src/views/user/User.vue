<template>
    <div class="layout">
<!--        Layout: iview的布局组件，实现左右布局-->
        <Layout>
            <nav-header></nav-header>
            <nav-bread>
                <span slot="bread">用户信息</span>
            </nav-bread>
            <div style="width: 100%; height: 30px;"></div>
            <Layout :style="{padding: '0 50px'}">
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
<!--                        Sider：iview的组件-->
                        <Sider hide-trigger :style="{background: '#fff'}">
                            <Menu active-name="1" theme="light" width="auto" :open-names="['1']">
                                <MenuGroup title="用户信息">
                                    <router-link :to="{name: 'userInfo'}">
                                        <MenuItem name="1">
<!--                                            图标-->
                                            <Icon type="md-document"/>
                                            查看信息
                                        </MenuItem>
                                    </router-link>
<!--                                    <router-link to="/user/changePassword">-->
<!--                                        <MenuItem name="2">-->
<!--                                            <Icon type="md-chatbubbles"/>-->
<!--                                            修改密码-->
<!--                                        </MenuItem>-->
<!--                                    </router-link>-->
                                </MenuGroup>
                                <MenuGroup title="购物信息">
                                    <router-link to="/user/orderList">
                                        <MenuItem name="3">
<!--                                            图标-->
                                            <Icon type="md-heart"/>
                                            订单列表
                                        </MenuItem>
                                    </router-link>
                                    <router-link to="/cart">
                                        <MenuItem name="4">
<!--                                            图标-->
                                            <Icon type="md-leaf"/>
                                            购物车
                                        </MenuItem>
                                    </router-link>
                                </MenuGroup>
                            </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
<!--                            容器-->
                            <router-view></router-view>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Layout>
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

    export default {
        name: "User",
        components: {
            Modal,
            NavBread,
            NavFooter,
            NavHeader
        },
    }
</script>

<style scoped>
    .layout {
           border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .layout-footer-center {
        text-align: center;
    }
</style>
