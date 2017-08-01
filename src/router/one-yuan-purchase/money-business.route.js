// dreamapple 关于充值支付交易
'use strict';
export default {
  // 充值页面
  '/personal/recharge': {
    name: 'pay-recharge',
    component: function (resolve) {
      require(['../../pages/about-money-business/recharge.page'], resolve)
    }
  },
  // 淘币不足直接支付
  '/pay-for-goods/:tradeNo/:taoBi/:number': {
    name: 'pay-for-goods',
    component: function (resolve) {
      require(['../../pages/about-money-business/pay-for-goods.page'], resolve)
    }
  },
  // 游戏付款页面
  '/pay-for-game/:tradeNo/:taoBi/:number': {
    name: 'pay-for-game',
    component: function (resolve) {
      require(['../../pages/about-money-business/pay-for-game.page'], resolve)
    }
  },
  // 直接使用淘币支付
  '/confirm-my-order/:number/:tradeId/:isSubarea': {
    name: 'confirm-my-order',
    component: function (resolve) {
      // dr 付款页面
      require(['../../pages/about-money-business/confirm-my-order.page'], resolve)
    }
  },
  // 支付成功的回调页面
  '/pay/return/:id': {
    name: 'pay-return',
    component: function (resolve) {
      require(['../../pages/about-money-business/pay-return.page'], resolve)
    }
  },
  //充值明细页面
  '/personal/recharge-details': {
    name: 'recharge-details',
    component: function (resolve) {
      require(['../../pages/about-money-business/recharge-details.page'], resolve)
    }
  }
};
