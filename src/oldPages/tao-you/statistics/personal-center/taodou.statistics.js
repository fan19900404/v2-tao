"use strict";
export default function(ctx) {
  try {
    $('.JS-statistics-match')[0] && $('.JS-statistics-match')[0].setAttribute('data-point', '1C2006'); // “淘豆比赛”按钮
    $('.JS-statistics-shop')[0] && $('.JS-statistics-shop')[0].setAttribute('data-point', '1C2007'); // “福利商城”按钮
  } catch (e) {
    console.log(e);
  }
};