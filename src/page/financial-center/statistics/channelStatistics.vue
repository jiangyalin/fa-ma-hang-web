<template>
  <div>
    <el-form
      :inline="true"
      :rules="rules"
      :model="formInline"
      ref="formInline"
      class="demo-form-inline"
      size="mini">
      <el-form-item label="时间段" prop="date">
        <el-date-picker
          v-model="formInline.date"
          size="mini"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          @change="onSubmit('formInline')"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <div class="s-fr">
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formInline')">查询</el-button>
        </el-form-item>
      </div>
    </el-form>
    <ve-pie
      v-loading="loading"
      :data="chartData"
      :settings="chartSettings"></ve-pie>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data () {
      return {
        // 筛选值
        formInline: {
          date: [this.$moment().subtract(7, 'days').format(), this.$moment().format()]
        },
        rules: {
          date: [
            { required: true, message: '请选择时间', trigger: 'blur' }
          ]
        },
        chartData: {
          columns: ['渠道', '金额'],
          rows: []
        },
        chartSettings: {
          dimension: '渠道',
          metrics: '金额'
        },
        loading: true
      }
    },
    components: {},
    methods: {
      // 搜索
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            // 获取报表数据
            const Statistics = new Promise((resolve, reject) => {
              this.$http({
                method: 'get',
                url: window.config.server + '/api/v1/orders/statistics/income',
                params: {
                  ownerId: '1',
                  roomSn: '',
                  from: this.$moment(this.formInline.date[0]).format('YYYY-MM-DD'),
                  to: this.$moment(this.formInline.date[1]).format('YYYY-MM-DD')
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

            Statistics.then((resolve) => {
              let rows = []
              for (let i = 0; i < resolve.data.channel.length; i++) {
                rows.push({
                  '渠道': resolve.data.channel[i].channel,
                  '金额': resolve.data.channel[i].amount
                })
              }
              this.chartData = {
                columns: ['渠道', '金额'],
                rows: rows
              }
              this.chartSettings = {
                dimension: '渠道',
                metrics: '金额'
              }
              this.loading = false
            }).catch((reject) => {
              window.publicFunction.error(reject)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    created: function () {
      // 获取报表数据
      const Statistics = new Promise((resolve, reject) => {
        this.$http({
          method: 'get',
          url: window.config.server + '/api/v1/orders/statistics/income',
          params: {
            ownerId: '1',
            roomSn: '',
            from: this.$moment(this.formInline.date[0]).format('YYYY-MM-DD'),
            to: this.$moment(this.formInline.date[1]).format('YYYY-MM-DD')
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

      Statistics.then((resolve) => {
        let rows = []
        for (let i = 0; i < resolve.data.channel.length; i++) {
          rows.push({
            '渠道': resolve.data.channel[i].channel,
            '金额': resolve.data.channel[i].amount
          })
        }
        this.chartData = {
          columns: ['渠道', '金额'],
          rows: rows
        }
        this.chartSettings = {
          dimension: '渠道',
          metrics: '金额'
        }
        this.loading = false
      }).catch((reject) => {
        window.publicFunction.error(reject)
      })
    }
  }
</script>

<style scoped>

</style>
