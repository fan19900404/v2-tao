export default function(ctx) {
  "use strict";
  try{
    // 联运网游页面底部button“开始游戏”按钮
    $('.JS-statistics-enter-game-begain').each(function(index, item) {
      item.setAttribute('data-point', '1F0001');
    });
    ctx.$watch('pd',function () {
      if(ctx.pd.type===1){
        // 1F0008 H5联运网游页面游戏介绍版块横切
        $('.JS-statistics-enter-game-section').each(function(index, item) {
          item.setAttribute('data-point', '1F0008');
        });
        // 分享按钮
        if ($('.JS-statistics-share-button').length > 0) {
          $('.JS-statistics-share-button')[0].setAttribute('data-point', '1F0002');
          forceThrowPoint($('.JS-statistics-share-button')[0]);
        }
        ctx.$on('share', (step) => {
          if (step == 1) {
          setTimeout(() => {

          // 分享页面“微信”按钮
          if ($('.JS-statistics-share-weixin').length > 0) {
            $('.JS-statistics-share-weixin')[0].setAttribute('data-point', '1F0003');
            forceThrowPoint($('.JS-statistics-share-weixin')[0]);
          }

          // 分享页面“微博”按钮
          if ($('.JS-statistics-share-weibo').length > 0) {
            $('.JS-statistics-share-weibo')[0].setAttribute('data-point', '1F0004');
            forceThrowPoint($('.JS-statistics-share-weibo')[0]);
          }

          // 分享页面“QQ”按钮
          if ($('.JS-statistics-share-qq').length > 0) {
            $('.JS-statistics-share-qq')[0].setAttribute('data-point', '1F0005');
            forceThrowPoint($('.JS-statistics-share-qq')[0]);
          }

          // 分享页面“取消”按钮
          if ($('.JS-statistics-share-cancel').length > 0) {
            $('.JS-statistics-share-cancel')[0].setAttribute('data-point', '1F0006');
            forceThrowPoint($('.JS-statistics-share-cancel')[0]);
          }

          // 除以上4个按钮外的空白位置
          if ($('.JS-statistics-share-other').length > 0) {
            $('.JS-statistics-share-other')[0].setAttribute('data-point', '1F0007');
            forceThrowPoint($('.JS-statistics-share-other')[0]);
          }
        }, 100);
        }
        return true;
      });
      }
      if(ctx.pd.type===2){
        // 1G0007 手游页面游戏介绍版块横切
        $('.JS-statistics-enter-game-section').each(function(index, item) {
          item.setAttribute('data-point', '1G0007');
        });
        // 分享按钮
        $('.JS-statistics-share-button')[0].setAttribute('data-point', '1G0001 ');
            if ($('.JS-statistics-share-button').length > 0) {
            forceThrowPoint($('.JS-statistics-share-button')[0]);
          }
        ctx.$on('share', (step) => {
          if (step == 1) {
          setTimeout(() => {

          // 分享页面“微信”按钮
          if ($('.JS-statistics-share-weixin').length > 0) {
            $('.JS-statistics-share-weixin')[0].setAttribute('data-point', '1G0002 ');
            forceThrowPoint($('.JS-statistics-share-weixin')[0]);
          }

          // 分享页面“微博”按钮
          if ($('.JS-statistics-share-weibo').length > 0) {
            $('.JS-statistics-share-weibo')[0].setAttribute('data-point', '1G0003 ');
            forceThrowPoint($('.JS-statistics-share-weibo')[0]);
          }

          // 分享页面“QQ”按钮
          if ($('.JS-statistics-share-qq').length > 0) {
            $('.JS-statistics-share-qq')[0].setAttribute('data-point', '1G0004 ');
            forceThrowPoint($('.JS-statistics-share-qq')[0]);
          }

          // 分享页面“取消”按钮
          if ($('.JS-statistics-share-cancel').length > 0) {
            $('.JS-statistics-share-cancel')[0].setAttribute('data-point', '1G0005 ');
            forceThrowPoint($('.JS-statistics-share-cancel')[0]);
          }

          // 除以上4个按钮外的空白位置
          if ($('.JS-statistics-share-other').length > 0) {
            $('.JS-statistics-share-other')[0].setAttribute('data-point', '1G0006');
            forceThrowPoint($('.JS-statistics-share-other')[0]);
          }
        }, 100);
        }
        return true;
      });
      }
    })
  }catch(e){
    console.log(e);
  }
}
