<template>
    <div>
        <button @click="increment">+</button>
        <button v-on:click="decrement">-</button>
        <p><span>{{num}}</span></p>
    </div>
</template>
<style>
</style>
<script>
    export default{
        props:["num"],
        data(){
            return{
            }
        },
        methods:{
          //  增加
          increment(){
            //  子传父的方法
            this.$emit("incre");
          },
          //  减少
          decrement(){
              //  子传父的方法
            this.$emit("decre");
          }
        }
    }
</script>
