/**
 * Created by dreamapple on 16/9/27.
 */

const router = [
  {
    // 福利商城使用说明
    path: '/tao-you/welfare-shop/welfare-explain',
    name: 'TaoYouWelfareShopWelfareExplain',
    component(resolve) {
      require(['../../oldPages/tao-you/welfare-shop/welfare-explain.page.vue'], resolve);
    },
  },
  {
    // 福利商城
    path: '/tao-you/welfare-shop/welfare',
    name: 'TaoYouWelfareShopWelfare',
    component(resolve) {
      require(['../../oldPages/tao-you/welfare-shop/welfare.page.vue'], resolve);
    },
  },
  {
    // 我的淘豆
    path: '/tao-you/welfare-shop/my-taodou',
    name: 'TaoYouWelfareShopWelfareMyTaodou',
    component(resolve) {
      require(['../../oldPages/tao-you/welfare-shop/my-taodou.page.vue'], resolve);
    },
  },
  {
    path: '/tao-you/welfare-shop/taodou-explain',
    name: 'TaoYouTaoDouExplain',
    component(resolve) {
      require(['../../oldPages/tao-you/welfare-shop/taodou-explain.page.vue'], resolve);
    },
  },
  {
    // 礼包兑换
    path: '/tao-you/welfare-shop/package',
    name: 'TaoYouWelfareShopWelfarePackage',
    component(resolve) {
      require(['../../oldPages/tao-you/welfare-shop/package.page.vue'], resolve);
    },
  },
  {
    // 商品详情
    path: '/tao-you/welfare-shop/welfare-details/:id',
    name: 'TaoYouWelfareShopWelfareDetails',
    component(resolve) {
      require(['../../oldPages/tao-you/welfare-shop/welfare-details.page.vue'], resolve);
    },
  },
  {
    // 限时商品详情
    path: '/tao-you/welfare-shop/welfare-time-details/:id',
    name: 'TaoYouWelfareShopWelfareTimeDetails',
    component(resolve) {
      require(['../../oldPages/tao-you/welfare-shop/welfare-time-details.page.vue'], resolve);
    },
  },
];

export default router;
