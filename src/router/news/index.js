import index from './../../components/news/index.vue'
import newsList from './../../page/news/news/newsList.vue'
import newsAdd from './../../page/news/news/newsAdd.vue'
import newsEdit from './../../page/news/news/newsEdit.vue'
import newsInfo from './../../page/news/news/newsInfo.vue'

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
      component: newsList
    },
    {
      path: 'news/newsList/newsInfo/:newsId',
      component: newsInfo
    },
    {
      path: 'news/newsList/newsEdit/:newsId',
      component: newsEdit
    },
    {
      path: 'news/newsAdd',
      component: newsAdd
    }
  ]
}
