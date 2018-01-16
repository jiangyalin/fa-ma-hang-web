import index from '../../components/operate-center/index.vue'
import propertyList from './../../page/operate-center/property/propertyList.vue'
import propertyAdd from './../../page/operate-center/property/propertyAdd.vue'
import propertyEdit from './../../page/operate-center/property/propertyEdit.vue'
import propertyImageEdit from './../../page/operate-center/property/propertyImageEdit.vue'
import propertyInfo from './../../page/operate-center/property/propertyInfo.vue'
// import propertyInfo from './../../page/operate-center/property/property-info/index.vue'
import propertyAudit from './../../page/operate-center/property/propertyAudit.vue'
import propertyPolicy from './../../page/operate-center/property/propertyPolicy.vue'
import propertyRelated from './../../page/operate-center/property/propertyRelated.vue'
import additionalFeesList from './../../page/operate-center/property/additionalFeesList.vue'
import rateList from './../../page/operate-center/property/rateList.vue'
import rateEdit from './../../page/operate-center/property/rateEdit.vue'
import orderList from './../../page/operate-center/order/orderList.vue'
import orderInfo from './../../page/operate-center/order/orderInfo.vue'
import orderAdd from './../../page/operate-center/order/orderAdd.vue'
import orderStatistics from './../../page/operate-center/order/orderStatistics.vue'
import channelList from './../../page/operate-center/channel/channelList.vue'
import channelAdd from './../../page/operate-center/channel/channelAdd.vue'
import channelEdit from './../../page/operate-center/channel/channelEdit.vue'
import channelBinding from './../../page/operate-center/channel/channelBinding.vue'
import channelPrice from './../../page/operate-center/property/channelPrice.vue'
import channelPriceEdit from './../../page/operate-center/property/channelPriceEdit.vue'
import checkInRules from './../../page/operate-center/property/checkInRules.vue'

export default {
  path: '/:lang/operateCenter',
  component: index,
  children: [
    {
      path: '',
      redirect: 'property/propertyList'
    },
    {
      path: 'property',
      redirect: 'property/propertyList'
    },
    {
      path: 'property/propertyList',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: propertyList
    },
    {
      path: 'property/propertyList/propertyInfo/:propertyId',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: propertyInfo
    },
    {
      path: 'property/propertyAudit/propertyInfo/:propertyId',
      meta: {
        requireAuth: true,
        operate: true,
        owner: false
      },
      component: propertyInfo
    },
    {
      path: 'property/propertyList/propertyEdit/:propertyId',
      meta: {
        keepAlive: true,
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: propertyEdit
    },
    {
      path: 'property/propertyList/propertyPolicy/:propertyId',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: propertyPolicy
    },
    {
      path: 'property/propertyList/propertyImageEdit/:propertyId',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: propertyImageEdit
    },
    {
      path: 'property/propertyList/rateList/:propertyId',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: rateList
    },
    {
      path: 'property/propertyList/rateList/:propertyId/rateEdit',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: rateEdit
    },
    {
      path: 'property/propertyList/propertyRelated/:propertyId',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: propertyRelated
    },
    {
      path: 'property/propertyList/channelPrice/:propertyId',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: channelPrice
    },
    {
      path: 'property/propertyList/channelPrice/:propertyId/channelPriceEdit/:channelId',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: channelPriceEdit
    },
    {
      path: 'property/propertyList/checkInRules/:propertyId',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: checkInRules
    },
    {
      path: 'property/propertyList/additionalFeesList/:propertyId',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: additionalFeesList
    },
    {
      path: 'property/propertyAdd',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: propertyAdd
    },
    {
      path: 'property/propertyAudit',
      meta: {
        requireAuth: true,
        operate: true,
        owner: false
      },
      component: propertyAudit
    },
    {
      path: 'order',
      redirect: 'order/orderList'
    },
    {
      path: 'order/orderList',
      meta: {
        requireAuth: true,
        operate: true,
        owner: true
      },
      component: orderList
    },
    {
      path: 'order/orderList/orderInfo/:orderId',
      meta: {
        requireAuth: true,
        operate: true,
        owner: true
      },
      component: orderInfo
    },
    {
      path: 'order/orderAdd',
      meta: {
        requireAuth: true,
        operate: false,
        owner: true
      },
      component: orderAdd
    },
    {
      path: 'order/orderStatistics',
      meta: {
        requireAuth: true,
        operate: true,
        owner: true
      },
      component: orderStatistics
    },
    {
      path: 'channel',
      redirect: 'channel/channelList'
    },
    {
      path: 'channel/channelList',
      meta: {
        requireAuth: true,
        operate: true,
        owner: false
      },
      component: channelList
    },
    {
      path: 'channel/channelList/channelEdit/:channelId',
      meta: {
        requireAuth: true,
        operate: true,
        owner: false
      },
      component: channelEdit
    },
    {
      path: 'channel/channelAdd',
      meta: {
        requireAuth: true,
        operate: true,
        owner: false
      },
      component: channelAdd
    },
    {
      path: 'channel/channelList/channelBinding/:channelId',
      meta: {
        requireAuth: true,
        operate: true,
        owner: false
      },
      component: channelBinding
    }
  ]
}
