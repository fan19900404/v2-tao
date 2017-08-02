// dreamapple 首页
'use strict';
export default {
  // 一元购首页
  '/': {
    name: 'home',
    component: function (resolve) {
      require(['../../oldPages/about-home/home.page'], resolve)
    }
  },
  // 通用的错误页面
  "/error": {
    component: function (resolve) {
      //登录失效
      require(['../../oldPages/about-home/error.page'], resolve)
    }
  },
  //页面出错时加载
  "/error-alt": {
    name: 'error-alt',
    component: function (resolve) {
      require(['../../oldPages/about-home/error-alt.page'],resolve)
    }
  }
};
