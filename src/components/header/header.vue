<template>
  <header class="tm-header" :class="{ 'is-fixed': fixed }">
    <div class="tm-header-button is-left">
      <slot name="left"></slot>
    </div>
    <h1 class="tm-header-title" v-text="title"></h1>
    <div class="tm-header-button is-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
/**
 * tm-header
 * @module components/header
 * @desc 顶部导航
 * @param {boolean} [fixed=false] - 固定顶部
 * @param {string} [title] - 标题
 * @param {slot} [left] - 显示在左侧区域
 * @param {slot} [right] - 显示在右侧区域
 *
 * @example
 * <mt-header title="我是标题" fixed>
 *   <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
 *   <mt-button slot="right" icon="more"></mt-button>
 * </mt-header>
 */
export default {
  name: 'tm-header',
  props: {
    fixed: Boolean,
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.tm-header {
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  color: #333;
  display: flex;
  font-size: 34px;
  height: 88px;
  line-height: 1;
  padding: 0 30px;
  position: relative;
  text-align: center;
  white-space: nowrap;

  .tm-header-button {
    flex: .5;
    >a {
      color: inherit;
    }
    &.is-left {
      text-align: left;
    }
    &.is-right {
      text-align: right;
    }
  }
  .tm-header-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: inherit;
    font-weight: normal;
    flex: 1;
    font-weight: bold;
  }
  .is-fixed {
    position: fixed 0 0 * 0;
    z-index: 1;
  }
}
</style>
