const router = [
  {
    // 活动列表页
    path: '/tao-you/activity',
    name: 'TaoYouActivityList',
    component(resolve) {
      require(['../../oldPages/tao-you/activity/home/index.page'], resolve);
    },
  },
];

export default router;
