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
          text: '新闻管理',
          name: '/news',
          active: '1-1',
          uniqueOpened: true
        },
        navData: [{
          text: '新闻管理',
          name: 'news',
          path: '/news/news',
          index: '1',
          node: [{
            text: '新闻列表',
            name: 'news',
            path: '/news/news/newsList',
            index: '1-1'
          }]
        }]
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
          text: '新闻管理',
          name: 'news',
          path: '/news',
          index: '0'
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
        text: '新闻管理',
        name: 'news',
        path: '/news',
        index: '0'
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
        // 初始化激c活
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
          text: '新闻管理',
          name: 'news',
          path: '/news',
          index: '0'
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
