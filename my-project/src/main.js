// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from './store'
import  "./assets/iconfont/iconfont.css"
Vue.use(VueAxios,axios)
Vue.use(ElementUi)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
import animated from 'animate.css'
Vue.use(animated)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
