import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/page/layout/Layout'
import index from '@/page/index'
import cockpitFinance from '@/page/cockpit-finance'
import cockpitHuman from '@/page/cockpit-human'
import cockpitMarket from '@/page/cockpit-market'
import cockpitFacilities from '@/page/cockpit-facilities'
import cockpitService from '@/page/cockpit-service'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
    },

    {
      path:'/index',
      component: Layout,
      children:[
        {
          name:'index',
          path:'/index',
          component:index
        },
        {
          name:'cockpitFinance',
          path:'/cockpitFinance',
          component:cockpitFinance
        },
        {
          name:'cockpitHuman',
          path:'/cockpitHuman',
          component:cockpitHuman
        },
        {
          name:'cockpitMarket',
          path:'/cockpitMarket',
          component:cockpitMarket
        },
        {
          name:'cockpitFacilities',
          path:'/cockpitFacilities',
          component:cockpitFacilities
        },
        {
          name:'cockpitService',
          path:'/cockpitService',
          component:cockpitService
        },
      ]
    },
  ]
})
