<template>
  <div class="m-hd">
    <div class="u-name">发码行后台管理</div>
    <el-menu
      :default-active="openNav"
      class="el-menu-demo u-menu"
      mode="horizontal">
      <el-menu-item
        v-for="item in navData"
        :index="item.index"
        :data-to="'/' + $route.params.lang + item.path"
        @click="to($event, item.index)"
        :key="item.index">{{item.text}}</el-menu-item>
    </el-menu>
    <div class="u-user">
      <div class="u-menu" background-color="#292d38">
        <el-tooltip
          class="item"
          effect="dark"
          :content="userInfo.name"
          placement="top-start">
        </el-tooltip>
        <div index="4" class="u-user-li" @click="signOut">
          <i class="fa fa-power-off u-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'topHeader',
    data () {
      return {
        userInfo: {
          name: this.$cookie.get('user')
        },
        activeIndex: '1',
        navData: [{
          text: '首页',
          name: 'home',
          path: '/home',
          index: '1'
        }, {
          text: '新闻管理',
          name: 'news',
          path: '/news',
          index: '2'
        }]
      }
    },
    computed: {
      openNav () {
        return this.activeIndex
      }
    },
    methods: {
      to (event, index) {
        const path = event.$attrs['data-to']
        this.$router.push(path)
        this.activeIndex = index
      },
      // 退出登录
      signOut () {
        this.$cookie.delete('token')
        this.$cookie.delete('userType')
        this.$cookie.delete('user')
        window.location.reload()
      }
    },
    created: function () {
      // 激活选中
      let active = ''
      const path = this.$route.path
      this.navData.forEach((result) => {
        if (path.indexOf(result.path) !== -1) {
          active = result.index
        }
      })
      this.activeIndex = active
    }
  }
</script>
<style scoped>
  .m-hd{
    width: 100%;
  }
  .u-menu{
    display: flex;
    float: left;
    height: 60px;
  }
  .u-name{
    float: left;
    padding: 0 30px;
    width: 200px;
    height: 60px;
    box-sizing: border-box;
  }
  .u-user{
    display: flex;
    float: right;
  }
  .u-user-li{
    width: 60px;
    height: 60px;
    font-size: 20px;
    text-align: center;
    /*background-color: #292d38;*/
    transition: .3s;
  }
  .u-user-li:hover{
    /*background-color: #21242d;*/
    cursor: pointer;
  }
  .u-icon{
    color: #dcdcdc;
  }
</style>
