'use strict';

var router = {
  "/activity/zero": {
    name: 'index',
    component: function(resolve) {
      // 0元抢IPhone
      require(['../../oldPages/about-activity/zero/index.page'], resolve);
    }
  },
  "/newbgift": {
    name: 'newbgift',
    component: function(resolve) {
      //新人豪礼
      require(['../../oldPages/about-activity/new-user-gift/gift.page'], resolve)
    }
  },
  "/newbgift/payreturn/:id": {
    name: 'gift-return',
    component: function(resolve) {
      //新人壕礼购买回调页面
      require(['../../oldPages/about-activity/new-user-gift/gift-return.page'], resolve)
    }
  },
  // iphone大转盘
  "/turntable/iphone": {
    name: 'iPhoneTurntable',
    component: function(resolve) {
      require(['../../oldPages/about-activity/turntable/index.page'], resolve)
    }
  },
  // iphone大转盘
  "/activity/new-year": {
    name: 'activityNewYear',
    component: function(resolve) {
      require(['../../oldPages/about-activity/new-year/index.page'], resolve)
    }
  },
  //元宵节活动
  "/activity/lantern-festival": {
    name: 'LanternFestival',
    component: function(resolve) {
      require(['../../oldPages/about-activity/lantern-festival/index.page'], resolve)
    }
  }
};

export default router;
