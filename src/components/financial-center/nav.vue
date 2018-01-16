<template>
  <div class="m-nav">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="openNav"
          class="el-menu-vertical-demo"
          :unique-opened="nav.uniqueOpened"
          text-color="#fff">
          <el-submenu
            v-for="item in navData"
            :index="item.index"
            :ref="item.name"
            :key="item.index">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>{{item.text}}</span>
            </template>
            <el-menu-item
              v-for="node in item.node"
              :index="node.index"
              @click="to($event, node.index)"
              :data-to="'/' + $route.params.lang + node.path"
              :key="node.index">{{node.text}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data () {
      return {
        nav: {
          text: '首页',
          name: 'Home',
          active: '1-1',
          uniqueOpened: true
        },
        navData: []
      }
    },
    components: {},
    computed: {
      openNav () {
        return this.nav.active
      }
    },
    methods: {
      to (event, index) {
        // 跳转激活
        const path = event.$attrs['data-to']
        this.$router.push(path)
        this.activeIndex = index

        // 计算面包屑导航
        let crumb = []
        const node1 = {
          text: '财务中心',
          name: 'financialCenter',
          path: '/financialCenter',
          index: '1'
        }
        crumb.push(node1)
        let crumbActive = (nav, path) => {
          nav.forEach((result) => {
            if (path.indexOf(result.path) !== -1) {
              const node2 = {
                text: result.text,
                name: result.name,
                path: result.path,
                index: result.index
              }
              crumb.push(node2)
              if (result.node !== undefined) {
                return crumbActive(result.node, path)
              }
              return false
            }
            return false
          })
        }
        crumbActive(this.navData, this.$route.path)
        this.$emit('navDataTransfer', crumb)
      }
    },
    beforeCreate: () => {},
    created: function () {
      const operateNav = [{
        text: '结算',
        name: 'settlement',
        path: '/financialCenter/settlement',
        index: '3',
        node: [{
          text: '对账单',
          name: 'settlementList',
          path: '/financialCenter/settlement/settlementList',
          index: '3-1',
          node: [{
            text: '账单订单',
            name: 'settlementOrderList',
            path: '/financialCenter/settlement/settlementList/settlementOrderList/' + this.$route.params.settlementId,
            index: '3-1-1',
            node: [{
              text: '账单详情',
              name: 'settlementInfo',
              path: '/financialCenter/settlement/settlementList/settlementOrderList/' + this.$route.params.settlementId + '/settlementInfo/' + this.$route.params.settlementOrderId,
              index: '3-1-1-1'
            }]
          }]
        }, {
          text: '结算配置列表',
          name: 'billingConfigurationList',
          path: '/financialCenter/settlement/billingConfigurationList',
          index: '3-2',
          node: [{
            text: '配置结算',
            name: 'billingConfigurationEdit',
            path: '/financialCenter/settlement/billingConfigurationList/billingConfigurationEdit/' + this.$route.params.billingConfigurationId,
            index: '3-2-1'
          }]
        }]
      }]
      const ownerNav = [{
        text: '统计分析',
        name: 'statistics',
        path: '/financialCenter/statistics',
        index: '2',
        node: [{
          text: '订单统计',
          name: 'orderStatistics',
          path: '/financialCenter/statistics/orderStatistics',
          index: '2-1'
        }, {
          text: '金额统计',
          name: 'amountStatistics',
          path: '/financialCenter/statistics/amountStatistics',
          index: '2-2'
        }, {
          text: '渠道统计',
          name: 'channelStatistics',
          path: '/financialCenter/statistics/channelStatistics',
          index: '2-3'
        }]
      }, {
        text: '结算',
        name: 'settlement',
        path: '/financialCenter/settlement',
        index: '3',
        node: [{
          text: '对账单',
          name: 'settlementList',
          path: '/financialCenter/settlement/settlementList',
          index: '3-1',
          node: [{
            text: '账单订单',
            name: 'settlementOrderList',
            path: '/financialCenter/settlement/settlementList/settlementOrderList/' + this.$route.params.settlementId,
            index: '3-1-1',
            node: [{
              text: '账单详情',
              name: 'settlementInfo',
              path: '/financialCenter/settlement/settlementList/settlementOrderList/' + this.$route.params.settlementId + '/settlementInfo/' + this.$route.params.settlementOrderId,
              index: '3-1-1-1'
            }]
          }]
        }, {
          text: '结算配置列表',
          name: 'billingConfigurationList',
          path: '/financialCenter/settlement/billingConfigurationList',
          index: '3-2',
          node: [{
            text: '配置结算',
            name: 'billingConfigurationEdit',
            path: '/financialCenter/settlement/billingConfigurationList/billingConfigurationEdit/' + this.$route.params.billingConfigurationId,
            index: '3-2-1'
          }]
        }]
      }]

      // 判断用户类型
      if (this.$cookie.get('userType') === '0') {
        this.navData = operateNav
      }
      if (this.$cookie.get('userType') === '1') {
        this.navData = ownerNav
      }

      // 初始化激活
      let active = ''
      const path = this.$route.path
      this.navData.forEach((result) => {
        result.node.forEach((result) => {
          if (path.indexOf(result.path) !== -1) {
            active = result.index
          }
        })
      })
      this.nav.active = active

      // 计算面包屑导航
      let crumb = []
      const node1 = {
        text: '财务中心',
        name: 'financialCenter',
        path: '/financialCenter',
        index: '1'
      }
      crumb.push(node1)
      let crumbActive = (nav, path) => {
        nav.forEach((result) => {
          if (path.indexOf(result.path) !== -1) {
            const node2 = {
              text: result.text,
              name: result.name,
              path: result.path,
              index: result.index
            }
            crumb.push(node2)
            if (result.node !== undefined) {
              return crumbActive(result.node, path)
            }
            return false
          }
          return false
        })
      }
      crumbActive(this.navData, this.$route.path)
      this.$emit('navDataTransfer', crumb)
    },
    watch: {
      $route: function () {
        const operateNav = [{
          text: '结算',
          name: 'settlement',
          path: '/financialCenter/settlement',
          index: '3',
          node: [{
            text: '对账单',
            name: 'settlementList',
            path: '/financialCenter/settlement/settlementList',
            index: '3-1',
            node: [{
              text: '账单订单',
              name: 'settlementOrderList',
              path: '/financialCenter/settlement/settlementList/settlementOrderList/' + this.$route.params.settlementId,
              index: '3-1-1',
              node: [{
                text: '账单详情',
                name: 'settlementInfo',
                path: '/financialCenter/settlement/settlementList/settlementOrderList/' + this.$route.params.settlementId + '/settlementInfo/' + this.$route.params.settlementOrderId,
                index: '3-1-1-1'
              }]
            }]
          }, {
            text: '结算配置列表',
            name: 'billingConfigurationList',
            path: '/financialCenter/settlement/billingConfigurationList',
            index: '3-2',
            node: [{
              text: '配置结算',
              name: 'billingConfigurationEdit',
              path: '/financialCenter/settlement/billingConfigurationList/billingConfigurationEdit/' + this.$route.params.billingConfigurationId,
              index: '3-2-1'
            }]
          }]
        }]
        const ownerNav = [{
          text: '统计分析',
          name: 'statistics',
          path: '/financialCenter/statistics',
          index: '2',
          node: [{
            text: '订单统计',
            name: 'orderStatistics',
            path: '/financialCenter/statistics/orderStatistics',
            index: '2-1'
          }, {
            text: '金额统计',
            name: 'amountStatistics',
            path: '/financialCenter/statistics/amountStatistics',
            index: '2-2'
          }, {
            text: '渠道统计',
            name: 'channelStatistics',
            path: '/financialCenter/statistics/channelStatistics',
            index: '2-3'
          }]
        }, {
          text: '结算',
          name: 'settlement',
          path: '/financialCenter/settlement',
          index: '3',
          node: [{
            text: '对账单',
            name: 'settlementList',
            path: '/financialCenter/settlement/settlementList',
            index: '3-1',
            node: [{
              text: '账单订单',
              name: 'settlementOrderList',
              path: '/financialCenter/settlement/settlementList/settlementOrderList/' + this.$route.params.settlementId,
              index: '3-1-1',
              node: [{
                text: '账单详情',
                name: 'settlementInfo',
                path: '/financialCenter/settlement/settlementList/settlementOrderList/' + this.$route.params.settlementId + '/settlementInfo/' + this.$route.params.settlementOrderId,
                index: '3-1-1-1'
              }]
            }]
          }, {
            text: '结算配置列表',
            name: 'billingConfigurationList',
            path: '/financialCenter/settlement/billingConfigurationList',
            index: '3-2',
            node: [{
              text: '配置结算',
              name: 'billingConfigurationEdit',
              path: '/financialCenter/settlement/billingConfigurationList/billingConfigurationEdit/' + this.$route.params.billingConfigurationId,
              index: '3-2-1'
            }]
          }]
        }]

        // 判断用户类型
        if (this.$cookie.get('userType') === '0') {
          this.navData = operateNav
        }
        if (this.$cookie.get('userType') === '1') {
          this.navData = ownerNav
        }

        // 初始化激活
        let active = ''
        const path = this.$route.path
        this.navData.forEach((result) => {
          result.node.forEach((result) => {
            if (path.indexOf(result.path) !== -1) {
              active = result.index
            }
          })
        })
        this.nav.active = active

        // 计算面包屑导航
        let crumb = []
        const node1 = {
          text: '财务中心',
          name: 'financialCenter',
          path: '/financialCenter',
          index: '1'
        }
        crumb.push(node1)
        let crumbActive = (nav, path) => {
          nav.forEach((result) => {
            if (path.indexOf(result.path) !== -1) {
              const node2 = {
                text: result.text,
                name: result.name,
                path: result.path,
                index: result.index
              }
              crumb.push(node2)
              if (result.node !== undefined) {
                return crumbActive(result.node, path)
              }
              return false
            }
            return false
          })
        }
        crumbActive(this.navData, this.$route.path)
        this.$emit('navDataTransfer', crumb)
      }
    }
  }
</script>

<style scoped>
  .m-nav{
    height: 100%;
    background-color: #404654;
  }

  .el-aside{ overflow:hidden;}
  .m-nav{ background-color:#6b6b6b;}
  .el-submenu__title{ color:#fff;}
  .el-menu-item.is-active{ color:#fff; background:#757575;}
  .el-menu-item{ color:#fff;}


  .el-submenu__title:hover{background-color:#6b6b6b;}
  .el-submenu .el-menu-item:hover{background:#757575;}
  .m-nav-s{ background-color:#f5f5f5;}
</style>

<style>
  .m-nav .el-menu{ border-right:0;}
  .m-nav .el-submenu__title:hover{background-color:#757575;}
</style>
