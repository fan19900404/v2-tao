// import home from './one-yuan-purchase/home.route'; // 首页的路由
// import agreement from './one-yuan-purchase/agreement.route'; // 服务协议 说明
// import goods from './one-yuan-purchase/goods.route'; // 关于商品 商品详情
// import moneyBusiness from './one-yuan-purchase/money-business.route'; // 金钱交易
// import personal from './one-yuan-purchase/personal.route'; // 个人中心
// import shareOrder from './one-yuan-purchase/share-order.route'; // 关于晒单部分
// import activity from './one-yuan-purchase/activity.route'; // 关于一些活动
// import welfare from './one-yuan-purchase/welfare.route'; // 关于用户的福利
// import announcement from './one-yuan-purchase/announcement.route'; // 关于揭晓部分

// 关于淘游助手的部分
// import tao_you_common from './tao-you/common.route';
import tao_you_home from './tao-you/home.route';
import tao_you_introduction from './tao-you/introduction.route';
// // import tao_you_personal from './tao-you/personal.route';
import tao_you_personalCenter from './tao-you/personal-center.route';
import tao_you_packs from './tao-you/packs.route.js';
// //vt游戏中心
import tao_you_gameCenterReplace from './tao-you/game-center-1.2.route';
import tao_you_gameCenter from './tao-you/game-center.route';
import tao_you_welfareShop from './tao-you/welfare-shop.route';
import tao_you_search from './tao-you/search-module.route';
import tao_you_activity from './tao-you/activity.route';
// 测试页面的路由
import tao_you_demo from './tao-you/demo.route';

// 测试使用的路由
// import _test from './one-yuan-purchase/_test.route';

const route = [
  ...tao_you_home,
  ...tao_you_introduction,
  ...tao_you_personalCenter,
  ...tao_you_welfareShop,
  ...tao_you_gameCenter,
  ...tao_you_gameCenterReplace,
  ...tao_you_demo,
  ...tao_you_search,
  ...tao_you_packs,
  ...tao_you_activity,
];

// Object.assign(route, home);
// Object.assign(route, agreement);
// Object.assign(route, goods);
// Object.assign(route, moneyBusiness);
// Object.assign(route, personal);
// Object.assign(route, shareOrder);
// Object.assign(route, activity);
// Object.assign(route, welfare);
// Object.assign(route, announcement);
// // 添加淘游助手
// Object.assign(route, tao_you_common);
// Object.assign(route, tao_you_home);
// Object.assign(route, tao_you_introduction);
// Object.assign(route, tao_you_personalCenter);
// Object.assign(route, tao_you_welfareShop);
// Object.assign(route, tao_you_gameCenter);
// Object.assign(route, tao_you_gameCenterReplace);
// Object.assign(route, tao_you_demo);
// Object.assign(route, tao_you_search);
// Object.assign(route, tao_you_packs);
// Object.assign(route, tao_you_activity);

// 测试使用
// Object.assign(route, _test);

export default route;
