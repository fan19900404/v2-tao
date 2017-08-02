<template>
  <div v-show="scrollHeight > height" ref="box" class="back-top-box" @click.stop="toTop">
    <i class="icon-backTop"></i>
    <div>顶部</div>
  </div>
</template>
<script>
import { screenHeight } from '../../../util/mall';
import TouchDrop from '../../../util/touchDrop';

export default {
  data() {
    return {
      height: screenHeight(),
      scrollHeight: 0,
    };
  },
  methods: {
    /**
     * 返回顶部
     * @returns
     */
    toTop() {
      scrollTo(0, 0);
    },
    /**
     * 监控滚动事件
     */
    handleScroll() {
      this.scrollHeight =
        document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.td = new TouchDrop(this.$refs.box);// 完成拖拽
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    this.td.clear();
  },
};
</script>
<style lang="scss" scoped>
.back-top-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 88px;
  width: 88px;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid #FFFFFF;
  border-radius: 100px;
  position: fixed;
  bottom: 300px;
  right: 30px;
  color: #fff;
  text-align: center;
  font-size: 20px;
  letter-spacing: -0.48px;
  line-height: 20px;
}

.back-top-box i,
.back-top-box i::before {
  font-size: 30px;
  color: #fff;
  margin-bottom: 8px;
}
</style>
