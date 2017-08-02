"use strict";
export default function(ctx) {
  try {
    $('.JS-statistics-charge')[0] && $('.JS-statistics-charge')[0].setAttribute('data-point', '1C2005'); // “充值”按钮
  } catch (e) {
    console.log(e);
  }
};