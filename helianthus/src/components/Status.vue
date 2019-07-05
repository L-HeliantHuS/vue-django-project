<template>
  <div id="Status" v-loading="loading">
    <el-card style="min-height: 200px; max-height: 500px; ">
      <div slot="header">
        仪表盘
        <el-button @click="flush_status">
          点我立即刷新
        </el-button>
      </div>

      <div>
        <label for="cpu">
          <el-progress id="cpu" type="dashboard" :percentage="cpu_status" :color="colors"></el-progress>
        </label>
        <span style="position: relative; right: 82px">CPU</span>
        <el-progress type="dashboard" :percentage="memory_status" :color="colors" style="position: relative; left: 20px"></el-progress>
        <span style="position: relative; right: 75px">Memory</span>
        <el-progress type="dashboard" :percentage="disk_status" :color="colors" style="position: relative; left: 20px"></el-progress>
        <span style="position: relative; right: 60px">Disk</span>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Status',
    // 数据
    data() {
      return {
        colors: [
          {color: '#6f7ad3', percentage: 20},
          {color: '#1989fa', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#e6a23c', percentage: 80},
          {color: '#f56c6c', percentage: 100}
        ],
        cpu_status: 0,
        memory_status: 0,
        disk_status: 0,
        loading: true
      }
    },
    // 响应事件
    methods: {
      flush_status: function () {
        this.$axios.get("apis/get_info?status=1")
          .then(response => {
            this.cpu_status = response.data.cpu_status;
            this.memory_status = response.data.memory_status;
            this.disk_status = response.data.disk_status;
          })
      }
    },
    // 初始化
    created () {
      this.$axios.get("apis/get_info?status=1")
        .then(response => {
          this.cpu_status = response.data.cpu_status;
          this.memory_status = response.data.memory_status;
          this.disk_status = response.data.disk_status;
        })
      this.loading = false;
    }
  }
</script>

<style scoped>

</style>
