/**
 * 适用于获取屏幕宽度等分设置html的font-size情况，比如 flexible.js库
 * 参考 《淘宝flexible.js漏洞修补》http://www.jianshu.com/p/7064613bf9f8
 * 计算最终html font-size
 *
 * @returns {void}
 */
function modifileRootRem() {
  const root = window.document.documentElement;
  const fontSize = parseFloat(root.style.fontSize);
  const finalFontSize = parseFloat(window.getComputedStyle(root).getPropertyValue('font-size'));
  if (finalFontSize === fontSize) return;
  root.style.fontSize = `${fontSize + (fontSize - finalFontSize)}px`;
}

/**
 * 获取窗口宽度
 *
 * @returns {number}
 */
function screenWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

/**
 * 计算根的font-size
 *
 * @param {number} [multiple=1] 放大倍数
 */
const flexBox = (multiple=1) => {
  /** {number} 浏览器窗口宽度 */
  const width = screenWidth();
  let fontSize = width / 7.5;
  if (width >= 640 || fontSize < 50) {
    // pc端也是按照小屏幕显示
    fontSize = 50;
  }
  fontSize *= multiple;
  document.documentElement.style.fontSize = `${fontSize}px`;
  modifileRootRem();
};

export default flexBox;
