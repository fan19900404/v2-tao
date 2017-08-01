<template>
  <div class="carousel--wrapper" :style="carouselWrapperStyle">
    <div @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @touchcancncel="touchend" v-touch:pinchstart="touchstart" v-touch:panstart="handleItStart" v-touch:panmove="handleItMove" :style="style" v-touch-options:pan="{ threshold: 5}" @click="linkTo(v.link)" class="carousel">
      <a :href="v.link" v-for="(v,index) in carouselData" :key="index">
        <div v-show="0 !== carouselData.length" :style="carouselItemStyle" class="carousel--item">
          <img v-touch:tap="linkTo(v.link)" @load="getImageHeight" :style="imgStyle" class="carousel--image" :src="v.imgUrl" alt="">
          <span :style="gameNameStyle" class="game--name">{{v.name}}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.game--name {
  position: absolute;
  left: 0;
  bottom: 0;
  text-align: center;
  font-size: .12rem;
  background-color: #000000;
  opacity: 0.7;
  height: .235rem;
  line-height: .235rem;
  color: #fff;
}

.carousel--wrapper {
  display: block;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.carousel {
  display: block;
  position: absolute;
}

.carousel--item {
  float: left;
  display: block;
  position: relative;
}

.carousel--image {
  display: block;
}
</style>

<script>
export default {
  props: {
    rightGapWidth: {
      type: String,
      default: '.16rem',
    },
    gapWidth: {
      type: String,
      default: '.1rem',
    },
    carouselWrapperStyle: {
      type: Object,
      default() {
        return {
          backgroundColor: '#ffffff',
        };
      },
    },
    carouselItemStyle: {
      type: Object,
      default() {
        return {
          width: '1.25rem',
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
      // 间隔的宽度
      metaGapWidth: 0,
      // 右边的间隔
      rightGapWidth: 0,
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
      // 上下滑动
      curScrollTop: 0,
      // 判断是上下滑动还是左右滑动
      direction: 0,
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
        width: `${this.carouselNum * this.metaWidth + Math.abs(this.rightGapWidth - this.metaGapWidth)}px` || 0,
        height: '100%',
      };
    },
    // 可以向左滑动距离的阀值
    throttle() {
      return this.rightGapWidth - this.metaGapWidth > 0
        ? (this.deviceWidth - this.rightGapWidth) - (this.carouselNum * this.metaWidth + Math.abs(this.rightGapWidth - this.metaGapWidth))
        : (this.deviceWidth - this.rightGapWidth) - (this.carouselNum * this.metaWidth - Math.abs(this.rightGapWidth - this.metaGapWidth));
    },
    // 图片的样式
    imgStyle() {
      return {
        width: `${this.metaWidth - this.metaGapWidth}px`,
        marginRight: `${this.metaGapWidth}px`,
      };
    },
    gameNameStyle() {
      return {
        width: `${this.metaWidth - this.metaGapWidth}px`,
      };
    },
  },
  methods: {
    // 链接
    linkTo(link) {
      window.location.href = link;
    },
    // 处理上下滑动页面不动
    handleItStart(e) {
      // up: 8; down: 16
      this.curScrollTop = document.querySelector('body').scrollTop;
      if (e.direction === 8 || e.direction === 16) {
        this.direction = 1;
      } else {
        this.direction = 0;
      }
    },
    handleItMove(e) {
      if (this.direction === 1) {
        window.scrollTo(0, this.curScrollTop - e.deltaY);
      }
    },
    // 轮播间隔
    getMetaGapWidth() {
      this.metaGapWidth = this.transformWidth(this.gapWidth);
      this.rightGapWidth = this.transformWidth(this.rightGapWidth);
    },
    // 转换单位
    transformWidth(width) {
      let tWidth = width;
      if (width.indexOf('px') !== -1) {
        tWidth = parseInt(width);
      } else if (width.indexOf('rem') !== -1) {
        tWidth = parseInt(parseFloat(width) * this.getHtmlFontSize());
      } else if (width.indexOf('%') !== -1) {
        tWidth = parseInt(parseFloat(width) * this.deviceWidth / 100);
      } else {
        // TODO
      }
      return tWidth;
    },
    // 获取图片高度
    getImageHeight() {
      const ele = document.querySelector('.carousel--image');
      const height = ele.offsetHeight;
      this.style.height = `${height}px`;
      this.carouselWrapperStyle.height = `${height}px`;
    },
    // 添加transition效果
    addTransition() {
      this.style.transition = 'left .36s ease-out';
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
      console.log(fontSize, 23);
      return fontSize;
    },
    // 获取滑动单个项目的宽度
    getMetaWidth() {
      let width = this.carouselItemStyle.width;
      console.log(this.carouselItemStyle.width, 244);
      width = this.transformWidth(width);
      console.log(width, 222);
      this.metaWidth = width;
      this.carouselItemStyle.width = `${width}px`;
    },
    // 滑动开始
    touchstart(e) {
      // prevent default
      //        e.preventDefault();

      this.removeTransition();
      this.moveBefore = e.targetTouches[0].clientX;
      this.moveFlag = e.targetTouches[0].clientX - this.position.moveDis;
    },
    // 滑动进行
    touchmove(e) {
      // prevent default
      e.preventDefault();

      if (this.direction === 0) {
        this.removeTransition();
        this.movingFlag = e.targetTouches[0].clientX;
        this.position.moveDis = this.movingFlag - this.moveFlag;
      }
    },
    // 滑动结束
    touchend(e) {
      // prevent default
      e.preventDefault();

      if (this.direction === 0) {
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
          const moveDis = Math.abs(this.moveAfter - this.moveBefore);
          const dis = Math.abs(this.position.moveDis % this.metaWidth);
          var n = Math.abs(Math.floor(this.position.moveDis / this.metaWidth));
          const halfDis = this.metaWidth / 2;

          if (moveDis < halfDis) {
            console.log('移动较小的距离');
            // 移动的距离小于一半
            if (this.moveDirect === 'left') {
              this.position.moveDis += moveDis;
            } else {
              // 移动到右侧最大距离了,然后返回
              if (this.moveToRight) {
                this.position.moveDis = this.throttle;
              } else {
                this.position.moveDis -= moveDis;
              }
            }
          } else {
            console.log('移动较大的距离');
            // 移动的距离大于一半
            if (this.moveDirect === 'left') {
              this.position.moveDis = this.position.moveDis - (this.metaWidth - moveDis);
            }
            // 向右移动
            else if (this.moveToRight) {
              this.removeTransition();
              this.moveToRight = false;
              // 滑动到最后然后向右滑动的一个修复
              var n = Math.floor((this.deviceWidth - this.rightGapWidth) / this.metaWidth);
              n += 1;
              if (this.carouselNum > n) {
                this.position.moveDis = -(this.carouselNum - n) * this.metaWidth;
                this.addTransition();
              }
            } else {
              this.position.moveDis = this.position.moveDis + (this.metaWidth - moveDis);
            }
          }
          if (this.position.moveDis <= this.throttle) {
            this.position.moveDis = this.throttle;
            this.moveToRight = true;
          }
        }
        // 吸附效果
        this.addTransition();
      }
    },
  },
  mounted() {
    // 获取轮播条单个项目的宽度
    this.getMetaWidth();
    // 获取间隔的宽度
    this.getMetaGapWidth();
    const that = this;
    window.onresize = function () {
      that.deviceWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    };
    // 更新字体
    this.fontSize = this.getHtmlFontSize();
  },
};
</script>
