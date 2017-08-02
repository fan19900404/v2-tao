"use strict";
export default function(ctx) {
  try {
    $('.JS-statistics-get')[0] && $('.JS-statistics-get')[0].setAttribute('data-point', '1C5001'); // “淘豆比赛”按钮
    $('.JS-statistics-intro')[0] && $('.JS-statistics-intro')[0].setAttribute('data-point', '1C5002'); // “淘豆比赛”按钮

    ctx.$watch('ticketList', function(newValue) {
      if (newValue.length !== 0) {
        $('.JS-statistics-list').find('.JS-statistics-exchange').each(function(index, item) {
          item.setAttribute('data-point', '1C5' + (index + 3).toString().padStart(3, '0'));
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};