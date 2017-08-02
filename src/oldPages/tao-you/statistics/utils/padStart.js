export default function () {
  "use strict";
  // 判断 padStart是否可用
  if (!String.prototype.padStart) {
    String.prototype.padStart = function (maxLength, fillString = ' ') {
      if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError('fillString must be String')
      let str = this;
      if (str.length >= maxLength) return String(str);
      let fillLength = maxLength - str.length,
        times = Math.ceil(fillLength / fillString.length);

      while (times >>= 1) {
        fillString += fillString;
        if (times === 1) {
          fillString += fillString
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
}
