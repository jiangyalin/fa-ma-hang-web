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
          text: '运营中心',
          name: 'app',
          path: '/operateCenter',
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
        text: '房源',
        name: 'property',
        path: '/operateCenter/property',
        index: '2',
        node: [{
          text: '房源审核',
          name: 'propertyAudit',
          path: '/operateCenter/property/propertyAudit',
          index: '2-3',
          node: [{
            text: '房源详情',
            name: 'orderInfo',
            path: '/operateCenter/property/propertyAudit/propertyInfo/' + this.$route.params.propertyId,
            index: '2-3-1'
          }]
        }]
      }, {
        text: '渠道',
        name: 'channel',
        path: '/operateCenter/channel',
        index: '5',
        node: [{
          text: '渠道列表',
          name: 'channelList',
          path: '/operateCenter/channel/channelList',
          index: '5-1',
          node: [{
            text: '渠道绑定',
            name: 'channelBinding',
            path: '/operateCenter/channel/channelList/channelBinding/' + this.$route.params.channelId,
            index: '5-1-1'
          }, {
            text: '编辑渠道',
            name: 'channelEdit',
            path: '/operateCenter/channel/channelList/channelEdit/' + this.$route.params.channelId,
            index: '5-1-2'
          }]
        }, {
          text: '添加渠道',
          name: 'channelAdd',
          path: '/operateCenter/channel/channelAdd',
          index: '5-2'
        }]
      }, {
        text: '订单',
        name: 'order',
        path: '/operateCenter/order',
        index: '6',
        node: [{
          text: '订单列表',
          name: 'orderList',
          path: '/operateCenter/order/orderList',
          index: '6-1',
          node: [{
            text: '订单详情',
            name: 'orderInfo',
            path: '/operateCenter/order/orderList/orderInfo/' + this.$route.params.orderId,
            index: '6-1-1'
          }]
        }]
      }]
      const ownerNav = [{
        text: '房源',
        name: 'property',
        path: '/operateCenter/property',
        index: '2',
        node: [{
          text: '房源列表',
          name: 'propertyList',
          path: '/operateCenter/property/propertyList',
          index: '2-1',
          node: [{
            text: '房源详情',
            name: 'orderInfo',
            path: '/operateCenter/property/propertyList/propertyInfo/' + this.$route.params.propertyId,
            index: '2-1-1'
          }, {
            text: '房源编辑',
            name: 'propertyEdit',
            path: '/operateCenter/property/propertyList/propertyEdit/' + this.$route.params.propertyId,
            index: '2-1-2'
          }, {
            text: '房源图片编辑',
            name: 'propertyImageEdit',
            path: '/operateCenter/property/propertyList/propertyImageEdit/' + this.$route.params.propertyId,
            index: '2-1-3'
          }, {
            text: '房价房态',
            name: 'rateList',
            path: '/operateCenter/property/propertyList/rateList/' + this.$route.params.propertyId,
            index: '2-1-4',
            node: [{
              text: '房价维护',
              name: 'rateEdit',
              path: '/operateCenter/property/propertyList/rateList/' + this.$route.params.propertyId + '/rateEdit',
              index: '2-1-4-1'
            }]
          }, {
            text: '房源政策',
            name: 'propertyPolicy',
            path: '/operateCenter/property/propertyList/propertyPolicy/' + this.$route.params.propertyId,
            index: '2-1-5'
          }, {
            text: '房源关联',
            name: 'propertyRelated',
            path: '/operateCenter/property/propertyList/propertyRelated/' + this.$route.params.propertyId,
            index: '2-1-6'
          }, {
            text: '渠道价格',
            name: 'channelPrice',
            path: '/operateCenter/property/propertyList/channelPrice/' + this.$route.params.propertyId,
            index: '2-1-7',
            node: [{
              text: '渠道价格编辑',
              name: 'channelPriceEdit',
              path: '/operateCenter/property/propertyList/channelPrice/' + this.$route.params.propertyId + '/channelPriceEdit/' + this.$route.params.channelId,
              index: '2-1-7-1'
            }]
          }, {
            text: '入住规则',
            name: 'checkInRules',
            path: '/operateCenter/property/propertyList/checkInRules/' + this.$route.params.propertyId,
            index: '2-1-8'
          }, {
            text: '附加费用',
            name: 'additionalFeesList',
            path: '/operateCenter/property/propertyList/additionalFeesList/' + this.$route.params.propertyId,
            index: '2-1-9'
          }]
        }, {
          text: '添加房源',
          name: 'propertyAdd',
          path: '/operateCenter/property/propertyAdd',
          index: '2-2'
        }]
      }, {
        text: '订单',
        name: 'order',
        path: '/operateCenter/order',
        index: '6',
        node: [{
          text: '订单列表',
          name: 'orderList',
          path: '/operateCenter/order/orderList',
          index: '6-1',
          node: [{
            text: '订单详情',
            name: 'orderInfo',
            path: '/operateCenter/order/orderList/orderInfo/' + this.$route.params.orderId,
            index: '6-1-1'
          }]
        }, {
          text: '添加订单',
          name: 'orderAdd',
          path: '/operateCenter/order/orderAdd',
          index: '6-2'
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
        text: '运营中心',
        name: 'app',
        path: '/operateCenter',
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
          text: '房源',
          name: 'property',
          path: '/operateCenter/property',
          index: '2',
          node: [{
            text: '房源审核',
            name: 'propertyAudit',
            path: '/operateCenter/property/propertyAudit',
            index: '2-3',
            node: [{
              text: '房源详情',
              name: 'orderInfo',
              path: '/operateCenter/property/propertyAudit/propertyInfo/' + this.$route.params.propertyId,
              index: '2-3-1'
            }]
          }]
        }, {
          text: '渠道',
          name: 'channel',
          path: '/operateCenter/channel',
          index: '5',
          node: [{
            text: '渠道列表',
            name: 'channelList',
            path: '/operateCenter/channel/channelList',
            index: '5-1',
            node: [{
              text: '渠道绑定',
              name: 'channelBinding',
              path: '/operateCenter/channel/channelList/channelBinding/' + this.$route.params.channelId,
              index: '5-1-1'
            }, {
              text: '编辑渠道',
              name: 'channelEdit',
              path: '/operateCenter/channel/channelList/channelEdit/' + this.$route.params.channelId,
              index: '5-1-2'
            }]
          }, {
            text: '添加渠道',
            name: 'channelAdd',
            path: '/operateCenter/channel/channelAdd',
            index: '5-2'
          }]
        }, {
          text: '订单',
          name: 'order',
          path: '/operateCenter/order',
          index: '6',
          node: [{
            text: '订单列表',
            name: 'orderList',
            path: '/operateCenter/order/orderList',
            index: '6-1',
            node: [{
              text: '订单详情',
              name: 'orderInfo',
              path: '/operateCenter/order/orderList/orderInfo/' + this.$route.params.orderId,
              index: '6-1-1'
            }]
          }]
        }]
        const ownerNav = [{
          text: '房源',
          name: 'property',
          path: '/operateCenter/property',
          index: '2',
          node: [{
            text: '房源列表',
            name: 'propertyList',
            path: '/operateCenter/property/propertyList',
            index: '2-1',
            node: [{
              text: '房源详情',
              name: 'orderInfo',
              path: '/operateCenter/property/propertyList/propertyInfo/' + this.$route.params.propertyId,
              index: '2-1-1'
            }, {
              text: '房源编辑',
              name: 'propertyEdit',
              path: '/operateCenter/property/propertyList/propertyEdit/' + this.$route.params.propertyId,
              index: '2-1-2'
            }, {
              text: '房源图片编辑',
              name: 'propertyImageEdit',
              path: '/operateCenter/property/propertyList/propertyImageEdit/' + this.$route.params.propertyId,
              index: '2-1-3'
            }, {
              text: '房价房态',
              name: 'rateList',
              path: '/operateCenter/property/propertyList/rateList/' + this.$route.params.propertyId,
              index: '2-1-4',
              node: [{
                text: '房价维护',
                name: 'rateEdit',
                path: '/operateCenter/property/propertyList/rateList/' + this.$route.params.propertyId + '/rateEdit',
                index: '2-1-4-1'
              }]
            }, {
              text: '房源政策',
              name: 'propertyPolicy',
              path: '/operateCenter/property/propertyList/propertyPolicy/' + this.$route.params.propertyId,
              index: '2-1-5'
            }, {
              text: '房源关联',
              name: 'propertyRelated',
              path: '/operateCenter/property/propertyList/propertyRelated/' + this.$route.params.propertyId,
              index: '2-1-6'
            }, {
              text: '渠道价格',
              name: 'channelPrice',
              path: '/operateCenter/property/propertyList/channelPrice/' + this.$route.params.propertyId,
              index: '2-1-7',
              node: [{
                text: '渠道价格编辑',
                name: 'channelPriceEdit',
                path: '/operateCenter/property/propertyList/channelPrice/' + this.$route.params.propertyId + '/channelPriceEdit/' + this.$route.params.channelId,
                index: '2-1-7-1'
              }]
            }, {
              text: '入住规则',
              name: 'checkInRules',
              path: '/operateCenter/property/propertyList/checkInRules/' + this.$route.params.propertyId,
              index: '2-1-8'
            }, {
              text: '附加费用',
              name: 'additionalFeesList',
              path: '/operateCenter/property/propertyList/additionalFeesList/' + this.$route.params.propertyId,
              index: '2-1-9'
            }]
          }, {
            text: '添加房源',
            name: 'propertyAdd',
            path: '/operateCenter/property/propertyAdd',
            index: '2-2'
          }]
        }, {
          text: '订单',
          name: 'order',
          path: '/operateCenter/order',
          index: '6',
          node: [{
            text: '订单列表',
            name: 'orderList',
            path: '/operateCenter/order/orderList',
            index: '6-1',
            node: [{
              text: '订单详情',
              name: 'orderInfo',
              path: '/operateCenter/order/orderList/orderInfo/' + this.$route.params.orderId,
              index: '6-1-1'
            }]
          }, {
            text: '添加订单',
            name: 'orderAdd',
            path: '/operateCenter/order/orderAdd',
            index: '6-2'
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
          text: '运营中心',
          name: 'app',
          path: '/operateCenter',
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
