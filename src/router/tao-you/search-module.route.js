/**
 * Created by dreamapple on 16/9/27.
 */

const router = [
  {
    // 淘游搜索页面
    path: '/tao-you/search',
    name: 'TaoYouSearch',
    component(resolve) {
      require(['../../pages/tao-you/search-module/search.page'], resolve);
    },
  },
];

export default router;
