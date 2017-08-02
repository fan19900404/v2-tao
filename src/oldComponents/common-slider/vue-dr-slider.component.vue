<template>
  <div class="carousel--wrapper" :style="carouselWrapperStyle">
    <div @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @touchcancncel="touchend" v-touch:pinchstart="touchstart" v-touch:tap="touchstart" :style="style" class="carousel">
      <div v-for="(v,index) in carouselData" :style="carouselItemStyle" class="carousel--item blue-bgc" :key="index">
        {{index}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel--wrapper {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.carousel {
  position: absolute;
}

.carousel--item {
  float: left;
}
</style>

<script>
export default {
  props: {
    carouselWrapperStyle: {
      type: Object,
      default() {
        return {
          height: '10rem',
          backgroundColor: '#ffffff',
        };
      },
    },
    carouselItemStyle: {
      type: Object,
      default() {
        return {
          width: '12.5rem',
          height: '10rem',
          boxSizing: 'border-box',
        };
      },
    },
    carouselData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // 设备的宽度
      deviceWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      // 设备的html字体大小
      fontSize: 12,
      // 每一个item的宽度
      metaWidth: 0,

      metaGapWidth: 2,
      moveDis: 0,
      moveFlag: 0,
      movingFlag: 0,
      moveDirect: null,
      // 判断滑动方向
      moveBefore: 0,
      moveAfter: 0,
      // 判断是否达到右侧
      moveToRight: false,
      test: null,
      // 缓冲动画
      tween: null,
      tweenInit: 0,
      position: {
        moveDis: 0,
      },
    };
  },
  computed: {
    // 轮播的数量
    carouselNum() {
      return this.carouselData.length || 0;
    },
    // 轮播的样式动态改变的
    style() {
      return {
        left: `${this.position.moveDis}px`,
        transition: null,
        width: `${this.carouselNum * this.metaWidth}px` || 0,
        height: this.carouselItemStyle.height,
      };
    },
    // 可以向左滑动距离的阀值
    throttle() {
      return this.deviceWidth - (this.carouselNum * this.metaWidth);
    },
  },
  methods: {
    // 添加transition效果
    addTransition() {
      this.style.transition = 'left .5s ease-out';
    },
    // 移除transition效果
    removeTransition() {
      this.style.transition = null;
    },
    // 获取设备的字体
    getHtmlFontSize() {
      const html = document.querySelector('html');
      const style = window.getComputedStyle(html, null).getPropertyValue('font-size');
      const fontSize = parseFloat(style);
      return fontSize;
    },
    // 获取滑动单个项目的宽度
    getMetaWidth() {
      let width = this.carouselItemStyle.width;
      console.log(width);
      if (width.indexOf('px') !== -1) {
        width = parseInt(width);
      } else if (width.indexOf('rem') !== -1) {
        width = parseInt(parseFloat(width) * this.getHtmlFontSize());
      } else if (width.indexOf('%') !== -1) {
        width = parseInt(parseFloat(width) * this.deviceWidth / 100);
      } else {
        // TODO
      }
      this.metaWidth = width;
    },
    // 滑动开始
    touchstart(e) {
      this.removeTransition();
      this.moveBefore = e.targetTouches[0].clientX;
      this.moveFlag = e.targetTouches[0].clientX - this.position.moveDis;
    },
    // 滑动进行
    touchmove(e) {
      this.removeTransition();
      this.movingFlag = e.targetTouches[0].clientX;
      this.position.moveDis = this.movingFlag - this.moveFlag;
    },
    // 滑动结束
    touchend(e) {
      this.removeTransition();
      // 判断移动方向
      this.moveAfter = e.changedTouches[0].clientX;
      this.moveDirect = this.moveAfter - this.moveBefore > 0 ? 'right' : 'left';

      if (this.position.moveDis >= 0) {
        this.position.moveDis = 0;
      } else if (this.position.moveDis <= this.throttle) {
        this.position.moveDis = this.throttle;
        this.moveToRight = true;
      } else {
        // TODO
        let moveDis = Math.abs(this.moveAfter - this.moveBefore);
        const dis = Math.abs(this.position.moveDis % this.metaWidth);
        const n = Math.abs(Math.floor(this.position.moveDis / this.metaWidth));
        const halfDis = this.metaWidth / 2;

        if (this.moveToRight) {
          this.moveToRight = false;
          moveDis += this.deviceWidth % this.metaWidth;
        }

        if (moveDis < halfDis) {
          // 移动的距离小于一半
          if (this.moveDirect === 'left') {
            this.position.moveDis += moveDis;
          } else {
            this.position.moveDis -= moveDis;
          }
        } else {
          // 移动的距离大于一半
          if (this.moveDirect === 'left') {
            this.position.moveDis = this.position.moveDis - (this.metaWidth - moveDis);
          } else {
            this.position.moveDis = this.position.moveDis + (this.metaWidth - moveDis);
          }
        }
        if (this.position.moveDis <= this.throttle) {
          this.position.moveDis = this.throttle;
          this.moveToRight = true;
        }
      }
      this.addTransition();
      // 吸附效果
    },
  },
  mounted() {
    // 获取轮播条单个项目的宽度
    this.getMetaWidth();
    const that = this;
    window.onresize = function () {
      that.deviceWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    };
    // 更新字体
    this.fontSize = this.getHtmlFontSize();
  },
};
</script>
