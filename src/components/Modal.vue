<template>
    <div>
<!--        v-bind绑定了一个样式，mdshow如果为true就绑定了，一个class名字叫md-show-->
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="closeModal">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
<!--                        插槽-->
                        <slot name="message"></slot>
                    </div>
                    <div class="btn-wrap">
                        <slot name="btnGroup"></slot>
                    </div>
                </div>
            </div>
        </div>

        <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
    </div>
</template>
<style>

</style>
<script>
    export default {
        //定义一个变量
        props: ["mdShow"],
        methods: {
            //关闭模态
            closeModal() {
                this.$emit("close");
            }
        }
    }
</script>
