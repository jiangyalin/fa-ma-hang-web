import Vue from 'vue'
import VueCookie from 'vue-cookie'
import Router from 'vue-router'
import login from './login'
import home from './home'
import operateCenter from './operate-center'
import financialCenter from './financial-center'
import systemManagement from './system-management'
import error from './../components/error/404.vue'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/zh-cn/home/home/home'
    },
    {
      path: '/:lang',
      redirect: '/:lang/home/home/home'
    },
    login,
    home,
    operateCenter,
    financialCenter,
    systemManagement,
    {
      path: '*',
      component: error
    }
  ]
})

// 判断登陆权限
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = VueCookie.get('token') || ''
    const userType = VueCookie.get('userType') || '' // 用户类型
    const user = VueCookie.get('user') || '' // 用户名
    // 判断登陆
    if (token === '' || user === '' || userType === '') {
      next({
        path: '/zh-cn/login/login/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      const isOperateType = userType === '0' // 运营
      const isOwnerType = userType === '1' // 业主
      // 判断权限
      if ((to.meta.operate && isOperateType) || (to.meta.owner && isOwnerType)) {
        next()
      } else {
        // 房源重定向例外判断
        const isToPropertyList = to.fullPath.indexOf('/operateCenter/property/propertyList') !== -1
        if (isToPropertyList && isOperateType) {
          next({
            path: '/zh-cn/operateCenter/property/propertyAudit'
          })
        } else {
          // 用户信息重定向例外判断
          const isToAccountList = to.fullPath.indexOf('/systemManagement/account/accountList') !== -1
          if (isToAccountList && isOwnerType) {
            next({
              path: '/zh-cn/systemManagement/account/accountList/accountEdit/' + VueCookie.get('user')
            })
          } else {
            // 统计分析重定向例外判断
            const isToOrderStatistics = to.fullPath.indexOf('/financialCenter/statistics/orderStatistics') !== -1
            if (isToOrderStatistics && isOperateType) {
              next({
                path: '/zh-cn/financialCenter/settlement'
              })
            } else {
              // 首页统计重定向例外判断
              const isToOrderStatistics = to.fullPath.indexOf('/home/home/home') !== -1
              if (isToOrderStatistics && isOperateType) {
                next({
                  path: '/zh-cn/home/forwardNews/forwardNewsList'
                })
              } else {
                next({
                  path: '/zh-cn/error'
                })
              }
            }
          }
        }
      }
    }
  } else {
    next()
  }
})

export default router
