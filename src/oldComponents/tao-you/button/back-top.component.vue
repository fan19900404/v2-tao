<template>
  <div v-show="show" :style="transformObj" class="return_wrapper" @click="gotop()">
    <a href="javascript:void(0)">顶部</a>
  </div>
</template>
<style scoped>
.return_wrapper {
  position: fixed;
  bottom: 1.53rem;
  right: .2rem;
  margin-right: auto;
  width: .44rem;
  height: .44rem;
  border-radius: 50%;
  text-align: center;
  background-image: url(/static/images/oldComponents/tao-you/button/backtop.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
      // 是否显示返回到顶部
      show: false,
      height: window.screen.availHeight || document.documentElement.clientHeight,
      body: document.getElementsByTagName('body')[0],
    };
  },
  computed: {
    transformObj() {
      return {
        transform: `translate(${this.left}px` + `,${this.top}px)`,
      };
    },
  },
  methods: {
    // 返回顶部
    gotop() {
      window.scrollTo(0, 0);
    },
    // onpanmove(e) {
    //   const event = e.pointers[0];

    //   let left = event.screenX - this.oriLeft + this.moveLeft;
    //   let top = event.screenY - this.oriTop + this.moveTop;

    //   if (left >= this.maxLeft) {
    //     left = this.maxLeft;
    //   }
    //   if (left <= this.minLeft) {
    //     left = this.minLeft;
    //   }
    //   if (top >= this.maxTop) {
    //     top = this.maxTop;
    //   }
    //   if (top <= this.minTop) {
    //     top = this.minTop;
    //   }
    //   this.left = left;
    //   this.top = top;
    // },
    // onpanstart(e) {
    //   const event = e.pointers[0];
    //   this.oriLeft = event.screenX;
    //   this.oriTop = event.screenY;
    // },
    // onpanend() {
    //   this.moveLeft = this.left;
    //   this.moveTop = this.top;
    // },
    handleScroll() {
      const scrollHeight = this.body.scrollTop;
      const height = this.height / 2;
      if (scrollHeight > height) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
  mounted() {
    const el = document.querySelector('.return_wrapper');
    const screenHeight = window.screen.availHeight;
    const screenWidth = window.screen.availWidth;
    const panelWidth = el.offsetWidth;
    const panelHeight = el.offsetHeight;
    this.minLeft = -el.offsetLeft + 5;
    this.minTop = -el.offsetTop + 5;
    this.maxLeft = screenWidth - el.offsetLeft - panelWidth - 5;
    // this.maxTop=screenHeight-el.offsetTop-panelHeight;
    this.maxTop = 60;

    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
