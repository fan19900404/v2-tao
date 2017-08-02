<template>
    <router-link tag="div" class="title" :to="{name: 'gameCenter'}">
      <span class="title__left">{{leftText}}</span>
      <span class="title__right">{{rightText}}<i class="icon-more"></i></span>
    </router-link>
</template>
<style lang="scss" scoped>
  /*通用头*/
  .title {
    height: 84px;
    line-height: 84px;
    padding: 0 30px;
    /*border-top: 1px solid #E5E5E5;*/
    border-bottom: 1px solid #E5E5E5;
    background: white;
    /*margin-top: 30px;*/
    &__left {
      font-size: 32px;
      color: #333333;
      float: left;
    }
    &__right {
      color: #c7c7cc;
      font-size: 26px;
      float: right;
      i {
        color: #c7c7cc;
        font-size: 26px;
        padding-left: 10px;
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        leftText: '相关游戏',
        rightText: '更多',
      };
    },
  };
</script>
