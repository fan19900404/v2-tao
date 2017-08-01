// dreamapple 协议说明
'use strict';
export default {
  // 帮助中心
  '/help': {
    name: 'help-center',
    component: function (resolve) {
      require(['../../pages/about-agreement/help-center.page'], resolve)
    }
  },
  // 充值说明
  '/recharge/explain': {
    component: function (resolve) {
      //充值页
      require(['../../pages/about-agreement/recharge-explain.page'], resolve)
    }
  },
  // 淘游服务协议
  '/xieyi': {
    name: 'service-agreement',
    component: function (resolve){
      require(['../../pages/about-agreement/service-agreement.page'], resolve)
    }
  },
  // 更改通知
  '/important-notice': {
    name: 'important-notice',
    component: function (resolve){
      require(['../../pages/about-agreement/notice/urgent.page'], resolve)
    }
  }
};
