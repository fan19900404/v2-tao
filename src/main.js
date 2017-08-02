// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import VueTouch from 'vue-touch';
import LazyRender from 'vue-lazy-render';
import App from './App';
import router from './router';
import store from './vuex/store';
import HttpConf from './http';
import * as filter from './filters/substr';
// 统计使用
import statistics from './oldPages/tao-you/statistics';
import addPadStart from './oldPages/tao-you/statistics/utils/padStart';

// 微端自动登录
import Login from '../static/lib/weClient/login';

// toast组件样式
require('vue-toast-mobile/lib/index.css');

Vue.config.productionTip = false;

statistics();
addPadStart();
// 使用延迟加载
Vue.use(LazyRender);

// 是否需要调试

Vue.use(VueResource);
Vue.use(VueTouch, { name: 'v-touch' });
// 确保之前使用过VueResource
Vue.use(HttpConf);
Vue.use(Vuex);
Vue.use(Login);

// 使用自定义过滤器
for (const p in filter) {
  Vue.filter(p, filter[p]);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
