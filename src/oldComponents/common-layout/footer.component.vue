<!-- author: dreamapple -->
<template>
  <div>
    <!-- footer placeholder -->
    <div class="footer-placeholder"></div>
    <div class="footer flex" @click="scrollToTop">
      <div @click="link({ path: '/tao-you', activeClass: 'active', exact: true })" class="footer__home flex-1">
        <div class="footer__icon-container">
          <span class="icon-home"></span>
        </div>
        <div class="footer__text">首页</div>
      </div>
      <div @click="link({ name: 'GameCenter', activeClass: 'active', exact: true })" class="footer__game flex-1">
        <div class="footer__icon-container">
          <span class="icon-game"></span>
        </div>
        <div class="footer__text">游戏</div>
      </div>
      <div @click="link({ path: '/tao-you/personal', activeClass: 'active', exact: true })" class="footer__myself flex-1">
        <div class="footer__icon-container">
          <span class="icon-myself"></span>
        </div>
        <div class="footer__text">我</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // TODO
  },
  data() {
    return {
      count: false,
    };
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    scrollToTop() {
      // 首先获取当前页面的scrollTop值
      let st = document.querySelector('body').scrollTop;
      let start = 0;
      let during = 60;
      let top;

      // 暂时不做处理,直接滑动到顶部; 以后可以优化
      window.scrollTo(0, 0);

      //        if(this.count) {
      //          // 进行滚动
      //          if(st > 30) {
      //            animate();
      //          }
      //        }
      //        else {
      //          window.scrollTo(0, 0);
      //        }
      //        this.count = true;
      // 动画
      function animate() {
        start++;
        if (start < during) {
          top = linear(start, st, -st, during);
          window.scrollTo(0, top);
          requestAnimationFrame(animate);
        } else {
          window.scrollTo(0, 0);
        }
      }
      // 线性变化
      function linear(t, b, c, d) {
        return c * t / d + b;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  .footer__text,
  .footer__icon-container {
    color: #ff4a4a !important;
  }
}

.footer-placeholder {
  height: 0.56rem;
}

.footer {
  position: fixed;
  z-index: 100;
  width: 100%;
  bottom: 0;
  box-sizing: border-box;
  border-top: 1px solid #dfdfdf;
  height: 0.56rem;
  background-color: #fff;
  padding: 0.11rem 0 0.09rem 0;
  text-align: center;

  &__text {
    font-size: 0.12rem;
    color: #808080;
  }

  &__icon-container {
    font-size: 0.2rem;
    color: #6a6a6a;
  }
}
</style>
