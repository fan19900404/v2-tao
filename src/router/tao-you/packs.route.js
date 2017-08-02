/**
 * Created by dreamapple on 16/9/27.
 */


const router = [
  {
    // 礼包详情
    path: '/tao-you/packs/packs-details/:id',
    name: 'TaoYouPacksDetails',
    component(resolve) {
      require(['../../oldPages/tao-you/packs/packs-details/index.page.vue'], resolve);
    },
  },
  {
    // 兌換結果
    path: '/tao-you/packs/packs-result/:id',
    name: 'TaoYouPacksResult',
    component(resolve) {
      require(['../../oldPages/tao-you/packs/packs-result/index.page.vue'], resolve);
    },
  },
];

export default router;
