<template>
    <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
                <router-link to="/">主页</router-link>
<!--                插槽-->
                <slot name="bread"> </slot>
                <div style="float: right; margin-top: -3px;">
<!--                    根据v-modal的双向绑定（同一个变量子组件和当前组件共用，它的值改变了是2个组件里面的值都会发生改变）searchTitle,输入框输入的内容就是searchTitle的值-->
                    <Input placeholder="输入商品名称" style="width: auto" v-model="searchTitle" @on-enter="searchGoods">
                        <Icon style="cursor: pointer;" type="ios-search" @click="searchGoods" slot="suffix"/>
                    </Input>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavBread",
        data() {
            return {
                searchTitle: ''
            }
        },
        methods: {
            //搜索商品
            searchGoods() {
                //跳转到固定页面（search）
                this.$router.push({
                    path: '/search',
                    //通过query传参把用户输入搜索词条传给search页面，参数名是title
                    query: {
                        title: this.searchTitle
                    }
                })
                //刷新
                this.$router.go(0)
            }
        }
    }
</script>
