<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="bread">主页</span>
        </nav-bread>
        <carouse></carouse>
        <div style="width: 100%; height: 30px;"></div>
        <div style="padding: 0px 30px;">
            <Row :gutter="16">
                <Col span="6">
                    <div class="category_container" @click="search('5cdfe08d0ed1cd5763aa734b')">
                        <div class="category_image_container"
                             style="background-image: url(/static/images/index/1.jpg)"></div>
                        <div class="category_content_container">
                            男士
                        </div>
                    </div>
                </Col>
                <Col span="6">
                    <div class="category_container" @click="search('5cdfe0910ed1cd5763aa734c')">
                        <div class="category_image_container"
                             style="background-image: url(/static/images/index/2.jpg)"></div>
                        <div class="category_content_container">
                            女士
                        </div>
                    </div>
                </Col>
                <Col span="6">
                    <div class="category_container" @click="search('5cdf8da986ec27563aeda381')">
                        <div class="category_image_container"
                             style="background-image: url(/static/images/index/3.jpg)"></div>
                        <div class="category_content_container">
                            浓香
                        </div>
                    </div>
                </Col>
                <Col span="6">
                    <div class="category_container" @click="search('5cdfe0950ed1cd5763aa734d')">
                        <div class="category_image_container"
                             style="background-image: url(/static/images/index/4.jpg)"></div>
                        <div class="category_content_container">
                            儿童
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import './../assets/css/base.css'
    import './../assets/css/checkout.css'
    import './../assets/css/product.css'
    import NavHeader from "../components/NavHeader"
    import NavBread from "../components/NavBread";
    import NavFooter from "../components/NavFooter";
    import Carouse from "../components/carouse";

    export default {
        components: {Carouse, NavFooter, NavBread, NavHeader},
        name: "Index",
        methods: {
            search(query){
                this.$router.push({
                    path: '/search',
                    query: {
                        category: query
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .category_container {
        height: auto;
        width: 100%;
        background-color: #fff;
        cursor: pointer;
        padding: 15px 15px;
        transition: all linear 0.15s;
        -webkit-transition: all linear 0.15s;
        -moz-transition: all linear 0.15s;
        -o-transition: all linear 0.15s;
        -ms-transition: all linear 0.15s;
    }

    .category_container:hover {
        -webkit-box-shadow: 0 3px 20px rgba(0, 0, 0, .1);
        box-shadow: 0 3px 20px rgba(0, 0, 0, .1);
        -webkit-transform: translate3d(0, -2px, 0);
        transform: translate3d(0, -2px, 0)
    }

    .category_image_container {
        width: 100%;
        height: 200px;
        margin-bottom: 30px;
        background-size: 100px 100%;
        background-position: center center;
        background-repeat: no-repeat;
    }

    .category_content_container {
        width: 100%;
        height: 40%;
        text-align: center;
        font-size: 25px;
        color: #333;
    }
</style>
