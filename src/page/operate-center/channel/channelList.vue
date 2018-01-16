<template>
  <div>
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
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope)">编辑</el-button>
          <el-button type="text" size="small" @click="binding(scope)">关联</el-button>
          <!--<el-button type="text" size="small" @click="price(scope)">价格</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  const List = (response) => {
    let tableData = []
    tableData = response.data.content.map(data => {
      return {
        id: data.id,
        numbering: data.sn,
        address: data.address,
        state: data.status,
        contactName: data.contact,
        scheduledDate: window.moment(data.bookDate).format('YYYY-MM-DD HH:mm'),
        checkInDate: window.moment(data.checkIn).format('YYYY-MM-DD HH:mm'),
        dateOfDeparture: window.moment(data.checkOut).format('YYYY-MM-DD HH:mm'),
        channel: data.channel
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
        // 筛选值
        formInline: {
          total: 10,
          pageSize: 10,
          currentPage: 1
        },
        // 渲染表格
        tableTile: [{
          key: '0',
          columnLabel: '渠道编号',
          prop: 'channelNumber',
          width: '80'
        }, {
          key: '1',
          columnLabel: '渠道名称',
          prop: 'channelName',
          width: '180'
        }, {
          key: '2',
          columnLabel: '渠道类型',
          prop: 'channelType',
          width: '80'
        }, {
          key: '3',
          columnLabel: '电话',
          prop: 'phone',
          width: '180'
        }, {
          key: '4',
          columnLabel: '状态',
          prop: 'state',
          width: '100'
        }, {
          key: '5',
          columnLabel: '更新日期',
          prop: 'updated'
        }],
        // 列表数据
        tableData: [],
        loading: true
      }
    },
    methods: {
      // 分页
      toPage (page) {
        this.loading = true
        this.formInline.currentPage = page
        this.$http({
          method: 'get',
          url: window.config.server + '/api/v1/orders',
          params: {
            type: '',
            status: this.formInline.stateOptions,
            keyword: this.formInline.name,
            ownerId: '',
            pageNum: this.formInline.currentPage - 1,
            pageSize: this.formInline.pageSize
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
      // 编辑
      edit (row) {
        const id = row.row.id
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/channel/channelList/channelEdit/' + id)
      },
      // 绑定
      binding (row) {
        const id = row.row.id
        this.$router.push('/' + this.$route.params.lang + '/operateCenter/channel/channelList/channelBinding/' + id)
      }
    },
    created: function () {
      // 获取渠道列表
      const ChannelList = new Promise((resolve, reject) => {
        this.$http({
          method: 'get',
          url: window.config.server + '/api/v1/channels',
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

      ChannelList.then((resolve) => {
        let channelList = []
        channelList = resolve.data.map((data) => {
          let state = '未激活'
          if (data.status === 1) {
            state = '激活'
          }
          let type = ''
          if (data.type === 0) {
            type = '国内渠道'
          }
          return {
            id: data.id,
            channelNumber: data.code,
            channelName: data.name,
            channelType: type,
            phone: data.mobile,
            state: state,
            updated: this.$moment(data.updateTime).format('YYYY-MM-DD HH:mm')
          }
        })
        this.tableData = channelList
        this.loading = false
      }).catch((reject) => {
        window.publicFunction.error(reject)
      })
    }
  }
</script>

<style>

</style>
