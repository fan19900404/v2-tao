<template>
  <div :style="transformObj" class="return_wrapper" @click="goback()">
    <a href="javascript:void(0)">更多
      <br>游戏</a>
  </div>
</template>
<style scoped>
.return_wrapper {
  position: fixed;
  bottom: .7rem;
  right: .2rem;
  width: .42rem;
  height: .42rem;
  background-color: #00c1b3;
  border-radius: 50%;
  text-align: center;
  /*background-image:url(/static/images/components/tao-you/button/goback.png);*/
  background-position: center .05rem;
  background-repeat: no-repeat;
  background-size: 50%;
  z-index: 99;
}

.return_wrapper a {
  color: #FFFFFF;
  font-size: .1rem;
  position: absolute;
  bottom: .04rem;
  left: 0;
  right: 0;
}
</style>
<script>

export default {
  data() {
    return {
      left: 0,
      top: 0,
      oriLeft: 0,
      oriTop: 0,
      moveLeft: 0,
      moveTop: 0,
      minLeft: 0,
      maxLeft: 0,
      minTop: 0,
      maxTop: 0,
    };
  },
  computed: {
    transformObj() {
      return {
        transform: `translate(${this.left}px ,${this.top}px)`,
      };
    },
  },
  props: {
    gobackUrl: {
      type: String,
      default: undefined,
    },
    backLink: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    goback() {
      if (this.gobackUrl) {
        location.href = this.gobackUrl;
      } else if (this.backLink.hasOwnProperty('name')) {
        this.$router.push(this.backLink);
      } else {
        history.go(-1);
      }
    },
  },
  mounted() {
    const el = document.querySelector('.return_wrapper');
    const screenHeight = window.screen.availHeight;
    const screenWidth = window.screen.availWidth;
    const panelWidth = el.offsetWidth;
    const panelHeight = el.offsetHeight;
    this.minLeft = -el.offsetLeft;
    this.minTop = -el.offsetTop;
    this.maxLeft = screenWidth - el.offsetLeft - panelWidth;
    this.maxTop = screenHeight - el.offsetTop - panelHeight;
  },
};
</script>
