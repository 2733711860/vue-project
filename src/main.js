import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import Navigation from 'vue-navigation'
Vue.use(Navigation, {router})
import "@/assets/style/index.less";

import "@/components/Vant";
// rem
import "amfe-flexible";

import './assets/Iconfont/css/iconfont.css'

// 接口请求
import {post,get,patch,put} from './api/http.js'
import api from './api'
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$api=api;

import store from './store'; // vuex

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
