import $ from 'jquery';

export default function() {
  "use strict";
  let api = 'http://analytics.lly800.com/api/point';
  let cache = {};
  window.throwPoint = function (point, user, view) {
    if (!point) {
      return false;
    }
    user = user || '';
    view = view || '';
    // 缓存 key
    let key = point + '-' + user + '-' + view;
    let it = cache[key];
    let now = +new Date();
    // 1秒只能发送1次
    if (it && it + 1000 > now) {
      return false;
    }
    cache[key] = now; // 记录提交时间
    if (point) {
      new Image().src = api + '?number=' + point + '&param1=' + user + '&param2=' + view;
    }
  };
  window.forceThrowPoint = function(ele) {
    $(ele).on('touchstart', function(e) {
      statistics(e);
    })
  };
  // 统计
  $(document).on('click', function(e) {
    statistics(e);
  });
  //
  function statistics(e) {
    try {
      // 获取点击的目标
      let target = e.target;
      // 获取target的pointID
      let number = target.dataset.point;
      if(!number) {
        number = $(target).closest('[data-point]')[0].dataset.point;
      }
      // 获取userId
      let uID = localStorage.getItem('uID') || '';
      let viewID = localStorage.getItem('viewID') || '';
      // 进行数据统计
      if(number) {
        throwPoint(number, uID, viewID);
        // 清楚viewID
        localStorage.removeItem('viewID');
      }
    } catch(e) {
      // TODO Nothing
    }
  }
};
