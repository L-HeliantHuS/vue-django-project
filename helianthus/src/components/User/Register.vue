<template>
  <div id="Register">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <el-form :model="FormData" status-icon ref="FormData" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="FormData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="FormData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="repassword">
          <el-input type="password" v-model="FormData.repassword" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="FormData.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitd('FormData')">提交</el-button>
          <el-button @click="resetForm('FormData')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      // 检测第二次输入的密码
      var checkPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.FormData.password) {
          callback(new Error('两次输入的密码不一致.'))
        } else {
          callback()
        }
      }
      // 检测用户名是否已经被注册
      var dulaUsername = (rule, value, callback) => {
        // 验证用户名是否存在.  一会再写
        if (value.length < 3) {
          callback(new Error('你的用户名太短了！'))
        } else if (value.length > 18) {
          callback(new Error('你的用户名太长了！'))
        } else {
          this.$axios.post('/apis/user/register?select=1', {
            select_username: value
          })
            .then(response => {
              if (response.data.is_indb === 1) {
                callback(new Error('该用户名已经被注册'))
              } else {
                callback();
              }
            })
        }
      }

      // 检测密码的长度
      var checkLen = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码长度不能小于6位'))
        } else if (value.length > 18) {
          callback(new Error('密码长度不能超过18位'))
        } else {
          callback()
        }
      }

      return {
        FormData: {
          username: "",
          password: "",
          repassword: "",
          email: ""
        },
        rules: {
          username: [{required: true, message: '这是必填项', trigger: 'blur'}, {validator: dulaUsername, trigger: 'blur'}],
          password: [{required: true, message: "这是必填项", trigger: 'blur'}, {validator: checkLen, trigger: 'blur'}],
          repassword: [{required: true, message: '这是必填项', trigger: 'blur'}, {validator: checkPassword, trigger: 'blur'}],
          email: [{required: true, message: "请输入邮箱地址", trigger: 'blur'}, {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}]
        }
      }
    },
    methods: {
      submitd: function (formdata) {
        this.$refs[formdata].validate((valid) => {
          if (valid) {
            // 成功.
            this.$axios.post('/apis/user/register', {
              username: this.FormData.username,
              password: this.FormData.password,
              email: this.FormData.email
            })
              .then(response => {
                if (response.data.status === 0) {
                  this.$router.push({path: '/'})
                  window.location.reload()
                } else {
                  return false
                }
              })

          } else {
            return false;
          }
        });
      },
      resetForm: function (formdata) {
        this.$refs[formdata].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
