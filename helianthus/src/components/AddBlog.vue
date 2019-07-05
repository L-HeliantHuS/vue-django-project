<template>
  <div class="AddBlog" v-show="isLogin" v-loading="loading">

    <div style="height: 480px; width: 100%; background: white" v-show="loading" fade>
    </div>

    <el-form v-if="!issubmitd" :rules="rules" ref="blog" :model="blog" v-show="!loading" fade>

      <el-form-item label="Blog标题" prop="title" required>
        <el-input type="text" v-model="blog.title" placeholder="博客标题" clearable></el-input>
      </el-form-item>


      <el-form-item label="Blog内容" prop="content" required>
        <el-input type="textarea" v-model="blog.content" placeholder="博客内容"
                  :autosize="{ minRows: 8, maxRows: 20 }"></el-input>
      </el-form-item>

      <div class="form-group">
        <!--        row分栏-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型" prop="cateory" required>
              <el-select v-model="blog.cateory" placeholder="请选择">
                <el-option v-for="cateory in cateorys" v-cloak :key="cateory" :value="cateory"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="作者" prop="author" required>
              <el-select v-model="blog.author" placeholder="请选择">
                <el-option :value="users"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
      </div>

      <div class="form-group">
        <el-popover
          placement="top"
          width="160"
          v-model="visible">
          <p>确定提交么?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="submitform('blog')">确定</el-button>
          </div>
          <el-button slot="reference" type="primary">提交</el-button>
        </el-popover>
        <el-button type="primary" v-on:click="resetform" plain>重置</el-button>
      </div>
    </el-form>

    <div v-else>
      <el-alert
        title="大成功～"
        type="success"
        show-icon>
      </el-alert>
      <h1>大成功～</h1>
      <h3>感谢你从本站付出的时间</h3>
      <router-link to="/bloglist"><i class="el-icon-s-promotion"></i>返回</router-link>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'AddBlog',
    data () {
      return {
        // blog需要提交的数据
        blog: {
          title: null,
          content: null,
          cateory: null,
          author: null
        },
        // 初始化分类列表数据
        cateorys: null,
        // 初始化用户数据
        users: '',
        // 表单是否被提交
        issubmitd: false,
        visible: false,
        loading: true,
        // 是否登录
        isLogin: false,
        rules: {
          title: [{required: true, message: '这是必填的!', trigger: 'blur'}],
          content: [{required: true, message: '这是必填的!', trigger: 'blur'}],
          cateory: [{required: true, message: '这是必填的!', trigger: 'blur'}],
          author: [{required: true, message: '这是必填的!', trigger: 'blur'}]
        }
      }
    },
    methods: {
      // 验证表单
      submitform: function (submitForm) {
        this.$refs[submitForm].validate((valid) => {
          if (valid) {
            this.issubmitd = true
            this.$http.post('apis/add?add_data=1bs2ppJu2I9dl1&aa=33&kk=33', this.blog)
              .then(response => {
                console.log(response)
              }, error => {
                console.log(error)
              })
            this.$notify({
              title: '大成功～',
              message: '已提交, 感谢你从本站付出的时间',
              type: 'success'
            })
          }
        })

      },
      resetform: function () {
        this.blog = {
          title: null,
          content: null,
          cateory: null,
          author: null
        }
      }
    },
    created () {
      // 检测是否登录
      this.$axios.get('apis/user/getstatus?aa=60&kk=6')
        .then(response => {
          if (response.data.status !== 0) {
            this.$router.push({path: '/user/login'})
          } else {
            this.isLogin = true
            this.users = response.data.username
            // 获取分类列表数据
            this.$axios.get('apis/get_info?cateory=1ds2ppJu2I9dl1&aa=32&kk=34')
              .then(response => {
                this.cateorys = response.data.data
                this.loading = false
              }, error => {
                console.log(error)
              })
            // 获取users
            // this.$axios.get('apis/get_info?users=2ds2ppJu2I9dl1&aa=32&kk=34')
            //   .then(response => {
            //     this.users = response.data.data
            //     this.loading = false
            //   }, error => {
            //     console.log(error)
            //   })
          }
        })
    }
  }
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }
</style>
