export default function(ctx) {
  "use strict";
  // 游戏中心统计
  // 轮播的统计
  try {
    // H5淘豆游戏页面底部button“开始游戏”按钮
    $('.JS-statistics-our-game-begain').each(function(index, item) {
      item.setAttribute('data-point', '1H0001');
    });
    //  H5淘豆游戏页面基本信息版块“参赛规则”按钮
    $('.JS-statistics-our-game-jion').each(function(index, item) {
      item.setAttribute('data-point', '1H0008');
    });
    // H5淘豆比赛页面游戏介绍版块横切
    $('.JS-statistics-our-game-sec').each(function(index, item) {
      item.setAttribute('data-point', '1H0009');
    });
  } catch(e) {
    console.log(e);
  }
}
