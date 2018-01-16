import Vue from 'vue'
import VueCookie from 'vue-cookie'
import Router from 'vue-router'
import login from './login'
import home from './home'
import ners from './news'
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
    ners,
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
        path: '/zh-cn/login/login/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
