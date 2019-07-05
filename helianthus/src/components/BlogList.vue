<template>
  <div class="BlogList" v-loading="loading">
    <el-card class="card-content" v-for="dat in blogList" :key="dat.title">
      <div slot="header" class="card-header-text">
        <span style="font-size: 18px; font-weight: bolder">{{ dat.title }}</span>
        <div style="float: right; font-size: 5px"> {{ dat.time }} -- {{ dat.user }} </div>
      </div>
      <div>
        <span style="font-size: 10px">{{ dat.content }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BlogList',
  data() {
    return {
      blogList: null,
      loading: true

    }
  },
  created () {
    this.$http.get("apis/get_info?blog_list=true&aa=60&kk=6")
      .then(response => {
        this.blogList = response.data.data;
        this.loading = false
      }, error => {
        console.log("获取bloglist出错了.");
      });
  }
}
</script>


<style scoped>
.card-content {
  min-width: 250px;
  max-width: 550px;
  margin: auto;
  margin-bottom: 20px;
}

.card-header-text {
  height: 8px;
}

.card-header-text span {
  font-size: 9px;
  color: #909399;
}

</style>
