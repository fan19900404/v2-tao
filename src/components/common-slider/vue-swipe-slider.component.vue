<!-- author: dreamapple -->
<template>
  <div class="slider-container">
    <div @touchstart="handleTouchStart"
         @touchmove="handleTouchMove"
         @touchend="handleTouchEnd"
         class="slider">
      <ul :style="sliderObj" class="slider__wrapper">
        <li :style="singleObj" v-for="(v,index) in sliderConfig" :key="index"
            class="slider__single">
          <a class="slider__link" :href="v.link">
            <img :src="v.imgUrl" class="slider__img">
          </a>
          <span class="slider__title">
            {{v.title}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      sliderConfig: {
        type: Array,
      },
      sliderHeight: {
        type: Number,
        default: 11,
      },
      singleWidth: {
        type: Number,
        default: 156,
      },
      sliderMarginPadding: {
        type: Number,
        default: 20,
      },
      sliderOuterPaddingLR: {
        type: Number,
        default: 32,
      },
      sliderOuterPaddingTB: {
        type: Number,
        default: 10,
      },
    },
    data() {
      return {
        clientWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
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
      totalItems() {
        return this.sliderConfig.length || 0;
      },
      sliderWidth() {
        let totalLength;
        totalLength = this.totalItems * this.singleWidth + 2 * this.sliderOuterPaddingLR + this.sliderMarginPadding * (this.totalItems - 1);
        return totalLength;
      },
      sliderRightThreshold() {
        return this.sliderWidth - this.clientWidth - this.sliderOuterPaddingLR - this.sliderMarginPadding;
      },
      sliderObj() {
        return {
          padding: `${this.sliderOuterPaddingTB / 20  }rem ${  this.sliderOuterPaddingLR / 20  }rem`,
          width: `${this.sliderWidth  }px`,
          height: `${this.sliderHeight  }rem`,
          transform: `translateX(${ this.curXMove }px)`,
        };
      },
      singleObj() {
        return {
          width: `${this.singleWidth  }px`,
          marginRight: `${this.sliderMarginPadding / 20  }rem`,
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
        let x;
        this.endPoint.x = e.changedTouches[0].clientX;
        this.xDistance = this.endPoint.x - this.startPoint.x;
        x = this.oldCurXMove + this.xDistance;
        if (-this.sliderRightThreshold <= x && x <= 0) {
          this.curXMove = this.oldCurXMove + this.xDistance;
          this.oldCurXMove = this.curXMove;
        }      else if (x > 0) {
          this.curXMove = 0;
          this.oldCurXMove = 0;
        }      else if (x < -this.sliderRightThreshold) {
          this.curXMove = -this.sliderRightThreshold;
          this.oldCurXMove = -this.sliderRightThreshold;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  /* 轮播的样式 */
  .slider-container {

  }
  .slider {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    &__single {
      height: 100%;
      position: relative;
      box-sizing: border-box;
      float: left;
    }
    &__img {
      position: relative;
      height: 100%;
      width: 100%;
    }
    &__link {

    }
    &__title {
      position: absolute;
      bottom: 0;
      height: 2.4rem;
      line-height: 2.4rem;
      font-size: 1.2rem;
      background-color: rgba(0, 0, 0, .5);
      text-align: center;
      color: #fff;
      width: 100%;
    }
  }
</style>
