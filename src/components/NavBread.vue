<template>
    <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
                <a href="/">主页</a>
                <slot name="bread"></slot>
                <div style="float: right; margin-top: -3px;">
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
            searchGoods() {
                this.$router.push({
                    path: '/search',
                    query: {
                        title: this.searchTitle
                    }
                })
                this.$router.go(0)
            }
        }
    }
</script>
