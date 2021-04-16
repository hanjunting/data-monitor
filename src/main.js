// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import { Button, Selection } from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Navbar from '../src/components/Navbar.vue'
// import TableList from '../src/components/TableList.vue'
import './mock.js'
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component('Navbar', Navbar)
// Vue.component('Table',TableList)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
