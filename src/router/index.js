import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dynamic'
    },{
      path: '/', component: () => import('@/components/HelloWorld.vue'),
      children: [
        {
          path: '/dynamic',
          name: 'Dynamic',
          component: () => import('@/pages/dynamic.vue')
        },{
          path: '/static',
          name: 'Static',
          component: () => import('@/pages/static.vue')
        },{
          path: '/figure',
          name: 'Figure',
          component: () => import('@/pages/figure.vue')
        }
      ]
    }
  ]
})
