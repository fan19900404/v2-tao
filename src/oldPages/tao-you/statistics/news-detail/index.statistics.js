export default function(ctx) {
  "use strict";
  try{
    // 新闻资讯页，底部发表按钮
    $('.JS-statistics-news-detail-common').each(function(index, item) {
      item.setAttribute('data-point', '1E0001 ');
    });
    // 新闻资讯页，底部分享按钮
    $('.JS-statistics-news-detail-share').each(function(index, item) {
      item.setAttribute('data-point', '1E0002');
    });
    // 新闻资讯页，资讯内容
    $('.JS-statistics-news-detail-Content').each(function(index, item) {
      item.setAttribute('data-point', '1E0003');
    });
    // 新闻资讯页，更多评论按钮
    $('.JS-statistics-news-detail-MoreCommon').each(function(index, item) {
      item.setAttribute('data-point', '1E1000 ');
    });
    // 新闻资讯页，评论按钮
    $('.JS-statistics-news-detail-cos').each(function(index, item) {
      item.setAttribute('data-point', '1E1001 ');
    });
    // 咨询页面评论，暂为4条
    ctx.$watch('commonlist', function(newValue) {
      if(newValue.length !== 0) {
        let commonPoints = ['1E1002','1E1003', '1E1004', '1E1005'];
        $('.JS-statistics-news-detail-each').each(function(index, item) {
          item.setAttribute('data-point', commonPoints[index]);
        });
      }
    });
    // 咨询页面相关资讯，暂为2条
    ctx.$watch('relatedList', function(newValue) {
      if(newValue.length !== 0) {
        let commonPoints = ['1E2001','1E2002', '1E2003', '1E2004'];
        $('.JS-statistics-news-detail-self-li').each(function(index, item) {
          item.setAttribute('data-point', commonPoints[index]);
        });
      }
    });
  }catch(e){
    console.log(e);
  }
  //**********************************************************************************
}
