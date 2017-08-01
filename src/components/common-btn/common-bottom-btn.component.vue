<!-- author: dreamapplehappy -->
<template>
  <div>
    <!-- 填充底部高度 -->
    <div class="hidden-btn"></div>
    <div class="bottom-btn-container">
      <div @click="btnAction" class="bottom-btn-container__btn">{{btnText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btnText: {
      type: String,
    },
  },
  methods: {
    btnAction() {
      this.$emit('bottom-btn-action');
    },
  },
};
</script>

<style lang="scss" scoped>
.hidden-btn {
  height: 6.4rem;
}

.bottom-btn-container {
  z-index: 100;
  bottom: 0;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 6.4rem;
  background-color: #f8f8f8;
  padding: 1rem 1.6rem;

  &__btn {
    width: 100%;
    height: 4.4rem;
    line-height: 4.4rem;
    background-color: #ff4a4a;
    color: #fff;
    font-size: 1.6rem;
    text-align: center;
    border-radius: .5rem;
  }
}
</style>
