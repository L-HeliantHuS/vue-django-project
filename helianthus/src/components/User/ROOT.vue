<template>
  <div id="ROOT">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24">
        <img src="/apis/static/image/default_user_head.jpg" alt="" height="130px" width="130px" align="right">
      </el-col>
      <el-col>
        <p style="margin: 20px; font-size: 30px">{{ username }}</p>
        <p style="margin: 20px; font-size: 30px; border-bottom: 20px">{{ email }}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'ROOT',
    data() {
      return {
        username: "",
        email: "",


      }
    },
    created () {
      this.$axios.get('/apis/user/getstatus?aa=60&kk=6')
        .then(response => {
          if (response.data.status === 1) {
            this.$router.push({path: "/user/login"})
          } else {
            // 验证登录后执行下面的内容！！
            this.username = response.data.username
            this.email = response.data.email








          }
        })
    }
  }
</script>

<style scoped>

</style>
