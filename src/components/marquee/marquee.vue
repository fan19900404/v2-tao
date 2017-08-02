<template>
  <div class="tm-marquee" :style="{height: height + 'px'}">
    <ul class="tm-marquee-box" ref="box" :style="{transform: `translate3d(0,${currenTranslateY}px,0)`, transition: `transform ${noAnimate ? 0 : duration}ms`}">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default { // 抄袭vux项目（https://github.com/airyland/vux/blob/v2/src/components/marquee/marquee.vue）
  name: 'marquee',
  props: {
    interval: {
      type: Number,
      default: 2000,
    },
    duration: {
      type: Number,
      default: 300,
    },
    direction: {
      type: String,
      default: 'up',
    },
  },
  beforeDestroy() {
    this.destroy();
  },
  data() {
    return {
      currenTranslateY: 0,
      height: '',
      length: 0,
      currentIndex: 0,
      noAnimate: false,
    };
  },
  methods: {
    /**
     * 销毁时，清除定时器
     *
     * @returns
     */
    destroy() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    /**
     * 初始化方法
     *
     * @returns
     */
    init() {
      this.destroy();
      if (this.cloneNode) {
        this.$refs.box.removeChild(this.cloneNode);
      }
      this.cloneNode = null;
      const firstItem = this.$refs.box.firstElementChild;
      if (!firstItem) {
        return false;
      }
      this.length = this.$refs.box.children.length;
      this.height = firstItem.offsetHeight;
      if (this.direction === 'up') {
        this.cloneNode = firstItem.cloneNode(true);
        this.$refs.box.appendChild(this.cloneNode);
      } else {
        this.cloneNode = this.$refs.box.lastElementChild.cloneNode(true);
        this.$refs.box.insertBefore(this.cloneNode, firstItem);
      }
      return true;
    },
    /**
     * 开始循环（跑马灯）
     *
     * @returns
     */
    start() {
      if (this.direction === 'down') this.go(false);
      this.timer = setInterval(() => {
        if (this.direction === 'up') {
          this.currentIndex += 1;
          this.currenTranslateY = -this.currentIndex * this.height;
        } else {
          this.currentIndex -= 1;
          this.currenTranslateY = -(this.currentIndex + 1) * this.height;
        }
        if (this.currentIndex === this.length) {
          setTimeout(() => {
            this.go(true);
          }, this.duration);
        } else if (this.currentIndex === -1) {
          setTimeout(() => {
            this.go(false);
          }, this.duration);
        } else {
          this.noAnimate = false;
        }
      }, this.interval + this.duration);
    },
    /**
     * 滚动到那一条
     *
     * @param {boolean} toFirst 是否要从第一页开始
     * @returns
     */
    go(toFirst) {
      this.noAnimate = true;
      if (toFirst) {
        this.currentIndex = 0;
        this.currenTranslateY = 0;
      } else {
        this.currentIndex = this.length - 1;
        this.currenTranslateY = -(this.currentIndex + 1) * this.height;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.tm-marquee {
  width: 100%;
  overflow: hidden;
}

.tm-marquee-box {
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;

  li {
    margin: 0;
    width: 100%;
  }
}
</style>
