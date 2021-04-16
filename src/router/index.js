import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home.vue'
//
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/online'
    },{
      path: '/', component: () => import('@/components/Home.vue'),
      children: [
        {
          path: '/online',
          name: 'Online',
          component: () => import('@/pages/online.vue')
        },{
          path: '/offline',
          name: 'Offline',
          component: () => import('@/pages/offline.vue')
        },{
          path: '/figure',
          name: 'Figure',
          component: () => import('@/pages/figure.vue')
         },
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/pages/home.vue')
        },
        // {
        //   path: '/dashboard',
        //   name: 'DashBoard',
        //   component: () => import('@/pages/online.vue')
        // }, {
        // path: '/offline',
        // name: 'Offline',
        // component: () => import('@/pages/offline.vue')
        // }
      ]
    }
  ]
})
