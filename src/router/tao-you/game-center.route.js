/**
 * Created by dreamapple on 16/9/27.
 */

const router = [
  {
    // 单个游戏介绍
    path: '/tao-you/game-intro/:id',
    name: 'GameIntro',
    component(resolve) {
      require(['../../pages/tao-you/game-center/game-detail.page'], resolve);
    },
  },
  {
    // 我们的小游戏介绍
    path: '/tao-you/our-game-intro/:id',
    name: 'TaoYouOurGameIntro',
    component(resolve) {
      require(['../../pages/tao-you/game-center/our-game-detail.page'], resolve);
    },
  },
  {
    // 游戏付费
    path: '/tao-you/pay-for-game',
    name: 'PayForGame',
    component(resolve) {
      require(['../../pages/tao-you/game-center/pay-for-game.page'], resolve);
    },
  },
  {
    // 支付回调
    path: '/tao-you/pay-callback',
    name: 'PayCallback',
    component(resolve) {
      require(['../../pages/game-center/pay-callback.page'], resolve);
    },
  },
  {
    // 支付回调页面
    path: '/tao-you/pay/return/:id',
    name: 'PayReturn',
    component(resolve) {
      require(['../../pages/tao-you/game-center/pay-return.page'], resolve);
    },
  },
  {
    // 服务协议
    path: '/tao-you/service-agreement',
    name: 'ServiceAgreement',
    component(resolve) {
      require(['../../pages/game-center/service-agreement.page'], resolve);
    },
  },
  {
    // 接入的游戏
    path: '/tao-you/play-my-game/:id',
    name: 'TaoYouPlayMyGame',
    component(resolve) {
      require(['../../pages/tao-you/game-center/play-game.page'], resolve);
    },
  },

  {
    // 接入的游戏示例
    path: '/tao-you/outer-game-demo',
    name: 'TaoYouOuterGameDemo',
    component(resolve) {
      require(['../../pages/tao-you/game-center/outer-game-demo.page'], resolve);
    },
  },

  {
    // 支付过程中取消
    path: '/tao-you/recharge-back',
    name: 'TaoYouRechargeBack',
    component(resolve) {
      require(['../../pages/tao-you/game-center/recharge-back.page'], resolve);
    },
  },

  {
    // 支付成功
    path: '/tao-you/recharge-success',
    name: 'TaoYouRechargeSuccess',
    component(resolve) {
      require(['../../pages/tao-you/game-center/recharge-success.page'], resolve);
    },
  },

  {
    // 微端 玩游戏页面
    path: '/tao-you/play-game',
    name: 'TaoYouPlayGame',
    component(resolve) {
      require(['../../pages/tao-you/weclient/play-game.page'], resolve);
    },
  },
];

export default router;
