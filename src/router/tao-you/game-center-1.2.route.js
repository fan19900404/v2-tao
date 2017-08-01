/**
 * Created by dreamapple on 16/9/27.
 */
const router = [
  {
    // 游戏中心开服
    path: '/tao-you/game-center/open-service',
    name: 'TaoYouGameCenterOpenService',
    component(resolve) {
      require(['../../pages/tao-you/game-center-1.2/open-server/open-service.page.vue'], resolve);
    },
  },
  {
    // 游戏中心
    path: '/tao-you/game-center',
    name: 'TaoYouGameCenter',
    component(resolve) {
      require(['../../pages/tao-you/game-center-1.2/index/index.page.vue'], resolve);
    },
  },
  {
    // 游戏排行榜
    path: '/tao-you/game-center-rank',
    name: 'TaoYouGameCenterReplaceRank',
    component(resolve) {
      require(['../../pages/tao-you/game-center-1.2/game-rank/index.page.vue'], resolve);
    },
  },
  {
    // 礼包
    path: '/tao-you/packs',
    name: 'TaoYouPacks',
    component(resolve) {
      require(['../../pages/tao-you/game-center-1.2/packs/index.page.vue'], resolve);
    },
  },
  {
    // 任务
    path: '/tao-you/tasks',
    name: 'TaoYouTasks',
    component(resolve) {
      require(['../../pages/tao-you/game-center-1.2/task/index.page.vue'], resolve);
    },
  },
  {
    // 游戏详情
    path: '/tao-you/game-center/game-details/:id',
    name: 'TaoYouGameCenterGameDetails',
    component(resolve) {
      require(['../../pages/tao-you/game-center-1.2/game-details/index.page.vue'], resolve);
    },
  },
];

export default router;
