<template>
  <div class="title">
    <span class="title__left">{{title}}</span>
    <span class="title__right">{{other}}</span>
  </div>
</template>
<style lang="scss">
  /*通用头*/
  .title {
    height: 84px;
    line-height: 84px;
    padding: 0 30px;
    border-top: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;
    background: white;
    &__left {
      font-size: 32px;
      color: #333333;
      float: left;
    }
    &__right {
      font-size: 26px;
      color: #333333;
      float: right;
      i {
        color: #ff4a4a;
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        other: null,
      };
    },
    props: {
      title: {
        type: String,
        default: '相关内容',
      },
    },
  };
</script>
