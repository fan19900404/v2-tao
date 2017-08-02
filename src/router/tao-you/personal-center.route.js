/**
 * Created by dreamapple on 16/9/27.
 */
const router = [
  {
    // 个人中心页面
    path: '/tao-you/demo',
    name: 'Demo',
    component(resolve) {
      require(['../../oldPages/_demo/demo.page'], resolve);
    },
  },
  {
    // 个人首页中心
    path: '/tao-you/personal-center',
    name: 'TaoYouPersonalCenter',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/index.page'], resolve);
    },
  },

  {
    // 服务中心
    path: '/tao-you/personal-center/service',
    name: 'Service',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/service.page'], resolve);
    },
  },
  {
    // 个人信息修改
    path: '/tao-you/personal-center/user-info',
    name: 'UserInfo',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/user-info.page'], resolve);
    },
  },
  {
    // 绑定手机
    path: '/tao-you/personal-center/bind-phone',
    name: 'Bindphone',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/bind-phone.page'], resolve);
    },
  },
  {
    // 修改昵称
    path: '/tao-you/personal-center/update-nickname',
    name: 'UpdateNickname',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/update-nickname.page'], resolve);
    },
  },
  {
    // 抵扣券
    path: '/tao-you/personal-center/rebate',
    name: 'TaoYouPersonalCenterRebate',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/rebate.page'], resolve);
    },
  },
  {
    // 抵扣券说明
    path: '/tao-you/personal-center/rebate-explain',
    name: 'TaoYouPersonalCenterRebateExplain',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/rebate-explain.page'], resolve);
    },
  },
  {
    // 我的淘币页
    path: '/tao-you/personal-center/taobi',
    name: 'TaoYouPersonalCenterTaoBi',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/taobi.page'], resolve);
    },
  },
  {
    // 我的游戏页
    path: '/tao-you/personal-center/my-game',
    name: 'TaoYouPersonalCenterMyPage',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/my-game.page'], resolve);
    },
  },
  {
    // 游戏规则页面
    path: '/tao-you/personal-center/game-rule',
    name: 'TaoYouPersonalCenterGameRule',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/game-rule.page'], resolve);
    },
  },
  {
    // 游戏排行榜
    path: '/tao-you/personal-center/game-ranking/:id',
    name: 'TaoYouPersonalCenterGameRanking',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/game-ranking.page'], resolve);
    },
  },
  {
    // 淘豆比赛
    path: '/tao-you/personal-center/taodou-match',
    name: 'TaoYouPersonalCenterTaodouMatch',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/taodou-match.page'], resolve);
    },
  },
  {
    // 淘币充值
    path: '/tao-you/personal-center/pay-for-taobi',
    name: 'TaoYouPersonalCenterPayForTaoBi',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/pay-for-taobi.page'], resolve);
    },
  },
  {
    // 系统消息
    path: '/tao-you/personal-center/notice',
    name: 'TaoYouPersonalCenterNotice',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/notice.page'], resolve);
    },
  },
  {
    // 系统消息详细
    path: '/tao-you/personal-center/notice/:id',
    name: 'TaoYouPersonalCenterNoticeDetail',
    component(resolve) {
      require(['../../oldPages/tao-you/personal-center/notice-detail.page'], resolve);
    },
  },
];

export default router;
