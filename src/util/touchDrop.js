/**
 * 获取元素最终样式
 *
 * @param {any} elem dom元素
 * @returns
 */
function getComputedStyle(elem) {
  return document.defaultView.getComputedStyle(elem) || {};
}

/**
 * 拖拽方法（前提条件，元素已经是定位了）
 *
 * @class TouchDrop
 */
class TouchDrop {
  /**
   * 拖拽方法（前提条件，元素已经是定位了）
   *
   * @param {document} elem 需要拖拽的元素
   * @memberOf TouchDrop
   */
  constructor(elem) {
    this.elem = elem;
    this.relativeX = 0; // 相对图标左上角X轴
    this.relativeY = 0; // 相对图标右上角Y轴
    this.elem.addEventListener('touchstart', this.start.bind(this), false);
    this.elem.addEventListener('touchmove', this.move.bind(this), false);
  }

  /**
   * 开始拖拽时触发事件
   *
   *
   * @memberOf TouchDrop
   */
  start() {
    const left = +getComputedStyle(this.elem).left.slice(0, -2);
    const top = +getComputedStyle(this.elem).top.slice(0, -2);
    const clientX = event.touches[0].clientX;
    const clientY = event.touches[0].clientY;
    this.relativeX = clientX - left; // 相对图标左上角
    this.relativeY = clientY - top; // 相对图标右上角
  }

  /**
   * 拖拽移动是触发的事件
   *
   *
   * @memberOf TouchDrop
   */
  move() {
    event.preventDefault();
    this.elem.style.left = `${event.touches[0].clientX - this.relativeX}px`;
    this.elem.style.top = `${event.touches[0].clientY - this.relativeY}px`;
  }

  /**
   * 销毁事件监听
   *
   *
   * @memberOf TouchDrop
   */
  clear() {
    this.elem.removeEventListener('touchstart', this.start.bind(this), false);
    this.elem.removeEventListener('touchmove', this.move.bind(this), false);
  }
}

export default TouchDrop;
