"use strict";
export default function(ctx) {
  try {

    // 用户信息
    $('.JS-statistics-baseinfo')[0] && $('.JS-statistics-baseinfo')[0].setAttribute('data-point', '1C1000'); // 信息版块横切
    $('.JS-statistics-avatar')[0] && $('.JS-statistics-avatar')[0].setAttribute('data-point', '1C1001'); // 信息版块“头像”横切
    $('.JS-statistics-name')[0] && $('.JS-statistics-name')[0].setAttribute('data-point', '1C1002'); // 信息版块“昵称”横切

    // 货币版块
    $('.JS-statistics-without-charge')[0] && $('.JS-statistics-without-charge')[0].setAttribute('data-point', '1C2001'); // 除“充值”按钮以外的模块
    $('.JS-statistics-charge')[0] && $('.JS-statistics-charge')[0].setAttribute('data-point', '1C2002'); // “充值”按钮
    $('.JS-statistics-without-exchange')[0] && $('.JS-statistics-without-exchange')[0].setAttribute('data-point', '1C2003'); // 除“兑换”按钮以外的模块
    $('.JS-statistics-exchange')[0] && $('.JS-statistics-exchange')[0].setAttribute('data-point', '1C2004'); // “兑换”按钮

    // 游戏版块
    ctx.$watch('gameList', function(newValue) {
      if (newValue.length !== 0) {
        $('.JS-statistics-more')[0] && $('.JS-statistics-more')[0].setAttribute('data-point', '1C3001'); // “更多游戏”按钮(图标)
      }
    });

    // 游戏板块下面的 列表项
    ctx.$watch('user.bindPhone', function (newValue) {
      $('.JS-statistics-bindPhone')[0] && $('.JS-statistics-bindPhone')[0].setAttribute('data-point', '1C4001'); // 绑定手机版块横切
    });
    $('.JS-statistics-shop')[0] && $('.JS-statistics-shop')[0].setAttribute('data-point', '1C4002'); // 福利商城版块横切
    $('.JS-statistics-myGift')[0] && $('.JS-statistics-myGift')[0].setAttribute('data-point', '1C6001'); // 礼包兑换版块横切
    $('.JS-statistics-service')[0] && $('.JS-statistics-service')[0].setAttribute('data-point', '1C6002'); // 客服中心版块横切
    $('.JS-statistics-myTickit')[0] && $('.JS-statistics-myTickit')[0].setAttribute('data-point', '1C6003'); // 我的抵扣券版块横切
    $('.JS-statistics-notice')[0] && $('.JS-statistics-notice')[0].setAttribute('data-point', '1C8000'); // 系统消息版块横切

    // 底部菜单兰
    let menuPoints = ['1C0001', '1C0002', '1C0003', '1C0004'];
    $('.JS-statistics-menus .JS-statistics-menu').each(function(index, item) {
      item.setAttribute('data-point', menuPoints[index]);
    });
  } catch (e) {
    console.log(e);
  }
};