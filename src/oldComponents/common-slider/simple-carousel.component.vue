<!--
 author: dreamapple
 the carousel only support mobile
 -->
<template>
  <div>
    {{JSON.stringify(wrapperStyle)}}{{index}}{{moveDistance}}
    <div :style="wrapperStyle" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" class="carousel-wrapper JS-carousel-wrapper">
      <ul :style="carouselStyle" class="carousel">
        <li :style="carouselSectionStyle" v-for="(v,index) in carouselData" class="carousel__section" :key="index">
          <a class="carousel__link" :href="v.link">
            <img class="carousel__img" :src="v.imgUrl">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    carouselData: {
      type: Array,
    },
    wrapperStyle: {
      type: Object,
    },
  },
  data() {
    return {
      carouselWidth: 0,
      moveDistance: 0,
      preMoveDistance: 0,
      startXCoordinate: 0,
      endXCoordinate: 0,
      carouselThreshold: 60,
      index: 0,
    };
  },
  computed: {
    totalNum() {
      return this.carouselData.length;
    },
    carouselUlWidth() {
      return this.carouselWidth * this.totalNum;
    },
    carouselStyle() {
      return {
        //          transition: '.1s',
        width: `${this.carouselWidth * this.totalNum}px`,
        transform: `translateX(${this.moveDistance}px)`,
      };
    },
    carouselSectionStyle() {
      return {
        width: `${this.carouselWidth}px`,
      };
    },
  },
  methods: {
    computeWidth(el, isNodeList) {
      return isNodeList ? document.querySelectorAll(el)[0].offsetWidth
        : document.querySelector(el).offsetWidth;
    },
    getXCoordinate(e) {
      return e.changedTouches[0].clientX ? e.changedTouches[0].clientX : null;
    },
    handleTouchStart(e) {
      this.startXCoordinate = this.getXCoordinate(e);
    },
    handleTouchMove(e) {
      this.moveDistance = this.preMoveDistance + (this.getXCoordinate(e) - this.startXCoordinate);
    },
    handleTouchEnd(e) {
      let currentMove;
      this.endXCoordinate = this.getXCoordinate(e);
      currentMove = this.endXCoordinate - this.startXCoordinate;
      console.log(currentMove);
      if ((this.index === 0) && (currentMove > 0)) {
        this.moveDistance = 0;
        this.preMoveDistance = 0;
      } else if (((this.totalNum - 1) === this.index) && (currentMove < 0)) {
        this.moveDistance = this.preMoveDistance;
      } else if (0 > currentMove) {
        this.index++;
        this.moveDistance = this.preMoveDistance - this.carouselWidth;
        this.preMoveDistance = this.moveDistance;
      }
      else {
        this.index--;
        this.moveDistance = this.preMoveDistance + this.carouselWidth;
        this.preMoveDistance = this.moveDistance;
      }
    },
  },
  mounted() {
    // compute carousel width
    this.carouselWidth = this.computeWidth('.JS-carousel-wrapper');
    console.log(this.computeWidth('.JS-carousel-wrapper'));
  },
};
</script>

<style lang="scss" scoped>
.carousel-wrapper {
  overflow: hidden;
}

.carousel {
  height: 100%;
  &__section {
    float: left;
    height: 100%;
  }
  &__link {
    display: block;
    height: 100%;
  }
  &__img {
    width: 100%;
    height: 100%;
  }
}
</style>
