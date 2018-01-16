import index from './../../components/system-management/index.vue'
import accountList from './../../page/system-management/account/accountList.vue'
import accountAdd from './../../page/system-management/account/accountAdd.vue'
import accountEdit from './../../page/system-management/account/accountEdit.vue'
import groupList from '../../page/system-management/account/groupList.vue'
import groupEdit from '../../page/system-management/account/groupEdit.vue'

export default {
  path: '/:lang/systemManagement',
  component: index,
  children: [
    {
      path: '',
      redirect: 'account/accountList'
    },
    {
      path: 'account',
      redirect: 'account/accountList'
    },
    {
      path: 'account/accountList',
      meta: {
        requireAuth: true,
        operate: true,
        owner: false
      },
      component: accountList
    },
    {
      path: 'account/accountList/accountEdit/:accountId',
      meta: {
        requireAuth: true,
        operate: true,
        owner: true
      },
      component: accountEdit
    },
    {
      path: 'account/accountAdd',
      meta: {
        requireAuth: true,
        operate: true,
        owner: false
      },
      component: accountAdd
    },
    {
      path: 'account/groupList',
      meta: {
        requireAuth: true,
        operate: true,
        owner: false
      },
      component: groupList
    },
    {
      path: 'account/groupList/groupEdit/:accountId',
      meta: {
        requireAuth: true,
        operate: true,
        owner: true
      },
      component: groupEdit
    }

  ]
}
