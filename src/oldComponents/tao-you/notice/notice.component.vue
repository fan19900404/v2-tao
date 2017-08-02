<template>
  <div class="notice am-ft-ellipsis">{{content}}</div>
</template>

<script>
  'use strict';
  export default {
    props: {
      content: {
        type: String,
        default: '重要的通知'
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* 引入公共的样式 */
  @import '../../../assets/tao-you/common.scss';

  .notice {
    padding: 0 .15rem;
    background-color: $notice;
    color: $notice-words;
    height: .36rem;
    font-size: $font-size-sm;
    text-align: center;
    line-height: .36rem;
  }
</style>
