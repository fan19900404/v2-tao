<template>
  <div class="am-checkbox mini argument">
    <input class="agree" id="agree" type="checkbox" v-model="status">
    <span class="icon-check"></span>
    <label class="am-ft-md" for="agree">我已阅读并同意</label><a class="service-intro">《淘游助手服务协议》</a>
  </div>
</template>

<script>
  'use strict';
  export default {
    props: {
      status: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  /* 引入公共的样式 */
  @import '../../../assets/tao-you/common.scss';

  .am-checkbox {
    display: flex;
  }

  .am-ft-md {
    font-size: $font-size-xs;
  }

  .am-checkbox:not([am-version]).argument {
    padding: 0;
    position: relative;
    overflow: hidden;
    .agree {
      right: 9999px;
    }
  }

  .am-checkbox:not([am-version]).argument label {
    text-indent: .2rem;
  }

  .am-checkbox:not([am-version]).mini .icon-check {
    width: .12rem;
    height: .12rem;
  }
  .am-checkbox:not([am-version]).argument .icon-check {

  }
  .am-checkbox:not([am-version]) .icon-check:before, .am-checkbox:not([am-version]).tiny .icon-check:before {
    border-radius: 0 !important;
    border-width: .02rem;
    top: .03rem;
  }
  .am-checkbox:not([am-version]) .icon-check:after, .am-checkbox:not([am-version]).tiny .icon-check:after {
    border-width: 0 .01rem .01rem 0;
    left: .03rem;
  }

  .service-intro {
    font-size: .12rem;
  }

</style>
