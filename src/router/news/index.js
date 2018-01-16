import index from './../../components/news/index.vue'
import login from './../../page/login/login/login.vue'

export default {
  path: '/:lang/news',
  component: index,
  children: [
    {
      path: '',
      redirect: 'news/newsList'
    },
    {
      path: 'news',
      redirect: 'news/newsList'
    },
    {
      path: 'news/newsList',
      component: login
    }
  ]
}
