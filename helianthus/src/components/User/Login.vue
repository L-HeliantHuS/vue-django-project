<template>
    <div id="Login" v-loading="false" style="margin: 0 auto">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form ref="FormDatas" :model="FormDatas" label-width="80px" :rules="rules">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="FormDatas.username" autocomplete="off" placeholder="键入你的用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="FormDatas.password" autocomplete="off" placeholder="键入你的密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitd('FormDatas')">登录</el-button>
              &nbsp;&nbsp;没有帐号?
              <router-link to="/user/register">点我注册</router-link>
            </el-form-item>
          </el-form>
        </el-col>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        FormDatas: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '这是必填项!', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '这是必填项!', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitd: function (Dataset) {
        this.$refs[Dataset].validate((valid) => {
          if (valid) {
            // 成功
            this.$axios.post("/apis/user/login", {
              username: this.FormDatas.username,
              password: this.FormDatas.password,
            })
              .then(response => {
                if (response.data.status === 0) {
                  this.$router.push({path: "/"});
                  window.location.reload();
                } else {
                  this.$notify({
                    title: '登录失败',
                    message: response.data.message,
                    type: 'error'
                  })
                }

              })
          } else {
            return false;
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
