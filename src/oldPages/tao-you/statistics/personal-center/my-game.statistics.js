"use strict";
export default function(ctx) {
  try {
    ctx.$watch('myGameList', function(newValue) {
      if (newValue.length !== 0) {
        $('.JS-statistics-list').find('.JS-statistics-item-without-open').each(function(index, item) {
          item.setAttribute('data-point', '1C3' + (2 * (index + 1)).toString().padStart(3, '0'));
        });

        $('.JS-statistics-list').find('.JS-statistics-open').each(function(index, item) {
          item.setAttribute('data-point', '1C300' + (2 * (index + 1) + 1).toString().padStart(3, '0'));
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};