/**
 * Created by litian on 16/8/23.
 */
'use strict';

/**
 * service：客服
 * userinfo：个人信息
 * updatename：昵称修改
 * address：收货地址管理
 * address_add：新增收货地址
 * bindphone：绑定手机
 */
const pages = ['service','userinfo','updatename','address','address-add','bindphone','private-letter'];


var router = {
    "/personal": {
        name: 'personal',
        component: function (resolve) {
            //个人中心首页
            require(['../../pages/about-personal-center/index-replace.page'], resolve);
        }
    },
  //消费明细
  "/personal/expense-structure": {
    name: 'TaoYouPersonalCenterExpenseStructure',
    component: function (resolve) {
      require(['../../pages/personal/expense-structure.page.vue'], resolve);
    }
  },
  //夺宝券说明
  "/personal/snatch-treasure-explain": {
    name: 'TaoYouPersonalCenterSnatchTreasureExplain',
    component: function (resolve) {
      require(['../../pages/personal/snatchexplain.page.vue'], resolve);
    }
  },
  //我的夺宝券
  // "personal/snatch-treasure-ticket": {
  //   name: 'TaoYouPersonalCenterSnatchTreasureTicket',
  //   component: function (resolve) {
  //     require(['../../pages/personal/snatch-ticket.page.vue'], resolve);
  //   }
  // },
  //单个私信页面
    "/personal/single-letter/:id": {
      name: 'PersonalSingleLetter',
      component: function (resolve) {
        require(['../../pages/about-personal-center/single-letter.page'], resolve);
      }
    },
  //全部参与
  "/personal/full-status/:index": {
    name: 'PersonalFullStatus',
    component: function (resolve) {
      require(['../../pages/about-personal-center/full-status.page'], resolve);
    }
  }
};

pages.forEach(function (page) {
    var name = '/personal/'+page;
    router[name] = {
        name:name,
        component: function (resolve) {
            require(['../../pages/about-personal-center/'+ page + '.page'], resolve)
        }
    }
});

export default router;
