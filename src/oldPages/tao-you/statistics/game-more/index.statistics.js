export default function(ctx) {
  "use strict";
  try{
    // 小游戏内页“参赛规则”按钮
    $('.JS-statistics-enter-game-rule').each(function(index, item) {
      item.setAttribute('data-point', '1D0001');
    });
    // 小游戏内页“明细”按钮
    $('.JS-statistics-game-more-detail').each(function(index, item) {
      item.setAttribute('data-point', '1D0002');
    });
    // 小游戏内页“淘豆兑换”按钮
    $('.JS-statistics-game-more-exchange').each(function(index, item) {
      item.setAttribute('data-point', '1D0003');
    });
    //小游戏内页极速场模块除“参赛”按钮
    ctx.$watch('quickGames', function(newValue) {
      if(newValue.length !== 0) {
        let menuPoints = ['1D1002','1D1005 ', '1D1008 ', '1D1011 ','1D1014'];
        $('.JS-statistics-enter-game-jion').each(function(index, item) {
          item.setAttribute('data-point', menuPoints[index]);
        });
      }
    });
    //小游戏内页极速场模块除“排名”按钮
    ctx.$watch('quickGames', function(newValue) {
      if(newValue.length !== 0) {
        let menuPoints = ['1D1003','1D1006 ', '1D1009 ', '1D10012 ','1D1015'];
        $('.JS-statistics-enter-game-rank').each(function(index, item) {
          item.setAttribute('data-point', menuPoints[index]);
        });
      }
    });
    //小游戏内页极速场模块除“排名”按钮,“参赛”按钮,以外的横切
    ctx.$watch('quickGames', function(newValue) {
      if(newValue.length !== 0) {
        let menuPoints = ['1D1001 ','1D1004 ', '1D1007 ', '1D1010 ','1D1013'];
        $('.JS-statistics-enter-game-space').each(function(index, item) {
          item.setAttribute('data-point', menuPoints[index]);
        });
      }
    });
    // 小游戏内页广告图片横切
    $('.JS-statistics-game-more-adv').each(function(index, item) {
      item.setAttribute('data-point', '1D2000');
    });
    //小游戏内页普通场模块“参赛”按钮
    ctx.$watch('normalGames', function(newValue) {
      if(newValue.length !== 0) {
        let menuPoints = ['1D3002','1D3005 ', '1D3008 ', '1D3011 ','1D3014'];
        $('.JS-statistics-enter-game-button').each(function(index, item) {
          item.setAttribute('data-point', menuPoints[index]);
        });
      }
    });
    //小游戏内页普通场模块“排名”按钮
    ctx.$watch('normalGames', function(newValue) {
      if(newValue.length !== 0) {
        let menuPoints = ['1D3003','1D3006 ', '1D3009 ', '1D3012 ','1D3015'];
        $('.JS-statistics-enter-game-button-rank').each(function(index, item) {
          item.setAttribute('data-point', menuPoints[index]);
        });
      }
    });
    //小游戏内页普通场模块除“排名”按钮,“参赛”按钮,以外的横切
    ctx.$watch('normalGames', function(newValue) {
      if(newValue.length !== 0) {
        let menuPoints = ['1D3001 ','1D3004 ', '1D3007 ', '1D3010 ','1D3013'];
        $('.JS-statistics-enter-game-button-space').each(function(index, item) {
          item.setAttribute('data-point', menuPoints[index]);
        });
      }
    });
  }catch(e){
    console.log(e);
  }
  //********************************************************************
}
