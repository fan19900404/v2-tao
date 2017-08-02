import flexbox from '../util/flexbox';
/* eslint-disable global-require */
export default [
  {
    // 首页(重定向)
    name: 'home',
    path: '/',
    redirect: '/tao-you',
  },
  {
    // 首页
    name: 'TaoYouHome',
    path: '/tao-you',
    component(resolve) {
      require.ensure(
        [],
        () => {
          resolve(require('../pages/home/index/index.vue'));
        },
        'TaoYouHome',
      );
    },
    beforeEnter(to, from, next) {
      console.log(1);
      flexbox(1);
      next();
    },
  },
  // {
  //   // 资讯详情页
  //   name: 'TaoYouNewsDetail',
  //   path: '/tao-you/news/:id',
  //   component(resolve) {
  //     require.ensure(
  //       [],
  //       () => {
  //         resolve(require('../pages/home/newsDetail/index.vue'));
  //       },
  //       'TaoYouNewsDetail',
  //     );
  //   },
  // },
  // {
  //   // 原创
  //   name: 'TaoYouOriginalNews',
  //   path: '/tao-you/original-news',
  //   component(resolve) {
  //     require.ensure(
  //       [],
  //       () => {
  //         resolve(require('../pages/home/original/index.vue'));
  //       },
  //       'TaoYouOriginalNews',
  //     );
  //   },
  // },
];
