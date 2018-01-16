<template>
  <div v-loading="loading">
    <div class="m-menu" v-if="propertyInfo.numbering !== ''">
      <el-badge>房源编号: {{propertyInfo.numbering}}</el-badge>
      <el-badge style="margin-left: 10px">房源名称: {{propertyInfo.name}}</el-badge>
    </div>
    <el-upload
      drag
      :headers="headers"
      :action="action"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :file-list="fileList"
      :multiple="true"
      :on-success="handleAvatarSuccess"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
        alt="">
    </el-dialog>
    <div class="u-btn-gp">
      <el-button type="primary" @click="submitForm" size="mini">保存</el-button>
      <el-button @click="cancelForm" size="mini">取消</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        fileList: [],
        images: [],
        headers: {
          'languageCode': this.$route.params.lang,
          'Authorization': 'Bearer ' + this.$cookie.get('token')
        },
        action: window.config.serverFile + '/api/v1/files',
        dialogImageUrl: '',
        dialogVisible: false,
        loading: true
      }
    },
    props: ['propertyInfo'],
    methods: {
      // 取消
      cancelForm () {
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/property/propertyList')
      },
      // 上传成功
      handleAvatarSuccess (res, file, fileList) {
        this.images.push(file.response)
      },
      // 删除文件
      handleRemove (file, fileList) {
        let index = this.images.indexOf(file.response)
        if (index === -1) {
          index = this.images.indexOf(file)
        }
        this.images.splice(index, 1)
      },
      // 上传
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 提交
      submitForm () {
        const data = this.images.map((data, index) => {
          return {
            pictureUrl: data.code,
            sort: (index + 1)
          }
        })
        // 变更图片
        const SetImages = new Promise((resolve, reject) => {
          this.$http({
            method: 'post',
            url: window.config.server + '/api/v1/rooms/' + this.$route.params.propertyId + '/pictures',
            data: {
              pictures: data
            },
            headers: {
              'languageCode': this.$route.params.lang,
              'Authorization': 'Bearer ' + this.$cookie.get('token')
            }
          }).then((response) => {
            resolve(response)
          }).catch((error) => {
            reject(error)
          })
        })

        SetImages.then((resolve) => {
          if (resolve.data.code === '200') {
            this.$confirm('保存图片信息成功', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'success'
            }).then(() => {
              this.$router.push('/' + this.$route.params.lang + '/operateCenter/property/propertyList')
            })
          }
        }).catch((reject) => {
          window.publicFunction.error(reject)
        })
      },
      resetForm () {
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/property/propertyList')
      }
    },
    created: function () {
      // 获取图片列表
      const ImagesList = new Promise((resolve, reject) => {
        this.$http({
          method: 'get',
          url: window.config.server + '/api/v1/rooms/' + this.$route.params.propertyId + '/pictures',
          params: {},
          headers: {
            'languageCode': this.$route.params.lang,
            'Authorization': 'Bearer ' + this.$cookie.get('token')
          }
        }).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })

      ImagesList.then((resolve) => {
        const imgs = resolve.data.data.map((data) => {
          return {
            id: data.id,
            code: data.pictureUrl
          }
        })

        imgs.forEach((data) => {
          // 获取图片信息
          const ImgInfo = new Promise((resolve, reject) => {
            this.$http({
              method: 'get',
              url: window.config.serverFile + '/api/v1/files/' + data.code,
              params: {},
              headers: {
                'languageCode': this.$route.params.lang,
                'Authorization': 'Bearer ' + this.$cookie.get('token')
              }
            }).then((response) => {
              resolve(response)
            }).catch((error) => {
              reject(error)
            })
          })

          ImgInfo.then((resolve) => {
            const Img = {
              id: resolve.data.id,
              url: resolve.data.url,
              code: resolve.data.code
            }
            this.fileList.push(Img)
            this.images.push(Img)
          }).catch((reject) => {
            window.publicFunction.error(reject)
          })
        })
        this.loading = false
      }).catch((reject) => {
        window.publicFunction.error(reject)
      })
    }
  }
</script>

<style scoped>
  .u-btn-gp{
    padding-top: 10px;
  }
</style>

<style>
  .g-main .el-upload-dragger{
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>
