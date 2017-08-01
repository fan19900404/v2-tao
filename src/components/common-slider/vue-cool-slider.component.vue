<!-- author: dreamapple -->
<template>
  <div class="slider-container">
    <div @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" class="slider">
      <ul :style="sliderObj" class="slider__wrapper">
        <li :style="singleObj" v-for="(v,index) in sliderImages" :key="index" class="slider__single">
          <img :src="v.imgUrl" class="slider__img">
        </li>
      </ul>
    </div>
    <hr>
    <button @click="left">left{{curShowId}}</button>
    <button @click="right">right</button>
  </div>
</template>

<script>
export default {
  props: {
    sliderImages: {
      type: Array,
    },
    sliderHeight: {
      type: String,
      default: '20rem',
    },
  },
  data() {
    return {
      sliderWidth: 3000,
      singleWidth: 360,
      totalItems: 4,
      curShowId: 0,
      oldCurXMove: 0,
      curXMove: 0,
      threshold: 30,
      xDistance: 0,
      startPoint: {
        x: 0,
        y: 0,
      },
      endPoint: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    sliderObj() {
      return {
        width: `${this.sliderWidth}px`,
        height: this.sliderHeight,
        transform: `translateX(${this.curXMove}px)`,
      };
    },
    singleObj() {
      return {
        width: `${this.singleWidth}px`,
      };
    },
  },
  methods: {
    handleTouchStart(e) {
      this.startPoint.x = e.changedTouches[0].clientX;
    },
    handleTouchMove(e) {
      this.curXMove = this.oldCurXMove + (e.changedTouches[0].clientX - this.startPoint.x);
    },
    handleTouchEnd(e) {
      let distance = 0;
      let direction = 1;
      this.endPoint.x = e.changedTouches[0].clientX;
      this.xDistance = this.endPoint.x - this.startPoint.x;
      direction = this.xDistance > 0 ? 1 : -1;
      distance = this.singleWidth * direction;
      if (Math.abs(this.xDistance) >= this.threshold) {
        if (this.curShowId >= 0 && this.curShowId < this.totalItems) {
          if (this.curShowId === 0 && distance > 0) {
            this.curXMove = 0;
            this.oldCurXMove = 0;
          } else if ((this.totalItems - 1 === this.curShowId) && distance < 0) {
            this.curXMove = this.oldCurXMove;
          } else {
            this.curXMove = this.oldCurXMove + distance;
            this.oldCurXMove = this.curXMove;
            this.curShowId += -direction;
          }
        } else {
          // TODO
        }
      } else {
        this.curXMove = this.oldCurXMove;
      }
    },
    left() {
      this.curXMove += 200;
    },
    right() {
      this.curXMove -= 200;
    },
  },
};
</script>

<style lang="scss" scoped>
/* 轮播的样式 */

.slider-container {}

.slider {
  position: relative;
  overflow: hidden;
  &__single {
    height: 100%;
    float: left;
  }
  &__img {
    height: 100%;
    width: 100%;
  }
}
</style>
