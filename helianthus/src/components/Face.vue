<template>
  <div id="Face" v-loading="loading">
    <h3>人脸识别: 上传图片即可识别, 由于网络原因，请耐心等待识别完毕.</h3>
    <el-upload
      class="upload-demo"
      action="apis/face"
      accept="image/jpeg,image/gif,image/png"
      :before-upload="checkUpload"
      :show-file-list="true"
      :on-success="successUpload"
      multiple>
      <el-button size="small" type="primary" icon="el-icon-upload">选择图片上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5mb</div>
    </el-upload>

  <div v-show="showdiv">
    识别出了: {{ resultImage.count }}个人脸
    <img :src="'data:text/html; base64,' +  resultImage.imgbase " alt="" style="width: 100%">
  </div>

  </div>
</template>

<script>
  export default {
    name: 'Face',
    data() {
      return {
        upload: false,
        loading: false,
        showdiv: false,
        resultImage: {
            filename: null,
            count: null,
            imgbase: null,
          },
      }
    },
    methods: {
      submitUpload: function() {
        console.log("submit")
        this.upload = false
      },
      checkUpload: function (file) {
        const isIMAGE = file.type === 'image/jpeg'||'image/png';
        const isLt5M = file.size / 5200 / 1024 < 1;

        if (!isIMAGE) {
          this.$message.error('上传文件只能是图片格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 2MB!');
        }
        return isIMAGE && isLt5M;
      },
      successUpload: function (response, file, FileList) {
        this.resultImage =
          {
            filename: response.filename,
            count: response.face_count,
            imgbase: response.resultImg_base,
          }
        this.showdiv = true
      }
    },

  }
</script>

<style scoped>

</style>
