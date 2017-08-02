<template>
  <div class="back-before-box" @click.stop="toBack" ref="box">
    <i class="icon-backBefore"></i>
    <div>返回</div>
  </div>
</template>
<script>
import TouchDrop from '../../../util/touchDrop';

export default {
  data() {
    return {};
  },
  methods: {
    toBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.td = new TouchDrop(this.$refs.box);// 完成拖拽
  },
  destroyed() {
    this.td.clear();
  },
};
</script>
<style lang="scss" scoped>
.back-before-box {
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
  bottom: 180px;
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
