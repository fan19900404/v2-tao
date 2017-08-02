'use strict';
export default {
  // dr 商品的参与详情
  '/dr-participate-detail/:id': {
    name: 'participate-detail',
    component: function (resolve) {
      require(['../../oldPages/about-goods/participate-detail.page'], resolve)
    }
  },
  // 详情页
  '/details/:id': {
    name: 'goods-detail',
    component: function (resolve) {
      require(['../../oldPages/about-goods/details.page'], resolve)
    }
  },
  // dr 分区商品的详情
  '/dr-subarea-detail/:id': {
    name: 'subarea-detail',
    component: function (resolve) {
      require(['../../oldPages/about-goods/subarea-detail.page'], resolve)
    }
  },
  // dr 分区玩法介绍
  '/dr-subarea-play-intro': {
    name: 'subarea-play-intro',
    component: function (resolve) {
      require(['../../oldPages/about-goods/subarea-play-intro.page'], resolve)
    }
  },
  // dr 分区商品历史走势
  '/dr-history-reward/:id': {
    name: 'history-reward',
    component: function (resolve) {
      require(['../../oldPages/about-goods/history-reward.page'], resolve)
    }
  },
  // 虚拟卡使用说明
  "/intro-virtual-card": {
    name: 'intro-virtual-card',
    component: function (resolve) {
      // dr 商品的参与详情
      require(['../../oldPages/about-goods/phone-card-intro.page'], resolve)
    }
  },
  // dr 付款页面
  '/goods-graphic-details/:id': {
    name: 'goods-graphic-details',
    component: function (resolve) {
      require(['../../oldPages/about-goods/goods-graphic-details.page'], resolve)
    }
  },
  // 商品的确认
  '/confirm-goods/:id': {
    name: 'confirm-goods',
    component: function (resolve) {
      // dr 晒单
      require(['../../oldPages/about-goods/confirm-goods.page'], resolve)
    }
  }
};
