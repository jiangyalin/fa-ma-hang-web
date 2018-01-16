<template>
  <div>
    <!--<div class="m-menu">-->
      <!--<el-button type="primary" icon="el-icon-circle-plus-outline" size="mini">{{ $t("message.add") }}</el-button>-->
    <!--</div>-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <!--<el-form-item :label="$t('message.type')">-->
        <!--<el-select v-model="formInline.typeOptions" :placeholder="$t('message.all')">-->
          <!--<el-option-->
            <!--v-for="item in filter.typeOptions"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item :label="$t('message.addedToTheState')">-->
        <!--<el-select v-model="formInline.shelvesStateOptions" :placeholder="$t('message.all')">-->
          <!--<el-option-->
            <!--v-for="item in filter.shelvesStateOptions"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="审核状态">
        <el-select v-model="formInline.approvalStatusOptions" :placeholder="$t('message.all')" @change="onSubmit">
          <el-option
            v-for="item in filter.approvalStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.city')">
        <el-select v-model="formInline.cityOptions" :placeholder="$t('message.all')" @change="onSubmit">
          <el-option
            v-for="item in filter.cityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="s-fr">
        <el-form-item :label="$t('message.searchFor')">
          <el-input v-model="formInline.name" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      border
      size="mini"
      style="width: 100%"
      tooltip-effect="dark"
      ref="multipleTable">
      <el-table-column
        v-for="item in tableTile"
        :label="item.columnLabel"
        :prop="item.prop"
        :key="item.key"
        :width="item.width"
        show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="170">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="checkProperty(scope)">{{ $t('message.view') }}</el-button>
          <el-button type="text" size="small" @click="editProperty(scope)">{{ $t('message.edit') }}</el-button>
          <!--<el-button type="text" size="small" @click="removeSingle(scope)" v-if="scope.row.approval === '未提交' || scope.row.approval === '打回'">{{ $t('message.delete') }}</el-button>-->
          <!--<el-button type="text" size="small" @click="removeSingle(scope)" v-else disabled>{{ $t('message.delete') }}</el-button>-->
          <!--<el-button type="text" size="small" @click="editPropertyImage(scope)">图片</el-button>-->
          <!--<el-button type="text" size="small" @click="propertyRelated(scope)">关联</el-button>-->
          <!--<el-button type="text" size="small" @click="checkInRules(scope)">规则</el-button>-->
          <!--<el-button type="text" size="small" @click="rateList(scope)">房价</el-button>-->
          <!--<el-button type="text" size="small" @click="attached(scope)">附加</el-button>-->
          <!--<el-button type="text" size="small" @click="propertyPolicy(scope)">政策</el-button>-->
          <!--<el-button type="text" size="small" @click="channelPrice(scope)">价格公式</el-button>-->
          <el-button type="text" size="small" @click="addOrder(scope)" v-if="scope.row.approval === '通过' && scope.row.state === '已上架'">创建订单</el-button>
          <el-button type="text" size="small" @click="submit(scope)" v-if="scope.row.approval === '未提交' || scope.row.approval === '打回'">提交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="m-page"
      small
      layout="prev, pager, next"
      :total="formInline.total"
      :page-size="formInline.pageSize"
      :current-page="formInline.currentPage"
      @current-change="toPage"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  const List = (response) => {
    let tableData = []
    tableData = response.data.content.map(data => {
      let state = '已上架'
      if (data.releaseStatus === 0) {
        state = '未上架'
      }
      let approval = '通过'
      if (data.auditingStatus === 0) {
        approval = '未提交'
      } else if (data.auditingStatus === 1) {
        approval = '待审核'
      } else if (data.auditingStatus === 2) {
        approval = '打回'
      }
      return {
        id: data.id,
        numbering: data.sn,
        name: data.name,
        city: data.countryName + data.cityName,
        address: data.address,
        type: data.roomTypename,
        accumulative: data.orderCount,
        state: state,
        approval: approval
      }
    })
    return {
      tableData: tableData,
      total: response.data.totalElements
    }
  }
  export default {
    data () {
      return {
        // 渲染筛选
        filter: {
          typeOptions: [],
          shelvesStateOptions: [{
            value: '',
            label: '全部'
          }, {
            value: '0',
            label: '未上架'
          }, {
            value: '1',
            label: '已上架'
          }],
          approvalStatusOptions: [{
            value: '',
            label: '全部'
          }, {
            value: '0',
            label: '未提交'
          }, {
            value: '1',
            label: '待审核'
          }, {
            value: '2',
            label: '打回'
          }, {
            value: '3',
            label: '通过'
          }],
          cityOptions: []
        },
        // 筛选值
        formInline: {
          typeOptions: '', // 类型
          shelvesStateOptions: '', // 上架状态
          approvalStatusOptions: '', // 审核状态
          cityOptions: '', // 城市
          name: '',
          total: 0,
          pageSize: 10,
          currentPage: 1
        },
        // 渲染表格
        tableTile: [{
          key: '0',
          columnLabel: '编号',
          prop: 'numbering',
          width: '80'
        }, {
          key: '1',
          columnLabel: '房源名称',
          prop: 'name',
          width: '180'
        }, {
          key: '2',
          columnLabel: '国家、城市',
          prop: 'city',
          width: '180'
        }, {
          key: '3',
          columnLabel: '地址',
          prop: 'address',
          width: '180'
        }, {
          key: '4',
          columnLabel: '类型',
          prop: 'type',
          width: '80'
        }, {
          key: '5',
          columnLabel: '累计订单',
          prop: 'accumulative',
          width: '80'
        }, {
          key: '7',
          columnLabel: '状态',
          prop: 'state',
          width: '80'
        }, {
          key: '8',
          columnLabel: '审核状态',
          prop: 'approval',
          width: ''
        }],
        // 列表数据
        tableData: [],
        loading: true
      }
    },
    methods: {
      // 搜索
      onSubmit () {
        this.loading = true
        this.formInline.currentPage = 1
        this.$http({
          method: 'get',
          url: window.config.server + '/api/v1/rooms',
          params: {
            roomTypeId: this.formInline.typeOptions,
            releaseStatus: this.formInline.shelvesStateOptions,
            auditingStatus: this.formInline.approvalStatusOptions,
            cityId: this.formInline.cityOptions,
            sn: this.formInline.name,
            pageNum: this.formInline.currentPage - 1,
            pageSize: this.formInline.pageSize,
            ownerId: ''
          },
          headers: {
            'languageCode': this.$route.params.lang,
            'Authorization': 'Bearer ' + this.$cookie.get('token')
          }
        }).then((response) => {
          const list = List(response)
          this.tableData = list.tableData
          this.formInline.total = list.total
          this.loading = false
        }).catch((error) => {
          window.publicFunction.error(error)
        })
      },
      // 分页
      toPage (page) {
        this.loading = true
        this.formInline.currentPage = page
        this.$http({
          method: 'get',
          url: window.config.server + '/api/v1/rooms',
          params: {
            roomTypeId: this.formInline.typeOptions,
            releaseStatus: this.formInline.shelvesStateOptions,
            auditingStatus: this.formInline.approvalStatusOptions,
            cityId: this.formInline.cityOptions,
            sn: this.formInline.name,
            pageNum: this.formInline.currentPage - 1,
            pageSize: this.formInline.pageSize,
            ownerId: ''
          },
          headers: {
            'languageCode': this.$route.params.lang,
            'Authorization': 'Bearer ' + this.$cookie.get('token')
          }
        }).then((response) => {
          const list = List(response)
          this.tableData = list.tableData
          this.formInline.total = list.total
          this.loading = false
        }).catch(function (error) {
          window.publicFunction.error(error)
        })
      },
      // 查看房源
      checkProperty (row) {
        const id = row.row.id
        const propertyInfo = {
          name: row.row.name,
          numbering: row.row.numbering
        }
        this.$emit('propertyInfoDataTransfer', propertyInfo)
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/property/propertyList/propertyInfo/' + id)
      },
      // 编辑房源
      editProperty (row) {
        const id = row.row.id
        const propertyInfo = {
          name: row.row.name,
          numbering: row.row.numbering
        }
        this.$emit('propertyInfoDataTransfer', propertyInfo)
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/property/propertyList/propertyEdit/' + id)
      },
      // 编辑房源图片
      editPropertyImage (row) {
        const id = row.row.id
        const propertyInfo = {
          name: row.row.name,
          numbering: row.row.numbering
        }
        this.$emit('propertyInfoDataTransfer', propertyInfo)
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/property/propertyList/propertyImageEdit/' + id)
      },
      // 房源关联
      propertyRelated (row) {
        const id = row.row.id
        const propertyInfo = {
          name: row.row.name,
          numbering: row.row.numbering
        }
        this.$emit('propertyInfoDataTransfer', propertyInfo)
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/property/propertyList/propertyRelated/' + id)
      },
      // 房价列表
      rateList (row) {
        const id = row.row.id
        const propertyInfo = {
          name: row.row.name,
          numbering: row.row.numbering
        }
        this.$emit('propertyInfoDataTransfer', propertyInfo)
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/property/propertyList/rateList/' + id)
      },
      // 房源政策
      propertyPolicy (row) {
        const id = row.row.id
        const propertyInfo = {
          name: row.row.name,
          numbering: row.row.numbering
        }
        this.$emit('propertyInfoDataTransfer', propertyInfo)
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/property/propertyList/propertyPolicy/' + id)
      },
      // 渠道价格
      channelPrice (row) {
        const id = row.row.id
        const propertyInfo = {
          name: row.row.name,
          numbering: row.row.numbering
        }
        this.$emit('propertyInfoDataTransfer', propertyInfo)
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/property/propertyList/channelPrice/' + id)
      },
      // 附加费用
      attached (row) {
        const id = row.row.id
        const propertyInfo = {
          name: row.row.name,
          numbering: row.row.numbering
        }
        this.$emit('propertyInfoDataTransfer', propertyInfo)
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/property/propertyList/additionalFeesList/' + id)
      },
      // 入住规则
      checkInRules (row) {
        const id = row.row.id
        const propertyInfo = {
          name: row.row.name,
          numbering: row.row.numbering
        }
        this.$emit('propertyInfoDataTransfer', propertyInfo)
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/property/propertyList/checkInRules/' + id)
      },
      // 创建订单
      addOrder (row) {
//        const id = row.row.id
//        const propertyInfo = {
//          name: row.row.name,
//          numbering: row.row.numbering
//        }
//        this.$emit('propertyInfoDataTransfer', propertyInfo)
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/order/orderAdd')
      },
      // 提交
      submit (row) {
        const id = row.row.id
        // 提交审核
        const SubmitAudit = new Promise((resolve, reject) => {
          this.$http({
            method: 'post',
            url: window.config.server + '/api/v1/rooms/' + id + '/auditing',
            data: {
              status: '1'
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

        SubmitAudit.then((resolve) => {
          if (resolve.data.code === '200') {
            this.$confirm('提交审核已成功', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'success'
            }).then(() => {
              this.loading = true
              // 获取房源列表
              this.$http({
                method: 'get',
                url: window.config.server + '/api/v1/rooms',
                params: {
                  roomTypeId: this.formInline.typeOptions,
                  releaseStatus: this.formInline.shelvesStateOptions,
                  auditingStatus: this.formInline.approvalStatusOptions,
                  cityId: this.formInline.cityOptions,
                  sn: this.formInline.name,
                  pageNum: this.formInline.currentPage - 1,
                  pageSize: this.formInline.pageSize,
                  ownerId: ''
                },
                headers: {
                  'languageCode': this.$route.params.lang,
                  'Authorization': 'Bearer ' + this.$cookie.get('token')
                }
              }).then((response) => {
                const list = List(response)
                this.tableData = list.tableData
                this.formInline.total = list.total
                this.loading = false
              }).catch(function (error) {
                window.publicFunction.error(error)
              })
            })
          }
        }).catch((reject) => {
          window.publicFunction.error(reject)
        })
      },
      // 删除单项房源
      removeSingle (row) {
        this.$confirm('此操作将删除该房源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: window.config.server + '/api/v1/rooms/' + row.row.id + '/room',
            params: {},
            headers: {
              'languageCode': this.$route.params.lang,
              'Authorization': 'Bearer ' + this.$cookie.get('token')
            }
          }).then((response) => {
            if (response.data.code === '200') {
              this.loading = true
              this.$message({
                type: 'success',
                message: '删除成功!'
              })

              // 获取房源列表
              this.$http({
                method: 'get',
                url: window.config.server + '/api/v1/rooms',
                params: {
                  roomTypeId: this.formInline.typeOptions,
                  releaseStatus: this.formInline.shelvesStateOptions,
                  auditingStatus: this.formInline.approvalStatusOptions,
                  cityId: this.formInline.cityOptions,
                  sn: this.formInline.name,
                  pageNum: this.formInline.currentPage - 1,
                  pageSize: this.formInline.pageSize,
                  ownerId: ''
                },
                headers: {
                  'languageCode': this.$route.params.lang,
                  'Authorization': 'Bearer ' + this.$cookie.get('token')
                }
              }).then((response) => {
                const list = List(response)
                this.tableData = list.tableData
                this.formInline.total = list.total
                this.loading = false
              }).catch(function (error) {
                window.publicFunction.error(error)
              })
            }
          }).catch(function (error) {
            window.publicFunction.error(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    created: function () {
      // 获取类型
      this.$http({
        method: 'get',
        url: window.config.server + '/api/v1/base/roomTypes',
        params: {},
        headers: {
          'languageCode': this.$route.params.lang,
          'Authorization': 'Bearer ' + this.$cookie.get('token')
        }
      }).then((response) => {
        let typeOptions = []
        typeOptions = response.data.map(data => {
          return {
            label: data.name,
            value: data.id
          }
        })
        typeOptions.unshift({
          label: '全部',
          value: ''
        })
        this.filter.typeOptions = typeOptions
      }).catch(function (error) {
        window.publicFunction.error(error)
      })

      // 获取城市
      this.$http({
        method: 'get',
        url: window.config.server + '/api/v1/base/cities',
        params: {},
        headers: {
          'languageCode': this.$route.params.lang,
          'Authorization': 'Bearer ' + this.$cookie.get('token')
        }
      }).then((response) => {
        let cityOptions = []
        cityOptions = response.data.map(data => {
          return {
            label: data.name,
            value: data.id
          }
        })
        cityOptions.unshift({
          label: '全部',
          value: ''
        })
        this.filter.cityOptions = cityOptions
      }).catch(function (error) {
        window.publicFunction.error(error)
      })

      // 获取房源列表
      this.$http({
        method: 'get',
        url: window.config.server + '/api/v1/rooms',
        params: {
          roomTypeId: this.formInline.typeOptions,
          releaseStatus: this.formInline.shelvesStateOptions,
          auditingStatus: this.formInline.approvalStatusOptions,
          cityId: this.formInline.cityOptions,
          sn: this.formInline.name,
          pageNum: this.formInline.currentPage - 1,
          pageSize: this.formInline.pageSize,
          ownerId: ''
        },
        headers: {
          'languageCode': this.$route.params.lang,
          'Authorization': 'Bearer ' + this.$cookie.get('token')
        }
      }).then((response) => {
        const list = List(response)
        this.tableData = list.tableData
        this.formInline.total = list.total
        this.loading = false
      }).catch(function (error) {
        window.publicFunction.error(error)
      })
    }
  }
</script>

<style>

</style>
