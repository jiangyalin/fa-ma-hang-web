import index from './../../components/financial-center/index.vue'
import orderStatistics from './../../page/financial-center/statistics/orderStatistics.vue'
import amountStatistics from './../../page/financial-center/statistics/amountStatistics.vue'
import channelStatistics from './../../page/financial-center/statistics/channelStatistics.vue'
import settlementList from './../../page/financial-center/settlement/settlementList.vue'
import settlementOrderList from './../../page/financial-center/settlement/settlementOrderList.vue'
import settlementInfo from './../../page/financial-center/settlement/settlementInfo.vue'
import billingConfigurationList from './../../page/financial-center/settlement/billingConfigurationList.vue'
import billingConfigurationEdit from './../../page/financial-center/settlement/billingConfigurationEdit.vue'

export default {
  path: '/:lang/financialCenter',
  component: index,
  children: [
    {
      path: '',
      redirect: 'statistics/orderStatistics'
    },
    {
      path: 'statistics',
      redirect: 'statistics/orderStatistics'
    },
    {
      path: 'statistics/orderStatistics',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: orderStatistics
    },
    {
      path: 'statistics/amountStatistics',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: amountStatistics
    },
    {
      path: 'statistics/channelStatistics',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: channelStatistics
    },
    {
      path: 'settlement',
      redirect: 'settlement/settlementList'
    },
    {
      path: 'settlement/settlementList',
      meta: {
        requireAuth: true,
        operate: true,
        owner: true
      },
      component: settlementList
    },
    {
      path: 'settlement/settlementList/settlementOrderList/:settlementId',
      meta: {
        requireAuth: true,
        operate: true,
        owner: true
      },
      component: settlementOrderList
    },
    {
      path: 'settlement/settlementList/settlementOrderList/:settlementId/settlementInfo/:settlementOrderId',
      meta: {
        requireAuth: true,
        operate: true,
        owner: true
      },
      component: settlementInfo
    },
    {
      path: 'settlement/billingConfigurationList',
      meta: {
        requireAuth: true,
        operate: true,
        owner: true
      },
      component: billingConfigurationList
    },
    {
      path: 'settlement/billingConfigurationList/billingConfigurationEdit/:billingConfigurationId',
      meta: {
        requireAuth: true,
        operate: true,
        owner: true
      },
      component: billingConfigurationEdit
    }
  ]
}
