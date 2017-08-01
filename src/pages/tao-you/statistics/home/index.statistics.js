export default function(ctx) {
  try {
    "use strict";
    // 首页进入游戏中心的按钮 虽然只有一个元素，我们还是可以这样使用
    $('.JS-statistics-enter-game-center').each(function(index, item) {
      item.setAttribute('data-point', '1A1000');
    });
    // 首页的轮播图(不知道具体的个数) 而且需要等到后端返回数据在统计
    ctx.$watch('gameHot.slider', function(newValue) {
      if(newValue.length !== 0) {
        $('.JS-statistics-swipe-wrapper .JS-statistics-swipe .JS-statistics-swipe-link').each(function(index, item) {
          item.setAttribute('data-point', '1A100' + (index + 1));
        });
      }
    });
    // 轮播图下面的通知
    ctx.$watch('notices', function(newValue) {
      // 注意重复部分的处理
      let len = newValue.length;
      if(len !== 0) {
        $('.JS-statistics-notice .JS-statistics-notice-link').each(function(index, item) {
          item.setAttribute('data-point', '1A200' + ((index % len) + 1));
        });
      }
    });
    // 热门游戏的统计
    ctx.$watch('gameHot.gameList', function(newValue) {
      if(newValue.length !== 0) {
        $('.JS-statistics-hot-game').each(function(index, item) {
          item.setAttribute('data-point', '1A3' + (index + 1).toString().padStart(3, '0'));
        })
      }
    });
    // 更多小游戏的按钮
    $('.JS-statistics-more-game').each(function(index, item) {
      item.setAttribute('data-point', '1A4000');
    });
    // 更多小游戏的统计
    ctx.$watch('playGameList', function(newValue) {
      let len = newValue.length;
      if(len !== 0) {
        $('.JS-statistics-light-game').each(function(index, item) {
          item.setAttribute('data-point', '1A400' + (index * 2 + 1));
        });
        $('.JS-statistics-light-game-play').each(function(index, item) {
          item.setAttribute('data-point', '1A400' + ((index + 1) * 2));
          // 适用于添加了stop属性的元素
          window.forceThrowPoint(item);
        });
      }
    });
    // 广告位置的统计
    $('.JS-statistics-ad').each(function(index, item) {
      item.setAttribute('data-point', '1A5000');
    });
    // 热门资讯的统计
    ctx.$watch('newsList', function(newValue) {
      if(newValue.length !== 0) {
        $('.JS-statistics-news').each(function(index, item) {
          item.setAttribute('data-point', '1A6' + (index + 1).toString().padStart(3, '0'));
        });
      }
    });
    // 底部菜单兰
    let menuPoints = ['1A0001','1A0002', '1A0003', '1A0004'];
    $('.JS-statistics-menus .JS-statistics-menu').each(function(index, item) {
      item.setAttribute('data-point', menuPoints[index]);
    });
  } catch(e) {
    console.log(e);
  }
}
