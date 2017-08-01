const router = [
  {
    // 充值条款
    path: '/tao-you/introduction/recharge',
    name: 'IntroductionRecharge',
    component(resolve) {
      require(['../../pages/tao-you/introduction/recharge.page'], resolve);
    },
  },
  {
    // 我们的推广页面
    path: '/tao-you/spread-our-game/:id',
    name: 'TaoYouSpreadOurGame',
    component(resolve) {
      require(['../../pages/tao-you/spread/spread-our-game.page.vue'], resolve);
    },
  },
];
export default router;
