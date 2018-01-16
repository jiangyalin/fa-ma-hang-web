<template>
  <div class="g-mn">
    <el-container class="g-mn">
      <el-header>
        <topHeader></topHeader>
      </el-header>
      <el-container>
        <el-aside width="200px" v-if="homeShowState === 'true'">
          <navs @navDataTransfer="getNavData"></navs>
        </el-aside>
        <el-container direction="vertical">
          <crumb :crumbs="crumb" v-if="homeShowState === 'true'"></crumb>
          <div class="el-main">
            <div class="g-main">
              <router-view/>
            </div>
          </div>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopHeader from './../public/topHeader.vue'
  import Nav from './nav.vue'
  import Crumb from './../public/crumb.vue'
  export default {
    name: 'app',
    data () {
      return {
        homeShowState: 'true',
        crumb: []
      }
    },
    components: {
      topHeader: TopHeader,
      navs: Nav,
      crumb: Crumb
    },
    methods: {
      getNavData: function (msg) {
        this.crumb = msg
      }
    },
    created: function () {
      if (this.$route.path.indexOf('/home/home/home') !== -1) {
        this.homeShowState = 'false'
      } else {
        this.homeShowState = 'true'
      }
    }
  }
</script>

<style scoped>
  .el-main{
    background: #f5f5f5;
  }
  .g-mn{
    background: #5d5d5d;
  }
</style>
