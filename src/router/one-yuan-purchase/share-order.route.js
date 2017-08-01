'use strict';
export default {
  "/share-order/:id": {
    name: 'share-order',
    component: function (resolve) {
      // 晒单发布
      require(['../../pages/about-share-order/share-order.page'], resolve)
    }
  },
  "/coupon-intro": {
    name: 'coupon-intro',
    component: function (resolve) {
      // 优惠券使用说明
      require(['../../pages/about-share-order/coupon-intro.page'], resolve)
    }
  },
  "/hiscenter/:id": {
    name:'hiscenter',
    component: function (resolve) {
      //他的个人中心
      require(['../../pages/about-share-order/hiscenter.page'], resolve)
    }
  },
  "/shaidanshare/user/:id": {
    name:'shaidanshare-user',
    component: function (resolve) {
      //晒单分享(用户)
      require(['../../pages/about-share-order/share-shaidan.page'], resolve)
    }
  },
  "/shaidanshare": {
    name:'shaidanshare',
    component: function (resolve) {
      //晒单分享(所有)
      require(['../../pages/about-share-order/share-shaidan.page'], resolve)
    }
  },
  "/shaidandetail/:id": {
    name:'shaidandetail',
    component: function (resolve) {
      //晒单详情
      require(['../../pages/about-share-order/share-detail.page'], resolve)
    }
  }
};
