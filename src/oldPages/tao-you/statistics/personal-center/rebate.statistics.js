"use strict";
export default function(ctx) {
  try {
    $('.JS-statistics-exchange')[0] && $('.JS-statistics-exchange')[0].setAttribute('data-point', '1C7001'); // “兑换抵扣券”按钮
    $('.JS-statistics-intro')[0] && $('.JS-statistics-intro')[0].setAttribute('data-point', '1C7002'); // “使用说明”
  } catch (e) {
    console.log(e);
  }
};