export default function(ctx) {
  "use strict";
  // 游戏中心统计
  // 轮播的统计
  try {
    ctx.$watch('swiperList', function(newValue) {
      if(newValue.length !== 0) {
        $('.JS-statistics-swipe-wrapper .JS-statistics-swipe .JS-statistics-swipe-link').each(function(index, item) {
          item.setAttribute('data-point', '1B100' + (index + 1));
        });
      }
    });
    // 轮播图下面的通知
    ctx.$watch('notices', function(newValue) {
      // 注意重复部分的处理
      let len = newValue.length;
      if(len !== 0) {
        $('.JS-statistics-notice .JS-statistics-notice-link').each(function(index, item) {
          item.setAttribute('data-point', '1B200' + ((index % len) + 1));
        });
      }
    });
    // 更多小游戏的按钮
    $('.JS-statistics-more-game').each(function(index, item) {
      item.setAttribute('data-point', '1B3000');
    });
    // 更多小游戏的统计 (急速场)
    ctx.$watch('recommendGameListQuick', function(newValue) {
      let len = newValue.length;
      if(len !== 0) {
        $('.JS-statistics-light-game').each(function(index, item) {
          item.setAttribute('data-point', '1B300' + (index * 2 + 1));
        });
        $('.JS-statistics-light-game-play').each(function(index, item) {
          item.setAttribute('data-point', '1B300' + ((index + 1) * 2));
          // 适用于添加了stop属性的元素
          window.forceThrowPoint(item);
        });
      }
    });
    // 普通场
    ctx.$watch('recommendGameListCommon', function(newValue) {
      let len = newValue.length;
      if(len !== 0) {
        $('.JS-statistics-light-game').each(function(index, item) {
          item.setAttribute('data-point', '1B300' + ((index + 3) * 2 + 1));
        });
        $('.JS-statistics-light-game-play').each(function(index, item) {
          item.setAttribute('data-point', '1B300' + (((index + 3) + 1) * 2));
          // 适用于添加了stop属性的元素
          window.forceThrowPoint(item);
        });
      }
    });
    // H5游戏
    ctx.$watch('h5TopList', function(newValue) {
      let len = newValue.length;
      if(len !== 0) {
        $('.JS-statistics-h5-game').each(function(index, item) {
          item.setAttribute('data-point', '1B400' + (index * 2 + 1));
        });
        $('.JS-statistics-h5-game-play').each(function(index, item) {
          item.setAttribute('data-point', '1B400' + ((index + 1) * 2));
          // 适用于添加了stop属性的元素
          window.forceThrowPoint(item);
        });
      }
    });
    // 手游
    ctx.$watch('mobileTopList', function(newValue) {
      let len = newValue.length;
      if(len !== 0) {
        $('.JS-statistics-mobile-game').each(function(index, item) {
          item.setAttribute('data-point', '1B600' + (index * 2 + 1));
        });
        $('.JS-statistics-mobile-game-play').each(function(index, item) {
          item.setAttribute('data-point', '1B600' + ((index + 1) * 2));
          // 适用于添加了stop属性的元素
          window.forceThrowPoint(item);
        });
      }
    });
    // 全部游戏
    ctx.$watch('allGameList', function(newValue) {
      let len = newValue.length;
      if(len !== 0) {
        $('.JS-statistics-all-game').each(function(index, item) {
          item.setAttribute('data-point', '1B7' + (index * 2 + 1).toString().padStart(3, '0'));
        });
        $('.JS-statistics-all-game-play').each(function(index, item) {
          item.setAttribute('data-point', '1B7' + ((index + 1) * 2).toString().padStart(3, '0'));
          // 适用于添加了stop属性的元素
          window.forceThrowPoint(item);
        });
      }
    });
    // 广告位置的统计
    $('.JS-statistics-ad').each(function(index, item) {
      item.setAttribute('data-point', '1B500' + (index + 1));
    });
    // 底部菜单兰
    $('.JS-statistics-menus .JS-statistics-menu').each(function(index, item) {
      item.setAttribute('data-point', '1B000' + (index + 1));
    });
  } catch(e) {
    console.log(e);
  }
}
