/**
 * Created by yex on 16/09/30.
 */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const router = [
  {
    // 新咨询详情页
    path: '/tao-you/news/:id',
    name: 'TaoYouNewsDetail',
    component(resolve) {
      require(['../../pages/tao-you/home/news-detail.page'], resolve);
    },
  },
  {
    // 我们的首页
    path: '/',
    name: 'home',
    redirect: '/tao-you/',
  },
  // 首页
  {
    path: '/tao-you/',
    name: 'TaoYouHome',
    component(resolve) {
      require(['../../pages/tao-you/home/index.page'], resolve);
    },
  },
  {
    // 原创
    path: '/tao-you/original-news',
    name: 'TaoYouOriginalNews',
    component(resolve) {
      require(['../../pages/tao-you/home/original.page'], resolve);
    },
  },
  {
    // 评论页
    path: '/tao-you/news-comment/:newsID/category/:category/type/:type',
    name: 'TaoYouNewsComment',
    component(resolve) {
      require(['../../pages/tao-you/home/comment.page'], resolve);
    },
  },
  {
    // 咨询详情页面所有的评论
    path: '/tao-you/all-comments/:id/category/:category',
    name: 'TaoYouHomeAllComments',
    component(resolve) {
      require(['../../pages/tao-you/home/all-comments.page'], resolve);
    },
  },
  // 对某个用户所有的回复
  {
    path: '/tao-you/all-replies/:newsID/comment/:id/category/:category',
    name: 'TaoYouHomeAllReplies',
    component(resolve) {
      require(['../../pages/tao-you/home/all-replies.page'], resolve);
    },
  },
  {
    // 登录
    path: '/tao-you/user-login',
    name: 'TaoYouUserLogin',
    component(resolve) {
      require(['../../pages/tao-you/login-register/login.page'], resolve);
    },
  },
  {
    // 注册或找回密码
    path: '/tao-you/user-register-or-find-password',
    name: 'TaoYouUserRegisterOrFindPassword',
    component(resolve) {
      require(['../../pages/tao-you/login-register/register-or-find-password.page'], resolve);
    },
  },

  {
    // 微信登录成功的展示页面
    path: '/tao-you/wechat-login-success',
    name: 'TaoYouWechatLoginSuccess',
    component(resolve) {
      require(['../../pages/tao-you/login-register/wechat-login-success.page'], resolve);
    },
  },
];
export default router;
