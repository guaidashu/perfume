<template>
    <div>
        <Carousel autoplay>
            <Carousel-item>
                <div class="demo-carousel">
                    <img class="demo-img" src="/static/images/car_1.jpeg"/>
                </div>
            </Carousel-item>
            <Carousel-item>
                <div class="demo-carousel">
                    <img class="demo-img" src="/static/images/car_2.jpeg"/>
                </div>
            </Carousel-item>
            <Carousel-item>
                <div class="demo-carousel">
                    <img class="demo-img" src="/static/images/car_3.jpeg"/>
                </div>
            </Carousel-item>
        </Carousel>
    </div>
</template>

<script>
    export default {
        name: "carouse",
        data() {
            return {}
        },
    }
</script>

<style scoped>
    .demo-img {
        width: 100%;
    }
</style>
