import index from './../../components/news/index.vue'
import news from './../../page/news/news/newsList.vue'

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
      component: news
    }
  ]
}
