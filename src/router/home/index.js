import index from './../../components/home/index.vue'
import home from './../../page/home/home/home.vue'
import forwardNewsList from './../../page/home/forwardNews/forwardNewsList.vue'

export default {
  path: '/:lang/home',
  component: index,
  children: [
    {
      path: '',
      redirect: 'home/home'
    },
    {
      path: 'home',
      redirect: 'home/home'
    },
    {
      path: 'home/home',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: home
    },
    {
      path: 'forwardNews',
      redirect: 'forwardNews/forwardNewsList'
    },
    {
      path: 'forwardNews/forwardNewsList',
      meta: {
        requireAuth: true,
        operate: true,
        owner: false
      },
      component: forwardNewsList
    }
  ]
}
