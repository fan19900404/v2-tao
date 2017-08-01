import Vue from 'vue';
import Router from 'vue-router';
import pageMap from '../pages/tao-you/statistics/page-map';
import routers from './router';

Vue.use(Router);

const router = new Router({
  routes: [
    // 重定向
    {
      path: '/tao-you/all-replies/:newsID/:id/:category',
      redirect: '/tao-you/all-replies/:newsID/comment/:id/category/:category',
    },
    {
      path: '/tao-you/all-replies/:newsID/:id',
      redirect: '/tao-you/all-replies/:newsID/comment/:id/category/1',
    },
    {
      path: '/',
      redirect: '/tao-you',
    },
    ...routers,
  ],
});

router.beforeEach((to, from, next) => {
  const query = from.query || {};
  if (query.hasOwnProperty('mID')) {
    window.mID = query.mID;
    localStorage.setItem('mID', query.mID);
  }
  // 添加adID
  if (query.hasOwnProperty('adID')) {
    window.adID = query.adID;
    localStorage.setItem('adID', query.adID);
  }
  // 处理用户的登录注册问题
  if (+localStorage.getItem('login') === 0) {
    const whiteRoutesName = [
      'TaoYouUserLogin', // 登录页面
      'TaoYouHome', // 淘游首页,
      'TaoYouGameCenter', // 淘游游戏中心,
      'TaoYouNewsDetail', // 资讯详情页
      'TaoYouHomeAllComments', // 资讯详情所有评论页
      'TaoYouHomeAllReplies', // 资讯详情评论回复页
      'TaoYouUserRegisterOrFindPassword', // 淘游助手注册
      'TaoYouGameCenterGameDetails', // 游戏介绍
      'GameIntro',
      'TaoYouOurGameIntro', // 小游戏的介绍
      'TaoYouSpreadOurGame', // 游戏的推广页面,
      'TaoYouWechatLoginSuccess', // 微信登录成功的页面,
      // 'TaoYouPersonalCenterTaodouMatch',  // 淘豆比赛
      // 'TaoYouWelfareShopWelfare', // 福利商城
      'TaoYouOriginalNews', // 原创
      'TaoYouActivityList', // 活动
      'TaoYouPersonalCenterGameRule', // 参赛规则
      'TaoYouTaoDouExplain', // 淘豆说明
      'TaoYouWelfareShopWelfareExplain', // 抵扣券说明
      'TaoYouPacksDetails', // 礼包查看
      'TaoYouPlayGame',
    ];
    const isTaoYou = to.path.indexOf('/tao-you');
    const isWhiteRoute = whiteRoutesName.indexOf(to.name);
    // 将fromUrl使用localStorage存起来
    if (isWhiteRoute !== -1 && isTaoYou === 0) {
      localStorage.setItem('Q_from_url', window.encodeURIComponent(window.location.href));
    }
    if (isWhiteRoute === -1 && isTaoYou === 0) {
      const nextUrl = window.location.hash.slice(1);
      next(false);
      // 将路由的参数使用localStorage存起来
      localStorage.setItem('Q_next_url', nextUrl);
      localStorage.setItem('Q_from_url', window.encodeURIComponent(window.location.href));
      if (localStorage.getItem('app') == 1) {
        window.dsBridge &&
          window.dsBridge.call('getSign', {}, function (res) {
            let params = {};
            if (typeof res === 'string') {
              try {
                params = JSON.parse(res);
                console.log(params);
              } catch (ex) {
                console.log(ex);
              }
            }
            Vue.ClientHttp(this)
              .GET(
                { sign: params.a, time: params.b, mac: params.c, v: new Date().getTime() },
                Vue.ClientUrl.weclient_auto_login,
              )
              .then((result) => {
                console.log('main.js:result');
                console.log(result);
                console.log(result.code);
                if (result.code == 10000) {
                  localStorage.setItem('login', 1);
                  localStorage.setItem('uID', result.result.userId);
                  next();
                } else {
                  router.push({
                    name: 'TaoYouUserLogin',
                    query: {
                      mID: localStorage.getItem('mID') || 8,
                      app: localStorage.getItem('app'),
                      sign: params.sign,
                      time: params.time,
                      mac: params.mac,
                    },
                  });
                }
              });
          });
        return;
      }
      router.push({
        name: 'TaoYouUserLogin',
        query: {
          mID: localStorage.getItem('mID') || 8,
          // nextUrl: nextUrl,
          // fromUrl: window.encodeURIComponent(window.location.href)
        },
        replace: true,
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to, from, next) => {
  // 统计处理
  try {
    const viewID = to.params.id || '';
    localStorage.setItem('viewID', viewID);
    // 页面的统计
    try {
      throwPoint(pageMap[to.name], localStorage.getItem('uID'), viewID);
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
  // 微信登录的处理
  try {
    if (to.query.from === 'wechat') {
      localStorage.setItem('login', 1);
    }
  } catch (e) {
    console.log(e);
  }
  // 微信登录的处理
  localStorage.removeItem('USER_LOGIN');
  const query = to.query || {};
  if (query.hasOwnProperty('mID')) {
    window.mID = query.mID;
    localStorage.setItem('mID', query.mID);
  }
  // 添加adID
  if (query.hasOwnProperty('adID')) {
    window.adID = query.adID;
    localStorage.setItem('adID', query.adID);
  }
  // 一元夺宝页面
  const flag1 = to.path.indexOf('/tao-you') == 0;
  // console.log(flag1 , flag2, to.path);
  if (flag1) {
    wx.ready(() => {
      // 修复分享参数的问题
      let shareUrl;
      if (to.query.shareFrom === 'wechat') {
        shareUrl = window.location.href;
      } else {
        shareUrl = encodeURI(`${window.location.href}?shareFrom=wechat`);
      }
      // 分享的文案
      const shareInfo = {
        title: '淘游助手', // 分享标题
        link: shareUrl, // 分享链接
        desc: '畅玩游戏领好礼，淘游等你来体验',
        imgUrl: `${window.location.origin}/static/images/share/tao-you-logo.jpg`,
      };
      // 分享到朋友圈
      wx.onMenuShareTimeline(shareInfo);
      wx.onMenuShareAppMessage(shareInfo);
      wx.onMenuShareQQ(shareInfo);
      wx.onMenuShareWeibo(shareInfo);
      wx.onMenuShareQZone(shareInfo);
    });
  }
});

// 获取全局ROUTER
window.ROUTER = router;
// 全局变量
window.default = {};
Vue.set(window.default, 'REWARD_STATUS', false);

export default router;
