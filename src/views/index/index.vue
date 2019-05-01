<template>
  <div>
    <Button type="primary" size="small" @click="get">get</Button>
    {{msg}}
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        msg: 'index'
      }
    },
    methods: {
      init() {
        console.log('init')
      },
      get() {
        this.$http.get("/", {
          headers: {
            token: 'abc'
          }
        }).then(res => {
          this.msg = res.data
        }, err => {
          this.msg = err
        })
      }
    },
    mounted() {
      this.$http.interceptors.push(function (request, next) {
        console.log("request init")
        next(function (response) {
          console.log("response init")
          return response
        })
      })
    }
  }
</script>

<style scoped>

</style>
